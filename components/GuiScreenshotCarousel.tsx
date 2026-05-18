"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type Slide = { src: string; alt: string };

const SLIDES: Slide[] = [
  {
    src: "/screenshots/dashboard.webp",
    alt: "Watchfire GUI dashboard showing multiple project cards",
  },
  {
    src: "/screenshots/project-tasks.webp",
    alt: "Watchfire GUI project view with the task list and live agent output",
  },
  {
    src: "/screenshots/task-edit.webp",
    alt: "Watchfire GUI task editor with prompt and acceptance criteria fields",
  },
  {
    src: "/screenshots/project-logs.webp",
    alt: "Watchfire GUI project logs streaming live output from a running agent",
  },
  {
    src: "/screenshots/chat-active.webp",
    alt: "Watchfire GUI active chat session with a coding agent",
  },
];

const AUTO_ADVANCE_MS = 4000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function GuiScreenshotCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || hovered || !visible) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reducedMotion, hovered, visible, index]);

  const goTo = useCallback((target: number) => {
    const normalized = ((target % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setIndex(normalized);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
    },
    [goTo, index],
  );

  const current = SLIDES[index];

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Watchfire GUI screenshots"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={handleKeyDown}
      className="relative flex h-full w-full flex-col rounded-md outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60"
    >
      <div className="relative flex-1 overflow-hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 880px) 880px, 100vw"
              priority={false}
              className="object-cover object-top"
            />
          </div>
        ))}
        <span className="sr-only" aria-live="polite">
          {current.alt}
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 border-t border-zinc-300/70 bg-white/60 px-4 py-3 dark:border-zinc-700/70 dark:bg-[#16181d]/60">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show screenshot ${i + 1} of ${SLIDES.length}`}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active
                  ? "w-3 bg-fire-500 dark:bg-fire-400"
                  : "w-1.5 bg-zinc-400/50 hover:bg-fire-500/70 dark:bg-zinc-600/60 dark:hover:bg-fire-400/70"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
