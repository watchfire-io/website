"use client";

import { useState } from "react";

export default function InstallSnippet({ dmgUrl }: { dmgUrl: string }) {
  const [copied, setCopied] = useState(false);
  const command = "brew tap watchfire-io/tap && brew install --cask watchfire-io/tap/watchfire";

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
    <div className="mt-8 flex flex-col items-center gap-4 lg:items-start">
      {/* Download button */}
      <a
        href={dmgUrl}
        className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-6 py-3 font-medium text-white transition-colors hover:bg-fire-400"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download for macOS
      </a>

      {/* Homebrew alternative */}
      <div className="flex flex-col items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 lg:items-start">
        <span>or via Homebrew:</span>
        <div className="group inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50/80 px-3 py-1.5 font-mono text-xs backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
          <code className="text-zinc-600 dark:text-zinc-300">{command}</code>
          <button
            onClick={copy}
            aria-label="Copy install command"
            className="shrink-0 text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="8" height="8" rx="1.5" />
                <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
