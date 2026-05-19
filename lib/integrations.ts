import { agentBackends, type AgentBackendIcon } from "@/lib/agent-backends";

export type IntegrationCategory =
  | "agent"
  | "version-control"
  | "editor"
  | "sandbox"
  | "secrets"
  | "ci"
  | "shell";

export type IntegrationStatus = "first-class" | "works" | "planned";

export type IntegrationIcon =
  | AgentBackendIcon
  | "GitBranch"
  | "GitFork"
  | "Box"
  | "Code"
  | "TerminalSquare"
  | "PlayCircle"
  | "Workflow"
  | "KeyRound"
  | "Lock"
  | "FileKey"
  | "Shield"
  | "ShieldCheck"
  | "ShieldHalf"
  | "Edit3";

export type Integration = {
  slug: string;
  name: string;
  category: IntegrationCategory;
  tagline: string;
  status: IntegrationStatus;
  summary: string;
  docsHref?: string;
  homepage?: string;
  iconKey: IntegrationIcon;
  /** For agents, the link to /agents/<slug>. */
  detailHref?: string;
};

export const integrationCategoryOrder: readonly IntegrationCategory[] = [
  "agent",
  "version-control",
  "editor",
  "sandbox",
  "secrets",
  "ci",
  "shell",
];

export const integrationCategoryLabels: Record<IntegrationCategory, string> = {
  agent: "Agents",
  "version-control": "Version control",
  editor: "Editors",
  sandbox: "Sandbox",
  secrets: "Secrets",
  ci: "CI",
  shell: "Shell",
};

export const integrationCategoryLeads: Record<IntegrationCategory, string> = {
  agent:
    "These are the agent backends Watchfire runs. Pick the one you already use — Watchfire wraps it in a worktree, a sandbox, and a clean transcript.",
  "version-control":
    "Watchfire is a git tool first. The host you push to is up to you — it stays out of your remote's way.",
  editor:
    "Watchfire is not an editor plugin. Each task runs in a git worktree your editor can open, so anything that opens a folder works.",
  sandbox:
    "Watchfire fences every agent inside a platform sandbox. The agent has full autonomy inside; the sandbox decides what \"inside\" means.",
  secrets:
    "Watchfire reads secrets from its own instructions file and from the environment your shell already provides. It does not replace your secret manager.",
  ci:
    "Watchfire runs on your machine. Your CI keeps running against the merged branch — exactly as it did before Watchfire showed up.",
  shell:
    "The CLI is a static Go binary. Any POSIX shell works — Watchfire does not care what prompt you use.",
};

// Agent integrations are sourced directly from lib/agent-backends.ts.
const agentIntegrations: readonly Integration[] = agentBackends.map((agent) => ({
  slug: agent.slug,
  name: agent.name,
  category: "agent",
  tagline: agent.tagline,
  status: "first-class",
  summary: agent.summary,
  docsHref: agent.docsHref,
  homepage: agent.homepage,
  iconKey: agent.icon,
  detailHref: `/agents/${agent.slug}`,
}));

