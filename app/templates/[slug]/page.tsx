import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { CodeCopyButton } from "@/components/CodeCopyButton";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import {
  getRelatedTaskTemplates,
  getTaskTemplate,
  taskTemplates,
  type TaskTemplate,
} from "@/lib/task-templates";
import { getUseCase } from "@/lib/use-cases";
import type { BreadcrumbList, HowTo } from "@/lib/jsonld-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return taskTemplates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const template = getTaskTemplate(slug);

  if (!template) {
    return {
      title: "Template not found — Watchfire",
      description: "This task template does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${template.title} task template — Watchfire`;
  const description = template.tagline;
  const url = `${siteUrl}/templates/${template.slug}`;
  const ogImage = buildBlogOgUrl({
    title: template.title,
    description,
    section: "Template",
  });

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${template.title} task template | Watchfire`,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.title} task template | Watchfire`,
      description,
      images: [ogImage],
    },
  };
}

function RelatedTemplateCard({ template }: { template: TaskTemplate }) {
  const Icon = template.icon;
  return (
    <Link
      key={template.slug}
      href={`/templates/${template.slug}`}
      className="card-hover group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50"
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
          <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-lg">
            {template.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {template.tagline}
      </p>
      <p className="mt-5 inline-flex items-center gap-1 text-sm text-fire-600 underline-offset-2 group-hover:underline dark:text-fire-400">
        Open the template
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </p>
    </Link>
  );
}

export default async function TemplateDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const template = getTaskTemplate(slug);
  if (!template) notFound();

  const Icon = template.icon;
  const related = getRelatedTaskTemplates(template);
  const url = `${siteUrl}/templates/${template.slug}`;

  const useCaseLinks = (template.relatedUseCases ?? [])
    .map((useCaseSlug) => {
      const useCase = getUseCase(useCaseSlug);
      if (!useCase) return null;
      return {
        slug: useCase.slug,
        title: useCase.title,
        tagline: useCase.tagline,
      };
    })
    .filter((entry): entry is { slug: string; title: string; tagline: string } =>
      entry !== null,
    );

  const breadcrumbsLd: BreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Task templates",
        item: `${siteUrl}/templates`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: template.title,
        item: url,
      },
    ],
  };

  const howToLd: HowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${template.title} — Watchfire task template`,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the template YAML",
        text: "Copy the YAML block on this page to your clipboard.",
        url: `${url}#yaml`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Save it under .watchfire/tasks/",
        text: "Save the YAML as `.watchfire/tasks/NNNN.yaml`, where NNNN is the next unused number in that directory.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Edit the prompt and acceptance criteria",
        text: `Adapt the prompt and acceptance criteria to your repo. Keep status: ready. Watch for the pitfalls listed on this page.`,
        url: `${url}#pitfalls`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Let the daemon run it",
        text: "The Watchfire daemon picks up the new task automatically, or run `watchfire run NNNN` to start it on demand.",
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id={`ld-template-${template.slug}-breadcrumbs`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id={`ld-template-${template.slug}-howto`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />

        {/* Breadcrumb */}
        <section className="px-6 pt-10">
          <div className="mx-auto max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="text-xs text-zinc-500 dark:text-zinc-500"
            >
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link
                    href="/"
                    className="underline-offset-2 hover:text-fire-600 hover:underline dark:hover:text-fire-400"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/templates"
                    className="underline-offset-2 hover:text-fire-600 hover:underline dark:hover:text-fire-400"
                  >
                    Templates
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  aria-current="page"
                  className="text-zinc-700 dark:text-zinc-300"
                >
                  {template.title}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Hero */}
        <section className="relative px-6 pb-12 pt-8 sm:pt-10">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[320px] w-[320px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl">
            <div className="flex items-start gap-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                  Task template
                </span>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                  {template.title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  {template.tagline}
                </p>
                <div className="mt-5">
                  <CodeCopyButton
                    code={template.yaml}
                    variant="prose"
                    ariaLabel={`Copy ${template.title} YAML to clipboard`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl">
            <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              {template.description}
            </p>
          </div>
        </section>

        {/* When to use */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              When to reach for this template.
            </h2>
            <ul className="mt-6 space-y-3">
              {template.when.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fire-500/10 text-fire-600 dark:bg-fire-400/10 dark:text-fire-400"
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* YAML */}
        <section id="yaml" className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              The template.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Drop this into{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                .watchfire/tasks/&lt;n&gt;.yaml
              </code>
              , edit the{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                prompt
              </code>{" "}
              and{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                acceptance_criteria
              </code>{" "}
              to match your repo, and let the daemon run it.
            </p>
            <div className="mt-6">
              <CodeCopyButton
                code={template.yaml}
                language="yaml"
                ariaLabel={`Copy ${template.title} template YAML`}
              />
            </div>
          </div>
        </section>

        {/* Pitfalls */}
        <section id="pitfalls" className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Common pitfalls.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              The shapes of failure most often seen on this kind of task — and
              the way this template hedges against each.
            </p>
            <div className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-6 backdrop-blur-sm dark:border-amber-400/30 dark:bg-amber-400/5 sm:p-7">
              <ul className="space-y-4">
                {template.pitfalls.map((pitfall) => (
                  <li key={pitfall} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-200/70 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300"
                      aria-hidden="true"
                    >
                      <AlertTriangle className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {pitfall}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related templates */}
        {related.length > 0 && (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Related templates.
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {related.slice(0, 3).map((other) => (
                  <RelatedTemplateCard key={other.slug} template={other} />
                ))}
              </div>
              <div className="mt-8 text-center text-sm">
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-1 text-zinc-500 underline-offset-2 hover:text-fire-600 hover:underline dark:text-zinc-500 dark:hover:text-fire-400"
                >
                  See every template
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
              </div>
            </div>
          </section>
        )}

        {/* Related use cases */}
        {useCaseLinks.length > 0 && (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Pair it with a playbook.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                These use-case playbooks lean on tasks shaped like this one.
              </p>
              <ul className="mt-6 space-y-3">
                {useCaseLinks.map((useCase) => (
                  <li key={useCase.slug}>
                    <Link
                      href={`/use-cases/${useCase.slug}`}
                      className="card-hover group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm transition-all hover:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                      />
                      <span className="min-w-0">
                        <span className="block text-base font-medium text-zinc-900 group-hover:text-fire-700 dark:text-zinc-100 dark:group-hover:text-fire-300">
                          {useCase.title}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {useCase.tagline}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-gradient-to-br from-white/80 to-fire-500/[0.04] p-7 backdrop-blur-sm dark:border-zinc-800 dark:from-zinc-900/70 dark:to-fire-400/[0.06] sm:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Build your own.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              This template is a starting point. Fill in a form to draft your
              own task in the playground — or read the full task schema to
              learn every field the daemon understands.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/playground"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(224,112,64,0.25)] transition-transform hover:translate-y-[-1px]"
              >
                Build your own
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
              <Link
                href="/docs/concepts/projects-and-tasks"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-fire-500/50 hover:text-fire-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-fire-400"
              >
                Learn the task schema
              </Link>
            </div>
          </div>
        </section>

        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
