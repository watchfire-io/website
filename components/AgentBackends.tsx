const agents = [
  {
    name: "Claude Code",
    tag: "claude-code",
    vendor: "Anthropic",
    initial: "C",
  },
  {
    name: "Codex",
    tag: "codex",
    vendor: "OpenAI",
    initial: "Cx",
  },
  {
    name: "opencode",
    tag: "opencode",
    vendor: "Open source",
    initial: "oc",
  },
  {
    name: "Gemini CLI",
    tag: "gemini",
    vendor: "Google",
    initial: "G",
  },
];

const capabilities = [
  {
    title: "Project default",
    description:
      "Pick one agent per project during watchfire init — or change it anytime from the settings tab.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 14h5" />
      </svg>
    ),
  },
  {
    title: "Per-task override",
    description:
      "Pin individual tasks to a specific backend — Claude Code for architecture, Codex for trivial edits, or swap to a new agent without touching project settings.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <circle cx="4" cy="6" r="1.5" />
        <circle cx="4" cy="12" r="1.5" />
        <circle cx="4" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Unified transcripts",
    description:
      "Every backend renders into the same clean User/Assistant log — so you can review a session the same way, no matter which agent ran it.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5h16v11H7l-3 3z" />
        <path d="M8 10h8" />
        <path d="M8 13h5" />
      </svg>
    ),
  },
];

export default function AgentBackends() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-400">
            New in v2.0.0
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Any agent.{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              One orchestrator.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Watchfire is backend-agnostic. Plug in your favourite CLI coding agent&nbsp;&mdash; or mix and match across tasks.
          </p>
        </div>

        {/* Agent cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent) => (
            <div
              key={agent.tag}
              data-stagger
              className="card-hover group relative rounded-xl border border-zinc-200 bg-white/60 p-5 transition-colors dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 font-mono text-sm font-semibold text-fire-600 dark:text-fire-400">
                  {agent.initial}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {agent.vendor}
                  </p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <span className="mr-1 text-zinc-400 dark:text-zinc-500">$</span>
                {agent.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Capability blocks */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              data-stagger
              className="rounded-xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="inline-flex rounded-lg bg-fire-500/10 p-2.5 text-fire-600 dark:text-fire-400">
                {cap.icon}
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
