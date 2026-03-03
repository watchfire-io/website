const components = [
  {
    title: "CLI / TUI",
    description: "Project-scoped commands + interactive TUI mode",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        {/* Terminal window */}
        <rect x="40" y="30" width="320" height="220" rx="10" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1" />
        <rect x="40" y="30" width="320" height="28" rx="10" className="fill-zinc-100 dark:fill-zinc-800" />
        <rect x="40" y="48" width="320" height="10" className="fill-zinc-100 dark:fill-zinc-800" />
        <circle cx="58" cy="44" r="4" fill="#ff5f57" opacity="0.6" />
        <circle cx="72" cy="44" r="4" fill="#ffbd2e" opacity="0.6" />
        <circle cx="86" cy="44" r="4" fill="#28c940" opacity="0.6" />

        {/* Split pane divider */}
        <line x1="200" y1="58" x2="200" y2="250" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" />

        {/* Left pane — task list */}
        <text x="56" y="78" fontSize="9" fontFamily="monospace" fill="#e07040" opacity="0.8">TASKS</text>
        <rect x="52" y="88" width="136" height="22" rx="4" fill="#e07040" opacity="0.12" />
        <rect x="60" y="95" width="8" height="8" rx="2" fill="#22c55e" opacity="0.6" />
        <rect x="74" y="97" width="80" height="4" rx="2" className="fill-zinc-400 dark:fill-zinc-500" />
        <rect x="52" y="118" width="136" height="22" rx="4" className="fill-transparent" />
        <rect x="60" y="125" width="8" height="8" rx="2" fill="#e07040" opacity="0.5" />
        <rect x="74" y="127" width="60" height="4" rx="2" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="52" y="148" width="136" height="22" rx="4" className="fill-transparent" />
        <rect x="60" y="155" width="8" height="8" rx="2" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="74" y="157" width="70" height="4" rx="2" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="52" y="178" width="136" height="22" rx="4" className="fill-transparent" />
        <rect x="60" y="185" width="8" height="8" rx="2" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="74" y="187" width="50" height="4" rx="2" className="fill-zinc-300 dark:fill-zinc-600" />

        {/* Right pane — terminal output */}
        <text x="216" y="78" fontSize="9" fontFamily="monospace" fill="#e07040" opacity="0.8">OUTPUT</text>
        <rect x="216" y="90" width="50" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="216" y="100" width="120" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="216" y="110" width="80" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="216" y="120" width="100" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="216" y="130" width="60" height="3" rx="1.5" fill="#22c55e" opacity="0.4" />
        <rect x="216" y="140" width="90" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="216" y="155" width="8" height="10" rx="1" fill="#e07040" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.2s" repeatCount="indefinite" />
        </rect>
      </svg>
    ),
  },
  {
    title: "GUI (Watchfire.app)",
    description: "Electron multi-project client with live terminal output",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        {/* App window */}
        <rect x="30" y="20" width="340" height="240" rx="10" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1" />
        <rect x="30" y="20" width="340" height="28" rx="10" className="fill-zinc-100 dark:fill-zinc-800" />
        <rect x="30" y="38" width="340" height="10" className="fill-zinc-100 dark:fill-zinc-800" />
        <circle cx="48" cy="34" r="4" fill="#ff5f57" opacity="0.6" />
        <circle cx="62" cy="34" r="4" fill="#ffbd2e" opacity="0.6" />
        <circle cx="76" cy="34" r="4" fill="#28c940" opacity="0.6" />

        {/* Sidebar */}
        <rect x="30" y="48" width="90" height="212" className="fill-zinc-100/80 dark:fill-zinc-800/80" />
        <line x1="120" y1="48" x2="120" y2="260" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" />

        {/* Sidebar projects */}
        <rect x="40" y="60" width="70" height="8" rx="2" fill="#e07040" opacity="0.3" />
        <rect x="42" y="78" width="66" height="20" rx="4" fill="#e07040" opacity="0.12" />
        <circle cx="52" cy="88" r="4" fill="#e07040" opacity="0.5" />
        <rect x="60" y="86" width="40" height="4" rx="2" className="fill-zinc-500 dark:fill-zinc-400" />
        <rect x="42" y="106" width="66" height="20" rx="4" className="fill-transparent" />
        <circle cx="52" cy="116" r="4" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="60" y="114" width="35" height="4" rx="2" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="42" y="134" width="66" height="20" rx="4" className="fill-transparent" />
        <circle cx="52" cy="144" r="4" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="60" y="142" width="42" height="4" rx="2" className="fill-zinc-300 dark:fill-zinc-600" />

        {/* Main area — task view */}
        <text x="134" y="66" fontSize="9" fontFamily="monospace" fill="#e07040" opacity="0.8">Task #001</text>
        <rect x="134" y="76" width="160" height="4" rx="2" className="fill-zinc-400 dark:fill-zinc-500" />
        <rect x="134" y="86" width="120" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />

        {/* Embedded terminal */}
        <rect x="134" y="100" width="220" height="148" rx="6" className="fill-zinc-100 stroke-zinc-200 dark:fill-zinc-950 dark:stroke-zinc-800" strokeWidth="1" />
        <rect x="144" y="114" width="40" height="3" rx="1.5" fill="#e07040" opacity="0.4" />
        <rect x="144" y="124" width="140" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="144" y="134" width="100" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="144" y="144" width="160" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="144" y="154" width="80" height="3" rx="1.5" fill="#22c55e" opacity="0.4" />
        <rect x="144" y="164" width="120" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <rect x="144" y="179" width="8" height="10" rx="1" fill="#e07040" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.2s" repeatCount="indefinite" />
        </rect>

        {/* Status indicator */}
        <circle cx="340" y="66" r="5" fill="#22c55e" opacity="0.3" />
        <circle cx="340" y="66" r="3" fill="#22c55e" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
  {
    title: "Daemon (watchfired)",
    description: "Orchestration, PTY management, git workflows, gRPC server",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        {/* Central hub */}
        <circle cx="200" cy="140" r="36" fill="#e07040" opacity="0.1" />
        <circle cx="200" cy="140" r="24" fill="#e07040" opacity="0.15" />
        <circle cx="200" cy="140" r="14" fill="#e07040" opacity="0.3" />
        {/* Flame icon in center */}
        <path d="M200 128c0 0-6 4-6 10 0 4 3 6 6 6s6-2 6-6c0-6-6-10-6-10z" fill="#e07040" opacity="0.7" />

        {/* Radiating connections */}
        {/* Top-left: Projects */}
        <line x1="175" y1="118" x2="100" y2="60" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <rect x="60" y="40" width="80" height="40" rx="8" className="fill-zinc-100 stroke-zinc-300 dark:fill-zinc-800 dark:stroke-zinc-700" strokeWidth="1" />
        <rect x="72" y="52" width="40" height="4" rx="2" className="fill-zinc-400 dark:fill-zinc-500" />
        <rect x="72" y="62" width="55" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <text x="100" y="36" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#e07040" opacity="0.7">Projects</text>

        {/* Top-right: Agents */}
        <line x1="225" y1="118" x2="300" y2="60" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <rect x="260" y="40" width="80" height="40" rx="8" className="fill-zinc-100 stroke-zinc-300 dark:fill-zinc-800 dark:stroke-zinc-700" strokeWidth="1" />
        <rect x="272" y="52" width="35" height="4" rx="2" className="fill-zinc-400 dark:fill-zinc-500" />
        <rect x="272" y="62" width="50" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <text x="300" y="36" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#e07040" opacity="0.7">Agents</text>

        {/* Bottom-left: Git */}
        <line x1="175" y1="162" x2="100" y2="220" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <rect x="60" y="200" width="80" height="40" rx="8" className="fill-zinc-100 stroke-zinc-300 dark:fill-zinc-800 dark:stroke-zinc-700" strokeWidth="1" />
        <rect x="72" y="212" width="30" height="4" rx="2" className="fill-zinc-400 dark:fill-zinc-500" />
        <rect x="72" y="222" width="50" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <text x="100" y="196" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#e07040" opacity="0.7">Git</text>

        {/* Bottom-right: gRPC */}
        <line x1="225" y1="162" x2="300" y2="220" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <rect x="260" y="200" width="80" height="40" rx="8" className="fill-zinc-100 stroke-zinc-300 dark:fill-zinc-800 dark:stroke-zinc-700" strokeWidth="1" />
        <rect x="272" y="212" width="35" height="4" rx="2" className="fill-zinc-400 dark:fill-zinc-500" />
        <rect x="272" y="222" width="55" height="3" rx="1.5" className="fill-zinc-300 dark:fill-zinc-600" />
        <text x="300" y="196" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#e07040" opacity="0.7">gRPC</text>

        {/* Pulse animation on hub */}
        <circle cx="200" cy="140" r="36" fill="none" stroke="#e07040" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="36;44;36" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
];

export default function ComponentsOverview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Three components,{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              one system
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A daemon orchestrates while CLI and GUI give you full control.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {components.map((comp) => (
            <div
              key={comp.title}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-fire-500/50 hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-500/40"
            >
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
                {comp.illustration}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {comp.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
