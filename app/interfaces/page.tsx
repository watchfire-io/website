import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  BookOpen,
  Check,
  Github,
  Minus,
  MonitorDot,
  Terminal,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const title = "Three surfaces, one daemon — Watchfire";
const description =
  "Watchfire ships a CLI, a TUI, and a GUI on top of the same daemon. Pick the surface that fits the moment — and switch between them whenever you want.";

const ogImage = buildBlogOgUrl({
  title: "Three surfaces, one daemon",
  description,
  section: "Interfaces",
});

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/interfaces`,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteUrl}/interfaces`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

const breadcrumbsLd: BreadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Interfaces",
      item: `${siteUrl}/interfaces`,
    },
  ],
};

type Surface = {
  id: "cli" | "tui" | "gui";
  name: string;
  tagline: string;
  icon: React.ReactNode;
  bestFor: string[];
  notGreatFor: string[];
  launchLabel: string;
  launchSnippet: string;
  href: string;
  hrefLabel: string;
};

const surfaces: Surface[] = [
  {
    id: "cli",
    name: "CLI",
    tagline: "Scripted, pipeable, automation-first.",
    icon: <Terminal className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
    bestFor: [
      "Adding tasks from a shell pipeline or git hook.",
      "Driving runs from CI or a Makefile.",
      "Headless servers and remote dev boxes.",
      "Anyone who already lives behind an alias.",
    ],
    notGreatFor: [
      "Watching multiple projects at once.",
      "Reviewing diffs visually.",
      "Drag-to-reorder a long task list.",
    ],
    launchLabel: "Add a task",
    launchSnippet: "watchfire task add",
    href: "/docs/components/cli",
    hrefLabel: "CLI / TUI docs",
  },
  {
    id: "tui",
    name: "TUI",
    tagline: "Split-pane control, no mouse required.",
    icon: <MonitorDot className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
    bestFor: [
      "Driving Watchfire end-to-end inside a terminal.",
      "Watching live agent output while editing tasks.",
      "Working over SSH on a remote machine.",
      "Keyboard-only workflows with vim-style bindings.",
    ],
    notGreatFor: [
      "Switching across many registered projects.",
      "Rich diff review with file-by-file scroll.",
      "Drag-and-drop ergonomics.",
    ],
    launchLabel: "Launch TUI",
    launchSnippet: "watchfire",
    href: "/docs/components/cli",
    hrefLabel: "CLI / TUI docs",
  },
  {
    id: "gui",
    name: "GUI",
    tagline: "Multi-project desktop client.",
    icon: <AppWindow className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
    bestFor: [
      "Watching every registered project from one window.",
      "Reviewing inline diffs in the Inspect tab.",
      "Drag-to-reorder, point-and-click task editing.",
      "Leaving a tray icon running in the background.",
    ],
    notGreatFor: [
      "Headless servers — there is no display.",
      "Scripting from a shell pipeline.",
      "Driving runs from CI.",
    ],
    launchLabel: "Open the app",
    launchSnippet: "open -a Watchfire",
    href: "/docs/components/gui",
    hrefLabel: "GUI docs",
  },
];

type Cell =
  | { kind: "yes"; note?: string }
  | { kind: "partial"; note?: string }
  | { kind: "no"; note?: string };

type MatrixRow = {
  capability: string;
  cli: Cell;
  tui: Cell;
  gui: Cell;
};

const matrix: MatrixRow[] = [
  {
    capability: "Scriptable / pipeable",
    cli: { kind: "yes", note: "Single binary, exits cleanly." },
    tui: { kind: "no", note: "Interactive only." },
    gui: { kind: "no", note: "Desktop app, no stdin." },
  },
  {
    capability: "Live terminal output streaming",
    cli: { kind: "partial", note: "Inline when you run a task; no split view." },
    tui: { kind: "yes", note: "Right pane streams the agent PTY." },
    gui: { kind: "yes", note: "Chat panel streams from the daemon." },
  },
  {
    capability: "Multi-project switching",
    cli: { kind: "no", note: "Project-scoped to the cwd." },
    tui: { kind: "partial", note: "Project-scoped; Ctrl+F opens a fleet rollup." },
    gui: { kind: "yes", note: "Sidebar lists every registered project." },
  },
  {
    capability: "System tray presence",
    cli: { kind: "no" },
    tui: { kind: "partial", note: "Receives focus events from the daemon tray." },
    gui: { kind: "yes", note: "Native tray client — clicks open the GUI." },
  },
  {
    capability: "Works over SSH / headless",
    cli: { kind: "yes" },
    tui: { kind: "yes", note: "Runs in any 256-color terminal." },
    gui: { kind: "no", note: "Electron app — needs a display." },
  },
  {
    capability: "Drag-and-drop reordering",
    cli: { kind: "no" },
    tui: { kind: "no" },
    gui: { kind: "yes", note: "GripVertical handle on active tasks." },
  },
  {
    capability: "Built-in chat mode",
    cli: { kind: "yes", note: "watchfire run." },
    tui: { kind: "yes", note: "Chat tab." },
    gui: { kind: "yes", note: "Chat panel." },
  },
  {
    capability: "Wildfire mode launcher",
    cli: { kind: "yes", note: "watchfire wildfire (alias fire)." },
    tui: { kind: "partial", note: "Falls back to the CLI command." },
    gui: { kind: "yes", note: "Toolbar button above the terminal." },
  },
  {
    capability: "File-watching auto-merge surfacing",
    cli: { kind: "no", note: "Daemon does it; no live view." },
    tui: { kind: "partial", note: "Task status updates as the daemon fires." },
    gui: { kind: "yes", note: "Branches tab shows merge/conflict state." },
  },
];

