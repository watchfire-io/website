const agents = [
  {
    name: "Claude Code",
    tag: "claude-code",
    vendor: "Anthropic",
    initial: "C",
    accent: "#d97757",
    accentRgb: "217, 119, 87",
  },
  {
    name: "Codex",
    tag: "codex",
    vendor: "OpenAI",
    initial: "Cx",
    accent: "#10a37f",
    accentRgb: "16, 163, 127",
  },
  {
    name: "opencode",
    tag: "opencode",
    vendor: "Open source",
    initial: "oc",
    accent: "#8b5cf6",
    accentRgb: "139, 92, 246",
  },
  {
    name: "Gemini CLI",
    tag: "gemini",
    vendor: "Google",
    initial: "G",
    accent: "#4285f4",
    accentRgb: "66, 133, 244",
  },
  {
    name: "Copilot CLI",
    tag: "copilot",
    vendor: "GitHub",
    initial: "Co",
    accent: "#8957e5",
    accentRgb: "137, 87, 229",
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
      "Pin individual tasks to a specific backend — Claude Code for architecture, Codex for trivial edits, or swap agents without touching project settings.",
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
      "Every backend renders into the same clean User/Assistant log — so you review a session the same way no matter which agent ran it.",
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/40 bg-fire-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fire-600 shadow-[0_0_20px_rgba(224,112,64,0.15)] dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            New in v3.0.0
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
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {agents.map((agent) => (
            <div
              key={agent.tag}
              data-stagger
              className="card-hover group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
              style={{
                // Expose accent via CSS vars so hover effects can use it
                ["--accent" as never]: agent.accent,
                ["--accent-rgb" as never]: agent.accentRgb,
              }}
            >
              {/* Per-agent colored glow on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `rgba(${agent.accentRgb}, 0.35)` }}
              />
              {/* Top accent bar */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${agent.accent}, transparent)`,
                }}
              />

              <div className="relative flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold transition-all duration-300 group-hover:scale-105"
                  style={{
                    color: agent.accent,
                    borderColor: `rgba(${agent.accentRgb}, 0.4)`,
                    background: `rgba(${agent.accentRgb}, 0.12)`,
                    boxShadow: `0 0 20px rgba(${agent.accentRgb}, 0.15)`,
                  }}
                >
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
              <div className="relative mt-4 inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <span className="text-zinc-400 dark:text-zinc-600">$</span>
                <span>{agent.tag}</span>
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
              className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-all hover:border-fire-500/40 hover:shadow-[0_0_30px_rgba(224,112,64,0.1)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
            >
              <div className="relative inline-flex rounded-lg border border-fire-500/20 bg-gradient-to-br from-fire-500/15 to-fire-500/5 p-2.5 text-fire-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] dark:border-fire-400/20 dark:text-fire-400">
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
