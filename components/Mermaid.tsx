"use client";

import dynamic from "next/dynamic";

const MermaidInternal = dynamic(() => import("./MermaidInternal"), {
  ssr: false,
  loading: () => (
    <div
      className="my-6 h-48 animate-pulse rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 motion-reduce:animate-none"
      aria-label="Loading diagram"
    />
  ),
});

export default function Mermaid({ chart }: { chart: string }) {
  return <MermaidInternal chart={chart} />;
}
