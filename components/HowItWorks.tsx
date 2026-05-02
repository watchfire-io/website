"use client";

import { useState } from "react";

interface Step {
  number: number;
  title: string;
  description: string;
  autonomous?: boolean;
  icon: React.ReactNode;
}

const manualSteps: Step[] = [
  {
    number: 1,
    title: "watchfire init",
    description: "Define your project and pick a default agent — Claude Code, Codex, opencode, Gemini CLI, or GitHub Copilot CLI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Create tasks",
    description: "Describe what you want built in YAML task files",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Start agents",
    description: "Agents work in isolated git worktrees, one branch per task",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Monitor",
    description: "Watch live terminal output through the TUI or GUI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    number: 5,
    title: "Review & merge",
    description: "Completed work is automatically merged back to your default branch",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 009 9" />
      </svg>
    ),
  },
];

const wildfireSteps: Step[] = [
  {
    number: 1,
    title: "Define your project",
    description: "Run watchfire init, pick your agent backend, and describe what you want to build — Watchfire generates the project definition and initial tasks",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "watchfire wildfire",
    description: "Launch Wildfire mode — a fully autonomous loop that runs without human intervention",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 4-4 6-4 10a4 4 0 008 0c0-4-4-6-4-10z" />
        <path d="M12 18a2 2 0 01-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Execute",
    description: "Agents pick up ready tasks and work on them in isolated git worktrees, one branch per task",
    autonomous: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Refine & generate",
    description: "Once tasks are done, the agent refines draft tasks and generates new ones — then loops back to execute",
    autonomous: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-6.22-8.56" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
  },
  {
    number: 5,
    title: "Auto-merge",
    description: "Completed work is automatically merged back — Wildfire keeps going until there's nothing left to do",
    autonomous: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 009 9" />
      </svg>
    ),
  },
];

type WorkflowMode = "wildfire" | "manual";

const tabs: { key: WorkflowMode; label: string; subtitle: string }[] = [
  { key: "wildfire", label: "Wildfire", subtitle: "Fully autonomous — define your project and let Watchfire handle the rest" },
  { key: "manual", label: "Task by task", subtitle: "Full control — create tasks, start agents, and review each step yourself" },
];

function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <>
      {/* Desktop: horizontal timeline */}
      <div className="relative mt-14 hidden lg:block">
        {/* Connecting line — sits behind the opaque circles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] right-[10%] top-9 h-px bg-fire-500/30 dark:bg-fire-400/25"
        />

        <div className="relative grid grid-cols-5 gap-6">
          {steps.map((step) => (
            <div key={step.number} data-stagger className="relative flex flex-col items-center text-center">
              <div
                className={`relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 transition-transform hover:scale-105 ${
                  step.autonomous
                    ? "border-emerald-500/40 bg-white text-emerald-600 shadow-lg shadow-emerald-500/20 dark:bg-zinc-900 dark:text-emerald-400"
                    : "border-fire-500/40 bg-white text-fire-500 shadow-lg shadow-fire-500/15 dark:bg-zinc-900 dark:text-fire-400"
                }`}
              >
                {step.icon}
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="mt-10 lg:hidden">
        <div className="relative space-y-10 pl-14">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-[1.25rem] top-0 w-px bg-gradient-to-b from-fire-500/40 via-fire-500/20 to-transparent" />

          {steps.map((step) => (
            <div key={step.number} data-stagger className="relative flex items-start gap-4">
              <div
                className={`absolute -left-14 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-lg ${
                  step.autonomous
                    ? "border-emerald-500/40 bg-emerald-50 text-emerald-600 shadow-emerald-500/15 dark:bg-zinc-900 dark:text-emerald-400"
                    : "border-fire-500/30 bg-white text-fire-500 shadow-fire-500/10 dark:bg-zinc-900 dark:text-fire-400"
                }`}
              >
                <span className="text-sm font-bold">{step.number}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{step.title}</h3>
                  {step.autonomous && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-400">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      Auto
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function HowItWorks() {
  const [mode, setMode] = useState<WorkflowMode>("wildfire");

  const activeSteps = mode === "manual" ? manualSteps : wildfireSteps;

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            How it works
          </span>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Two ways to{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              ship code
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
            Full autonomy, or full control — pick whichever fits the job.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMode(tab.key)}
              className={`card-hover flex-1 rounded-xl border px-5 py-4 text-left backdrop-blur-sm transition-all ${
                mode === tab.key
                  ? "border-fire-500/50 bg-gradient-to-br from-fire-500/15 via-fire-500/5 to-transparent shadow-[0_0_30px_rgba(224,112,64,0.15)]"
                  : "border-zinc-200 bg-white/70 dark:border-zinc-700/50 dark:bg-zinc-900/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    mode === tab.key
                      ? "bg-fire-500 shadow-[0_0_8px_rgba(224,112,64,0.8)]"
                      : "bg-zinc-300 dark:bg-zinc-600"
                  }`}
                />
                <span
                  className={`text-sm font-semibold ${
                    mode === tab.key
                      ? "text-fire-600 dark:text-fire-300"
                      : "text-zinc-900 dark:text-white"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
              <p
                className={`mt-1.5 text-xs leading-relaxed ${
                  mode === tab.key
                    ? "text-fire-700/70 dark:text-fire-200/70"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {tab.subtitle}
              </p>
            </button>
          ))}
        </div>

        <StepTimeline steps={activeSteps} />
      </div>
    </section>
  );
}
