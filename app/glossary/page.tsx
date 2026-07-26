import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import GlossaryJsonLd from "@/components/GlossaryJsonLd";
import { GlossaryAnchor } from "@/components/GlossaryAnchor";
import { GlossaryFilter } from "@/components/GlossaryFilter";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";
import {
  findGlossaryEntry,
  glossary,
  glossaryCategories,
  groupedGlossary,
  type GlossaryEntry,
} from "@/lib/glossary";

const description =
  "Plain-English definitions of every Watchfire term, mode, and concept.";

const ogImage = buildBlogOgUrl({
  title: "Glossary",
  description,
  section: "Reference",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Glossary — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/glossary`,
  },
  openGraph: {
    type: "website",
    title: "Glossary — Watchfire",
    description,
    url: `${siteUrl}/glossary`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossary — Watchfire",
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
      name: "Glossary",
      item: `${siteUrl}/glossary`,
    },
  ],
};

// Render a definition string into a ReactNode, turning backtick segments into
// <code> and Markdown-style links into anchors. Keeps the data module plain.
function renderDefinition(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const tokenRe = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(
        <code
          key={key++}
          className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.9em] text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        parts.push(
          <a
            key={key++}
            href={linkMatch[2]}
            className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
          >
            {linkMatch[1]}
          </a>,
        );
      }
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

function renderSeeAlsoChips(entry: GlossaryEntry): ReactNode {
  if (!entry.seeAlso || entry.seeAlso.length === 0) return null;
  return (
    <>
      {entry.seeAlso.map((slug) => {
        const target = findGlossaryEntry(slug);
        if (!target) return null;
        return (
          <a
            key={slug}
            href={`#${target.slug}`}
            className="inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-2.5 py-0.5 text-xs font-medium text-zinc-600 transition-colors hover:border-fire-500/40 hover:text-fire-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-fire-400/40 dark:hover:text-fire-400"
          >
            {target.term}
          </a>
        );
      })}
    </>
  );
}

const groups = groupedGlossary();

const renderedDefinitions: Record<string, ReactNode> = Object.fromEntries(
  glossary.map((entry) => [entry.slug, renderDefinition(entry.definition)]),
);

const renderedSeeAlso: Record<string, ReactNode> = Object.fromEntries(
  glossary.flatMap((entry) => [
    [
      `anchor:${entry.slug}`,
      <GlossaryAnchor
        key={entry.slug}
        slug={entry.slug}
        termName={entry.term}
      />,
    ],
    [`chips:${entry.slug}`, renderSeeAlsoChips(entry)],
  ]),
);

const totalEntries = glossary.length;
const totalCategories = glossaryCategories.length;

export default function GlossaryPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-glossary-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <GlossaryJsonLd />

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
              <BookOpen
                className="h-3.5 w-3.5"
                strokeWidth={2}
                aria-hidden="true"
              />
              Glossary
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              The Watchfire{" "}
              <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
                glossary
              </span>
              .
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Plain-English definitions of every Watchfire term, mode, and
              concept &mdash; the canonical reference any other page on the site
              can link to. {totalEntries} terms across {totalCategories}{" "}
              categories. Use the filter or jump to a section.
            </p>
          </div>
        </section>

        {/* Glossary body */}
        <section className="px-6 pb-20 pt-4 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <GlossaryFilter
              groups={groups}
              renderedDefinitions={renderedDefinitions}
              renderedSeeAlso={renderedSeeAlso}
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
