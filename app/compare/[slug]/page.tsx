import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { siteUrl } from "@/lib/site";
import { buildAbsoluteBlogOgUrl, buildBlogOgUrl } from "@/lib/og-url";
import {
  comparisons,
  getComparison,
  type Comparison,
} from "@/lib/comparisons";
import type { Article, BreadcrumbList } from "@/lib/jsonld-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const comparison = getComparison(slug);

  if (!comparison) {
    return {
      title: "Comparison not found — Watchfire",
      description: "This comparison page does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteUrl}/compare/${comparison.slug}`;
  const ogImage = buildBlogOgUrl({
    title: `Watchfire vs ${comparison.rivalName}`,
    description: comparison.metaDescription,
    section: "Compare",
  });

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      images: [ogImage],
    },
  };
}

// Minimal inline renderer for the trusted strings in lib/comparisons.ts.
// Handles:
//   - [label](href)  → <Link> for internal routes, <a> for external
//   - `code`         → <code>
// Anything outside those patterns is rendered as plain text. The strings are
// hand-written and trusted, so this stays narrow on purpose.
const TOKEN_RE = /\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;

function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined && match[2] !== undefined) {
      const label = match[1];
      const href = match[2];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        parts.push(
          <Link
            key={`link-${key++}`}
            href={href}
            className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
          >
            {label}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={`link-${key++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
          >
            {label}
          </a>,
        );
      }
    } else if (match[3] !== undefined) {
      parts.push(
        <code
          key={`code-${key++}`}
          className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200"
        >
          {match[3]}
        </code>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}

function ComparisonTable({ comparison }: { comparison: Comparison }) {
  return (
    <>
      {/* Desktop table */}
      <div
        role="region"
        aria-label={`Watchfire versus ${comparison.rivalName}: feature comparison`}
        tabIndex={0}
        className="hidden overflow-x-auto rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 md:block"
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th
                scope="col"
                className="sticky left-0 z-10 min-w-[10rem] bg-zinc-50/95 px-5 py-3 align-bottom text-[11px] font-semibold uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:bg-zinc-900/95 dark:text-zinc-400"
              >
                Axis
              </th>
              <th
                scope="col"
                className="min-w-[14rem] whitespace-nowrap px-5 py-3 align-bottom text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                {comparison.rivalName}
              </th>
              <th
                scope="col"
                className="min-w-[14rem] whitespace-nowrap px-5 py-3 align-bottom text-xs font-semibold text-fire-600 dark:text-fire-400"
              >
                Watchfire
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.axes.map((row, i) => (
              <tr
                key={row.axis}
                className={
                  i === comparison.axes.length - 1
                    ? "transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40"
                    : "border-b border-zinc-100 transition-colors hover:bg-zinc-50/60 dark:border-zinc-800/60 dark:hover:bg-zinc-900/40"
                }
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 min-w-[10rem] bg-white/95 px-5 py-4 align-top text-sm font-medium text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/95 dark:text-zinc-100"
                >
                  <span className="block">{row.axis}</span>
                  {row.notes && (
                    <span className="mt-1 block text-[11px] font-normal leading-snug text-zinc-500 dark:text-zinc-400">
                      {renderInline(row.notes)}
                    </span>
                  )}
                </th>
                <td className="px-5 py-4 align-top text-sm leading-snug text-zinc-700 dark:text-zinc-300">
                  {renderInline(row.rival)}
                </td>
                <td className="px-5 py-4 align-top text-sm leading-snug text-zinc-800 dark:text-zinc-200">
                  {renderInline(row.watchfire)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <ul className="space-y-4 md:hidden" aria-label={`Comparison axes: Watchfire vs ${comparison.rivalName}`}>
        {comparison.axes.map((row) => (
          <li
            key={row.axis}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="border-b border-zinc-200 px-5 py-3 dark:border-zinc-800">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {row.axis}
              </p>
              {row.notes && (
                <p className="mt-1 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                  {renderInline(row.notes)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 divide-y divide-zinc-200 dark:divide-zinc-800">
              <div className="px-5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {comparison.rivalName}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {renderInline(row.rival)}
                </p>
              </div>
              <div className="bg-fire-500/5 px-5 py-3 dark:bg-fire-400/5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                  Watchfire
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {renderInline(row.watchfire)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default async function CompareSlugPage(props: PageProps) {
  const { slug } = await props.params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const url = `${siteUrl}/compare/${comparison.slug}`;
  const absoluteOg = buildAbsoluteBlogOgUrl({
    title: `Watchfire vs ${comparison.rivalName}`,
    description: comparison.metaDescription,
    section: "Compare",
  });

  const breadcrumbsLd: BreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: `${siteUrl}/docs/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Watchfire vs ${comparison.rivalName}`,
        item: url,
      },
    ],
  };

  const nowIso = new Date().toISOString();
  const articleLd: Article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Watchfire vs ${comparison.rivalName}`,
    description: comparison.metaDescription,
    datePublished: nowIso,
    dateModified: nowIso,
    author: {
      "@type": "Organization",
      name: "Watchfire",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Watchfire",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    image: absoluteOg,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id={`ld-compare-${comparison.slug}-breadcrumbs`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id={`ld-compare-${comparison.slug}-article`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-12 pt-20 sm:pt-28">
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
              Honest comparison
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Watchfire vs{" "}
              <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
                {comparison.rivalName}
              </span>
              .
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              {comparison.tagline}
            </p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
              <a
                href={comparison.rivalHomepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                {comparison.rivalHomepage.replace(/^https?:\/\//, "")}
              </a>
            </p>
          </div>
        </section>

        {/* Verdict band */}
        <section className="px-6 pb-16">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-fire-500/30 bg-gradient-to-br from-fire-500/10 to-ember-500/10 p-6 backdrop-blur-sm dark:border-fire-400/30 dark:from-fire-400/10 dark:to-ember-400/10 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
              The verdict
            </p>
            <p className="mt-3 text-base leading-relaxed text-zinc-800 dark:text-zinc-100 sm:text-lg">
              {renderInline(comparison.oneLineVerdict)}
            </p>
          </div>
        </section>

        {/* At-a-glance table */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                At a glance.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The axes that actually differ between the two tools. The prose
                below this table is where the nuance lives — don&rsquo;t pick a
                tool from a row alone.
              </p>
            </div>
            <ComparisonTable comparison={comparison} />
          </div>
        </section>

        {/* When to pick rival */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              When to pick {comparison.rivalName}.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              {renderInline(comparison.whenToPickRival)}
            </p>
          </div>
        </section>

        {/* When to pick Watchfire */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              When to pick Watchfire.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              {renderInline(comparison.whenToPickWatchfire)}
            </p>
          </div>
        </section>

        {/* Coexistence */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Can they coexist?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              {renderInline(comparison.coexistence)}
            </p>
          </div>
        </section>

        {/* Side-by-side commands */}
        {comparison.commandLineExample && (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Side by side.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The same intent expressed in each tool&rsquo;s idiom.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="border-b border-zinc-200 bg-zinc-50/70 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/60">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {comparison.commandLineExample.rivalLabel}
                    </p>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                    <code>{comparison.commandLineExample.rivalCode}</code>
                  </pre>
                </div>
                <div className="overflow-hidden rounded-2xl border border-fire-500/30 bg-white/70 backdrop-blur-sm dark:border-fire-400/30 dark:bg-zinc-900/60">
                  <div className="border-b border-fire-500/30 bg-fire-500/5 px-4 py-2.5 dark:border-fire-400/30 dark:bg-fire-400/5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                      {comparison.commandLineExample.watchfireLabel}
                    </p>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                    <code>{comparison.commandLineExample.watchfireCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related reading */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Related reading.
            </h2>
            <ul className="mt-6 space-y-3">
              {comparison.relatedDocs.map((doc) => (
                <li key={doc.href}>
                  <Link
                    href={doc.href}
                    className="card-hover group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm transition-all hover:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
                  >
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400" aria-hidden="true" />
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
              <li>
                <Link
                  href="/docs/compare"
                  className="card-hover group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm transition-all hover:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-base font-medium text-zinc-900 group-hover:text-fire-700 dark:text-zinc-100 dark:group-hover:text-fire-300">
                      See the full comparison matrix
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      Every adjacent tool, side by side.
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="card-hover group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm transition-all hover:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-base font-medium text-zinc-900 group-hover:text-fire-700 dark:text-zinc-100 dark:group-hover:text-fire-300">
                      Start with a ready task
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      Copy-paste starter task YAMLs for the most common work.
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
