import { execFileSync } from "node:child_process";
import { join } from "node:path";

export interface PageDates {
  published: string;
  modified: string;
}

const cache = new Map<string, PageDates>();

function gitDate(args: string[]): string {
  try {
    const out = execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out.split("\n")[0].trim();
  } catch {
    return "";
  }
}

export function getPageDates(relPath: string): PageDates {
  const cached = cache.get(relPath);
  if (cached) return cached;

  const fullPath = join("content/docs", relPath);
  const firstCommit = gitDate([
    "log",
    "--diff-filter=A",
    "--follow",
    "--format=%aI",
    "--",
    fullPath,
  ]);
  const lastCommit = gitDate(["log", "-1", "--format=%aI", "--", fullPath]);

  const fallback = new Date().toISOString();
  const published = firstCommit || lastCommit || fallback;
  const modified = lastCommit || firstCommit || fallback;

  const dates: PageDates = { published, modified };
  cache.set(relPath, dates);
  return dates;
}