const nonAgentIntegrations: readonly Integration[] = [
  // Version control
  {
    slug: "git",
    name: "Git",
    category: "version-control",
    tagline: "The hard dependency. Every task is a branch, every branch is a worktree.",
    status: "first-class",
    summary:
      "Watchfire is a git tool. Each task gets a dedicated branch (watchfire/<n>) and its own worktree at .watchfire/worktrees/<n>/. The daemon creates, merges, and cleans up branches for you — Git is what holds the whole model together.",
    docsHref: "/docs/concepts/worktrees",
    homepage: "https://git-scm.com",
    iconKey: "GitBranch",
  },
  {
    slug: "github",
    name: "GitHub",
    category: "version-control",
    tagline: "The most common home for Watchfire repos — and the only host with first-party glue.",
    status: "works",
    summary:
      "Watchfire pushes nothing on its own, but a few Watchfire features speak GitHub specifically — the auto-PR adapter, the GitHub PR-merge inbound handler that marks a task done, the badge embed, and the \"edit on GitHub\" link in the docs. Everything else is host-agnostic.",
    docsHref: "/docs/concepts/integrations",
    homepage: "https://github.com",
    iconKey: "Github",
  },
  {
    slug: "gitlab",
    name: "GitLab",
    category: "version-control",
    tagline: "Self-hosted or SaaS — Watchfire pushes branches, you review them in GitLab.",
    status: "works",
    summary:
      "Watchfire works against any git remote, so GitLab projects are first-class as a git host. The GitHub-specific bits (auto-PR adapter, PR-merge webhook) don't have GitLab equivalents yet — you open and merge MRs in GitLab itself, the same way you would without Watchfire in the loop.",
    homepage: "https://about.gitlab.com",
    iconKey: "GitFork",
  },
  {
    slug: "bitbucket",
    name: "Bitbucket",
    category: "version-control",
    tagline: "A git host like any other — Watchfire's branch-and-merge flow doesn't care.",
    status: "works",
    summary:
      "Bitbucket is a git host, and Watchfire's worktree model is built on git, so the two cooperate by being out of each other's way. Open the pull request in Bitbucket as you would for any other change — Watchfire's job stops at the merged branch.",
    homepage: "https://bitbucket.org",
    iconKey: "Box",
  },
  {
    slug: "forgejo",
    name: "Forgejo / Gitea",
    category: "version-control",
    tagline: "Self-hosted git forges work the same as anything else.",
    status: "works",
    summary:
      "Forgejo and Gitea-family forges are git hosts, so Watchfire's branch-per-task workflow drops in without changes. Watchfire's GitHub-specific webhook handler doesn't have a Forgejo equivalent yet, so the round-trip from \"PR merged\" to \"task marked done\" stays manual on these hosts.",
    homepage: "https://forgejo.org",
    iconKey: "GitFork",
  },

  // Editors
  {
    slug: "vs-code",
    name: "VS Code",
    category: "editor",
    tagline: "Open the worktree folder and review the diff like any other branch.",
    status: "works",
    summary:
      "Watchfire is a CLI / TUI / GUI, not a VS Code extension. Each task runs in its own git worktree at .watchfire/worktrees/<n>/ — point VS Code at that folder when you want to inspect a task in flight, or at your main checkout to review the merged result.",
    docsHref: "/docs/concepts/worktrees",
    homepage: "https://code.visualstudio.com",
    iconKey: "Code",
  },
  {
    slug: "jetbrains",
    name: "JetBrains IDEs",
    category: "editor",
    tagline: "IntelliJ, GoLand, WebStorm and friends — open the worktree, review the branch.",
    status: "works",
    summary:
      "Same model as VS Code: Watchfire works on git worktrees, and any JetBrains IDE that opens a folder can open one. Watchfire isn't installed inside the IDE — the IDE is just the place you read the code, including the merged result.",
    docsHref: "/docs/concepts/worktrees",
    homepage: "https://www.jetbrains.com",
    iconKey: "Code",
  },
  {
    slug: "neovim",
    name: "Neovim / Vim",
    category: "editor",
    tagline: "Watchfire runs in your other terminal pane.",
    status: "works",
    summary:
      "Watchfire is a terminal-first tool, which makes it a natural fit for a Neovim/Vim workflow. Open the worktree folder in your editor, run the TUI in a split pane, and you can watch tasks land branch by branch without leaving the terminal.",
    homepage: "https://neovim.io",
    iconKey: "Edit3",
  },
  {
    slug: "cursor-editor",
    name: "Cursor (the editor)",
    category: "editor",
    tagline: "Distinct from Cursor Agent, the CLI. The IDE just opens the worktree.",
    status: "works",
    summary:
      "Cursor the editor is a separate product from Cursor Agent, the headless CLI Watchfire runs as a backend. The editor cooperates with Watchfire the same way VS Code does — open the worktree folder, review the diff. The CLI is the agent in the loop, not the IDE.",
    docsHref: "/agents/cursor",
    homepage: "https://www.cursor.com",
    iconKey: "Edit3",
  },

  // Sandbox
  {
    slug: "seatbelt",
    name: "macOS Seatbelt",
    category: "sandbox",
    tagline: "Kernel-level sandboxing on macOS — the default on every Mac.",
    status: "first-class",
    summary:
      "On macOS, Watchfire wraps each agent in sandbox-exec with a generated Seatbelt profile. The profile blocks ~/.ssh, ~/.aws, ~/.gnupg, and .env files by default, restricts writes outside the worktree, and inherits into any child process the agent spawns.",
    docsHref: "/docs/concepts/sandboxing",
    homepage: "https://developer.apple.com/library/archive/documentation/Security/Conceptual/AppSandboxDesignGuide/AboutAppSandbox/AboutAppSandbox.html",
    iconKey: "Shield",
  },
  {
    slug: "landlock",
    name: "Linux Landlock",
    category: "sandbox",
    tagline: "The preferred Linux backend — zero external dependencies on kernel 5.13+.",
    status: "first-class",
    summary:
      "On Linux kernels 5.13 and newer, Watchfire applies Landlock filesystem restrictions in a re-exec'd helper process before launching the agent. Landlock is a kernel LSM, so the agent process can't escape the rules — and there's nothing to install beyond the kernel itself.",
    docsHref: "/docs/concepts/sandboxing",
    homepage: "https://landlock.io",
    iconKey: "ShieldCheck",
  },
  {
    slug: "bubblewrap",
    name: "Linux Bubblewrap",
    category: "sandbox",
    tagline: "Fallback Linux backend when Landlock isn't available.",
    status: "first-class",
    summary:
      "On older Linux kernels (pre-5.13) or in environments where Landlock isn't usable, Watchfire falls back to Bubblewrap. It's the same blast-radius contract — restricted filesystem, blocked sensitive paths — via user-space namespaces rather than the kernel LSM.",
    docsHref: "/docs/concepts/sandboxing",
    homepage: "https://github.com/containers/bubblewrap",
    iconKey: "ShieldHalf",
  },

  // Secrets
  {
    slug: "os-keyring",
    name: "OS keyring (macOS Keychain, libsecret)",
    category: "secrets",
    tagline: "Where Watchfire stores its own outbound adapter credentials.",
    status: "works",
    summary:
      "Watchfire persists its own integration secrets — outbound webhook signing keys, Slack and Discord bot tokens, GitHub auto-PR credentials — in the OS keyring, with a file-store fallback when none is available. Saved through the gRPC surface, never read back over the wire.",
    docsHref: "/docs/concepts/integrations",
    iconKey: "KeyRound",
  },
  {
    slug: "password-manager-cli",
    name: "1Password / Bitwarden / pass",
    category: "secrets",
    tagline: "Use your shell's secret tooling — Watchfire reads from the environment.",
    status: "works",
    summary:
      "Watchfire doesn't replace your secret manager. Source your secrets the way you already do — 1Password CLI, Bitwarden CLI, pass, direnv, anything that exports environment variables — and Watchfire's secrets-instructions file tells the agent how to use them.",
    docsHref: "/docs/concepts/secrets",
    iconKey: "Lock",
  },
  {
    slug: "dotenv",
    name: ".env files",
    category: "secrets",
    tagline: "Blocked by the sandbox on purpose — describe them in the instructions file instead.",
    status: "works",
    summary:
      "The Watchfire sandbox blocks .env files from the agent on purpose, so credentials don't leak into transcripts. Tell the agent what's in the file via .watchfire/secrets/instructions.md — the prompt-time instructions stay inside Watchfire, the actual values stay outside the agent's reach.",
    docsHref: "/docs/concepts/secrets",
    iconKey: "FileKey",
  },

  // CI
  {
    slug: "github-actions",
    name: "GitHub Actions",
    category: "ci",
    tagline: "Watchfire merges the branch. Actions runs your tests on it as normal.",
    status: "works",
    summary:
      "Watchfire is local-first — it doesn't run your tests in the cloud. When a Watchfire branch lands, GitHub Actions picks it up like any other commit and runs the workflows you already have. Watchfire's role stops at the merge; the CI run is your existing pipeline doing its job.",
    homepage: "https://github.com/features/actions",
    iconKey: "Workflow",
  },
  {
    slug: "generic-ci",
    name: "Any CI provider",
    category: "ci",
    tagline: "CircleCI, GitLab CI, Buildkite, Jenkins — Watchfire is local-first.",
    status: "works",
    summary:
      "Whatever your CI runs against the merged branch on your remote will run when Watchfire lands a branch, too. There's no Watchfire-side runner, no hosted execution, no extra step in the pipeline — your CI keeps doing what it already did, just on commits that happen to have been written by an agent.",
    iconKey: "PlayCircle",
  },

  // Shell
  {
    slug: "posix-shells",
    name: "bash / zsh / fish",
    category: "shell",
    tagline: "A static Go binary — works in any POSIX shell you already have.",
    status: "works",
    summary:
      "The watchfire CLI is a single Go binary. Tab completion ships for bash, zsh, and fish; everything else is plain executables and flags. If your shell can run a binary on $PATH, it can run Watchfire.",
    iconKey: "TerminalSquare",
  },
];

export const integrations: readonly Integration[] = [
  ...agentIntegrations,
  ...nonAgentIntegrations,
];

export function getIntegrationsByCategory(
  category: IntegrationCategory,
): readonly Integration[] {
  return integrations.filter((i) => i.category === category);
}

export const integrationStats = {
  totalAgents: integrations.filter((i) => i.category === "agent").length,
  firstClass: integrations.filter((i) => i.status === "first-class").length,
  categories: new Set(integrations.map((i) => i.category)).size,
} as const;
