import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { siteUrl } from "@/lib/site";

export type ChangelogEntry = {
  version: string;
  codename: string;
  title: string;
  slug: string;
  url: string;
  date: Date;
  markdown: string;
  html: string;
};

const CHANGELOG_PATH = join(process.cwd(), "content/docs/changelog.mdx");

// Source of truth for release dates until/unless they get codified into the MDX itself.
const RELEASE_DATES: Record<string, string> = {
  "10.0.3": "2026-08-21",
  "10.0.2": "2026-08-21",
  "10.0.1": "2026-08-21",
  "10.0.0": "2026-08-21",
  "9.4.0": "2026-08-16",
  "9.3.0": "2026-08-08",
  "9.2.0": "2026-08-03",
  "9.1.0": "2026-07-29",
  "9.0.0": "2026-07-26",
  "8.0.0": "2026-06-29",
  "7.4.0": "2026-06-16",
  "7.3.0": "2026-05-29",
  "7.2.1": "2026-05-22",
  "7.2.0": "2026-05-19",
  "7.1.0": "2026-05-13",
  "7.0.0": "2026-05-12",
  "6.0.0": "2026-05-08",
  "5.0.0": "2026-05-04",
  "4.0.0": "2026-05-02",
  "3.0.0": "2026-03-21",
  "2.0.1": "2026-02-18",
  "2.0.0": "2026-02-12",
  "1.0.0": "2026-01-30",
  "0.9.0": "2026-01-22",
  "0.8.0": "2026-01-18",
  "0.7.0": "2026-01-15",
  "0.6.0": "2026-01-10",
  "0.5.0": "2026-01-06",
  "0.4.0": "2026-01-02",
  "0.3.0": "2025-12-29",
  "0.2.0": "2025-12-22",
  "0.1.3": "2025-12-18",
  "0.1.2": "2025-12-16",
  "0.1.1": "2025-12-14",
  "0.1.0": "2025-12-10",
};

function stripFrontmatter(source: string): string {
  if (!source.startsWith("---")) return source;
  const end = source.indexOf("\n---", 3);
  if (end === -1) return source;
  return source.slice(end + 4).replace(/^\n+/, "");
}

// Matches github-slugger (used by Fumadocs) — strip non-word/space/dash, then map
// each space 1:1 to a dash. Runs of dashes are intentionally NOT collapsed: that's
// what reproduces e.g. `010-ember--initial-release` for `Ember — Initial Release`.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/ /g, "-");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Inline pass: links, **strong**, *em*, `code`. Run AFTER block-level escape.
function renderInline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label, href) => `<a href="${href}">${label}</a>`,
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return out;
}

// Hand-rolled Markdown→HTML for the constructs the changelog actually uses:
// h3 (`### `), unordered lists (`- `), paragraphs, and inline `code`/links/**strong**/*em*.
function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    out.push(`<p>${renderInline(para.join(" "))}</p>`);
    para = [];
  };
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      closeList();
      continue;
    }
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushPara();
      closeList();
      out.push(`<h3>${renderInline(h3[1].trim())}</h3>`);
      continue;
    }
    const li = line.match(/^[-*]\s+(.+)$/);
    if (li) {
      flushPara();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${renderInline(li[1].trim())}</li>`);
      continue;
    }
    closeList();
    para.push(line.trim());
  }
  flushPara();
  closeList();
  return out.join("\n");
}

// Strip inline-markdown syntax (links, **bold**, *em*, `code`) to plain text.
// Used by the /changelog marketing page to render bullet labels.
export function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1$2")
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
}

// Return the first non-empty paragraph in a release section that's not a heading
// and not a bullet list. Returns null when the section jumps straight into `###`.
export function extractReleaseSummary(markdown: string): string | null {
  const lines = markdown.split("\n");
  const buf: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      if (buf.length > 0) return stripInlineMarkdown(buf.join(" "));
      continue;
    }
    if (line.startsWith("#") || line.startsWith("- ") || line.startsWith("* ")) {
      if (buf.length > 0) return stripInlineMarkdown(buf.join(" "));
      return null;
    }
    buf.push(line);
  }
  return buf.length > 0 ? stripInlineMarkdown(buf.join(" ")) : null;
}

// Return up to `max` top-level bullet labels. A bullet of the form
// `- **Headline.** body...` returns the headline portion (sans trailing period);
// a plain bullet returns its full text. Inline markdown is stripped.
export function extractReleaseHighlights(markdown: string, max: number): string[] {
  const lines = markdown.split("\n");
  const out: string[] = [];
  for (const raw of lines) {
    if (out.length >= max) break;
    const m = raw.match(/^[-*]\s+(.+)$/);
    if (!m) continue;
    const text = m[1].trim();
    const bold = text.match(/^\*\*(.+?)\*\*/);
    const label = bold ? bold[1].trim() : text;
    const clean = stripInlineMarkdown(label).replace(/[.\s]+$/, "");
    if (clean) out.push(clean);
  }
  return out;
}

let cached: ChangelogEntry[] | null = null;

export function getChangelogEntries(): ChangelogEntry[] {
  if (cached) return cached;
  const raw = readFileSync(CHANGELOG_PATH, "utf8");
  const body = stripFrontmatter(raw);
  const fileMtime = statSync(CHANGELOG_PATH).mtime;

  // Split on a top-level `## [X.Y.Z]` heading. The `m` flag anchors to line starts.
  const headingRe = /^##\s+\[([0-9]+\.[0-9]+\.[0-9]+)\][^\n]*$/gm;
  const matches: { version: string; heading: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(body)) !== null) {
    matches.push({
      version: m[1],
      heading: m[0],
      start: m.index,
      end: m.index + m[0].length,
    });
  }

  const entries: ChangelogEntry[] = matches.map((cur, i) => {
    const next = matches[i + 1];
    const sectionEnd = next ? next.start : body.length;
    const headingLine = cur.heading.replace(/^##\s+/, "").trim();
    const codenamePart = headingLine.replace(/^\[[^\]]+\]\s*/, "").trim();
    const codename = codenamePart || cur.version;
    const slug = slugify(headingLine);
    const sectionBody = body.slice(cur.end, sectionEnd).replace(/^\n+/, "");
    const dateStr = RELEASE_DATES[cur.version];
    const date = dateStr ? new Date(`${dateStr}T00:00:00Z`) : fileMtime;
    const title = `v${cur.version} — ${codename}`;
    return {
      version: cur.version,
      codename,
      title,
      slug,
      url: `${siteUrl}/docs/changelog#${slug}`,
      date,
      markdown: sectionBody,
      html: renderMarkdown(sectionBody),
    };
  });

  cached = entries;
  return entries;
}
