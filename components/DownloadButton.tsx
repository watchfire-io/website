import { getDmgUrl } from "@/lib/dmg-url";

const REPO = "watchfire-io/watchfire";

export default async function DownloadButton() {
  const dmgUrl = await getDmgUrl();

  return (
    <div className="not-prose flex flex-col gap-3">
      <a
        href={dmgUrl}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fire-400"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download for macOS (.dmg)
      </a>
      <a
        href={`https://github.com/${REPO}/releases`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
      >
        View all releases →
      </a>
    </div>
  );
}
