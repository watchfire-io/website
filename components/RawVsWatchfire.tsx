import Link from "next/link";

type Row = {
  label: string;
  raw: string;
  watchfire: string;
  iconPaths: React.ReactNode;
};

const rows: Row[] = [
  {
    label: "Isolation",
    raw: "Edits land directly on your working tree; one bad refactor and you're fighting git stash.",
    watchfire:
      "Each task runs on its own git worktree and branch. Failed runs leave your main branch untouched.",
    iconPaths: (
      <>
        <line x1="6" x2="6" y1="3" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </>
    ),
  },
  {
    label: "Sandboxing",
    raw: "The agent inherits your shell's PATH, SSH keys, and cloud creds. One prompt-injected command, one bad call.",
    watchfire:
      "Sandboxed by Seatbelt on macOS and Landlock on Linux; ~/.ssh, credential stores, and .git/hooks blocked by default.",
    iconPaths: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
  },
  {
    label: "Parallelism",
    raw: "One repo, one agent, one terminal. Three tasks waiting on the previous to merge.",
    watchfire:
      "Run multiple agents in parallel without merge conflicts. Each task ships when it's ready.",
    iconPaths: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
  },
  {
    label: "Reviewability",
    raw: "Scrollback in your terminal is the only record. Hope you didn't clear it.",
    watchfire:
      "Clean transcripts captured per task; inline diff viewer on the worktree branch; insights track duration, tokens, and cost.",
    iconPaths: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
  },
  {
    label: "Orchestration",
    raw: "You manage what runs when, by hand.",
    watchfire:
      "Wildfire mode runs ready tasks, refines drafts, and generates new ones toward your project definition.",
    iconPaths: (
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    ),
  },
];

function Icon({
  paths,
  struck = false,
}: {
  paths: React.ReactNode;
  struck?: boolean;
}) {
  return (
    <svg
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
      {paths}
      {struck && (
        <line
          x1="4"
          y1="20"
          x2="20"
          y2="4"
          strokeWidth="2.25"
          strokeOpacity="0.9"
        />
      )}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
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
  );
}

export default function RawVsWatchfire() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            Why Watchfire
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            What you get that the{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              raw CLI
            </span>{" "}
            doesn&rsquo;t
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Same agents you&rsquo;d run yourself &mdash; wrapped in the safety
            rails you&rsquo;d otherwise build by hand.
          </p>
        </div>

        {/* Column labels — desktop only */}
        <div className="mt-14 hidden grid-cols-[1fr_3rem_1fr] gap-x-4 px-1 text-[11px] font-medium uppercase tracking-wider sm:grid">
          <div className="text-zinc-500 dark:text-zinc-400">Raw agent CLI</div>
          <div />
          <div className="text-fire-600 dark:text-fire-400">Watchfire</div>
        </div>

        {/* Rows */}
        <div className="relative mt-3 sm:mt-3">
          {/* Subtle vertical fire-gradient divider — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-2 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-fire-500/0 via-fire-500/30 to-fire-500/0 sm:block"
          />

          <div className="space-y-6 sm:space-y-4">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_3rem_1fr] sm:items-stretch sm:gap-x-4"
              >
                {/* Raw card */}
                <div className="card-hover relative flex flex-col rounded-xl border border-zinc-200/80 bg-zinc-100/60 p-5 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/30">
                  <div className="flex items-center gap-2.5">
                    <div className="inline-flex rounded-md bg-zinc-200/70 p-1.5 text-zinc-500 dark:bg-zinc-800/70 dark:text-zinc-500">
                      <Icon paths={row.iconPaths} struck />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {row.label}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
                    {row.raw}
                  </p>
                </div>

                {/* Desktop arrow — sits over the divider */}
                <div
                  className="hidden items-center justify-center text-fire-500 dark:text-fire-400 sm:flex"
                  aria-hidden="true"
                >
                  <span className="rounded-full border border-fire-500/30 bg-white/80 p-1.5 shadow-[0_0_12px_rgba(224,112,64,0.18)] backdrop-blur-sm dark:bg-zinc-950/80">
                    <ArrowIcon />
                  </span>
                </div>

                {/* Mobile divider — between stacked cards */}
                <div
                  className="flex items-center gap-2 px-2 sm:hidden"
                  aria-hidden="true"
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-fire-500/40" />
                  <span className="inline-flex rotate-90 text-fire-500 dark:text-fire-400">
                    <ArrowIcon />
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-fire-500/40" />
                </div>

                {/* Watchfire card */}
                <div className="card-hover group relative flex flex-col rounded-xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm transition-all hover:border-fire-500/40 hover:shadow-[0_0_20px_rgba(224,112,64,0.18)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40">
                  <div className="flex items-center gap-2.5">
                    <div className="inline-flex rounded-md bg-fire-500/10 p-1.5 text-fire-600 transition-colors group-hover:bg-fire-500/15 dark:bg-fire-400/10 dark:text-fire-300">
                      <Icon paths={row.iconPaths} />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-fire-600 dark:text-fire-400">
                      {row.label}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {row.watchfire}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing micro-CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-8">
          <Link
            href="/docs/quickstart"
            className="group inline-flex items-center gap-2 text-sm font-medium text-fire-600 hover:text-fire-700 dark:text-fire-300 dark:hover:text-fire-200 sm:text-base"
          >
            Same agents, safer workflow. Try the quickstart
            <svg
              className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
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
            href="/docs/compare"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-300 sm:text-base"
          >
            See full comparison
            <svg
              className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
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
        </div>
      </div>
    </section>
  );
}
