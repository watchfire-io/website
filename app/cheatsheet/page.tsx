import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeCopyButton } from "@/components/CodeCopyButton";
import { PrintButton } from "@/components/PrintButton";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const title = "Cheatsheet — Watchfire";
const description =
  "One-page printable reference for Watchfire — every CLI command, TUI keybinding, YAML schema, agent mode, and common gotcha in a single tab.";

const ogImage = buildBlogOgUrl({
  title: "Watchfire cheatsheet",
  description,
  section: "Cheatsheet",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/cheatsheet`,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteUrl}/cheatsheet`,
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Cheatsheet",
      item: `${siteUrl}/cheatsheet`,
    },
  ],
};

type Row = { left: string; right: React.ReactNode };

function MiniTable({ rows }: { rows: Row[] }) {
  return (
    <table className="w-full border-collapse text-[12.5px]">
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={i}
            className="align-top border-b border-zinc-200/70 last:border-b-0 dark:border-zinc-800/70"
          >
            <td className="whitespace-nowrap py-1 pr-3 font-mono text-[11.5px] text-fire-700 dark:text-fire-300">
              {r.left}
            </td>
            <td className="py-1 text-zinc-700 dark:text-zinc-300">{r.right}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SectionCard({
  title,
  href,
  hrefLabel,
  children,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="cheatsheet-card break-inside-avoid rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-5">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-base">
          {title}
        </h2>
        {href ? (
          <Link
            href={href}
            className="print-hide whitespace-nowrap text-[11px] font-medium uppercase tracking-wider text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
          >
            {hrefLabel ?? href}
          </Link>
        ) : null}
      </header>
      {children}
    </article>
  );
}

const taskYaml = `task_id: a1b2c3d4         # 8-char id (daemon assigns)
task_number: 1            # sequential, used for file name
title: "Fix pagination cursor"
agent: ""                 # optional — override project default
prompt: |
  Cursor in lib/paginate.ts returns one fewer row
  than \`limit\` on the first page. Fix + add a
  regression test.
acceptance_criteria: |
  - First page returns exactly \`limit\` rows
  - Existing tests pass
status: ready             # draft | ready | done
success: null             # null (pending) | true | false
failure_reason: ""        # set by agent when success: false
position: 1
agent_sessions: 0
# NEVER write created_at / started_at / completed_at /
# updated_at / deleted_at — the daemon fills these in.
`;

const projectYaml = `project_id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
name: my-project
default_agent: claude-code   # claude-code | codex | opencode |
                             # gemini | copilot | cursor
sandbox: auto                # auto | seatbelt | landlock |
                             # bwrap | none
auto_merge: true             # merge worktree on task done
auto_delete_branch: true     # delete branch after merge
auto_start_tasks: true       # start agent when task = ready
definition: |
  What the project is, the stack, key conventions.
  The agent reads this before every task.
next_task_number: 5
`;

export default function CheatsheetPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="cheatsheet-root pt-16"
      >
        <script
          id="ld-cheatsheet-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-6 pt-16 sm:pt-20">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[300px] w-[300px] print-hide"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/4 h-[240px] w-[240px] print-hide"
            aria-hidden="true"
          />
          <div className="cheatsheet-hero relative mx-auto max-w-6xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="print-hide inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                  One page
                </span>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                  Watchfire cheatsheet.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
                  Every CLI command, TUI binding, YAML field, agent mode, and
                  gotcha in one tab. Print it (
                  <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    ⌘P
                  </kbd>
                  ) and pin it above your monitor, or keep it open while you
                  learn.
                </p>
              </div>
              <PrintButton />
            </div>
            <p className="print-hide mt-3 text-xs text-zinc-500 dark:text-zinc-500">
              Want the long form? Start at{" "}
              <Link
                href="/docs"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /docs
              </Link>
              . Build a task interactively at{" "}
              <Link
                href="/playground"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /playground
              </Link>
              . Look up a term in{" "}
              <Link
                href="/glossary"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /glossary
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 pb-16">
          <div className="cheatsheet-grid mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-3">
            {/* CLI Commands */}
            <SectionCard
              title="CLI commands"
              href="/docs/components/cli"
              hrefLabel="docs →"
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Project
              </p>
              <MiniTable
                rows={[
                  {
                    left: "watchfire init",
                    right: (
                      <>
                        Initialize project in current dir.{" "}
                        <Link
                          href="/docs/commands/init"
                          className="print-hide text-fire-600 hover:underline dark:text-fire-400"
                        >
                          docs
                        </Link>
                      </>
                    ),
                  },
                  {
                    left: "watchfire status",
                    right: (
                      <>
                        Snapshot of project, daemon, active sessions.{" "}
                        <Link
                          href="/docs/commands/status"
                          className="print-hide text-fire-600 hover:underline dark:text-fire-400"
                        >
                          docs
                        </Link>
                      </>
                    ),
                  },
                  {
                    left: "watchfire define",
                    right: "Edit project definition in $EDITOR.",
                  },
                  {
                    left: "watchfire configure",
                    right: "Walk through every project setting.",
                  },
                  {
                    left: "watchfire update",
                    right: "Update all components to the latest release.",
                  },
                  {
                    left: "watchfire version",
                    right: "Show version of every component.",
                  },
                ]}
              />

              <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Tasks
              </p>
              <MiniTable
                rows={[
                  {
                    left: "watchfire task list",
                    right: (
                      <>
                        List tasks (alias <code>task ls</code>). Add{" "}
                        <code>--deleted</code> for soft-deleted.
                      </>
                    ),
                  },
                  {
                    left: "watchfire task add",
                    right: "Create a new task interactively.",
                  },
                  {
                    left: "watchfire task <n>",
                    right: "Edit task by number, interactively.",
                  },
                  {
                    left: "watchfire task delete <n>",
                    right: (
                      <>
                        Soft-delete (alias <code>task rm</code>).
                      </>
                    ),
                  },
                  {
                    left: "watchfire task restore <n>",
                    right: "Un-soft-delete.",
                  },
                ]}
              />

              <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Run agents
              </p>
              <MiniTable
                rows={[
                  {
                    left: "watchfire run",
                    right: "Chat mode (no task).",
                  },
                  {
                    left: "watchfire run <n>",
                    right: "Execute one task in an isolated worktree.",
                  },
                  {
                    left: "watchfire run all",
                    right: "Drain every ready task sequentially.",
                  },
                  {
                    left: "watchfire wildfire",
                    right: (
                      <>
                        Autonomous Execute → Refine → Generate loop (alias{" "}
                        <code>fire</code>).
                      </>
                    ),
                  },
                  {
                    left: "watchfire generate",
                    right: (
                      <>
                        Generate project definition (alias <code>gen</code>).
                      </>
                    ),
                  },
                  {
                    left: "watchfire plan",
                    right: "Generate tasks from definition.",
                  },
                ]}
              />

              <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Daemon &amp; ops
              </p>
              <MiniTable
                rows={[
                  {
                    left: "watchfire daemon start",
                    right: "Start watchfired (usually automatic).",
                  },
                  {
                    left: "watchfire daemon status",
                    right: "Host, port, PID, uptime, active sessions.",
                  },
                  {
                    left: "watchfire daemon stop",
                    right: "SIGTERM — kills every session across projects.",
                  },
                  {
                    left: "watchfire integrations list",
                    right: "List configured outbound adapters.",
                  },
                  {
                    left: "watchfire metrics backfill",
                    right: "Rebuild per-task metrics files.",
                  },
                  {
                    left: "watchfire settings",
                    right: "Manage per-project settings non-interactively.",
                  },
                ]}
              />
            </SectionCard>

            {/* TUI Keybindings */}
            <SectionCard
              title="TUI keybindings"
              href="/docs/keyboard-shortcuts"
              hrefLabel="full list →"
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Global
              </p>
              <MiniTable
                rows={[
                  { left: "Ctrl+q", right: "Quit." },
                  { left: "Ctrl+h", right: "Toggle help overlay." },
                  { left: "Ctrl+g", right: "Global settings overlay." },
                  { left: "Ctrl+f", right: "Fleet (cross-project) insights." },
                  { left: "Ctrl+e", right: "Export report (CSV / Markdown)." },
                  { left: "Ctrl+i", right: "Integrations overlay." },
                  { left: "Tab", right: "Switch left/right panel focus." },
                ]}
              />

              <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Task list
              </p>
              <MiniTable
                rows={[
                  { left: "j / k  ↓ / ↑", right: "Move selection." },
                  { left: "/", right: "Incremental search." },
                  { left: "Shift+↑/↓", right: "Reorder within status group." },
                  { left: "1 / 2 / 3", right: "Tasks · Definition · Settings." },
                ]}
              />

              <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Task actions
              </p>
              <MiniTable
                rows={[
                  { left: "a", right: "Add task." },
                  { left: "e  Enter", right: "Edit task." },
                  { left: "s", right: "Start agent on selected task." },
                  { left: "S", right: "Stop the running agent." },
                  { left: "r", right: "Set status → Ready." },
                  { left: "t", right: "Set status → Draft." },
                  {
                    left: "d",
                    right: "Mark Done · or open diff if already Done.",
                  },
                  { left: "w", right: "Wildfire mode." },
                  { left: "!", right: "Start all ready tasks." },
                  { left: "i", right: "Per-project insights overlay." },
                  { left: "x", right: "Soft-delete selected task." },
                ]}
              />

              <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Right panel
              </p>
              <MiniTable
                rows={[
                  {
                    left: "PgUp / PgDn",
                    right: "Scroll terminal or log content.",
                  },
                  { left: "R", right: "Resume agent after an issue banner." },
                  {
                    left: "Enter / Esc",
                    right: "Open / close log in Logs tab.",
                  },
                ]}
              />

              <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Task form
              </p>
              <MiniTable
                rows={[
                  { left: "Tab", right: "Next field." },
                  { left: "Ctrl+s", right: "Save and close." },
                  { left: "Esc", right: "Cancel." },
                  {
                    left: "Space / Enter",
                    right: "Toggle status · or cycle agent forward.",
                  },
                  { left: "← / →", right: "Cycle agent backend." },
                ]}
              />
            </SectionCard>

            {/* File layout */}
            <SectionCard
              title="File layout"
              href="/docs/concepts/projects-and-tasks"
              hrefLabel="docs →"
            >
              <p className="mb-2 text-[12px] text-zinc-600 dark:text-zinc-400">
                Per-project state lives under{" "}
                <code className="font-mono text-[11.5px]">.watchfire/</code>{" "}
                (gitignored).
              </p>
              <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50/80 p-3 font-mono text-[11.5px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200">
                {`.watchfire/
├── project.yaml         project config (id, default_agent,
│                        sandbox, auto_merge, definition)
├── tasks/               one YAML file per task
│   ├── 0001.yaml
│   └── 0002.yaml
├── memory.md            persistent project knowledge
│                        (agents read + update across sessions)
├── secrets/
│   └── instructions.md  injected into agent system prompt
│                        — API keys, env, CLI auth notes
└── worktrees/
    └── <task_number>/   isolated git worktree, branch
                         watchfire/<task_number>`}
              </pre>
              <p className="mt-3 text-[12px] text-zinc-600 dark:text-zinc-400">
                Global state:{" "}
                <code className="font-mono text-[11.5px]">
                  ~/.watchfire/projects.yaml
                </code>{" "}
                lists every registered project;{" "}
                <code className="font-mono text-[11.5px]">
                  ~/.watchfire/settings.yaml
                </code>{" "}
                holds global defaults and notification preferences.
              </p>
            </SectionCard>

            {/* Task YAML */}
            <SectionCard
              title="Task YAML"
              href="/playground"
              hrefLabel="playground →"
            >
              <p className="mb-2 text-[12px] text-zinc-600 dark:text-zinc-400">
                Save as{" "}
                <code className="font-mono text-[11.5px]">
                  .watchfire/tasks/NNNN.yaml
                </code>
                . Minimum: <code>title</code>, <code>prompt</code>,{" "}
                <code>acceptance_criteria</code>, <code>status</code>.
              </p>
              <CodeCopyButton
                code={taskYaml}
                language="yaml"
                ariaLabel="Copy task YAML"
              />
              <p className="mt-3 text-[11.5px] text-zinc-500 dark:text-zinc-500">
                <strong>status</strong>: <code>draft</code> · <code>ready</code>{" "}
                · <code>done</code>. <strong>success</strong>:{" "}
                <code>null</code> = pending, <code>true</code> = OK,{" "}
                <code>false</code> = explain in <code>failure_reason</code>.
              </p>
            </SectionCard>

            {/* Project YAML */}
            <SectionCard
              title="Project YAML"
              href="/docs/concepts/projects-and-tasks#project-settings"
              hrefLabel="docs →"
            >
              <p className="mb-2 text-[12px] text-zinc-600 dark:text-zinc-400">
                Lives at{" "}
                <code className="font-mono text-[11.5px]">
                  .watchfire/project.yaml
                </code>
                . Created by{" "}
                <code className="font-mono text-[11.5px]">watchfire init</code>.
              </p>
              <CodeCopyButton
                code={projectYaml}
                language="yaml"
                ariaLabel="Copy project YAML"
              />
              <p className="mt-3 text-[11.5px] text-zinc-500 dark:text-zinc-500">
                Agent resolution order: <code>task.agent</code> →{" "}
                <code>project.default_agent</code> → global default →{" "}
                <code>claude-code</code>.
              </p>
            </SectionCard>

            {/* Agent Modes */}
            <SectionCard
              title="Agent modes"
              href="/docs/concepts/agent-modes"
              hrefLabel="docs →"
            >
              <MiniTable
                rows={[
                  {
                    left: "Chat",
                    right:
                      "Interactive session, no task context — agent runs in project root.",
                  },
                  {
                    left: "Task",
                    right:
                      "Execute one task in an isolated worktree on branch watchfire/<n>.",
                  },
                  {
                    left: "Start All",
                    right:
                      "Drain every ready task sequentially; stops on merge conflict.",
                  },
                  {
                    left: "Wildfire",
                    right:
                      "Autonomous Execute → Refine drafts → Generate new tasks loop.",
                  },
                  {
                    left: "Generate Def.",
                    right:
                      "One-shot: analyze codebase and write project.definition.",
                  },
                  {
                    left: "Generate Tasks",
                    right:
                      "One-shot: read definition and create new task files.",
                  },
                ]}
              />
              <p className="mt-3 text-[11.5px] text-zinc-500 dark:text-zinc-500">
                See{" "}
                <Link
                  href="/glossary#wildfire"
                  className="print-hide text-fire-600 hover:underline dark:text-fire-400"
                >
                  /glossary#wildfire
                </Link>{" "}
                for plain-English definitions of every mode.
              </p>
            </SectionCard>

            {/* Gotchas */}
            <SectionCard
              title="Common gotchas"
              href="/docs/troubleshooting"
              hrefLabel="troubleshooting →"
            >
              <ul className="space-y-2 text-[12.5px] leading-snug text-zinc-700 dark:text-zinc-300">
                <li className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>
                    <strong>Never write timestamp fields</strong> in task YAML —{" "}
                    <code>created_at</code>, <code>started_at</code>,{" "}
                    <code>updated_at</code>, etc. are daemon-managed. Empty
                    strings like <code>started_at: &quot;&quot;</code> make the
                    YAML parser reject the file.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>
                    <strong>
                      Never remove <code>.watchfire/</code> from{" "}
                      <code>.gitignore</code>
                    </strong>{" "}
                    — secrets, worktrees, and registered projects must stay out
                    of the repo. Only ever append to <code>.gitignore</code>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>
                    <strong>Secrets never enter git.</strong> Edit{" "}
                    <code>.watchfire/secrets/instructions.md</code> and tell the
                    agent what services are pre-authenticated — don&rsquo;t
                    paste API keys into task prompts. See{" "}
                    <Link
                      href="/docs/concepts/secrets"
                      className="print-hide text-fire-600 hover:underline dark:text-fire-400"
                    >
                      /docs/concepts/secrets
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>
                    <strong>Sandbox blocks credential dirs.</strong> Agents
                    cannot read <code>~/.ssh</code>, <code>~/.aws</code>,{" "}
                    <code>~/.gnupg</code>, <code>~/.netrc</code>, or{" "}
                    <code>.env</code> files. Use the secrets file to pass what
                    they actually need.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>
                    <strong>Don&rsquo;t create or delete worktrees</strong>{" "}
                    yourself. Watchfire manages{" "}
                    <code>.watchfire/worktrees/&lt;n&gt;/</code> and the
                    matching <code>watchfire/&lt;n&gt;</code> branch.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>
                    <strong>Restart protection.</strong> Three consecutive
                    same-task restarts cause Start All / Wildfire to bail to
                    chat mode — usually rate limits or auth. Stop the agent and
                    fix the root cause.
                  </span>
                </li>
              </ul>
            </SectionCard>
          </div>
        </section>

        {/* Footer band */}
        <section className="print-hide px-6 pb-20">
          <div className="mx-auto max-w-3xl text-center text-sm text-zinc-600 dark:text-zinc-400">
            Need more? Read the full{" "}
            <Link
              href="/docs"
              className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
            >
              documentation
            </Link>
            , browse{" "}
            <Link
              href="/templates"
              className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
            >
              task templates
            </Link>
            , or try the{" "}
            <Link
              href="/playground"
              className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
            >
              playground
            </Link>
            .
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
