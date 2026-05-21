import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TuiPreviewSvg from "@/components/TuiPreviewSvg";
import GuiLayoutSvg from "@/components/GuiLayoutSvg";
import TourStepIndicator from "@/components/TourStepIndicator";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList, HowTo } from "@/lib/jsonld-types";

const title = "Tour — Watchfire";
const description =
  "A two-minute guided walkthrough of Watchfire. See the project file, the task lifecycle, the TUI, every agent mode, and the multi-project GUI — one screen at a time.";

const ogImage = buildBlogOgUrl({
  title: "Take the Watchfire tour",
  description,
  section: "Tour",
});

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/tour`,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteUrl}/tour`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

const tourSteps = [
  { id: "step-1", label: "Define" },
  { id: "step-2", label: "Add tasks" },
  { id: "step-3", label: "TUI" },
  { id: "step-4", label: "Modes" },
  { id: "step-5", label: "Watch it run" },
  { id: "step-6", label: "Multi-project" },
];

const breadcrumbsLd: BreadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tour",
      item: `${siteUrl}/tour`,
    },
  ],
};

const howToLd: HowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "A two-minute tour of Watchfire",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Define your project",
      text: "Run watchfire init to write a project.yaml with a default agent, sandbox policy, auto-merge behavior, and a plain-English definition the agent reads on every task.",
      url: `${siteUrl}/tour#step-1`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Add tasks",
      text: "Describe each unit of work in a task YAML — title, prompt, acceptance_criteria, status. Tasks flow draft → ready → done.",
      url: `${siteUrl}/tour#step-2`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Launch the TUI",
      text: "Open the TUI to browse tasks, switch projects, and watch the live agent terminal. Every panel is keyboard-driven.",
      url: `${siteUrl}/tour#step-3`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Pick an agent mode",
      text: "Choose Chat, Task, Start All, Wildfire, Generate Definition, or Generate Tasks. Each one wires the agent to a different scope of work.",
      url: `${siteUrl}/tour#step-4`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Watch it run",
      text: "The daemon spins up one git worktree per task on watchfire/<n>, sandboxes the agent, streams its terminal, and merges the branch back to main when it's done.",
      url: `${siteUrl}/tour#step-5`,
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Manage every project at once",
      text: "Open Watchfire.app to switch between projects, follow live agent transcripts, and inspect open branches from one window.",
      url: `${siteUrl}/tour#step-6`,
    },
  ],
};

const projectYamlSnippet = `# .watchfire/project.yaml
project_id: a1b2c3d4-e5f6-...
name: my-project
default_agent: claude-code
sandbox: auto
auto_merge: true
auto_start_tasks: true
definition: |
  Marketing site for Watchfire.
  Next.js + Tailwind. Fire palette.
  Reuse existing SVG components.
next_task_number: 5`;

const taskYamlSnippet = `# .watchfire/tasks/0042.yaml
task_id: a1b2c3d4
task_number: 42
title: "Fix pagination cursor"
prompt: |
  Cursor in lib/paginate.ts returns one
  fewer row than \`limit\` on the first
  page. Fix + add a regression test.
acceptance_criteria: |
  - First page returns exactly \`limit\` rows
  - Existing tests pass
status: ready
position: 1`;

const annotationDot = (
  <span
    aria-hidden="true"
    className="absolute -left-3 top-2 hidden h-1.5 w-1.5 rounded-full bg-fire-500 sm:inline-block dark:bg-fire-400"
  />
);

interface CalloutProps {
  index: number;
  title: string;
  children: React.ReactNode;
}

function Callout({ index, title, children }: CalloutProps) {
  return (
    <figcaption className="relative rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      {annotationDot}
      <div className="flex items-baseline gap-2">
        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md bg-fire-500/15 px-1.5 text-[10px] font-semibold text-fire-600 dark:bg-fire-400/15 dark:text-fire-300">
          {index}
        </span>
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="mt-1.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </figcaption>
  );
}

interface StepShellProps {
  id: string;
  number: number;
  label: string;
  heading: string;
  intro: string;
  visual: React.ReactNode;
  callouts: React.ReactNode;
}

function StepShell({
  id,
  number,
  label,
  heading,
  intro,
  visual,
  callouts,
}: StepShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            Step {number}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {label}
          </span>
        </div>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
        >
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>

        <figure className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-zinc-50 to-zinc-100 p-3 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
            {visual}
          </div>
          <div className="flex flex-col gap-3">{callouts}</div>
        </figure>
      </div>
    </section>
  );
}

