import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";
import {
  faqCategories,
  reactNodeToText,
} from "@/lib/faq-page-data";

const description =
  "Everything we get asked about Watchfire — agent modes, sandbox, supported CLIs, secrets, pricing, comparisons, troubleshooting.";

const ogImage = buildBlogOgUrl({
  title: "FAQ",
  description: "Everything we get asked about Watchfire.",
  section: "FAQ",
});

export const metadata: Metadata = {
  title: "Frequently asked questions — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    type: "website",
    title: "Frequently asked questions — Watchfire",
    description,
    url: `${siteUrl}/faq`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently asked questions — Watchfire",
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
      name: "FAQ",
      item: `${siteUrl}/faq`,
    },
  ],
};

const allEntries = faqCategories.flatMap((cat) => cat.entries);

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allEntries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: reactNodeToText(entry.answer),
    },
  })),
};

const totalEntries = allEntries.length;
const totalCategories = faqCategories.length;

export default function FaqPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-faq-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-faq-page"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
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
              <HelpCircle className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              FAQ
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Frequently asked{" "}
              <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
                questions
              </span>
              .
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              The honest version &mdash; how Watchfire fits together, what it
              does, what it doesn&rsquo;t, and where to look when something
              breaks. {totalEntries} questions across {totalCategories}{" "}
              categories. Jump straight to a section, or expand any question.
            </p>
          </div>
        </section>

        {/* FAQ body */}
        <section className="px-6 pb-20 pt-4 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
              {/* Category nav */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="lg:hidden">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Jump to a category
                  </p>
                  <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2">
                    {faqCategories.map((cat) => (
                      <a
                        key={cat.id}
                        href={`#${cat.id}`}
                        className="inline-flex items-center whitespace-nowrap rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:border-fire-500/40 hover:text-fire-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-fire-400/40 dark:hover:text-fire-400"
                      >
                        {cat.title}
                      </a>
                    ))}
                  </div>
                </div>
                <nav
                  aria-label="FAQ categories"
                  className="hidden rounded-xl border border-zinc-200 bg-white/60 p-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 lg:block"
                >
                  <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Categories
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {faqCategories.map((cat) => (
                      <li key={cat.id}>
                        <a
                          href={`#${cat.id}`}
                          className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-white"
                        >
                          {cat.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              {/* Category sections */}
              <div className="space-y-16">
                {faqCategories.map((cat) => (
                  <section
                    key={cat.id}
                    id={cat.id}
                    aria-labelledby={`${cat.id}-title`}
                    className="scroll-mt-24"
                  >
                    <header>
                      <h2
                        id={`${cat.id}-title`}
                        className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
                      >
                        {cat.title}
                      </h2>
                      {cat.description && (
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {cat.description}
                        </p>
                      )}
                    </header>

                    <div className="mt-6 space-y-3">
                      {cat.entries.map((entry) => (
                        <details
                          key={entry.id}
                          id={entry.id}
                          className="group/faq scroll-mt-24 overflow-hidden rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-sm transition-colors hover:border-fire-500/30 open:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30 dark:open:border-fire-400/40 dark:hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] [&[open]>summary>svg.chevron]:rotate-180"
                        >
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-5 py-4 text-left text-base font-semibold text-zinc-900 marker:hidden dark:text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                            <span>{entry.question}</span>
                            <svg
                              className="chevron mt-1 shrink-0 text-zinc-400 transition-transform duration-200 group-hover/faq:text-fire-500 dark:group-hover/faq:text-fire-400"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </summary>
                          <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                            {entry.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                ))}
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
