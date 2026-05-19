"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Clipboard } from "lucide-react";

type CodeCopyButtonProps = {
  code: string;
  language?: string;
  ariaLabel?: string;
  /**
   * "code" (default) renders inside a `<pre><code>` block in monospace.
   * "prose" renders the content as normal prose with the same copy button
   * affordance — used for taglines and boilerplate paragraphs.
   */
  variant?: "code" | "prose";
};

export function CodeCopyButton({
  code,
  language = "yaml",
  ariaLabel = "Copy code",
  variant = "code",
}: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard write can fail in sandboxed environments — fall back silently.
    }
  }, [code]);

  const button = (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : ariaLabel}
      aria-live="polite"
      className={
        variant === "prose"
          ? "inline-flex items-center gap-1.5 rounded-md border border-zinc-200/70 bg-white/90 px-2.5 py-1.5 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur transition-all hover:border-fire-500/50 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:border-zinc-700/70 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-fire-400 dark:focus-visible:ring-fire-400/60"
          : "absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200/70 bg-white/90 text-zinc-500 opacity-0 shadow-sm backdrop-blur transition-all hover:border-fire-500/50 hover:text-fire-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 group-hover/code:opacity-100 group-focus-within/code:opacity-100 dark:border-zinc-700/70 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-fire-400/50 dark:hover:text-fire-400 dark:focus-visible:ring-fire-400/60"
      }
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          {variant === "prose" && <span>Copied!</span>}
        </>
      ) : (
        <>
          <Clipboard className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {variant === "prose" && <span>Copy</span>}
        </>
      )}
    </button>
  );

  if (variant === "prose") {
    return button;
  }

  return (
    <div className="group/code relative">
      <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-[12.5px] leading-relaxed text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200 sm:text-[13px]">
        <code className={`language-${language} font-mono whitespace-pre`}>
          {code}
        </code>
      </pre>
      {button}
    </div>
  );
}
