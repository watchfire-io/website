export type RoadmapCategory =
  | "core"
  | "ui"
  | "docs"
  | "integrations"
  | "ecosystem";

export type RoadmapItem = {
  title: string;
  summary: string;
  category: RoadmapCategory;
  issue?: string;
};

export const categoryLabels: Record<RoadmapCategory, string> = {
  core: "Core",
  ui: "UI",
  docs: "Docs",
  integrations: "Integrations",
  ecosystem: "Ecosystem",
};

const repoIssues = "https://github.com/watchfire-io/watchfire/issues";

export const inProgressItems: readonly RoadmapItem[] = [
  {
    title: "Windows daemon support",
    summary:
      "Bring `watchfired` to Windows with native service installation, signed binaries, and a Windows-shaped sandbox replacement for `sandbox-exec`. macOS and Linux already ship; Windows is the last gap.",
    category: "core",
    issue: `${repoIssues}?q=is%3Aissue+windows`,
  },
  {
    title: "Per-task cost tracking in the GUI",
    summary:
      "Surface live token spend and cumulative cost per task in the Electron GUI, broken down by agent backend. Backed by transcripts already written to disk — no extra telemetry.",
    category: "ui",
  },
  {
    title: "OpenAI Codex CLI backend stabilization",
    summary:
      "Lock in Codex CLI as a first-class backend alongside Claude Code: tighter error surfaces, consistent transcript layout, parity with the chat/task/start-all modes.",
    category: "integrations",
    issue: `${repoIssues}?q=is%3Aissue+codex`,
  },
  {
    title: "Editor-mode TUI keybindings",
    summary:
      "Vim and Emacs profiles for the TUI — modal navigation, named registers for task IDs, customisable bindings via `~/.config/watchfire/keys.toml`.",
    category: "ui",
  },
  {
    title: "Beacon v2 protocol",
    summary:
      "Second iteration of the daemon's two-way integration surface: streaming task updates, scoped capability tokens, and a stable wire format for third-party clients.",
    category: "core",
  },
  {
    title: "Docs search powered by the local daemon",
    summary:
      "Replace the static search index on `/docs` with a daemon-served endpoint so search results reflect the version of Watchfire you actually have installed.",
    category: "docs",
  },
];

export const onDeckItems: readonly RoadmapItem[] = [
  {
    title: "Linux GUI builds",
    summary:
      "Ship `Watchfire.app` as a signed AppImage and a `.deb` so Linux users get the same multi-project view macOS already has.",
    category: "ui",
  },
  {
    title: "Per-project secrets vault",
    summary:
      "First-class secrets storage scoped to a project — encrypted at rest, surfaced to agents only inside the worktree, never leaked into transcripts.",
    category: "core",
  },
  {
    title: "Cron-triggered task runs",
    summary:
      "Schedule recurring tasks natively in `project.yaml` (`schedule: \"0 9 * * 1\"`) so the daemon fires drafts on its own — no external runner required.",
    category: "core",
  },
  {
    title: "Multi-user daemon mode",
    summary:
      "Let `watchfired` accept connections from more than one operator with per-user identity, audit log, and project-level ACLs. The piece teams keep asking for.",
    category: "core",
  },
  {
    title: "Marketplace for community task templates",
    summary:
      "A browsable index of community-contributed task templates, installable with one command — built on the same YAML schema as `/templates`.",
    category: "ecosystem",
  },
  {
    title: "JetBrains and Zed integrations",
    summary:
      "Editor plugins that mirror the VS Code workflow: open a task, jump to its worktree, watch the transcript inline.",
    category: "integrations",
  },
];
