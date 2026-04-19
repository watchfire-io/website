const features = [
  {
    title: "Task Orchestration",
    tag: "Orchestration",
    description:
      "Ship work without babysitting sessions. Write tasks in YAML and the daemon handles the rest — picking up ready work, stopping sessions on completion, and chaining to the next task. Every run lands in the same clean transcript, no matter which backend produced it.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="kf-task-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262f" />
            <stop offset="100%" stopColor="#16181d" />
          </linearGradient>
          <linearGradient id="kf-task-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Task cards */}
        <g>
          <rect x="30" y="30" width="170" height="44" rx="10" fill="url(#kf-task-bg)" stroke="#2d3140" strokeWidth="1" />
          <rect x="30" y="30" width="170" height="44" rx="10" fill="url(#kf-task-highlight)" />
          <circle cx="48" cy="52" r="9" fill="#22c55e" opacity="0.18" />
          <circle cx="48" cy="52" r="6" fill="#22c55e" opacity="0.4" />
          <polyline points="44.5,52 47,54.5 51.5,49.5" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="64" y="44" width="70" height="4" rx="2" fill="#e4e4e7" opacity="0.9" />
          <rect x="64" y="54" width="100" height="3" rx="1.5" fill="#71717a" />
          <rect x="170" y="46" width="22" height="12" rx="3" fill="#22c55e" opacity="0.2" />
          <text x="181" y="55" fontSize="7" fontFamily="monospace" fill="#22c55e" textAnchor="middle">done</text>
        </g>

        <g>
          <rect x="30" y="88" width="170" height="44" rx="10" fill="url(#kf-task-bg)" stroke="#e07040" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="30" y="88" width="170" height="44" rx="10" fill="#e07040" opacity="0.06" />
          <circle cx="48" cy="110" r="9" fill="#e07040" opacity="0.15" />
          <circle cx="48" cy="110" r="7" fill="none" stroke="#e07040" strokeWidth="1.5" strokeDasharray="10 22" className="kf-spin" />
          <rect x="64" y="102" width="60" height="4" rx="2" fill="#e4e4e7" />
          <rect x="64" y="112" width="92" height="3" rx="1.5" fill="#a1a1aa" />
          <rect x="164" y="104" width="28" height="12" rx="3" fill="#e07040" opacity="0.2" />
          <text x="178" y="113" fontSize="7" fontFamily="monospace" fill="#f0a070" textAnchor="middle">running</text>
        </g>

        <g opacity="0.7">
          <rect x="30" y="146" width="170" height="44" rx="10" fill="url(#kf-task-bg)" stroke="#2d3140" strokeWidth="1" />
          <circle cx="48" cy="168" r="6" fill="none" stroke="#52525b" strokeWidth="1.2" strokeDasharray="3 3" />
          <rect x="64" y="160" width="80" height="4" rx="2" fill="#71717a" />
          <rect x="64" y="170" width="70" height="3" rx="1.5" fill="#52525b" />
          <rect x="170" y="162" width="22" height="12" rx="3" fill="#52525b" opacity="0.2" />
          <text x="181" y="171" fontSize="7" fontFamily="monospace" fill="#71717a" textAnchor="middle">ready</text>
        </g>

        <g opacity="0.4">
          <rect x="30" y="204" width="170" height="44" rx="10" fill="url(#kf-task-bg)" stroke="#2d3140" strokeWidth="1" />
          <circle cx="48" cy="226" r="6" fill="none" stroke="#52525b" strokeWidth="1.2" strokeDasharray="3 3" />
          <rect x="64" y="218" width="90" height="4" rx="2" fill="#71717a" />
          <rect x="64" y="228" width="60" height="3" rx="1.5" fill="#52525b" />
        </g>

        {/* Animated flow arrow */}
        <g>
          <line x1="210" y1="110" x2="250" y2="110" stroke="#e07040" strokeWidth="1.5" strokeDasharray="4 4" className="kf-flow" />
          <polygon points="250,105 258,110 250,115" fill="#e07040" />
        </g>

        {/* Terminal on right */}
        <g>
          <rect x="268" y="64" width="120" height="132" rx="10" fill="url(#kf-task-bg)" stroke="#2d3140" strokeWidth="1" />
          <rect x="268" y="64" width="120" height="132" rx="10" fill="url(#kf-task-highlight)" />
          <rect x="268" y="64" width="120" height="20" rx="10" fill="#1c1f26" />
          <rect x="268" y="76" width="120" height="8" fill="#1c1f26" />
          <line x1="268" y1="84" x2="388" y2="84" stroke="#2d3140" strokeWidth="0.5" />
          <circle cx="280" cy="74" r="2.5" fill="#ff5f57" opacity="0.8" />
          <circle cx="290" cy="74" r="2.5" fill="#ffbd2e" opacity="0.8" />
          <circle cx="300" cy="74" r="2.5" fill="#28c940" opacity="0.8" />

          <rect x="280" y="96" width="44" height="3" rx="1.5" fill="#e07040" opacity="0.7" />
          <rect x="280" y="106" width="90" height="3" rx="1.5" fill="#71717a" />
          <rect x="280" y="116" width="72" height="3" rx="1.5" fill="#71717a" />
          <rect x="280" y="126" width="80" height="3" rx="1.5" fill="#71717a" />
          <rect x="280" y="140" width="50" height="3" rx="1.5" fill="#22c55e" />
          <rect x="280" y="150" width="90" height="3" rx="1.5" fill="#71717a" />
          <rect x="280" y="160" width="64" height="3" rx="1.5" fill="#71717a" />
          <rect x="280" y="174" width="8" height="10" rx="1" fill="#e07040" className="kf-caret" />
        </g>

        <style>{`
          .kf-spin { animation: kf-spin 1.4s linear infinite; transform-origin: 48px 110px; }
          .kf-flow { animation: kf-flow 1.2s linear infinite; }
          .kf-caret { animation: kf-caret 1s steps(2) infinite; }
          @keyframes kf-spin { to { transform: rotate(360deg); } }
          @keyframes kf-flow { to { stroke-dashoffset: -16; } }
          @keyframes kf-caret { 50% { opacity: 0.3; } }
          @media (prefers-reduced-motion: reduce) {
            .kf-spin, .kf-flow, .kf-caret { animation: none !important; }
          }
        `}</style>
      </svg>
    ),
  },
  {
    title: "Git Worktree Isolation",
    tag: "Isolation",
    description:
      "Parallel agents, zero merge conflicts. Every task runs in its own git worktree on a dedicated branch, so agents work side-by-side without touching each other's files. Finished work auto-merges back to your default branch.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        <defs>
          <radialGradient id="kf-wt-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e07040" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <ellipse cx="200" cy="145" rx="180" ry="115" fill="url(#kf-wt-glow)" />

        {/* ——— Main trunk ——— */}
        <line x1="20" y1="145" x2="380" y2="145" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        {/* Main commits */}
        <circle cx="50" cy="145" r="4.5" fill="#16181d" stroke="#71717a" strokeWidth="1.5" />
        <circle cx="100" cy="145" r="4.5" fill="#16181d" stroke="#71717a" strokeWidth="1.5" />
        <circle cx="165" cy="145" r="4.5" fill="#16181d" stroke="#71717a" strokeWidth="1.5" />
        <circle cx="250" cy="145" r="4.5" fill="#16181d" stroke="#71717a" strokeWidth="1.5" />
        <circle cx="335" cy="145" r="4.5" fill="#16181d" stroke="#71717a" strokeWidth="1.5" />
        {/* main label */}
        <text x="24" y="165" fontSize="9" fontFamily="monospace" fill="#71717a" fontWeight="500">main</text>

        {/* ——— Branch 1 — MERGED (green) ——— */}
        {/* Fork up from main */}
        <path d="M 100 145 C 118 145 122 70 140 70" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Branch line */}
        <line x1="140" y1="70" x2="220" y2="70" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        {/* Auto-merge back */}
        <path d="M 220 70 C 238 70 242 145 250 145" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
        {/* Branch commits */}
        <circle cx="145" cy="70" r="4.5" fill="#22c55e" />
        <circle cx="180" cy="70" r="4.5" fill="#22c55e" />
        <circle cx="215" cy="70" r="4.5" fill="#22c55e" />
        {/* Branch label */}
        <text x="180" y="50" fontSize="10" fontFamily="monospace" fill="#22c55e" textAnchor="middle" fontWeight="500">watchfire/001</text>
        {/* Merged badge */}
        <g>
          <rect x="262" y="62" width="54" height="16" rx="4" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeOpacity="0.45" strokeWidth="0.75" />
          <polyline points="270,70 273,73 278,68" stroke="#22c55e" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="298" y="73" fontSize="7.5" fontFamily="monospace" fill="#22c55e" textAnchor="middle" fontWeight="700" letterSpacing="0.5">merged</text>
        </g>

        {/* ——— Branch 2 — RUNNING (orange) ——— */}
        {/* Fork down from main */}
        <path d="M 165 145 C 183 145 187 220 205 220" stroke="#e07040" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Branch line */}
        <line x1="205" y1="220" x2="295" y2="220" stroke="#e07040" strokeWidth="2" strokeLinecap="round" />
        {/* Branch commits */}
        <circle cx="210" cy="220" r="4.5" fill="#e07040" />
        <circle cx="245" cy="220" r="4.5" fill="#e07040" />
        <circle cx="275" cy="220" r="4.5" fill="#e07040" />
        {/* HEAD with pulse */}
        <circle cx="295" cy="220" r="5.5" fill="#e07040" className="kf-node-pulse" />
        <circle cx="295" cy="220" r="12" fill="none" stroke="#e07040" strokeWidth="1" opacity="0.45" className="kf-node-ring" />
        {/* Branch label */}
        <text x="235" y="242" fontSize="10" fontFamily="monospace" fill="#f0a070" textAnchor="middle" fontWeight="500">watchfire/002</text>
        {/* Running badge */}
        <g>
          <rect x="308" y="212" width="56" height="16" rx="4" fill="#e07040" fillOpacity="0.15" stroke="#e07040" strokeOpacity="0.45" strokeWidth="0.75" />
          <circle cx="316" cy="220" r="2.5" fill="#e07040" className="kf-run-dot" />
          <text x="340" y="223" fontSize="7.5" fontFamily="monospace" fill="#f0a070" textAnchor="middle" fontWeight="700" letterSpacing="0.5">running</text>
        </g>
        {/* Animated particle traveling along the active branch */}
        <circle r="3" fill="#ffb347" opacity="0.9">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M 165 145 C 183 145 187 220 205 220 L 295 220" />
        </circle>

        {/* ——— Branch 3 — QUEUED (amber, ghosted) ——— */}
        {/* Dashed fork preview */}
        <path d="M 335 145 C 350 145 352 108 365 108" stroke="#eab308" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeDasharray="4 3" opacity="0.75" />
        {/* Ghost commit */}
        <circle cx="365" cy="108" r="4" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.85" />
        {/* Branch label — hugged to the ghost commit */}
        <text x="360" y="100" fontSize="8.5" fontFamily="monospace" fill="#eab308" textAnchor="end" opacity="0.9" fontWeight="500">watchfire/003</text>
        {/* Queued pill below the ghost */}
        <g opacity="0.9">
          <rect x="338" y="118" width="50" height="14" rx="3" fill="#eab308" fillOpacity="0.12" stroke="#eab308" strokeOpacity="0.4" strokeWidth="0.75" />
          <text x="363" y="128" fontSize="7" fontFamily="monospace" fill="#eab308" textAnchor="middle" fontWeight="700" letterSpacing="0.8">QUEUED</text>
        </g>

        <style>{`
          .kf-node-pulse { animation: kf-node-pulse 2s ease-in-out infinite; transform-origin: 295px 220px; }
          .kf-node-ring { animation: kf-node-ring 2s ease-out infinite; transform-origin: 295px 220px; }
          .kf-run-dot { animation: kf-run-dot 1.2s ease-in-out infinite; }
          @keyframes kf-node-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
          @keyframes kf-node-ring {
            0% { transform: scale(0.6); opacity: 0.6; }
            100% { transform: scale(2); opacity: 0; }
          }
          @keyframes kf-run-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .kf-node-pulse, .kf-node-ring, .kf-run-dot { animation: none !important; }
            circle[r="3"] animateMotion { display: none; }
          }
        `}</style>
      </svg>
    ),
  },
  {
    title: "Sandboxed Execution",
    tag: "Security",
    description:
      "Your credentials and dotfiles stay off-limits, even if an agent goes off-script. Every session runs inside a platform-native sandbox — Seatbelt on macOS, Landlock or Bubblewrap on Linux — blocking ~/.ssh, credential stores, and git hooks by default. Restart protection stops runaway loops before they burn budget.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="kf-sb-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262f" />
            <stop offset="100%" stopColor="#16181d" />
          </linearGradient>
          <linearGradient id="kf-sb-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="kf-sb-term" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14161b" />
            <stop offset="100%" stopColor="#0f1116" />
          </linearGradient>
          <radialGradient id="kf-sb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e07040" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow behind the sandbox */}
        <ellipse cx="104" cy="150" rx="105" ry="115" fill="url(#kf-sb-glow)" />

        {/* Platform labels at top */}
        <text x="200" y="22" fontSize="7.5" fontFamily="monospace" fill="#52525b" textAnchor="middle" letterSpacing="1.2">
          SEATBELT · LANDLOCK · BUBBLEWRAP
        </text>

        {/* SANDBOX label pill floating on the boundary */}
        <rect x="34" y="36" width="82" height="18" rx="5" fill="#e07040" fillOpacity="0.15" stroke="#e07040" strokeWidth="0.75" strokeOpacity="0.5" />
        <polyline points="44,45.5 46.5,48 51,43" stroke="#f0a070" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="83" y="48.5" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#f0a070" textAnchor="middle" letterSpacing="1.2">SANDBOX</text>

        {/* Sandbox boundary — dashed orange container */}
        <rect x="24" y="60" width="160" height="184" rx="14" fill="url(#kf-sb-card)" stroke="#e07040" strokeWidth="1.25" strokeDasharray="5 4" strokeOpacity="0.75" />
        <rect x="24" y="60" width="160" height="184" rx="14" fill="url(#kf-sb-highlight)" />

        {/* Agent terminal inside sandbox */}
        <rect x="40" y="76" width="128" height="152" rx="8" fill="url(#kf-sb-term)" stroke="#2d3140" strokeWidth="1" />
        {/* Title bar */}
        <rect x="40" y="76" width="128" height="18" rx="8" fill="#1c1f26" />
        <rect x="40" y="86" width="128" height="8" fill="#1c1f26" />
        <line x1="40" y1="94" x2="168" y2="94" stroke="#2d3140" strokeWidth="0.5" />
        <circle cx="52" cy="85" r="2.5" fill="#ff5f57" opacity="0.85" />
        <circle cx="62" cy="85" r="2.5" fill="#ffbd2e" opacity="0.85" />
        <circle cx="72" cy="85" r="2.5" fill="#28c940" opacity="0.85" />
        <text x="128" y="88" fontSize="6.5" fontFamily="monospace" fill="#52525b" textAnchor="middle">agent/0042</text>

        {/* Terminal content */}
        <text x="48" y="110" fontSize="7" fontFamily="monospace" fill="#e07040">$ watchfire run</text>
        <text x="48" y="124" fontSize="6.5" fontFamily="monospace" fill="#71717a">→ loading spec</text>
        <text x="48" y="138" fontSize="6.5" fontFamily="monospace" fill="#71717a">→ worktree ready</text>
        <text x="48" y="152" fontSize="6.5" fontFamily="monospace" fill="#22c55e">✓ sandbox active</text>
        <rect x="48" y="162" width="72" height="2.5" rx="1.25" fill="#71717a" opacity="0.55" />
        <rect x="48" y="170" width="90" height="2.5" rx="1.25" fill="#71717a" opacity="0.55" />
        <rect x="48" y="178" width="58" height="2.5" rx="1.25" fill="#71717a" opacity="0.55" />
        <rect x="48" y="186" width="80" height="2.5" rx="1.25" fill="#71717a" opacity="0.55" />
        <text x="48" y="204" fontSize="7" fontFamily="monospace" fill="#e07040">$ <tspan fill="#71717a">building...</tspan></text>
        <rect x="100" y="198" width="5" height="9" fill="#e07040" className="kf-sb-caret" />

        {/* HOST label subtle on right side */}
        <text x="306" y="48.5" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#52525b" textAnchor="middle" letterSpacing="1.2">HOST SYSTEM</text>

        {/* Resource rows — connection through (or blocked at) the sandbox boundary */}
        {/* Row 1: workspace/ - ALLOWED */}
        <g>
          <line x1="184" y1="85" x2="193" y2="85" stroke="#22c55e" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="207" y1="85" x2="228" y2="85" stroke="#22c55e" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="200" cy="85" r="7" fill="#22c55e" fillOpacity="0.18" stroke="#22c55e" strokeWidth="1" />
          <polyline points="196.5,85 199,87.5 203.5,82" stroke="#22c55e" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="228" y="74" width="154" height="22" rx="5" fill="url(#kf-sb-card)" stroke="#22c55e" strokeWidth="0.75" strokeOpacity="0.35" />
          <rect x="228" y="74" width="154" height="22" rx="5" fill="url(#kf-sb-highlight)" />
          <circle cx="240" cy="85" r="4" fill="#22c55e" opacity="0.18" />
          <circle cx="240" cy="85" r="1.8" fill="#22c55e" />
          <text x="250" y="88.5" fontSize="8.5" fontFamily="monospace" fill="#e4e4e7">workspace/</text>
          <text x="374" y="88.5" fontSize="6.5" fontFamily="monospace" fill="#22c55e" textAnchor="end" fontWeight="700" letterSpacing="0.8">READ · WRITE</text>
        </g>

        {/* Row 2: .watchfire/ - ALLOWED */}
        <g>
          <line x1="184" y1="117" x2="193" y2="117" stroke="#22c55e" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="207" y1="117" x2="228" y2="117" stroke="#22c55e" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="200" cy="117" r="7" fill="#22c55e" fillOpacity="0.18" stroke="#22c55e" strokeWidth="1" />
          <polyline points="196.5,117 199,119.5 203.5,114" stroke="#22c55e" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="228" y="106" width="154" height="22" rx="5" fill="url(#kf-sb-card)" stroke="#22c55e" strokeWidth="0.75" strokeOpacity="0.35" />
          <rect x="228" y="106" width="154" height="22" rx="5" fill="url(#kf-sb-highlight)" />
          <circle cx="240" cy="117" r="4" fill="#22c55e" opacity="0.18" />
          <circle cx="240" cy="117" r="1.8" fill="#22c55e" />
          <text x="250" y="120.5" fontSize="8.5" fontFamily="monospace" fill="#e4e4e7">.watchfire/</text>
          <text x="374" y="120.5" fontSize="6.5" fontFamily="monospace" fill="#22c55e" textAnchor="end" fontWeight="700" letterSpacing="0.8">READ · WRITE</text>
        </g>

        {/* Row 3: ~/.ssh/ - BLOCKED */}
        <g>
          <circle cx="200" cy="149" r="7.5" fill="#ef4444" fillOpacity="0.18" stroke="#ef4444" strokeWidth="1" className="kf-sb-block" />
          <line x1="196" y1="145" x2="204" y2="153" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="204" y1="145" x2="196" y2="153" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <rect x="228" y="138" width="154" height="22" rx="5" fill="url(#kf-sb-card)" stroke="#ef4444" strokeWidth="0.75" strokeOpacity="0.3" opacity="0.85" />
          <rect x="228" y="138" width="154" height="22" rx="5" fill="url(#kf-sb-highlight)" />
          <rect x="236" y="146" width="8" height="6" rx="1" fill="none" stroke="#71717a" strokeWidth="0.9" />
          <rect x="238" y="144" width="4" height="3" rx="1" fill="none" stroke="#71717a" strokeWidth="0.9" />
          <text x="250" y="152.5" fontSize="8.5" fontFamily="monospace" fill="#71717a">~/.ssh/</text>
          <text x="374" y="152.5" fontSize="6.5" fontFamily="monospace" fill="#ef4444" textAnchor="end" fontWeight="700" letterSpacing="0.8">BLOCKED</text>
        </g>

        {/* Row 4: ~/.aws/credentials - BLOCKED */}
        <g>
          <circle cx="200" cy="181" r="7.5" fill="#ef4444" fillOpacity="0.18" stroke="#ef4444" strokeWidth="1" className="kf-sb-block" />
          <line x1="196" y1="177" x2="204" y2="185" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="204" y1="177" x2="196" y2="185" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <rect x="228" y="170" width="154" height="22" rx="5" fill="url(#kf-sb-card)" stroke="#ef4444" strokeWidth="0.75" strokeOpacity="0.3" opacity="0.85" />
          <rect x="228" y="170" width="154" height="22" rx="5" fill="url(#kf-sb-highlight)" />
          <circle cx="240" cy="181" r="2.5" fill="none" stroke="#71717a" strokeWidth="0.9" />
          <rect x="237" y="181" width="6" height="4" rx="0.5" fill="none" stroke="#71717a" strokeWidth="0.9" />
          <text x="250" y="184.5" fontSize="8.5" fontFamily="monospace" fill="#71717a">~/.aws/credentials</text>
          <text x="374" y="184.5" fontSize="6.5" fontFamily="monospace" fill="#ef4444" textAnchor="end" fontWeight="700" letterSpacing="0.8">BLOCKED</text>
        </g>

        {/* Row 5: .git/hooks/ - BLOCKED */}
        <g>
          <circle cx="200" cy="213" r="7.5" fill="#ef4444" fillOpacity="0.18" stroke="#ef4444" strokeWidth="1" className="kf-sb-block" />
          <line x1="196" y1="209" x2="204" y2="217" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="204" y1="209" x2="196" y2="217" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <rect x="228" y="202" width="154" height="22" rx="5" fill="url(#kf-sb-card)" stroke="#ef4444" strokeWidth="0.75" strokeOpacity="0.3" opacity="0.85" />
          <rect x="228" y="202" width="154" height="22" rx="5" fill="url(#kf-sb-highlight)" />
          <path d="M 237 214 L 240 211 L 243 214 L 240 217 Z" fill="none" stroke="#71717a" strokeWidth="0.9" />
          <text x="250" y="216.5" fontSize="8.5" fontFamily="monospace" fill="#71717a">.git/hooks/</text>
          <text x="374" y="216.5" fontSize="6.5" fontFamily="monospace" fill="#ef4444" textAnchor="end" fontWeight="700" letterSpacing="0.8">BLOCKED</text>
        </g>

        <style>{`
          .kf-sb-caret { animation: kf-sb-caret 1s steps(2) infinite; }
          .kf-sb-block { animation: kf-sb-block 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @keyframes kf-sb-caret { 50% { opacity: 0.3; } }
          @keyframes kf-sb-block {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.75; }
          }
          @media (prefers-reduced-motion: reduce) {
            .kf-sb-caret, .kf-sb-block { animation: none !important; }
          }
        `}</style>
      </svg>
    ),
  },
  {
    title: "Multi-Project Management",
    tag: "Scale",
    description:
      "Drive every repo on your machine from one place. A single daemon runs multiple projects in parallel — each with its own task queue, worktrees, and agent sessions — and the system tray keeps them all one click away.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        <defs>
          <radialGradient id="kf-mp-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb347" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#e07040" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="kf-mp-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262f" />
            <stop offset="100%" stopColor="#16181d" />
          </linearGradient>
        </defs>

        {/* Ambient hub glow */}
        <circle cx="200" cy="140" r="70" fill="url(#kf-mp-hub)" />

        {/* Central daemon */}
        <g>
          <rect x="160" y="118" width="80" height="44" rx="10" fill="#16181d" stroke="#e07040" strokeWidth="1.5" />
          <rect x="160" y="118" width="80" height="2" rx="1" fill="#e07040" />
          <text x="200" y="138" fontSize="10" fontFamily="monospace" fill="#f0a070" textAnchor="middle">watchfired</text>
          <text x="200" y="152" fontSize="8" fontFamily="monospace" fill="#a1a1aa" textAnchor="middle">daemon</text>
          {/* Pulse rings */}
          <circle cx="200" cy="140" r="44" fill="none" stroke="#e07040" strokeWidth="1" opacity="0.35" className="kf-mp-ring-1" />
          <circle cx="200" cy="140" r="60" fill="none" stroke="#e07040" strokeWidth="0.75" opacity="0.2" className="kf-mp-ring-2" />
        </g>

        {/* Connections (with data flow) */}
        <line x1="160" y1="130" x2="100" y2="70" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="kf-mp-line" />
        <line x1="240" y1="130" x2="300" y2="70" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="kf-mp-line" />
        <line x1="160" y1="150" x2="100" y2="210" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="kf-mp-line" />
        <line x1="240" y1="150" x2="300" y2="210" stroke="#e07040" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" className="kf-mp-line" />

        {/* Project cards — each with a distinct accent */}
        {[
          { x: 34, y: 40, color: "#22c55e", tasks: 3 },
          { x: 268, y: 40, color: "#eab308", tasks: 2 },
          { x: 34, y: 190, color: "#3b82f6", tasks: 4 },
          { x: 268, y: 190, color: "#a855f7", tasks: 1 },
        ].map((p, i) => (
          <g key={i}>
            <rect x={p.x} y={p.y} width="98" height="50" rx="10" fill="url(#kf-mp-card)" stroke="#2d3140" strokeWidth="1" />
            <rect x={p.x} y={p.y} width="98" height="2" rx="1" fill={p.color} opacity="0.7" />
            <rect x={p.x + 10} y={p.y + 12} width="40" height="4" rx="2" fill="#e4e4e7" />
            <rect x={p.x + 10} y={p.y + 22} width="60" height="3" rx="1.5" fill="#71717a" />
            {/* Task dots */}
            {Array.from({ length: 4 }).map((_, j) => (
              <rect
                key={j}
                x={p.x + 10 + j * 8}
                y={p.y + 34}
                width="5"
                height="8"
                rx="1"
                fill={j < p.tasks ? p.color : "#2d3140"}
                opacity={j < p.tasks ? 0.8 : 0.5}
              />
            ))}
          </g>
        ))}

        <style>{`
          .kf-mp-ring-1 { animation: kf-mp-ring 3s ease-out infinite; transform-origin: 200px 140px; }
          .kf-mp-ring-2 { animation: kf-mp-ring 3s ease-out 0.6s infinite; transform-origin: 200px 140px; }
          .kf-mp-line { animation: kf-mp-dash 1.6s linear infinite; }
          @keyframes kf-mp-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.3); opacity: 0; }
          }
          @keyframes kf-mp-dash {
            to { stroke-dashoffset: -14; }
          }
          @media (prefers-reduced-motion: reduce) {
            .kf-mp-ring-1, .kf-mp-ring-2, .kf-mp-line { animation: none !important; }
          }
        `}</style>
      </svg>
    ),
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            Key features
          </span>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Built for real{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              agent workflows
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Isolation, sandboxing, and orchestration — the plumbing that makes multi-agent safe.
          </p>
        </div>

        <div className="mt-16 space-y-24">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-fire-500 dark:text-fire-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-fire-500/40 to-transparent" />
                  <span className="rounded-full border border-zinc-200 bg-white/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  {feature.description}
                </p>
              </div>
              <div className="group relative w-full max-w-lg flex-1">
                {/* Subtle accent glow behind illustration */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-fire-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50/80 to-zinc-100/50 p-5 transition-all group-hover:border-fire-500/40 dark:border-zinc-800 dark:from-zinc-900/70 dark:to-zinc-950/50 dark:group-hover:border-fire-400/40">
                  {feature.illustration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
