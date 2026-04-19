"use client";

export default function HeroIllustration() {
  return (
    <div className="hero-illustration relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Ambient glow behind the illustration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 45%, rgba(224,112,64,0.30), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_20px_60px_rgba(224,112,64,0.22)]"
        aria-hidden="true"
      >
        <defs>
          {/* Card gradient */}
          <linearGradient id="hCardGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262f" />
            <stop offset="100%" stopColor="#16181d" />
          </linearGradient>
          <linearGradient id="hCardHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Hub glow */}
          <radialGradient id="hHubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8c42" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#e07040" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
          </radialGradient>

          {/* Ember glow */}
          <radialGradient id="hEmberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb347" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
          </radialGradient>

          {/* Dotted grid */}
          <pattern id="hDotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="#2d3140" opacity="0.5" />
          </pattern>
        </defs>

        {/* Subtle dotted grid backdrop */}
        <rect x="0" y="0" width="480" height="480" fill="url(#hDotGrid)" opacity="0.4" />

        {/* Central hub glow (behind everything else) */}
        <circle cx="240" cy="230" r="150" fill="url(#hHubGlow)" className="hero-hub-glow" />

        {/* Orbit ring (decorative) */}
        <circle
          cx="240"
          cy="230"
          r="128"
          fill="none"
          stroke="#e07040"
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeDasharray="2 6"
          className="hero-orbit"
        />

        {/* Spec card hovering above — this is the "clear spec" coming in */}
        {/* Outer <g> holds the SVG transform so CSS animation transforms on the child don't override it */}
        <g transform="translate(128 14)">
          <g className="hero-spec">
            <rect x="0" y="0" width="224" height="74" rx="11" fill="url(#hCardGrad)" stroke="#2d3140" strokeWidth="1" />
            <rect x="0" y="0" width="224" height="74" rx="11" fill="url(#hCardHighlight)" />
            {/* SPEC pill */}
            <rect x="12" y="11" width="46" height="16" rx="4" fill="#e07040" fillOpacity="0.15" stroke="#e07040" strokeOpacity="0.45" strokeWidth="0.75" />
            <text x="35" y="22" textAnchor="middle" fill="#f0a070" fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="1">SPEC</text>
            <text x="66" y="22" fill="#a1a1aa" fontSize="9" fontFamily="monospace">task/0042</text>
            {/* Title */}
            <text x="12" y="44" fill="#f4f4f5" fontSize="13" fontFamily="var(--font-outfit), sans-serif" fontWeight="600">Add OAuth + integration tests</text>
            {/* Status line */}
            <circle cx="18" cy="60" r="3" fill="#22c55e" opacity="0.25" />
            <circle cx="18" cy="60" r="1.6" fill="#22c55e" />
            <text x="26" y="63" fill="#a1a1aa" fontSize="9" fontFamily="monospace">context ready</text>
            <circle cx="116" cy="60" r="1.6" fill="#e07040" />
            <text x="124" y="63" fill="#a1a1aa" fontSize="9" fontFamily="monospace">sandbox on</text>
          </g>
        </g>

        {/* Connection lines from hub to each agent (drawn before agents + hub so they sit behind) */}
        <g className="hero-connections" strokeLinecap="round" fill="none">
          {/* Curved cubic-bezier paths — each curve sweeps outward from the hub toward its agent card */}
          <path d="M 240 230 C 198 208 138 168 92 138" stroke="#e07040" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.45" />
          <path d="M 240 230 C 282 208 342 168 388 138" stroke="#e07040" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.45" />
          <path d="M 240 230 C 198 252 138 292 92 322" stroke="#e07040" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.45" />
          <path d="M 240 230 C 282 252 342 292 388 322" stroke="#e07040" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.45" />

          {/* Animated particles traveling from hub → agents along the same curves */}
          <circle r="2.5" fill="#ffb347" opacity="0.95" className="hero-particle">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M 240 230 C 198 208 138 168 92 138" />
          </circle>
          <circle r="2.5" fill="#ffb347" opacity="0.95" className="hero-particle">
            <animateMotion dur="2.4s" begin="0.6s" repeatCount="indefinite" path="M 240 230 C 282 208 342 168 388 138" />
          </circle>
          <circle r="2.5" fill="#ffb347" opacity="0.95" className="hero-particle">
            <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M 240 230 C 198 252 138 292 92 322" />
          </circle>
          <circle r="2.5" fill="#ffb347" opacity="0.95" className="hero-particle">
            <animateMotion dur="2.4s" begin="1.8s" repeatCount="indefinite" path="M 240 230 C 282 252 342 292 388 322" />
          </circle>
        </g>

        {/* ——— Agent badges ——— */}
        {/* Claude Code — top-left */}
        <g transform="translate(30 113)">
          <g className="hero-agent hero-agent-1">
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardGrad)" stroke="#2d3140" strokeWidth="1" />
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardHighlight)" />
            <rect x="10" y="10" width="30" height="30" rx="8" fill="#d97757" fillOpacity="0.18" stroke="#d97757" strokeOpacity="0.55" strokeWidth="1" />
            <text x="25" y="30" textAnchor="middle" fill="#d97757" fontSize="13" fontWeight="700" fontFamily="var(--font-outfit), sans-serif">C</text>
            <text x="48" y="22" fill="#f4f4f5" fontSize="10.5" fontFamily="var(--font-outfit), sans-serif" fontWeight="600">Claude Code</text>
            <text x="48" y="35" fill="#71717a" fontSize="8" fontFamily="monospace">Anthropic</text>
            <circle cx="112" cy="12" r="3" fill="#22c55e" className="hero-status" />
            <circle cx="112" cy="12" r="3" fill="#22c55e" opacity="0.5" className="hero-status-glow" />
          </g>
        </g>

        {/* Codex — top-right */}
        <g transform="translate(326 113)">
          <g className="hero-agent hero-agent-2">
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardGrad)" stroke="#2d3140" strokeWidth="1" />
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardHighlight)" />
            <rect x="10" y="10" width="30" height="30" rx="8" fill="#10a37f" fillOpacity="0.18" stroke="#10a37f" strokeOpacity="0.55" strokeWidth="1" />
            <text x="25" y="30" textAnchor="middle" fill="#10a37f" fontSize="12" fontWeight="700" fontFamily="var(--font-outfit), sans-serif">Cx</text>
            <text x="48" y="22" fill="#f4f4f5" fontSize="10.5" fontFamily="var(--font-outfit), sans-serif" fontWeight="600">Codex</text>
            <text x="48" y="35" fill="#71717a" fontSize="8" fontFamily="monospace">OpenAI</text>
            <circle cx="112" cy="12" r="3" fill="#22c55e" className="hero-status" />
            <circle cx="112" cy="12" r="3" fill="#22c55e" opacity="0.5" className="hero-status-glow" />
          </g>
        </g>

        {/* opencode — bottom-left */}
        <g transform="translate(30 297)">
          <g className="hero-agent hero-agent-3">
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardGrad)" stroke="#2d3140" strokeWidth="1" />
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardHighlight)" />
            <rect x="10" y="10" width="30" height="30" rx="8" fill="#8b5cf6" fillOpacity="0.18" stroke="#8b5cf6" strokeOpacity="0.55" strokeWidth="1" />
            <text x="25" y="30" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700" fontFamily="var(--font-outfit), sans-serif">oc</text>
            <text x="48" y="22" fill="#f4f4f5" fontSize="10.5" fontFamily="var(--font-outfit), sans-serif" fontWeight="600">opencode</text>
            <text x="48" y="35" fill="#71717a" fontSize="8" fontFamily="monospace">Open source</text>
            <circle cx="112" cy="12" r="3" fill="#22c55e" className="hero-status" />
            <circle cx="112" cy="12" r="3" fill="#22c55e" opacity="0.5" className="hero-status-glow" />
          </g>
        </g>

        {/* Gemini CLI — bottom-right */}
        <g transform="translate(326 297)">
          <g className="hero-agent hero-agent-4">
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardGrad)" stroke="#2d3140" strokeWidth="1" />
            <rect x="0" y="0" width="124" height="50" rx="10" fill="url(#hCardHighlight)" />
            <rect x="10" y="10" width="30" height="30" rx="8" fill="#4285f4" fillOpacity="0.18" stroke="#4285f4" strokeOpacity="0.55" strokeWidth="1" />
            <text x="25" y="30" textAnchor="middle" fill="#4285f4" fontSize="13" fontWeight="700" fontFamily="var(--font-outfit), sans-serif">G</text>
            <text x="48" y="22" fill="#f4f4f5" fontSize="10.5" fontFamily="var(--font-outfit), sans-serif" fontWeight="600">Gemini CLI</text>
            <text x="48" y="35" fill="#71717a" fontSize="8" fontFamily="monospace">Google</text>
            <circle cx="112" cy="12" r="3" fill="#22c55e" className="hero-status" />
            <circle cx="112" cy="12" r="3" fill="#22c55e" opacity="0.5" className="hero-status-glow" />
          </g>
        </g>

        {/* ——— Central Watchfire hub ——— */}
        <g className="hero-hub">
          {/* Pulse ring (outermost) */}
          <circle cx="240" cy="230" r="58" fill="none" stroke="#e07040" strokeWidth="1.25" className="hero-hub-pulse" />
          {/* Hub body */}
          <circle cx="240" cy="230" r="54" fill="#1a1d24" stroke="#2d3140" strokeWidth="1" />
          <circle cx="240" cy="230" r="54" fill="none" stroke="#e07040" strokeWidth="1" strokeOpacity="0.55" />
          {/* Inner background */}
          <circle cx="240" cy="230" r="46" fill="#14161b" />
          {/* Campfire logs */}
          <rect x="222" y="262" width="36" height="3" rx="1.5" fill="#4a2510" opacity="0.85" />
          <rect x="218" y="258" width="36" height="3" rx="1.5" fill="#3a1e0c" opacity="0.85" transform="rotate(-8 236 259.5)" />
          {/* Flame — outer */}
          <path
            d="M 240 196 C 224 218 213 232 218 252 C 221 262 230 266 240 266 C 250 266 259 262 262 252 C 267 232 256 218 240 196 Z"
            fill="#ff6b35"
            className="hero-flame hero-flame-outer"
          />
          {/* Flame — mid */}
          <path
            d="M 240 212 C 231 226 225 236 229 250 C 232 258 236 260 240 260 C 244 260 248 258 251 250 C 255 236 249 226 240 212 Z"
            fill="#ffb347"
            className="hero-flame hero-flame-mid"
          />
          {/* Flame — inner */}
          <path
            d="M 240 228 C 236 236 233 243 236 250 C 238 254 240 255 240 255 C 240 255 242 254 244 250 C 247 243 244 236 240 228 Z"
            fill="#fff5e6"
            className="hero-flame hero-flame-inner"
          />
          {/* Hub label */}
          <text x="240" y="304" textAnchor="middle" fill="#e4e4e7" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="1.5">WATCHFIRE</text>
        </g>

        {/* ——— Parallel worktree lanes ——— */}
        <g className="hero-worktrees">
          <text x="40" y="386" fill="#71717a" fontSize="8.5" fontFamily="monospace" fontWeight="600" letterSpacing="1">PARALLEL WORKTREES</text>

          {/* Lane 1 — done */}
          <line x1="40" y1="408" x2="220" y2="408" stroke="#2d3140" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="60" cy="408" r="4" fill="#22c55e" />
          <circle cx="100" cy="408" r="4" fill="#22c55e" />
          <circle cx="140" cy="408" r="4" fill="#22c55e" />
          <circle cx="180" cy="408" r="4" fill="#22c55e" />
          <polyline points="216,405 220,408 216,411" stroke="#22c55e" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="40" y="426" fill="#52525b" fontSize="8" fontFamily="monospace">watchfire/0042 · merged</text>

          {/* Lane 2 — in progress (pulsing HEAD) */}
          <line x1="260" y1="408" x2="440" y2="408" stroke="#2d3140" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="280" cy="408" r="4" fill="#e07040" />
          <circle cx="320" cy="408" r="4" fill="#e07040" />
          <circle cx="360" cy="408" r="4" fill="#e07040" />
          <circle cx="400" cy="408" r="5" fill="#e07040" className="hero-commit-pulse" />
          <circle cx="400" cy="408" r="10" fill="none" stroke="#e07040" strokeWidth="1" opacity="0.35" className="hero-commit-ring" />
          <text x="260" y="426" fill="#52525b" fontSize="8" fontFamily="monospace">watchfire/0043 · in flight</text>

          {/* Lane 3 — queued */}
          <line x1="40" y1="454" x2="220" y2="454" stroke="#2d3140" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
          <circle cx="60" cy="454" r="4" fill="none" stroke="#52525b" strokeWidth="1.4" strokeDasharray="2 2" />
          <circle cx="100" cy="454" r="4" fill="none" stroke="#52525b" strokeWidth="1.4" strokeDasharray="2 2" />
          <text x="40" y="472" fill="#52525b" fontSize="8" fontFamily="monospace">watchfire/0044 · queued</text>

          {/* Lane 4 — running (spinner) */}
          <line x1="260" y1="454" x2="440" y2="454" stroke="#2d3140" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="280" cy="454" r="4" fill="#ffb347" opacity="0.7" />
          <circle cx="320" cy="454" r="4" fill="#ffb347" opacity="0.7" />
          <circle cx="360" cy="454" r="4" fill="none" stroke="#ffb347" strokeWidth="1.5" strokeDasharray="9 14" className="hero-spinner" />
          <text x="260" y="472" fill="#52525b" fontSize="8" fontFamily="monospace">watchfire/0045 · running</text>
        </g>

        {/* Ember sparks rising from flame */}
        <g className="hero-embers" aria-hidden="true">
          <circle cx="236" cy="210" r="1.6" fill="url(#hEmberGlow)" className="ember ember-1" />
          <circle cx="246" cy="215" r="1.2" fill="url(#hEmberGlow)" className="ember ember-2" />
          <circle cx="232" cy="205" r="1" fill="url(#hEmberGlow)" className="ember ember-3" />
          <circle cx="248" cy="200" r="1.3" fill="url(#hEmberGlow)" className="ember ember-4" />
          <circle cx="240" cy="198" r="1" fill="url(#hEmberGlow)" className="ember ember-5" />
        </g>
      </svg>

      <style jsx>{`
        /* Entrance animations */
        .hero-spec { animation: hero-fade-down 0.8s ease-out 0.05s both; }
        .hero-connections { animation: hero-fade-in 0.9s ease-out 0.7s both; }
        .hero-agent-1 { animation: hero-fade-in-scale 0.7s ease-out 0.3s both; transform-box: fill-box; transform-origin: center; }
        .hero-agent-2 { animation: hero-fade-in-scale 0.7s ease-out 0.4s both; transform-box: fill-box; transform-origin: center; }
        .hero-agent-3 { animation: hero-fade-in-scale 0.7s ease-out 0.5s both; transform-box: fill-box; transform-origin: center; }
        .hero-agent-4 { animation: hero-fade-in-scale 0.7s ease-out 0.6s both; transform-box: fill-box; transform-origin: center; }
        .hero-hub { animation: hero-fade-in-scale 0.8s ease-out 0.2s both; transform-box: fill-box; transform-origin: 240px 230px; }
        .hero-orbit { animation: hero-fade-in 1.2s ease-out 0.9s both; }
        .hero-hub-glow { animation: hero-fade-in 1.4s ease-out both; }
        .hero-worktrees { animation: hero-fade-up 0.8s ease-out 0.9s both; }
        .hero-embers { animation: hero-fade-in 1.4s ease-out 1.1s both; }

        /* Continuous motion */
        .hero-hub-pulse {
          animation: hero-hub-pulse 3s ease-out infinite;
          transform-origin: 240px 230px;
        }
        .hero-orbit {
          transform-origin: 240px 230px;
          animation: hero-fade-in 1.2s ease-out 0.9s both, hero-rotate 60s linear infinite 0.9s;
        }
        .hero-flame-outer { animation: hero-flicker 1.8s ease-in-out infinite; transform-origin: 240px 266px; }
        .hero-flame-mid { animation: hero-flicker 1.4s ease-in-out infinite reverse; transform-origin: 240px 260px; }
        .hero-flame-inner { animation: hero-flicker 1.1s ease-in-out infinite; transform-origin: 240px 255px; }

        .hero-status-glow {
          animation: hero-status-pulse 2s ease-in-out infinite;
          transform-origin: center;
          filter: blur(3px);
        }

        .hero-commit-pulse {
          animation: hero-commit-pulse 2s ease-in-out infinite;
          transform-origin: 400px 408px;
        }
        .hero-commit-ring {
          animation: hero-commit-ring 2s ease-out infinite;
          transform-origin: 400px 408px;
        }
        .hero-spinner {
          animation: hero-spin 1.4s linear infinite;
          transform-origin: 360px 454px;
        }

        .ember {
          animation: ember-float 3.8s ease-out infinite;
          transform-origin: center;
        }
        .ember-1 { animation-delay: 0.2s; }
        .ember-2 { animation-delay: 1.0s; }
        .ember-3 { animation-delay: 1.8s; }
        .ember-4 { animation-delay: 2.4s; }
        .ember-5 { animation-delay: 3.0s; }

        /* Keyframes */
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes hero-fade-in-scale {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes hero-rotate {
          to { transform: rotate(360deg); }
        }
        @keyframes hero-hub-pulse {
          0% { transform: scale(1); opacity: 0.55; }
          70% { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        @keyframes hero-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.06) scaleX(0.96); }
        }
        @keyframes hero-status-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.85; }
        }
        @keyframes hero-commit-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes hero-commit-ring {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes hero-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ember-float {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          15% { opacity: 0.95; }
          100% { transform: translateY(-120px) translateX(8px) scale(0.3); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-spec, .hero-connections, .hero-agent-1, .hero-agent-2, .hero-agent-3, .hero-agent-4,
          .hero-hub, .hero-orbit, .hero-hub-glow, .hero-worktrees, .hero-embers {
            animation: none !important;
            opacity: 1 !important;
          }
          .hero-hub-pulse, .hero-flame-outer, .hero-flame-mid, .hero-flame-inner,
          .hero-status-glow, .hero-commit-pulse, .hero-commit-ring, .hero-spinner, .ember {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
