"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type LiteYouTubeProps = {
  id: string;
  title: string;
  startTime?: number;
  className?: string;
};

// Module-level set keyed by origin so we don't inject duplicate preconnect
// links when multiple facades are on the same page, or when a component
// remounts after HMR.
const preconnectedOrigins = new Set<string>();

const PRECONNECT_ORIGINS = [
  "https://www.youtube-nocookie.com",
  "https://i.ytimg.com",
] as const;

function injectPreconnects() {
  if (typeof document === "undefined") return;
  for (const origin of PRECONNECT_ORIGINS) {
    if (preconnectedOrigins.has(origin)) continue;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);
    preconnectedOrigins.add(origin);
  }
}

function buildEmbedUrl(id: string, startTime?: number): string {
  const base = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
  if (typeof startTime === "number" && Number.isFinite(startTime) && startTime > 0) {
    return `${base}&start=${Math.floor(startTime)}`;
  }
  return base;
}

export default function LiteYouTube({
  id,
  title,
  startTime,
  className,
}: LiteYouTubeProps) {
  const [activated, setActivated] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (activated && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [activated]);

  const handlePreconnect = useCallback(() => {
    injectPreconnects();
  }, []);

  const handleActivate = useCallback(() => {
    setActivated(true);
  }, []);

  const wrapperClass = [
    "relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const thumbnailUrl = `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;

  return (
    <div className={wrapperClass}>
      {activated ? (
        <iframe
          ref={iframeRef}
          src={buildEmbedUrl(id, startTime)}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={handleActivate}
          onPointerOver={handlePreconnect}
          onFocus={handlePreconnect}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500 focus-visible:ring-offset-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- intentional: avoids whitelisting i.ytimg.com in next.config and keeps the facade dependency-free */}
          <img
            src={thumbnailUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
          />
          <span
            aria-hidden="true"
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-fire-500/95 text-white shadow-lg transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100 sm:h-20 sm:w-20"
          >
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5.14v13.72a1 1 0 0 0 1.55.83l10.29-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
