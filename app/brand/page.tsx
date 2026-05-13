import type { Metadata } from "next";
import Link from "next/link";
import { Syne } from "next/font/google";
import { Download } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FlameLogo from "@/components/FlameLogo";
import { siteUrl } from "@/lib/site";

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Watchfire press kit — flame logo SVG and PNG, fire/ember color palette with hex tokens, Outfit and JetBrains Mono typography, and brand do's and don'ts.",
  alternates: {
    canonical: `${siteUrl}/brand`,
  },
};

type Swatch = {
  name: string;
  token: string;
  hex: string;
  /** Tailwind class fragment — only used to choose a foreground that survives the swatch */
  light?: boolean;
  note?: string;
};

const palette: Swatch[] = [
  {
    name: "Fire Orange",
    token: "fire-500",
    hex: "#e07040",
    note: "Primary brand color",
  },
  {
    name: "Ember Gold",
    token: "ember-500",
    hex: "#e29020",
    note: "Secondary accent",
  },
  {
    name: "Flame White",
    token: "fire-50",
    hex: "#fff5e6",
    light: true,
    note: "Highlight / inner flame",
  },
  {
    name: "Fire (light theme)",
    token: "fire-600",
    hex: "#b85a30",
    note: "Brand color on light backgrounds",
  },
  {
    name: "Ember (light theme)",
    token: "ember-600",
    hex: "#c07818",
    note: "Accent on light backgrounds",
  },
  {
    name: "Charcoal",
    token: "background (dark)",
    hex: "#16181d",
    note: "Dark theme background",
  },
  {
    name: "Off-white",
    token: "background (light)",
    hex: "#fdfcfa",
    light: true,
    note: "Light theme background",
  },
];

type AssetLink = {
  label: string;
  href: string;
  filename: string;
};

const darkAssets: AssetLink[] = [
  { label: "Logo (SVG)", href: "/logo.svg", filename: "watchfire-logo.svg" },
  {
    label: "Banner — dark (PNG)",
    href: "/banner-dark.png",
    filename: "watchfire-banner-dark.png",
  },
  {
    label: "Banner — app (PNG)",
    href: "/banner-app.png",
    filename: "watchfire-banner-app.png",
  },
];

const lightAssets: AssetLink[] = [
  { label: "Favicon (SVG)", href: "/favicon.svg", filename: "watchfire-favicon.svg" },
  {
    label: "Banner — light (PNG)",
    href: "/banner-light.png",
    filename: "watchfire-banner-light.png",
  },
  {
    label: "OG image (PNG)",
    href: "/og-image.png",
    filename: "watchfire-og-image.png",
  },
];

function DownloadLink({ asset }: { asset: AssetLink }) {
  return (
    <a
      href={asset.href}
      download={asset.filename}
      className="group inline-flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:border-fire-500/50 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
    >
      <span>{asset.label}</span>
      <Download
        className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-fire-500 dark:text-zinc-500 dark:group-hover:text-fire-400"
        strokeWidth={2}
        aria-hidden="true"
      />
    </a>
  );
}

function Hex({ value }: { value: string }) {
  return (
    <span className="select-all font-mono text-xs text-zinc-700 dark:text-zinc-300">
      {value}
    </span>
  );
}

