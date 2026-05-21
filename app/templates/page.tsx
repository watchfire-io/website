import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeCopyButton } from "@/components/CodeCopyButton";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import { taskTemplates } from "@/lib/task-templates";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Copy-paste starter task YAMLs for the most common things you'll ask a coding agent to do.";

const ogImage = buildBlogOgUrl({
  title: "Task templates",
  description,
  section: "Templates",
});

export const metadata: Metadata = {
  title: "Task templates — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/templates`,
  },
  openGraph: {
    type: "website",
    title: "Task templates — Watchfire",
    description,
    url: `${siteUrl}/templates`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Task templates — Watchfire",
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
      name: "Task templates",
      item: `${siteUrl}/templates`,
    },
  ],
};

export default function TemplatesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-templates-breadcrumbs"
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
              Templates
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Task templates.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Eight starter tasks, ready to copy into{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                .watchfire/tasks/
              </code>
              . Adapt the prompt and acceptance criteria; everything else just
              works. Prefer to fill in a form? Try the{" "}
              <Link
                href="/playground"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                playground
              </Link>
              .
            </p>

            <div className="mt-7 rounded-2xl border border-zinc-200 bg-white/70 p-5 text-sm leading-relaxed text-zinc-700 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 sm:p-6 sm:text-[15px]">
              These templates are the library. For the theory behind why a
              well-shaped task lands cleanly, read{" "}
              <Link
                href="/blog/2026-05-19-anatomy-of-a-great-task"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Anatomy of a great task
              </Link>
              . For longer, narrative walkthroughs with full repo context, see{" "}
              <Link
                href="/docs/recipes"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /docs/recipes
              </Link>
              . The formal schema for every field is documented in{" "}
              <Link
                href="/docs/concepts/projects-and-tasks"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Projects and Tasks
              </Link>
              .
            </div>
          </div>
        </section>

        {/* Template gallery */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2">
              {taskTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <article
                    key={template.slug}
                    id={template.slug}
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
                          Template
                        </span>
                        <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                          <Link
                            href={`/templates/${template.slug}`}
                            className="underline-offset-2 hover:text-fire-600 hover:underline dark:hover:text-fire-400"
                          >
                            {template.title}
                          </Link>
                        </h2>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        When to use:
                      </span>{" "}
                      {template.whenToUse}
                    </p>
                    <div className="mt-5">
                      <CodeCopyButton
                        code={template.yaml}
                        ariaLabel={`Copy ${template.title} template`}
                      />
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500 sm:text-[13px]">
                      <span className="font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                        Pitfall —
                      </span>{" "}
                      {template.pitfall}
                    </p>
                    <p className="mt-5 text-sm">
                      <Link
                        href={`/templates/${template.slug}`}
                        className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                      >
                        Read the full template
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
                          className="transition-transform"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to use these */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              How to use these.
            </h2>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px]">
              <li className="flex gap-4">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fire-500/10 font-mono text-[12px] font-semibold text-fire-600 dark:bg-fire-400/10 dark:text-fire-400"
                  aria-hidden="true"
                >
                  1
                </span>
                <span>Copy the YAML for the template you want.</span>
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
                  </code>
                  , replacing{" "}
                  <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    NNNN
                  </code>{" "}
                  with the next unused number in that directory.
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
                  Edit the{" "}
                  <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    prompt
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    acceptance_criteria
                  </code>{" "}
                  to match your repo. Keep{" "}
                  <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    status: ready
                  </code>{" "}
                  (already set in every template).
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
                    watchfire run NNNN
                  </code>{" "}
                  to start it on demand.
                </span>
              </li>
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
              For the full schema of every field — including the bookkeeping
              ones the daemon writes for you — see{" "}
              <Link
                href="/docs/concepts/projects-and-tasks"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Projects and Tasks
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Footer band */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              Want a template for something not in this list? Open a{" "}
              <a
                href="https://github.com/watchfire-io/watchfire/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                discussion
              </a>{" "}
              &mdash; we&rsquo;ll add it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
