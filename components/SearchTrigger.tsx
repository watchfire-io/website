"use client";

import { useSyncExternalStore } from "react";
import { Search } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";

type Variant = "desktop" | "mobile-icon" | "mobile-menu";

interface SearchTriggerProps {
  variant: Variant;
  onActivate?: () => void;
}

const subscribePlatform = () => () => {};

function isMacPlatform() {
  if (typeof navigator === "undefined") return false;
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ??
    navigator.platform ??
    navigator.userAgent ??
    "";
  return /Mac|iPhone|iPad|iPod/i.test(platform);
}

function useMetaKeyLabel() {
  const isMac = useSyncExternalStore(
    subscribePlatform,
    isMacPlatform,
    () => false
  );

  return isMac ? { symbol: "⌘", label: "Command" } : { symbol: "Ctrl", label: "Control" };
}

export function SearchTrigger({ variant, onActivate }: SearchTriggerProps) {
  const { setOpenSearch } = useSearchContext();
  const { symbol, label } = useMetaKeyLabel();

  const handleClick = () => {
    setOpenSearch(true);
    onActivate?.();
  };

  if (variant === "mobile-icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Search"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-fire-300 dark:focus-visible:ring-offset-zinc-950"
      >
        <Search className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
      </button>
    );
  }

  if (variant === "mobile-menu") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="group flex w-full items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left text-sm font-medium text-zinc-500 transition-colors hover:border-fire-500/40 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-fire-400/40 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
      >
        <Search
          className="h-4 w-4 flex-none text-zinc-400 transition-colors group-hover:text-fire-500 dark:group-hover:text-fire-300"
          strokeWidth={2}
          aria-hidden="true"
        />
        <span className="flex-1">Search docs and blog</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Search docs and blog"
      className="group inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:border-fire-500/40 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-fire-400/40 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
    >
      <Search
        className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-fire-500 dark:group-hover:text-fire-300"
        strokeWidth={2}
        aria-hidden="true"
      />
      <span>Search</span>
      <kbd
        aria-label={`${label} K`}
        className="ml-1 inline-flex items-center gap-0.5 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400"
      >
        <span aria-hidden="true">{symbol}</span>
        <span aria-hidden="true">K</span>
      </kbd>
    </button>
  );
}