function CellIcon({ cell }: { cell: Cell }) {
  if (cell.kind === "yes") {
    return (
      <Check
        className="h-4 w-4 text-fire-500 dark:text-fire-400"
        strokeWidth={2.5}
        aria-label="Yes"
      />
    );
  }
  if (cell.kind === "partial") {
    return (
      <span
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-amber-500/60 bg-amber-500/10 text-[10px] font-semibold text-amber-600 dark:border-amber-400/60 dark:bg-amber-400/10 dark:text-amber-300"
        aria-label="Partial"
      >
        ~
      </span>
    );
  }
  return (
    <Minus
      className="h-4 w-4 text-zinc-400 dark:text-zinc-600"
      strokeWidth={2.5}
      aria-label="No"
    />
  );
}

function MatrixCell({ cell }: { cell: Cell }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <CellIcon cell={cell} />
      {cell.note ? (
        <span className="text-[12px] leading-snug text-zinc-500 dark:text-zinc-500">
          {cell.note}
        </span>
      ) : null}
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}

export default function InterfacesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-interfaces-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pt-28">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[360px] w-[360px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              Interfaces
            </span>
            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
              Three surfaces, one daemon.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.95em] text-fire-700 dark:bg-zinc-800 dark:text-fire-300">
                watchfired
              </code>{" "}
              is the engine. The CLI, the TUI, and Watchfire.app are
              interchangeable front-ends that all talk to it over gRPC. Pick
              the one that fits the moment &mdash; you can mix them whenever
              you want.
            </p>
            <p className="mt-6 border-l-2 border-fire-500/60 pl-4 text-[17px] italic leading-relaxed text-zinc-700 dark:border-fire-400/60 dark:text-zinc-300">
              Start a task in the CLI, watch it stream in the TUI, review the
              diff in the GUI &mdash; same daemon, same state, no sync.
            </p>
          </div>
        </section>

        <Divider />

        {/* Three-up card row */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {surfaces.map((s) => (
                <article
                  key={s.id}
                  className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                      {s.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                        {s.name}
                      </h2>
                      <p className="text-[13px] leading-snug text-zinc-500 dark:text-zinc-400">
                        {s.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                      Best for
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {s.bestFor.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 flex-none text-fire-500 dark:text-fire-400"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Not great for
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {s.notGreatFor.map((n) => (
                        <li key={n} className="flex gap-2">
                          <Minus
                            className="mt-0.5 h-3.5 w-3.5 flex-none text-zinc-400 dark:text-zinc-600"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {s.launchLabel}
                    </p>
                    <pre className="mt-2 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-[13px] text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200">
                      <code>{s.launchSnippet}</code>
                    </pre>
                  </div>

                  <div className="mt-auto flex items-center pt-6">
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                    >
                      {s.hrefLabel}
                      <ArrowRight
                        className="h-3.5 w-3.5"
                        strokeWidth={2.25}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Decision matrix */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Decision matrix
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                Capabilities the three surfaces actually deliver today. Partial
                (~) means the surface technically does the thing but with a
                caveat &mdash; the cell says which.
              </p>
            </div>

            {/* Desktop table */}
            <div className="mt-10 hidden overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 md:block">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/60">
                  <tr>
                    <th
                      scope="col"
                      className="w-[34%] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                    >
                      Capability
                    </th>
                    <th
                      scope="col"
                      className="w-[22%] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400"
                    >
                      CLI
                    </th>
                    <th
                      scope="col"
                      className="w-[22%] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400"
                    >
                      TUI
                    </th>
                    <th
                      scope="col"
                      className="w-[22%] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400"
                    >
                      GUI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, i) => (
                    <tr
                      key={row.capability}
                      className={
                        i % 2 === 0
                          ? "bg-white/40 dark:bg-zinc-900/30"
                          : "bg-zinc-50/60 dark:bg-zinc-900/60"
                      }
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 text-left align-top font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        {row.capability}
                      </th>
                      <td className="px-5 py-4 align-top">
                        <MatrixCell cell={row.cli} />
                      </td>
                      <td className="px-5 py-4 align-top">
                        <MatrixCell cell={row.tui} />
                      </td>
                      <td className="px-5 py-4 align-top">
                        <MatrixCell cell={row.gui} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked cards */}
            <div className="mt-10 grid gap-4 md:hidden">
              {matrix.map((row) => (
                <article
                  key={row.capability}
                  className="rounded-xl border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {row.capability}
                  </h3>
                  <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2.5 text-[13px]">
                    <dt className="font-mono text-xs uppercase text-fire-600 dark:text-fire-400">
                      CLI
                    </dt>
                    <dd>
                      <MatrixCell cell={row.cli} />
                    </dd>
                    <dt className="font-mono text-xs uppercase text-fire-600 dark:text-fire-400">
                      TUI
                    </dt>
                    <dd>
                      <MatrixCell cell={row.tui} />
                    </dd>
                    <dt className="font-mono text-xs uppercase text-fire-600 dark:text-fire-400">
                      GUI
                    </dt>
                    <dd>
                      <MatrixCell cell={row.gui} />
                    </dd>
                  </dl>
                </article>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
              <Check
                className="inline h-3.5 w-3.5 text-fire-500 dark:text-fire-400"
                strokeWidth={2.5}
                aria-hidden="true"
              />{" "}
              yes &nbsp;&middot;&nbsp; <span className="font-mono">~</span>{" "}
              partial (see caveat) &nbsp;&middot;&nbsp;{" "}
              <Minus
                className="inline h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600"
                strokeWidth={2.5}
                aria-hidden="true"
              />{" "}
              not in this surface
            </p>
          </div>
        </section>

        <Divider />

        {/* Persona prose */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Which should I use?
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                  <Terminal
                    className="h-4 w-4 text-fire-500 dark:text-fire-400"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  &ldquo;I script everything.&rdquo;
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Reach for the CLI. Every command exits with a code, prints
                  to stdout, and slots into your existing shell pipelines, git
                  hooks, and CI jobs. If your reflex is to write{" "}
                  <code className="rounded bg-zinc-100 px-1 font-mono text-[0.95em] text-fire-700 dark:bg-zinc-800 dark:text-fire-300">
                    watchfire task add &lt; spec.md
                  </code>{" "}
                  rather than open an app, this is your surface.
                </p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                  <MonitorDot
                    className="h-4 w-4 text-fire-500 dark:text-fire-400"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  &ldquo;I live in my terminal.&rdquo;
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Launch the TUI. One binary, zero mouse, full keyboard
                  navigation, and the agent PTY streaming in the right pane
                  while you edit tasks on the left. It works the same over
                  SSH on a remote dev box as it does on your laptop.
                </p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                  <AppWindow
                    className="h-4 w-4 text-fire-500 dark:text-fire-400"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  &ldquo;I want a desktop app I can leave open.&rdquo;
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Install Watchfire.app. The sidebar lists every registered
                  project, the dashboard rolls up cross-project activity, and
                  the tray icon stays alive in the menu bar so a finishing
                  task can ping you while you&apos;re in another window.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Mix-and-match */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Mix and match
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              All three surfaces talk to the same daemon, so they share state
              in real time. There&apos;s no &ldquo;CLI mode&rdquo; vs.
              &ldquo;GUI mode&rdquo; &mdash; a task added in one shows up in
              the others without a refresh, and a running agent streams to
              whichever client is listening.
            </p>

            <ol className="mt-8 space-y-5">
              <li className="rounded-xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-fire-500/40 bg-fire-500/10 font-mono text-xs font-semibold text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                    1
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Add a task in the CLI.
                  </h3>
                </div>
                <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 font-mono text-[13px] text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200">
                  <code>$ watchfire task add</code>
                </pre>
              </li>

              <li className="rounded-xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-fire-500/40 bg-fire-500/10 font-mono text-xs font-semibold text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                    2
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Watch it stream in the TUI.
                  </h3>
                </div>
                <p className="mt-2 pl-10 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Open the TUI in the same project, press{" "}
                  <code className="rounded bg-zinc-100 px-1 font-mono text-[0.95em] text-fire-700 dark:bg-zinc-800 dark:text-fire-300">
                    s
                  </code>{" "}
                  on the new task, and the right pane streams the agent PTY
                  as the daemon spawns the worktree.
                </p>
              </li>

              <li className="rounded-xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-fire-500/40 bg-fire-500/10 font-mono text-xs font-semibold text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                    3
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Review the diff in the GUI.
                  </h3>
                </div>
                <p className="mt-2 pl-10 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  When the run finishes, click into the project from
                  Watchfire.app, jump to the Inspect tab, and scroll the
                  file-by-file diff before merging. The tray icon will have
                  already nudged you that the task is done.
                </p>
              </li>
            </ol>

            <p className="mt-8 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              You don&apos;t have to commit to a surface. Pick the one
              that&apos;s closest to your hands right now &mdash; the daemon
              keeps the rest in sync.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/components/daemon"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <BookOpen
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                How the daemon ties them together
              </Link>
              <a
                href="https://github.com/watchfire-io/watchfire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <Github
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Source on GitHub
              </a>
            </div>
          </div>
        </section>

        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