export default function BrandPage() {
  return (
    <>
      <Header />
      <main id="main-content" className={`${syne.variable} pt-16`}>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pt-28">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[12%] h-[360px] w-[360px]"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/4 h-[280px] w-[280px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-5xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              Press kit
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Brand
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Logos, palette, and typography. Use them respectfully &mdash; don&apos;t
              recolor the flame or run the wordmark in Outfit.
            </p>
          </div>
        </section>

        {/* Logo */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Logo
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              The flame on dark and light surfaces. Download the source SVG, app
              banners, and OG image.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {/* Dark card */}
              <div className="card-hover overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                <div
                  className="flex h-56 items-center justify-center rounded-xl border border-zinc-800"
                  style={{ background: "#16181d" }}
                >
                  <FlameLogo size={120} decorative />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  On dark — Charcoal #16181d
                </p>
                <div className="mt-3 grid gap-2">
                  {darkAssets.map((asset) => (
                    <DownloadLink key={asset.href} asset={asset} />
                  ))}
                </div>
              </div>

              {/* Light card */}
              <div className="card-hover overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                <div
                  className="flex h-56 items-center justify-center rounded-xl border border-zinc-200"
                  style={{ background: "#fdfcfa" }}
                >
                  <FlameLogo size={120} decorative />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  On light — Off-white #fdfcfa
                </p>
                <div className="mt-3 grid gap-2">
                  {lightAssets.map((asset) => (
                    <DownloadLink key={asset.href} asset={asset} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Color palette */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Color palette
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Fire, ember, and flame. Triple-click a hex to select it.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {palette.map((s) => (
                <div
                  key={s.token}
                  className="card-hover overflow-hidden rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <div
                    className="aspect-square w-full"
                    style={{ background: s.hex }}
                    role="img"
                    aria-label={`${s.name} swatch ${s.hex}`}
                  />
                  <div className="space-y-1 px-3 py-3">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {s.name}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {s.token}
                    </div>
                    <Hex value={s.hex} />
                    {s.note ? (
                      <div className="pt-1 text-[11px] leading-snug text-zinc-500 dark:text-zinc-500">
                        {s.note}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Typography */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Typography
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Outfit for everything. JetBrains Mono for code. Syne is reserved
              for the wordmark.
            </p>

            <div className="mt-8 grid gap-5">
              {/* Outfit */}
              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Outfit
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    Google Fonts
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Used for all UI typography &mdash; headings and body.
                </p>
                <div className="mt-6 space-y-3">
                  <p className="break-words text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                    Better context. Better code.
                  </p>
                  <div className="grid gap-2 text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
                    <p className="text-base font-normal">
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                        400 ·
                      </span>{" "}
                      The quick brown fox jumps over the lazy dog.
                    </p>
                    <p className="text-base font-medium">
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                        500 ·
                      </span>{" "}
                      The quick brown fox jumps over the lazy dog.
                    </p>
                    <p className="text-base font-semibold">
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                        600 ·
                      </span>{" "}
                      The quick brown fox jumps over the lazy dog.
                    </p>
                    <p className="text-base font-bold">
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                        700 ·
                      </span>{" "}
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                </div>
              </div>

              {/* JetBrains Mono */}
              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    JetBrains Mono
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    Google Fonts
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Used for code blocks, terminal output, and inline tokens.
                </p>
                <pre className="mt-6 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-200">
                  <code>{`$ watchfire init
$ watchfire task add "Add /brand page"
$ watchfire task start

  ✓ task #0077 ready
  → agent: claude-code
  ⠋ working in worktree...`}</code>
                </pre>
              </div>

              {/* Syne */}
              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Syne
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    Wordmark only
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Reserved for the wordmark &mdash; never use for headings or UI
                  text.
                </p>
                <div className="mt-6 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-10 dark:border-zinc-800 dark:bg-zinc-950/60">
                  <span
                    style={{ fontFamily: "var(--font-syne)" }}
                    className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl"
                  >
                    watchfire
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Don'ts */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Don&apos;ts
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              A short list. The rest is in the upstream{" "}
              <a
                href="https://github.com/watchfire-io/watchfire/blob/main/assets/brand/WATCHFIRE_BRAND.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                brand guidelines
              </a>
              .
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Don't recolor the flame.",
                "Don't run the wordmark in Outfit — use Syne — or in any color other than the brand foreground.",
                "Don't add purple or cool gradients to Watchfire surfaces.",
                "Don't crop the flame icon or use it without padding.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-700 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

        {/* Contact */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Contact
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              For partnerships, sponsorships, or press enquiries, reach out at{" "}
              <a
                href="mailto:info@watchfire.io"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                info@watchfire.io
              </a>
              .
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-4 py-2.5 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
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
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
