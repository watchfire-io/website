import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CloudOff,
  GitBranch,
  Keyboard,
  Lock,
  MessageCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Github } from "@/components/icons/Github";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { Article, BreadcrumbList } from "@/lib/jsonld-types";

const title = "When Watchfire is the wrong tool — Watchfire";
const description =
  "An honest list of the situations where Watchfire is a poor fit, and what to reach for instead. The inverse of a landing page.";

const datePublished = "2026-05-21";
const ogImage = buildBlogOgUrl({
  title: "When Watchfire is the wrong tool",
  description,
  section: "Honesty",
});

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/when-not-to-use`,
  },
  openGraph: {
    type: "article",
    title,
    description,
    url: `${siteUrl}/when-not-to-use`,
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
      name: "When Watchfire is the wrong tool",
      item: `${siteUrl}/when-not-to-use`,
    },
  ],
};

const articleLd: Article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "When Watchfire is the wrong tool",
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
    "@id": `${siteUrl}/when-not-to-use`,
  },
};

type Scenario = {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  body: React.ReactNode;
  insteadLabel: string;
  instead: React.ReactNode;
};

const scenarios: Scenario[] = [
  {
    id: "thirty-second-edits",
    number: "01",
    title: "The edit takes less time than the spec.",
    icon: <Zap className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
    body: (
      <>
        Renaming a variable, bumping a version, fixing a typo in a comment,
        flipping a boolean &mdash; if you can see the change in your head and
        type it in thirty seconds, writing a task description is the long way
        around. Watchfire&apos;s value comes from the structure it adds: a
        worktree, a spec, a transcript, a diff to review. For an edit you
        could complete before the agent finishes booting, that structure is
        pure overhead.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: <>Just open your editor and make the edit.</>,
  },
  {
    id: "live-pairing",
    number: "02",
    title: "You need to drive the keyboard yourself.",
    icon: (
      <Keyboard className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    ),
    body: (
      <>
        Live debugging, pair programming with another human, working through
        an unfamiliar API by setting breakpoints and stepping through
        execution, exploratory data analysis where every result reshapes the
        next question &mdash; this is the kind of work where you learn by
        steering. Handing it to an agent in a sandboxed worktree turns a
        conversation into a queue, and you lose the thing that made the
        approach work in the first place.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: (
      <>
        Stay in your editor with an inline assistant, or use a chat-first
        coding agent in a terminal you control.
      </>
    ),
  },
  {
    id: "closed-source",
    number: "03",
    title: "You can’t grant an agent file access.",
    icon: <Lock className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
    body: (
      <>
        Watchfire runs agents locally, but it still grants them read and write
        access to a worktree on disk. If you&apos;re working with a codebase
        that&apos;s under an NDA your tooling has to honor, with vendor code
        that can&apos;t leave a specific machine, or in a regulated
        environment that forbids autonomous processes from touching source,
        a sandboxed coding agent &mdash; Watchfire or otherwise &mdash; is
        the wrong shape of tool. The right answer is usually narrower
        permissions, not better orchestration.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: (
      <>
        A purely read-only assistant inside an audited editor, or an
        air-gapped workflow with no agent file access at all.
      </>
    ),
  },
  {
    id: "hard-realtime",
    number: "04",
    title: "Production is on fire right now.",
    icon: (
      <AlertTriangle
        className="h-5 w-5"
        strokeWidth={2}
        aria-hidden="true"
      />
    ),
    body: (
      <>
        Kubernetes incident response. A prod hotfix mid-outage. A migration
        rolling back at 3 a.m. while a customer waits on the phone. Watchfire
        is a tool for deliberate, reviewable work &mdash; you write a spec,
        the agent runs, you read the diff, you merge. None of those four
        steps are what an incident wants. Incidents want the senior engineer,
        the runbook, and a shell prompt where every keystroke is theirs.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: (
      <>
        Your incident runbook, your on-call rotation, and a terminal session
        you&apos;re driving directly.
      </>
    ),
  },
  {
    id: "no-git",
    number: "05",
    title: "Git worktrees can’t cleanly clone your repo.",
    icon: (
      <GitBranch className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    ),
    body: (
      <>
        Worktree isolation is the single most important thing Watchfire does,
        and it relies on git working the way it&apos;s supposed to. A repo
        that isn&apos;t under git, a multi-hundred-gigabyte LFS monorepo
        where cloning a worktree takes longer than the task itself, a
        submodule jungle that breaks half its tooling on checkout &mdash;
        these aren&apos;t Watchfire bugs, but they make the experience
        miserable enough that you&apos;re fighting the tool instead of using
        it.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: (
      <>
        Run the agent directly in your main checkout (carefully), or restructure
        the repo so worktrees are cheap before adopting Watchfire.
      </>
    ),
  },
  {
    id: "hosted-only",
    number: "06",
    title: "You need a hosted product with no laptop in the loop.",
    icon: (
      <CloudOff className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    ),
    body: (
      <>
        Watchfire is local-first by design. The daemon runs on your machine,
        your code stays on your machine, your API keys live in your keychain.
        That&apos;s a feature for some teams and a deal-breaker for others.
        If you need a URL your VP can open in a browser, a managed control
        plane, SSO at the product layer, or a fleet of agents running in
        someone else&apos;s cloud, Watchfire isn&apos;t the right base.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: (
      <>
        A hosted coding-agent platform from the cloud-native category
        &mdash; pick one that fits your compliance posture.
      </>
    ),
  },
  {
    id: "one-conversation",
    number: "07",
    title: "You want one long conversation, not many discrete tasks.",
    icon: (
      <MessageCircle
        className="h-5 w-5"
        strokeWidth={2}
        aria-hidden="true"
      />
    ),
    body: (
      <>
        Some of the best work with a coding agent happens in a single rolling
        session: an hour of back-and-forth where the context, the partial
        results, and the half-formed plan all live in the same window.
        Watchfire&apos;s task model deliberately fragments that. Tasks are
        atomic, transcripts are scoped, and the agent doesn&apos;t remember
        last Tuesday. If the conversation is the work, the task model gets
        in the way.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: (
      <>
        Run your agent&apos;s native CLI in chat mode, or use Watchfire&apos;s{" "}
        <Link
          href="/docs/concepts/agent-modes"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          chat mode
        </Link>{" "}
        for the conversation, then graduate to tasks only once the work has
        crystallized.
      </>
    ),
  },
  {
    id: "approval-at-every-step",
    number: "08",
    title: "You need to approve every step before it happens.",
    icon: (
      <ShieldCheck className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    ),
    body: (
      <>
        Watchfire&apos;s value compounds with autonomy. The whole point of
        worktree isolation is that the agent can fail safely, so you get to
        review at the end instead of policing the middle. If your workflow,
        your compliance posture, or your personal taste demands a confirm
        prompt on every file write, every command, every tool call, you
        won&apos;t enjoy the experience &mdash; and you&apos;ll be paying
        the worktree cost for none of the autonomy benefit.
      </>
    ),
    insteadLabel: "Use this instead",
    instead: (
      <>
        Use a step-by-step coding assistant integrated into your editor,
        where approval-per-action is the design center.
      </>
    ),
  },
];

export default function WhenNotToUsePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-when-not-to-use-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-when-not-to-use-article"
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
              Honesty
            </span>
            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
              When Watchfire is the wrong tool.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              This page is the inverse of the landing page. It exists because
              the most useful thing a tool can do is tell you when not to use
              it &mdash; and because we&apos;d rather you reach for the right
              thing than force-fit Watchfire onto a job it can&apos;t do well.
            </p>
            <p className="mt-6 border-l-2 border-fire-500/60 pl-4 text-[17px] italic leading-relaxed text-zinc-700 dark:border-fire-400/60 dark:text-zinc-300">
              Eight situations where you should close this tab and reach for
              something else. With concrete pointers to what.
            </p>
          </div>
        </section>

        <Divider />

        {/* Scenarios */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <ol className="grid gap-6 sm:grid-cols-2">
              {scenarios.map((s) => (
                <li key={s.id} id={s.id} className="scroll-mt-24">
                  <article className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                        {s.icon}
                      </div>
                      <span
                        aria-hidden="true"
                        className="font-mono text-sm font-semibold text-zinc-400 dark:text-zinc-600"
                      >
                        {s.number}
                      </span>
                    </div>
                    <h2 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {s.body}
                    </p>
                    <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                      <p className="text-xs font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                        {s.insteadLabel}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {s.instead}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Divider />

        {/* Closing recommendation */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              If any of these describe you, here&apos;s what we recommend.
            </h2>
            <div className="mt-6 space-y-5 text-[17px] leading-[1.7] text-zinc-700 dark:text-zinc-300">
              <p>
                Stop reading and go pick a better tool for the job. We mean
                that. Watchfire is opinionated on purpose &mdash; the
                opinions that make it good for batch, spec-driven, reviewable
                work are the same opinions that make it bad at the eight
                scenarios above.
              </p>
              <p>
                A few honest pointers:
              </p>
              <ul className="space-y-3 pl-5 [list-style:disc] marker:text-fire-500 dark:marker:text-fire-400">
                <li>
                  If you came here looking for a tool comparison, the{" "}
                  <Link
                    href="/docs/compare"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    compare page
                  </Link>{" "}
                  lines Watchfire up against adjacent categories without
                  trash-talking anyone.
                </li>
                <li>
                  If you&apos;re not sure yet whether your workflow fits, the{" "}
                  <Link
                    href="/docs"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    docs
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/use-cases"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    use cases
                  </Link>{" "}
                  describe what Watchfire actually does well &mdash; if your
                  work looks like that, you&apos;re probably in the right
                  place.
                </li>
                <li>
                  For live, conversational coding, look at the editor-native
                  assistant category (the inline-completion / sidebar tools
                  built into your IDE).
                </li>
                <li>
                  For fully managed, cloud-hosted coding agents, look at the
                  hosted-agent category &mdash; the products that run the
                  agent in their cloud, not yours.
                </li>
                <li>
                  For per-step approval, look at the editor-integrated
                  assistant category &mdash; the tools that ask permission
                  before every file write.
                </li>
              </ul>
              <p>
                And if Watchfire <em>is</em> the right tool but you&apos;re on
                the fence, read the{" "}
                <Link
                  href="/manifesto"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  manifesto
                </Link>
                . It&apos;s short and it&apos;s honest about what
                we&apos;re building.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/compare"
                className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
              >
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                See how Watchfire compares
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <BookOpen
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Read the docs
              </Link>
              <a
                href="https://github.com/watchfire-io/watchfire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <Github
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Source on GitHub
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
