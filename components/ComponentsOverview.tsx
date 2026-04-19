const components = [
  {
    title: "CLI / TUI",
    tag: "watchfire",
    description: "Project-scoped commands plus a rich interactive TUI with split-pane task navigation and live output.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="co-cli-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262f" />
            <stop offset="100%" stopColor="#14161b" />
          </linearGradient>
          <linearGradient id="co-cli-chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d3140" />
            <stop offset="100%" stopColor="#22262f" />
          </linearGradient>
          <linearGradient id="co-cli-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <pattern id="co-cli-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#2d3140" strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>

        {/* Window */}
        <rect x="40" y="30" width="320" height="220" rx="12" fill="url(#co-cli-bg)" stroke="#2d3140" strokeWidth="1" />
        <rect x="40" y="30" width="320" height="220" rx="12" fill="url(#co-cli-grid)" opacity="0.5" />
        <rect x="40" y="30" width="320" height="220" rx="12" fill="none" stroke="url(#co-cli-highlight)" strokeWidth="1" />

        {/* Title bar */}
        <rect x="40" y="30" width="320" height="32" rx="12" fill="url(#co-cli-chrome)" />
        <rect x="40" y="50" width="320" height="12" fill="#22262f" />
        <line x1="40" y1="62" x2="360" y2="62" stroke="#2d3140" strokeWidth="0.5" />
        <circle cx="56" cy="46" r="4" fill="#ff5f57" opacity="0.8" />
        <circle cx="70" cy="46" r="4" fill="#ffbd2e" opacity="0.8" />
        <circle cx="84" cy="46" r="4" fill="#28c940" opacity="0.8" />
        <text x="200" y="50" fontSize="10" fontFamily="monospace" fill="#71717a" textAnchor="middle">watchfire — tui</text>

        {/* Split pane divider */}
        <line x1="180" y1="62" x2="180" y2="250" stroke="#2d3140" strokeWidth="1" />

        {/* Left pane — task list */}
        <text x="56" y="82" fontSize="8" fontFamily="monospace" fill="#e07040" letterSpacing="1">TASKS</text>
        {/* Active/highlighted task */}
        <rect x="52" y="92" width="120" height="26" rx="5" fill="url(#co-cli-highlight)" />
        <rect x="52" y="92" width="120" height="26" rx="5" fill="#e07040" opacity="0.12" />
        <rect x="52" y="92" width="3" height="26" rx="1.5" fill="#e07040" />
        <circle cx="66" cy="105" r="4" fill="#22c55e" />
        <polyline points="63.5,105 65.5,107 68.5,103.5" stroke="#14161b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <rect x="76" y="100" width="80" height="4" rx="2" fill="#e4e4e7" opacity="0.9" />
        <rect x="76" y="108" width="56" height="3" rx="1.5" fill="#71717a" />

        <rect x="52" y="124" width="120" height="26" rx="5" fill="transparent" />
        <circle cx="66" cy="137" r="4" fill="none" stroke="#e07040" strokeWidth="1.2" strokeDasharray="6 4" className="co-spin" />
        <rect x="76" y="132" width="66" height="4" rx="2" fill="#a1a1aa" />
        <rect x="76" y="140" width="48" height="3" rx="1.5" fill="#52525b" />

        <rect x="52" y="156" width="120" height="26" rx="5" fill="transparent" />
        <circle cx="66" cy="169" r="4" fill="none" stroke="#52525b" strokeWidth="1" />
        <rect x="76" y="164" width="72" height="4" rx="2" fill="#71717a" />
        <rect x="76" y="172" width="40" height="3" rx="1.5" fill="#3f3f46" />

        <rect x="52" y="188" width="120" height="26" rx="5" fill="transparent" />
        <circle cx="66" cy="201" r="4" fill="none" stroke="#52525b" strokeWidth="1" />
        <rect x="76" y="196" width="58" height="4" rx="2" fill="#71717a" />
        <rect x="76" y="204" width="50" height="3" rx="1.5" fill="#3f3f46" />

        {/* Right pane — output */}
        <text x="196" y="82" fontSize="8" fontFamily="monospace" fill="#e07040" letterSpacing="1">OUTPUT</text>
        <rect x="196" y="94" width="44" height="3" rx="1.5" fill="#52525b" />
        <rect x="196" y="104" width="140" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="196" y="114" width="100" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="196" y="124" width="120" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="196" y="138" width="56" height="3" rx="1.5" fill="#22c55e" />
        <rect x="256" y="138" width="80" height="3" rx="1.5" fill="#71717a" />
        <rect x="196" y="148" width="120" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="196" y="158" width="80" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="196" y="172" width="40" height="3" rx="1.5" fill="#f0a070" />
        <rect x="196" y="182" width="100" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="196" y="200" width="8" height="10" rx="1" fill="#e07040" className="co-caret" />

        {/* Status bar */}
        <line x1="40" y1="232" x2="360" y2="232" stroke="#2d3140" strokeWidth="0.5" />
        <circle cx="56" cy="241" r="3" fill="#22c55e" />
        <text x="64" y="244" fontSize="8" fontFamily="monospace" fill="#a1a1aa">ready</text>
        <text x="340" y="244" fontSize="8" fontFamily="monospace" fill="#52525b" textAnchor="end">? help</text>

        <style>{`
          .co-spin { animation: co-spin 1.4s linear infinite; transform-origin: 66px 137px; }
          .co-caret { animation: co-caret 1s steps(2) infinite; }
          @keyframes co-spin { to { transform: rotate(360deg); } }
          @keyframes co-caret { 50% { opacity: 0.3; } }
          @media (prefers-reduced-motion: reduce) {
            .co-spin, .co-caret { animation: none !important; }
          }
        `}</style>
      </svg>
    ),
  },
  {
    title: "GUI (Watchfire.app)",
    tag: "Watchfire.app",
    description: "Electron multi-project client with a native feel, sidebar navigation, and embedded live terminals.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="co-gui-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262f" />
            <stop offset="100%" stopColor="#16181d" />
          </linearGradient>
          <linearGradient id="co-gui-sidebar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1c1f26" />
            <stop offset="100%" stopColor="#191c22" />
          </linearGradient>
          <linearGradient id="co-gui-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="co-gui-accent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e07040" />
            <stop offset="100%" stopColor="#e29020" />
          </linearGradient>
        </defs>

        {/* App window */}
        <rect x="30" y="20" width="340" height="240" rx="12" fill="url(#co-gui-bg)" stroke="#2d3140" strokeWidth="1" />
        <rect x="30" y="20" width="340" height="240" rx="12" fill="none" stroke="url(#co-gui-highlight)" strokeWidth="1" />

        {/* Title bar */}
        <rect x="30" y="20" width="340" height="28" rx="12" fill="#1c1f26" />
        <rect x="30" y="38" width="340" height="10" fill="#1c1f26" />
        <circle cx="48" cy="34" r="4" fill="#ff5f57" opacity="0.8" />
        <circle cx="62" cy="34" r="4" fill="#ffbd2e" opacity="0.8" />
        <circle cx="76" cy="34" r="4" fill="#28c940" opacity="0.8" />

        {/* Sidebar */}
        <rect x="30" y="48" width="92" height="212" fill="url(#co-gui-sidebar)" />
        <line x1="122" y1="48" x2="122" y2="260" stroke="#2d3140" strokeWidth="1" />

        {/* Sidebar header */}
        <rect x="42" y="60" width="50" height="4" rx="2" fill="#71717a" />

        {/* Project items */}
        <rect x="36" y="76" width="80" height="24" rx="5" fill="#e07040" opacity="0.14" />
        <rect x="36" y="76" width="3" height="24" rx="1.5" fill="#e07040" />
        <circle cx="50" cy="88" r="4" fill="#e07040" />
        <rect x="60" y="83" width="40" height="4" rx="2" fill="#e4e4e7" />
        <rect x="60" y="91" width="30" height="3" rx="1.5" fill="#a1a1aa" />

        <rect x="36" y="106" width="80" height="24" rx="5" fill="transparent" />
        <circle cx="50" cy="118" r="4" fill="#22c55e" />
        <rect x="60" y="113" width="35" height="4" rx="2" fill="#a1a1aa" />
        <rect x="60" y="121" width="42" height="3" rx="1.5" fill="#52525b" />

        <rect x="36" y="136" width="80" height="24" rx="5" fill="transparent" />
        <circle cx="50" cy="148" r="4" fill="#52525b" />
        <rect x="60" y="143" width="48" height="4" rx="2" fill="#a1a1aa" />
        <rect x="60" y="151" width="28" height="3" rx="1.5" fill="#52525b" />

        <rect x="36" y="166" width="80" height="24" rx="5" fill="transparent" />
        <circle cx="50" cy="178" r="4" fill="#52525b" />
        <rect x="60" y="173" width="38" height="4" rx="2" fill="#a1a1aa" />
        <rect x="60" y="181" width="44" height="3" rx="1.5" fill="#52525b" />

        {/* Main area */}
        {/* Breadcrumb */}
        <rect x="136" y="62" width="120" height="3" rx="1.5" fill="#71717a" />
        {/* Heading */}
        <rect x="136" y="74" width="180" height="6" rx="3" fill="#e4e4e7" />
        {/* Subheading */}
        <rect x="136" y="86" width="140" height="4" rx="2" fill="#71717a" />

        {/* Status pill */}
        <rect x="300" y="62" width="56" height="16" rx="8" fill="#22c55e" opacity="0.18" />
        <circle cx="310" cy="70" r="2.5" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="318" y="73" fontSize="8" fontFamily="monospace" fill="#22c55e">running</text>

        {/* Terminal */}
        <rect x="136" y="102" width="220" height="138" rx="8" fill="#0f1115" stroke="#2d3140" strokeWidth="1" />
        {/* Terminal chrome */}
        <rect x="136" y="102" width="220" height="20" rx="8" fill="#16181d" />
        <rect x="136" y="114" width="220" height="8" fill="#16181d" />
        <line x1="136" y1="122" x2="356" y2="122" stroke="#2d3140" strokeWidth="0.5" />
        <circle cx="148" cy="112" r="2.5" fill="#ff5f57" opacity="0.8" />
        <circle cx="158" cy="112" r="2.5" fill="#ffbd2e" opacity="0.8" />
        <circle cx="168" cy="112" r="2.5" fill="#28c940" opacity="0.8" />

        {/* Terminal text */}
        <rect x="146" y="132" width="8" height="3" rx="1.5" fill="#e07040" />
        <rect x="158" y="132" width="70" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="146" y="142" width="120" height="3" rx="1.5" fill="#71717a" />
        <rect x="146" y="152" width="90" height="3" rx="1.5" fill="#71717a" />
        <rect x="146" y="162" width="140" height="3" rx="1.5" fill="#71717a" />
        <rect x="146" y="174" width="40" height="3" rx="1.5" fill="#22c55e" />
        <rect x="190" y="174" width="80" height="3" rx="1.5" fill="#71717a" />
        <rect x="146" y="184" width="100" height="3" rx="1.5" fill="#71717a" />
        <rect x="146" y="194" width="60" height="3" rx="1.5" fill="#f0a070" />
        <rect x="146" y="206" width="8" height="3" rx="1.5" fill="#e07040" />
        <rect x="158" y="206" width="8" height="8" rx="1" fill="#e07040" className="co-caret" />

        <style>{`
          .co-caret { animation: co-caret 1s steps(2) infinite; }
          @keyframes co-caret { 50% { opacity: 0.3; } }
          @media (prefers-reduced-motion: reduce) {
            .co-caret { animation: none !important; }
          }
        `}</style>
      </svg>
    ),
  },
  {
    title: "Daemon (watchfired)",
    tag: "watchfired",
    description: "Background service handling orchestration, PTY management, git workflows, and the gRPC API.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        <defs>
          <radialGradient id="co-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb347" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#e07040" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="co-hub-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e88050" />
            <stop offset="100%" stopColor="#e29020" />
          </linearGradient>
          <linearGradient id="co-chip-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262f" />
            <stop offset="100%" stopColor="#16181d" />
          </linearGradient>
        </defs>

        {/* Ambient background glow */}
        <circle cx="200" cy="140" r="100" fill="url(#co-hub-glow)" />

        {/* Concentric pulse rings */}
        <circle cx="200" cy="140" r="44" fill="none" stroke="#e07040" strokeWidth="1" opacity="0.3" className="co-pulse-1" />
        <circle cx="200" cy="140" r="60" fill="none" stroke="#e07040" strokeWidth="0.75" opacity="0.2" className="co-pulse-2" />
        <circle cx="200" cy="140" r="78" fill="none" stroke="#e07040" strokeWidth="0.5" opacity="0.12" className="co-pulse-3" />

        {/* Central flame hub */}
        <g>
          <circle cx="200" cy="140" r="32" fill="#16181d" stroke="#e07040" strokeWidth="1.5" />
          <circle cx="200" cy="140" r="28" fill="url(#co-hub-core)" opacity="0.25" />
          {/* Stylized flame */}
          <path d="M 200 124 C 200 124 191 132 191 144 C 191 152 195 156 200 156 C 205 156 209 152 209 144 C 209 138 204 134 200 128 C 198 132 195 134 195 140 C 195 145 197 148 200 148" fill="url(#co-hub-core)" />
          <circle cx="200" cy="146" r="3" fill="#fff5e6" opacity="0.9" />
        </g>

        {/* Connection lines with animated dash */}
        <line x1="176" y1="122" x2="110" y2="72" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="co-line-1" />
        <line x1="224" y1="122" x2="290" y2="72" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="co-line-2" />
        <line x1="176" y1="158" x2="110" y2="208" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="co-line-3" />
        <line x1="224" y1="158" x2="290" y2="208" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="co-line-4" />

        {/* Node: Projects (top-left) */}
        <g>
          <rect x="56" y="46" width="92" height="46" rx="10" fill="url(#co-chip-bg)" stroke="#2d3140" strokeWidth="1" />
          <rect x="56" y="46" width="92" height="2" rx="1" fill="#e07040" opacity="0.5" />
          <rect x="68" y="62" width="30" height="4" rx="2" fill="#e4e4e7" />
          <rect x="68" y="72" width="50" height="3" rx="1.5" fill="#71717a" />
          <rect x="68" y="80" width="40" height="3" rx="1.5" fill="#52525b" />
        </g>
        <text x="102" y="40" fontSize="9" fontFamily="monospace" fill="#f0a070" textAnchor="middle" letterSpacing="0.5">Projects</text>

        {/* Node: Agents (top-right) */}
        <g>
          <rect x="252" y="46" width="92" height="46" rx="10" fill="url(#co-chip-bg)" stroke="#2d3140" strokeWidth="1" />
          <rect x="252" y="46" width="92" height="2" rx="1" fill="#e07040" opacity="0.5" />
          <rect x="264" y="62" width="36" height="4" rx="2" fill="#e4e4e7" />
          <rect x="264" y="72" width="50" height="3" rx="1.5" fill="#71717a" />
          <circle cx="268" cy="84" r="2.5" fill="#22c55e" />
          <circle cx="276" cy="84" r="2.5" fill="#e07040" />
          <circle cx="284" cy="84" r="2.5" fill="#52525b" />
          <circle cx="292" cy="84" r="2.5" fill="#52525b" />
        </g>
        <text x="298" y="40" fontSize="9" fontFamily="monospace" fill="#f0a070" textAnchor="middle" letterSpacing="0.5">Agents</text>

        {/* Node: Git (bottom-left) */}
        <g>
          <rect x="56" y="188" width="92" height="46" rx="10" fill="url(#co-chip-bg)" stroke="#2d3140" strokeWidth="1" />
          <rect x="56" y="232" width="92" height="2" rx="1" fill="#e07040" opacity="0.5" />
          <circle cx="72" cy="210" r="3" fill="#e07040" />
          <line x1="72" y1="210" x2="132" y2="210" stroke="#52525b" strokeWidth="1.5" />
          <circle cx="92" cy="210" r="2.5" fill="#22c55e" />
          <circle cx="112" cy="210" r="2.5" fill="#22c55e" />
          <circle cx="132" cy="210" r="3" fill="#e07040" />
          <path d="M 92 210 C 102 210 102 220 112 220" stroke="#22c55e" strokeWidth="1" fill="none" />
        </g>
        <text x="102" y="250" fontSize="9" fontFamily="monospace" fill="#f0a070" textAnchor="middle" letterSpacing="0.5">Git</text>

        {/* Node: gRPC (bottom-right) */}
        <g>
          <rect x="252" y="188" width="92" height="46" rx="10" fill="url(#co-chip-bg)" stroke="#2d3140" strokeWidth="1" />
          <rect x="252" y="232" width="92" height="2" rx="1" fill="#e07040" opacity="0.5" />
          <rect x="264" y="202" width="36" height="4" rx="2" fill="#e4e4e7" />
          <rect x="264" y="212" width="60" height="3" rx="1.5" fill="#71717a" />
          <rect x="264" y="220" width="40" height="3" rx="1.5" fill="#52525b" />
          <circle cx="330" cy="204" r="3" fill="#22c55e">
            <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>
        <text x="298" y="250" fontSize="9" fontFamily="monospace" fill="#f0a070" textAnchor="middle" letterSpacing="0.5">gRPC</text>

        <style>{`
          .co-pulse-1 { animation: co-pulse 3s ease-out infinite; transform-origin: 200px 140px; }
          .co-pulse-2 { animation: co-pulse 3s ease-out 0.6s infinite; transform-origin: 200px 140px; }
          .co-pulse-3 { animation: co-pulse 3s ease-out 1.2s infinite; transform-origin: 200px 140px; }
          .co-line-1, .co-line-2, .co-line-3, .co-line-4 {
            stroke-dashoffset: 0;
            animation: co-dash 2s linear infinite;
          }
          .co-line-2 { animation-delay: 0.3s; }
          .co-line-3 { animation-delay: 0.6s; }
          .co-line-4 { animation-delay: 0.9s; }
          @keyframes co-pulse {
            0% { transform: scale(0.85); opacity: 0.4; }
            100% { transform: scale(1.3); opacity: 0; }
          }
          @keyframes co-dash {
            to { stroke-dashoffset: -14; }
          }
          @media (prefers-reduced-motion: reduce) {
            .co-pulse-1, .co-pulse-2, .co-pulse-3,
            .co-line-1, .co-line-2, .co-line-3, .co-line-4 {
              animation: none !important;
            }
          }
        `}</style>
      </svg>
    ),
  },
];

export default function ComponentsOverview() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            Architecture
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Three components,{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              one system
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A daemon orchestrates in the background while the CLI and GUI give you full control.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {components.map((comp) => (
            <div
              key={comp.title}
              data-stagger
              className="card-hover group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              {/* Subtle corner glow on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fire-500/0 blur-3xl transition-all duration-500 group-hover:bg-fire-500/20"
              />

              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-2 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900">
                {comp.illustration}
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {comp.title}
                </h3>
                <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                  {comp.tag}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
