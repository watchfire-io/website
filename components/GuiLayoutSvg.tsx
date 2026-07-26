interface GuiLayoutSvgProps {
  className?: string;
  preserveAspectRatio?: string;
  titleId?: string;
  descId?: string;
}

export default function GuiLayoutSvg({
  className,
  preserveAspectRatio = "xMidYMid meet",
  titleId = "gui-layout-title",
  descId = "gui-layout-desc",
}: GuiLayoutSvgProps) {
  return (
    <svg
      viewBox="0 0 800 460"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
    >
      <title id={titleId}>Watchfire.app project window layout</title>
      <desc id={descId}>
        A schematic of a Watchfire project window showing the agent chat
        terminal as the wide left pane, the tabbed reference region for tasks,
        definition, and insights on the right, and the integrated terminal
        footer at the bottom.
      </desc>
      <defs>
        <linearGradient id={`${titleId}-window`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22262f" />
          <stop offset="100%" stopColor="#16181d" />
        </linearGradient>
        <linearGradient id={`${titleId}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e07040" />
          <stop offset="100%" stopColor="#e29020" />
        </linearGradient>
        <linearGradient id={`${titleId}-highlight`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* App window (one project = one window) */}
      <rect x="20" y="20" width="760" height="420" rx="14" fill={`url(#${titleId}-window)`} stroke="#2d3140" strokeWidth="1" />
      <rect x="20" y="20" width="760" height="420" rx="14" fill={`url(#${titleId}-highlight)`} />

      {/* Title bar — window titled with the project name */}
      <rect x="20" y="20" width="760" height="32" rx="14" fill="#1c1f26" />
      <rect x="20" y="40" width="760" height="12" fill="#1c1f26" />
      <line x1="20" y1="52" x2="780" y2="52" stroke="#2d3140" strokeWidth="0.5" />
      <circle cx="42" cy="36" r="5" fill="#ff5f57" opacity="0.85" />
      <circle cx="58" cy="36" r="5" fill="#ffbd2e" opacity="0.85" />
      <circle cx="74" cy="36" r="5" fill="#28c940" opacity="0.85" />
      <text x="400" y="40" fontSize="11" fontFamily="Outfit, system-ui, sans-serif" fill="#a1a1aa" textAnchor="middle">watchfire</text>

      {/* Chat pane (left, primary) */}
      <g fontFamily="Outfit, system-ui, sans-serif">
        <text x="38" y="74" fontSize="10" fill="#71717a" letterSpacing="1.4">CHAT · PRIMARY</text>

        <rect x="38" y="88" width="50" height="22" rx="5" fill="#22262f" stroke="#2d3140" strokeWidth="1" />
        <text x="63" y="103" fontSize="10" fill="#fafafa" textAnchor="middle">Chat</text>
        <text x="102" y="103" fontSize="10" fill="#71717a">Branches</text>
        <text x="170" y="103" fontSize="10" fill="#71717a">Logs</text>

        <rect x="358" y="88" width="112" height="22" rx="11" fill="#e07040" fillOpacity="0.14" stroke="#e07040" strokeOpacity="0.5" strokeWidth="1" />
        <text x="414" y="103" fontSize="9" fill="#f0a070" textAnchor="middle">Wildfire · Execute</text>

        <rect x="38" y="124" width="32" height="32" rx="6" fill="#e07040" fillOpacity="0.16" stroke="#e07040" strokeOpacity="0.4" strokeWidth="1" />
        <path d="M 50 132 C 50 132 45 137 45 144 C 45 148 47.5 150 50 150 C 52.5 150 55 148 55 144 C 55 140 52 138 50 134 Z" fill={`url(#${titleId}-accent)`} />
        <text x="80" y="138" fontSize="11" fill="#fafafa" fontWeight="600">Claude Code</text>
        <text x="80" y="152" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#71717a">Opus 4.7 · 1M context</text>

        <rect x="38" y="180" width="380" height="3" rx="1.5" fill="#71717a" />
        <rect x="38" y="192" width="300" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="38" y="204" width="344" height="3" rx="1.5" fill="#71717a" />

        <rect x="38" y="224" width="120" height="3" rx="1.5" fill="#22c55e" />
        <rect x="164" y="224" width="180" height="3" rx="1.5" fill="#71717a" />

        <rect x="38" y="244" width="260" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="38" y="256" width="330" height="3" rx="1.5" fill="#71717a" />
        <rect x="38" y="268" width="140" height="3" rx="1.5" fill="#f0a070" />

        <rect x="38" y="296" width="6" height="3" rx="1.5" fill="#e07040" />
        <rect x="50" y="293" width="8" height="9" rx="1" fill="#e07040" className="gui-caret" />
      </g>

      {/* Chat callout */}
      <g fontFamily="Outfit, system-ui, sans-serif" fontWeight="500">
        <rect x="38" y="332" width="180" height="50" rx="6" fill="#0f1115" stroke="#2d3140" strokeWidth="1" />
        <text x="128" y="350" fontSize="10" fill="#f0a070" textAnchor="middle" letterSpacing="0.5">AGENT TERMINAL</text>
        <text x="128" y="366" fontSize="9" fill="#a1a1aa" textAnchor="middle">Chat · Branches · Logs</text>
        <text x="128" y="377" fontSize="9" fill="#a1a1aa" textAnchor="middle">Focus toggle → full width</text>
      </g>

      {/* Reference region (right, resizable divider) */}
      <line x1="500" y1="52" x2="500" y2="404" stroke="#2d3140" strokeWidth="1" />
      <g fontFamily="Outfit, system-ui, sans-serif">
        <text x="518" y="74" fontSize="10" fill="#71717a" letterSpacing="1.4">REFERENCE</text>

        <rect x="518" y="88" width="50" height="22" rx="5" fill="#22262f" stroke="#2d3140" strokeWidth="1" />
        <text x="543" y="103" fontSize="10" fill="#fafafa" textAnchor="middle">Tasks</text>
        <text x="578" y="103" fontSize="10" fill="#71717a">Definition</text>
        <text x="640" y="103" fontSize="10" fill="#71717a">Insights</text>
        <text x="690" y="103" fontSize="10" fill="#71717a">···</text>

        <g>
          <rect x="518" y="124" width="244" height="32" rx="6" fill="#22262f" stroke="#2d3140" strokeWidth="1" />
          <rect x="518" y="124" width="3" height="32" rx="1.5" fill="#e07040" />
          <circle cx="534" cy="140" r="4" fill="#22c55e" />
          <rect x="546" y="136" width="120" height="3" rx="1.5" fill="#e4e4e7" opacity="0.85" />
          <rect x="546" y="144" width="84" height="2.5" rx="1.25" fill="#71717a" />
          <rect x="716" y="132" width="32" height="14" rx="3" fill="#22c55e" fillOpacity="0.18" />
          <text x="732" y="142" fontSize="8" fill="#22c55e" textAnchor="middle">done</text>

          <rect x="518" y="164" width="244" height="32" rx="6" fill="transparent" stroke="#2d3140" strokeWidth="1" />
          <circle cx="534" cy="180" r="4" fill="none" stroke="#e07040" strokeWidth="1.2" strokeDasharray="6 3" />
          <rect x="546" y="176" width="110" height="3" rx="1.5" fill="#a1a1aa" />
          <rect x="546" y="184" width="70" height="2.5" rx="1.25" fill="#52525b" />
          <rect x="706" y="172" width="42" height="14" rx="3" fill="#e07040" fillOpacity="0.18" />
          <text x="727" y="182" fontSize="8" fill="#f0a070" textAnchor="middle">in dev</text>

          <rect x="518" y="204" width="244" height="32" rx="6" fill="transparent" stroke="#2d3140" strokeWidth="1" />
          <circle cx="534" cy="220" r="4" fill="none" stroke="#52525b" strokeWidth="1" />
          <rect x="546" y="216" width="100" height="3" rx="1.5" fill="#a1a1aa" />
          <rect x="546" y="224" width="60" height="2.5" rx="1.25" fill="#52525b" />
          <rect x="716" y="212" width="32" height="14" rx="3" fill="#52525b" fillOpacity="0.25" />
          <text x="732" y="222" fontSize="8" fill="#a1a1aa" textAnchor="middle">todo</text>

          <rect x="518" y="244" width="244" height="32" rx="6" fill="transparent" stroke="#2d3140" strokeWidth="1" />
          <circle cx="534" cy="260" r="4" fill="none" stroke="#52525b" strokeWidth="1" />
          <rect x="546" y="256" width="90" height="3" rx="1.5" fill="#a1a1aa" />
          <rect x="546" y="264" width="72" height="2.5" rx="1.25" fill="#52525b" />
        </g>
      </g>

      {/* Reference callout */}
      <g fontFamily="Outfit, system-ui, sans-serif" fontWeight="500">
        <rect x="542" y="332" width="196" height="50" rx="6" fill="#0f1115" stroke="#2d3140" strokeWidth="1" />
        <text x="640" y="350" fontSize="10" fill="#f0a070" textAnchor="middle" letterSpacing="0.5">REFERENCE TABS</text>
        <text x="640" y="366" fontSize="9" fill="#a1a1aa" textAnchor="middle">Tasks · Definition · Insights</text>
        <text x="640" y="377" fontSize="9" fill="#a1a1aa" textAnchor="middle">Secrets · Trash · Settings</text>
      </g>

      {/* Integrated terminal footer */}
      <line x1="20" y1="404" x2="780" y2="404" stroke="#2d3140" strokeWidth="0.5" />
      <rect x="24" y="404" width="752" height="34" fill="#0f1115" />
      <g fontFamily="JetBrains Mono, monospace">
        <text x="38" y="426" fontSize="11" fill="#71717a">⌃</text>
        <text x="52" y="426" fontSize="11" fill="#a1a1aa">Terminal</text>
        <text x="762" y="426" fontSize="10" fill="#52525b" textAnchor="end">⌘`</text>
      </g>
      <style>{`
        .gui-caret { animation: gui-caret-blink 1.1s steps(2) infinite; }
        @keyframes gui-caret-blink { 50% { opacity: 0.25; } }
        @media (prefers-reduced-motion: reduce) {
          .gui-caret { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
