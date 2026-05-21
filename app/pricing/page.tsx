import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Coins,
  Cpu,
  Eye,
  FileText,
  Github,
  Scale,
  Sparkles,
  Tag,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeCopyButton } from "@/components/CodeCopyButton";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Watchfire is free, open source, and self-hosted. You pay for your agent — not for us. Here is what you actually pay for, and what you do not.";

const ogImage = buildBlogOgUrl({
  title: "Pricing",
  description: "Watchfire is free. You pay for your agent — not for us.",
  section: "Pricing",
});

export const metadata: Metadata = {
  title: "Pricing — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/pricing`,
  },
  openGraph: {
    type: "website",
    title: "Pricing — Watchfire",
    description,
    url: `${siteUrl}/pricing`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Watchfire",
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
      name: "Pricing",
      item: `${siteUrl}/pricing`,
    },
  ],
};

const repoUrl = "https://github.com/watchfire-io/watchfire";
const licenseUrl = `${repoUrl}/blob/main/LICENSE`;
const costPostUrl = "/blog/2026-05-22-what-it-costs-to-run-watchfire";

const includedInFree: string[] = [
  "Every agent mode — chat, task, start-all, wildfire",
  "Every supported backend — Claude Code, Codex, opencode, Gemini CLI, Copilot CLI, Cursor Agent",
  "The watchfired daemon, CLI, TUI, and Watchfire.app GUI",
  "Sandboxed git worktree isolation",
  "Two-way integrations and fleet insights",
  "Every future release under the same license",
  "All source on GitHub — no closed edition, no waiting list",
];

type CostItem = {
  id: string;
  icon: typeof Coins;
  tag: string;
  title: string;
  body: React.ReactNode;
};

const realCostItems: CostItem[] = [
  {
    id: "tokens",
    icon: Coins,
    tag: "Line item 1",
    title: "Agent API tokens.",
    body: (
      <>
        This is the only line item with a per-task dollar figure on it.
        Watchfire is a control surface; the agent backend you point it at
        &mdash; Claude, Codex, opencode, Gemini, Copilot, Cursor &mdash; is
        the thing actually spending money. A short, well-scoped task on a
        workhorse model costs cents. A long refactor on a frontier model
        reading a large codebase costs dollars. For per-backend ranges and
        the three things that actually move the bill, read{" "}
        <Link
          href={costPostUrl}
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          what it costs to run Watchfire
        </Link>
        .
      </>
    ),
  },
  {
    id: "compute",
    icon: Cpu,
    tag: "Line item 2",
    title: "Compute on your machine.",
    body: (
      <>
        Watchfire runs as a local daemon on your laptop, dev box, or CI
        runner. Each agent session is a PTY-managed subprocess in its own
        sandboxed git worktree, so &ldquo;compute&rdquo; here is mostly CPU
        for the agent itself, disk for the worktree copies, and a few
        hundred megabytes of RAM for the daemon and the GUI. On a normal
        development machine, the marginal cost is effectively zero. On a
        rented runner, it is whatever your runner already costs &mdash;
        Watchfire does not add a tier on top.
      </>
    ),
  },
  {
    id: "review",
    icon: Eye,
    tag: "Line item 3",
    title: "Your time reviewing the diff.",
    body: (
      <>
        The unglamorous one, and the one that quietly dominates the others.
        Every agent run produces a branch and a diff that needs a human to
        decide whether it ships. Watchfire is designed to make that review
        fast &mdash; the worktree, the transcript, the YAML task spec are
        all right there &mdash; but it does not remove the step. The
        operator is the loop. Budget reviewer time the same way you would
        budget API tokens.
      </>
    ),
  },
];

const notPayingFor: { title: string; body: string }[] = [
  {
    title: "No per-seat fees.",
    body: "There is no \"team\" SKU. Five engineers on one project pay the same as one engineer on five projects — nothing.",
  },
  {
    title: "No per-task or per-run fees.",
    body: "Wildfire mode can churn through dozens of sessions overnight. Watchfire charges nothing for any of them. The agent backend bills you directly; we are not in that loop.",
  },
  {
    title: "No telemetry surcharge.",
    body: "There is no telemetry that turns into an invoice. No usage you have to opt out of to avoid a bill.",
  },
  {
    title: "No \"enterprise\" gate on features.",
    body: "There is one edition. Every mode, every integration, every backend, every release is in the same open-source repo under the same license.",
  },
];

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "Is there a hosted version of Watchfire?",
    answer:
      "Not today. Watchfire is a daemon that runs on your machine, spawns coding agents inside sandboxed git worktrees, and stores all state on local disk. There is no hosted Watchfire Cloud, no managed control plane, and no waiting list to sign up for. If a hosted offering ever lands, it will be announced on the changelog and the blog — and the self-hosted edition will remain free and open source.",
  },
  {
    question: "Will Watchfire ever charge for the open-source product?",
    answer:
      "The self-hosted daemon, CLI/TUI, and GUI are released under the Apache License 2.0 and will keep being released under that license. Charging for what is already in the repo would mean re-licensing code that has shipped to users, which is not on the table. If we ever build paid services on top — hosted runners, managed teams, support contracts — those would be additions, not replacements.",
  },
  {
    question: "What about commercial or enterprise use?",
    answer:
      "Apache 2.0 permits commercial use, modification, redistribution, and embedding Watchfire inside your own tools, with no separate \"commercial\" license to negotiate. There is also an explicit patent grant. Companies are using it the same way a single developer would — clone the repo, install the binaries, point it at an agent backend. Read the LICENSE for the binding terms.",
  },
];

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
};

