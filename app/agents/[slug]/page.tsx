import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Code2,
  Cpu,
  Gem,
  MousePointer2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Github } from "@/components/icons/Github";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import {
  agentBackends,
  getAgentBackend,
  type AgentBackendIcon,
} from "@/lib/agent-backends";
import type { BreadcrumbList } from "@/lib/jsonld-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const iconMap: Record<AgentBackendIcon, LucideIcon> = {
  Sparkles,
  Cpu,
  Code2,
  Gem,
  Github,
  MousePointer2,
};

export function generateStaticParams() {
  return agentBackends.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const agent = getAgentBackend(slug);

  if (!agent) {
    return {
      title: "Agent not found — Watchfire",
      description: "This agent backend page does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${agent.name} + Watchfire`;
  const description = `Use ${agent.name} with Watchfire — per-task git worktrees, platform sandbox, and clean transcripts. ${agent.tagline}`;
  const url = `${siteUrl}/agents/${agent.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      title: `${title} | Watchfire`,
      description,
      url,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Watchfire`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function AgentDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const agent = getAgentBackend(slug);
  if (!agent) notFound();

  const Icon = iconMap[agent.icon];

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
      {
        "@type": "ListItem",
        position: 3,
        name: agent.name,
        item: `${siteUrl}/agents/${agent.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id={`ld-agent-${agent.slug}-breadcrumbs`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />

        {/* Header strip */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-start gap-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                  {agent.vendor}
                </span>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                  {agent.name}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  {agent.tagline}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary section */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              What is {agent.name}?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              {agent.summary}
            </p>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Vendor:{" "}
              <a
                href={agent.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                {agent.homepage.replace(/^https?:\/\//, "")}
              </a>
            </p>
          </div>
        </section>

        {/* With Watchfire section */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              {agent.name} + Watchfire
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              {agent.withWatchfire}
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
              <li>
                <Link
                  href="/blog/2026-05-18-isolated-worktrees-per-task"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  Why isolated worktrees per task &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/2026-05-19-how-watchfire-sandboxes-every-agent"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  How Watchfire sandboxes every agent &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/2026-05-19-what-we-measure-when-we-measure-an-agent"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  What we measure when we measure an agent &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/2026-05-18-bring-your-own-agent"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  Bring your own agent &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Install snippet */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Install with {agent.name} as default
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Install Watchfire, then initialise a project that defaults
              to {agent.name}. Make sure the agent CLI is installed and
              authenticated outside Watchfire first.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
              <code>{agent.installCommand}</code>
            </pre>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              See the{" "}
              <Link
                href="/docs/installation"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                installation guide
              </Link>{" "}
              for platform installers and Homebrew taps.
            </p>
          </div>
        </section>

        {/* Quirks */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Interop notes
            </h2>
            <ul className="mt-4 space-y-2 text-base text-zinc-700 dark:text-zinc-300">
              {agent.quirks.map((quirk) => (
                <li key={quirk} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span className="leading-relaxed">{quirk}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTAs */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
                href={agent.docsHref}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
              >
                {agent.name} setup docs
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-link */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-4xl text-center text-sm">
            <Link
              href="/agents"
              className="inline-flex items-center gap-1 text-zinc-500 underline-offset-2 hover:text-fire-600 hover:underline dark:text-zinc-500 dark:hover:text-fire-400"
            >
              See all six backends
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
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
