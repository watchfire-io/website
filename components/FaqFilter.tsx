"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Search, X } from "lucide-react";
import { FaqAnchor } from "@/components/FaqAnchor";
import type { FaqCategory } from "@/lib/faq-page-data";

interface FaqFilterProps {
  categories: FaqCategory[];
  renderedAnswers: Record<string, ReactNode>;
}

function categoryAnchorClass(active: boolean): string {
  return [
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
    active
      ? "border-fire-500/50 bg-fire-500/10 text-fire-700 dark:border-fire-400/50 dark:bg-fire-400/10 dark:text-fire-300"
      : "border-zinc-200 bg-white/70 text-zinc-600 hover:border-fire-500/40 hover:text-fire-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-fire-400/40 dark:hover:text-fire-400",
  ].join(" ");
}

function sidebarLinkClass(active: boolean): string {
  return [
    "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
    active
      ? "bg-fire-500/10 font-medium text-fire-700 dark:bg-fire-400/10 dark:text-fire-300"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-white",
  ].join(" ");
}

function readInitialFilter(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("q") ?? "";
}

export function FaqFilter({ categories, renderedAnswers }: FaqFilterProps) {
  const [filter, setFilter] = useState(readInitialFilter);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const deferredFilter = useDeferredValue(filter);

  // Persist filter value to URL (debounced via useDeferredValue).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (deferredFilter) {
      params.set("q", deferredFilter);
    } else {
      params.delete("q");
    }
    const next = params.toString();
    const hash = window.location.hash;
    const url = `${window.location.pathname}${next ? `?${next}` : ""}${hash}`;
    window.history.replaceState(null, "", url);
  }, [deferredFilter]);

  // Track which category is currently in the viewport for the sidebar.
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const cat of categories) {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [categories]);

  const normalizedFilter = deferredFilter.trim().toLowerCase();
  const isFiltering = normalizedFilter.length > 0;

  const visibleCategories = useMemo(() => {
    if (!isFiltering) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        entries: cat.entries.filter((entry) =>
          entry.question.toLowerCase().includes(normalizedFilter),
        ),
      }))
      .filter((cat) => cat.entries.length > 0);
  }, [categories, isFiltering, normalizedFilter]);

  const totalMatches = visibleCategories.reduce(
    (acc, cat) => acc + cat.entries.length,
    0,
  );

  const handleClear = useCallback(() => setFilter(""), []);

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      {/* Sidebar (desktop) + chip rail (mobile) */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="lg:hidden">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Jump to a category
          </p>
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`${categoryAnchorClass(activeCategory === cat.id)} whitespace-nowrap`}
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
        <nav
          aria-label="FAQ categories"
          className="hidden rounded-xl border border-zinc-200 bg-white/60 p-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 lg:block"
        >
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Categories
          </p>
          <ul className="flex flex-col gap-0.5">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className={sidebarLinkClass(activeCategory === cat.id)}
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main column: filter + filtered category sections */}
      <div>
        <div className="relative">
          <label htmlFor="faq-filter" className="sr-only">
            Search FAQ questions
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            id="faq-filter"
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter questions — e.g. sandbox, aider, wildfire…"
            className="w-full rounded-xl border border-zinc-200 bg-white/80 px-11 py-3 text-[15px] text-zinc-900 placeholder:text-zinc-400 shadow-sm backdrop-blur-sm transition-all hover:border-fire-500/40 focus:border-fire-500/60 focus:outline-none focus:ring-2 focus:ring-fire-500/30 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-white dark:placeholder:text-zinc-500 dark:hover:border-fire-400/40 dark:focus:border-fire-400/60 dark:focus:ring-fire-400/30"
          />
          {filter && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear filter"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
        {isFiltering && (
          <p
            className="mt-3 text-sm text-zinc-500 dark:text-zinc-400"
            role="status"
            aria-live="polite"
          >
            {totalMatches === 0
              ? "No questions match that filter."
              : `${totalMatches} question${totalMatches === 1 ? "" : "s"} match.`}
          </p>
        )}

        <div className="mt-10 space-y-16">
          {visibleCategories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              aria-labelledby={`${cat.id}-title`}
              className="scroll-mt-24"
            >
              <header>
                <h2
                  id={`${cat.id}-title`}
                  className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
                >
                  {cat.title}
                </h2>
                {cat.description && (
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {cat.description}
                  </p>
                )}
              </header>

              <div className="mt-6 space-y-3">
                {cat.entries.map((entry) => (
                  <details
                    key={entry.id}
                    id={entry.id}
                    open={isFiltering}
                    className="group/faq scroll-mt-24 overflow-hidden rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-sm transition-colors hover:border-fire-500/30 open:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30 dark:open:border-fire-400/40 dark:hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] [&[open]>summary>svg.chevron]:rotate-180"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-5 py-4 text-left text-base font-semibold text-zinc-900 marker:hidden dark:text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                      <span className="flex flex-1 items-start gap-2">
                        <FaqAnchor entryId={entry.id} />
                        <span>{entry.question}</span>
                      </span>
                      <svg
                        className="chevron mt-1 shrink-0 text-zinc-400 transition-transform duration-200 group-hover/faq:text-fire-500 dark:group-hover/faq:text-fire-400"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                      {renderedAnswers[entry.id]}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
