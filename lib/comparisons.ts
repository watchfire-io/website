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
  {
    slug: "cline",
    rivalName: "Cline",
    rivalHomepage: "https://cline.bot",
    tagline:
      "Cline is an open-source VS Code extension — an autonomous coding agent that lives in your editor, with plan/act modes, file-by-file approvals, and bring-your-own LLM keys.",
    oneLineVerdict:
      "Pick Cline when you want an autonomous agent that lives inside VS Code with inline diffs and per-step approvals. Pick Watchfire when you want the same task-shaped work outside any editor, isolated in a worktree and sandbox, with parallelism across projects.",
    metaTitle: "Watchfire vs Cline — honest comparison",
    metaDescription:
      "Watchfire vs Cline: terminal-first task orchestration in worktrees and sandboxes versus an autonomous VS Code agent extension. What each is for, when to pick which, and how they coexist.",
    axes: [
      {
        axis: "Agent backend",
        rival:
          "Cline is itself an agent — speaks model APIs directly with bring-your-own keys (Anthropic, OpenAI, OpenRouter, Bedrock, Vertex, local providers).",
        watchfire:
          "Pluggable: drives Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent — whichever you already trust.",
      },
      {
        axis: "Isolation",
        rival: "Runs inside your VS Code workspace; edits and commands hit your working tree.",
        watchfire: "Per-task git worktree on a dedicated `watchfire/<n>` branch.",
      },
      {
        axis: "Sandbox",
        rival:
          "No OS-level sandbox. Each file edit and command is gated by a per-step approval prompt inside VS Code (or auto-approved per tool, if you opt in).",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; `~/.ssh`, credential stores, and `.git/hooks` blocked by default.",
      },
      {
        axis: "Parallelism",
        rival:
          "One Cline task per VS Code window; multiple windows can run in parallel but each blocks its workspace.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival:
          "Edits the working tree; commits if you ask. Per-step approval replaces branch isolation.",
        watchfire:
          "Each task lands a reviewable branch; auto-merge is opt-in and you can review before it touches `main`.",
      },
      {
        axis: "Autonomy",
        rival: "Plan mode then Act mode; auto-approval can be enabled per tool but defaults to per-step.",
        watchfire:
          "Interactive or autonomous via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival: "Local extension; calls model APIs over the network.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Per VS Code workspace.",
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
      "Pick Cline when you live in VS Code and want an autonomous agent that does too — one that can read files, run commands, and propose edits with diffs you approve inline as the run progresses. The per-step approval model is a real safety mechanism: nothing executes without an explicit click, so you can let it drive while keeping a finger on the brake. Cline is Apache-2.0, supports nearly every model provider via bring-your-own key, and has mature MCP extension support inside the VS Code ecosystem. If your unit of work is best handled with the file you are staring at open and the diff right there, Cline is the right tool.",
    whenToPickWatchfire:
      "Pick Watchfire when you want the same task-shaped autonomy without anchoring it to an editor. Watchfire runs the agent CLI you choose — Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent — inside a per-task [git worktree](/docs/concepts/worktrees) and a [platform sandbox](/docs/concepts/sandboxing) that blocks `~/.ssh`, credential stores, and `.git/hooks` by default. A failed run never touches `main`, and a prompt-injected command cannot reach the secrets your editor process can see. Watchfire also coordinates many projects concurrently from one daemon, with an opt-in autonomous [Wildfire loop](/docs/concepts/agent-modes) you can turn off.",
    coexistence:
      "Yes — they live at different layers and never touch the same files at the same time. Cline edits your working tree from inside VS Code; Watchfire works in `.watchfire/worktrees/` on a separate branch. A reasonable split is to use Cline for edits you want to drive interactively in the editor and Watchfire for longer, task-shaped work you want to queue across projects. The only thing to watch for is concurrent edits to the same path — if Cline is mid-edit on a file when Watchfire's auto-merge lands a change to the same file, you will resolve a conflict on your working tree.",
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
        href: "/docs/concepts/agent-modes",
        label: "Agent modes",
        description: "Chat, Task, Start All, Wildfire — when to use which.",
      },
    ],
  },
  {
    slug: "continue-dev",
    rivalName: "Continue.dev",
    rivalHomepage: "https://continue.dev",
    tagline:
      "Continue is an open-source IDE assistant — VS Code and JetBrains extensions with chat, autocomplete, edit, and agent modes, configured through a YAML file and any LLM provider you bring.",
    oneLineVerdict:
      "Pick Continue when you want a customisable, model-agnostic IDE assistant that fits into your existing editor workflow. Pick Watchfire when the work is task-shaped, should run outside any editor, and benefits from worktree isolation and parallel projects.",
    metaTitle: "Watchfire vs Continue.dev — honest comparison",
    metaDescription:
      "Watchfire vs Continue.dev: terminal-first orchestration of agent CLIs in worktrees and sandboxes versus an open-source IDE assistant for VS Code and JetBrains. What each is for and how to decide.",
    axes: [
      {
        axis: "Agent backend",
        rival:
          "Continue is itself an assistant — speaks any model provider via its config (Anthropic, OpenAI, Ollama, vLLM, local models, …).",
        watchfire:
          "Pluggable: Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent CLI.",
      },
      {
        axis: "Isolation",
        rival: "Runs inside the IDE; edits go to your working tree.",
        watchfire: "Per-task git worktree on a dedicated `watchfire/<n>` branch.",
      },
      {
        axis: "Sandbox",
        rival: "No OS-level sandbox; agent-mode tool calls are approved per use.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; sensitive paths blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "One Continue session per IDE window.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "Edits the working tree; you stage and commit yourself.",
        watchfire: "Reviewable branch per task; auto-merge is opt-in.",
      },
      {
        axis: "Autonomy",
        rival: "Chat-first with an agent mode that uses tools step-by-step.",
        watchfire:
          "Interactive or autonomous via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival:
          "Local extension; runs fully offline when paired with Ollama or any local model.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Per IDE workspace.",
        watchfire: "First-class — many projects active concurrently.",
      },
      {
        axis: "Open source",
        rival: "Apache-2.0.",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival:
          "Free; you pay your model provider (or run locally for free).",
        watchfire: "Free; you pay whatever your agent CLI's model costs.",
      },
    ],
    whenToPickRival:
      "Pick Continue when your workflow is editor-centric and you want a fully open, deeply configurable assistant that follows you between projects. Its YAML-driven configuration is genuinely powerful — model routes, context providers, custom slash commands, and tool definitions are all declarative and version-controllable. Continue also has the strongest local-model story in this category: pair it with Ollama or vLLM and the entire loop runs offline with no API key in sight. If you want chat, autocomplete, edit, and agent all in the same IDE surface, with the freedom to swap models per task without paying a subscription, Continue is the right tool.",
    whenToPickWatchfire:
      "Pick Watchfire when the work is task-shaped — a written prompt, acceptance criteria, and a result you want to review later — and you want to keep it out of any single editor's process. Watchfire wraps your chosen agent CLI in a per-task [worktree](/docs/concepts/worktrees) on a `watchfire/<n>` branch under a [platform sandbox](/docs/concepts/sandboxing), so a half-done run never lands on `main` and the agent cannot read `~/.ssh`. It also coordinates many projects from one daemon, with an autonomous [Wildfire loop](/docs/concepts/agent-modes) you can opt into for queues that run while you do something else.",
    coexistence:
      "Yes — they target different surfaces. Continue lives in the IDE for in-editor work; Watchfire lives in the terminal for task-shaped work. Many users keep Continue installed for autocomplete and conversational edits while using Watchfire for the longer, isolated tasks that benefit from a separate worktree. Their working directories do not overlap — Continue writes to your working tree, Watchfire writes inside `.watchfire/worktrees/<n>/` — so they only need to coordinate when an auto-merged Watchfire branch lands on a file you have open in the IDE.",
    relatedDocs: [
      {
        href: "/docs/concepts/supported-agents",
        label: "Supported agents",
        description: "The agent CLIs Watchfire can drive on your behalf.",
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
    slug: "openhands",
    rivalName: "OpenHands",
    rivalHomepage: "https://github.com/All-Hands-AI/OpenHands",
    tagline:
      "OpenHands (formerly OpenDevin) is an open-source autonomous coding agent — a web UI that drives an agent inside a Docker container, with file editing, shell access, and a built-in browser.",
    oneLineVerdict:
      "Pick OpenHands when you want a self-hosted, container-sandboxed, Devin-style autonomous agent with a browser-capable runtime. Pick Watchfire when you'd rather orchestrate the agent CLI you already trust, in a git worktree under a platform sandbox, with a written task contract.",
    metaTitle: "Watchfire vs OpenHands — honest comparison",
    metaDescription:
      "Watchfire vs OpenHands: orchestrating agent CLIs locally in per-task worktrees versus a self-hosted, Docker-sandboxed autonomous coding agent with a browser runtime. What each is for and how to decide.",
    axes: [
      {
        axis: "Agent backend",
        rival:
          "OpenHands is itself an agent — its own loop, with bring-your-own LLM (Anthropic, OpenAI, OpenRouter, or any LiteLLM-supported provider).",
        watchfire:
          "Pluggable CLI: Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent.",
      },
      {
        axis: "Isolation",
        rival:
          "Runs the agent inside a Docker container that mounts your project — strong process-level isolation.",
        watchfire: "Per-task git worktree on a `watchfire/<n>` branch.",
      },
      {
        axis: "Sandbox",
        rival:
          "Docker container sandbox; the agent runs as a non-root user inside the container with limited host access.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; sensitive paths blocked by default.",
      },
      {
        axis: "Parallelism",
        rival:
          "One conversation per browser session; multiple sessions are possible but each spawns its own container.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival:
          "Edits files inside the container's mounted workspace; you commit and push yourself, or use the built-in GitHub issue-to-PR flow.",
        watchfire: "Reviewable branch per task on your machine; auto-merge is opt-in.",
      },
      {
        axis: "Autonomy",
        rival: "Designed for high-autonomy runs — the agent plans, runs commands, browses, and iterates.",
        watchfire:
          "Interactive by default; autonomous opt-in via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival: "Self-hosted locally via Docker, or use the hosted OpenHands Cloud.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Per workspace mounted into the container.",
        watchfire: "First-class — many projects active concurrently.",
      },
      {
        axis: "Open source",
        rival: "MIT.",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival:
          "Self-hosted is free; OpenHands Cloud is metered; in either case you pay your model provider.",
        watchfire: "No service fee; you pay model API costs of the CLI you pick.",
      },
    ],
    whenToPickRival:
      "Pick OpenHands when you want a self-hosted, Docker-isolated agent that can do everything a Devin-style cloud agent does — edit files, run commands, browse the web — without sending your code to a vendor. The Docker container runtime is a real isolation boundary, and the browser-capable agent loop opens up tasks pure CLI agents struggle with (filling forms, scraping documentation, debugging through a browser). OpenHands is MIT-licensed, has an active research team behind it, and ships its own UI — useful when you want a Devin shape on your own infrastructure rather than an editor extension or a CLI.",
    whenToPickWatchfire:
      "Pick Watchfire when you'd rather orchestrate the agent CLI you already trust — Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent — than adopt a new agent. Watchfire is intentionally not an agent; it puts your existing agent inside a per-task [git worktree](/docs/concepts/worktrees) and a [platform sandbox](/docs/concepts/sandboxing) (Seatbelt on macOS, Landlock or Bubblewrap on Linux), with a written task contract and a reviewable branch per task. There is no Docker daemon to manage, no separate UI to run, and many projects can run concurrently under one daemon with optional autonomy via [Wildfire mode](/docs/concepts/agent-modes).",
    coexistence:
      "Yes — they solve different problems. OpenHands is well-suited for tasks that need a browser or a full Linux container at runtime (web scraping, GUI debugging, environment exploration). Watchfire is well-suited for tasks that fit inside an agent CLI's normal toolset (file edits, shell commands, tests). A pragmatic split is to use OpenHands for browser- and environment-heavy work and Watchfire for everyday code changes. They do not share state — OpenHands writes inside its container's mounted workspace, Watchfire writes inside `.watchfire/worktrees/` on its own branch.",
    commandLineExample: {
      rivalLabel: "OpenHands",
      rivalCode: `# Spin up the agent container and open the UI
docker run -it --rm \\
  -p 3000:3000 \\
  -v $PWD:/opt/workspace_base \\
  ghcr.io/all-hands-ai/openhands:latest`,
      watchfireLabel: "Watchfire",
      watchfireCode: `# Write the task, hand it to your CLI of choice
watchfire task add "Fix 500 on empty items[]"
watchfire run all`,
    },
    relatedDocs: [
      {
        href: "/docs/concepts/sandboxing",
        label: "Sandboxing",
        description: "What runs locally and what's blocked from the agent.",
      },
      {
        href: "/docs/concepts/worktrees",
        label: "Worktree isolation",
        description: "Why each task runs on its own branch.",
      },
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes",
        description: "How Wildfire's autonomous loop works, and how to turn it off.",
      },
    ],
  },
  {
    slug: "sourcegraph-cody",
    rivalName: "Sourcegraph Cody (and Amp)",
    rivalHomepage: "https://sourcegraph.com/cody",
    tagline:
      "Sourcegraph's coding assistants — Cody (chat with deep codebase context) and Amp (agentic coder) — backed by Sourcegraph's code intelligence platform and indexed cross-repo search.",
    oneLineVerdict:
      "Pick Sourcegraph Cody or Amp when your team already runs Sourcegraph and you want agent answers grounded in indexed, cross-repo context. Pick Watchfire when you want local-first, task-shaped work with the agent CLI you already use.",
    metaTitle: "Watchfire vs Sourcegraph Cody / Amp — honest comparison",
    metaDescription:
      "Watchfire vs Sourcegraph Cody and Amp: terminal-first orchestration of agent CLIs in worktrees and sandboxes versus Sourcegraph's enterprise agentic coding assistants backed by code-graph search. What each is for, when to pick which.",
    axes: [
      {
        axis: "Agent backend",
        rival:
          "Sourcegraph-managed models (mostly Anthropic and OpenAI), with enterprise bring-your-own-key options.",
        watchfire:
          "Pluggable CLI: Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent.",
      },
      {
        axis: "Isolation",
        rival:
          "Cody runs as an IDE extension editing your working tree; Amp runs an agent that proposes edits and PRs through Sourcegraph.",
        watchfire: "Per-task git worktree on a `watchfire/<n>` branch on your machine.",
      },
      {
        axis: "Sandbox",
        rival: "Editor-scoped for Cody; Amp's runtime is Sourcegraph-managed.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; sensitive paths blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "One Cody conversation per IDE window; Amp parallelism is plan-dependent.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "Cody edits the working tree; Amp opens PRs through Sourcegraph.",
        watchfire: "Reviewable branch per task; auto-merge is opt-in.",
      },
      {
        axis: "Autonomy",
        rival: "Cody is chat-and-edit; Amp is the autonomous tier.",
        watchfire:
          "Interactive by default; autonomous opt-in via [Wildfire mode](/docs/concepts/agent-modes).",
      },
      {
        axis: "Local vs cloud",
        rival:
          "Hybrid — the extension runs locally, but retrieval and inference go through Sourcegraph's cloud or a self-hosted Sourcegraph instance.",
        watchfire: "Local — nothing leaves your machine unless you ship it.",
      },
      {
        axis: "Multi-project",
        rival: "Codebase-aware via the Sourcegraph index across many repos.",
        watchfire: "First-class — many projects active concurrently.",
      },
      {
        axis: "Open source",
        rival:
          "Cody had an open-source extension; Amp and the Sourcegraph backend are closed-source enterprise products.",
        watchfire: "Apache-2.0.",
      },
      {
        axis: "Pricing",
        rival:
          "Free tier for individual Cody use; Team and Enterprise tiers are seat-priced; Amp is paid.",
        watchfire: "Free; you pay model API costs of the CLI you pick.",
      },
    ],
    whenToPickRival:
      "Pick Sourcegraph Cody or Amp when your team already runs Sourcegraph and you want every answer grounded in indexed, cross-repo code intelligence — not just the files in the current workspace. That cross-repo context is genuinely hard to replicate: Cody and Amp can pull a struct definition from one repo, a caller from another, and a config from a third into the same prompt. For enterprise teams that already pay for Sourcegraph for code search and review, layering Cody and Amp on top is a low-friction way to get agentic coding with consistent context across the whole codebase. The enterprise tier also brings audit logs, SSO, and admin controls that Watchfire does not ship.",
    whenToPickWatchfire:
      "Pick Watchfire when you want local-first, task-shaped work without a Sourcegraph dependency and without a vendor in the inference path. Watchfire runs on your laptop or workstation; the daemon, [worktrees](/docs/concepts/worktrees), and [sandboxes](/docs/concepts/sandboxing) all live locally, and the agent CLI you pick — Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent — decides what context to pull from the repo in front of it. There is no central index to maintain, no seat to provision, and no inference to route through someone else's cloud. If your repo is the scope and you would rather pay per-token to your model provider than per-seat to a platform, Watchfire is the fit.",
    coexistence:
      "Yes — they target adjacent problems and a team can use both. Cody and Amp are at their best when grounded in Sourcegraph's index across many repos; Watchfire is at its best when the unit of work is a single task in a single project with strong local isolation. A pragmatic team setup is to use Cody for cross-repo chat and code intelligence and Watchfire to actually run the long, isolated task runs that change code. They do not write to the same place: Cody edits the IDE's working tree, Watchfire works inside `.watchfire/worktrees/` on its own branch.",
    relatedDocs: [
      {
        href: "/docs/concepts/architecture",
        label: "Architecture",
        description: "Daemon, clients, and where data lives.",
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
    slug: "goose",
    rivalName: "Goose",
    rivalHomepage: "https://block.github.io/goose",
    tagline:
      "Goose is Block's open-source, MCP-native agent — a CLI and desktop app that hosts a Claude (or other) model behind a tool-use loop and a growing catalogue of MCP extensions.",
    oneLineVerdict:
      "Pick Goose when you want a single, MCP-native agent runtime with a strong extension ecosystem and resumable conversational sessions. Pick Watchfire when you'd rather wrap whichever agent CLI you already use in a worktree, sandbox, and task contract.",
    metaTitle: "Watchfire vs Goose — honest comparison",
    metaDescription:
      "Watchfire vs Goose: orchestrating agent CLIs in per-task worktrees and sandboxes versus Block's open-source, MCP-native agent runtime. What each is for and how to decide.",
    axes: [
      {
        axis: "Agent backend",
        rival:
          "Goose is itself an agent — runs Anthropic, OpenAI, Google, Bedrock, Ollama, or any LiteLLM-supported model.",
        watchfire:
          "Pluggable: Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent CLI.",
      },
      {
        axis: "Isolation",
        rival: "Runs in your working tree; sessions persist to disk so you can resume them.",
        watchfire: "Per-task git worktree on a dedicated `watchfire/<n>` branch.",
      },
      {
        axis: "Sandbox",
        rival:
          "No OS-level sandbox; tool calls (filesystem, shell, MCP extensions) are model-driven with per-call confirmation prompts.",
        watchfire:
          "Seatbelt on macOS, Landlock or Bubblewrap on Linux; `~/.ssh`, credential stores, and `.git/hooks` blocked by default.",
      },
      {
        axis: "Parallelism",
        rival: "One session per terminal or desktop window.",
        watchfire:
          "One agent per project, many projects concurrently from a single daemon.",
      },
      {
        axis: "Git workflow",
        rival: "Edits the working tree; you commit yourself.",
        watchfire: "Reviewable branch per task; auto-merge opt-in.",
      },
      {
        axis: "Autonomy",
        rival: "Interactive conversational loop with sessions you can pause and resume.",
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
        rival: "Per session.",
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
      "Pick Goose when you want an MCP-native agent runtime — extensions are first-class, the catalogue grows quickly, and adding a new tool is often as simple as installing an MCP server. Goose's session model (resume, branch, share) is genuinely useful for longer conversational work, and the desktop app is a clean way to keep a few agents handy without living in a terminal. Goose is Apache-2.0 and backed by Block's engineering team, with deliberate investment in MCP as the integration surface. If you want one CLI or desktop runtime that pulls together many tools through MCP, Goose is the right fit.",
    whenToPickWatchfire:
      "Pick Watchfire when you want to keep using whichever agent CLI suits the job — Claude Code, Codex, opencode, Gemini, Copilot CLI, or Cursor Agent — and add isolation around it rather than swap it out. Watchfire runs that agent inside a per-task [worktree](/docs/concepts/worktrees) on a `watchfire/<n>` branch under a [platform sandbox](/docs/concepts/sandboxing) that blocks `~/.ssh`, credential stores, and `.git/hooks` by default. It also coordinates many projects from one daemon, with a [Wildfire mode](/docs/concepts/agent-modes) loop you can opt into. The agent loop stays where it is; the boundary around it is new.",
    coexistence:
      "Yes — they live at different layers. Goose is itself an agent; Watchfire is an orchestrator that drives agent CLIs. You can keep running Goose interactively in one terminal for conversational, MCP-extension-heavy work and use Watchfire to run task-shaped runs on a different agent CLI in another. They do not share working directory state — Goose edits your working tree, Watchfire works inside `.watchfire/worktrees/` — so the only coordination needed is at merge time.",
    commandLineExample: {
      rivalLabel: "Goose",
      rivalCode: `# Open an MCP-native conversational session
goose session start
> Fix the 500 when items is empty.`,
      watchfireLabel: "Watchfire",
      watchfireCode: `# Write the task once, walk away
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
        href: "/docs/concepts/agent-modes",
        label: "Agent modes",
        description: "Chat, Task, Start All, Wildfire — when to use which.",
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export const comparisonSlugs: readonly string[] = comparisons.map((c) => c.slug);
