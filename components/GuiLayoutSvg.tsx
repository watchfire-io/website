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
      <title id={titleId}>Watchfire.app window layout</title>
      <desc id={descId}>
        A schematic of the Watchfire app showing the sidebar on the left, the
        main content area in the centre with a terminal footer, and the
        collapsible right panel for chat, branches, and logs.
      </desc>
      <defs>
        <linearGradient id={`${titleId}-window`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22262f" />
          <stop offset="100%" stopColor="#16181d" />
        </linearGradient>
        <linearGradient id={`${titleId}-sidebar`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c1f26" />
          <stop offset="100%" stopColor="#191c22" />
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

      {/* App window */}
      <rect x="20" y="20" width="760" height="420" rx="14" fill={`url(#${titleId}-window)`} stroke="#2d3140" strokeWidth="1" />
      <rect x="20" y="20" width="760" height="420" rx="14" fill={`url(#${titleId}-highlight)`} />

      {/* Title bar */}
      <rect x="20" y="20" width="760" height="32" rx="14" fill="#1c1f26" />
      <rect x="20" y="40" width="760" height="12" fill="#1c1f26" />
      <line x1="20" y1="52" x2="780" y2="52" stroke="#2d3140" strokeWidth="0.5" />
      <circle cx="42" cy="36" r="5" fill="#ff5f57" opacity="0.85" />
      <circle cx="58" cy="36" r="5" fill="#ffbd2e" opacity="0.85" />
      <circle cx="74" cy="36" r="5" fill="#28c940" opacity="0.85" />

      {/* Sidebar region */}
      <rect x="20" y="52" width="170" height="388" fill={`url(#${titleId}-sidebar)`} />
      <line x1="190" y1="52" x2="190" y2="440" stroke="#2d3140" strokeWidth="1" />

      {/* Sidebar contents */}
      <g fontFamily="Outfit, system-ui, sans-serif">
        <g transform="translate(40 78)">
          <path d="M8 22 C 8 22 0 14 0 6 C 0 0 4 -4 8 -4 C 12 -4 16 0 16 6 C 16 14 8 22 8 22 Z" fill={`url(#${titleId}-accent)`} />
          <circle cx="8" cy="10" r="3" fill="#fff5e6" opacity="0.9" />
        </g>
        <text x="64" y="84" fontSize="13" fill="#fafafa" fontWeight="600">watchfire</text>

        <rect x="32" y="108" width="146" height="30" rx="6" fill="#e07040" fillOpacity="0.14" stroke="#e07040" strokeOpacity="0.5" strokeWidth="1" />
        <rect x="32" y="108" width="3" height="30" rx="1.5" fill="#e07040" />
        <text x="48" y="127" fontSize="12" fill="#fafafa" fontWeight="500">Dashboard</text>

        <text x="32" y="166" fontSize="9" fill="#71717a" letterSpacing="1.4">PROJECTS</text>

        <circle cx="40" cy="186" r="4" fill="#e07040" />
        <text x="52" y="190" fontSize="12" fill="#a1a1aa">watchfire</text>

        <circle cx="40" cy="208" r="4" fill="#22c55e" />
        <text x="52" y="212" fontSize="12" fill="#a1a1aa">website</text>

        <circle cx="40" cy="230" r="4" fill="#e29020" />
        <text x="52" y="234" fontSize="12" fill="#a1a1aa">afterlight</text>

        <circle cx="40" cy="252" r="4" fill="#3b82f6" />
        <text x="52" y="256" fontSize="12" fill="#a1a1aa">anima</text>

        <text x="32" y="282" fontSize="12" fill="#71717a">+ Add Project</text>

        <rect x="32" y="396" width="146" height="28" rx="6" fill="transparent" stroke="#2d3140" strokeWidth="1" />
        <text x="48" y="414" fontSize="12" fill="#a1a1aa">⚙ Settings</text>
      </g>

      {/* Main content region */}
      <g fontFamily="Outfit, system-ui, sans-serif">
        <text x="208" y="74" fontSize="10" fill="#71717a" letterSpacing="1.4">MAIN</text>

        <text x="208" y="100" fontSize="14" fill="#fafafa" fontWeight="600">watchfire</text>
        <rect x="285" y="88" width="44" height="16" rx="8" fill="#e07040" fillOpacity="0.18" stroke="#e07040" strokeOpacity="0.4" strokeWidth="1" />
        <text x="307" y="100" fontSize="9" fill="#f0a070" textAnchor="middle">Chat</text>
        <text x="208" y="118" fontSize="11" fill="#71717a">main · github.com/watchfire-io/watchfire</text>

        <rect x="208" y="132" width="58" height="22" rx="5" fill="#22262f" stroke="#2d3140" strokeWidth="1" />
        <text x="237" y="147" fontSize="10" fill="#fafafa" textAnchor="middle">Tasks</text>
        <text x="282" y="147" fontSize="10" fill="#71717a">Definition</text>
        <text x="343" y="147" fontSize="10" fill="#71717a">Secrets</text>
        <text x="395" y="147" fontSize="10" fill="#71717a">Trash</text>
        <text x="442" y="147" fontSize="10" fill="#71717a">Settings</text>

        <g>
          <rect x="208" y="172" width="332" height="32" rx="6" fill="#22262f" stroke="#2d3140" strokeWidth="1" />
          <rect x="208" y="172" width="3" height="32" rx="1.5" fill="#e07040" />
          <circle cx="226" cy="188" r="4" fill="#22c55e" />
          <rect x="240" y="184" width="180" height="3" rx="1.5" fill="#e4e4e7" opacity="0.85" />
          <rect x="240" y="192" width="120" height="2.5" rx="1.25" fill="#71717a" />
          <rect x="500" y="180" width="32" height="14" rx="3" fill="#22c55e" fillOpacity="0.18" />
          <text x="516" y="190" fontSize="8" fill="#22c55e" textAnchor="middle">done</text>

          <rect x="208" y="212" width="332" height="32" rx="6" fill="transparent" stroke="#2d3140" strokeWidth="1" />
          <circle cx="226" cy="228" r="4" fill="none" stroke="#e07040" strokeWidth="1.2" strokeDasharray="6 3" />
          <rect x="240" y="224" width="160" height="3" rx="1.5" fill="#a1a1aa" />
          <rect x="240" y="232" width="100" height="2.5" rx="1.25" fill="#52525b" />
          <rect x="494" y="220" width="42" height="14" rx="3" fill="#e07040" fillOpacity="0.18" />
          <text x="515" y="230" fontSize="8" fill="#f0a070" textAnchor="middle">in dev</text>

          <rect x="208" y="252" width="332" height="32" rx="6" fill="transparent" stroke="#2d3140" strokeWidth="1" />
          <circle cx="226" cy="268" r="4" fill="none" stroke="#52525b" strokeWidth="1" />
          <rect x="240" y="264" width="140" height="3" rx="1.5" fill="#a1a1aa" />
          <rect x="240" y="272" width="80" height="2.5" rx="1.25" fill="#52525b" />
          <rect x="500" y="260" width="32" height="14" rx="3" fill="#52525b" fillOpacity="0.25" />
          <text x="516" y="270" fontSize="8" fill="#a1a1aa" textAnchor="middle">todo</text>

          <rect x="208" y="292" width="332" height="32" rx="6" fill="transparent" stroke="#2d3140" strokeWidth="1" />
          <circle cx="226" cy="308" r="4" fill="none" stroke="#52525b" strokeWidth="1" />
          <rect x="240" y="304" width="120" height="3" rx="1.5" fill="#a1a1aa" />
          <rect x="240" y="312" width="92" height="2.5" rx="1.25" fill="#52525b" />
        </g>

        <line x1="190" y1="404" x2="558" y2="404" stroke="#2d3140" strokeWidth="0.5" />
        <rect x="190" y="404" width="368" height="36" fill="#0f1115" />
        <text x="208" y="426" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#71717a">⌃</text>
        <text x="222" y="426" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#a1a1aa">Terminal</text>
        <text x="540" y="426" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#52525b" textAnchor="end">⌘`</text>
      </g>

      {/* Right panel region */}
      <line x1="558" y1="52" x2="558" y2="440" stroke="#2d3140" strokeWidth="1" />
      <g fontFamily="Outfit, system-ui, sans-serif">
        <text x="576" y="74" fontSize="10" fill="#71717a" letterSpacing="1.4">RIGHT PANEL</text>

        <rect x="576" y="88" width="50" height="22" rx="5" fill="#22262f" stroke="#2d3140" strokeWidth="1" />
        <text x="601" y="103" fontSize="10" fill="#fafafa" textAnchor="middle">Chat</text>
        <text x="640" y="103" fontSize="10" fill="#71717a">Branches</text>
        <text x="708" y="103" fontSize="10" fill="#71717a">Logs</text>

        <rect x="576" y="124" width="32" height="32" rx="6" fill="#e07040" fillOpacity="0.16" stroke="#e07040" strokeOpacity="0.4" strokeWidth="1" />
        <path d="M 588 132 C 588 132 583 137 583 144 C 583 148 585.5 150 588 150 C 590.5 150 593 148 593 144 C 593 140 590 138 588 134 Z" fill={`url(#${titleId}-accent)`} />
        <text x="618" y="138" fontSize="11" fill="#fafafa" fontWeight="600">Claude Code</text>
        <text x="618" y="152" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#71717a">Opus 4.7 · 1M context</text>

        <rect x="576" y="180" width="170" height="3" rx="1.5" fill="#71717a" />
        <rect x="576" y="192" width="120" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="576" y="204" width="150" height="3" rx="1.5" fill="#71717a" />

        <rect x="576" y="224" width="64" height="3" rx="1.5" fill="#22c55e" />
        <rect x="646" y="224" width="80" height="3" rx="1.5" fill="#71717a" />

        <rect x="576" y="244" width="100" height="3" rx="1.5" fill="#a1a1aa" />
        <rect x="576" y="256" width="140" height="3" rx="1.5" fill="#71717a" />
        <rect x="576" y="268" width="60" height="3" rx="1.5" fill="#f0a070" />

        <rect x="576" y="296" width="6" height="3" rx="1.5" fill="#e07040" />
        <rect x="588" y="293" width="8" height="9" rx="1" fill="#e07040">
          <animate attributeName="opacity" values="1;0.25;1" dur="1.1s" repeatCount="indefinite" />
        </rect>
        <line x1="576" y1="316" x2="746" y2="316" stroke="#2d3140" strokeWidth="0.5" />

        <text x="576" y="346" fontSize="10" fill="#71717a" letterSpacing="1.4">BRANCHES</text>
        <rect x="576" y="356" width="170" height="22" rx="5" fill="#22262f" stroke="#2d3140" strokeWidth="1" />
        <circle cx="586" cy="367" r="3" fill="#22c55e" />
        <text x="596" y="370" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#a1a1aa">watchfire/0061</text>
        <rect x="704" y="362" width="38" height="12" rx="3" fill="#22c55e" fillOpacity="0.18" />
        <text x="723" y="370" fontSize="7.5" fill="#22c55e" textAnchor="middle">merged</text>

        <rect x="576" y="384" width="170" height="22" rx="5" fill="transparent" stroke="#2d3140" strokeWidth="1" />
        <circle cx="586" cy="395" r="3" fill="#e07040" />
        <text x="596" y="398" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#a1a1aa">watchfire/0062</text>
        <rect x="704" y="390" width="38" height="12" rx="3" fill="#e07040" fillOpacity="0.18" />
        <text x="723" y="398" fontSize="7.5" fill="#f0a070" textAnchor="middle">in dev</text>
      </g>

      {/* Sidebar callout */}
      <g fontFamily="Outfit, system-ui, sans-serif" fontWeight="500">
        <rect x="40" y="332" width="130" height="50" rx="6" fill="#0f1115" stroke="#2d3140" strokeWidth="1" />
        <text x="105" y="350" fontSize="10" fill="#f0a070" textAnchor="middle" letterSpacing="0.5">SIDEBAR</text>
        <text x="105" y="366" fontSize="9" fill="#a1a1aa" textAnchor="middle">Projects · Settings</text>
        <text x="105" y="377" fontSize="9" fill="#a1a1aa" textAnchor="middle">Always visible</text>
      </g>
    </svg>
  );
}
