import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Box,
  Code,
  Code2,
  Cpu,
  Edit3,
  ExternalLink,
  FileKey,
  Gem,
  GitBranch,
  GitFork,
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
import { Github } from "@/components/icons/Github";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";
import {
  getIntegration,
  getRelatedIntegrations,
  integrationCategoryLabels,
  integrations,
  type Integration,
  type IntegrationIcon,
  type IntegrationStatus,
} from "@/lib/integrations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const iconMap: Record<IntegrationIcon, LucideIcon> = {
  Sparkles,
  Cpu,
  Code2,
  Gem,
  Github,
  MousePointer2,
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

export function generateStaticParams() {
  return integrations.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const integration = getIntegration(slug);

  if (!integration) {
    return {
      title: "Integration not found — Watchfire",
      description: "This integration page does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${integration.name} + Watchfire`;
  const description =
    integration.description ?? integration.summary;
  const url = `${siteUrl}/integrations/${integration.slug}`;
  const ogImage = buildBlogOgUrl({
    title: `${integration.name} + Watchfire`,
    description: integration.tagline,
    section: "Integrations",
  });

  return {
    title: `${title} — Watchfire`,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      title: `${title} | Watchfire`,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Watchfire`,
      description,
      images: [ogImage],
    },
  };
}

function StatusPill({ status }: { status: IntegrationStatus }) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider";
  if (status === "first-class") {
    return (
      <span
        className={`${base} border border-fire-500/40 bg-fire-500/10 text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300`}
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
        className={`${base} border border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300`}
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
      className={`${base} border border-zinc-300/60 bg-transparent text-zinc-500 dark:border-zinc-700/60 dark:text-zinc-500`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
      />
      {statusLabel[status]}
    </span>
  );
}

function RelatedCard({ integration }: { integration: Integration }) {
  const Icon = iconMap[integration.iconKey];
  return (
    <Link
      href={`/integrations/${integration.slug}`}
      className="card-hover group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm transition-colors hover:border-fire-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <StatusPill status={integration.status} />
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-zinc-900 group-hover:text-fire-700 dark:text-white dark:group-hover:text-fire-300">
        {integration.name}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {integration.tagline}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-fire-600 dark:text-fire-400">
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

export default async function IntegrationDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const integration = getIntegration(slug);
  if (!integration) notFound();

  const Icon = iconMap[integration.iconKey];
  const related = getRelatedIntegrations(integration.slug, 3);
  const lead = integration.description ?? integration.summary;
  const isAgent = integration.category === "agent";

  const breadcrumbsLd: BreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Integrations",
        item: `${siteUrl}/integrations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: integration.name,
        item: `${siteUrl}/integrations/${integration.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id={`ld-integration-${integration.slug}-breadcrumbs`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />

        {/* Breadcrumb trail */}
        <nav
          aria-label="Breadcrumb"
          className="px-6 pt-20 sm:pt-24"
        >
          <div className="mx-auto max-w-4xl">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
              <li>
                <Link
                  href="/"
                  className="underline-offset-2 hover:text-fire-600 hover:underline dark:hover:text-fire-400"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link
                  href="/integrations"
                  className="underline-offset-2 hover:text-fire-600 hover:underline dark:hover:text-fire-400"
                >
                  Integrations
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-medium text-zinc-700 dark:text-zinc-300">
                {integration.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Header */}
        <section className="px-6 pb-12 pt-8 sm:pb-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-start gap-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
                    {integrationCategoryLabels[integration.category]}
                  </span>
                  <StatusPill status={integration.status} />
                </div>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                  {integration.name}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  {integration.tagline}
                </p>
                {integration.homepage && (
                  <p className="mt-3 text-sm">
                    <a
                      href={integration.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                    >
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {integration.homepage.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Lead */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              What is {integration.name}?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              {lead}
            </p>
          </div>
        </section>

        {/* How it fits */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              {integration.name} + Watchfire
            </h2>
            {integration.paragraphs && integration.paragraphs.length > 0 && (
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                {integration.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            {integration.bullets && integration.bullets.length > 0 && (
              <ul className="mt-6 space-y-3">
                {integration.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                    />
                    <span className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {!integration.paragraphs && !integration.bullets && (
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                {integration.summary}
              </p>
            )}
            {isAgent && integration.detailHref && (
              <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <Link
                  href={integration.detailHref}
                  className="inline-flex items-center gap-1 text-sm font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  See the full {integration.name} backend page
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
            )}
          </div>
        </section>

        {/* Setup snippet */}
        {integration.setupSnippet && (
          <section className="px-6 pb-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Setup
              </h2>
              {integration.setupSnippet.caption && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                  {integration.setupSnippet.caption}
                </p>
              )}
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                <code>{integration.setupSnippet.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Related docs */}
        {integration.relatedDocs && integration.relatedDocs.length > 0 && (
          <section className="px-6 pb-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Related docs
              </h2>
              <ul className="mt-6 space-y-3">
                {integration.relatedDocs.map((doc) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      className="card-hover group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm transition-all hover:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
                    >
                      <span
                        className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-base font-medium text-zinc-900 group-hover:text-fire-700 dark:text-zinc-100 dark:group-hover:text-fire-300">
                          {doc.label}
                        </span>
                        {doc.description && (
                          <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {doc.description}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related integrations */}
        {related.length > 0 && (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Other {integrationCategoryLabels[integration.category].toLowerCase()} integrations
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((sibling) => (
                  <RelatedCard key={sibling.slug} integration={sibling} />
                ))}
              </div>
              <p className="mt-8 text-center text-sm">
                <Link
                  href="/integrations"
                  className="inline-flex items-center gap-1 text-zinc-500 underline-offset-2 hover:text-fire-600 hover:underline dark:text-zinc-500 dark:hover:text-fire-400"
                >
                  See all integrations
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
              </p>
            </div>
          </section>
        )}

        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
