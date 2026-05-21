import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  HardDrive,
  Layers,
  Unlock,
  User,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Watchfire is an open-source remote control for AI coding agents. Our mission, principles, the maintainer, and how we got here.";

export const metadata: Metadata = {
  title: "About — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    type: "website",
    title: "About — Watchfire",
    description,
    url: `${siteUrl}/about`,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Watchfire",
    description,
    images: ["/og-image.png"],
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
      name: "About",
      item: `${siteUrl}/about`,
    },
  ],
};

type Principle = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const principles: Principle[] = [
  {
    title: "Boring on disk.",
    body: "Plain YAML, plain git. If you can't read the state with cat and git log, we got it wrong.",
    icon: <HardDrive className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
  },
  {
    title: "The operator is the loop.",
    body: "Watchfire doesn't decide when work is done — the operator does. We surface what matters and stay out of the way.",
    icon: <User className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
  },
  {
    title: "Six backends, one workflow.",
    body: "We're agent-agnostic. The day a better coding agent ships is the day we support it.",
    icon: <Layers className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
  },
  {
    title: "Open by default.",
    body: "Everything is on GitHub. No telemetry you didn't ask for. No tier above “all the features.”",
    icon: <Unlock className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
  },
];

type StoryEntry = {
  marker: string;
  text: string;
};

const story: StoryEntry[] = [
  {
    marker: "Late 2025",
    text: "First commit. A CLI that wrapped Claude Code and put each task in a git worktree.",
  },
  {
    marker: "v1.0.0 Ember (early 2026)",
    text: "JSONL transcripts, a formatted conversation log viewer, and sandbox hardening for projects living anywhere on disk.",
  },
  {
    marker: "v2.0.0 Spark",
    text: "Multi-agent support: Claude Code, OpenAI Codex, opencode, and Gemini CLI all become first-class backends.",
  },
  {
    marker: "v3.0.0 Blaze",
    text: "GitHub Copilot CLI joins the lineup as the fifth first-class backend.",
  },
  {
    marker: "v4.0.0 Beacon",
    text: "Two-way integrations, fleet and per-project insights, and the inline diff viewer.",
  },
  {
    marker: "v7.1.0 Forge (today)",
    text: "",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-about-breadcrumbs"
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
              About
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Built so coding agents earn their keep.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Watchfire is an open-source remote control for AI coding agents.
              We started building it because running these tools in the
              terminal felt like riding a motorcycle with no helmet &mdash;
              fast, sometimes useful, occasionally expensive.
            </p>
          </div>
        </section>

        <Divider />

        {/* Mission */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              What we&apos;re trying to do.
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              <p>
                Coding agents are powerful, but the surface &mdash; a single
                terminal session &mdash; doesn&apos;t scale to multiple
                tasks, multiple projects, or multiple engineers. Verifying
                what an agent actually changed takes longer than the change.
              </p>
              <p>
                Our bet is that every agent run should happen inside a
                sandboxed git worktree, the output should be a reviewable
                diff, and the operator should be able to see what was kept
                on disk in the time it takes to open a YAML file.
              </p>
              <p>
                The shape that falls out: a daemon that orchestrates, thin
                clients (CLI/TUI and GUI) that observe, and a task model
                that&apos;s just a YAML file.
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* Principles */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                How we make decisions.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Four rules that have survived contact with the codebase.
              </p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {principles.map((p) => (
                <li
                  key={p.title}
                  className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                    {p.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Read more on the{" "}
              <Link
                href="/security"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                security
              </Link>{" "}
              page.
            </p>
          </div>
        </section>

        <Divider />

        {/* Maintainers */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Who&apos;s building this.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Watchfire is a small open-source project. One maintainer today,
              plus contributors on GitHub.
            </p>

            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Nuno Coração
                </h3>
                <p className="text-sm font-medium text-fire-600 dark:text-fire-400">
                  Creator and maintainer
                </p>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                Nuno started Watchfire because he wanted to run coding agents
                without babysitting a terminal. He writes most of the daemon,
                the CLI/TUI, the GUI, and &mdash; in a properly recursive way
                &mdash; uses Watchfire to build Watchfire.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="https://github.com/nunocoracao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
                >
                  <Github className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Plus contributors on GitHub. Want to help? Read the{" "}
              <Link
                href="/docs/contributing"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                contributing guide
              </Link>
              .
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Writing about Watchfire? Grab logos and boilerplate on the{" "}
              <Link
                href="/press"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                press kit
              </Link>
              .
            </p>
          </div>
        </section>

        <Divider />

        {/* Story */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              How we got here.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              The short version. The long version is the{" "}
              <Link
                href="/docs/changelog"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                changelog
              </Link>
              .
            </p>

            <ol className="mt-10 space-y-6 border-l border-zinc-200 pl-6 dark:border-zinc-800">
              {story.map((entry, index) => {
                const isCurrent = index === story.length - 1;
                return (
                  <li key={entry.marker} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 ${
                        isCurrent
                          ? "border-fire-500 bg-fire-500 shadow-[0_0_12px_rgba(224,112,64,0.6)] dark:border-fire-400 dark:bg-fire-400"
                          : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                      }`}
                    />
                    <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-base">
                      {entry.marker}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {isCurrent ? (
                        <>
                          See the{" "}
                          <Link
                            href="/docs/changelog"
                            className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                          >
                            changelog
                          </Link>{" "}
                          for what&apos;s current.
                        </>
                      ) : (
                        entry.text
                      )}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <Divider />

        {/* Closer / CTAs */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Try it, star it, or come say hi.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Two minutes to install, one YAML file to your first task.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/quickstart"
                className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
              >
                Try Watchfire
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/watchfire-io/watchfire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <Github className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Star us on GitHub
              </a>
            </div>
            <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
              Read the{" "}
              <Link
                href="/docs"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                docs
              </Link>
              , browse the{" "}
              <Link
                href="/blog"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                blog
              </Link>
              , or come say hi on the{" "}
              <Link
                href="/community"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                community page
              </Link>
              .
            </p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Watchfire is open source &mdash; see{" "}
              <Link
                href="/open-source"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /open-source
              </Link>{" "}
              for the license, contributors, and how to sponsor the project.
            </p>
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
