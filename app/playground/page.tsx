import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlaygroundBuilder } from "@/components/PlaygroundBuilder";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const title = "Task playground — Watchfire";
const description =
  "Build a Watchfire task YAML in your browser. No install required — fill in the fields, copy the result, paste it into .watchfire/tasks/.";

const ogImage = buildBlogOgUrl({
  title: "Task playground",
  description,
  section: "Playground",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/playground`,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteUrl}/playground`,
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Task playground",
      item: `${siteUrl}/playground`,
    },
  ],
};

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-playground-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
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
              Try it
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Task playground.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              The fastest way to see what a Watchfire task looks like — no
              install required. Fill in the form, watch the YAML update on
              the right, copy it into{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                .watchfire/tasks/
              </code>{" "}
              when you&rsquo;re ready.
            </p>

            <div className="mt-7 rounded-2xl border border-zinc-200 bg-white/70 p-5 text-sm leading-relaxed text-zinc-700 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 sm:p-6 sm:text-[15px]">
              Already know what you want?{" "}
              <Link
                href="/templates"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /templates
              </Link>{" "}
              has eight ready-to-paste starters. For the formal schema of
              every field, see{" "}
              <Link
                href="/docs/concepts/projects-and-tasks"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Projects and Tasks
              </Link>
              . Quick reference:{" "}
              <Link
                href="/cheatsheet"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /cheatsheet
              </Link>
              . If you&rsquo;d like to understand{" "}
              <em>why</em> a good task is shaped this way, read{" "}
              <Link
                href="/blog/2026-05-19-anatomy-of-a-great-task"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Anatomy of a great task
              </Link>
              .
            </div>
          </div>
        </section>

        {/* Builder */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <PlaygroundBuilder />
          </div>
        </section>

        {/* What now? */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              What now?
            </h2>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px]">
              <li className="flex gap-4">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fire-500/10 font-mono text-[12px] font-semibold text-fire-600 dark:bg-fire-400/10 dark:text-fire-400"
                  aria-hidden="true"
                >
                  1
                </span>
                <span>Copy the YAML, or download it.</span>
              </li>
              <li className="flex gap-4">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fire-500/10 font-mono text-[12px] font-semibold text-fire-600 dark:bg-fire-400/10 dark:text-fire-400"
                  aria-hidden="true"
                >
                  2
                </span>
                <span>
                  Save it as{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    .watchfire/tasks/NNNN.yaml
                  </code>{" "}
                  in your project, where{" "}
                  <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    NNNN
                  </code>{" "}
                  is the next unused number in that directory.
                </span>
              </li>
              <li className="flex gap-4">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fire-500/10 font-mono text-[12px] font-semibold text-fire-600 dark:bg-fire-400/10 dark:text-fire-400"
                  aria-hidden="true"
                >
                  3
                </span>
                <span>
                  Make sure{" "}
                  <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    status: ready
                  </code>
                  .
                </span>
              </li>
              <li className="flex gap-4">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fire-500/10 font-mono text-[12px] font-semibold text-fire-600 dark:bg-fire-400/10 dark:text-fire-400"
                  aria-hidden="true"
                >
                  4
                </span>
                <span>
                  The daemon picks it up automatically, or run{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    watchfire task start NNNN
                  </code>{" "}
                  to launch it on demand.
                </span>
              </li>
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
              First time running Watchfire? See{" "}
              <Link
                href="/docs/quickstart"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /docs/quickstart
              </Link>{" "}
              for the full first-run flow.
            </p>
          </div>
        </section>

        {/* Footer band */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              This page builds what{" "}
              <Link
                href="/templates"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /templates
              </Link>{" "}
              shows pre-built. If you want eight ready-to-paste starters,
              go there instead.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
