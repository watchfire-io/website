"use client";

import { useState } from "react";
import { CodeCopyButton } from "@/components/CodeCopyButton";

export type EmbedSnippet = {
  label: string;
  language: string;
  code: string;
};

type Props = {
  snippets: EmbedSnippet[];
  ariaPrefix: string;
};

export function EmbedSnippetTabs({ snippets, ariaPrefix }: Props) {
  const [active, setActive] = useState(0);
  const current = snippets[active] ?? snippets[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label={`${ariaPrefix} snippet format`}
        className="mb-2 flex gap-1.5"
      >
        {snippets.map((snippet, i) => {
          const selected = i === active;
          return (
            <button
              key={snippet.label}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${ariaPrefix}-panel-${i}`}
              id={`${ariaPrefix}-tab-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:focus-visible:ring-fire-400/60 ${
                selected
                  ? "border-fire-500/50 bg-fire-500/10 text-fire-600 dark:border-fire-400/50 dark:bg-fire-400/10 dark:text-fire-300"
                  : "border-zinc-200 bg-white/60 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
              }`}
            >
              {snippet.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${ariaPrefix}-panel-${active}`}
        aria-labelledby={`${ariaPrefix}-tab-${active}`}
      >
        <CodeCopyButton
          code={current.code}
          language={current.language}
          ariaLabel={`Copy ${current.label} snippet for ${ariaPrefix}`}
        />
      </div>
    </div>
  );
}
