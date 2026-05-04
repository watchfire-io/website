import Link from "next/link";
import { BookOpen, Rocket, FileClock, Github, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FlameLogo from "@/components/FlameLogo";

const destinations = [
  {
    title: "Documentation",
    description: "Concepts, components, and the full command reference.",
    href: "/docs",
    icon: <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />,
    external: false,
  },
  {
    title: "Quick start",
    description: "Install Watchfire and run your first task in minutes.",
    href: "/docs/quickstart",
    icon: <Rocket className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />,
    external: false,
  },
  {
    title: "Changelog",
    description: "Latest releases, fixes, and what shipped recently.",
    href: "/docs/changelog",
    icon: <FileClock className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />,
    external: false,
  },
  {
    title: "GitHub",
    description: "Source code, issues, and discussions on GitHub.",
    href: "https://github.com/watchfire-io/watchfire",
    icon: <Github className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />,
    external: true,
  },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16 pt-24 sm:px-6 sm:py-24"
      >
        {/* Ambient glow blobs */}
        <div
          className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[360px] w-[360px]"
          aria-hidden="true"
        />
        <div
          className="glow-blob glow-blob-ember pointer-events-none right-[10%] top-1/3 h-[300px] w-[300px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          {/* Flame illustration with ember halo */}
          <div className="relative mb-8 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-fire-500/25 blur-3xl dark:bg-fire-400/30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-4 rounded-full bg-ember-500/20 blur-2xl dark:bg-ember-400/25"
            />
            <FlameLogo size={120} className="relative" title="Watchfire flame" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            404
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            We couldn&apos;t find the page you were after &mdash; it may have moved, or maybe it never existed.
          </p>

          {/* Search redirect — Fumadocs uses ⌘K modal, so we route to /docs and hint */}
          <Link
            href="/docs"
            aria-label="Search the documentation"
            className="group mt-8 inline-flex w-full max-w-md items-center gap-3 rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-left text-sm text-zinc-500 backdrop-blur-sm transition-all hover:border-fire-500/40 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-fire-400/40 dark:hover:text-white"
          >
            <Search className="h-4 w-4 flex-none text-zinc-400 transition-colors group-hover:text-fire-500 dark:group-hover:text-fire-300" strokeWidth={2} aria-hidden="true" />
            <span className="flex-1">Search the documentation</span>
            <kbd className="hidden items-center gap-1 rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 sm:inline-flex">
              <span aria-hidden="true">⌘</span>K
            </kbd>
          </Link>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            Press <kbd className="font-mono">⌘K</kbd> inside the docs to open search.
          </p>

          {/* Destinations grid */}
          <section aria-labelledby="destinations-heading" className="mt-14 w-full">
            <h2
              id="destinations-heading"
              className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Where would you like to go?
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((dest) => {
                const cardClass =
                  "card-hover group relative flex h-full flex-col gap-2 rounded-xl border border-zinc-200 bg-white/70 p-5 text-left backdrop-blur-sm transition-all hover:border-fire-500/40 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40";
                const iconClass =
                  "inline-flex w-fit rounded-lg bg-zinc-100 p-2 text-zinc-500 transition-all group-hover:bg-fire-500/10 group-hover:text-fire-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-fire-400/10 dark:group-hover:text-fire-300";
                const titleClass =
                  "text-base font-semibold text-zinc-900 dark:text-white";
                const descClass =
                  "text-sm leading-relaxed text-zinc-600 dark:text-zinc-400";

                return (
                  <li key={dest.title}>
                    {dest.external ? (
                      <a
                        href={dest.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardClass}
                      >
                        <div className={iconClass}>{dest.icon}</div>
                        <h3 className={titleClass}>{dest.title}</h3>
                        <p className={descClass}>{dest.description}</p>
                      </a>
                    ) : (
                      <Link href={dest.href} className={cardClass}>
                        <div className={iconClass}>{dest.icon}</div>
                        <h3 className={titleClass}>{dest.title}</h3>
                        <p className={descClass}>{dest.description}</p>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Lightweight CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium text-fire-600 transition-colors hover:text-fire-700 dark:text-fire-300 dark:hover:text-fire-200"
            >
              &larr; Back to home
            </Link>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link
              href="/docs"
              className="font-medium text-zinc-600 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-300"
            >
              Documentation
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
