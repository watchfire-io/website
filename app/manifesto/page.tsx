import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Map } from "lucide-react";
import { Github } from "@/components/icons/Github";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { Article, BreadcrumbList } from "@/lib/jsonld-types";

const title = "Manifesto — Watchfire";
const description =
  "What Watchfire believes about how AI coding agents should run inside real codebases. Six tenets, distilled.";

const datePublished = "2026-05-21";
const ogImage = buildBlogOgUrl({
  title: "Manifesto",
  description,
  section: "Manifesto",
});

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/manifesto`,
  },
  openGraph: {
    type: "article",
    title,
    description,
    url: `${siteUrl}/manifesto`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

const breadcrumbsLd: BreadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Manifesto",
      item: `${siteUrl}/manifesto`,
    },
  ],
};

const articleLd: Article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Watchfire Manifesto",
  description,
  datePublished,
  dateModified: datePublished,
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
  image: `${siteUrl}${ogImage}`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/manifesto`,
  },
};

type Tenet = {
  id: string;
  number: string;
  title: string;
  body: React.ReactNode;
};

const tenets: Tenet[] = [
  {
    id: "boundary",
    number: "01",
    title: "Agents need a boundary.",
    body: (
      <>
        Worktree isolation isn&apos;t a nice-to-have. It&apos;s the minimum
        viable seatbelt for an autonomous process touching a real codebase.
        An agent that can write directly to your working tree, or push commits
        to your main branch, is one bad token away from costing you an
        afternoon &mdash; or worse, costing your teammates one too. The
        boundary is what makes the rest of the system survivable.{" "}
        <Link
          href="/docs/concepts/worktrees"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          How worktrees work &rarr;
        </Link>
      </>
    ),
  },
  {
    id: "specs",
    number: "02",
    title: "Specs beat steering.",
    body: (
      <>
        A precise task spec beats a thousand tokens of mid-session
        course-correction. The real work happens before the agent starts:
        when you write down what done looks like, the constraints it has to
        honor, and the files it shouldn&apos;t touch. Steering an agent at
        runtime is what you do when the spec was vague. The agents we will
        run a year from now will be smarter; the specs will not write
        themselves.{" "}
        <Link
          href="/docs/concepts/projects-and-tasks"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Projects and tasks &rarr;
        </Link>
      </>
    ),
  },
  {
    id: "contract",
    number: "03",
    title: "The contract is the acceptance criteria.",
    body: (
      <>
        Everything else &mdash; the prompt, the model, the mode, the
        agent&apos;s mood that day &mdash; is implementation detail. If the
        diff meets the acceptance criteria, the task is done. If it
        doesn&apos;t, no amount of clever prompting changes that. Write the
        criteria as if a stranger will judge the work, because eventually one
        will.{" "}
        <Link
          href="/templates"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Task templates &rarr;
        </Link>
      </>
    ),
  },
  {
    id: "backends",
    number: "04",
    title: "Backends are interchangeable.",
    body: (
      <>
        You should be able to swap Claude Code for Codex for opencode for
        Gemini CLI without rewriting a single task. The agent is a vendor;
        the task is yours. Lock-in to a single model or single runtime is a
        smell, not a feature, which is why Watchfire ships six first-class
        backends today.{" "}
        <Link
          href="/agents"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Supported agents &rarr;
        </Link>
      </>
    ),
  },
  {
    id: "observability",
    number: "05",
    title: "Observability is non-negotiable.",
    body: (
      <>
        If you can&apos;t see what the agent did, you shipped on faith.
        Watchfire shows you the terminal, the diff, the merge, the transcript
        &mdash; every time, on every task. Faith is a fine personal stance.
        It is not a substitute for a code review, and it is not what
        we&apos;re building.{" "}
        <Link
          href="/security"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Security posture &rarr;
        </Link>
      </>
    ),
  },
  {
    id: "open-source",
    number: "06",
    title: "Open source is the only way to earn trust.",
    body: (
      <>
        Sandboxing, secrets handling, and agent orchestration sit close
        enough to your filesystem and your credentials that auditable source
        is the price of admission. Closed agent runners can ask for trust.
        They can&apos;t earn it. Apache-2.0 is not a marketing posture for
        Watchfire &mdash; it&apos;s the architecture.{" "}
        <Link
          href="/open-source"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Open source &rarr;
        </Link>
      </>
    ),
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-manifesto-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-manifesto-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pt-28">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[360px] w-[360px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              Manifesto
            </span>
            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
              Coding agents should work like junior engineers: in their own
              branch, against a clear spec, reviewed before merge.
            </h1>
            <p className="mt-6 text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              Six tenets &middot; one page
            </p>
          </div>
        </section>

        <Divider />

        {/* Tenets */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="lg:grid lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-x-16 xl:grid-cols-[200px_minmax(0,1fr)]">
              {/* Sticky sidebar — desktop only */}
              <aside
                aria-label="Tenet navigation"
                className="hidden lg:block"
              >
                <nav className="sticky top-24">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                    Tenets
                  </p>
                  <ol className="space-y-2">
                    {tenets.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="group flex items-baseline gap-3 text-sm text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400"
                        >
                          <span className="font-mono text-xs text-zinc-400 group-hover:text-fire-500 dark:text-zinc-600 dark:group-hover:text-fire-400">
                            {t.number}
                          </span>
                          <span className="leading-tight">{t.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              {/* Tenet list */}
              <ol className="max-w-[70ch] space-y-16 sm:space-y-20">
                {tenets.map((t) => (
                  <li
                    key={t.id}
                    id={t.id}
                    className="scroll-mt-24 border-t border-zinc-200 pt-10 first:border-t-0 first:pt-0 dark:border-zinc-800"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        aria-hidden="true"
                        className="font-mono text-4xl font-bold tracking-tight text-fire-500 dark:text-fire-400 sm:text-5xl"
                      >
                        {t.number}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                        {t.title}
                      </h2>
                    </div>
                    <p className="mt-5 text-[17px] leading-[1.65] text-zinc-700 dark:text-zinc-300">
                      {t.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Divider />

        {/* What we won't do */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              What we won&apos;t do.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-zinc-700 dark:text-zinc-300">
              Watchfire is not a cloud agent runner &mdash; your code stays on
              the machine that runs the daemon. It is not a Claude wrapper
              &mdash; five backends ship today, more are coming, and none of
              them get special treatment. It is not a chat-only product
              &mdash; chat is one mode of six. And it is not a SaaS &mdash;
              the source is on GitHub and the binary runs on your laptop.
            </p>
          </div>
        </section>

        <Divider />

        {/* What we're betting on */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              What we&apos;re betting on.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-zinc-700 dark:text-zinc-300">
              Coding agents are going to get more capable, not less. The
              organizations that use them seriously will need more structure
              around them, not less &mdash; more isolation, more
              observability, more auditability. The layer that orchestrates
              agents, the part that touches your code, your credentials, and
              your team&apos;s workflow, is going to belong to open source.
              Closed agent SaaS will exist, and people will use it, but it
              won&apos;t be where serious teams put their codebase.
            </p>
          </div>
        </section>

        <Divider />

        {/* Closing + CTAs */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[17px] leading-[1.7] text-zinc-700 dark:text-zinc-300">
              This page is short on purpose. Everything on it is either
              already true of Watchfire today or the thing we&apos;re
              building toward in the open. If you disagree with any of it,
              we want to hear it &mdash; file an issue, open a PR, or send a
              note.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
              >
                <BookOpen className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Read the docs
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <Map className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                See the roadmap
              </Link>
              <a
                href="https://github.com/watchfire-io/watchfire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
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
