export default function TuiPreviewSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden="true">
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
      <text x="200" y="50" fontSize="10" fontFamily="monospace" fill="#71717a" textAnchor="middle">watchfire - tui</text>

      {/* Split pane divider */}
      <line x1="180" y1="62" x2="180" y2="250" stroke="#2d3140" strokeWidth="1" />

      {/* Left pane: task list */}
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

      {/* Right pane: output */}
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
  );
}
