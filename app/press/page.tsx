import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  ExternalLink,
  Github,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeCopyButton } from "@/components/CodeCopyButton";
import { siteUrl, socialLinks } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import {
  boilerplate,
  facts,
  founders,
  logoAssets,
  pressContact,
  pressScreenshots,
  taglines,
  type LogoAsset,
  type PressScreenshot,
} from "@/lib/press-kit";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "Logos, screenshots, taglines, and the facts you need to write about Watchfire.";

const ogImage = buildBlogOgUrl({
  title: "Press kit",
  description,
  section: "Press",
});

export const metadata: Metadata = {
  title: "Press kit — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/press`,
  },
  openGraph: {
    type: "website",
    title: "Press kit — Watchfire",
    description,
    url: `${siteUrl}/press`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press kit — Watchfire",
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
      name: "Press kit",
      item: `${siteUrl}/press`,
    },
  ],
};

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}

function LogoThumb({ asset }: { asset: LogoAsset }) {
  const isDarkSurface = asset.surface === "dark";
  return (
    <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div
        className={`flex h-44 items-center justify-center border-b ${
          isDarkSurface
            ? "border-zinc-800"
            : "border-zinc-200"
        }`}
        style={{ background: isDarkSurface ? "#16181d" : "#fdfcfa" }}
      >
        <Image
          src={asset.href}
          alt={`${asset.label} preview`}
          width={asset.format === "SVG" ? 96 : 280}
          height={asset.format === "SVG" ? 96 : 140}
          className="max-h-32 w-auto object-contain"
          unoptimized={asset.format === "SVG"}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-base">
              {asset.label}
            </h3>
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {asset.format}
            </span>
          </div>
          {asset.note && (
            <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-[13px]">
              {asset.note}
            </p>
          )}
        </div>
        <a
          href={asset.href}
          download={asset.filename}
          className="group mt-auto inline-flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
        >
          <span>Download</span>
          <Download
            className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-fire-500 dark:text-zinc-500 dark:group-hover:text-fire-400"
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}

function ScreenshotCard({ shot }: { shot: PressScreenshot }) {
  return (
    <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="relative aspect-[16/10] w-full border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
        <Image
          src={shot.href}
          alt={shot.caption}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-base">
            {shot.label}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-[13px]">
            {shot.caption}
          </p>
        </div>
        <a
          href={shot.href}
          download={shot.filename}
          className="group mt-auto inline-flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
        >
          <span>Download</span>
          <Download
            className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-fire-500 dark:text-zinc-500 dark:group-hover:text-fire-400"
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}

export default function PressPage() {
  const pressMailto = `mailto:${pressContact.email}?subject=${encodeURIComponent(
    pressContact.subject,
  )}`;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-press-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />

        {/* a. Hero */}
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
              For journalists, bloggers, and conference organisers
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Press kit
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Everything you need to write about Watchfire, in one page. Drop
              the boilerplate into your article, download the logos, and check
              the facts.
            </p>
          </div>
        </section>

        <Divider />

        {/* b. Taglines */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Taglines.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Three lengths. Pick the one that fits the slot you have.
              </p>
            </div>

            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {taglines.map((t) => (
                <li
                  key={t.length}
                  className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                    {t.label}
                  </span>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200 sm:text-base">
                    “{t.text}”
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {t.caption}
                  </p>
                  <div className="mt-4">
                    <CodeCopyButton
                      code={t.text}
                      variant="prose"
                      ariaLabel={`Copy ${t.label.toLowerCase()} tagline`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* c. Boilerplate */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Boilerplate.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Drop this into the bottom of your article.
            </p>
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
              <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                {boilerplate}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <CodeCopyButton
                  code={boilerplate}
                  variant="prose"
                  ariaLabel="Copy About Watchfire boilerplate"
                />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  ~70 words — present tense, factual.
                </span>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* d. Logo & wordmark downloads */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Logos & banners.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The flame on dark and light surfaces, plus banners and the
                default social card. Cross-reference{" "}
                <Link
                  href="/brand"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  the brand page
                </Link>{" "}
                for usage guidelines — don&rsquo;t recolor the flame.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                There is no separate wordmark file — the Watchfire wordmark is
                set in Syne and is rendered in context on{" "}
                <Link
                  href="/brand"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /brand
                </Link>
                .
              </p>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {logoAssets.map((asset) => (
                <li key={asset.href}>
                  <LogoThumb asset={asset} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* e. Screenshots */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Screenshots.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Watchfire.app surfaces, ready to drop into an article. Direct
                downloads — no bundling required.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Screenshots may be cropped and compressed for use in articles.
              </p>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pressScreenshots.map((shot) => (
                <li key={shot.href}>
                  <ScreenshotCard shot={shot} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* f. Facts at a glance */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Facts at a glance.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Numbers you can quote without fact-checking us.
              </p>
            </div>
            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                    {fact.value}
                  </dd>
                  {fact.detail && (
                    <dd className="mt-1 break-words text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {fact.detail}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Divider />

        {/* g. Press contact */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Press contact.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Working on a piece? Reach out — we&rsquo;ll fact-check it and
              turn around quotes in 24h when we can.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={pressMailto}
                className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
              >
                <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {pressContact.email}
              </a>
              <a
                href={pressContact.discussionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <MessageSquare
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                GitHub Discussions
                <ExternalLink
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </section>

        <Divider />

        {/* h. Founders / maintainers */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Founders &amp; maintainers.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Watchfire is a small open-source project. One maintainer today,
              plus contributors on GitHub. Full story on{" "}
              <Link
                href="/about"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                the about page
              </Link>
              .
            </p>
            <ul className="mt-8 space-y-5">
              {founders.map((person) => (
                <li
                  key={person.name}
                  className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-fire-600 dark:text-fire-400">
                      {person.role}
                    </p>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {person.bio}
                  </p>
                  {person.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {person.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
                        >
                          <Github
                            className="h-4 w-4"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* i. Footer band */}
        <section className="px-6 pb-24 pt-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              If you&rsquo;re writing about Watchfire, we&rsquo;d love to read
              it. Tag us on{" "}
              <a
                href={socialLinks.bluesky}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Bluesky
              </a>{" "}
              or{" "}
              <a
                href={pressContact.discussionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                GitHub Discussions
              </a>{" "}
              — we keep a list of coverage.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
