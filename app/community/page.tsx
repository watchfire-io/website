import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bug,
  Code2,
  FileText,
  Github,
  LifeBuoy,
  Megaphone,
  MessagesSquare,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SignupCTA from "@/components/SignupCTA";
import { siteUrl, socialLinks } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Where to ask questions, contribute, and follow Watchfire — the open-source remote control for AI coding agents. GitHub Discussions, issues, Bluesky, X, and how to help an OSS project early on.";

const ogImage = buildBlogOgUrl({
  title: "Community",
  description,
  section: "Community",
});

export const metadata: Metadata = {
  title: "Community — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/community`,
  },
  openGraph: {
    type: "website",
    title: "Community — Watchfire",
    description,
    url: `${siteUrl}/community`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community — Watchfire",
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
      name: "Community",
      item: `${siteUrl}/community`,
    },
  ],
};

type ChannelIcon =
  | { kind: "lucide"; icon: LucideIcon }
  | { kind: "svg"; render: () => React.ReactNode };

type Channel = {
  id: string;
  tag: string;
  icon: ChannelIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

function BlueskyGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 600 530"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.822c0-88.687 77.742-60.816 125.72-24.795Z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const channels: Channel[] = [
  {
    id: "discussions",
    tag: "GitHub Discussions",
    icon: { kind: "lucide", icon: MessagesSquare },
    title: "Ask questions, share ideas",
    description:
      "Product questions, design conversations, half-formed ideas — anything that isn't a concrete bug. If you're not sure where to start, start here.",
    linkLabel: "Open Discussions",
    href: "https://github.com/watchfire-io/watchfire/discussions",
  },
  {
    id: "issues",
    tag: "GitHub Issues",
    icon: { kind: "lucide", icon: Bug },
    title: "Report a bug or concrete feature",
    description:
      "File an issue when you have a repro for a bug or a well-scoped feature request. Open-ended ideas are a better fit for Discussions.",
    linkLabel: "Open an issue",
    href: "https://github.com/watchfire-io/watchfire/issues/new/choose",
  },
  {
    id: "bluesky",
    tag: "Bluesky",
    icon: { kind: "svg", render: () => <BlueskyGlyph /> },
    title: "Follow on Bluesky",
    description:
      "Release notes, screenshots, and the occasional rant about agent ergonomics. Most posts also cross-post to X.",
    linkLabel: "@watchfire-io.bsky.social",
    href: socialLinks.bluesky,
  },
  {
    id: "x",
    tag: "X / Twitter",
    icon: { kind: "svg", render: () => <XGlyph /> },
    title: "Follow on X",
    description:
      "Same shape as Bluesky, different timeline. Pick whichever one you're already on.",
    linkLabel: "@watchfire_dev",
    href: socialLinks.x,
  },
];

type ContributeCard = {
  id: string;
  tag: string;
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  external?: boolean;
};

const contributeCards: ContributeCard[] = [
  {
    id: "code",
    tag: "Code",
    icon: Code2,
    title: "Code contributions",
    description:
      "Small fixes go straight to a PR. Larger changes are best shaped in an issue or discussion first so the design conversation doesn't happen in a review.",
    linkLabel: "Read the contributing guide",
    href: "/docs/contributing",
  },
  {
    id: "docs",
    tag: "Documentation",
    icon: FileText,
    title: "Documentation",
    description:
      "Docs improvements move the project forward as much as code. Every docs page has an Edit on GitHub link in the right sidebar — typos, sharper sentences, missing context all welcome.",
    linkLabel: "Browse the docs",
    href: "/docs",
  },
  {
    id: "talk",
    tag: "Word of mouth",
    icon: Megaphone,
    title: "Talk about it",
    description:
      "Linking to the project, tagging #watchfire on social, writing a blog post about your setup — for an OSS project this early, this matters as much as a PR. It's how the next contributor finds the repo.",
    linkLabel: "Star on GitHub",
    href: socialLinks.github,
    external: true,
  },
];

type DocLink = {
  href: string;
  label: string;
  description: string;
};

const docsToReadFirst: DocLink[] = [
  {
    href: "/docs",
    label: "Documentation home",
    description: "Concepts, components, and the full commands reference.",
  },
  {
    href: "/docs/troubleshooting",
    label: "Troubleshooting",
    description: "Common failure modes — agent stuck, worktree dirty, ports in use, sandbox denials.",
  },
  {
    href: "/docs/tips",
    label: "Tips",
    description: "Patterns that move you from “it runs” to “it ships” — task scoping, acceptance criteria, recovering bad runs.",
  },
  {
    href: "/docs/recipes",
    label: "Recipes",
    description: "End-to-end walkthroughs: refactor a module, add tests, run a migration, ship a docs sprint.",
  },
];

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <article
      id={channel.id}
      className="card-hover scroll-mt-24 flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
          aria-hidden="true"
        >
          {channel.icon.kind === "lucide" ? (
            <channel.icon.icon className="h-5 w-5" strokeWidth={2} />
          ) : (
            channel.icon.render()
          )}
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
            {channel.tag}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
            {channel.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
        {channel.description}
      </p>
      <p className="mt-5 text-sm">
        <a
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          {channel.linkLabel}
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
        </a>
      </p>
    </article>
  );
}

