"use client";

import { useState } from "react";

const lines = [
  { prompt: false, text: "# Install via Homebrew" },
  { prompt: true, text: "brew tap watchfire-io/tap" },
  { prompt: true, text: "brew install --cask watchfire-io/tap/watchfire" },
  { prompt: false, text: "" },
  { prompt: false, text: "# Set up your project and go" },
  { prompt: true, text: "watchfire init" },
  { prompt: true, text: 'watchfire task add "Build the login page"' },
  { prompt: true, text: "watchfire start --all" },
];

export default function FinalCTA({ dmgUrl = "https://github.com/watchfire-io/watchfire/releases/latest" }: { dmgUrl?: string }) {
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
    <section
      className="relative px-6 py-24"
      style={{
        background:
          "linear-gradient(135deg, rgba(224,112,64,0.10) 0%, rgba(226,144,32,0.10) 100%)",
      }}
    >
      {/* Stronger gradient overlay for dark mode */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(135deg, rgba(224,112,64,0.08) 0%, rgba(226,144,32,0.06) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Get started with{" "}
          <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
            Watchfire
          </span>
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Install in seconds. Define tasks. Let agents ship code for you.
        </p>

        {/* Download app — recommended */}
        <a
          href={dmgUrl}
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-fire-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-fire-500/25 transition-all hover:bg-fire-400 hover:shadow-xl hover:shadow-fire-500/30"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download for macOS
        </a>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Recommended — includes GUI, CLI, and daemon
        </p>

        {/* Install command - terminal style */}
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
          <div className="overflow-x-auto space-y-1 p-5 font-mono text-sm">
            {lines.map((line, i) => (
              <div key={i} className={`flex gap-3 ${!line.prompt && !line.text ? "h-4" : ""}`}>
                {line.prompt ? (
                  <>
                    <span className="shrink-0 select-none text-zinc-300 dark:text-zinc-600">$</span>
                    <code className="whitespace-nowrap text-zinc-700 dark:text-zinc-300">{line.text}</code>
                  </>
                ) : line.text ? (
                  <code className="whitespace-nowrap text-zinc-400 dark:text-zinc-500">{line.text}</code>
                ) : null}
              </div>
            ))}
          </div>
        </div>



        {/* Secondary CTA buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/watchfire-io/watchfire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/60 px-6 py-3 font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/60 px-6 py-3 font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  );
}
