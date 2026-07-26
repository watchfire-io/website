import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmbedSnippetTabs, type EmbedSnippet } from "@/components/EmbedSnippetTabs";
import { siteUrl, softwareVersion, socialLinks } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Copy-paste badges, stats, and widgets you can drop into any project.";

const ogImage = buildBlogOgUrl({
  title: "Embed kit",
  description,
  section: "Resources",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Embed kit — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/embed`,
  },
  openGraph: {
    type: "website",
    title: "Embed kit — Watchfire",
    description,
    url: `${siteUrl}/embed`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Embed kit — Watchfire",
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
      name: "Embed kit",
      item: `${siteUrl}/embed`,
    },
  ],
};

const repoUrl = socialLinks.github;
const builtWithUrl = `${siteUrl}/built-with-watchfire`;
const badgeUrl = `${siteUrl}/badges/made-with-watchfire-flame.svg`;
const poweredByUrl = `${siteUrl}/embed/powered-by.svg`;
const statsEmbedUrl = `${siteUrl}/embed/stats`;

const shieldsStarsUrl =
  "https://img.shields.io/github/stars/watchfire-io/watchfire?style=flat&logo=github&label=stars&color=e07040";
const shieldsVersionUrl =
  "https://img.shields.io/github/v/release/watchfire-io/watchfire?style=flat&logo=github&label=version&color=e07040";

type Widget = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  whereItGoes: string;
  preview: React.ReactNode;
  snippets: EmbedSnippet[];
};

function fenced(code: string): string {
  return code.replace(/\s+$/g, "");
}

const widgets: Widget[] = [
  {
    id: "made-with-watchfire",
    eyebrow: "Badge",
    title: "Made with Watchfire",
    blurb:
      "The hero badge. Gradient pill with the flame glyph — credits Watchfire in your README header.",
    whereItGoes:
      "Drop into your project README above the install instructions, or in a docs sidebar.",
    preview: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/badges/made-with-watchfire-flame.svg"
        alt="Made with Watchfire badge preview"
        height={28}
        className="h-auto"
      />
    ),
    snippets: [
      {
        label: "Markdown",
        language: "markdown",
        code: fenced(`[![Made with Watchfire](${badgeUrl})](${repoUrl})`),
      },
      {
        label: "HTML",
        language: "html",
        code: fenced(
          `<a href="${repoUrl}"><img src="${badgeUrl}" alt="Made with Watchfire" height="28" /></a>`,
        ),
      },
    ],
  },
  {
    id: "github-stars",
    eyebrow: "GitHub",
    title: "GitHub stars badge",
    blurb:
      "Live star count for the Watchfire repository, served by shields.io. Updates without redeploys.",
    whereItGoes:
      "Use it on a personal site, blog post, or any place you want to highlight the project's traction.",
    preview: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={shieldsStarsUrl}
        alt="Watchfire GitHub stars"
        height={20}
        className="h-5 w-auto"
      />
    ),
    snippets: [
      {
        label: "Markdown",
        language: "markdown",
        code: fenced(`[![GitHub stars](${shieldsStarsUrl})](${repoUrl})`),
      },
      {
        label: "HTML",
        language: "html",
        code: fenced(
          `<a href="${repoUrl}"><img src="${shieldsStarsUrl}" alt="Watchfire GitHub stars" height="20" /></a>`,
        ),
      },
    ],
  },
  {
    id: "latest-version",
    eyebrow: "Release",
    title: "Latest version badge",
    blurb: `Always shows the current Watchfire release. The static fallback below the live badge reads v${softwareVersion}.`,
    whereItGoes:
      "Show next to your install snippet so readers know exactly which version you tested against.",
    preview: (
      <span className="inline-flex flex-col items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shieldsVersionUrl}
          alt="Latest Watchfire version"
          height={20}
          className="h-5 w-auto"
        />
        <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          static: v{softwareVersion}
        </span>
      </span>
    ),
    snippets: [
      {
        label: "Markdown",
        language: "markdown",
        code: fenced(`[![Latest version](${shieldsVersionUrl})](${repoUrl}/releases/latest)`),
      },
      {
        label: "HTML",
        language: "html",
        code: fenced(
          `<a href="${repoUrl}/releases/latest"><img src="${shieldsVersionUrl}" alt="Latest Watchfire version" height="20" /></a>`,
        ),
      },
    ],
  },
  {
    id: "built-with-watchfire-stats",
    eyebrow: "Stats",
    title: "Built with Watchfire — live stats",
    blurb:
      "Iframe pointing at /embed/stats. Shows the live count of tasks completed by autonomous agents on the project.",
    whereItGoes:
      "Drop into a homepage or 'about' section to prove how much of your project was shipped by agents.",
    preview: (
      <iframe
        src={`${statsEmbedUrl}?project=watchfire-website`}
        title="Built with Watchfire — live task count"
        loading="lazy"
        sandbox="allow-popups allow-popups-to-escape-sandbox"
        className="block w-full max-w-[440px] rounded-xl border-0"
        style={{ height: 110, background: "transparent", colorScheme: "light" }}
      />
    ),
    snippets: [
      {
        label: "Markdown",
        language: "markdown",
        code: fenced(
          `[![Built with Watchfire](${badgeUrl})](${builtWithUrl})\n\n_See the full embed at ${statsEmbedUrl}?project=YOUR_PROJECT_SLUG_`,
        ),
      },
      {
        label: "HTML",
        language: "html",
        code: fenced(
          `<iframe\n  src="${statsEmbedUrl}?project=YOUR_PROJECT_SLUG"\n  title="Built with Watchfire — live task count"\n  loading="lazy"\n  width="440"\n  height="110"\n  frameborder="0"\n  style="border:0;background:transparent;max-width:100%"\n></iframe>`,
        ),
      },
    ],
  },
  {
    id: "powered-by",
    eyebrow: "Pill",
    title: "Powered by Watchfire",
    blurb:
      "Tiny inline pill with the flame icon. The lightest-weight credit — fits in a footer or sidebar.",
    whereItGoes:
      "Drop into a site footer, a docs sidebar, or anywhere a small inline credit makes sense.",
    preview: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/embed/powered-by.svg"
        alt="Powered by Watchfire"
        height={24}
        className="h-6 w-auto"
      />
    ),
    snippets: [
      {
        label: "Markdown",
        language: "markdown",
        code: fenced(`[![Powered by Watchfire](${poweredByUrl})](${repoUrl})`),
      },
      {
        label: "HTML",
        language: "html",
        code: fenced(
          `<a href="${repoUrl}"><img src="${poweredByUrl}" alt="Powered by Watchfire" height="24" /></a>`,
        ),
      },
    ],
  },
];

function WidgetCard({ widget }: { widget: Widget }) {
  return (
    <article
      id={widget.id}
      className="card-hover scroll-mt-24 flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
    >
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
          {widget.eyebrow}
        </span>
        <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-xl">
          {widget.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
          {widget.blurb}
        </p>
      </div>

      <div className="mt-5 flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white/70 p-5 dark:border-zinc-700 dark:bg-zinc-950/60">
        {widget.preview}
      </div>

      <div className="mt-5 flex-1">
        <EmbedSnippetTabs snippets={widget.snippets} ariaPrefix={widget.id} />
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-500">
        <span
          aria-hidden="true"
          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500/70 dark:bg-fire-400/70"
        />
        <span>
          <span className="font-semibold text-zinc-600 dark:text-zinc-400">
            Where this goes:
          </span>{" "}
          {widget.whereItGoes}
        </span>
      </p>
    </article>
  );
}

export default function EmbedPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-embed-breadcrumbs"
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
              Embed kit
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Embeds, in one place.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Every widget you can drop into a README, a blog post, or your
              project homepage. Each one has a live preview &mdash; the same
              SVG or iframe the snippet produces &mdash; with copy-paste
              Markdown and HTML.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Link
                href="/badge"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                More badge variants &rarr;
              </Link>
              <span aria-hidden="true">&middot;</span>
              <Link
                href="/built-with-watchfire"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                See the receipts &rarr;
              </Link>
              <span aria-hidden="true">&middot;</span>
              <Link
                href="/brand"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Brand guide &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2">
              {widgets.map((widget) => (
                <WidgetCard key={widget.id} widget={widget} />
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Notes */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Notes.
            </h2>
            <ul className="mt-8 grid gap-3">
              {[
                <>
                  Snippets use fully-qualified URLs (
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    {siteUrl.replace("https://", "")}
                  </code>
                  ), so they paste cleanly into any external README, blog, or
                  static site.
                </>,
                <>
                  The stats embed accepts a single{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                    ?project=&lt;slug&gt;
                  </code>{" "}
                  query parameter. The iframe is free to embed anywhere &mdash;
                  no CSP or X-Frame-Options restriction.
                </>,
                <>
                  The badge SVGs are public domain (CC0). Embed them, mirror
                  them, self-host them &mdash; no attribution required.
                </>,
                <>
                  For more badge sizes and the full press kit, see the{" "}
                  <Link
                    href="/badge"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    badge gallery
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/brand"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    brand page
                  </Link>
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
              Want a widget that isn&rsquo;t here?{" "}
              <a
                href="https://github.com/watchfire-io/watchfire/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Open a discussion
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
