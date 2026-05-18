"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const REPO = "watchfire-io/watchfire";
const CHART_BASE = `https://api.star-history.com/svg?repos=${REPO}&type=Date`;
const CHART_LINK = `https://star-history.com/#${REPO}&Date`;
const REPO_URL = `https://github.com/${REPO}`;

const subscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export default function StarHistory() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const variant: "dark" | "light" =
    mounted && resolvedTheme === "light" ? "light" : "dark";

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div
        className="glow-blob glow-blob-fire pointer-events-none -top-16 left-[10%] h-[320px] w-[320px]"
        aria-hidden="true"
      />
      <div
        className="glow-blob glow-blob-ember pointer-events-none -bottom-16 right-[8%] h-[300px] w-[300px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            Momentum
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Watchfire is gaining{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              stars
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The repo is public and gathering stars. Track growth on GitHub.
          </p>
        </div>

        <div className="mt-12">
          <a
            href={CHART_LINK}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open the live star history chart for ${REPO} on star-history.com`}
            className="group block rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-[0_10px_30px_rgba(224,112,64,0.06)] backdrop-blur-sm transition-all hover:border-fire-500/40 hover:shadow-[0_10px_40px_rgba(224,112,64,0.18)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/40 sm:p-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- intentional: star-history serves SVG, theme is swapped client-side, and we don't want to whitelist api.star-history.com in next.config */}
            <img
              src={`${CHART_BASE}&theme=${variant}`}
              alt={`Star growth chart for ${REPO} on GitHub`}
              width={1280}
              height={640}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-full rounded-lg"
            />
          </a>

          <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Live data from{" "}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-fire-600 transition-colors hover:text-fire-700 dark:text-fire-300 dark:hover:text-fire-200"
            >
              github.com/{REPO}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
