import fs from "node:fs";
import { getOrderedDocEntries } from "@/lib/llms";
import { siteUrl, socialLinks } from "@/lib/site";
import {
  categoryLabels,
  inProgressItems,
  onDeckItems,
  type RoadmapItem,
} from "@/lib/roadmap";
import {
  glossary,
  glossaryCategories,
  type GlossaryCategory,
} from "@/lib/glossary";
import { taskTemplates } from "@/lib/task-templates";

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

function renderGlossarySection(): string {
  const lines: string[] = [
    "\n---\n",
    "## Glossary\n",
    `Source: ${siteUrl}/glossary\n`,
    "Plain-English definitions of every Watchfire term, mode, and concept. Each entry is anchor-linkable as `" +
      `${siteUrl}/glossary#<slug>` +
      "`.\n",
  ];

  for (const category of glossaryCategories) {
    const entries = glossary.filter(
      (e: { category: GlossaryCategory }) => e.category === category.id,
    );
    if (entries.length === 0) continue;
    lines.push(`### ${category.title}\n`);
    for (const entry of entries) {
      const aliases =
        entry.aliases && entry.aliases.length > 0
          ? ` _(also: ${entry.aliases.join(", ")})_`
          : "";
      lines.push(`- **${entry.term}**${aliases} — ${entry.definition}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function renderResourcesSection(): string {
  const lines: string[] = [
    "\n---\n",
    "## Resources\n",
    `Source: ${siteUrl}/resources\n`,
    "Curated external reading — what we read so you don't have to. Includes foundational papers and posts on AI coding agents, links to every supported backend agent CLI, related OSS in the orchestration/sandboxing/protocol space, and a small set of talks and podcasts. Curation lives in `app/resources/page.tsx` and is intentionally short — quality over comprehensiveness.\n",
    "### Sections",
    "",
    "- Foundational reading on AI coding agents — papers and authoritative blog posts.",
    "- Backend agent CLIs — homepages and Watchfire integration pages for Claude Code, Codex, opencode, Gemini CLI, Copilot CLI, Cursor Agent.",
    "- Related open-source projects — sandboxing (Bubblewrap, Landlock, Apple App Sandbox), dev containers, protocols (MCP, gRPC), TUI building blocks (Bubble Tea, Lipgloss), and adjacent agents (OpenHands, SWE-agent).",
    "- Talks & podcasts — short, in progress.",
    "- From the Watchfire blog — first-party posts that pair with the reading list.",
    "",
  ];
  return lines.join("\n");
}

function renderEmbedSection(): string {
  const lines: string[] = [
    "\n---\n",
    "## Embed kit\n",
    `Source: ${siteUrl}/embed\n`,
    "Copy-paste badges, stats, and widgets you can drop into any project.\n",
    "Each widget has both a Markdown snippet (for README files) and an HTML snippet (for blogs). Snippets use fully-qualified URLs (the site's siteUrl), so they paste cleanly into any external project.\n",
    "### Widgets",
    "",
    `- **Made with Watchfire** badge — gradient flame pill. Sources: ${siteUrl}/badges/made-with-watchfire-flame.svg (also /badges/made-with-watchfire.svg, -dark, -light).`,
    "- **GitHub stars badge** — live star count served by shields.io.",
    "- **Latest version badge** — current Watchfire release, also via shields.io.",
    `- **Built with Watchfire stats** — iframe at ${siteUrl}/embed/stats?project=<slug> showing live task-completion stats.`,
    `- **Powered by Watchfire** pill — tiny inline SVG at ${siteUrl}/embed/powered-by.svg.`,
    "",
  ];
  return lines.join("\n");
}

function renderTemplatesSection(): string {
  const lines: string[] = [
    "\n---\n",
    "## Task templates\n",
    `Source: ${siteUrl}/templates\n`,
    "Copy-paste starter task YAMLs for the most common things you'll ask a coding agent to do. Each template has its own detail page with a description, when-to-use bullets, and a category-specific pitfalls list.\n",
  ];

  for (const template of taskTemplates) {
    lines.push(
      `- **${template.title}** — ${template.tagline} (${siteUrl}/templates/${template.slug})`,
    );
  }
  lines.push("");

  return lines.join("\n");
}

function renderRoadmapSection(): string {
  const renderItem = (item: RoadmapItem): string => {
    const issueLine = item.issue ? `\n  Tracking: ${item.issue}` : "";
    return `- **${item.title}** _(${categoryLabels[item.category]})_ — ${item.summary}${issueLine}`;
  };

  const lines: string[] = [
    "\n---\n",
    "## Roadmap\n",
    `Source: ${siteUrl}/roadmap\n`,
    "Watchfire's public roadmap. What's shipped (mirrored from the changelog), what's actively in flight, and what's intended for the next quarter.\n",
    "### In progress\n",
    inProgressItems.map(renderItem).join("\n"),
    "\n",
    "### On deck\n",
    onDeckItems.map(renderItem).join("\n"),
    "\n",
    "### How to help\n",
    `Watchfire is Apache-2.0 open source. Browse open issues at ${socialLinks.github}/issues — entries tagged \`good-first-issue\` and \`help-wanted\` are the easiest entry points. See ${siteUrl}/community for the contributing guide.\n`,
  ];

  return lines.join("\n");
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

  const roadmapSection = renderRoadmapSection();
  const glossarySection = renderGlossarySection();
  const templatesSection = renderTemplatesSection();
  const embedSection = renderEmbedSection();
  const resourcesSection = renderResourcesSection();

  const parts: string[] = [
    header,
    glossarySection,
    templatesSection,
    embedSection,
    resourcesSection,
    roadmapSection,
  ];
  let total =
    byteLength(header) +
    byteLength(glossarySection) +
    byteLength(templatesSection) +
    byteLength(embedSection) +
    byteLength(resourcesSection) +
    byteLength(roadmapSection);
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
