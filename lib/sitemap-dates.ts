import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { join } from "node:path";

const cache = new Map<string, Date>();

function gitMtime(relPath: string): Date | null {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%aI", "--", relPath],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    )
      .trim()
      .split("\n")[0]
      .trim();
    if (!out) return null;
    const d = new Date(out);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

function fsMtime(relPath: string): Date | null {
  try {
    return statSync(relPath).mtime;
  } catch {
    return null;
  }
}

export function fileLastModified(relPath: string): Date {
  const cached = cache.get(relPath);
  if (cached) return cached;
  const date = gitMtime(relPath) ?? fsMtime(relPath) ?? new Date();
  cache.set(relPath, date);
  return date;
}

export function maxLastModified(relPaths: string[]): Date {
  let latest: Date | null = null;
  for (const p of relPaths) {
    const d = fileLastModified(p);
    if (!latest || d.getTime() > latest.getTime()) latest = d;
  }
  return latest ?? new Date();
}

export function docPageLastModified(pagePath: string): Date {
  return fileLastModified(join("content/docs", pagePath));
}
