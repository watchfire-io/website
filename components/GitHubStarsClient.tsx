"use client";

import { useEffect, useState } from "react";

export function GitHubStarsClient({ className }: { className?: string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/watchfire-io/watchfire")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stargazers_count) setStars(data.stargazers_count);
      })
      .catch(() => {});
  }, []);

  if (stars === null) return null;

  return (
    <span className={className ?? "flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-yellow-500">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
      </svg>
      {stars.toLocaleString()}
    </span>
  );
}
