import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github, ListChecks } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import {
  showcaseCategoryLabels,
  showcaseEntries,
  type ShowcaseEntry,
} from "@/lib/showcase";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "A gallery of real projects built with Watchfire — every page on this site, the Watchfire daemon and clients themselves, and the open-source repositories where the loop is the workflow.";

const ogImage = buildBlogOgUrl({
  title: "Built with Watchfire",
  description,
  section: "Showcase",
});

export const metadata: Metadata = {
  title: "Showcase — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/showcase`,
  },
  openGraph: {
    type: "website",
    title: "Showcase — Watchfire",
    description,
    url: `${siteUrl}/showcase`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Showcase — Watchfire",
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
      name: "Showcase",
      item: `${siteUrl}/showcase`,
    },
  ],
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Built with Watchfire",
  description,
  itemListElement: showcaseEntries.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    description: entry.tagline,
    url: entry.siteUrl ?? entry.repoUrl ?? `${siteUrl}/showcase#${entry.slug}`,
  })),
};

const submitUrl =
  "https://github.com/watchfire-io/watchfire/issues/new?title=Showcase%20submission%3A%20%3Cproject%20name%3E&body=Project%20name%3A%0ARepo%2Fsite%20URL%3A%0AOne-line%20tagline%3A%0AWhat%20did%20you%20build%20with%20Watchfire%3F%0A";

function ShowcaseCard({ entry }: { entry: ShowcaseEntry }) {
  return (
    <article
      id={entry.slug}
      aria-labelledby={`showcase-${entry.slug}-name`}
      className="card-hover scroll-mt-24 flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50 sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
          {showcaseCategoryLabels[entry.category]}
        </span>
        {typeof entry.tasksMerged === "number" && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-0.5 text-[11px] font-medium text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
            aria-label={`${entry.tasksMerged} tasks merged`}
          >
            <ListChecks className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
            {entry.tasksMerged} tasks merged
          </span>
        )}
      </div>
      <h2
        id={`showcase-${entry.slug}-name`}
        className="mt-3 text-xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-2xl"
      >
        {entry.name}
      </h2>
      <p className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:text-base">
        {entry.tagline}
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {entry.description}
      </p>
      {entry.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-zinc-200 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      {(entry.repoUrl || entry.siteUrl) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {entry.siteUrl && (
            <a
              href={entry.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              aria-label={`Visit ${entry.name} site`}
            >
              <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Visit site
            </a>
          )}
          {entry.repoUrl && (
            <a
              href={entry.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-700 underline-offset-2 hover:text-fire-600 hover:underline dark:text-zinc-300 dark:hover:text-fire-400"
              aria-label={`View ${entry.name} on GitHub`}
            >
              <Github className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              View repo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function ShowcasePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-showcase-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-showcase-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />

        {/* Hero */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                Showcase
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                Built with Watchfire.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                A short, curated list of real projects shipped through
                Watchfire &mdash; starting with this site and the daemon it
                documents. The receipts live in each repo&rsquo;s{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                  .watchfire/tasks/
                </code>{" "}
                directory. The page is a hub, not a brag wall &mdash; if
                you&rsquo;ve built something with Watchfire, the submit link
                at the bottom adds it.
              </p>
            </div>
          </div>
        </section>

        {/* Card grid */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2">
              {showcaseEntries.map((entry) => (
                <ShowcaseCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </div>
        </section>

        {/* Closer / CTA */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              The clearest case study is this very site &mdash;{" "}
              <Link
                href="/built-with-watchfire"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                see the receipts
              </Link>
              .
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Built something with Watchfire?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              Open an issue with a link to your repo or site and a sentence
              about what you shipped. We&rsquo;ll add it to the list. No
              forms, no waiting list &mdash; submissions go through GitHub
              like everything else.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={submitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shine group inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_15px_40px_rgba(224,112,64,0.4)] sm:text-base"
              >
                <Github className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                Submit your project
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
              </a>
              <Link
                href="/blog/2026-05-19-eating-our-own-dogfood"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
              >
                Read the dogfooding post
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
