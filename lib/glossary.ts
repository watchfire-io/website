export type GlossaryCategory =
  | "modes"
  | "concepts"
  | "components"
  | "lifecycle"
  | "config";

export interface GlossaryEntry {
  slug: string;
  term: string;
  aliases?: string[];
  category: GlossaryCategory;
  definition: string;
  seeAlso?: string[];
  docsHref?: string;
}

export interface GlossaryCategoryMeta {
  id: GlossaryCategory;
  title: string;
  description: string;
}

export const glossaryCategories: GlossaryCategoryMeta[] = [
  {
    id: "modes",
    title: "Modes",
    description:
      "The six ways an agent can be run against a project — from a single interactive chat to an autonomous loop that generates its own work.",
  },
  {
    id: "concepts",
    title: "Concepts",
    description:
      "The building blocks: projects, tasks, the worktree-and-sandbox pairing, and the agent backend Watchfire happens to be driving.",
  },
  {
    id: "components",
    title: "Components",
    description:
      "The three pieces of software you actually run — one daemon, plus the CLI/TUI and GUI clients that talk to it.",
  },
  {
    id: "lifecycle",
    title: "Lifecycle",
    description:
      "Task status, outcome flags, and the auto-merge settings that decide what happens when a run finishes.",
  },
  {
    id: "config",
    title: "Config",
    description:
      "The YAML files and definition text Watchfire reads from `.watchfire/` to know what to build and how.",
  },
];

