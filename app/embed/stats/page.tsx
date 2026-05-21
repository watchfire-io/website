import type { Metadata } from "next";
import { getDogfoodSummary } from "@/lib/dogfood";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watchfire stats",
  description: "Live count of tasks completed by Watchfire agents.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteUrl}/embed/stats` },
};

const DEFAULT_PROJECT = "watchfire-website";

function sanitizeProject(input: string | undefined): string {
  if (!input) return DEFAULT_PROJECT;
  const trimmed = input.trim();
  if (trimmed.length === 0) return DEFAULT_PROJECT;
  const cleaned = trimmed.replace(/[^a-zA-Z0-9._/-]/g, "").slice(0, 64);
  return cleaned.length > 0 ? cleaned : DEFAULT_PROJECT;
}

type StatsParams = {
  searchParams?: Promise<{ project?: string }>;
};

export default async function EmbedStatsPage({ searchParams }: StatsParams) {
  const params = (await searchParams) ?? {};
  const project = sanitizeProject(params.project);
  const summary = getDogfoodSummary();
  const tasks = summary.successfulTasks;

  return (
    <a
      href={`${siteUrl}/built-with-watchfire`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Built with Watchfire — ${tasks} tasks completed on ${project}`}
      className="group block w-full max-w-[420px] rounded-2xl border border-[#e5e2dc] bg-gradient-to-br from-[#fff5e6] via-[#fdfcfa] to-[#fff5e6] p-5 text-[#16181d] no-underline shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center"
        >
          <svg
            viewBox="0 0 64 64"
            width={48}
            height={48}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M32 1 C32 1 10 24 10 42 C10 56 20 63 32 63 C44 63 54 56 54 42 C54 24 32 1 32 1Z"
              fill="#ff6b35"
            />
            <path
              d="M32 12 C32 12 16 32 16 44 C16 54 23 60 32 60 C41 60 48 54 48 44 C48 32 32 12 32 12Z"
              fill="#ffb347"
            />
            <path
              d="M32 23 C32 23 22 38 22 47 C22 54 26 58 32 58 C38 58 42 54 42 47 C42 38 32 23 32 23Z"
              fill="#fff5e6"
            />
          </svg>
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b85a30]">
            Built with Watchfire
          </span>
          <span className="mt-0.5 truncate text-[15px] font-semibold leading-tight text-[#16181d]">
            {project}
          </span>
          <span className="mt-1 text-[13px] leading-snug text-[#4a4d57]">
            <strong className="font-semibold text-[#16181d]">{tasks}</strong>{" "}
            {tasks === 1 ? "task" : "tasks"} completed by autonomous agents.
          </span>
        </span>
      </span>
    </a>
  );
}