function ContributeCardView({ card }: { card: ContributeCard }) {
  const Icon = card.icon;
  return (
    <article
      id={card.id}
      className="card-hover scroll-mt-24 flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
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
            {card.tag}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
            {card.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
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
          </a>
        ) : (
          <Link
            href={card.href}
            className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
          >
            {card.linkLabel}
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
        )}
      </p>
    </article>
  );
}

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-community-breadcrumbs"
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
              Community
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Community
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Watchfire is open source and built in the open. Here&rsquo;s where
              to ask questions, share what you&rsquo;ve built, and help shape
              what ships next.
            </p>
          </div>
        </section>

        {/* Where to ask & talk */}
        <section className="px-6 pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Where to ask &amp; talk.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The whole conversation happens on GitHub and the two social
                feeds &mdash; no Discord, no Slack, no waiting room.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {channels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Get help */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Stuck on something?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Two steps, in order. The docs answer most questions faster than
                a thread will.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
                    aria-hidden="true"
                  >
                    <BookOpen className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Read the docs first.
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  These four pages catch most things people get stuck on:
                </p>
                <ul className="mt-4 space-y-3">
                  {docsToReadFirst.map((doc) => (
                    <li key={doc.href} className="text-sm leading-relaxed">
                      <Link
                        href={doc.href}
                        className="font-medium text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                      >
                        {doc.label}
                      </Link>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {" "}&mdash; {doc.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
                    aria-hidden="true"
                  >
                    <LifeBuoy className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Still stuck? Ask in Discussions.
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  A good help post saves everyone&rsquo;s afternoon:
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  <li className="flex gap-2">
                    <span className="text-fire-500 dark:text-fire-400" aria-hidden="true">
                      &bull;
                    </span>
                    <span>What you ran and what you expected to happen.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-fire-500 dark:text-fire-400" aria-hidden="true">
                      &bull;
                    </span>
                    <span>OS and Watchfire version (<code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">watchfire --version</code>).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-fire-500 dark:text-fire-400" aria-hidden="true">
                      &bull;
                    </span>
                    <span>A minimal repro &mdash; the smaller, the faster the answer.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-fire-500 dark:text-fire-400" aria-hidden="true">
                      &bull;
                    </span>
                    <span>What you already tried. Be kind, be concise.</span>
                  </li>
                </ul>
                <p className="mt-5 text-sm">
                  <a
                    href="https://github.com/watchfire-io/watchfire/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    Start a discussion
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
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Contribute */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Help build it.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Three honest ways to push the project forward &mdash; not just
                &ldquo;PRs welcome.&rdquo; All three count.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {contributeCards.map((card) => (
                <ContributeCardView key={card.id} card={card} />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Stay in the loop */}
        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl px-0">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Stay in the loop.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Subscribe by email for release notes and deep-dive posts. Star
                the repo to see new releases land in your GitHub feed &mdash;
                it&rsquo;s also how other developers find the project.
              </p>
            </div>
          </div>
          <SignupCTA />
        </section>

        <Divider />

        {/* Code of conduct */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
                  aria-hidden="true"
                >
                  <Star className="h-5 w-5" strokeWidth={2} />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
                  Code of conduct
                </h2>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                This community follows the{" "}
                <a
                  href="https://www.contributor-covenant.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  Contributor Covenant
                </a>
                . Treat each other with respect, assume good faith, and report
                conduct issues privately to{" "}
                <a
                  href="mailto:info@watchfire.io"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  info@watchfire.io
                </a>
                . The full text lives in{" "}
                <a
                  href="https://github.com/watchfire-io/watchfire/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  CODE_OF_CONDUCT.md
                </a>{" "}
                in the repo.
              </p>
            </div>
          </div>
        </section>

        {/* Closer */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              See you on GitHub.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              The fastest way to get involved is to open a discussion, file an
              issue, or send a small PR. We respond to every one.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://github.com/watchfire-io/watchfire/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="shine group inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_15px_40px_rgba(224,112,64,0.4)] sm:text-base"
              >
                <MessagesSquare className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                Open a discussion
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} aria-hidden="true" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
              >
                <Github className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Star on GitHub
              </a>
            </div>
          </div>
        </section>
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
