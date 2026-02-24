const modes = [
  {
    name: "Chat",
    description: "Interactive session with the coding agent",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    name: "Task",
    description: "Execute a specific task from the task list",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Start All",
    description: "Run all ready tasks sequentially",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
        <line x1="19" y1="3" x2="19" y2="21" />
      </svg>
    ),
  },
  {
    name: "Wildfire",
    description: "Autonomous loop: execute tasks, refine drafts, generate new tasks",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c.5 4-2.5 6-2.5 10a5 5 0 1010 0C19.5 8 15 4 12 2z" />
        <path d="M12 22v-4" />
      </svg>
    ),
    highlighted: true,
  },
  {
    name: "Generate Definition",
    description: "Auto-generate a project definition from your codebase",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    name: "Generate Tasks",
    description: "Auto-generate tasks from the project definition",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

export default function AgentModes() {
  return (
    <section className="relative px-6 py-24">
      {/* Subtle background shift */}
      <div className="absolute inset-0 bg-zinc-900/50" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Agent Modes
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-400">
          Multiple ways to interact with your coding agents
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((mode) => (
            <div
              key={mode.name}
              className={`group relative rounded-xl border p-6 transition-colors ${
                mode.highlighted
                  ? "border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10"
                  : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
              }`}
            >
              {mode.highlighted && (
                <div className="absolute -inset-px -z-10 rounded-xl bg-gradient-to-b from-purple-500/20 to-transparent blur-sm" />
              )}
              <div
                className={`inline-flex rounded-lg p-2.5 ${
                  mode.highlighted
                    ? "bg-purple-500/15 text-purple-400"
                    : "bg-zinc-800 text-zinc-400 group-hover:text-zinc-300"
                }`}
              >
                {mode.icon}
              </div>
              <h3 className="mt-4 font-semibold text-white">
                {mode.name}
                {mode.highlighted && (
                  <span className="ml-2 inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-300">
                    Flagship
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {mode.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
