"use client";

export default function HeroIllustration() {
  return (
    <div className="hero-illustration relative w-full max-w-lg mx-auto lg:mx-0">
      <svg
        viewBox="0 0 480 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Glow backdrop */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#e07040" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="termGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
          <linearGradient id="fireFlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e07040" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#e29020" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <rect width="480" height="400" fill="url(#glow)" />

        {/* Terminal window */}
        <g className="hero-terminal">
          <rect x="40" y="30" width="400" height="260" rx="12" fill="url(#termGrad)" stroke="#3f3f46" strokeWidth="1" />
          {/* Title bar */}
          <rect x="40" y="30" width="400" height="36" rx="12" fill="#27272a" />
          <rect x="40" y="54" width="400" height="12" fill="#27272a" />
          {/* Traffic lights */}
          <circle cx="64" cy="48" r="5" fill="#ff5f57" opacity="0.7" />
          <circle cx="82" cy="48" r="5" fill="#ffbd2e" opacity="0.7" />
          <circle cx="100" cy="48" r="5" fill="#28c940" opacity="0.7" />
          {/* Title text */}
          <text x="240" y="52" textAnchor="middle" fill="#71717a" fontSize="11" fontFamily="monospace">watchfire — tasks</text>
        </g>

        {/* Task items flowing in */}
        <g className="hero-task hero-task-1">
          <rect x="60" y="80" width="360" height="36" rx="6" fill="#1c1c1f" stroke="#3f3f46" strokeWidth="0.5" />
          <circle cx="80" cy="98" r="6" fill="#28c940" opacity="0.9" />
          <text x="80" y="101" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">✓</text>
          <text x="96" y="102" fill="#e4e4e7" fontSize="12" fontFamily="monospace">Build auth module</text>
          <rect x="316" y="90" width="84" height="16" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="0.5" />
          <text x="358" y="101" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">claude-code</text>
        </g>

        <g className="hero-task hero-task-2">
          <rect x="60" y="124" width="360" height="36" rx="6" fill="#1c1c1f" stroke="#e07040" strokeWidth="0.5" strokeOpacity="0.5" />
          <circle cx="80" cy="142" r="6" fill="none" stroke="#e07040" strokeWidth="1.5" />
          {/* Spinning indicator */}
          <circle cx="80" cy="142" r="6" fill="none" stroke="#e07040" strokeWidth="1.5" strokeDasharray="8 24" className="hero-spinner" />
          <text x="96" y="146" fill="#e4e4e7" fontSize="12" fontFamily="monospace">Add API endpoints</text>
          <rect x="346" y="134" width="54" height="16" rx="4" fill="#4a2510" opacity="0.7" stroke="#e07040" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="373" y="145" textAnchor="middle" fill="#e88050" fontSize="9" fontFamily="monospace">codex</text>
        </g>

        <g className="hero-task hero-task-3">
          <rect x="60" y="168" width="360" height="36" rx="6" fill="#1c1c1f" stroke="#3f3f46" strokeWidth="0.5" />
          <circle cx="80" cy="186" r="6" fill="none" stroke="#52525b" strokeWidth="1.5" />
          <text x="96" y="190" fill="#a1a1aa" fontSize="12" fontFamily="monospace">Write integration tests</text>
          <rect x="330" y="178" width="70" height="16" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="0.5" />
          <text x="365" y="189" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">opencode</text>
        </g>

        <g className="hero-task hero-task-4">
          <rect x="60" y="212" width="360" height="36" rx="6" fill="#1c1c1f" stroke="#3f3f46" strokeWidth="0.5" />
          <circle cx="80" cy="230" r="6" fill="none" stroke="#52525b" strokeWidth="1.5" />
          <text x="96" y="234" fill="#a1a1aa" fontSize="12" fontFamily="monospace">Update documentation</text>
          <rect x="340" y="222" width="60" height="16" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="0.5" />
          <text x="370" y="233" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">gemini</text>
        </g>

        {/* Decorative git branch lines */}
        <g className="hero-branches" opacity="0.5">
          <path d="M 240 310 Q 180 330 160 360" stroke="#e07040" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          <path d="M 240 310 L 240 370" stroke="#71717a" strokeWidth="1.5" fill="none" />
          <path d="M 240 310 Q 300 330 320 360" stroke="#e07040" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          <circle cx="240" cy="310" r="4" fill="#e07040" />
          <circle cx="160" cy="362" r="3" fill="#e29020" />
          <circle cx="240" cy="372" r="3" fill="#71717a" />
          <circle cx="320" cy="362" r="3" fill="#e29020" />
          <text x="152" y="384" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">worktree/1</text>
          <text x="240" y="392" fill="#52525b" fontSize="9" textAnchor="middle" fontFamily="monospace">main</text>
          <text x="328" y="384" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">worktree/2</text>
        </g>
      </svg>

      <style jsx>{`
        .hero-terminal {
          animation: hero-fade-up 0.8s ease-out both;
        }
        .hero-task-1 { animation: hero-fade-up 0.8s ease-out 0.2s both; }
        .hero-task-2 { animation: hero-fade-up 0.8s ease-out 0.35s both; }
        .hero-task-3 { animation: hero-fade-up 0.8s ease-out 0.5s both; }
        .hero-task-4 { animation: hero-fade-up 0.8s ease-out 0.65s both; }
        .hero-branches { animation: hero-fade-up 0.8s ease-out 0.8s both; }

        .hero-spinner {
          animation: hero-spin 1.2s linear infinite;
          transform-origin: 80px 142px;
        }

        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-spin {
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-terminal,
          .hero-task-1, .hero-task-2, .hero-task-3, .hero-task-4,
          .hero-branches {
            animation: none !important;
            opacity: 1 !important;
          }
          .hero-spinner {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
