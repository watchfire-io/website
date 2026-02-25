"use client";

import { useState } from "react";

export default function FinalCTA() {
  const [copied, setCopied] = useState(false);
  const command = "brew install watchfire-io/tap/watchfire";

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
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

        {/* Install command */}
        <div className="mt-10 flex justify-center">
          <div className="group relative inline-flex items-center gap-3 rounded-lg border border-zinc-200 bg-white/80 px-5 py-3 font-mono text-sm backdrop-blur transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
            <span className="select-none text-zinc-400 dark:text-zinc-500">
              $
            </span>
            <code className="text-zinc-700 dark:text-zinc-300">{command}</code>
            <button
              onClick={copy}
              aria-label="Copy install command"
              className="ml-2 rounded p-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              {copied ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="5" width="8" height="8" rx="1.5" />
                  <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/watchfire-io/watchfire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-6 py-3 font-medium text-white transition-colors hover:bg-fire-400"
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
