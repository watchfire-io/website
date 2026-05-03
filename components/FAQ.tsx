import Link from "next/link";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
};

const items: FAQItem[] = [
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
  },
];

export default function FAQ() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Questions,{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              answered
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The honest version — what Watchfire does, what it doesn&rsquo;t, and
            how it stays out of your way.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              open={item.defaultOpen}
              className="group/faq overflow-hidden rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-sm transition-colors hover:border-fire-500/30 open:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30 dark:open:border-fire-400/40 [&[open]>summary>svg]:rotate-180"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-zinc-900 marker:hidden dark:text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <svg
                  className="mt-1 shrink-0 text-zinc-400 transition-transform duration-200 group-hover/faq:text-fire-500 dark:group-hover/faq:text-fire-400"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
