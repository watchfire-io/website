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

export type IntegrationSetupSnippet = {
  /** Short explainer rendered above the snippet. */
  caption?: string;
  /** Language hint for future syntax highlighting; rendered as text today. */
  language?: string;
  /** The snippet body itself. */
  code: string;
};

export type IntegrationRelatedDoc = {
  label: string;
  href: string;
  description?: string;
};

export type Integration = {
  slug: string;
  name: string;
  category: IntegrationCategory;
  tagline: string;
  status: IntegrationStatus;
  summary: string;
  /** Extended 2–3 sentence lead used on the per-integration page. */
  description?: string;
  /** Optional 2–3 short paragraphs for the "How it fits" body. */
  paragraphs?: readonly string[];
  /** Optional 3-bullet "What Watchfire does with <X>" block. */
  bullets?: readonly string[];
  /** Optional copy-pasteable setup snippet. */
  setupSnippet?: IntegrationSetupSnippet;
  /** Related docs surfaced on the per-integration page. */
  relatedDocs?: readonly IntegrationRelatedDoc[];
  docsHref?: string;
  homepage?: string;
  iconKey: IntegrationIcon;
  /** For agents, the link to /agents/<slug>. Distinct from the /integrations/<slug> page. */
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

// Agent integrations are sourced directly from lib/agent-backends.ts and
// enriched with the per-page fields derived from the agent's own metadata.
const agentIntegrations: readonly Integration[] = agentBackends.map((agent) => ({
  slug: agent.slug,
  name: agent.name,
  category: "agent",
  tagline: agent.tagline,
  status: "first-class",
  summary: agent.summary,
  description: agent.summary,
  paragraphs: [agent.withWatchfire],
  bullets: agent.quirks.slice(0, 3),
  setupSnippet: {
    caption: `Install Watchfire and initialise a project that defaults to ${agent.name}. Make sure the agent CLI itself is installed and signed in first.`,
    language: "bash",
    code: agent.installCommand,
  },
  relatedDocs: [
    {
      label: `${agent.name} setup notes`,
      href: agent.docsHref,
      description: `Vendor-specific notes on installing and authenticating ${agent.name} for Watchfire.`,
    },
    {
      label: "Quickstart",
      href: "/docs/quickstart",
      description: "Init a project, add a task, and run an agent end to end.",
    },
    {
      label: "Supported agents",
      href: "/docs/concepts/supported-agents",
      description: "How Watchfire isolates each backend's home directory and config.",
    },
  ],
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
    description:
      "Git is the substrate Watchfire is built on. Every task is a branch, every branch lives in its own worktree, and the daemon handles the create-merge-clean lifecycle for you.",
    paragraphs: [
      "Watchfire is opinionated about git in the same way a CI server is — it owns the branch namespace it touches (watchfire/<n>) and the worktree directory (.watchfire/worktrees/<n>/), and leaves the rest of your repo alone.",
      "When you start a task, the daemon creates a fresh worktree at HEAD of your default branch, runs the agent in that worktree, and merges the branch back into the default when the task is marked done — tearing the worktree down on the way out.",
      "Because each task is its own branch and its own worktree, you can run several agents in parallel without them stepping on each other's changes. The git model is what makes that possible.",
    ],
    setupSnippet: {
      caption:
        "Works out of the box. Watchfire init runs inside any existing git repo and assumes main is your default branch — change it in project.yaml if yours is named otherwise.",
      language: "yaml",
      code: "# .watchfire/project.yaml\ndefault_branch: main\nauto_merge: true\nauto_delete_branch: true",
    },
    relatedDocs: [
      {
        label: "Worktrees concept",
        href: "/docs/concepts/worktrees",
        description: "How per-task worktrees keep agents isolated.",
      },
      {
        label: "Projects and tasks",
        href: "/docs/concepts/projects-and-tasks",
        description: "The lifecycle from task draft to merged branch.",
      },
    ],
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
    description:
      "GitHub is the most common home for Watchfire repos. The branch-and-worktree model treats it like any other git remote, but a few Watchfire features speak GitHub specifically.",
    bullets: [
      "Optional auto-PR adapter — when a task completes, open a pull request against your default branch instead of merging directly.",
      "GitHub webhook handler — when a PR is merged upstream, the corresponding Watchfire task is automatically marked done.",
      "Edit-on-GitHub deep links in the docs and a public badge embed for project READMEs.",
    ],
    relatedDocs: [
      {
        label: "Integrations concept",
        href: "/docs/concepts/integrations",
        description: "How Watchfire's outbound adapters and inbound webhooks work.",
      },
    ],
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
    description:
      "GitLab is a git host like any other for Watchfire's branch-per-task workflow. The host-specific glue (auto-PR, PR-merge webhook) is GitHub-only today; everything else drops in without changes.",
    bullets: [
      "Push and merge requests work like any other git remote — Watchfire never touches the GitLab API directly.",
      "Self-hosted and SaaS GitLab both work; the worktree model only depends on git, not the host.",
      "The GitHub-specific PR-merge webhook has no GitLab equivalent yet — mark the task done in Watchfire after merging the MR.",
    ],
    relatedDocs: [
      {
        label: "Worktrees concept",
        href: "/docs/concepts/worktrees",
        description: "Why every task gets its own branch.",
      },
    ],
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
    description:
      "Bitbucket is a git host like any other for Watchfire — there's no Bitbucket-specific code on the Watchfire side, and there doesn't need to be.",
    bullets: [
      "Bitbucket is a git host — Watchfire pushes a branch, you open the pull request yourself.",
      "No Watchfire-side Bitbucket integration; the cooperation is whatever you already do for any branch.",
      "Worktree, sandbox, and merge-back-to-default behaviour is identical to every other host.",
    ],
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
    description:
      "Forgejo and Gitea — and the wider self-hosted forge ecosystem they belong to — work with Watchfire because they're git, full stop.",
    bullets: [
      "Self-hosted Forgejo and Gitea forges drop in via git, no Watchfire-side configuration.",
      "Push the watchfire/<n> branch and open the pull request in your forge.",
      "The GitHub-specific webhook for auto-marking tasks done isn't ported yet — close the task in Watchfire after merge.",
    ],
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
    description:
      "Watchfire and VS Code don't compete — Watchfire runs the agent in a worktree, and VS Code reads the worktree like any other folder.",
    bullets: [
      "Open .watchfire/worktrees/<n>/ in VS Code to inspect a task while it's running.",
      "Each worktree is a real checkout, so VS Code's git UI shows the task branch and diff like any other branch.",
      "No extension to install — Watchfire is a separate CLI/TUI/GUI; the editor is just the lens you read code through.",
    ],
    relatedDocs: [
      {
        label: "Worktrees concept",
        href: "/docs/concepts/worktrees",
        description: "What worktrees Watchfire produces and where.",
      },
    ],
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
    description:
      "JetBrains IDEs cooperate with Watchfire the same way VS Code does: open the worktree folder, review the branch.",
    bullets: [
      "Any IntelliJ-family IDE that opens a folder can open a Watchfire worktree.",
      "Use the IDE's built-in git tools to diff and review the task branch like any other feature branch.",
      "No plugin or sidecar — the IDE doesn't need to know Watchfire exists.",
    ],
    relatedDocs: [
      {
        label: "Worktrees concept",
        href: "/docs/concepts/worktrees",
      },
    ],
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
    description:
      "Watchfire is terminal-first by design, so a Neovim or Vim workflow slots in cleanly — your editor in one pane, the TUI in another.",
    bullets: [
      "Run the Watchfire TUI in one terminal pane and Neovim in the next.",
      "Worktrees are plain folders — :cd .watchfire/worktrees/<n> and you're in the task's checkout.",
      "No plugin needed; the workflow is the same one you already use to switch between feature branches.",
    ],
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
    description:
      "Cursor the editor and Cursor Agent the CLI are two different products. Watchfire integrates with the CLI; the editor cooperates the same way VS Code does — by opening the worktree.",
    bullets: [
      "Distinct from Cursor Agent — Watchfire integrates with the headless CLI as a backend, but the editor itself is just an editor.",
      "Open the worktree folder in Cursor when you want to see the task's diff with Cursor's chat alongside it.",
      "Cursor's in-editor agent and Watchfire are independent — they can coexist in the same checkout without conflict.",
    ],
    relatedDocs: [
      {
        label: "Cursor Agent backend",
        href: "/agents/cursor",
        description: "The CLI Watchfire actually runs — separate from the IDE.",
      },
    ],
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
    description:
      "macOS Seatbelt (sandbox-exec) is the kernel-level sandbox Watchfire wraps every agent in on Mac. It's part of macOS itself, not a separate dependency, so on a fresh Mac the sandbox is already there.",
    paragraphs: [
      "Watchfire generates a per-session Seatbelt profile that denies reads of ~/.ssh, ~/.aws, ~/.gnupg, and .env files anywhere in the worktree. Writes are scoped to the task's worktree and Watchfire's own temp directories. The profile inherits into every process the agent spawns — subshells, build scripts, language runtimes, all of it.",
      "Because the profile is kernel-enforced, an agent that tries to read or write a denied path gets an EPERM from the OS — there's nothing it can do at the agent layer to talk its way past the rule.",
      "If sandbox-exec ever isn't available (a stripped-down macOS image, for example) Watchfire refuses to launch the agent rather than falling back to an unsandboxed run. The sandbox is non-optional.",
    ],
    setupSnippet: {
      caption:
        "Seatbelt is the default on macOS — no setup needed beyond watchfire init. See the sandboxing concept for what the generated profile contains.",
      language: "yaml",
      code: "# .watchfire/project.yaml\nsandbox: sandbox-exec  # default on macOS",
    },
    relatedDocs: [
      {
        label: "Sandboxing concept",
        href: "/docs/concepts/sandboxing",
        description: "What Seatbelt denies, what it allows, and how Watchfire generates the profile.",
      },
    ],
    docsHref: "/docs/concepts/sandboxing",
    homepage:
      "https://developer.apple.com/library/archive/documentation/Security/Conceptual/AppSandboxDesignGuide/AboutAppSandbox/AboutAppSandbox.html",
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
    description:
      "Landlock is the preferred Linux sandbox backend for Watchfire. It's a kernel Linux Security Module — available on every kernel 5.13 or newer — which means agents are fenced at the syscall layer without any external dependency.",
    paragraphs: [
      "When you start a session on a recent Linux kernel, Watchfire re-execs into a small helper process, applies Landlock filesystem rules, then exec's the agent. From that moment on the agent (and everything it spawns) sees a restricted view of the filesystem: writes scoped to the worktree, sensitive paths unreadable, and the rules can't be unset from user space.",
      "Compared to Bubblewrap and other namespace-based sandboxes, Landlock is lower-cost and more honest — there's no mount namespace to break out of, and no privileged setup. The kernel does the work.",
      "If Landlock is disabled or unavailable on your kernel, Watchfire falls back to Bubblewrap automatically. You can pin one or the other in project.yaml when you want the build to fail loudly instead of degrading silently.",
    ],
    setupSnippet: {
      caption:
        "Watchfire detects Landlock support automatically. Pin it explicitly when you want startup to fail loudly on an older kernel.",
      language: "yaml",
      code: "# .watchfire/project.yaml\nsandbox: landlock  # require Landlock; refuse to start without it",
    },
    relatedDocs: [
      {
        label: "Sandboxing concept",
        href: "/docs/concepts/sandboxing",
        description: "Backend selection, denylist, and per-session profiles.",
      },
    ],
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
    description:
      "Bubblewrap is Watchfire's Linux sandbox fallback when Landlock isn't available — typically on kernels older than 5.13, or in environments where the Landlock LSM has been disabled at boot.",
    paragraphs: [
      "Bubblewrap uses user namespaces, mount namespaces, and seccomp filters to construct a restricted view of the host filesystem before the agent process starts. The blast-radius contract is the same as Landlock — sensitive paths are unreadable, writes are scoped to the worktree, and the rules survive child-process exec.",
      "Compared to Landlock, Bubblewrap is more moving parts: namespaces have to be set up, and some hardened distributions disable unprivileged user namespaces. Watchfire reports that as a startup error rather than silently degrading to an unsandboxed run.",
      "If you have a choice, prefer Landlock. Bubblewrap exists so older fleets don't have to upgrade their kernel before adopting Watchfire.",
    ],
    setupSnippet: {
      caption:
        "Install bubblewrap from your distro's package manager. Watchfire will use it automatically when Landlock is not available.",
      language: "bash",
      code: "# Debian / Ubuntu\nsudo apt install bubblewrap\n\n# Fedora\nsudo dnf install bubblewrap\n\n# Arch\nsudo pacman -S bubblewrap",
    },
    relatedDocs: [
      {
        label: "Sandboxing concept",
        href: "/docs/concepts/sandboxing",
        description: "How Watchfire decides between Landlock and Bubblewrap.",
      },
    ],
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
    description:
      "Watchfire stores its own adapter credentials in the host's OS keyring — not your application secrets, but the tokens Watchfire itself uses to talk to Slack, GitHub, and webhooks.",
    bullets: [
      "Outbound adapter credentials — webhook signing keys, Slack and Discord bot tokens, GitHub auto-PR tokens — are persisted in the OS keyring.",
      "On macOS that's the system Keychain; on Linux it's libsecret via the Secret Service API; with an encrypted file-store fallback when neither is available.",
      "Secrets are written via the gRPC surface and never read back over the wire — clients see opaque references, not the values themselves.",
    ],
    relatedDocs: [
      {
        label: "Integrations concept",
        href: "/docs/concepts/integrations",
        description: "Outbound adapters and where their credentials live.",
      },
    ],
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
    description:
      "Watchfire deliberately doesn't ship a secret manager. Your shell already has one — Watchfire just reads what the shell exports and tells the agent what's available.",
    bullets: [
      "Source environment variables the way you already do — Watchfire doesn't replace your secret manager.",
      "1Password CLI (op), Bitwarden CLI (bw), pass, direnv — anything that exports variables into your shell before running Watchfire.",
      "Tell the agent what's available via the secrets instructions file; Watchfire never reads or stores your secret values.",
    ],
    setupSnippet: {
      caption:
        "Document each secret in the instructions file the agent reads at start. Values stay in the environment; descriptions live in Watchfire.",
      language: "markdown",
      code: "# .watchfire/secrets/instructions.md\n\n## Available environment variables\n\n- OPENAI_API_KEY — OpenAI API key for the test fixtures.\n- DATABASE_URL — Local Postgres connection string, set by 1Password CLI.",
    },
    relatedDocs: [
      {
        label: "Secrets concept",
        href: "/docs/concepts/secrets",
        description: "How Watchfire surfaces shell-provided secrets to agents.",
      },
    ],
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
    description:
      ".env files are blocked at the sandbox layer on purpose. The agent gets a written description of what's available; the values stay in the environment, outside the transcript.",
    bullets: [
      ".env files are blocked at the sandbox layer — the agent literally cannot read them.",
      "This is intentional: it stops credentials from leaking into transcripts the agent might paste back into chat output.",
      "Describe what's in .env via .watchfire/secrets/instructions.md; the agent gets the description, the runtime gets the values, the transcript stays clean.",
    ],
    relatedDocs: [
      {
        label: "Secrets concept",
        href: "/docs/concepts/secrets",
        description: "How instructions and environment variables work together.",
      },
      {
        label: "Sandboxing concept",
        href: "/docs/concepts/sandboxing",
        description: "What the sandbox blocks by default.",
      },
    ],
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
    description:
      "GitHub Actions and Watchfire run on opposite sides of the merge. Watchfire is local — it produces the branch and the merge. Actions is your existing CI, running on the resulting commits.",
    paragraphs: [
      "When Watchfire merges a task's branch into your default branch, the push triggers your existing GitHub Actions workflows exactly as it would for a hand-pushed commit. There's no Watchfire-specific runner, no extra step, no hosted execution layer in the middle.",
      "That separation is deliberate. The Watchfire daemon's job stops at the merged branch — running tests, building releases, deploying to staging, anything beyond that is your CI pipeline doing what it's already configured to do.",
      "If a Watchfire-produced commit fails CI, treat it exactly like any other broken commit on the default branch: revert, fix, push. Watchfire doesn't need to be involved in the rollback.",
    ],
    relatedDocs: [
      {
        label: "Projects and tasks",
        href: "/docs/concepts/projects-and-tasks",
        description: "The lifecycle from task to merged branch — and where CI picks up.",
      },
    ],
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
    description:
      "Watchfire doesn't know what CI provider you use, and that's the point — whatever runs against your default branch keeps running, no Watchfire-side configuration required.",
    bullets: [
      "CircleCI, GitLab CI, Buildkite, Jenkins, Drone — Watchfire never knows your CI provider exists.",
      "Whatever runs against commits on your default branch will run against Watchfire-produced commits, with no extra configuration.",
      "There's no Watchfire-side runner or hosted execution layer. The merged branch is where the handoff happens.",
    ],
    relatedDocs: [
      {
        label: "Projects and tasks",
        href: "/docs/concepts/projects-and-tasks",
      },
    ],
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
    description:
      "The watchfire CLI is a single static Go binary with completions for the three common POSIX shells. There's nothing shell-specific to source.",
    bullets: [
      "The watchfire CLI is a single static Go binary — drop it on $PATH and it runs.",
      "Tab completion ships for bash, zsh, and fish via watchfire completion <shell>.",
      "Everything else is plain executables and flags — no shell-specific helpers, no sourcing required.",
    ],
    setupSnippet: {
      caption:
        "Generate a completion file for your shell and drop it where the shell looks. The CLI itself works without it; this just gets you tab-complete.",
      language: "bash",
      code: "# zsh\nwatchfire completion zsh > ~/.zsh/completions/_watchfire\n\n# bash\nwatchfire completion bash > /etc/bash_completion.d/watchfire\n\n# fish\nwatchfire completion fish > ~/.config/fish/completions/watchfire.fish",
    },
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

export function getIntegration(slug: string): Integration | undefined {
  return integrations.find((i) => i.slug === slug);
}

export function getRelatedIntegrations(
  slug: string,
  limit = 3,
): readonly Integration[] {
  const current = getIntegration(slug);
  if (!current) return [];
  const sameCategory = integrations.filter(
    (i) => i.category === current.category && i.slug !== slug,
  );
  return sameCategory.slice(0, limit);
}

export const integrationStats = {
  totalAgents: integrations.filter((i) => i.category === "agent").length,
  firstClass: integrations.filter((i) => i.status === "first-class").length,
  categories: new Set(integrations.map((i) => i.category)).size,
} as const;
