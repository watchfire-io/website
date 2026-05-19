import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import BlogSubscribe from "@/components/BlogSubscribe";
import { siteUrl, softwareVersion } from "@/lib/site";
import {
  extractReleaseHighlights,
  extractReleaseSummary,
  getChangelogEntries,
  type ChangelogEntry,
} from "@/lib/changelog";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "What shipped, and when. A highlights view of recent Watchfire releases — codenamed cuts of the daemon, CLI, TUI, and GUI. The full version-by-version log lives in the docs.";

const ogImage = buildBlogOgUrl({
  title: "Changelog",
  description,
  section: "Changelog",
});

export const metadata: Metadata = {
  title: "Changelog — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/changelog`,
  },
  openGraph: {
    type: "website",
    title: "Changelog — Watchfire",
    description,
    url: `${siteUrl}/changelog`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog — Watchfire",
    description,
    images: [ogImage],
  },
};

// Deep-dive blog posts that map to a specific release. Only entries that
// actually exist in content/blog/ — verify before adding.
const DEEP_DIVES: Record<string, { slug: string; label: string }> = {
  "7.1.0": {
    slug: "2026-05-14-hello-world",
    label: "Read the launch post",
  },
  "4.0.0": {
    slug: "2026-05-19-beacon-two-way-integrations",
    label: "How Beacon turns the daemon two-way",
  },
  "2.0.0": {
    slug: "2026-05-18-bring-your-own-agent",
    label: "Bring your own agent",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

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
      name: "Changelog",
      item: `${siteUrl}/changelog`,
    },
  ],
};

type ReleaseCardData = ChangelogEntry & {
  summary: string | null;
  highlights: string[];
  deepDive: (typeof DEEP_DIVES)[string] | null;
  formattedDate: string;
};

function buildCardData(entry: ChangelogEntry, highlightCount: number): ReleaseCardData {
  return {
    ...entry,
    summary: extractReleaseSummary(entry.markdown),
    highlights: extractReleaseHighlights(entry.markdown, highlightCount),
    deepDive: DEEP_DIVES[entry.version] ?? null,
    formattedDate: dateFormatter.format(entry.date),
  };
}

function VersionBadge({
  version,
  codename,
  size = "md",
}: {
  version: string;
  codename: string;
  size?: "md" | "lg";
}) {
  const padding = size === "lg" ? "px-3.5 py-1.5" : "px-3 py-1";
  const text = size === "lg" ? "text-sm" : "text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-fire-500/40 bg-gradient-to-br from-fire-500/15 to-ember-500/10 ${padding} ${text} font-semibold uppercase tracking-wider text-fire-600 shadow-[0_0_20px_rgba(224,112,64,0.15)] backdrop-blur-sm dark:border-fire-400/50 dark:from-fire-400/15 dark:to-ember-400/10 dark:text-fire-300`}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-fire-500/60 motion-reduce:animate-none dark:bg-fire-400/60" />
        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-fire-500 dark:bg-fire-400" />
      </span>
      v{version} &mdash; {codename}
    </span>
  );
}

