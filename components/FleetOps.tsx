import Link from "next/link";

const capabilities = [
  {
    title: "Dashboard",
    description:
      "Aggregate status bar, filter chips, layout toggle, live PTY previews. See working / needs attention / idle / done at a glance, then drill in.",
    href: "/docs/components/gui#dashboard",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Notifications",
    description:
      "Typed notification bus with OS notifications, bundled sounds, dynamic tray menu, and a weekly digest. Headless? They land in a JSONL fallback log.",
    href: "/docs/components/daemon#desktop-notifications",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
        <path d="M3 5l1.5 1.5" />
        <path d="M21 5l-1.5 1.5" />
      </svg>
    ),
  },
  {
    title: "Insights & metrics",
    description:
      "Per-task token, cost, and duration capture. Per-project Insights, cross-project rollup, CSV / Markdown export, plus an inline diff viewer pre- or post-merge.",
    href: "/docs/concepts/insights",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3v17a1 1 0 0 0 1 1h17" />
        <path d="M7 16l4-5 3 3 5-7" />
        <circle cx="7" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="11" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Integrations",
    description:
      "Outbound webhooks, Slack, Discord, Telegram, GitHub auto-PR, plus an inbound HTTP server routing slash commands to a transport-agnostic command layer.",
    href: "/docs/concepts/integrations",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 2v4" />
        <path d="M15 2v4" />
        <path d="M7 6h10v5a5 5 0 0 1-4 4.9V20a2 2 0 1 1-2 0v-4.1A5 5 0 0 1 7 11V6Z" />
      </svg>
    ),
  },
];

export default function FleetOps() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div
        className="glow-blob glow-blob-ember pointer-events-none right-[6%] top-12 h-[360px] w-[360px]"
        aria-hidden="true"
      />
      <div
        className="glow-blob glow-blob-fire pointer-events-none -bottom-16 left-[8%] h-[320px] w-[320px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            Fleet operations
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            One window for the whole{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              fleet
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Watchfire turns agents you have to babysit into a fleet you can supervise. The dashboard, notifications, insights, and integrations work together to keep you in the loop without staying on the keyboard.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <Link
              key={cap.title}
              href={cap.href}
              data-stagger
              className="card-hover group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-all hover:border-fire-500/30 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30"
            >
              <div className="inline-flex w-fit rounded-lg bg-zinc-100 p-2.5 text-zinc-500 transition-all group-hover:bg-fire-500/10 group-hover:text-fire-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-fire-400/10 dark:group-hover:text-fire-300">
                {cap.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                {cap.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {cap.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fire-600 dark:text-fire-300">
                Learn more
                <svg
                  className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Telegram bridge — the Torch 10.0 tentpole */}
        <div
          data-stagger
          className="card-hover group relative mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm transition-all hover:border-fire-500/30 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30"
        >
          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2 md:items-center md:gap-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                Telegram bridge
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Watchfire in your pocket
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Pair your own bot with the daemon and run the fleet from any phone. Just type in the chat to talk to an agent — one starts if nothing is running — and watch mode streams the replies back.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                {telegramPoints.map((point) => (
                  <li key={point.code} className="flex gap-3">
                    <code className="mt-px shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[12px] text-fire-700 dark:bg-zinc-800 dark:text-fire-300">
                      {point.code}
                    </code>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-500">
                Outbound long-poll only — nothing listens on your machine. Pairing is a one-time code; unpaired chats get silence.
              </p>
              <Link
                href="/docs/concepts/telegram"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fire-600 dark:text-fire-300"
              >
                Set up the bridge in five minutes
                <svg
                  className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <TelegramChatMock />
          </div>
        </div>
      </div>
    </section>
  );
}

const telegramPoints = [
  {
    code: "/wildfire",
    text: "Start the autonomous loop from the bus stop and get a milestone feed: generated, implementing, merged.",
  },
  {
    code: "/status all",
    text: "One line per project — what's working, what's idle, what needs you.",
  },
  {
    code: "/login",
    text: "Claude's OAuth token expired? Tap the link, send the code back. No trip to the keyboard.",
  },
];

const chat: Array<{ from: "you" | "bot"; text: string; pre?: boolean }> = [
  { from: "you", text: "/wildfire" },
  {
    from: "bot",
    text: "▶ Started wildfire on watchfire-website. Replaced the running chat session.",
  },
  { from: "bot", text: "🔥 wildfire — implementing task 0151 — Add /login to the Telegram docs" },
  { from: "bot", text: "⚒ Edit content/docs/concepts/telegram.mdx", pre: true },
  { from: "bot", text: "✔ merged task 0151" },
  { from: "you", text: "why did that take two tries?" },
  {
    from: "bot",
    text: "The first build failed on a stale snapshot test — I regenerated it and re-ran the suite before committing.",
  },
];

function TelegramChatMock() {
  return (
    <div
      role="img"
      aria-label="A Telegram chat with the Watchfire bot: the user sends /wildfire, the bot streams wildfire milestones and a merge, then answers a plain-text question."
      className="mx-auto w-full max-w-sm"
    >
      <div className="overflow-hidden rounded-2xl border border-zinc-700/70 bg-[#16181d] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fire-400 to-ember-500 text-sm" aria-hidden="true">
            🔥
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-zinc-100">watchfire_bot</p>
            <p className="text-[11px] text-zinc-500">typing…</p>
          </div>
        </div>
        <div className="space-y-2 px-3 py-4 text-[13px] leading-snug">
          {chat.map((m, i) => (
            <div key={i} className={m.from === "you" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.from === "you"
                    ? "max-w-[82%] rounded-2xl rounded-br-md bg-fire-500/90 px-3 py-1.5 text-white"
                    : m.pre
                      ? "max-w-[88%] rounded-2xl rounded-bl-md bg-zinc-800/80 px-3 py-1.5 font-mono text-[12px] text-zinc-300"
                      : "max-w-[88%] rounded-2xl rounded-bl-md bg-zinc-800/80 px-3 py-1.5 text-zinc-200"
                }
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
