"use client";

import { useState } from "react";

const lines = [
  { prompt: true, text: "brew install watchfire-io/tap/watchfire" },
  { prompt: true, text: "watchfire init" },
  { prompt: true, text: 'watchfire task add "Build the login page"' },
  { prompt: true, text: "watchfire start --all" },
];

export default function QuickInstall() {
  const [copied, setCopied] = useState(false);

  const fullText = lines.map((l) => l.text).join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may not be available
    }
  }

  return (
    <section className="relative px-6 py-24">
      <div className="absolute inset-0 bg-zinc-50/80 dark:bg-zinc-900/50" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Get Started in Seconds
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Install Watchfire and launch your first agent
        </p>

        <div className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white text-left dark:border-zinc-800 dark:bg-zinc-950">
          {/* Terminal chrome */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>
            <button
              onClick={copy}
              aria-label="Copy commands"
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="5" width="8" height="8" rx="1.5" />
                    <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code lines */}
          <div className="space-y-1 p-5 font-mono text-sm">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="select-none text-zinc-300 dark:text-zinc-600">$</span>
                <code className="text-zinc-700 dark:text-zinc-300">{line.text}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/docs"
            className="inline-flex items-center gap-1.5 text-fire-600 transition-colors hover:text-fire-500 dark:text-fire-400 dark:hover:text-fire-300"
          >
            Read the docs
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
