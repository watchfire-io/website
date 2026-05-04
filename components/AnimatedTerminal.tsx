"use client";

import dynamic from "next/dynamic";

export type { TerminalLine, AnsiColor } from "./AnimatedTerminal.script";

// Static chrome shown until the typing engine hydrates. Matches the live
// component's outer frame so the layout (and the LCP candidate around it)
// doesn't shift when the JS for the animation loads.
function TerminalChrome() {
  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      role="img"
      aria-label="Watchfire terminal session: init, add tasks, list, then wildfire executes them."
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(224,112,64,0.30), transparent 70%)",
        }}
      />
      <div className="group rounded-xl border border-zinc-700/70 bg-[#16181d] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-zinc-700/70 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-3 truncate font-mono text-[11px] text-zinc-500">
            ~/projects/site — watchfire
          </span>
        </div>
        <div
          className="h-[19rem] px-4 py-4 font-mono text-[12px] leading-5 text-zinc-200 sm:h-[22rem] sm:text-[13px]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

const AnimatedTerminalInternal = dynamic(
  () => import("./AnimatedTerminalInternal"),
  { ssr: false, loading: () => <TerminalChrome /> },
);

export default AnimatedTerminalInternal;
