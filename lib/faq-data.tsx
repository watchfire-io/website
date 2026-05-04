import Link from "next/link";

export type FAQItem = {
  question: string;
  answer: React.ReactNode;
  answerText: string;
  defaultOpen?: boolean;
};

export const faqItems: FAQItem[] = [
  {
    question:
      "How is this different from running Claude Code, Codex, or another agent directly?",
    defaultOpen: true,
    answer: (
      <>
        Watchfire wraps any of those CLIs in a per-task git worktree and a
        platform sandbox, fed by structured task files and reviewed through clean
        transcripts. You can run multiple agents in parallel without merge
        conflicts and inspect every change before it lands on your default
        branch — the agent stays the same, the workflow around it gets safer and
        repeatable.
      </>
    ),
    answerText:
      "Watchfire wraps any of those CLIs in a per-task git worktree and a platform sandbox, fed by structured task files and reviewed through clean transcripts. You can run multiple agents in parallel without merge conflicts and inspect every change before it lands on your default branch — the agent stays the same, the workflow around it gets safer and repeatable.",
  },
  {
    question: "How does Watchfire compare to Aider, Cursor, or Devin?",
    answer: (
      <>
        Short version: those are agents (or in Cursor&rsquo;s case, an
        editor with an agent mode); Watchfire is an orchestrator that
        runs the coding-agent CLIs you already trust in sandboxed,
        parallel git worktrees.{" "}
        <Link
          href="/docs/compare"
          className="text-fire-600 hover:underline dark:text-fire-300"
        >
          See the full comparison
        </Link>{" "}
        for tool-by-tool positioning.
      </>
    ),
    answerText:
      "Short version: those are agents (or in Cursor's case, an editor with an agent mode); Watchfire is an orchestrator that runs the coding-agent CLIs you already trust in sandboxed, parallel git worktrees. See the full comparison at /docs/compare for tool-by-tool positioning.",
  },
  {
    question: "Which agent backends are supported?",
    answer: (
      <>
        Claude Code, OpenAI Codex, opencode, Gemini CLI, and GitHub Copilot CLI
        today. Backends are pluggable, so you can mix and match across tasks or
        switch any time.{" "}
        <Link
          href="/docs/concepts/supported-agents"
          className="text-fire-600 hover:underline dark:text-fire-300"
        >
          See the supported-agents reference
        </Link>{" "}
        for install paths and per-backend notes.
      </>
    ),
    answerText:
      "Claude Code, OpenAI Codex, opencode, Gemini CLI, and GitHub Copilot CLI today. Backends are pluggable, so you can mix and match across tasks or switch any time. The supported-agents reference at /docs/concepts/supported-agents lists install paths and per-backend notes.",
  },
  {
    question: "Is my code and are my credentials safe?",
    answer: (
      <>
        Every macOS and Linux session runs inside a platform-native sandbox —
        Seatbelt (<code className="font-mono text-[0.9em]">sandbox-exec</code>)
        on macOS, Landlock (kernel 5.13+) with a Bubblewrap fallback on Linux —
        with{" "}
        <code className="font-mono text-[0.9em]">~/.ssh</code>, credential
        stores, and <code className="font-mono text-[0.9em]">.git/hooks</code>{" "}
        blocked by default. Restart protection caps runaway loops before they
        burn budget.{" "}
        <Link
          href="/docs/concepts/sandboxing"
          className="text-fire-600 hover:underline dark:text-fire-300"
        >
          Full sandboxing details
        </Link>
        .
      </>
    ),
    answerText:
      "Every macOS and Linux session runs inside a platform-native sandbox — Seatbelt (sandbox-exec) on macOS, Landlock (kernel 5.13+) with a Bubblewrap fallback on Linux — with ~/.ssh, credential stores, and .git/hooks blocked by default. Restart protection caps runaway loops before they burn budget. Full sandboxing details live at /docs/concepts/sandboxing.",
  },
  {
    question: "What platforms does Watchfire run on?",
    answer: (
      <>
        macOS, Linux, and Windows. Sandboxing is enforced on macOS (Seatbelt)
        and Linux (Landlock or Bubblewrap); Windows currently runs agents
        unsandboxed, so prefer macOS or a recent Linux kernel for security-
        sensitive work.
      </>
    ),
    answerText:
      "macOS, Linux, and Windows. Sandboxing is enforced on macOS (Seatbelt) and Linux (Landlock or Bubblewrap); Windows currently runs agents unsandboxed, so prefer macOS or a recent Linux kernel for security-sensitive work.",
  },
  {
    question: "Is it free? Open source?",
    answer: (
      <>
        Yes — Watchfire is open source under the Apache License 2.0. The full
        source for the daemon, CLI/TUI, and GUI lives at{" "}
        <a
          href="https://github.com/watchfire-io/watchfire"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fire-600 hover:underline dark:text-fire-300"
        >
          github.com/watchfire-io/watchfire
        </a>
        .
      </>
    ),
    answerText:
      "Yes — Watchfire is open source under the Apache License 2.0. The full source for the daemon, CLI/TUI, and GUI lives at github.com/watchfire-io/watchfire.",
  },
  {
    question:
      "Do I need to use the GUI, or can I run everything from the terminal?",
    answer: (
      <>
        The CLI (<code className="font-mono text-[0.9em]">watchfire</code>) and
        the interactive TUI cover everything the GUI does — they all talk to the
        same daemon over gRPC. The Electron GUI is just another client; pick
        whichever fits your workflow, or use both side by side.
      </>
    ),
    answerText:
      "The CLI (watchfire) and the interactive TUI cover everything the GUI does — they all talk to the same daemon over gRPC. The Electron GUI is just another client; pick whichever fits your workflow, or use both side by side.",
  },
  {
    question:
      "Can Watchfire post to Slack or Discord, or open GitHub PRs automatically?",
    answer: (
      <>
        Yes. The v4.0.0 Beacon integrations layer ships outbound adapters for
        webhooks, Slack, Discord, and GitHub auto-PR, plus a small inbound HTTP
        server with HMAC and Ed25519 signature verification so those services
        can drive the daemon back.{" "}
        <Link
          href="/docs/concepts/integrations"
          className="text-fire-600 hover:underline dark:text-fire-300"
        >
          See the integrations docs
        </Link>
        .
      </>
    ),
    answerText:
      "Yes. The v4.0.0 Beacon integrations layer ships outbound adapters for webhooks, Slack, Discord, and GitHub auto-PR, plus a small inbound HTTP server with HMAC and Ed25519 signature verification so those services can drive the daemon back. The integrations docs live at /docs/concepts/integrations.",
  },
  {
    question: "How do I see what an agent actually did?",
    answer: (
      <>
        Every task has an inline file-by-file diff viewer that works pre-merge
        (against the merge base of{" "}
        <code className="font-mono text-[0.9em]">watchfire/&lt;n&gt;</code>) and
        post-merge (reconstructed from the merge commit), and a per-task
        Insights record captures duration, tokens, and cost.{" "}
        <Link
          href="/docs/components/gui"
          className="text-fire-600 hover:underline dark:text-fire-300"
        >
          GUI walkthrough
        </Link>{" "}
        ·{" "}
        <Link
          href="/docs/concepts/insights"
          className="text-fire-600 hover:underline dark:text-fire-300"
        >
          Insights &amp; metrics
        </Link>
        .
      </>
    ),
    answerText:
      "Every task has an inline file-by-file diff viewer that works pre-merge (against the merge base of watchfire/<n>) and post-merge (reconstructed from the merge commit), and a per-task Insights record captures duration, tokens, and cost. The GUI walkthrough lives at /docs/components/gui and Insights & metrics at /docs/concepts/insights.",
  },
];