const installSnippet = `# macOS — install via Homebrew
brew tap watchfire-io/tap
brew install --cask watchfire-io/tap/watchfire`;

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-pricing-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-pricing-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
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
              <Tag className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              Pricing
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Watchfire is{" "}
              <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
                free
              </span>
              , open source, and self-hosted.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              You pay for your agent &mdash; not for us. The daemon, the
              CLI/TUI, the GUI, every mode, every backend, every release
              ships under the same permissive license. The only bill that
              shows up because of Watchfire is the one your agent backend
              would have run up anyway.
            </p>
          </div>
        </section>

        <Divider />

        {/* Plan grid */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                The plan.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                One edition. Every feature. Nothing held back.
              </p>
            </div>

            <article className="relative mt-10 overflow-hidden rounded-2xl border border-fire-500/40 bg-white/70 p-7 backdrop-blur-sm shadow-[0_0_30px_rgba(224,112,64,0.15)] dark:border-fire-400/40 dark:bg-zinc-900/60 sm:p-9">
              <div
                className="glow-blob glow-blob-fire pointer-events-none -right-16 -top-16 h-[260px] w-[260px] opacity-60"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                      <Sparkles
                        className="h-3 w-3"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                      Free forever
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                      Watchfire
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      Self-hosted. Apache-2.0. The whole product.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                      $0
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      forever
                    </p>
                  </div>
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {includedInFree.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fire-500/15 text-fire-600 dark:bg-fire-400/15 dark:text-fire-300"
                        aria-hidden="true"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/docs/installation"
                    className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
                  >
                    Install Watchfire
                    <ArrowRight
                      className="h-4 w-4"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </Link>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
                  >
                    <Github
                      className="h-4 w-4"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Star on GitHub
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <Divider />

        {/* Where the real cost lives */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Where the real cost lives.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Watchfire is free. Running coding agents is not. Three
                honest line items.
              </p>
            </div>

            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {realCostItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.id}
                    className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                      {item.tag}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <Divider />

        {/* What you are NOT paying for */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                What you are <em className="not-italic text-fire-600 dark:text-fire-400">not</em>{" "}
                paying for.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The list of things Watchfire deliberately does not charge
                for &mdash; in case other developer tools have trained you
                to expect otherwise.
              </p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {notPayingFor.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-300/70 bg-zinc-100 text-zinc-500 dark:border-zinc-700/70 dark:bg-zinc-900 dark:text-zinc-500"
                    aria-hidden="true"
                  >
                    <X className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* License callout */}
            <div className="mt-10 rounded-2xl border border-fire-500/30 bg-fire-500/[0.04] p-6 backdrop-blur-sm dark:border-fire-400/30 dark:bg-fire-400/[0.04] sm:p-7">
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
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                    Apache License 2.0.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px]">
                    Use Watchfire commercially, modify it, redistribute
                    it, embed it in your own tools. Keep the license and
                    copyright notices intact, state any significant
                    changes you made &mdash; that&rsquo;s it. There is an
                    explicit patent grant on top. Same license as
                    Kubernetes and Terraform.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
                    >
                      <FileText
                        className="h-4 w-4"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Read the LICENSE
                    </a>
                    <Link
                      href="/open-source"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
                    >
                      <Users
                        className="h-4 w-4"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Open source page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* FAQs */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              The pricing questions we get asked.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Three honest answers. More questions live on the{" "}
              <Link
                href="/faq"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                FAQ page
              </Link>
              .
            </p>

            <ul className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <li
                  key={faq.question}
                  className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                >
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-lg">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {faq.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* CTA strip */}
        <section className="relative overflow-hidden px-6 py-20">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(224,112,64,0.10) 0%, rgba(226,144,32,0.08) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-fire pointer-events-none -left-20 top-1/4 h-[320px] w-[320px]"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none -right-10 bottom-0 h-[280px] w-[280px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/40 bg-fire-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              <Zap className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
              Ready to install
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Install in two commands.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              macOS via Homebrew. Linux and Windows have one-liners too
              &mdash; the installation guide has all three.
            </p>

            <div className="mx-auto mt-8 max-w-xl text-left">
              <CodeCopyButton code={installSnippet} language="bash" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/installation"
                className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
              >
                Read the installation guide
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </Link>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <Github
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                View on GitHub
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
