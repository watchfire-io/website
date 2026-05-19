import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Cpu,
  Gem,
  Github,
  MousePointer2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import { agentBackends, type AgentBackendIcon } from "@/lib/agent-backends";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Watchfire orchestrates six coding agent backends — Claude Code, Codex, opencode, Gemini CLI, Copilot CLI, and Cursor Agent — through one task model, one worktree-per-task workflow, and one sandbox.";

export const metadata: Metadata = {
  title: "Agent backends — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/agents`,
  },
  openGraph: {
    type: "website",
    title: "Agent backends — Watchfire",
    description,
    url: `${siteUrl}/agents`,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent backends — Watchfire",
    description,
    images: ["/og-image.png"],
  },
};

const iconMap: Record<AgentBackendIcon, LucideIcon> = {
  Sparkles,
  Cpu,
  Code2,
  Gem,
  Github,
  MousePointer2,
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
      name: "Agents",
      item: `${siteUrl}/agents`,
    },
  ],
};

export default function AgentsIndexPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-agents-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />

        {/* Hero */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                Bring your own agent
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                Six backends,
                <br />
                one workflow.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Watchfire is backend-agnostic. Pick the coding agent you
                already use &mdash; Claude Code, Codex, opencode, Gemini
                CLI, Copilot CLI, or Cursor Agent &mdash; and Watchfire
                wraps it in per-task git worktrees, a platform sandbox,
                and clean transcripts. One task model, every backend.
              </p>
            </div>
          </div>
        </section>

        {/* Agent grid */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {agentBackends.map((agent) => {
                const Icon = iconMap[agent.icon];
                return (
                  <Link
                    key={agent.slug}
                    href={`/agents/${agent.slug}`}
                    className="card-hover group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                          {agent.vendor}
                        </span>
                        <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                          {agent.name}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {agent.tagline}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1 text-sm text-fire-600 underline-offset-2 group-hover:underline dark:text-fire-400">
                      Read more
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closer */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              You don&rsquo;t have to pick once. Set a project default,
              keep a global fallback, and override per task whenever
              one backend fits a job better than another.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/docs/quickstart"
                className="shine group inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_15px_40px_rgba(224,112,64,0.4)] sm:text-base"
              >
                Start with the quickstart
                <svg
                  className="transition-transform group-hover:translate-x-0.5"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/docs/concepts/supported-agents"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
              >
                Full backend reference
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
