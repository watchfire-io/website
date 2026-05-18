"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import AnimatedTerminal from "./AnimatedTerminal";
import TuiPreviewSvg from "./TuiPreviewSvg";

type Mode = "cli" | "tui" | "gui";
const MODES: Mode[] = ["cli", "tui", "gui"];
const MODE_LABEL: Record<Mode, string> = {
  cli: "CLI",
  tui: "TUI",
  gui: "GUI",
};
const ROTATION_MS = 4000;
const CLICK_PAUSE_MS = 6000;

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

function FrameChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-700/70 px-4 py-2.5">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
      <span className="ml-3 truncate font-mono text-[11px] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

function FrameGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-8 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(224,112,64,0.30), transparent 70%)",
      }}
    />
  );
}

function TuiFrame() {
  return (
    <div
      role="img"
      aria-label="Watchfire TUI with project tasks on the left and live agent output on the right"
      className="relative mx-auto h-full w-full max-w-2xl"
    >
      <FrameGlow />
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-700/70 bg-[#16181d] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <FrameChrome label="watchfire - tui" />
        <div className="flex-1 overflow-hidden px-4 py-4">
          <TuiPreviewSvg className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

function GuiFrame() {
  return (
    <div className="relative mx-auto h-full w-full max-w-2xl">
      <FrameGlow />
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-700/70 bg-[#16181d] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <FrameChrome label="Watchfire.app - dashboard" />
        <div className="relative flex-1 overflow-hidden">
          <Image
            src="/screenshots/dashboard.webp"
            alt="Watchfire GUI dashboard showing the multi-project sidebar, an active project, and a live agent terminal"
            width={2000}
            height={1355}
            sizes="(min-width: 768px) 40vw, 100vw"
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export default function HeroModeShowcase() {
  const [mode, setMode] = useState<Mode>("cli");
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [clickToken, setClickToken] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = stageRef.current;
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
    if (clickToken === 0) return;
    const t = setTimeout(() => setClickToken(0), CLICK_PAUSE_MS);
    return () => clearTimeout(t);
  }, [clickToken]);

  useEffect(() => {
    if (reducedMotion || hovered || focused || !visible || clickToken > 0) {
      return;
    }
    const id = setInterval(() => {
      setMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [reducedMotion, hovered, focused, visible, clickToken]);

  const handlePip = (target: Mode) => {
    setMode(target);
    if (reducedMotion) return;
    setClickToken((t) => t + 1);
  };

  const fadeClass = reducedMotion ? "" : "transition-opacity duration-500";

  return (
    <div
      className="relative mx-auto w-full max-w-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div ref={stageRef} className="relative">
        <div
          className={fadeClass}
          style={{
            opacity: mode === "cli" ? 1 : 0,
            pointerEvents: mode === "cli" ? "auto" : "none",
          }}
          aria-hidden={mode !== "cli"}
        >
          <AnimatedTerminal />
        </div>
        <div
          className={`absolute inset-0 ${fadeClass}`}
          style={{
            opacity: mode === "tui" ? 1 : 0,
            pointerEvents: mode === "tui" ? "auto" : "none",
          }}
          aria-hidden={mode !== "tui"}
        >
          <TuiFrame />
        </div>
        <div
          className={`absolute inset-0 ${fadeClass}`}
          style={{
            opacity: mode === "gui" ? 1 : 0,
            pointerEvents: mode === "gui" ? "auto" : "none",
          }}
          aria-hidden={mode !== "gui"}
        >
          <GuiFrame />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
        <span className="font-mono text-xs uppercase tracking-wider text-fire-600 dark:text-fire-400">
          {MODE_LABEL[mode]}
        </span>
        <span className="sr-only" aria-live="polite">
          Showing {MODE_LABEL[mode]} interface
        </span>
        <div className="flex items-center gap-1.5">
          {MODES.map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                aria-label={`Show ${MODE_LABEL[m]} frame`}
                aria-current={active ? "true" : undefined}
                onClick={() => handlePip(m)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? "w-2 bg-fire-500 dark:bg-fire-400"
                    : "w-1 bg-zinc-400/40 dark:bg-zinc-600/60"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
