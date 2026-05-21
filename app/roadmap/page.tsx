import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Hammer,
  HeartHandshake,
  Rocket,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import {
  extractReleaseHighlights,
  extractReleaseSummary,
  getChangelogEntries,
  type ChangelogEntry,
} from "@/lib/changelog";
import { buildBlogOgUrl } from "@/lib/og-url";
import {
  categoryLabels,
  inProgressItems,
  onDeckItems,
  type RoadmapItem,
} from "@/lib/roadmap";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Watchfire's public roadmap — what we've shipped, what we're building now, and what's on deck. Everything is open source, so every item maps to a place you can help.";

const ogImage = buildBlogOgUrl({
  title: "Roadmap",
  description,
  section: "Project",
});

export const metadata: Metadata = {
  title: "Roadmap — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/roadmap`,
  },
  openGraph: {
    type: "website",
    title: "Roadmap — Watchfire",
    description,
    url: `${siteUrl}/roadmap`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap — Watchfire",
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
      name: "Roadmap",
      item: `${siteUrl}/roadmap`,
    },
  ],
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

type ShippedRelease = {
  version: string;
  codename: string;
  slug: string;
  formattedDate: string;
  summary: string;
};

function buildShippedReleases(entries: ChangelogEntry[]): ShippedRelease[] {
  return entries.slice(0, 4).map((entry) => {
    const summary =
      extractReleaseSummary(entry.markdown) ??
      extractReleaseHighlights(entry.markdown, 1)[0] ??
      "Fixes and improvements.";
    return {
      version: entry.version,
      codename: entry.codename,
      slug: entry.slug,
      formattedDate: dateFormatter.format(entry.date),
      summary,
    };
  });
}

function CategoryTag({ category }: { category: RoadmapItem["category"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
      {categoryLabels[category]}
    </span>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  return (
    <article className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
      <div className="flex items-center gap-2">
        <CategoryTag category={item.category} />
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
        {item.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
        {item.summary}
      </p>
      {item.issue && (
        <p className="mt-5 text-sm">
          <a
            href={item.issue}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
          >
            Track on GitHub
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </a>
        </p>
      )}
    </article>
  );
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description: desc,
}: {
  icon: typeof Rocket;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
          {eyebrow}
        </span>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {desc}
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}

export default function RoadmapPage() {
  const entries = getChangelogEntries();
  const shipped = buildShippedReleases(entries);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-roadmap-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
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
              Roadmap
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Roadmap.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              What we&rsquo;ve shipped, what we&rsquo;re building now, and
              what&rsquo;s on deck. Watchfire is open source, so everything
              here is also where you can help.
            </p>
          </div>
        </section>

        {/* Now shipping */}
        {shipped.length > 0 && (
          <>
            <section className="px-6 py-16 sm:py-20">
              <div className="mx-auto max-w-6xl">
                <SectionHeader
                  icon={Rocket}
                  eyebrow="Now shipping"
                  title="Now shipping."
                  description="The most recent releases — pulled straight from the changelog so this stays current automatically."
                />
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {shipped.map((release) => (
                    <article
                      key={release.version}
                      className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/40 bg-gradient-to-br from-fire-500/15 to-ember-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fire-600 dark:border-fire-400/50 dark:from-fire-400/15 dark:to-ember-400/10 dark:text-fire-300">
                          v{release.version} &mdash; {release.codename}
                        </span>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          {release.formattedDate}
                        </span>
                      </div>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px]">
                        {release.summary}
                      </p>
                      <p className="mt-5 text-sm">
                        <Link
                          href={`/changelog#${release.slug}`}
                          className="inline-flex items-center gap-1 font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                        >
                          Read the release notes
                          <ArrowRight
                            className="h-3.5 w-3.5"
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                        </Link>
                      </p>
                    </article>
                  ))}
                </div>
                <p className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Browse the full release history in the{" "}
                  <Link
                    href="/changelog"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    changelog
                  </Link>
                  .
                </p>
              </div>
            </section>
            <Divider />
          </>
        )}

        {/* In progress */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              icon={Hammer}
              eyebrow="In progress"
              title="In progress."
              description="Actively in flight. These are the pieces being shaped, prototyped, or merged behind a flag right now."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {inProgressItems.map((item) => (
                <RoadmapCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* On deck */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              icon={Compass}
              eyebrow="On deck"
              title="On deck."
              description="The next quarter's intended pickups. Order is rough and priorities shift — `lib/roadmap.ts` is the source of truth."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {onDeckItems.map((item) => (
                <RoadmapCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* How to help */}
        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-fire-500/20 bg-white/70 p-7 backdrop-blur-sm dark:border-fire-400/25 dark:bg-zinc-900/60 sm:p-10">
              <div
                className="glow-blob glow-blob-fire pointer-events-none -right-16 -top-16 h-[260px] w-[260px] opacity-60"
                aria-hidden="true"
              />
              <div className="relative">
                <SectionHeader
                  icon={HeartHandshake}
                  eyebrow="How to help"
                  title="How to help."
                  description="Watchfire is Apache-2.0 open source. Every item on this page maps to a GitHub label — the easiest entry points are tagged `good-first-issue` and `help-wanted`."
                />
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/watchfire-io/watchfire/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shine group inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_15px_40px_rgba(224,112,64,0.4)] sm:text-base"
                  >
                    Browse open issues
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </a>
                  <Link
                    href="/community"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
                  >
                    Read CONTRIBUTING
                    <ArrowRight
                      className="h-4 w-4"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
                  Not sure where to start? Drop into{" "}
                  <a
                    href="https://github.com/watchfire-io/watchfire/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    GitHub Discussions
                  </a>{" "}
                  &mdash; design conversations and rough ideas land there
                  before they become issues.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
