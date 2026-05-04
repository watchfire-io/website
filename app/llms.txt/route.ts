import { getOrderedDocEntries } from "@/lib/llms";
import { siteUrl, socialLinks } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

const HEADER = `# Watchfire

> Better context. Better code. Watchfire turns clear specs into scoped tasks, then lets Claude Code, OpenAI Codex, opencode, Gemini CLI, or GitHub Copilot CLI build them in sandboxed git worktrees.

Watchfire is an open-source orchestrator for AI coding agents. A daemon (\`watchfired\`) manages projects, tasks, git worktrees, and sandboxed agent sessions; a CLI/TUI and an Electron GUI connect to it over gRPC.
`;

const COMPONENT_URLS = new Set([
  "/docs/components/daemon",
  "/docs/components/cli",
  "/docs/components/gui",
]);

const CHANGELOG_URL = "/docs/changelog";

function formatLine(title: string, url: string, description: string): string {
  const absoluteUrl = `${siteUrl}${url}`;
  const desc = description.trim();
  return desc.length > 0
    ? `- [${title}](${absoluteUrl}): ${desc}`
    : `- [${title}](${absoluteUrl})`;
}

export function GET() {
  const entries = getOrderedDocEntries();

  const docsLines: string[] = [];
  const componentsLines: string[] = [];

  for (const entry of entries) {
    if (entry.url === CHANGELOG_URL) continue;
    if (COMPONENT_URLS.has(entry.url)) {
      componentsLines.push(formatLine(entry.title, entry.url, entry.description));
      continue;
    }
    docsLines.push(formatLine(entry.title, entry.url, entry.description));
  }

  const optionalLines: string[] = [
    `- [Source on GitHub](${socialLinks.github}): Apache-2.0 licensed.`,
    `- [Changelog](${siteUrl}${CHANGELOG_URL}): Release notes.`,
  ];

  const body = [
    HEADER,
    "## Docs",
    "",
    docsLines.join("\n"),
    "",
    "## Components",
    "",
    componentsLines.join("\n"),
    "",
    "## Optional",
    "",
    optionalLines.join("\n"),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
