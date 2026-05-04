import fs from "node:fs";
import { getOrderedDocEntries } from "@/lib/llms";
import { siteUrl, socialLinks } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

const MAX_BYTES = 600 * 1024;

const DOWNLOAD_URL = `${socialLinks.github}/releases/latest`;

function stripMdx(raw: string): string {
  let s = raw;

  s = s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

  s = s.replace(/^[\t ]*import\s+[^\n]+\n/gm, "");

  s = s.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");

  s = s.replace(/<Mermaid\s+chart=\{`([\s\S]*?)`\}\s*\/>/g, (_, chart) => {
    const cleaned = String(chart).replace(/^\n+|\n+$/g, "");
    return "```mermaid\n" + cleaned + "\n```";
  });

  s = s.replace(/<Callout\b[^>]*>([\s\S]*?)<\/Callout>/g, (_, body) => {
    const inner = String(body).trim();
    if (!inner) return "";
    return inner
      .split("\n")
      .map((line) => (line.length > 0 ? `> ${line}` : ">"))
      .join("\n");
  });

  s = s.replace(
    /<DownloadButton\s*\/>/g,
    `[Download Watchfire](${DOWNLOAD_URL})`,
  );

  s = s.replace(/<img\s+([\s\S]*?)\/>/g, (_, attrs) => {
    const attrText = String(attrs);
    const src = /src=["']([^"']+)["']/.exec(attrText)?.[1];
    const alt = /alt=["']([^"']+)["']/.exec(attrText)?.[1] ?? "";
    if (!src) return "";
    return `![${alt}](${src})`;
  });

  s = s.replace(/<([A-Z][A-Za-z0-9]*)\b[^>]*\/>/g, "");

  s = s.replace(
    /<([A-Z][A-Za-z0-9]*)\b[^>]*>([\s\S]*?)<\/\1>/g,
    (_, _tag, body) => String(body),
  );

  s = s.replace(/\n{3,}/g, "\n\n");

  return s.trim();
}

function byteLength(s: string): number {
  return Buffer.byteLength(s, "utf8");
}

export function GET() {
  const entries = getOrderedDocEntries();
  const generated = new Date().toISOString().slice(0, 10);

  const header = `# Watchfire — Full Documentation

> Generated from content/docs/. See /llms.txt for the index.

Source: ${siteUrl}
Repository: ${socialLinks.github}
Generated: ${generated}
`;

  const parts: string[] = [header];
  let total = byteLength(header);
  let truncatedAt: string | null = null;

  for (const entry of entries) {
    let raw: string;
    try {
      raw = fs.readFileSync(entry.absolutePath, "utf8");
    } catch {
      continue;
    }
    const body = stripMdx(raw);

    const section = `\n---\n\n## ${entry.title}\n\nSource: ${siteUrl}${entry.url}\n\n${body}\n`;
    const sectionBytes = byteLength(section);

    if (total + sectionBytes > MAX_BYTES) {
      truncatedAt = entry.url;
      break;
    }

    parts.push(section);
    total += sectionBytes;
  }

  if (truncatedAt) {
    const marker = `\n---\n\n<!-- truncated, see ${siteUrl}${truncatedAt} -->\n`;
    parts.push(marker);
    console.warn(
      `[llms-full.txt] corpus exceeded ${MAX_BYTES} bytes; truncated starting at ${truncatedAt}`,
    );
  }

  const body = parts.join("");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
