export type ComparisonAxis = {
  axis: string;
  rival: string;
  watchfire: string;
  notes?: string;
};

export type ComparisonRelatedDoc = {
  href: string;
  label: string;
  description?: string;
};

export type ComparisonCommandExample = {
  rivalLabel: string;
  rivalCode: string;
  watchfireLabel: string;
  watchfireCode: string;
};

export type Comparison = {
  slug: string;
  rivalName: string;
  rivalHomepage: string;
  tagline: string;
  oneLineVerdict: string;
  metaTitle: string;
  metaDescription: string;
  axes: ComparisonAxis[];
  whenToPickRival: string;
  whenToPickWatchfire: string;
  coexistence: string;
  commandLineExample?: ComparisonCommandExample;
  relatedDocs: ComparisonRelatedDoc[];
};

export const comparisons: readonly Comparison[] = [
  {
    slug: "aider",
    rivalName: "Aider",
    rivalHomepage: "https://aider.chat",
    tagline:
      "Aider is an open-source pair-programming CLI that talks to many models via API key — a tight conversational loop with auto-commit.",
    oneLineVerdict:
      "Pick Aider for a single tight conversational loop with direct model control. Pick Watchfire if you want isolation, parallelism, and a task contract on top of whatever agent CLI you prefer.",
    metaTitle: "Watchfire vs Aider — honest comparison",
    metaDescription:
      "Watchfire vs Aider: how an orchestrator for agent CLIs compares to a conversational pair-programming CLI. What each is for, when to pick which, and whether you can run both.",
    axes: [
      {
        axis: "Agent backend",
        rival: "Aider is itself an agent — speaks model APIs directly with bring-your-own keys for many providers.",
        watchfire:
          "Pluggable: drives Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent — whichever you already trust.",
      },
      {
        axis: "Isolation",
        rival: "Runs in your working tree.",
        watchfire: "Per-task git worktree on a dedicated `watchfire/<n>` branch.",
      },
      {
        axis: "Sandbox",
        rival: "No OS-level sandbox.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; `~/.ssh`, credential stores, and `.git/hooks` blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "One interactive session per terminal.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "Auto-commits in your working tree as the conversation progresses.",
        watchfire:
          "Each task lands a reviewable branch; auto-merge is opt-in and you can review before it touches `main`.",
      },
      {
        axis: "Autonomy",
        rival: "Conversational, interactive.",
        watchfire:
          "Interactive or autonomous via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival: "Local.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Per repo, per terminal.",
        watchfire: "First-class — many projects active concurrently.",
      },
      {
        axis: "Open source",
        rival: "Apache-2.0.",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival: "Free; you pay model API costs.",
        watchfire: "Free; you pay whatever your agent CLI's model costs.",
      },
    ],
    whenToPickRival:
      "Pick Aider when you want a tight, conversational editing loop with direct control of which model is answering. Its `/diff`, `/undo`, and auto-commit cycle is excellent for short, exploratory work where you are actively steering the conversation turn by turn. It is mature, Apache-2.0, and supports many model providers via API key — so if your workflow is one engineer, one terminal, one repo, and you want to switch models per session without leaving the prompt, Aider is the right tool. It is also a strong choice when you do not need or want OS-level sandboxing and want zero process overhead between you and the model.",
    whenToPickWatchfire:
      "Pick Watchfire when your unit of work is task-shaped rather than turn-shaped — when you want a written prompt and acceptance criteria, isolation between the agent and your credentials, and the option to walk away while the work happens. Watchfire wraps the agent CLI you already trust in a per-task [git worktree](/docs/concepts/worktrees) and a [platform sandbox](/docs/concepts/sandboxing), so a failed run never touches `main` and a prompt-injected command can't reach `~/.ssh`. It runs one agent per project but coordinates many projects at once, with an autonomous [Wildfire mode](/docs/concepts/agent-modes) you can opt into and turn off.",
    coexistence:
      "Yes, with care. Watchfire orchestrates a different layer than Aider — it drives agent CLIs, while Aider is itself an agent. You can keep using Aider for interactive sessions in one terminal and use Watchfire to run longer, task-shaped work on the same repo from another. The only thing to watch for is concurrent edits to the same working tree: Aider writes to your working tree, while Watchfire works in a separate worktree under `.watchfire/worktrees/`, so the two won't collide as long as you don't have Aider mid-edit when Watchfire's auto-merge lands.",
    commandLineExample: {
      rivalLabel: "Aider",
      rivalCode: `# One terminal, one repo, one conversation
aider --model sonnet src/api/orders.ts
> Fix the 500 when items is empty.`,
      watchfireLabel: "Watchfire",
      watchfireCode: `# Write the task once, walk away
watchfire task add "Fix 500 on empty items[]"
watchfire run all`,
    },
    relatedDocs: [
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes",
        description: "Chat, Task, Start All, Wildfire — when to use which.",
      },
      {
        href: "/docs/concepts/worktrees",
        label: "Worktree isolation",
        description: "Why each task runs on its own branch.",
      },
      {
        href: "/blog/2026-05-19-anatomy-of-a-great-task",
        label: "Anatomy of a great task",
        description: "How to write a task contract worth handing to an agent.",
      },
    ],
  },
  {
    slug: "cursor-agents",
    rivalName: "Cursor agents",
    rivalHomepage: "https://www.cursor.com",
    tagline:
      "Cursor's agent mode runs inside the Cursor editor — select a scope, describe the change, accept or reject inline.",
    oneLineVerdict:
      "Pick Cursor agents when the unit of work is a single edit you are watching happen. Pick Watchfire when the unit of work is task-shaped — written, reviewable, and potentially long-running.",
    metaTitle: "Watchfire vs Cursor agents — honest comparison",
    metaDescription:
      "Watchfire vs Cursor agents: how a terminal-first orchestrator for agent CLIs compares to Cursor's in-editor agent mode. What each is for, when to pick which, and how they coexist.",
    axes: [
      {
        axis: "Agent backend",
        rival: "Cursor's models, or your own API key inside Cursor.",
        watchfire:
          "Pluggable: Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent CLI.",
      },
      {
        axis: "Isolation",
        rival: "Edits your working tree inside the editor session.",
        watchfire: "Per-task git worktree on a dedicated `watchfire/<n>` branch.",
      },
      {
        axis: "Sandbox",
        rival: "Editor-scoped.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; `~/.ssh`, credential stores, and `.git/hooks` blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "One agent at a time in the editor.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "Edits your working tree; accept or reject inline.",
        watchfire:
          "Reviewable branch per task; auto-merge is opt-in.",
      },
      {
        axis: "Autonomy",
        rival: "Interactive, accept-as-you-go.",
        watchfire:
          "Interactive or autonomous via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival: "Local editor with cloud sync.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Per workspace.",
        watchfire: "First-class — many projects active concurrently.",
      },
      {
        axis: "Open source",
        rival: "No — closed source.",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival: "Subscription.",
        watchfire: "Free; you pay whatever your agent CLI's model costs.",
        notes:
          "Cursor's headless `cursor-agent` CLI is also a first-class Watchfire backend.",
      },
    ],
    whenToPickRival:
      "Pick Cursor agents when your unit of work is a single edit you want to see happen. The in-editor experience is unmatched for short, targeted changes — you select the scope, describe the change, and the agent edits files directly in your editor session with diffs and apply/reject controls. Cursor's codebase-aware retrieval is woven into the same surface you already use to write code, and there is no separate process or review surface to manage. For one-off edits where the friction of opening a terminal and writing a task contract would outweigh the work itself, Cursor is the right tool.",
    whenToPickWatchfire:
      "Pick Watchfire when the work is task-shaped — a written prompt, success criteria, and you want to review the result later rather than accept changes as you go. Watchfire is terminal-first and built for long-running, parallel work that may take minutes and benefits from review-after-the-fact. It runs your chosen agent CLI in a per-task [worktree](/docs/concepts/worktrees) under a platform [sandbox](/docs/concepts/sandboxing), so failed or half-done runs never touch `main`. If you want to drain a queue across multiple projects from one daemon, or want to keep using a non-Cursor editor, Watchfire is the fit.",
    coexistence:
      "Yes — they live at different layers. Cursor agents are for in-editor edits you are watching happen; Watchfire is for terminal-driven task work that may run while you do something else. You can do both on the same repo: use Cursor agents for the edit you're staring at right now and Watchfire for the queue of tasks you want to come back to later. Note that Cursor's separate headless `cursor-agent` CLI is also one of Watchfire's supported backends — see [Supported Agents](/docs/concepts/supported-agents) — which lets you orchestrate Cursor's models in the same task-shaped, worktree-isolated, sandboxed flow.",
    relatedDocs: [
      {
        href: "/docs/concepts/supported-agents",
        label: "Supported agents",
        description: "Including the Cursor Agent CLI as a Watchfire backend.",
      },
      {
        href: "/docs/concepts/worktrees",
        label: "Worktree isolation",
        description: "Why each task runs on its own branch.",
      },
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes",
        description: "Chat, Task, Start All, Wildfire — when to use which.",
      },
    ],
  },
  {
    slug: "raw-cli",
    rivalName: "Raw agent CLI",
    rivalHomepage: "https://www.anthropic.com/claude-code",
    tagline:
      "Open a terminal and run `claude`, `codex`, `opencode`, `gemini`, or `gh copilot` directly in your repo. The baseline.",
    oneLineVerdict:
      "The raw CLI is the right tool for a single prompt in a repo you already have open. Pick Watchfire when you want isolation, sandboxing, parallelism, or a written task contract on top of that same CLI.",
    metaTitle: "Watchfire vs raw Claude Code / Codex CLI — honest comparison",
    metaDescription:
      "Watchfire vs running Claude Code, Codex, opencode, Gemini, or Copilot CLI directly. What changes when an orchestrator wraps the same agent in a worktree and sandbox, and when the raw CLI is the right call.",
    axes: [
      {
        axis: "Agent backend",
        rival: "Pinned to whichever CLI you launched.",
        watchfire:
          "Same CLIs — Claude Code, Codex, opencode, Gemini, Copilot — but pluggable per task or per project.",
      },
      {
        axis: "Isolation",
        rival: "Edits your working tree directly.",
        watchfire: "Per-task git worktree on a `watchfire/<n>` branch.",
      },
      {
        axis: "Sandbox",
        rival: "Inherits your shell's `PATH`, `~/.ssh`, cloud credentials, and `.git/hooks`.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; sensitive paths blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "One terminal at a time.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "Edits the working tree; you commit by hand.",
        watchfire:
          "Branch + worktree per task; review-then-merge (auto-merge opt-in).",
      },
      {
        axis: "Autonomy",
        rival: "Interactive — whatever the CLI offers.",
        watchfire:
          "Interactive or autonomous via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival: "Local.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Per terminal.",
        watchfire: "First-class.",
      },
      {
        axis: "Open source",
        rival: "Varies (Codex CLI yes; others mixed).",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival: "Free; you pay model API costs.",
        watchfire: "Free; you pay model API costs of the CLI you pick.",
      },
    ],
    whenToPickRival:
      "Pick the raw CLI when you have a single, scoped change to make in a repo you already have open. It is the lowest-friction option — no daemon, no task file, nothing wrapped or filtered between you and whatever the CLI's latest features are. For throwaway repos, exploration, or short conversational work where you want direct access to every flag and surface the CLI exposes, the raw CLI is the right tool. It is also the right tool when you genuinely want the agent to inherit your shell — for example, when you need it to use your real `~/.ssh` keys to push, or your cloud credentials to deploy.",
    whenToPickWatchfire:
      "Pick Watchfire when you want to keep using the same agent CLI but add safety rails the raw CLI doesn't provide. Each task lands on its own [worktree branch](/docs/concepts/worktrees) so a failed run never touches `main`, and the agent runs inside a [platform sandbox](/docs/concepts/sandboxing) that blocks `~/.ssh`, credential stores, and `.git/hooks` by default — exactly the things a prompt-injected command would reach for. You also get parallelism across projects, clean per-task transcripts, and an opt-in autonomous [Wildfire loop](/docs/concepts/agent-modes). The agent is the same — the boundary around it is the difference.",
    coexistence:
      "Yes — trivially. Watchfire calls the same CLI binaries you already have installed. Keep using `claude`, `codex`, or `opencode` directly in any terminal; Watchfire just adds a layer that wraps them in a worktree and sandbox when you want that. The two never fight: the raw CLI works on your working tree, Watchfire works in its own worktree under `.watchfire/worktrees/`. A practical pattern is to use the raw CLI for the edit you're doing right now and Watchfire for the task queue you want to come back to later.",
    commandLineExample: {
      rivalLabel: "Raw CLI",
      rivalCode: `# In your repo, in your shell
cd ~/code/my-app
claude "Fix the 500 on empty items[]"`,
      watchfireLabel: "Watchfire",
      watchfireCode: `# Same agent, same model, behind safety rails
watchfire task add "Fix 500 on empty items[]"
watchfire run all`,
    },
    relatedDocs: [
      {
        href: "/docs/concepts/worktrees",
        label: "Worktree isolation",
        description: "Why each task runs on its own branch.",
      },
      {
        href: "/docs/concepts/sandboxing",
        label: "Sandboxing",
        description: "Seatbelt and Landlock — what's blocked, what isn't.",
      },
      {
        href: "/blog/2026-05-20-migrating-from-raw-cli-to-watchfire",
        label: "Migrating from raw CLI to Watchfire",
        description: "A long-form walk-through of the first hour.",
      },
    ],
  },
  {
    slug: "devin",
    rivalName: "Devin-style cloud agents",
    rivalHomepage: "https://devin.ai",
    tagline:
      "Vendor-hosted, end-to-end autonomous coders — Devin, Codegen, Replit Agent, and similar. Describe a task, receive a PR or a deployed app.",
    oneLineVerdict:
      "Pick a cloud autonomous agent for fully managed, browser-capable, end-to-end work with no local setup. Pick Watchfire if your code, prompts, and credentials need to stay on your machine.",
    metaTitle: "Watchfire vs Devin-style cloud agents — honest comparison",
    metaDescription:
      "Watchfire vs cloud autonomous agents like Devin, Codegen, and Replit Agent. Local vs hosted, your agent CLI vs vendor-managed, and how to decide.",
    axes: [
      {
        axis: "Agent backend",
        rival: "Vendor-managed agent and model.",
        watchfire:
          "Pluggable CLI: Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent.",
      },
      {
        axis: "Isolation",
        rival: "Vendor VM in the cloud.",
        watchfire: "Per-task git worktree on a `watchfire/<n>` branch on your machine.",
      },
      {
        axis: "Sandbox",
        rival: "Vendor VM.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; sensitive paths blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "Vendor-side; depends on the plan.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "PR-based, vendor opens the PR.",
        watchfire:
          "Reviewable branch per task; auto-merge is opt-in.",
      },
      {
        axis: "Autonomy",
        rival: "Designed for maximum autonomy with vendor guardrails.",
        watchfire:
          "Interactive by default; autonomous opt-in via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival: "Cloud only.",
        watchfire: "Local — your code and prompts never leave your machine unless you ship them.",
      },
      {
        axis: "Multi-project",
        rival: "Per repo.",
        watchfire: "First-class — many projects active concurrently.",
      },
      {
        axis: "Open source",
        rival: "No — closed source.",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival: "Per-task or subscription.",
        watchfire: "No service fee; you pay model API costs of the CLI you pick.",
      },
    ],
    whenToPickRival:
      "Pick a cloud autonomous agent when you want end-to-end \"give it a ticket, get a PR\" with no local setup and you are comfortable with a hosted runtime. These products optimise for maximum autonomy — they can run for long stretches, drive a browser, install dependencies, and ship a PR without you holding the wheel. The vendor supplies the VM, the browser, the shell, and the model bundled together. If you want a fully managed surface and your team is willing to send code, prompts, and artefacts to a vendor's infrastructure, this category is the right fit.",
    whenToPickWatchfire:
      "Pick Watchfire when your code, prompts, or credentials need to stay on your machine — for compliance, contractual, or simple privacy reasons. Watchfire runs on your laptop or workstation; the daemon, [worktrees](/docs/concepts/worktrees), and [sandboxes](/docs/concepts/sandboxing) all live locally, and nothing leaves unless you ship it. You also keep control of which agent CLI is on the other end — Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent — rather than a vendor-bundled one. If you want the autonomy of \"queue a task, come back to a PR\" but on your hardware, [Wildfire mode](/docs/concepts/agent-modes) is that loop.",
    coexistence:
      "Yes, at different scopes. A cloud autonomous agent and Watchfire are good at different problems: the cloud agent for end-to-end tickets you are happy to hand off; Watchfire for work that needs to stay local or run on the agent CLI you already trust. Some teams use the cloud agent for greenfield prototypes and Watchfire for the production repo with the sensitive code. The two never directly touch — the cloud agent opens PRs in GitHub, Watchfire merges branches on your machine — so there is no operational overlap to manage.",
    relatedDocs: [
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes",
        description: "How Wildfire's autonomous loop works, and how to turn it off.",
      },
      {
        href: "/docs/concepts/sandboxing",
        label: "Sandboxing",
        description: "What runs locally and what's blocked from the agent.",
      },
      {
        href: "/docs/concepts/architecture",
        label: "Architecture",
        description: "Daemon, clients, and where data lives.",
      },
    ],
  },
  {
    slug: "copilot-workspace",
    rivalName: "GitHub Copilot Workspace",
    rivalHomepage: "https://githubnext.com/projects/copilot-workspace",
    tagline:
      "GitHub's task-driven coding agent. Describe what you want, it produces a plan and a PR, and you review on github.com.",
    oneLineVerdict:
      "Pick Copilot Workspace for a hosted, plan-first PR loop tightly coupled to GitHub. Pick Watchfire when you need to keep code local and choose your own agent and model.",
    metaTitle: "Watchfire vs GitHub Copilot Workspace — honest comparison",
    metaDescription:
      "Watchfire vs GitHub Copilot Workspace: local-first orchestration of your chosen agent CLI versus GitHub-hosted, plan-first PRs. What each is for and how to decide.",
    axes: [
      {
        axis: "Agent backend",
        rival: "GitHub-hosted models.",
        watchfire:
          "Pluggable CLI: Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent.",
      },
      {
        axis: "Isolation",
        rival: "GitHub-hosted VM.",
        watchfire: "Per-task git worktree on a `watchfire/<n>` branch on your machine.",
      },
      {
        axis: "Sandbox",
        rival: "Cloud VM provided by GitHub.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; sensitive paths blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "One session per task in a hosted VM.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "PR-based, lands on github.com.",
        watchfire:
          "Reviewable branch per task on your machine; auto-merge opt-in.",
      },
      {
        axis: "Autonomy",
        rival: "Plan-first; you approve before code lands.",
        watchfire:
          "Interactive by default; autonomous opt-in via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival: "Cloud only.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Per repo.",
        watchfire: "First-class — many projects active concurrently.",
      },
      {
        axis: "Open source",
        rival: "No — closed source.",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival: "Subscription.",
        watchfire: "Free; you pay model API costs of the CLI you pick.",
      },
    ],
    whenToPickRival:
      "Pick Copilot Workspace when your repo lives on GitHub and you want the lowest-friction way to go from an issue to a PR. Its tight GitHub integration is the point — issues in, PR out, no local install, nothing to run on your machine. The plan-first UX gives you a step before the code lands, which is a real safety mechanism for teams that want explicit review of intent before review of code. If your workflow already centres on github.com and you want hosted execution with GitHub-managed models, Copilot Workspace is the natural fit.",
    whenToPickWatchfire:
      "Pick Watchfire when you need code on your machine — for private repos, compliance, or simple preference — and you want to choose your agent and model freely. Watchfire is local-first: the daemon, [worktrees](/docs/concepts/worktrees), and [sandboxes](/docs/concepts/sandboxing) all run on your hardware, so nothing leaves unless you ship it. You also pick the agent CLI on the other end — Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent — rather than GitHub-bundled models. If you want to drain a task queue across multiple local projects from one daemon, with optional autonomy via [Wildfire mode](/docs/concepts/agent-modes), Watchfire is the fit.",
    coexistence:
      "Yes — they don't overlap mechanically. Copilot Workspace opens PRs on github.com from a hosted VM; Watchfire merges branches on your machine. Some teams use Copilot Workspace for simple, GitHub-issue-shaped tasks where the hosted runtime is convenient, and Watchfire for work where the code should stay local or where they want a specific agent CLI in the loop. A repo can be the target of both — the receipts just show up in different places (a PR from Copilot, a merged worktree branch from Watchfire).",
    relatedDocs: [
      {
        href: "/docs/concepts/architecture",
        label: "Architecture",
        description: "Where data lives, and what stays local.",
      },
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes",
        description: "Chat, Task, Start All, Wildfire — when to use which.",
      },
      {
        href: "/docs/concepts/supported-agents",
        label: "Supported agents",
        description: "Including GitHub Copilot CLI as a Watchfire backend.",
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export const comparisonSlugs: readonly string[] = comparisons.map((c) => c.slug);
