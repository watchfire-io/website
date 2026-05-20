import Link from "next/link";
import { isValidElement, type ReactNode } from "react";

export type FaqAnswer = ReactNode;

export interface FaqEntry {
  id: string;
  question: string;
  answer: FaqAnswer;
}

export interface FaqCategory {
  id: string;
  title: string;
  description?: string;
  entries: FaqEntry[];
}

// Walks a ReactNode tree and concatenates string/number children. Used to derive
// the plain-text `acceptedAnswer.text` for FAQPage JSON-LD; non-children props
// (e.g. href) are intentionally not included.
export function reactNodeToText(node: FaqAnswer): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode } | null;
    return props?.children ? reactNodeToText(props.children) : "";
  }
  return "";
}

const linkClass = "text-fire-600 underline-offset-2 hover:underline dark:text-fire-400";
const codeClass = "font-mono text-[0.9em]";

export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting started",
    description:
      "Install, prerequisites, and the first hour of using Watchfire.",
    entries: [
      {
        id: "prerequisites",
        question: "What do I need installed before running Watchfire?",
        answer: (
          <>
            Two things: a supported OS (macOS, Linux, or Windows) and at least
            one agent CLI you&rsquo;ve signed into &mdash; Claude Code, OpenAI
            Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent.
            Watchfire does not bundle a model; it drives whichever CLI you
            already use. Sign in through that CLI&rsquo;s normal flow first,
            then point Watchfire at it.{" "}
            <Link href="/docs/installation" className={linkClass}>
              Installation guide
            </Link>
            .
          </>
        ),
      },
      {
        id: "install-macos",
        question: "How do I install Watchfire on macOS?",
        answer: (
          <>
            The recommended path is Homebrew. Run{" "}
            <code className={codeClass}>brew tap watchfire-io/tap</code> then{" "}
            <code className={codeClass}>
              brew install --cask watchfire-io/tap/watchfire
            </code>{" "}
            for the GUI + CLI, or{" "}
            <code className={codeClass}>
              brew install watchfire-io/tap/watchfire
            </code>{" "}
            for just the CLI and daemon. A Universal{" "}
            <code className={codeClass}>.dmg</code> is also available from
            GitHub Releases.{" "}
            <Link href="/docs/installation" className={linkClass}>
              Full install instructions
            </Link>
            .
          </>
        ),
      },
      {
        id: "install-linux",
        question: "How do I install Watchfire on Linux?",
        answer: (
          <>
            Use the AppImage or <code className={codeClass}>.deb</code> from
            GitHub Releases for the full GUI + CLI, or run the install script
            for just the CLI and daemon:{" "}
            <code className={codeClass}>
              curl -fsSL
              https://raw.githubusercontent.com/watchfire-io/watchfire/main/scripts/install.sh
              | bash
            </code>
            . Watchfire auto-detects the best sandbox backend &mdash; Landlock
            on kernel 5.13+, Bubblewrap on older kernels.{" "}
            <Link href="/docs/installation#linux" className={linkClass}>
              Linux install details
            </Link>
            .
          </>
        ),
      },
      {
        id: "install-windows",
        question: "Does Watchfire work on Windows?",
        answer: (
          <>
            Yes &mdash; the <code className={codeClass}>.exe</code> installer
            bundles the GUI, CLI, and daemon. There is one caveat: Windows
            currently runs <em>without</em> sandboxing. Agent processes are
            not isolated from the rest of the system, so for security-sensitive
            work prefer macOS or a recent Linux kernel. See{" "}
            <Link href="/security" className={linkClass}>
              /security
            </Link>{" "}
            for the platform matrix.
          </>
        ),
      },
      {
        id: "first-project",
        question: "How do I start my first Watchfire project?",
        answer: (
          <>
            Inside a repo you already use, run{" "}
            <code className={codeClass}>watchfire init</code>. That creates a{" "}
            <code className={codeClass}>.watchfire/</code> directory with a{" "}
            <code className={codeClass}>project.yaml</code>, adds the directory
            to <code className={codeClass}>.gitignore</code>, and walks you
            through naming the project, picking a default agent, and answering
            a few yes/no settings (auto-merge, auto-delete branch, auto-start
            tasks). Then add a task with{" "}
            <code className={codeClass}>watchfire task add</code> or let{" "}
            <code className={codeClass}>watchfire wildfire</code> generate
            them.{" "}
            <Link href="/docs/quickstart" className={linkClass}>
              Quick start walkthrough
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "how-it-works",
    title: "How it works",
    description:
      "The runtime model: daemon, clients, agent modes, worktrees, and the sandbox.",
    entries: [
      {
        id: "daemon-vs-clients",
        question:
          "What&rsquo;s the difference between the daemon, the CLI, the TUI, and the GUI?",
        answer: (
          <>
            The daemon (<code className={codeClass}>watchfired</code>) is the
            single orchestrator: it spawns agent PTYs, manages git worktrees,
            tracks task state, and serves gRPC. The CLI, TUI, and GUI are all
            thin clients that talk to that daemon &mdash; they show different
            UIs over the same state, so you can mix them on the same machine
            and they stay in sync.{" "}
            <Link href="/docs/concepts/architecture" className={linkClass}>
              Architecture overview
            </Link>
            .
          </>
        ),
      },
      {
        id: "agent-modes",
        question:
          "What are Chat, Task, Start All, and Wildfire mode, and when do I pick which?",
        answer: (
          <>
            Chat is an interactive session for exploration. Task runs one
            specific task from the task list. Start All sequentially runs every
            ready task. Wildfire is the autonomous loop &mdash; it executes
            ready tasks, refines drafts, and generates new tasks from the
            project definition until you stop it. Use Chat for prototyping,
            Task or Start All when you&rsquo;ve written tasks yourself, and
            Wildfire for longer hands-off runs.{" "}
            <Link href="/docs/concepts/agent-modes" className={linkClass}>
              Agent modes reference
            </Link>
            .
          </>
        ),
      },
      {
        id: "worktrees",
        question: "How do git worktrees keep tasks isolated?",
        answer: (
          <>
            Every task runs in its own worktree under{" "}
            <code className={codeClass}>.watchfire/worktrees/&lt;n&gt;/</code>{" "}
            on a dedicated{" "}
            <code className={codeClass}>watchfire/&lt;n&gt;</code> branch.
            That means parallel tasks never touch each other&rsquo;s files, a
            failed or half-done run never pollutes{" "}
            <code className={codeClass}>main</code>, and a finished task can be
            reviewed like any other branch before merging.{" "}
            <Link href="/docs/concepts/worktrees" className={linkClass}>
              Worktree isolation
            </Link>
            .
          </>
        ),
      },
      {
        id: "sandbox",
        question: "What does the sandbox actually block?",
        answer: (
          <>
            On macOS and Linux, every agent process runs inside a platform
            sandbox &mdash; Seatbelt (
            <code className={codeClass}>sandbox-exec</code>) on macOS, Landlock
            on Linux 5.13+ with Bubblewrap as a fallback &mdash; that denies
            read and write access to{" "}
            <code className={codeClass}>~/.ssh</code>,{" "}
            <code className={codeClass}>~/.aws</code>,{" "}
            <code className={codeClass}>~/.gnupg</code>,{" "}
            <code className={codeClass}>~/.netrc</code>,{" "}
            <code className={codeClass}>~/.npmrc</code>, and{" "}
            <code className={codeClass}>.git/hooks</code> by default.
            Enforcement is at the kernel level, so it does not rely on the
            agent being well-behaved.{" "}
            <Link href="/docs/concepts/sandboxing" className={linkClass}>
              Sandboxing details
            </Link>
            .
          </>
        ),
      },
      {
        id: "auto-merge",
        question: "When does Watchfire merge a task branch into my main branch?",
        answer: (
          <>
            Only when the task completes successfully <em>and</em>{" "}
            <code className={codeClass}>auto_merge</code> is enabled for the
            project (it&rsquo;s a per-project setting you chose at{" "}
            <code className={codeClass}>watchfire init</code>). If auto-merge
            is off, the task lands on its branch and waits for you to review
            and merge it yourself. Either way, nothing rewrites your default
            branch silently.
          </>
        ),
      },
      {
        id: "file-watching",
        question:
          "Does Watchfire react when I edit task files outside the GUI/TUI?",
        answer: (
          <>
            Yes. The daemon watches{" "}
            <code className={codeClass}>.watchfire/tasks/</code> and reacts to
            edits in real time &mdash; changing a task from{" "}
            <code className={codeClass}>draft</code> to{" "}
            <code className={codeClass}>ready</code> in your editor will
            auto-start an agent if{" "}
            <code className={codeClass}>auto_start_tasks</code> is on. This is
            how the YAML-as-source-of-truth design holds together regardless
            of which client you use.
          </>
        ),
      },
    ],
  },
  {
    id: "tasks-and-projects",
    title: "Tasks &amp; projects",
    description:
      "How task files, project definitions, and generated tasks fit together.",
    entries: [
      {
        id: "task-yaml-schema",
        question: "What does a task YAML file look like?",
        answer: (
          <>
            A task is a small YAML file at{" "}
            <code className={codeClass}>
              .watchfire/tasks/&lt;n&gt;.yaml
            </code>{" "}
            with at minimum a title, a prompt, acceptance criteria, and a
            status. The daemon fills in IDs, timestamps, and outcome fields
            after a run completes. Files are plain text by design &mdash; you
            can edit them in your editor, diff them with git, and treat them
            like any other source-controlled artefact (even though{" "}
            <code className={codeClass}>.watchfire/</code> is gitignored by
            default).{" "}
            <Link
              href="/docs/concepts/projects-and-tasks"
              className={linkClass}
            >
              Project and task schemas
            </Link>
            .
          </>
        ),
      },
      {
        id: "task-lifecycle",
        question: "What do the task statuses (draft, ready, done) mean?",
        answer: (
          <>
            <code className={codeClass}>draft</code> means &ldquo;don&rsquo;t
            run me yet&rdquo; &mdash; safe to edit. Flipping a task to{" "}
            <code className={codeClass}>ready</code> tells the daemon it can be
            executed; if{" "}
            <code className={codeClass}>auto_start_tasks</code> is on, an agent
            will pick it up immediately, otherwise it sits in the queue for
            Start All or Wildfire. <code className={codeClass}>done</code>{" "}
            marks completion &mdash; check the{" "}
            <code className={codeClass}>success</code> flag to see whether it
            finished or bailed.
          </>
        ),
      },
      {
        id: "project-definition",
        question: "What is a project definition, and do I need one?",
        answer: (
          <>
            The definition is a free-form description of what the project is
            and how the agent should approach it &mdash; tech stack, layout
            conventions, code style, gotchas. The daemon injects it into the
            agent&rsquo;s system prompt at launch. You don&rsquo;t need to
            write one yourself: <code className={codeClass}>watchfire
            definition generate</code> will draft it for you by reading the
            repo, and you can keep editing it after.
          </>
        ),
      },
      {
        id: "generated-tasks",
        question: "Where do generated tasks come from?",
        answer: (
          <>
            <code className={codeClass}>watchfire generate</code> (and the
            generate phase of <code className={codeClass}>wildfire</code>)
            asks the agent to propose tasks against the project definition.
            Tasks land as <code className={codeClass}>draft</code> YAML files,
            so you can read them, edit them, delete the bad ones, and promote
            the good ones to <code className={codeClass}>ready</code>. The
            agent never quietly executes a task it generated &mdash; the
            promotion step is yours.
          </>
        ),
      },
      {
        id: "wildfire-loop",
        question: "What does Wildfire mode loop through?",
        answer: (
          <>
            Wildfire alternates between three phases until you stop it or the
            queue is empty: <strong>execute</strong> any ready tasks,{" "}
            <strong>refine</strong> draft tasks (sharpening the prompt and
            acceptance criteria), and <strong>generate</strong> new draft
            tasks from the definition. It&rsquo;s the closest Watchfire gets
            to &ldquo;set it and walk away,&rdquo; and the worktree + sandbox
            keep the blast radius bounded the whole time.{" "}
            <Link href="/docs/commands/wildfire" className={linkClass}>
              Wildfire command reference
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "agents-and-models",
    title: "Agents &amp; models",
    description:
      "Which CLIs Watchfire drives, how auth works, and how to mix and match.",
    entries: [
      {
        id: "supported-agents",
        question: "Which agent CLIs does Watchfire support today?",
        answer: (
          <>
            Six: Claude Code (Anthropic), OpenAI Codex CLI, opencode, Gemini
            CLI (Google), GitHub Copilot CLI, and Cursor Agent CLI (the
            headless one, distinct from the in-editor agent). Each one keeps
            its own auth and config, and Watchfire sets up per-session homes
            so sessions stay isolated from each other.{" "}
            <Link
              href="/docs/concepts/supported-agents"
              className={linkClass}
            >
              Supported agents reference
            </Link>
            .
          </>
        ),
      },
      {
        id: "multiple-agents",
        question: "Can I use different agents for different projects?",
        answer: (
          <>
            Yes &mdash; the default agent is a per-project setting in{" "}
            <code className={codeClass}>project.yaml</code>. One project can
            use Claude Code, another Codex, another opencode. The daemon
            handles them concurrently, so a slow Codex session won&rsquo;t
            block a Claude Code session in another repo.
          </>
        ),
      },
      {
        id: "api-keys",
        question: "Where do my agent&rsquo;s API keys go?",
        answer: (
          <>
            Wherever that agent CLI normally keeps them &mdash; Watchfire
            doesn&rsquo;t store or relay model credentials. Sign in once
            through the agent&rsquo;s own login flow (e.g.{" "}
            <code className={codeClass}>claude</code> CLI login,{" "}
            <code className={codeClass}>codex</code> login,{" "}
            <code className={codeClass}>gh auth login</code>), and Watchfire
            reuses that setup from{" "}
            <code className={codeClass}>~/.claude/</code>,{" "}
            <code className={codeClass}>~/.codex/</code>,{" "}
            <code className={codeClass}>~/.config/opencode/</code>, etc.{" "}
            <Link href="/security" className={linkClass}>
              Security model
            </Link>
            .
          </>
        ),
      },
      {
        id: "switch-agent",
        question: "Can I switch a project to a different agent later?",
        answer: (
          <>
            Yes &mdash; change{" "}
            <code className={codeClass}>default_agent</code> in{" "}
            <code className={codeClass}>project.yaml</code> (or via{" "}
            <code className={codeClass}>watchfire settings</code>) and new
            sessions will use the new backend. In-flight sessions keep running
            on their original backend until they finish.
          </>
        ),
      },
      {
        id: "byom",
        question: "Can I bring my own model?",
        answer: (
          <>
            Indirectly &mdash; through the agent CLI. opencode is the most
            flexible here: you point it at any provider it supports and
            Watchfire drives opencode normally. Claude Code, Codex, Gemini
            CLI, and Copilot CLI are tied to their vendor&rsquo;s models.
          </>
        ),
      },
    ],
  },
  {
    id: "security-and-privacy",
    title: "Security &amp; privacy",
    description: "What stays on your machine and what the sandbox actually does.",
    entries: [
      {
        id: "data-leaves-machine",
        question: "Does anything I do in Watchfire leave my machine?",
        answer: (
          <>
            Watchfire itself doesn&rsquo;t phone home &mdash; the daemon and
            every client are local-first with no Watchfire-operated server in
            the path. The agent backend you configure still talks to its own
            model provider exactly the way it would if you ran it directly;
            that traffic is between you and that vendor.{" "}
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/security" className={linkClass}>
              Security
            </Link>
            .
          </>
        ),
      },
      {
        id: "secrets-storage",
        question: "Where does Watchfire store integration secrets?",
        answer: (
          <>
            In your OS keyring &mdash; Keychain on macOS, Secret Service on
            Linux, Credential Manager on Windows &mdash; with a clearly-flagged
            file-store fallback for hosts without a keyring backend. The{" "}
            <code className={codeClass}>IntegrationsService.Save</code> gRPC
            is write-only on the wire: clients can replace secrets but never
            read existing values back over RPC.{" "}
            <Link
              href="/blog/2026-05-19-where-watchfire-keeps-your-secrets"
              className={linkClass}
            >
              Where Watchfire keeps your secrets
            </Link>
            .
          </>
        ),
      },
      {
        id: "instructions-md",
        question: "How do I give agents API keys for external services?",
        answer: (
          <>
            Put them in{" "}
            <code className={codeClass}>
              .watchfire/secrets/instructions.md
            </code>{" "}
            &mdash; a Markdown file the agent sees read-only via its system
            prompt. The directory is gitignored by default; it&rsquo;s your
            file, not ours. Use it for &ldquo;the production database URL is
            X,&rdquo; &ldquo;run migrations against this Stripe test key,&rdquo;
            and similar setup notes.{" "}
            <Link href="/docs/concepts/secrets" className={linkClass}>
              Secrets &amp; setup instructions
            </Link>
            .
          </>
        ),
      },
      {
        id: "ssh-access",
        question: "Can the agent read my SSH keys?",
        answer: (
          <>
            No. On macOS and Linux, the platform sandbox denies read and write
            access to <code className={codeClass}>~/.ssh</code>,{" "}
            <code className={codeClass}>~/.aws</code>,{" "}
            <code className={codeClass}>~/.gnupg</code>,{" "}
            <code className={codeClass}>~/.netrc</code>, and{" "}
            <code className={codeClass}>~/.npmrc</code> for every agent
            process. Enforcement is at the kernel level, so it does not rely
            on the agent being well-behaved.
          </>
        ),
      },
      {
        id: "windows-sandbox",
        question: "Why is there no sandbox on Windows?",
        answer: (
          <>
            Windows doesn&rsquo;t expose a kernel primitive equivalent to
            Seatbelt or Landlock that we can use without major caveats, so
            Watchfire runs agent processes unsandboxed there today. For
            security-sensitive work prefer macOS or a recent Linux kernel.
            This is called out plainly in the install docs and on{" "}
            <Link href="/security" className={linkClass}>
              /security
            </Link>
            .
          </>
        ),
      },
      {
        id: "rogue-agent",
        question: "What stops a rogue agent from doing something destructive?",
        answer: (
          <>
            Three things, in layers: the sandbox (no access to credentials or
            directories outside the project), the worktree (writes land on a{" "}
            <code className={codeClass}>watchfire/&lt;n&gt;</code> branch, not
            on your default branch), and you (nothing merges without a review
            you triggered, unless you turned auto-merge on). Restart protection
            also caps runaway loops before they burn budget.{" "}
            <Link href="/security" className={linkClass}>
              Threat model
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "comparisons",
    title: "Comparisons",
    description:
      "How Watchfire compares to other tools in the agent-coding space.",
    entries: [
      {
        id: "vs-aider",
        question: "How does Watchfire compare to Aider?",
        answer: (
          <>
            Aider is itself an agent &mdash; a tight conversational
            pair-programming CLI. Watchfire is an orchestrator that runs the
            agent CLI you already trust (including options Aider doesn&rsquo;t
            replace) inside a per-task worktree and a platform sandbox. Pick
            Aider for a single turn-shaped conversation; pick Watchfire for
            task-shaped, isolated, parallel work.{" "}
            <Link href="/compare/aider" className={linkClass}>
              Watchfire vs Aider
            </Link>
            .
          </>
        ),
      },
      {
        id: "vs-raw-cli",
        question:
          "Why not just run Claude Code or Codex directly, without Watchfire?",
        answer: (
          <>
            You can &mdash; and you should, for one-off prompts in a repo
            you already have open. Watchfire adds three things over the raw
            CLI: per-task git worktrees so failed runs never touch{" "}
            <code className={codeClass}>main</code>, a platform sandbox that
            blocks <code className={codeClass}>~/.ssh</code> and credential
            stores, and parallelism across projects from one daemon. Same
            agent, safer boundary.{" "}
            <Link href="/compare/raw-cli" className={linkClass}>
              Watchfire vs raw CLI
            </Link>
            .
          </>
        ),
      },
      {
        id: "vs-cursor",
        question: "How does Watchfire compare to Cursor&rsquo;s agent mode?",
        answer: (
          <>
            Cursor&rsquo;s agent mode lives inside the editor &mdash; great
            for short edits you watch happen. Watchfire is terminal-first and
            task-shaped: a written prompt, a worktree, a transcript you can
            review later. The two coexist; Cursor&rsquo;s headless{" "}
            <code className={codeClass}>cursor-agent</code> CLI is also a
            Watchfire backend, so you can orchestrate Cursor&rsquo;s models
            in the worktree-isolated flow.{" "}
            <Link href="/compare/cursor-agents" className={linkClass}>
              Watchfire vs Cursor agents
            </Link>
            .
          </>
        ),
      },
      {
        id: "vs-devin",
        question:
          "How does Watchfire compare to Devin and other cloud autonomous agents?",
        answer: (
          <>
            Devin-style products are vendor-hosted: code, prompts, and
            credentials live on their infrastructure. Watchfire is the local
            equivalent &mdash; your laptop is the runtime, the worktrees and
            sandboxes live on disk, and you choose the agent CLI on the other
            end. Pick a cloud agent for hands-off hosted tickets; pick
            Watchfire when the code or prompts can&rsquo;t leave the machine.{" "}
            <Link href="/compare/devin" className={linkClass}>
              Watchfire vs Devin
            </Link>
            .
          </>
        ),
      },
      {
        id: "vs-copilot-workspace",
        question: "How does Watchfire compare to GitHub Copilot Workspace?",
        answer: (
          <>
            Copilot Workspace is hosted, plan-first, and tightly coupled to
            GitHub &mdash; issues in, PRs out. Watchfire runs on your machine,
            keeps the code local, and lets you choose the agent and model
            freely (including GitHub Copilot CLI as one of the backends). Pick
            Copilot Workspace if your workflow is github.com-centric and you
            want hosted execution; pick Watchfire for local-first, multi-agent
            orchestration.{" "}
            <Link href="/compare/copilot-workspace" className={linkClass}>
              Watchfire vs Copilot Workspace
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "pricing-and-licensing",
    title: "Pricing &amp; licensing",
    description: "Cost, license, and what &ldquo;open source&rdquo; means here.",
    entries: [
      {
        id: "cost",
        question: "How much does Watchfire cost?",
        answer: (
          <>
            Watchfire itself is free. You pay whatever your chosen agent
            CLI&rsquo;s model costs &mdash; the Claude API for Claude Code,
            the OpenAI API for Codex, etc. There is no subscription, no
            per-task fee, no seat licence, and no Watchfire-operated server
            charging in the background.
          </>
        ),
      },
      {
        id: "license",
        question: "What&rsquo;s the license?",
        answer: (
          <>
            Apache License 2.0 for the daemon, CLI/TUI, and GUI. Full source
            and the LICENSE file live at{" "}
            <a
              href="https://github.com/watchfire-io/watchfire"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              github.com/watchfire-io/watchfire
            </a>
            .
          </>
        ),
      },
      {
        id: "commercial-use",
        question: "Can I use Watchfire commercially?",
        answer: (
          <>
            Yes &mdash; Apache 2.0 explicitly permits commercial use,
            modification, distribution, and patent grants. Use it in your
            company, your products, your client work, your closed-source
            repos. Read the full LICENSE if you want the legal version, but
            the short version is: there&rsquo;s no commercial-use carve-out.
          </>
        ),
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description:
      "The failure modes that come up most often, and where to look first.",
    entries: [
      {
        id: "daemon-wont-start",
        question:
          "The daemon won&rsquo;t start &mdash; what should I check first?",
        answer: (
          <>
            Run <code className={codeClass}>watchfired --foreground</code> so
            stderr lands in your terminal. Two common culprits: another
            process is already on{" "}
            <code className={codeClass}>127.0.0.1:8765</code> (set a different{" "}
            <code className={codeClass}>ListenAddr</code> or stop the conflict),
            or a stale{" "}
            <code className={codeClass}>~/.watchfire/daemon.yaml</code> with a
            live-but-unrelated PID (delete it and re-run{" "}
            <code className={codeClass}>watchfire daemon start</code>).{" "}
            <Link
              href="/docs/troubleshooting#daemon-wont-start"
              className={linkClass}
            >
              Full daemon-startup runbook
            </Link>
            .
          </>
        ),
      },
      {
        id: "cli-cant-connect",
        question:
          "`watchfire status` returns &lsquo;connection refused&rsquo; &mdash; how do I fix it?",
        answer: (
          <>
            Run <code className={codeClass}>watchfire daemon status</code>{" "}
            first. If it reports the daemon isn&rsquo;t running, start it with{" "}
            <code className={codeClass}>watchfire daemon start</code>. If it
            reports a PID but the CLI still can&rsquo;t connect, the recorded
            PID is stale &mdash; run{" "}
            <code className={codeClass}>watchfire daemon stop</code> then{" "}
            <code className={codeClass}>watchfire daemon start</code> to clear
            it.{" "}
            <Link
              href="/docs/troubleshooting#clitui-cant-connect-to-daemon"
              className={linkClass}
            >
              Connection-refused runbook
            </Link>
            .
          </>
        ),
      },
      {
        id: "gui-no-daemon",
        question: "The GUI says &lsquo;no daemon&rsquo; &mdash; what now?",
        answer: (
          <>
            The GUI launches <code className={codeClass}>watchfired</code>{" "}
            itself by walking <code className={codeClass}>PATH</code> and then
            a couple of standard install locations. If none resolve, the GUI
            surfaces the connection error. Check{" "}
            <code className={codeClass}>which watchfired</code> from a normal
            terminal; if nothing comes back, reinstall (Homebrew is the easy
            path on macOS). If the binary exists, start the daemon manually
            before opening the app.{" "}
            <Link
              href="/docs/troubleshooting#gui-shows-no-daemon"
              className={linkClass}
            >
              GUI runbook
            </Link>
            .
          </>
        ),
      },
      {
        id: "stuck-tasks",
        question:
          "A task is stuck in &lsquo;in progress&rsquo; after a crash &mdash; how do I recover?",
        answer: (
          <>
            Use <code className={codeClass}>watchfire task stop &lt;n&gt;</code>{" "}
            to clear the in-progress flag, then inspect the worktree under{" "}
            <code className={codeClass}>
              .watchfire/worktrees/&lt;n&gt;
            </code>{" "}
            for partial work. You can resume by flipping the task back to{" "}
            <code className={codeClass}>ready</code>, or set{" "}
            <code className={codeClass}>success: false</code> with a{" "}
            <code className={codeClass}>failure_reason</code> if the run is
            unrecoverable.{" "}
            <Link
              href="/docs/troubleshooting#tasks-stuck-after-a-crash"
              className={linkClass}
            >
              Stuck-task runbook
            </Link>
            .
          </>
        ),
      },
      {
        id: "worktree-merge-failed",
        question: "A worktree won&rsquo;t merge cleanly &mdash; what should I do?",
        answer: (
          <>
            Auto-merge intentionally bails on conflicts rather than guessing.
            Open the worktree, resolve conflicts the way you would for any
            other branch, then merge manually. Watchfire won&rsquo;t retry
            silently behind your back &mdash; the worktree and branch stay
            until you decide what to keep.{" "}
            <Link
              href="/docs/troubleshooting#worktree-wont-merge"
              className={linkClass}
            >
              Merge-failure runbook
            </Link>
            .
          </>
        ),
      },
      {
        id: "wildfire-runs-forever",
        question: "Wildfire mode never stops &mdash; how do I cap it?",
        answer: (
          <>
            Wildfire keeps generating and executing while there are ready
            tasks (or drafts to refine, or definition gaps to fill). Cap it
            with the iteration / time limits in{" "}
            <code className={codeClass}>watchfire wildfire --help</code>, or
            stop it interactively from the TUI/GUI. Restart protection
            already caps obvious runaway loops, but Wildfire&rsquo;s job is
            to keep working &mdash; you tell it when to stop.{" "}
            <Link
              href="/docs/troubleshooting#wildfire-mode-runs-forever"
              className={linkClass}
            >
              Wildfire-loop runbook
            </Link>
            .
          </>
        ),
      },
    ],
  },
];