const agentModes = [
  {
    name: "Chat",
    summary: "Interactive session in the project root — pair-program, ask, iterate.",
  },
  {
    name: "Task",
    summary: "Run one task in its own worktree on branch watchfire/<n>.",
  },
  {
    name: "Start All",
    summary: "Drain every ready task sequentially, one worktree per task.",
  },
  {
    name: "Wildfire",
    summary: "Autonomous loop — execute, refine drafts, generate new tasks, repeat.",
    highlight: true,
  },
  {
    name: "Generate Definition",
    summary: "One-shot: scan the codebase and write project.definition.",
  },
  {
    name: "Generate Tasks",
    summary: "One-shot: read the definition and create new task files.",
  },
];

function YamlBlock({ code, label }: { code: string; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950/70"
    >
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        <span className="inline-block h-2 w-2 rounded-full bg-fire-500/70 dark:bg-fire-400/70" />
        YAML
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed text-zinc-800 dark:text-zinc-200">
        {code}
      </pre>
    </div>
  );
}

function WorktreeDiagram() {
  return (
    <svg
      viewBox="0 0 460 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="wt-title wt-desc"
      className="h-full w-full"
    >
      <title id="wt-title">Watchfire daemon orchestrating worktrees</title>
      <desc id="wt-desc">
        A schematic of the Watchfire daemon at the center coordinating three
        isolated git worktrees, each on its own branch, all branching off main.
      </desc>
      <defs>
        <linearGradient id="wt-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22262f" />
          <stop offset="100%" stopColor="#16181d" />
        </linearGradient>
        <linearGradient id="wt-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e07040" />
          <stop offset="100%" stopColor="#e29020" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="460" height="280" rx="14" fill="url(#wt-bg)" />

      {/* Main branch line */}
      <line
        x1="40"
        y1="50"
        x2="420"
        y2="50"
        stroke="#52525b"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <text
        x="40"
        y="36"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        fill="#a1a1aa"
        letterSpacing="0.5"
      >
        main
      </text>
      <circle cx="60" cy="50" r="5" fill="#22c55e" />
      <circle cx="420" cy="50" r="5" fill="#22c55e" />

      {/* Daemon node */}
      <g transform="translate(190 100)">
        <rect
          x="0"
          y="0"
          width="80"
          height="44"
          rx="10"
          fill="url(#wt-accent)"
          opacity="0.95"
        />
        <text
          x="40"
          y="22"
          fontSize="11"
          fontFamily="Outfit, sans-serif"
          fontWeight="600"
          fill="#fff5e6"
          textAnchor="middle"
        >
          watchfired
        </text>
        <text
          x="40"
          y="36"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fill="#fff5e6"
          opacity="0.85"
          textAnchor="middle"
        >
          conductor
        </text>
      </g>

      {/* Lines from main to daemon */}
      <line x1="230" y1="50" x2="230" y2="100" stroke="#3f3f46" strokeWidth="1" />

      {/* Worktree branches */}
      {[
        { x: 70, label: "watchfire/0061", status: "done", color: "#22c55e" },
        { x: 220, label: "watchfire/0062", status: "running", color: "#e07040" },
        { x: 370, label: "watchfire/0063", status: "ready", color: "#a1a1aa" },
      ].map((branch, i) => {
        const x = branch.x;
        return (
          <g key={i}>
            {/* Branch arc from daemon */}
            <path
              d={`M 230 144 Q 230 180 ${x} 200`}
              stroke="#3f3f46"
              strokeWidth="1"
              fill="none"
            />
            {/* Worktree box */}
            <rect
              x={x - 50}
              y="200"
              width="100"
              height="56"
              rx="8"
              fill="#1c1f26"
              stroke={branch.color}
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <circle cx={x - 36} cy="216" r="4" fill={branch.color} />
            <text
              x={x - 26}
              y="220"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="#fafafa"
            >
              {branch.label}
            </text>
            <text
              x={x - 36}
              y="240"
              fontSize="8"
              fontFamily="Outfit, sans-serif"
              fill="#71717a"
            >
              isolated worktree
            </text>
            <text
              x={x + 38}
              y="252"
              fontSize="8"
              fontFamily="Outfit, sans-serif"
              fill={branch.color}
              textAnchor="end"
            >
              {branch.status}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StatusFlowSvg() {
  return (
    <svg
      viewBox="0 0 460 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="sf-title"
      className="w-full"
    >
      <title id="sf-title">Task status flow: draft, ready, done</title>
      <defs>
        <marker
          id="sf-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#e07040" />
        </marker>
      </defs>

      {[
        { x: 50, color: "#a1a1aa", border: "#52525b", label: "draft" },
        { x: 230, color: "#f0a070", border: "#e07040", label: "ready" },
        { x: 410, color: "#22c55e", border: "#16a34a", label: "done" },
      ].map((s, i) => (
        <g key={i}>
          <rect
            x={s.x - 44}
            y="20"
            width="88"
            height="40"
            rx="8"
            fill="transparent"
            stroke={s.border}
            strokeWidth="1.2"
          />
          <circle cx={s.x - 28} cy="40" r="4.5" fill={s.color} />
          <text
            x={s.x - 14}
            y="44"
            fontSize="11"
            fontFamily="Outfit, sans-serif"
            fontWeight="500"
            fill="#a1a1aa"
          >
            {s.label}
          </text>
        </g>
      ))}

      <line
        x1="94"
        y1="40"
        x2="186"
        y2="40"
        stroke="#e07040"
        strokeWidth="1.5"
        markerEnd="url(#sf-arrow)"
      />
      <line
        x1="274"
        y1="40"
        x2="366"
        y2="40"
        stroke="#e07040"
        strokeWidth="1.5"
        markerEnd="url(#sf-arrow)"
      />

      <text
        x="140"
        y="16"
        fontSize="9"
        fontFamily="Outfit, sans-serif"
        fill="#71717a"
        textAnchor="middle"
      >
        you mark
      </text>
      <text
        x="320"
        y="16"
        fontSize="9"
        fontFamily="Outfit, sans-serif"
        fill="#71717a"
        textAnchor="middle"
      >
        agent finishes
      </text>
    </svg>
  );
}

export default function TourPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-tour-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-tour-howto"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />

        <TourStepIndicator steps={tourSteps} />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-12 pt-16 sm:pt-24">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[360px] w-[360px]"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/4 h-[280px] w-[280px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              ~2 min read
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              A two-minute tour of{" "}
              <span className="bg-gradient-to-r from-fire-400 via-fire-500 to-ember-500 bg-clip-text text-transparent">
                Watchfire
              </span>
              .
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Six annotated screens, one screen per step. By the end you&apos;ll
              know what a project, a task, a worktree, and Wildfire mode are —
              and how the TUI and GUI fit together.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#step-1"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fire-500 to-ember-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(224,112,64,0.35)] transition-transform hover:-translate-y-[1px]"
              >
                Start tour
                <svg
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
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="#whats-next"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-colors hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                Skip to install
              </a>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Step 1 — Define your project */}
        <StepShell
          id="step-1"
          number={1}
          label="Define your project"
          heading="Tell Watchfire what you&rsquo;re building."
          intro="watchfire init drops a project.yaml in your repo. It pins the default agent, the sandbox policy, and a plain-English definition the agent reads on every task — so context arrives the same way every time."
          visual={
            <YamlBlock
              label="Example project.yaml"
              code={projectYamlSnippet}
            />
          }
          callouts={
            <>
              <Callout index={1} title="definition">
                A short brief in your own words — stack, conventions, goals. The
                agent re-reads it on every task, so context doesn&rsquo;t drift.
              </Callout>
              <Callout index={2} title="default_agent">
                Which CLI runs your tasks: <code>claude-code</code>,{" "}
                <code>codex</code>, <code>opencode</code>, <code>gemini</code>,{" "}
                <code>copilot</code>, or <code>cursor</code>. A task can
                override it.
              </Callout>
              <Callout index={3} title="auto_merge">
                When the agent finishes, the worktree branch is merged back into
                main automatically. Set to <code>false</code> to review first.
              </Callout>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-500">
                Full schema in{" "}
                <Link
                  href="/docs/quickstart"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /docs/quickstart
                </Link>
                .
              </p>
            </>
          }
        />

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Step 2 — Add tasks */}
        <StepShell
          id="step-2"
          number={2}
          label="Add tasks"
          heading="Each unit of work is one YAML file."
          intro="A task is a title, a prompt, acceptance criteria, and a status. Tasks flow draft → ready → done. The daemon never starts a draft; only ready tasks get an agent."
          visual={
            <div className="flex flex-col gap-3">
              <YamlBlock label="Example task YAML" code={taskYamlSnippet} />
              <div className="rounded-xl border border-zinc-200 bg-white/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                <StatusFlowSvg />
              </div>
            </div>
          }
          callouts={
            <>
              <Callout index={1} title="prompt">
                What the agent should do. Be specific — point at files, name
                functions, link existing patterns to follow.
              </Callout>
              <Callout index={2} title="acceptance_criteria">
                How the agent (and you) know it&rsquo;s done. Bullet-list the
                user-visible outcomes, not the implementation.
              </Callout>
              <Callout index={3} title="position">
                Sort order in the task list. Start All and Wildfire pick tasks
                in this order.
              </Callout>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-500">
                Build one interactively at{" "}
                <Link
                  href="/playground"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /playground
                </Link>
                , or copy a{" "}
                <Link
                  href="/templates"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  template
                </Link>
                .
              </p>
            </>
          }
        />

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Step 3 — Launch the TUI */}
        <StepShell
          id="step-3"
          number={3}
          label="Launch the TUI"
          heading="Drive the whole thing from the terminal."
          intro="watchfire opens a Bubbletea TUI: task list on the left, live agent terminal on the right, status bar at the bottom. Everything is keyboard-driven and works the same over SSH."
          visual={
            <div className="aspect-[400/280] w-full">
              <TuiPreviewSvg className="h-full w-full" />
            </div>
          }
          callouts={
            <>
              <Callout index={1} title="Task list">
                Every task in the current project, grouped by status. Press{" "}
                <code>j</code>/<code>k</code> to move, <code>s</code> to start
                the selected one.{" "}
                <Link
                  href="/docs/components/cli"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  CLI docs →
                </Link>
              </Callout>
              <Callout index={2} title="Agent terminal">
                The right pane streams the running agent&rsquo;s PTY — exactly
                what you&rsquo;d see if you ran the CLI by hand.{" "}
                <Link
                  href="/docs/keyboard-shortcuts"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  shortcuts →
                </Link>
              </Callout>
              <Callout index={3} title="Status bar">
                Daemon state, current project, and a hint for the next
                keystroke. <code>?</code> opens the full key map.
              </Callout>
              <Callout index={4} title="Project switcher">
                Press <code>Ctrl+f</code> for the cross-project fleet view to
                jump between repos without leaving the TUI.
              </Callout>
            </>
          }
        />

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Step 4 — Pick an agent mode */}
        <section
          id="step-4"
          aria-labelledby="step-4-heading"
          className="scroll-mt-24 px-6 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                Step 4
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Pick an agent mode
              </span>
            </div>
            <h2
              id="step-4-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
            >
              Six modes, one mental model.
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Each mode wires the agent to a different scope of work — from a
              single conversation to a fully autonomous loop. Pick one in the
              TUI with a single keystroke, or pass it to{" "}
              <code className="font-mono text-[13px]">watchfire run</code>.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agentModes.map((mode) => (
                <article
                  key={mode.name}
                  className={`relative rounded-xl border p-5 backdrop-blur-sm transition-colors ${
                    mode.highlight
                      ? "border-fire-500/50 bg-gradient-to-br from-fire-500/10 via-fire-500/5 to-transparent shadow-[0_0_30px_rgba(224,112,64,0.15)] dark:border-fire-400/50"
                      : "border-zinc-200 bg-white/70 hover:border-fire-500/30 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`inline-block h-2 w-2 rounded-full ${
                        mode.highlight
                          ? "bg-fire-500 dark:bg-fire-400"
                          : "bg-zinc-400 dark:bg-zinc-600"
                      }`}
                    />
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {mode.name}
                    </h3>
                    {mode.highlight ? (
                      <span className="ml-auto rounded-full bg-fire-500/15 px-2 py-0.5 text-[10px] font-medium text-fire-600 dark:bg-fire-400/15 dark:text-fire-300">
                        flagship
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {mode.summary}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-6 text-[12px] text-zinc-500 dark:text-zinc-500">
              Plain-English definitions of every mode in{" "}
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

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Step 5 — Watch it run */}
        <StepShell
          id="step-5"
          number={5}
          label="Watch it run"
          heading="One worktree per task. The daemon is the conductor."
          intro="When a task starts, the daemon creates a fresh git worktree on watchfire/<n>, sandboxes the agent inside it, and streams its terminal. When the agent finishes, the branch merges back to main."
          visual={
            <div className="aspect-[460/280] w-full">
              <WorktreeDiagram />
            </div>
          }
          callouts={
            <>
              <Callout index={1} title="Isolated worktrees">
                Each task gets its own directory and branch. Tasks can&rsquo;t
                step on each other&rsquo;s files even when they run in parallel.
              </Callout>
              <Callout index={2} title="Sandboxed agents">
                On macOS the agent runs under <code>sandbox-exec</code>;{" "}
                <code>~/.ssh</code>, <code>~/.aws</code>, and{" "}
                <code>.env</code> are off-limits.
              </Callout>
              <Callout index={3} title="Auto-merge">
                When <code>success: true</code> lands in the task file, the
                daemon merges the branch back to main and deletes the worktree.
              </Callout>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-500">
                Architecture deep-dive:{" "}
                <Link
                  href="/docs/components/daemon"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /docs/components/daemon
                </Link>
                .
              </p>
            </>
          }
        />

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Step 6 — Multi-project GUI */}
        <StepShell
          id="step-6"
          number={6}
          label="Multi-project"
          heading="Run many projects from one window."
          intro="Watchfire.app is an Electron client over the same daemon — a sidebar of projects, the task list and live terminal in the main pane, and a right-side panel for the chat, branches, and logs."
          visual={
            <div className="aspect-[800/460] w-full">
              <GuiLayoutSvg className="h-full w-full" />
            </div>
          }
          callouts={
            <>
              <Callout index={1} title="Project sidebar">
                Every registered project on this machine. Click to switch — the
                main pane reloads with that project&rsquo;s tasks.
              </Callout>
              <Callout index={2} title="Tabs + task list">
                Tasks, Definition, Secrets, Trash, Settings — everything you
                can do from the CLI, with a mouse.
              </Callout>
              <Callout index={3} title="Right panel">
                Pick an agent backend, watch its chat stream, and see open
                branches at a glance. Collapsible when you want more room.
              </Callout>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-500">
                Full GUI walkthrough:{" "}
                <Link
                  href="/docs/components/gui"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /docs/components/gui
                </Link>
                .
              </p>
            </>
          }
        />

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* What's next */}
        <section
          id="whats-next"
          aria-labelledby="whats-next-heading"
          className="relative overflow-hidden px-6 py-20"
        >
          <div
            className="glow-blob glow-blob-fire pointer-events-none -bottom-24 right-[10%] h-[300px] w-[300px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
              That&rsquo;s the tour
            </span>
            <h2
              id="whats-next-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
            >
              What&rsquo;s next?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-zinc-600 dark:text-zinc-400">
              Three ways to keep going — install the binary, read the long
              form, or grab the one-page cheatsheet.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Link
                href="/docs/installation"
                className="group flex flex-col items-start gap-2 rounded-2xl border border-fire-500/40 bg-gradient-to-br from-fire-500/10 via-transparent to-transparent p-6 text-left transition-all hover:border-fire-500 hover:shadow-[0_0_24px_rgba(224,112,64,0.2)] dark:border-fire-400/40 dark:hover:border-fire-400"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-fire-500/15 text-fire-600 dark:bg-fire-400/15 dark:text-fire-300">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </span>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                  Install Watchfire
                </h3>
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Homebrew, Go, or pre-built binaries for macOS and Linux.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-medium text-fire-600 dark:text-fire-400">
                  Install
                  <svg
                    className="transition-transform group-hover:translate-x-0.5"
                    width="12"
                    height="12"
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

              <Link
                href="/docs"
                className="group flex flex-col items-start gap-2 rounded-2xl border border-zinc-200 bg-white/70 p-6 text-left transition-all hover:border-fire-500/40 hover:shadow-[0_0_24px_rgba(224,112,64,0.15)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                </span>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                  Read the docs
                </h3>
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Architecture, concepts, the full command reference, and every
                  schema field explained.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-medium text-fire-600 dark:text-fire-400">
                  Open docs
                  <svg
                    className="transition-transform group-hover:translate-x-0.5"
                    width="12"
                    height="12"
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

              <Link
                href="/cheatsheet"
                className="group flex flex-col items-start gap-2 rounded-2xl border border-zinc-200 bg-white/70 p-6 text-left transition-all hover:border-fire-500/40 hover:shadow-[0_0_24px_rgba(224,112,64,0.15)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="14" y2="17" />
                  </svg>
                </span>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                  See the cheatsheet
                </h3>
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Every CLI command, TUI binding, and YAML field on one
                  printable page.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-medium text-fire-600 dark:text-fire-400">
                  Open cheatsheet
                  <svg
                    className="transition-transform group-hover:translate-x-0.5"
                    width="12"
                    height="12"
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
