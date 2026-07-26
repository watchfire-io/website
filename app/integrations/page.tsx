import type { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  Code,
  Code2,
  Cpu,
  Edit3,
  FileKey,
  Gem,
  GitBranch,
  GitFork,
  Github,
  KeyRound,
  Lock,
  MousePointer2,
  PlayCircle,
  Shield,
  ShieldCheck,
  ShieldHalf,
  Sparkles,
  TerminalSquare,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";
import {
  integrationCategoryLabels,
  integrationCategoryLeads,
  integrationCategoryOrder,
  integrations,
  integrationStats,
  type Integration,
  type IntegrationIcon,
  type IntegrationStatus,
} from "@/lib/integrations";

const description =
  "Editors, agents, CI, version control, and secret stores that work with Watchfire today.";

const ogImage = buildBlogOgUrl({
  title: "Integrations",
  description,
  section: "Integrations",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Integrations — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/integrations`,
  },
  openGraph: {
    type: "website",
    title: "Integrations — Watchfire",
    description,
    url: `${siteUrl}/integrations`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrations — Watchfire",
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
      name: "Integrations",
      item: `${siteUrl}/integrations`,
    },
  ],
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Watchfire integrations",
  description,
  itemListElement: integrations.map((integration, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: integration.name,
    description: integration.tagline,
    url: `${siteUrl}/integrations/${integration.slug}`,
  })),
};

const iconMap: Record<IntegrationIcon, LucideIcon> = {
  // Agent backend icons
  Sparkles,
  Cpu,
  Code2,
  Gem,
  Github,
  MousePointer2,
  // Non-agent icons
  GitBranch,
  GitFork,
  Box,
  Code,
  TerminalSquare,
  PlayCircle,
  Workflow,
  KeyRound,
  Lock,
  FileKey,
  Shield,
  ShieldCheck,
  ShieldHalf,
  Edit3,
};

const statusLabel: Record<IntegrationStatus, string> = {
  "first-class": "First-class",
  works: "Works",
  planned: "Planned",
};

function StatusPill({ status }: { status: IntegrationStatus }) {
  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider";
  if (status === "first-class") {
    return (
      <span
        className={`${baseClasses} border border-fire-500/40 bg-fire-500/10 text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300`}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-fire-500 dark:bg-fire-400"
        />
        {statusLabel[status]}
      </span>
    );
  }
  if (status === "works") {
    return (
      <span
        className={`${baseClasses} border border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300`}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400"
        />
        {statusLabel[status]}
      </span>
    );
  }
  return (
    <span
      className={`${baseClasses} border border-zinc-300/60 bg-transparent text-zinc-500 dark:border-zinc-700/60 dark:text-zinc-500`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
      />
      {statusLabel[status]}
    </span>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const Icon = iconMap[integration.iconKey];
  const cardClasses =
    "card-hover group scroll-mt-24 flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50";

  return (
    <Link
      id={integration.slug}
      href={`/integrations/${integration.slug}`}
      aria-labelledby={`integration-${integration.slug}-name`}
      className={cardClasses}
    >
      <div id={`integration-${integration.slug}-name`} className="sr-only">
        {integration.name}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <StatusPill status={integration.status} />
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-zinc-900 group-hover:text-fire-700 dark:text-white dark:group-hover:text-fire-300 sm:text-xl">
        {integration.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {integration.tagline}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {integration.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-fire-600 dark:text-fire-400">
        Read more
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

function StatCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <article className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
        {label}
      </p>
      <p className="mt-3 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {caption}
      </p>
    </article>
  );
}

const plannedIntegrations = integrations.filter((i) => i.status === "planned");

export default function IntegrationsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-integrations-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-integrations-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pt-28">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[360px] w-[360px]"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/4 h-[280px] w-[280px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              Local-first by design
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Watchfire integrates
              <br />
              with what you already use.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Watchfire runs the agent you trust against the repo you already
              have, in the editor and shell you already use. Here&rsquo;s what
              works today.
            </p>
          </div>
        </section>

        {/* At-a-glance row */}
        <section className="px-6 pb-12">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            <StatCard
              label="Agents"
              value={String(integrationStats.totalAgents)}
              caption="From Claude Code to Cursor."
            />
            <StatCard
              label="First-class integrations"
              value={String(integrationStats.firstClass)}
              caption="Built-in and tested."
            />
            <StatCard
              label="Categories covered"
              value={String(integrationStats.categories)}
              caption="Editors, agents, CI, secrets, version control."
            />
          </div>
        </section>

        {/* Per-category sections */}
        {integrationCategoryOrder.map((category) => {
          const items = integrations.filter((i) => i.category === category);
          if (items.length === 0) return null;
          return (
            <section
              key={category}
              id={`category-${category}`}
              className="px-6 py-12 sm:py-14"
            >
              <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-3xl">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                    {integrationCategoryLabels[category]}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {integrationCategoryLeads[category]}
                  </p>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((integration) => (
                    <IntegrationCard
                      key={integration.slug}
                      integration={integration}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Honest disclaimer band */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
              What &ldquo;integration&rdquo; actually means here.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              Watchfire is local-first. It doesn&rsquo;t replace your editor,
              your CI, or your secret manager &mdash; it stays out of their way.
              <span className="ml-1 font-semibold text-zinc-900 dark:text-white">
                Works
              </span>{" "}
              means Watchfire cooperates by being a well-behaved CLI;{" "}
              <span className="font-semibold text-fire-600 dark:text-fire-400">
                first-class
              </span>{" "}
              means there&rsquo;s explicit, tested support.
            </p>
          </div>
        </section>

        {/* Don't see yours? */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Don&rsquo;t see yours?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              The list above is what cooperates today. Open a thread in{" "}
              <a
                href="https://github.com/watchfire-io/watchfire/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                GitHub Discussions
              </a>{" "}
              with the tool you&rsquo;re missing and how you&rsquo;d like it to
              fit &mdash; the categories that grow next are the ones people ask
              for.
            </p>
            {plannedIntegrations.length > 0 && (
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Currently on the roadmap:{" "}
                {plannedIntegrations.map((p, i) => (
                  <span key={p.slug}>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {p.name}
                    </span>
                    {i < plannedIntegrations.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
