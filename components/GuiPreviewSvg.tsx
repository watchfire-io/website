export default function GuiPreviewSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="co-gui-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22262f" />
          <stop offset="100%" stopColor="#14161b" />
        </linearGradient>
        <linearGradient id="co-gui-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d3140" />
          <stop offset="100%" stopColor="#22262f" />
        </linearGradient>
        <linearGradient id="co-gui-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="co-gui-sidebar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1d24" />
          <stop offset="100%" stopColor="#16191f" />
        </linearGradient>
        <linearGradient id="co-gui-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e07040" />
          <stop offset="100%" stopColor="#e29020" />
        </linearGradient>
        <linearGradient id="co-gui-progress" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="co-gui-progress-mix" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="70%" stopColor="#22c55e" />
          <stop offset="70%" stopColor="#e29020" />
          <stop offset="100%" stopColor="#e29020" />
        </linearGradient>
        <clipPath id="co-gui-clip">
          <rect x="40" y="30" width="320" height="220" rx="12" />
        </clipPath>
      </defs>

      {/* Window */}
      <rect x="40" y="30" width="320" height="220" rx="12" fill="url(#co-gui-bg)" stroke="#2d3140" strokeWidth="1" />
      <rect x="40" y="30" width="320" height="220" rx="12" fill="none" stroke="url(#co-gui-highlight)" strokeWidth="1" />

      {/* Title bar */}
      <rect x="40" y="30" width="320" height="32" rx="12" fill="url(#co-gui-chrome)" />
      <rect x="40" y="50" width="320" height="12" fill="#22262f" />
      <line x1="40" y1="62" x2="360" y2="62" stroke="#2d3140" strokeWidth="0.5" />
      <circle cx="56" cy="46" r="4" fill="#ff5f57" opacity="0.8" />
      <circle cx="70" cy="46" r="4" fill="#ffbd2e" opacity="0.8" />
      <circle cx="84" cy="46" r="4" fill="#28c940" opacity="0.8" />
      <text x="200" y="50" fontSize="10" fontFamily="monospace" fill="#71717a" textAnchor="middle">Watchfire.app</text>

      <g clipPath="url(#co-gui-clip)">
        {/* Sidebar */}
        <rect x="40" y="62" width="86" height="188" fill="url(#co-gui-sidebar)" />
        <line x1="126" y1="62" x2="126" y2="250" stroke="#2d3140" strokeWidth="1" />

        {/* Sidebar: logo */}
        <g transform="translate(50 72)">
          <path
            d="M5 14 C 5 14 0 9 0 4 C 0 0 2.5 -2 5 -2 C 7.5 -2 10 0 10 4 C 10 9 5 14 5 14 Z"
            fill="url(#co-gui-accent)"
          />
          <circle cx="5" cy="6" r="1.8" fill="#fff5e6" opacity="0.9" />
        </g>
        <text x="65" y="80" fontSize="9" fontFamily="Outfit, system-ui, sans-serif" fontWeight="600" fill="#fafafa">watchfire</text>

        {/* Sidebar: active Dashboard pill */}
        <rect x="48" y="94" width="70" height="18" rx="4" fill="#e07040" fillOpacity="0.14" stroke="#e07040" strokeOpacity="0.45" strokeWidth="0.8" />
        <rect x="54" y="98" width="8" height="8" rx="1.5" fill="none" stroke="#f0a070" strokeWidth="1" />
        <rect x="56" y="100" width="2" height="2" fill="#f0a070" />
        <rect x="59" y="100" width="2" height="2" fill="#f0a070" />
        <rect x="56" y="103" width="2" height="2" fill="#f0a070" />
        <rect x="59" y="103" width="2" height="2" fill="#f0a070" />
        <text x="66" y="106" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fontWeight="500" fill="#f0a070">Dashboard</text>

        {/* Sidebar: PROJECTS section */}
        <text x="50" y="128" fontSize="6.5" fontFamily="Outfit, system-ui, sans-serif" fill="#71717a" letterSpacing="1.2">PROJECTS</text>

        <circle cx="55" cy="142" r="2.5" fill="#e07040" className="co-gui-pulse-a" />
        <text x="62" y="145" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fill="#a1a1aa">watchfire</text>

        <circle cx="55" cy="156" r="2.5" fill="#e29020" />
        <text x="62" y="159" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fill="#a1a1aa">website</text>

        <circle cx="55" cy="170" r="2.5" fill="#ec4899" />
        <text x="62" y="173" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fill="#a1a1aa">afterlight</text>

        <circle cx="55" cy="184" r="2.5" fill="#3b82f6" className="co-gui-pulse-b" />
        <text x="62" y="187" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fill="#a1a1aa">anima</text>

        <text x="50" y="204" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fill="#71717a">+ Add Project</text>

        {/* Sidebar: footer */}
        <line x1="48" y1="222" x2="118" y2="222" stroke="#2d3140" strokeWidth="0.5" />
        <text x="50" y="234" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fill="#a1a1aa">⚙ Settings</text>
        <circle cx="52" cy="244" r="1.5" fill="#22c55e" className="co-gui-pulse-c" />
        <text x="57" y="247" fontSize="6.5" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">Connected</text>

        {/* Main area: heading */}
        <text x="136" y="80" fontSize="11" fontFamily="Outfit, system-ui, sans-serif" fontWeight="600" fill="#fafafa">Dashboard</text>
        <text x="136" y="92" fontSize="7" fontFamily="Outfit, system-ui, sans-serif" fill="#71717a">Overview of all your projects.</text>

        {/* Card 1 — watchfire (top-left) */}
        <rect x="136" y="104" width="106" height="60" rx="6" fill="#1a1d24" stroke="#2d3140" strokeWidth="0.8" />
        <circle cx="144" cy="116" r="2.5" fill="#e07040" />
        <text x="150" y="119" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fontWeight="600" fill="#fafafa">watchfire</text>
        <text x="236" y="119" fontSize="9" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b" textAnchor="end">›</text>
        <text x="144" y="131" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="#71717a">⎇ main · watchfire</text>
        <rect x="144" y="136" width="22" height="9" rx="4.5" fill="#e07040" fillOpacity="0.16" />
        <text x="155" y="142.5" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#f0a070" textAnchor="middle">● Chat</text>
        <text x="144" y="156" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">0 todo</text>
        <text x="166" y="156" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">0 dev</text>
        <text x="186" y="156" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#22c55e">33 done</text>
        <rect x="144" y="159" width="90" height="2" rx="1" fill="#2d3140" />
        <rect x="144" y="159" width="90" height="2" rx="1" fill="url(#co-gui-progress)" />

        {/* Card 2 — website (top-right) */}
        <rect x="248" y="104" width="106" height="60" rx="6" fill="#1a1d24" stroke="#2d3140" strokeWidth="0.8" />
        <circle cx="256" cy="116" r="2.5" fill="#e29020" />
        <text x="262" y="119" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fontWeight="600" fill="#fafafa">website</text>
        <text x="348" y="119" fontSize="9" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b" textAnchor="end">›</text>
        <text x="256" y="131" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="#71717a">⎇ main · website</text>
        <rect x="256" y="136" width="22" height="9" rx="4.5" fill="#e07040" fillOpacity="0.16" />
        <text x="267" y="142.5" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#f0a070" textAnchor="middle">● Chat</text>
        <text x="256" y="156" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">0 todo</text>
        <text x="278" y="156" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">0 dev</text>
        <text x="298" y="156" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#22c55e">60 done</text>
        <rect x="256" y="159" width="90" height="2" rx="1" fill="#2d3140" />
        <rect x="256" y="159" width="90" height="2" rx="1" fill="url(#co-gui-progress)" />

        {/* Card 3 — afterlight (bottom-left) */}
        <rect x="136" y="170" width="106" height="60" rx="6" fill="#1a1d24" stroke="#2d3140" strokeWidth="0.8" />
        <circle cx="144" cy="182" r="2.5" fill="#ec4899" />
        <text x="150" y="185" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fontWeight="600" fill="#fafafa">afterlight</text>
        <text x="236" y="185" fontSize="9" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b" textAnchor="end">›</text>
        <text x="144" y="197" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="#71717a">⎇ main · afterlight</text>
        <rect x="144" y="202" width="22" height="9" rx="4.5" fill="#e07040" fillOpacity="0.16" />
        <text x="155" y="208.5" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#f0a070" textAnchor="middle">● Chat</text>
        <text x="144" y="222" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">0 todo</text>
        <text x="166" y="222" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">0 dev</text>
        <text x="186" y="222" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#22c55e">198 done</text>
        <rect x="144" y="225" width="90" height="2" rx="1" fill="#2d3140" />
        <rect x="144" y="225" width="90" height="2" rx="1" fill="url(#co-gui-progress)" />

        {/* Card 4 — anima (bottom-right, in-progress) */}
        <rect x="248" y="170" width="106" height="60" rx="6" fill="#1a1d24" stroke="#2d3140" strokeWidth="0.8" />
        <rect x="248" y="170" width="106" height="60" rx="6" fill="none" stroke="#e07040" strokeOpacity="0.35" strokeWidth="1" className="co-gui-card-glow" />
        <circle cx="256" cy="182" r="2.5" fill="#3b82f6" />
        <text x="262" y="185" fontSize="8" fontFamily="Outfit, system-ui, sans-serif" fontWeight="600" fill="#fafafa">anima</text>
        <text x="348" y="185" fontSize="9" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b" textAnchor="end">›</text>
        <text x="256" y="197" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="#71717a">⎇ main · anima</text>
        <rect x="256" y="202" width="22" height="9" rx="4.5" fill="#e07040" fillOpacity="0.16" />
        <text x="267" y="208.5" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#f0a070" textAnchor="middle">● Chat</text>
        <text x="256" y="222" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#52525b">0 todo</text>
        <text x="278" y="222" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#f0a070">8 dev</text>
        <text x="298" y="222" fontSize="6" fontFamily="Outfit, system-ui, sans-serif" fill="#22c55e">60 done</text>
        <rect x="256" y="225" width="90" height="2" rx="1" fill="#2d3140" />
        <rect x="256" y="225" height="2" rx="1" fill="url(#co-gui-progress-mix)" className="co-gui-progress" />
      </g>

      <style>{`
        .co-gui-pulse-a { animation: co-gui-pulse 2.4s ease-in-out infinite; transform-origin: 55px 142px; }
        .co-gui-pulse-b { animation: co-gui-pulse 2.4s ease-in-out infinite; animation-delay: -1.2s; transform-origin: 55px 184px; }
        .co-gui-pulse-c { animation: co-gui-pulse 1.8s ease-in-out infinite; transform-origin: 52px 244px; }
        .co-gui-card-glow { animation: co-gui-glow 2.6s ease-in-out infinite; }
        .co-gui-progress { animation: co-gui-progress 3.2s ease-in-out infinite; }
        @keyframes co-gui-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes co-gui-glow {
          0%, 100% { stroke-opacity: 0.15; }
          50% { stroke-opacity: 0.55; }
        }
        @keyframes co-gui-progress {
          0% { width: 60px; }
          50% { width: 78px; }
          100% { width: 60px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .co-gui-pulse-a, .co-gui-pulse-b, .co-gui-pulse-c,
          .co-gui-card-glow, .co-gui-progress { animation: none !important; }
          .co-gui-progress { width: 70px; }
        }
      `}</style>
    </svg>
  );
}
