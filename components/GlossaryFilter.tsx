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
import type { GlossaryCategoryMeta, GlossaryEntry } from "@/lib/glossary";

export interface GlossaryGroup {
  category: GlossaryCategoryMeta;
  entries: GlossaryEntry[];
}

interface GlossaryFilterProps {
  groups: GlossaryGroup[];
  renderedDefinitions: Record<string, ReactNode>;
  renderedSeeAlso: Record<string, ReactNode>;
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

function entryHaystack(entry: GlossaryEntry): string {
  return [
    entry.term,
    ...(entry.aliases ?? []),
    entry.definition,
  ]
    .join(" ")
    .toLowerCase();
}

export function GlossaryFilter({
  groups,
  renderedDefinitions,
  renderedSeeAlso,
}: GlossaryFilterProps) {
  const [filter, setFilter] = useState(readInitialFilter);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const deferredFilter = useDeferredValue(filter);

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

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const group of groups) {
      const el = document.getElementById(`category-${group.category.id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [groups]);

  const normalizedFilter = deferredFilter.trim().toLowerCase();
  const isFiltering = normalizedFilter.length > 0;

  const visibleGroups = useMemo(() => {
    if (!isFiltering) return groups;
    return groups
      .map((group) => ({
        ...group,
        entries: group.entries.filter((entry) =>
          entryHaystack(entry).includes(normalizedFilter),
        ),
      }))
      .filter((group) => group.entries.length > 0);
  }, [groups, isFiltering, normalizedFilter]);

  const totalMatches = visibleGroups.reduce(
    (acc, group) => acc + group.entries.length,
    0,
  );

  // Scroll to the entry referenced in the URL hash on mount and on subsequent
  // hashchange events.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const apply = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

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
            {groups.map((group) => (
              <a
                key={group.category.id}
                href={`#category-${group.category.id}`}
                className={`${categoryAnchorClass(activeCategory === `category-${group.category.id}`)} whitespace-nowrap`}
              >
                {group.category.title}
              </a>
            ))}
          </div>
        </div>
        <nav
          aria-label="Glossary categories"
          className="hidden rounded-xl border border-zinc-200 bg-white/60 p-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 lg:block"
        >
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Categories
          </p>
          <ul className="flex flex-col gap-0.5">
            {groups.map((group) => (
              <li key={group.category.id}>
                <a
                  href={`#category-${group.category.id}`}
                  className={sidebarLinkClass(
                    activeCategory === `category-${group.category.id}`,
                  )}
                >
                  {group.category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main column: filter + filtered category sections */}
      <div>
        <div className="relative">
          <label htmlFor="glossary-filter" className="sr-only">
            Filter glossary terms
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            id="glossary-filter"
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter terms — e.g. wildfire, worktree, sandbox…"
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
              ? "No terms match that filter."
              : `${totalMatches} term${totalMatches === 1 ? "" : "s"} match.`}
          </p>
        )}

        {visibleGroups.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-zinc-300 bg-white/40 p-10 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
            <p className="text-base font-medium text-zinc-900 dark:text-white">
              No terms match &ldquo;{deferredFilter}&rdquo;.
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Try a shorter substring &mdash; the filter searches term names,
              aliases, and definitions.
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-fire-500/40 bg-fire-500/10 px-3 py-1.5 text-sm font-medium text-fire-700 transition-colors hover:bg-fire-500/15 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-16">
            {visibleGroups.map((group) => (
              <section
                key={group.category.id}
                id={`category-${group.category.id}`}
                aria-labelledby={`category-${group.category.id}-title`}
                className="scroll-mt-24"
              >
                <header>
                  <h2
                    id={`category-${group.category.id}-title`}
                    className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
                  >
                    {group.category.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {group.category.description}
                  </p>
                </header>

                <dl className="mt-6 space-y-4">
                  {group.entries.map((entry) => (
                    <div
                      key={entry.slug}
                      id={entry.slug}
                      className="group/term scroll-mt-24 rounded-xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm transition-colors hover:border-fire-500/30 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30 dark:hover:shadow-[0_0_20px_rgba(224,112,64,0.12)]"
                    >
                      <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="flex items-center gap-1.5">
                          {renderedSeeAlso[`anchor:${entry.slug}`]}
                          <a
                            href={`#${entry.slug}`}
                            className="text-base font-semibold text-zinc-900 hover:text-fire-600 dark:text-white dark:hover:text-fire-400 sm:text-lg"
                          >
                            {entry.term}
                          </a>
                        </span>
                        {entry.aliases && entry.aliases.length > 0 && (
                          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                            also: {entry.aliases.join(", ")}
                          </span>
                        )}
                        {entry.docsHref && (
                          <a
                            href={entry.docsHref}
                            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                          >
                            Docs &rarr;
                          </a>
                        )}
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
                        {renderedDefinitions[entry.slug]}
                      </dd>
                      {entry.seeAlso && entry.seeAlso.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                            See also
                          </span>
                          {renderedSeeAlso[`chips:${entry.slug}`]}
                        </div>
                      )}
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
