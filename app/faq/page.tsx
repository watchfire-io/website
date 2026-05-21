import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { FaqFilter } from "@/components/FaqFilter";
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

const renderedAnswers: Record<string, ReactNode> = Object.fromEntries(
  allEntries.map((entry) => [entry.id, entry.answer]),
);

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
              categories. Use the filter or jump straight to a section.
            </p>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
              Stuck on a word? See the{" "}
              <Link
                href="/glossary"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Glossary &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ body */}
        <section className="px-6 pb-20 pt-4 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <FaqFilter
              categories={faqCategories}
              renderedAnswers={renderedAnswers}
            />
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
