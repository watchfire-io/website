import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRightLeft,
  BookOpen,
  Eye,
  Hammer,
  Layers,
  Terminal,
  TestTube,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { CodeCopyButton } from "@/components/CodeCopyButton";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import {
  getRelatedUseCases,
  getUseCase,
  useCases,
  type UseCaseIcon,
} from "@/lib/use-cases";
import type { BreadcrumbList } from "@/lib/jsonld-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const iconMap: Record<UseCaseIcon, LucideIcon> = {
  Hammer,
  ArrowRightLeft,
  TestTube,
  Layers,
  BookOpen,
  Eye,
  Terminal,
};

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const useCase = getUseCase(slug);

  if (!useCase) {
    return {
      title: "Use case not found — Watchfire",
      description: "This use case page does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${useCase.title} with Watchfire`;
  const description = useCase.tagline;
  const url = `${siteUrl}/use-cases/${useCase.slug}`;
  const ogImage = buildBlogOgUrl({
    title: useCase.title,
    description,
    section: "Use cases",
  });

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${title} | Watchfire`,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Watchfire`,
      description,
      images: [ogImage],
    },
  };
}

export default async function UseCaseDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  const Icon = iconMap[useCase.icon];
  const related = getRelatedUseCases(useCase);

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
        name: "Use cases",
        item: `${siteUrl}/use-cases`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: useCase.title,
        item: `${siteUrl}/use-cases/${useCase.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id={`ld-use-case-${useCase.slug}-breadcrumbs`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
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
                    href="/use-cases"
                    className="underline-offset-2 hover:text-fire-600 hover:underline dark:hover:text-fire-400"
                  >
                    Use cases
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  aria-current="page"
                  className="text-zinc-700 dark:text-zinc-300"
                >
                  {useCase.title}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Header */}
        <section className="px-6 pt-8 sm:pt-10">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-start gap-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                  {useCase.tag}
                </span>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                  {useCase.title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  {useCase.tagline}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who this is for */}
        <section className="px-6 pb-12 pt-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Who this is for.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              {useCase.intent}
            </p>
          </div>
        </section>

        {/* Workflow */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              The workflow in 4 steps.
            </h2>
            <ol className="mt-8 space-y-6">
              {useCase.workflow.map((step) => (
                <li
                  key={step.step}
                  className="relative rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fire-500 to-ember-500 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(224,112,64,0.25)]"
                      aria-hidden="true"
                    >
                      {step.step}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Task example */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              A real task you can copy.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Drop this into{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                .watchfire/tasks/&lt;n&gt;.yaml
              </code>
              , tweak it to your repo, and start it from the TUI or GUI.
            </p>
            <div className="mt-6">
              <CodeCopyButton
                code={useCase.taskExample}
                language="yaml"
                ariaLabel={`Copy ${useCase.title} task example`}
              />
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              More starters in the{" "}
              <Link
                href="/templates"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                task template library
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Why Watchfire */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Why Watchfire makes this faster.
            </h2>
            <ul className="mt-6 space-y-3">
              {useCase.whyWatchfire.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related docs */}
        {useCase.relatedDocs.length > 0 && (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Keep reading.
              </h2>
              <ul className="mt-6 space-y-3">
                {useCase.relatedDocs.map((doc) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      className="card-hover group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur-sm transition-all hover:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                      />
                      <span className="min-w-0">
                        <span className="block text-base font-medium text-zinc-900 group-hover:text-fire-700 dark:text-zinc-100 dark:group-hover:text-fire-300">
                          {doc.label}
                        </span>
                        {doc.description && (
                          <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {doc.description}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related use cases */}
        {related.length > 0 && (
          <section className="px-6 pb-20">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Related use cases.
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map((other) => {
                  const OtherIcon = iconMap[other.icon];
                  return (
                    <Link
                      key={other.slug}
                      href={`/use-cases/${other.slug}`}
                      className="card-hover group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
                          aria-hidden="true"
                        >
                          <OtherIcon className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                            {other.tag}
                          </span>
                          <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-lg">
                            {other.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {other.tagline}
                      </p>
                      <p className="mt-5 inline-flex items-center gap-1 text-sm text-fire-600 underline-offset-2 group-hover:underline dark:text-fire-400">
                        Read the playbook
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
                })}
              </div>
              <div className="mt-8 text-center text-sm">
                <Link
                  href="/use-cases"
                  className="inline-flex items-center gap-1 text-zinc-500 underline-offset-2 hover:text-fire-600 hover:underline dark:text-zinc-500 dark:hover:text-fire-400"
                >
                  See every use case
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

        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
