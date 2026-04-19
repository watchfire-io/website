const modes = [
  {
    name: "Wildfire",
    description: "Autonomous loop — execute ready tasks, refine drafts, generate new tasks, repeat.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c.5 4-2.5 6-2.5 10a5 5 0 1010 0C19.5 8 15 4 12 2z" />
        <path d="M12 22v-4" />
      </svg>
    ),
    highlighted: true,
  },
  {
    name: "Chat",
    description: "Interactive session with the coding agent — ask questions, iterate, and pair-program.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    name: "Task",
    description: "Execute a single task from the task list in its own worktree.",
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
    description: "Run every ready task sequentially, one worktree per task.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
        <line x1="19" y1="3" x2="19" y2="21" />
      </svg>
    ),
  },
  {
    name: "Generate Definition",
    description: "Auto-generate a project definition by scanning your codebase.",
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
    description: "Break down the project definition into discrete, ready-to-run tasks.",
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
    <section className="relative overflow-hidden px-6 py-24">
      {/* Subtle background shift */}
      <div className="absolute inset-0 bg-zinc-50/70 dark:bg-zinc-900/40" aria-hidden="true" />
      {/* Ambient glow */}
      <div
        className="glow-blob glow-blob-fire pointer-events-none left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            Modes
          </span>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            From pair programming to{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              autonomous loops
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Six modes that cover interactive chat, single tasks, and fully hands-off Wildfire runs.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((mode) => (
            <div
              key={mode.name}
              data-stagger
              className={`card-hover group relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all ${
                mode.highlighted
                  ? "border-fire-500/50 bg-gradient-to-br from-fire-500/10 via-fire-500/5 to-transparent shadow-[0_0_40px_rgba(224,112,64,0.18)] dark:border-fire-400/50"
                  : "border-zinc-200 bg-white/70 hover:border-fire-500/30 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30"
              }`}
            >
              {/* Flagship sparkle background */}
              {mode.highlighted && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fire-500/30 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-ember-500/20 blur-3xl"
                  />
                </>
              )}

              <div className="relative flex items-start justify-between gap-3">
                <div
                  className={`inline-flex rounded-lg p-2.5 transition-all ${
                    mode.highlighted
                      ? "border border-fire-500/30 bg-gradient-to-br from-fire-500/25 to-ember-500/10 text-fire-500 shadow-[0_0_20px_rgba(224,112,64,0.25)] dark:text-fire-300"
                      : "bg-zinc-100 text-zinc-500 group-hover:bg-fire-500/10 group-hover:text-fire-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-fire-400/10 dark:group-hover:text-fire-300"
                  }`}
                >
                  {mode.icon}
                </div>
                {mode.highlighted && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-fire-500/40 bg-fire-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-300">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l2.35 6.95H21l-5.32 3.86 2.02 6.19L12 14.88l-5.7 4.12 2.02-6.19L3 8.95h6.65z" />
                    </svg>
                    Flagship
                  </span>
                )}
              </div>
              <h3 className={`mt-4 text-lg font-semibold ${mode.highlighted ? "text-zinc-900 dark:text-white" : "text-zinc-900 dark:text-white"}`}>
                {mode.name}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${mode.highlighted ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-600 dark:text-zinc-400"}`}>
                {mode.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
