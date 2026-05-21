import { getOrderedDocEntries } from "@/lib/llms";
import { siteUrl, socialLinks } from "@/lib/site";
import { taskTemplates } from "@/lib/task-templates";

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
    `- [Roadmap](${siteUrl}/roadmap): Public roadmap — shipped, in progress, on deck, and where to help.`,
    `- [Glossary](${siteUrl}/glossary): Plain-English definitions of every Watchfire term, mode, and concept.`,
    `- [Cheatsheet](${siteUrl}/cheatsheet): One-page printable reference — CLI, TUI keybindings, YAML schemas, agent modes, gotchas.`,
    `- [Tour](${siteUrl}/tour): Two-minute guided walkthrough of Watchfire — project, tasks, TUI, agent modes, worktrees, and the GUI.`,
    `- [Task templates](${siteUrl}/templates): Copy-paste starter task YAMLs for the most common agent jobs.`,
    `- [Embed kit](${siteUrl}/embed): Copy-paste badges, stats, and widgets you can drop into any project.`,
    `- [Resources](${siteUrl}/resources): Curated external reading — papers, posts, agent CLIs, related OSS, talks.`,
    `- [Manifesto](${siteUrl}/manifesto): What Watchfire believes about how AI coding agents should run inside real codebases — six tenets, distilled.`,
    `- [When Watchfire is the wrong tool](${siteUrl}/when-not-to-use): Eight scenarios where Watchfire is a poor fit, with concrete pointers to what to reach for instead.`,
  ];

  const templateLines = taskTemplates.map((template) =>
    formatLine(
      template.title,
      `/templates/${template.slug}`,
      template.tagline,
    ),
  );

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
    "## Task templates",
    "",
    templateLines.join("\n"),
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
