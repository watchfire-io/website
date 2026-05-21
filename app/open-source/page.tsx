import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  GitPullRequest,
  Heart,
  Megaphone,
  MessagesSquare,
  Package,
  Scale,
  Share2,
  Sparkles,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import GitHubStars from "@/components/GitHubStars";
import FinalCTAServer from "@/components/FinalCTAServer";
import { siteUrl, editRepoUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import { getContributors } from "@/lib/github-contributors";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Watchfire is free, open source, and built in the open under the Apache License 2.0. Read the license, see who's contributing, and find out how to help — with code, with docs, or by spreading the word.";

const ogImage = buildBlogOgUrl({
  title: "Open source",
  description,
  section: "Open source",
});

export const metadata: Metadata = {
  title: "Open source — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/open-source`,
  },
  openGraph: {
    type: "website",
    title: "Open source — Watchfire",
    description,
    url: `${siteUrl}/open-source`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open source — Watchfire",
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
      name: "Open source",
      item: `${siteUrl}/open-source`,
    },
  ],
};

const repoUrl = "https://github.com/watchfire-io/watchfire";
const sponsorsUrl = "https://github.com/sponsors/nunocoracao";
const licenseUrl = `${repoUrl}/blob/main/LICENSE`;
const editOnGithubBase = `${editRepoUrl}/edit/main`;
const discussionsUrl = `${repoUrl}/discussions`;
const issuesUrl = `${repoUrl}/issues/new/choose`;

type OpennessCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  external?: boolean;
};

const opennessCards: OpennessCard[] = [
  {
    id: "source",
    icon: Code2,
    title: "All source on GitHub.",
    description:
      "Daemon, CLI/TUI, GUI, installers, this website — every line lives in the public monorepo. No private fork, no commercial edition.",
    linkLabel: "Browse the repo",
    href: repoUrl,
    external: true,
  },
  {
    id: "releases",
    icon: Tag,
    title: "Every release on GitHub.",
    description:
      "Tagged releases, full changelog, signed binaries — the same artifacts the website serves. Nothing ships from a side branch you can't see.",
    linkLabel: "Read the changelog",
    href: "/changelog",
  },
  {
    id: "discussions",
    icon: MessagesSquare,
    title: "Every discussion in public.",
    description:
      "Design decisions, roadmap arguments, half-baked ideas — they all happen in GitHub Discussions. No private Discord, no waiting room.",
    linkLabel: "Open Discussions",
    href: discussionsUrl,
    external: true,
  },
];

type ContributeEntry = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  external?: boolean;
};

const contributeEntries: ContributeEntry[] = [
  {
    id: "issue",
    icon: GitPullRequest,
    title: "File an issue.",
    description:
      "Found a bug or have a concrete feature request? Open an issue with a repro and we'll take it from there.",
    linkLabel: "Open an issue",
    href: issuesUrl,
    external: true,
  },
  {
    id: "pr",
    icon: Code2,
    title: "Submit a pull request.",
    description:
      "Small fixes go straight to a PR. For larger changes, start a discussion first so the design conversation doesn't happen in a review.",
    linkLabel: "Read the contributing guide",
    href: "/docs/contributing",
  },
  {
    id: "docs",
    icon: FileText,
    title: "Improve the docs.",
    description:
      "Every docs page has an Edit on GitHub link. Typos, sharper sentences, missing examples — all welcome.",
    linkLabel: "Edit docs on GitHub",
    href: `${editOnGithubBase}/content/docs`,
    external: true,
  },
  {
    id: "discuss",
    icon: MessagesSquare,
    title: "Join the discussions.",
    description:
      "Product questions, design conversations, half-formed ideas — anything that isn't a concrete bug. Reviews of new features land here first.",
    linkLabel: "Open Discussions",
    href: discussionsUrl,
    external: true,
  },
];

type SupportEntry = {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  external?: boolean;
};

const tweetText = encodeURIComponent(
  "Watchfire — a free, open source remote control for AI coding agents. Tasks in YAML, agents in sandboxed git worktrees.",
);
const shareUrl = encodeURIComponent("https://watchfire.io");
const shareXHref = `https://twitter.com/intent/tweet?text=${tweetText}&url=${shareUrl}`;

const supportEntries: SupportEntry[] = [
  {
    id: "sponsor",
    icon: Heart,
    tag: "Sponsor",
    title: "Become a GitHub sponsor.",
    description:
      "If Watchfire saves you time, a recurring sponsorship keeps the maintainer fed and the releases shipping. Even $5/month signals the project is worth investing in.",
    linkLabel: "Sponsor on GitHub",
    href: sponsorsUrl,
    external: true,
  },
  {
    id: "share",
    icon: Share2,
    tag: "Share",
    title: "Share Watchfire.",
    description:
      "For an OSS project this early, word of mouth matters as much as a PR. A post, a link, a screenshot — that's how the next contributor finds the repo.",
    linkLabel: "Post on X",
    href: shareXHref,
    external: true,
  },
  {
    id: "badge",
    icon: Package,
    tag: "Badge",
    title: "Use the badge.",
    description:
      "Add a \"Made with Watchfire\" badge to your README, docs, or project page. Copy-paste shields.io-style SVG in dark, light, and flame variants.",
    linkLabel: "Grab a badge",
    href: "/badge",
  },
];

function formatContributions(n: number): string {
  if (n === 1) return "1 commit";
  return `${n} commits`;
}

function avatarTitle(login: string, contributions: number): string {
  return `${login} — ${formatContributions(contributions)}`;
}

