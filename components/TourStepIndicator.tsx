"use client";

import { useEffect, useState } from "react";

interface Step {
  id: string;
  label: string;
}

interface TourStepIndicatorProps {
  steps: Step[];
}

export default function TourStepIndicator({ steps }: TourStepIndicatorProps) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = steps
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <aside
      aria-label="Tour progress"
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="pointer-events-auto flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        {steps.map((step, i) => {
          const active = step.id === activeId;
          return (
            <li key={step.id}>
              <a
                href={`#${step.id}`}
                aria-current={active ? "step" : undefined}
                className={`group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                  active
                    ? "text-fire-600 dark:text-fire-300"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors ${
                    active
                      ? "border-fire-500/60 bg-fire-500/15 text-fire-600 dark:border-fire-400/60 dark:text-fire-300"
                      : "border-zinc-300 bg-white text-zinc-500 group-hover:border-fire-500/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="whitespace-nowrap font-medium">{step.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
