import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeCopyButton } from "@/components/CodeCopyButton";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Copy-paste 'Made with Watchfire' badges for your README, docs, and landing pages.";

const ogImage = buildBlogOgUrl({
  title: "Badges",
  description,
  section: "Badges",
});

export const metadata: Metadata = {
  title: "Badges — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/badge`,
  },
  openGraph: {
    type: "website",
    title: "Badges — Watchfire",
    description,
    url: `${siteUrl}/badge`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badges — Watchfire",
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
      name: "Badges",
      item: `${siteUrl}/badge`,
    },
  ],
};

const watchfireRepoUrl = "https://github.com/watchfire-io/watchfire";

type BadgeVariant = {
  id: string;
  title: string;
  description: string;
  file: string;
  height: number;
  previewTone: "dark" | "light" | "neutral" | "flame";
};

const variants: BadgeVariant[] = [
  {
    id: "default",
    title: "Default — fire orange",
    description:
      "Shields.io-style flat layout, 20px tall. Sits cleanly next to npm and build badges.",
    file: "made-with-watchfire.svg",
    height: 20,
    previewTone: "neutral",
  },
  {
    id: "dark",
    title: "Dark — charcoal",
    description:
      "Both halves dark with white text. For README headers on dark backgrounds.",
    file: "made-with-watchfire-dark.svg",
    height: 20,
    previewTone: "dark",
  },
  {
    id: "light",
    title: "Light — off-white",
    description:
      "Both halves light with dark text and a subtle border. For light README headers.",
    file: "made-with-watchfire-light.svg",
    height: 20,
    previewTone: "light",
  },
  {
    id: "flame",
    title: "Flame — gradient with logo",
    description:
      "Taller (28px), rounded, with the flame glyph and a fire-orange-to-ember-gold gradient. The hero variant.",
    file: "made-with-watchfire-flame.svg",
    height: 28,
    previewTone: "flame",
  },
];

function badgeUrl(file: string): string {
  return `${siteUrl}/badges/${file}`;
}

function buildMarkdownSnippet(file: string): string {
  return `[![Made with Watchfire](${badgeUrl(file)})](${watchfireRepoUrl})`;
}

function buildHtmlSnippet(file: string, height: number): string {
  return `<a href="${watchfireRepoUrl}"><img src="${badgeUrl(file)}" alt="Made with Watchfire" height="${height}" /></a>`;
}

function buildRstSnippet(file: string): string {
  return `.. image:: ${badgeUrl(file)}
   :target: ${watchfireRepoUrl}
   :alt: Made with Watchfire`;
}

function previewWrapperClasses(tone: BadgeVariant["previewTone"]): string {
  switch (tone) {
    case "dark":
      return "border-zinc-800 bg-[#0f1115]";
    case "light":
      return "border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-200";
    case "flame":
      return "border-zinc-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-950/60";
    default:
      return "border-zinc-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-950/60";
  }
}

function SnippetRow({
  label,
  code,
  language,
  ariaLabel,
}: {
  label: string;
  code: string;
  language: string;
  ariaLabel: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <CodeCopyButton code={code} language={language} ariaLabel={ariaLabel} />
    </div>
  );
}

function BadgeCard({ variant }: { variant: BadgeVariant }) {
  const file = variant.file;
  return (
    <article
      id={variant.id}
      className="card-hover scroll-mt-24 flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
    >
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
          Variant
        </span>
        <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
          {variant.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
          {variant.description}
        </p>
      </div>

      <div
        className={`mt-5 flex h-32 items-center justify-center rounded-xl border ${previewWrapperClasses(variant.previewTone)}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/badges/${file}`}
          alt={`Preview of the ${variant.title} badge`}
          height={variant.height}
          className="h-auto"
        />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <SnippetRow
          label="Markdown"
          code={buildMarkdownSnippet(file)}
          language="markdown"
          ariaLabel={`Copy Markdown snippet for ${variant.title}`}
        />
        <SnippetRow
          label="HTML"
          code={buildHtmlSnippet(file, variant.height)}
          language="html"
          ariaLabel={`Copy HTML snippet for ${variant.title}`}
        />
        <SnippetRow
          label="reStructuredText"
          code={buildRstSnippet(file)}
          language="rst"
          ariaLabel={`Copy reStructuredText snippet for ${variant.title}`}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-zinc-500 dark:text-zinc-500">
        <a
          href={`/badges/${file}`}
          download={file}
          className="inline-flex items-center gap-1 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Download SVG
        </a>
        <span aria-hidden="true">·</span>
        <span className="font-mono text-[12px]">/badges/{file}</span>
      </div>
    </article>
  );
}

export default function BadgePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-badge-breadcrumbs"
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
              Show your work
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Badges.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Embed a &ldquo;Made with Watchfire&rdquo; badge in your README to
              credit the workflow and help others discover Watchfire. Pick a
              style, copy the snippet, paste it in.
            </p>
            <div className="mt-7 rounded-2xl border border-zinc-200 bg-white/70 p-5 text-sm leading-relaxed text-zinc-700 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 sm:p-6 sm:text-[15px]">
              Looking for the full press kit &mdash; logo files, palette,
              typography? That lives on the{" "}
              <Link
                href="/brand"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                brand page
              </Link>
              .
            </div>
          </div>
        </section>

        {/* Badge gallery */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2">
              {variants.map((variant) => (
                <BadgeCard key={variant.id} variant={variant} />
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Usage guidelines */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Usage guidelines.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              A short list. Use the badge to credit, not to claim.
            </p>
            <ul className="mt-8 grid gap-3">
              {[
                <>
                  Link the badge to{" "}
                  <a
                    href={watchfireRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    github.com/watchfire-io/watchfire
                  </a>
                  , or to your own Watchfire-built repo.
                </>,
                <>
                  Use the badge to credit the workflow, not to imply
                  endorsement. Watchfire hasn&rsquo;t reviewed any specific
                  project that uses it.
                </>,
                <>
                  The badge SVGs are public domain (CC0). Embed them, mirror
                  them, self-host them &mdash; no attribution required, though
                  it&rsquo;s appreciated.
                </>,
                <>
                  Don&rsquo;t recolor the badge to something off-brand. Use one
                  of the four variants as-is. Need a custom variant?{" "}
                  <a
                    href="https://github.com/watchfire-io/watchfire/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    Open a discussion
                  </a>
                  .
                </>,
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm leading-relaxed text-zinc-700 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 sm:text-[15px]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer band */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              Want a different size or layout? The SVG sources are in the
              website repo &mdash;{" "}
              <a
                href="https://github.com/watchfire-io/watchfire/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                contribute one
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
