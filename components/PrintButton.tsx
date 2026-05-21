"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print this page" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hide inline-flex items-center gap-2 rounded-lg border border-fire-500/40 bg-fire-500/10 px-4 py-2 text-sm font-medium text-fire-700 transition-colors hover:border-fire-500 hover:bg-fire-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300 dark:hover:border-fire-400 dark:hover:bg-fire-400/15"
    >
      <Printer className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
