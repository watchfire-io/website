const steps = [
  {
    number: 1,
    title: "watchfire init",
    description: "Define your project with a project definition",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Create tasks",
    description: "Describe what you want built in YAML task files",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Start agents",
    description: "Agents work in isolated git worktrees, one branch per task",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Monitor",
    description: "Watch live terminal output through the TUI or GUI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    number: 5,
    title: "Review & merge",
    description: "Completed work is automatically merged back to your default branch",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 009 9" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
          From project setup to merged code in five steps
        </p>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-16 hidden lg:block">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.number} data-stagger className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-purple-500/30 bg-white text-purple-500 shadow-lg shadow-purple-500/10 dark:bg-zinc-900 dark:text-purple-400">
                  {step.icon}
                </div>
                <span className="mt-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                  Step {step.number}
                </span>
                <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-12 lg:hidden">
          <div className="relative space-y-10 pl-10">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />

            {steps.map((step) => (
              <div key={step.number} data-stagger className="relative flex items-start gap-4">
                <div className="absolute -left-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-white text-purple-500 shadow-lg shadow-purple-500/10 dark:bg-zinc-900 dark:text-purple-400">
                  <span className="text-sm font-bold">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
