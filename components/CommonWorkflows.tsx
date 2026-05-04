import Link from "next/link";

const workflows = [
  {
    title: "Drain a queue across projects",
    description:
      "Each project runs one agent at a time, but every project on your machine runs concurrently. Queue ready tasks in three repos and watch them drain in parallel — each on its own worktree, each auto-merging back when it's done.",
    href: "/docs/recipes#run-a-fleet-of-small-fixes-across-projects",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: "Refactor without losing your place",
    description:
      "Hand a long refactor to a task and keep moving on the next thing in chat. The session runs in the background; the transcript and the diff are waiting when you come back, ready to review.",
    href: "/docs/recipes#refactor-a-module-across-multiple-tasks",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Operate a fleet of repos",
    description:
      "The Beacon dashboard rolls every project into one window — what's running, what needs attention, what's done. Slack, Discord, and OS notifications fan out the rest, so you don't have to keep the app open to know.",
    href: "/docs/concepts/integrations",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
        <circle cx="12" cy="12" r="2" />
        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
      </svg>
    ),
  },
  {
    title: "Triage a flood of tasks",
    description:
      "Wildfire mode picks up ready work, refines the drafts, and writes new tasks toward your project definition until the goal is met. Walk away with a backlog; come back to a branch full of completed work.",
    href: "/docs/recipes#set-up-wildfire-for-a-brownfield-project",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
];

export default function CommonWorkflows() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            Common workflows
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            How it shows up in{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              your day
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Concrete moments where Watchfire earns its keep — not features, but the work itself.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {workflows.map((wf) => (
            <Link
              key={wf.title}
              href={wf.href}
              data-stagger
              className="card-hover group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-all hover:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
            >
              <div className="inline-flex w-fit rounded-lg bg-zinc-100 p-2.5 text-zinc-500 transition-all group-hover:bg-fire-500/10 group-hover:text-fire-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-fire-400/10 dark:group-hover:text-fire-300">
                {wf.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                {wf.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {wf.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fire-600 dark:text-fire-300">
                Read more
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
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
