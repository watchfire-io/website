import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl, editRepoUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import {
  daysBetween,
  formatShortDate,
  getDogfoodSummary,
  relativeFromIso,
  truncate,
  type DogfoodWeek,
} from "@/lib/dogfood";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "This site was built by Watchfire. Every page, every doc, every post, every illustration — shipped as a tracked task in this very repo. Browse the receipts.";

const ogImage = buildBlogOgUrl({
  title: "Built with Watchfire",
  description,
  section: "Receipts",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Built with Watchfire — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/built-with-watchfire`,
  },
  openGraph: {
    type: "website",
    title: "Built with Watchfire — Watchfire",
    description,
    url: `${siteUrl}/built-with-watchfire`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Built with Watchfire — Watchfire",
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
      name: "Built with Watchfire",
      item: `${siteUrl}/built-with-watchfire`,
    },
  ],
};

type ChartProps = {
  weeks: DogfoodWeek[];
};

function WeeklyBarChart({ weeks }: ChartProps) {
  const width = 720;
  const height = 240;
  const padLeft = 36;
  const padRight = 12;
  const padTop = 14;
  const padBottom = 36;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const maxCount = Math.max(1, ...weeks.map((w) => w.count));
  const barGap = 6;
  const barWidth = Math.max(8, (innerW - barGap * (weeks.length - 1)) / weeks.length);
  const ticks = niceTicks(maxCount, 4);
  const peak = weeks.reduce(
    (acc, w) => (w.count > acc.count ? w : acc),
    weeks[0] ?? { weekStart: "", label: "", count: 0 },
  );
  const total = weeks.reduce((acc, w) => acc + w.count, 0);
  const ariaSummary =
    weeks.length === 0
      ? "Bar chart with no data yet."
      : `Bar chart showing ${total} tasks completed across the last ${weeks.length} weeks, peak of ${peak.count} in week of ${peak.weekStart}.`;
  const descText = weeks
    .map((w) => `Week of ${w.weekStart}: ${w.count} ${w.count === 1 ? "task" : "tasks"}`)
    .join(". ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={ariaSummary}
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full text-zinc-500 dark:text-zinc-400"
    >
      <title>Tasks completed per week on this very project</title>
      <desc>{descText}</desc>

      {/* Y axis grid lines and labels */}
      {ticks.map((t) => {
        const y = padTop + innerH - (t / maxCount) * innerH;
        return (
          <g key={`tick-${t}`}>
            <line
              x1={padLeft}
              x2={width - padRight}
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeOpacity={t === 0 ? 0.35 : 0.12}
              strokeWidth={1}
            />
            <text
              x={padLeft - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={11}
              fill="currentColor"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              {t}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {weeks.map((w, i) => {
        const barH = (w.count / maxCount) * innerH;
        const x = padLeft + i * (barWidth + barGap);
        const y = padTop + innerH - barH;
        return (
          <g key={w.weekStart}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={Math.max(0, barH)}
              rx={2}
              fill="url(#fire-gradient)"
            />
            {w.count > 0 && (
              <text
                x={x + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize={10}
                fill="currentColor"
                fillOpacity={0.85}
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {w.count}
              </text>
            )}
            <text
              x={x + barWidth / 2}
              y={height - padBottom + 16}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              {w.label}
            </text>
          </g>
        );
      })}

      <defs>
        <linearGradient id="fire-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e29020" />
          <stop offset="100%" stopColor="#e07040" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Round-numbered y-axis tick values: 0 and `count` divisions up to maxValue.
function niceTicks(maxValue: number, count: number): number[] {
  if (maxValue <= 0) return [0, 1];
  const raw = maxValue / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const candidates = [1, 2, 5, 10].map((c) => c * mag);
  const step = candidates.find((c) => c >= raw) ?? candidates[candidates.length - 1];
  const top = Math.ceil(maxValue / step) * step;
  const out: number[] = [];
  for (let v = 0; v <= top; v += step) out.push(v);
  return out;
}

export default function BuiltWithWatchfirePage() {
  const summary = getDogfoodSummary();
  const days = daysBetween(summary.firstTaskDate);
  const latestRel = relativeFromIso(summary.latestTaskDate);
  const latestTitle = summary.latestTasks[0]?.title ?? "";
  const latestNumber = summary.latestTasks[0]?.taskNumber;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-built-breadcrumbs"
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
              Receipts, not vibes
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Built with Watchfire.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Every page on this site started as a Watchfire task. We
              don&rsquo;t talk about dogfooding &mdash; we show you the task
              list.
            </p>
          </div>

          {/* Stat cards */}
          <div className="relative mx-auto mt-12 grid max-w-5xl gap-5 sm:mt-14 md:grid-cols-3">
            <article className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                Total tasks shipped
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
                {summary.successfulTasks}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                All tracked at{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                  .watchfire/tasks/
                </code>
                .
              </p>
            </article>
            <article className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                Days under Watchfire
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
                {days}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                From scaffold to today.
              </p>
            </article>
            <article className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                Most recent task
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                {latestRel || "—"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {latestNumber !== undefined && (
                  <span className="mr-1 font-mono text-fire-600 dark:text-fire-400">
                    #{String(latestNumber).padStart(4, "0")}
                  </span>
                )}
                {truncate(latestTitle, 60)}
              </p>
            </article>
          </div>
        </section>

        <Divider />

        {/* Bar chart */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Tasks shipped, week by week.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Tasks completed per week on this very project. Twelve weeks of
                receipts &mdash; each bar is one week, tallest bar is the
                busiest.
              </p>
            </div>
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
              <div className="-mx-2 overflow-x-auto sm:mx-0 sm:overflow-visible">
                <div className="min-w-[520px] px-2 sm:min-w-0 sm:px-0">
                  <WeeklyBarChart weeks={summary.tasksPerWeek} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Latest tasks list */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              The last ten receipts.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              The last ten tasks that shipped a piece of this site.
            </p>

            <ul className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              {summary.latestTasks.map((t, idx) => (
                <li
                  key={t.taskNumber}
                  className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 ${
                    idx === 0
                      ? ""
                      : "border-t border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="flex items-baseline gap-3 sm:flex-1">
                    <span className="shrink-0 font-mono text-xs font-semibold text-fire-600 dark:text-fire-400">
                      #{String(t.taskNumber).padStart(4, "0")}
                    </span>
                    <span className="text-sm leading-snug text-zinc-800 dark:text-zinc-200 sm:text-[15px]">
                      {t.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    {formatShortDate(t.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* Methodology */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              How this page is computed.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              These numbers come from real YAML files in this repo at{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                .watchfire/tasks/
              </code>
              . A tiny loader reads each file at build time, counts the ones
              with{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                status: done
              </code>{" "}
              and{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                success: true
              </code>
              , and bakes the result into the static HTML you&rsquo;re reading.
              The page is regenerated on every deploy. You can audit the
              numbers by checking out the repo and counting the files yourself.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              For the longer narrative on what it&rsquo;s like to build a
              website by writing YAML, read{" "}
              <Link
                href="/blog/2026-05-19-eating-our-own-dogfood"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                Watchfire eats its own dogfood
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Footer band */}
        <section className="px-6 pb-24 pt-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              Want this for your own project? Every Watchfire project has the
              same data. The page is open source &mdash;{" "}
              <a
                href={editRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                view the source
              </a>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <Link
                href="/embed"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                See all embeds &rarr;
              </Link>{" "}
              &mdash; embed these stats on your own project page.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}
