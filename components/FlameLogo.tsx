interface FlameLogoProps {
  className?: string;
  size?: number;
  title?: string;
}

export default function FlameLogo({
  className,
  size = 28,
  title = "Watchfire",
}: FlameLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <path
        d="M32 1 C32 1 10 24 10 42 C10 56 20 63 32 63 C44 63 54 56 54 42 C54 24 32 1 32 1Z"
        fill="#ff6b35"
        className="flame-logo-outer"
      />
      <path
        d="M32 12 C32 12 16 32 16 44 C16 54 23 60 32 60 C41 60 48 54 48 44 C48 32 32 12 32 12Z"
        fill="#ffb347"
        className="flame-logo-mid"
      />
      <path
        d="M32 23 C32 23 22 38 22 47 C22 54 26 58 32 58 C38 58 42 54 42 47 C42 38 32 23 32 23Z"
        fill="#fff5e6"
        className="flame-logo-inner"
      />
      <style>{`
        .flame-logo-outer { animation: flame-logo-flicker 1.8s ease-in-out infinite; transform-origin: 32px 63px; transform-box: fill-box; }
        .flame-logo-mid { animation: flame-logo-flicker 1.4s ease-in-out infinite reverse; transform-origin: 32px 60px; transform-box: fill-box; }
        .flame-logo-inner { animation: flame-logo-flicker 1.1s ease-in-out infinite; transform-origin: 32px 58px; transform-box: fill-box; }
        @keyframes flame-logo-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.07) scaleX(0.95); }
        }
        @media (prefers-reduced-motion: reduce) {
          .flame-logo-outer, .flame-logo-mid, .flame-logo-inner { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
