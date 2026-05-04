"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  defaultScript,
  type AnsiColor,
  type TerminalLine,
} from "./AnimatedTerminal.script";

export type { TerminalLine, AnsiColor } from "./AnimatedTerminal.script";

const TYPE_MS_PER_CHAR = 32;
const TYPE_JITTER_MS = 12;
const PAUSE_AFTER_COMMAND_MS = 380;
const PAUSE_AFTER_OUTPUT_MS = 220;
const PAUSE_AFTER_BLANK_MS = 80;
const LOOP_PAUSE_MS = 2000;

type DisplayLine =
  | { kind: "command"; text: string; cursor: boolean }
  | { kind: "output"; segments: { text: string; color?: AnsiColor }[] }
  | { kind: "blank" };

function colorClass(color?: AnsiColor): string {
  switch (color) {
    case "fire":
      return "text-fire-400";
    case "ember":
      return "text-ember-400";
    case "flame":
      return "text-fire-50";
    case "muted":
      return "text-zinc-500";
    case "green":
      return "text-emerald-400";
    case "red":
      return "text-red-400";
    case "blue":
      return "text-sky-300";
    default:
      return "text-zinc-200";
  }
}

function buildFinalFrame(script: TerminalLine[]): DisplayLine[] {
  const out: DisplayLine[] = [];
  for (const step of script) {
    if (step.type === "command") {
      out.push({ kind: "command", text: step.text, cursor: false });
    } else if (step.type === "output") {
      out.push({ kind: "output", segments: step.segments });
    } else {
      out.push({ kind: "blank" });
    }
  }
  return out;
}

export default function AnimatedTerminal({
  script = defaultScript,
}: {
  script?: TerminalLine[];
}) {
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setLines(buildFinalFrame(script));
      return;
    }

    let stepIdx = 0;
    let typedChars = 0;
    let phase: "typing" | "pause" | "loop" = "typing";
    let phaseUntil = 0;
    let nextCharAt = 0;
    let emitted: DisplayLine[] = [];
    let virtual = 0;
    let lastTs = 0;
    let started = false;
    let raf = 0;

    const emit = (next: DisplayLine[]) => {
      emitted = next;
      setLines(next);
    };

    const startStep = () => {
      if (stepIdx >= script.length) {
        phase = "loop";
        phaseUntil = virtual + LOOP_PAUSE_MS;
        return;
      }
      const step = script[stepIdx];
      if (step.type === "command") {
        phase = "typing";
        typedChars = 0;
        nextCharAt = virtual;
        emit([...emitted, { kind: "command", text: "", cursor: true }]);
      } else if (step.type === "output") {
        emit([...emitted, { kind: "output", segments: step.segments }]);
        phase = "pause";
        phaseUntil = virtual + (step.pauseAfter ?? PAUSE_AFTER_OUTPUT_MS);
        stepIdx++;
      } else {
        emit([...emitted, { kind: "blank" }]);
        phase = "pause";
        phaseUntil = virtual + (step.pauseAfter ?? PAUSE_AFTER_BLANK_MS);
        stepIdx++;
      }
    };

    const tick = (ts: number) => {
      if (!started) {
        started = true;
        lastTs = ts;
        startStep();
      } else {
        const dt = ts - lastTs;
        lastTs = ts;
        if (visibleRef.current) {
          virtual += dt;
        }
      }

      if (phase === "typing") {
        const step = script[stepIdx];
        if (step && step.type === "command") {
          let typedThisFrame = false;
          while (virtual >= nextCharAt && typedChars < step.text.length) {
            typedChars++;
            nextCharAt =
              virtual +
              TYPE_MS_PER_CHAR +
              (Math.random() * 2 - 1) * TYPE_JITTER_MS;
            typedThisFrame = true;
          }
          const stillTyping = typedChars < step.text.length;
          if (typedThisFrame) {
            emit([
              ...emitted.slice(0, -1),
              {
                kind: "command",
                text: step.text.slice(0, typedChars),
                cursor: stillTyping,
              },
            ]);
          }
          if (!stillTyping) {
            emit([
              ...emitted.slice(0, -1),
              { kind: "command", text: step.text, cursor: false },
            ]);
            phase = "pause";
            phaseUntil = virtual + (step.pauseAfter ?? PAUSE_AFTER_COMMAND_MS);
            stepIdx++;
          }
        }
      } else if (phase === "pause") {
        if (virtual >= phaseUntil) {
          startStep();
        }
      } else if (phase === "loop") {
        if (virtual >= phaseUntil) {
          stepIdx = 0;
          emit([]);
          startStep();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, script]);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto"
      role="img"
      aria-label="Animated demonstration of a Watchfire terminal session: init, add tasks, list, then wildfire executes them."
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(224,112,64,0.30), transparent 70%)",
        }}
      />

      <div className="group rounded-xl border border-zinc-700/70 bg-[#16181d] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 hover:border-fire-500/60 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)]">
        <div className="flex items-center gap-2 border-b border-zinc-700/70 px-4 py-2.5">
          <span
            className="h-3 w-3 rounded-full bg-[#ff5f57]"
            aria-hidden="true"
          />
          <span
            className="h-3 w-3 rounded-full bg-[#febc2e]"
            aria-hidden="true"
          />
          <span
            className="h-3 w-3 rounded-full bg-[#28c840]"
            aria-hidden="true"
          />
          <span className="ml-3 truncate font-mono text-[11px] text-zinc-500">
            ~/projects/site — watchfire
          </span>
        </div>

        <div
          ref={bodyRef}
          className="h-[19rem] overflow-x-auto overflow-y-hidden px-4 py-4 font-mono text-[12px] leading-5 text-zinc-200 sm:h-[22rem] sm:text-[13px]"
        >
          {lines.map((line, idx) => {
            if (line.kind === "blank") {
              return (
                <div key={idx} aria-hidden="true">
                  &nbsp;
                </div>
              );
            }
            if (line.kind === "command") {
              return (
                <div key={idx} className="whitespace-pre">
                  <span className="text-fire-400">$</span>{" "}
                  <span className="text-zinc-100">{line.text}</span>
                  {line.cursor && (
                    <span
                      aria-hidden="true"
                      className="terminal-cursor ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-fire-400 align-middle"
                    />
                  )}
                </div>
              );
            }
            return (
              <div key={idx} className="whitespace-pre">
                {line.segments.map((seg, sidx) => (
                  <span key={sidx} className={colorClass(seg.color)}>
                    {seg.text}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