export default async function OpenSourcePage() {
  const contributors = await getContributors();
  const totalContributors = contributors.length;
  const totalContributions = contributors.reduce(
    (acc, c) => acc + c.contributions,
    0,
  );

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-open-source-breadcrumbs"
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
              Open source
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Watchfire is free, open source, and built in the open.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Apache-2.0 licensed. One public monorepo. No paid tier, no
              telemetry you didn&rsquo;t ask for, no closed roadmap.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <GitHubStars />
              <a
                href={sponsorsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shine group inline-flex items-center gap-2 rounded-full border border-fire-500/40 bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_0_40px_rgba(224,112,64,0.45)]"
              >
                <Heart className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" fill="currentColor" />
                Sponsor on GitHub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <Divider />

        {/* License */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
                aria-hidden="true"
              >
                <Scale className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                  License
                </span>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  Apache License 2.0
                </h2>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                Use Watchfire commercially, modify it, redistribute it, embed
                it in your own tools &mdash; the only conditions are that you
                keep the license and copyright notices intact, and state any
                significant changes you made. There&rsquo;s also an explicit
                patent grant: contributors give you a license to any patents
                that cover what they contributed.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                It&rsquo;s the same license that ships Kubernetes, Terraform,
                and most of the Apache Software Foundation. Plain-English
                summary above; the binding terms are in the{" "}
                <a
                  href={licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  LICENSE file
                </a>
                .
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
                >
                  <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Read the LICENSE
                </a>
                <a
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
                >
                  <BookOpen className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Apache 2.0 reference
                </a>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* What open source means */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                What &ldquo;open source&rdquo; means here.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Not just &ldquo;the source happens to be visible.&rdquo; The
                whole project lives in the open &mdash; code, releases, and
                conversation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {opennessCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.id}
                    className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {card.description}
                    </p>
                    <p className="mt-5 text-sm">
                      {card.external ? (
                        <a
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                        >
                          {card.linkLabel}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={card.href}
                          className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                        >
                          {card.linkLabel}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        </Link>
                      )}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* Contributors wall */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Contributors.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {totalContributors > 0 ? (
                  <>
                    {totalContributors}{" "}
                    {totalContributors === 1 ? "person has" : "people have"}{" "}
                    committed to the Watchfire monorepo &mdash;{" "}
                    {totalContributions.toLocaleString()} commits in total.
                    Hover an avatar for the count.
                  </>
                ) : (
                  <>
                    The contributor list comes straight from GitHub. We
                    couldn&rsquo;t reach the API just now, so head to the repo
                    to see who&rsquo;s in.
                  </>
                )}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              {contributors.length > 0 ? (
                <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                  {contributors.map((c) => (
                    <li key={c.login} className="group relative">
                      <a
                        href={c.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={avatarTitle(c.login, c.contributions)}
                        className="block"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${c.avatarUrl}${c.avatarUrl.includes("?") ? "&" : "?"}s=128`}
                          alt={`${c.login} avatar`}
                          width={64}
                          height={64}
                          loading="lazy"
                          className="aspect-square w-full rounded-xl border border-zinc-200 bg-zinc-100 object-cover transition-all duration-200 group-hover:border-fire-500/60 group-hover:shadow-[0_0_18px_rgba(224,112,64,0.35)] dark:border-zinc-800 dark:bg-zinc-900"
                        />
                        <div className="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                          <span className="block font-semibold text-zinc-900 dark:text-white">
                            {c.login}
                          </span>
                          <span className="text-fire-600 dark:text-fire-400">
                            {formatContributions(c.contributions)}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <Sparkles
                    className="h-8 w-8 text-fire-500/60 dark:text-fire-400/60"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Couldn&rsquo;t load contributors from GitHub right now.{" "}
                    <a
                      href={`${repoUrl}/graphs/contributors`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                    >
                      Visit the repo to see contributors
                    </a>
                    .
                  </p>
                </div>
              )}
              {contributors.length > 0 && (
                <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
                  Updated daily from the GitHub API. Want your face in this
                  grid?{" "}
                  <Link
                    href="/docs/contributing"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    Read the contributing guide
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </section>

        <Divider />

        {/* How to contribute */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                How to contribute.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Four ways in. Pick the one that fits the energy you have
                today.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {contributeEntries.map((entry) => {
                const Icon = entry.icon;
                return (
                  <article
                    key={entry.id}
                    className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white">
                      {entry.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {entry.description}
                    </p>
                    <p className="mt-4 text-sm">
                      {entry.external ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                        >
                          {entry.linkLabel}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={entry.href}
                          className="inline-flex items-center gap-1 font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                        >
                          {entry.linkLabel}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        </Link>
                      )}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* Support the project */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Support the project.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Three ways to give back that don&rsquo;t require writing code.
                All three keep Watchfire shipping.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {supportEntries.map((entry) => {
                const Icon = entry.icon;
                return (
                  <article
                    key={entry.id}
                    className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                          {entry.tag}
                        </span>
                        <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white">
                          {entry.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {entry.description}
                    </p>
                    <p className="mt-5 text-sm">
                      {entry.external ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                        >
                          {entry.linkLabel}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={entry.href}
                          className="inline-flex items-center gap-1 font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                        >
                          {entry.linkLabel}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        </Link>
                      )}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* Built with Watchfire teaser */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-7 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-10">
              <div
                className="glow-blob glow-blob-fire pointer-events-none -right-16 -top-16 h-[260px] w-[260px] opacity-60"
                aria-hidden="true"
              />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                    <Megaphone className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
                    Dogfood
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                    This site was built with Watchfire.
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Every page, doc, post, and illustration shipped as a
                    tracked task in the open. Browse the receipts &mdash;
                    weekly task counts, recent merges, the whole loop.
                  </p>
                </div>
                <Link
                  href="/built-with-watchfire"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white sm:self-center"
                >
                  See the receipts
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}