function HeroReleaseCard({ release }: { release: ReleaseCardData }) {
  return (
    <article
      id={release.slug}
      aria-labelledby={`release-${release.slug}-title`}
      className="card-hover gradient-ring relative scroll-mt-24 overflow-hidden rounded-3xl border border-fire-500/20 bg-white/80 p-8 backdrop-blur-sm dark:border-fire-400/25 dark:bg-zinc-900/70 sm:p-10"
    >
      <div className="flex flex-wrap items-center gap-3">
        <VersionBadge version={release.version} codename={release.codename} size="lg" />
        <time
          dateTime={release.date.toISOString()}
          className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
        >
          {release.formattedDate}
        </time>
        <span className="rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
          Latest
        </span>
      </div>

      <h2
        id={`release-${release.slug}-title`}
        className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
      >
        {release.codename} {release.version}
      </h2>

      {release.summary && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
          {release.summary}
        </p>
      )}

      {release.highlights.length > 0 && (
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {release.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base"
            >
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
        <Link
          href={`/docs/changelog#${release.slug}`}
          className="shine group inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_15px_40px_rgba(224,112,64,0.4)] sm:text-base"
        >
          Read full notes
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </Link>
        {release.deepDive && (
          <Link
            href={`/blog/${release.deepDive.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
          >
            <BookOpen className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Deep dive
          </Link>
        )}
      </div>
    </article>
  );
}

function ReleaseCard({ release }: { release: ReleaseCardData }) {
  return (
    <article
      id={release.slug}
      aria-labelledby={`release-${release.slug}-title`}
      className="card-hover scroll-mt-24 flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50 sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-3">
        <VersionBadge version={release.version} codename={release.codename} />
        <time
          dateTime={release.date.toISOString()}
          className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
        >
          {release.formattedDate}
        </time>
      </div>

      <h3
        id={`release-${release.slug}-title`}
        className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl"
      >
        {release.codename} {release.version}
      </h3>

      {release.summary ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          {release.summary}
        </p>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          Fixes and improvements &mdash; see the full notes for the per-component
          breakdown.
        </p>
      )}

      {release.highlights.length > 0 && (
        <ul className="mt-5 space-y-2">
          {release.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500/80 dark:bg-fire-400/80"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
        <Link
          href={`/docs/changelog#${release.slug}`}
          className="inline-flex items-center gap-1.5 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Full notes
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
        </Link>
        {release.deepDive && (
          <Link
            href={`/blog/${release.deepDive.slug}`}
            className="inline-flex items-center gap-1.5 text-zinc-700 underline-offset-2 hover:text-fire-600 hover:underline dark:text-zinc-300 dark:hover:text-fire-400"
          >
            <BookOpen className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
            {release.deepDive.label}
          </Link>
        )}
      </div>
    </article>
  );
}

export default function ChangelogPage() {
  const entries = getChangelogEntries();
  if (entries.length === 0) {
    // Defensive — the file exists in repo, but if it ever ships empty we should
    // still render a usable page.
    return (
      <>
        <Header />
        <main id="main-content" className="px-6 py-24 pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Changelog
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              No releases to show yet.{" "}
              <Link href="/docs/changelog" className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400">
                See the full log.
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const [latest, ...rest] = entries;
  const heroRelease = buildCardData(latest, 5);
  const previousReleases = rest.slice(0, 6).map((entry) => buildCardData(entry, 3));

  const softwareApplicationLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Watchfire",
    url: siteUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    softwareVersion,
    releaseNotes: heroRelease.summary ?? heroRelease.title,
    datePublished: heroRelease.date.toISOString(),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-changelog-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-changelog-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-16 sm:py-20">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-20 left-[10%] h-[420px] w-[420px]"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/3 h-[320px] w-[320px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                Changelog
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                What shipped,
                <br />
                and when.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                A highlights view of recent Watchfire releases. The exhaustive
                version-by-version record &mdash; every fix, every migration
                note &mdash; lives in{" "}
                <Link
                  href="/docs/changelog"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  the docs changelog
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Hero release card */}
        <section className="px-6 pb-14 sm:pb-16">
          <div className="mx-auto max-w-7xl">
            <HeroReleaseCard release={heroRelease} />
          </div>
        </section>

        {/* Previous releases grid */}
        {previousReleases.length > 0 && (
          <section className="px-6 pb-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  Earlier releases
                </h2>
                <Link
                  href="/docs/changelog"
                  className="hidden items-center gap-1.5 text-sm text-fire-600 underline-offset-2 hover:underline dark:text-fire-400 sm:inline-flex"
                >
                  Full archive
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {previousReleases.map((release) => (
                  <ReleaseCard key={release.version} release={release} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer band */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              Looking for every patch release, breaking change, and upgrade
              note?{" "}
              <Link
                href="/docs/changelog"
                className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                See the full changelog
                <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Link>
              .
            </p>
            <BlogSubscribe />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
