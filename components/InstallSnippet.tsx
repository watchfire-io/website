"use client";

import { useState } from "react";

export default function InstallSnippet() {
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
    <div className="group relative mt-8 inline-flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50/80 px-5 py-3 font-mono text-sm backdrop-blur transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
      <span className="select-none text-zinc-400 dark:text-zinc-500">$</span>
      <code className="text-zinc-700 dark:text-zinc-300">{command}</code>
      <button
        onClick={copy}
        aria-label="Copy install command"
        className="ml-2 rounded p-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="5" width="8" height="8" rx="1.5" />
            <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
          </svg>
        )}
      </button>
    </div>
  );
}
