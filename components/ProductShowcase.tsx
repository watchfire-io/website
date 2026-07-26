import Link from "next/link";
import GuiLayoutSvg from "@/components/GuiLayoutSvg";

export default function ProductShowcase() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span
            data-stagger
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400"
          >
            The app
          </span>
          <h2
            data-stagger
            className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
          >
            Every project,{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              one window
            </span>
          </h2>
          <p
            data-stagger
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Watchfire.app puts your repos, tasks, branches, and live agent terminals in a single multi-project client — built on the same daemon as the CLI.
          </p>
        </div>

        {/* Hero screenshot */}
        <div data-stagger className="relative mt-14 sm:mt-20">
          {/* Glow blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-12 -top-10 -bottom-10 -z-10"
          >
            <div className="absolute left-[10%] top-1/3 h-[320px] w-[320px] rounded-full bg-fire-500/15 blur-3xl dark:bg-fire-500/25" />
            <div className="absolute right-[12%] top-1/4 h-[260px] w-[260px] rounded-full bg-ember-500/15 blur-3xl dark:bg-ember-500/20" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/components/gui"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fire-500 to-ember-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(224,112,64,0.55)] transition-all hover:shadow-[0_12px_32px_-8px_rgba(224,112,64,0.7)] sm:text-base"
            >
              Tour the GUI
              <svg
                className="transition-transform group-hover:translate-x-0.5"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/docs/installation"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
            >
              Install Watchfire
            </Link>
          </div>
        </div>

        {/* Layout schematic */}
        <div data-stagger className="mt-20 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-[#16181d] p-2 shadow-[0_20px_60px_-20px_rgba(224,112,64,0.25)] dark:border-zinc-800 sm:p-3">
            <GuiLayoutSvg className="block h-auto w-full" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
              Layout
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Three regions,{" "}
              <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
                one window
              </span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              The app is built around a fixed sidebar, an active main view, and a collapsible right panel — so live agent output never crowds out the work you&apos;re reviewing.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md bg-fire-500/15 text-fire-500 dark:bg-fire-400/15 dark:text-fire-300">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="6" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Sidebar</p>
                  <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">Every project, the dashboard, and Settings — always one click away.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md bg-fire-500/15 text-fire-500 dark:bg-fire-400/15 dark:text-fire-300">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="6" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Main content</p>
                  <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">Tasks, Definition, Secrets, Trash, and Settings — plus a built-in terminal docked at the footer.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md bg-fire-500/15 text-fire-500 dark:bg-fire-400/15 dark:text-fire-300">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="6" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Right panel</p>
                  <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">Live Chat, Branches, and Logs. Collapse it when you want focus, pop it back when you need eyes on the agent.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