export const glossary: GlossaryEntry[] = [
  // ---------- Modes ----------
  {
    slug: "chat-mode",
    term: "Chat mode",
    aliases: ["chat", "interactive mode"],
    category: "modes",
    definition:
      "An interactive session with the agent — closer to a normal coding-CLI conversation than a task run. No task file, no automatic merge: useful for exploring a codebase, prototyping, or asking the agent a one-off question inside a project's worktree.",
    seeAlso: ["task-mode", "agent-backend"],
    docsHref: "/docs/concepts/agent-modes",
  },
  {
    slug: "task-mode",
    term: "Task mode",
    aliases: ["task run", "task execution"],
    category: "modes",
    definition:
      "Runs one specific task from `.watchfire/tasks/` in an isolated git worktree. The agent reads the task's prompt and acceptance criteria, makes changes, commits, and updates the task file when done. This is the unit Watchfire is built around.",
    seeAlso: ["task", "worktree", "ready", "done"],
    docsHref: "/docs/concepts/agent-modes",
  },
  {
    slug: "start-all",
    term: "Start All",
    aliases: ["start-all", "run all ready tasks"],
    category: "modes",
    definition:
      "Sequentially runs every task currently in `ready` status. Each task gets its own worktree and its own sandboxed agent process; failed ones stop being retried but never block the next task from starting.",
    seeAlso: ["task-mode", "ready", "wildfire"],
    docsHref: "/docs/concepts/agent-modes",
  },
  {
    slug: "wildfire",
    term: "Wildfire mode",
    aliases: ["wildfire", "autonomous mode", "wildfire loop"],
    category: "modes",
    definition:
      "The autonomous loop. Wildfire alternates between executing ready tasks, refining drafts, and generating new draft tasks from the project definition until you stop it. The worktree and sandbox keep the blast radius bounded even when nobody is watching.",
    seeAlso: ["generate-tasks", "generate-definition", "draft", "definition"],
    docsHref: "/docs/commands/wildfire",
  },
  {
    slug: "generate-definition",
    term: "Generate definition",
    aliases: ["definition generate", "watchfire definition generate"],
    category: "modes",
    definition:
      "Asks the agent to draft a project definition by reading the repo — tech stack, layout conventions, code style, gotchas. The output lands in `.watchfire/project.yaml` under `definition:` and you can keep editing it afterwards.",
    seeAlso: ["definition", "project-yaml"],
    docsHref: "/docs/concepts/agent-modes",
  },
  {
    slug: "generate-tasks",
    term: "Generate tasks",
    aliases: ["task generate", "watchfire generate"],
    category: "modes",
    definition:
      "Asks the agent to propose new tasks against the project definition. Generated tasks land as `draft` YAML files so you can read, edit, and promote the good ones — Watchfire never silently executes a task it generated itself.",
    seeAlso: ["wildfire", "draft", "task"],
    docsHref: "/docs/concepts/agent-modes",
  },

  // ---------- Concepts ----------
  {
    slug: "project",
    term: "Project",
    aliases: ["watchfire project"],
    category: "concepts",
    definition:
      "A repo Watchfire knows about. Created by running `watchfire init`, which adds a `.watchfire/` directory with a `project.yaml`, a `tasks/` folder, and a `worktrees/` parent. Projects are independent — one machine can manage many in parallel.",
    seeAlso: ["project-yaml", "task", "worktree"],
    docsHref: "/docs/concepts/projects-and-tasks",
  },
  {
    slug: "task",
    term: "Task",
    aliases: ["task file", "task yaml"],
    category: "concepts",
    definition:
      "A unit of work described as a small YAML file at `.watchfire/tasks/<n>.yaml`. Contains a title, prompt, acceptance criteria, and status. Tasks are plain text by design — editable in your editor, diffable in git, runnable by any client.",
    seeAlso: ["task-yaml", "draft", "ready", "done"],
    docsHref: "/docs/concepts/projects-and-tasks",
  },
  {
    slug: "worktree",
    term: "Worktree",
    aliases: ["git worktree", "task worktree"],
    category: "concepts",
    definition:
      "Each task gets its own git worktree at `.watchfire/worktrees/<n>/` on a dedicated `watchfire/<n>` branch. Parallel tasks never touch each other's files, a failed run never pollutes `main`, and a finished task can be reviewed like any other branch before merging.",
    seeAlso: ["sandbox", "auto-merge", "task-mode"],
    docsHref: "/docs/concepts/worktrees",
  },
  {
    slug: "sandbox",
    term: "Sandbox",
    aliases: ["seatbelt", "sandbox-exec", "landlock", "bubblewrap"],
    category: "concepts",
    definition:
      "The kernel-level isolation each agent process runs inside: Seatbelt (`sandbox-exec`) on macOS, Landlock on Linux 5.13+, Bubblewrap as a fallback. It denies access to `~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.netrc`, `~/.npmrc`, and `.git/hooks` by default. Enforcement is at the kernel level, not on the agent being well-behaved.",
    seeAlso: ["worktree", "agent-backend"],
    docsHref: "/docs/concepts/sandboxing",
  },
  {
    slug: "beacon",
    term: "Beacon",
    aliases: ["watchfire beacon"],
    category: "concepts",
    definition:
      "The signal a task emits to mark itself complete — concretely, the moment its YAML file flips to `status: done`. The daemon watches `.watchfire/tasks/` and reacts to that change: if `auto_merge` is on and `success: true`, the worktree's branch is merged into the default branch.",
    seeAlso: ["done", "auto-merge", "success"],
  },
  {
    slug: "pty",
    term: "PTY",
    aliases: ["pseudo-terminal", "pseudo terminal"],
    category: "concepts",
    definition:
      "Pseudo-terminal. Every agent backend is itself a CLI, so Watchfire spawns it inside a PTY — that's what lets terminal-UI agents render normally, lets the daemon capture the live transcript, and lets the TUI and GUI replay output without re-running the agent.",
    seeAlso: ["agent-backend", "daemon"],
  },
  {
    slug: "agent-backend",
    term: "Agent backend",
    aliases: ["agent CLI", "backend", "agent"],
    category: "concepts",
    definition:
      "The coding agent CLI Watchfire is driving — Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent. Watchfire doesn't bundle a model; pick a backend per project in `project.yaml` and Watchfire reuses that CLI's existing auth.",
    seeAlso: ["chat-mode", "task-mode"],
    docsHref: "/docs/concepts/supported-agents",
  },

  // ---------- Components ----------
  {
    slug: "daemon",
    term: "Daemon (watchfired)",
    aliases: ["watchfired", "watchfire daemon"],
    category: "components",
    definition:
      "The single orchestrator process. Spawns agent PTYs, manages git worktrees, watches task files, tracks status, and serves gRPC to every client. Lives at `~/.watchfire/daemon.yaml`; start with `watchfire daemon start` or `watchfired --foreground` for live logs.",
    seeAlso: ["cli", "gui", "pty"],
    docsHref: "/docs/components/daemon",
  },
  {
    slug: "cli",
    term: "CLI / TUI (watchfire)",
    aliases: ["watchfire CLI", "watchfire TUI", "tui"],
    category: "components",
    definition:
      "The `watchfire` binary — a thin gRPC client to the daemon that doubles as an interactive Bubbletea-based TUI. The CLI form is for scripts and one-off commands; the TUI is the keyboard-driven dashboard for running tasks and monitoring agents.",
    seeAlso: ["daemon", "gui"],
    docsHref: "/docs/components/cli",
  },
  {
    slug: "gui",
    term: "GUI (Watchfire.app)",
    aliases: ["watchfire gui", "watchfire desktop", "watchfire app"],
    category: "components",
    definition:
      "The Electron desktop client. Multi-project view with live agent terminal output, point-and-click task management, and a system tray. Shares state with the CLI/TUI through the same daemon — open both at once and they stay in sync.",
    seeAlso: ["daemon", "cli"],
    docsHref: "/docs/components/gui",
  },

  // ---------- Lifecycle ----------
  {
    slug: "draft",
    term: "draft",
    aliases: ["status: draft"],
    category: "lifecycle",
    definition:
      "A task status meaning \"don't run me yet.\" Drafts are safe to edit. Wildfire's refine phase improves drafts before promoting them, and generated tasks always land as drafts so you can review them before flipping to `ready`.",
    seeAlso: ["ready", "generate-tasks", "wildfire"],
  },
  {
    slug: "ready",
    term: "ready",
    aliases: ["status: ready"],
    category: "lifecycle",
    definition:
      "A task status meaning \"safe to execute.\" If `auto_start_tasks` is on, the daemon picks `ready` tasks up immediately; otherwise they sit in the queue waiting for Task mode, Start All, or Wildfire to consume them.",
    seeAlso: ["draft", "start-all", "auto-start-tasks"],
  },
  {
    slug: "done",
    term: "done",
    aliases: ["status: done", "completed task"],
    category: "lifecycle",
    definition:
      "A task status set by the agent when a run finishes — successfully or not. Read the `success` flag to know which. The daemon's file watcher reacts to `done` to trigger auto-merge or, on failure, to keep the worktree around for inspection.",
    seeAlso: ["success", "failure-reason", "auto-merge", "beacon"],
  },
  {
    slug: "success",
    term: "success",
    aliases: ["success: true", "success: false"],
    category: "lifecycle",
    definition:
      "Boolean outcome flag on a completed task. `true` means the agent finished the work; `false` means it bailed, was blocked, or hit something it couldn't recover from. Pair `success: false` with a non-empty `failure_reason`.",
    seeAlso: ["done", "failure-reason"],
  },
  {
    slug: "failure-reason",
    term: "failure_reason",
    aliases: ["failureReason"],
    category: "lifecycle",
    definition:
      "Free-text field on a task that explains why `success` is `false`. Show it in reviews so a human knows whether to retry, redefine, or drop the task entirely. Always empty for successful tasks.",
    seeAlso: ["success", "done"],
  },
  {
    slug: "auto-merge",
    term: "auto_merge",
    aliases: ["auto merge", "automerge"],
    category: "lifecycle",
    definition:
      "Per-project setting (chosen at `watchfire init`) that decides whether a successful task's branch is merged into the default branch automatically. With it off, the worktree lands on `watchfire/<n>` and waits for you to merge by hand.",
    seeAlso: ["auto-delete-branch", "worktree", "done"],
  },
  {
    slug: "auto-delete-branch",
    term: "auto_delete_branch",
    aliases: ["branch cleanup"],
    category: "lifecycle",
    definition:
      "Per-project setting that decides whether the `watchfire/<n>` branch and its worktree are deleted after a successful auto-merge. Convenient for hands-off runs; turn it off if you want to keep the branch history for review.",
    seeAlso: ["auto-merge", "worktree"],
  },

  // ---------- Config ----------
  {
    slug: "project-yaml",
    term: "project.yaml",
    aliases: ["project config", "project file"],
    category: "config",
    definition:
      "The per-project config file at `.watchfire/project.yaml`. Holds the project id, name, default branch, default agent backend, sandbox settings, auto-merge toggles, the next-task counter, and the project definition. Edit it in place or via `watchfire settings`.",
    seeAlso: ["task-yaml", "definition", "next-task-number", "agent-backend"],
    docsHref: "/docs/concepts/projects-and-tasks",
  },
  {
    slug: "task-yaml",
    term: "task.yaml",
    aliases: ["task config", "task.yaml schema"],
    category: "config",
    definition:
      "An individual task file at `.watchfire/tasks/<n>.yaml`. At minimum it has `title`, `prompt`, `acceptance_criteria`, and `status`. The daemon fills in IDs and timestamps after a run; never write timestamps as empty strings — leave the fields off and let the daemon populate them.",
    seeAlso: ["task", "draft", "ready", "done"],
    docsHref: "/docs/concepts/projects-and-tasks",
  },
  {
    slug: "next-task-number",
    term: "next_task_number",
    aliases: ["task counter"],
    category: "config",
    definition:
      "Monotonic counter in `project.yaml` used to name the next task file (`.watchfire/tasks/0157.yaml`, `0158.yaml`, …). Watchfire bumps it whenever it creates a task; agents creating tasks autonomously read this counter to pick their next filename.",
    seeAlso: ["task-yaml", "project-yaml"],
  },
  {
    slug: "definition",
    term: "definition",
    aliases: ["project definition"],
    category: "config",
    definition:
      "Free-form description of what the project is and how the agent should approach it — stack, conventions, gotchas. The daemon injects it into the agent's system prompt at launch. You can write it yourself or run `watchfire definition generate` and edit the draft.",
    seeAlso: ["generate-definition", "project-yaml"],
  },
];

export function groupedGlossary(): {
  category: GlossaryCategoryMeta;
  entries: GlossaryEntry[];
}[] {
  return glossaryCategories.map((category) => ({
    category,
    entries: glossary.filter((entry) => entry.category === category.id),
  }));
}

export function findGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossary.find((entry) => entry.slug === slug);
}
