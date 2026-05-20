"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Hash } from "lucide-react";

interface FaqAnchorProps {
  entryId: string;
}

export function FaqAnchor({ entryId }: FaqAnchorProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const href = `${window.location.origin}${window.location.pathname}#${entryId}`;
      try {
        await navigator.clipboard.writeText(href);
        if (window.history?.replaceState) {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}#${entryId}`,
          );
        }
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 1800);
      } catch {
        // Clipboard write can fail in sandboxed environments — fall back silently.
      }
    },
    [entryId],
  );

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Link copied" : "Copy link to question"}
      aria-live="polite"
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent text-zinc-400 opacity-0 transition-all hover:border-fire-500/40 hover:bg-fire-500/10 hover:text-fire-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 group-hover/faq:opacity-100 group-focus-within/faq:opacity-100 dark:text-zinc-500 dark:hover:border-fire-400/40 dark:hover:bg-fire-400/10 dark:hover:text-fire-400 dark:focus-visible:ring-fire-400/60"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
      ) : (
        <Hash className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
}
