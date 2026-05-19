export type ShowcaseCategory =
  | "dogfooding"
  | "open-source"
  | "team"
  | "experiment";

export type ShowcaseEntry = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  repoUrl?: string;
  siteUrl?: string;
  tasksMerged?: number;
  category: ShowcaseCategory;
  tags: string[];
};

export const showcaseCategoryLabels: Record<ShowcaseCategory, string> = {
  dogfooding: "Dogfooding",
  "open-source": "Open source",
  team: "Team",
  experiment: "Experiment",
};

export const showcaseEntries: readonly ShowcaseEntry[] = [
  {
    slug: "watchfire-website",
    name: "watchfire.io",
    tagline: "The marketing and documentation site for Watchfire — built by Watchfire.",
    description:
      "Every page, blog post, and SVG illustration on this site was shipped by a Watchfire task running in an isolated git worktree. The directory listing under .watchfire/tasks/ is the project's own design history, and every diff is reviewable against the YAML brief that produced it.",
    repoUrl: "https://github.com/watchfire-io/watchfire-website",
    siteUrl: "https://watchfire.io",
    tasksMerged: 131,
    category: "dogfooding",
    tags: ["Next.js", "Tailwind", "MDX", "Claude Code"],
  },
  {
    slug: "watchfire",
    name: "Watchfire",
    tagline: "The daemon, CLI, TUI, and GUI that this site documents.",
    description:
      "The open-source project itself: a Go daemon that orchestrates coding agents, a Bubbletea TUI, an Electron GUI, and the gRPC plumbing that ties them together. It's the system this entire site is about — and the binary you install to drive your own showcase project.",
    repoUrl: "https://github.com/watchfire-io/watchfire",
    category: "open-source",
    tags: ["Go", "Bubbletea", "Electron", "gRPC"],
  },
];
