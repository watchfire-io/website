#!/usr/bin/env node
// Run `next build`, then start the production server in the background and
// measure how many JavaScript bytes each representative route ships down the
// wire. Print a small per-route table so contributors can spot regressions
// at a glance. No new dependencies — uses only Node, npm, and gzip on PATH.

import { spawn, spawnSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const ROUTES = [
  "/",
  "/docs",
  "/docs/quickstart",
  "/docs/recipes",
  "/docs/changelog",
  "/docs/concepts/architecture",
  "/docs/components/gui",
];

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    cwd: repoRoot,
    ...opts,
  });
  if (res.status !== 0) {
    process.exit(res.status ?? 1);
  }
}

function startServer() {
  const child = spawn("npx", ["next", "start", "-p", "3001"], {
    cwd: repoRoot,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });
  return child;
}

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server did not become ready within ${timeoutMs}ms`);
}

async function measureRoute(route) {
  const res = await fetch(`http://127.0.0.1:3001${route}`);
  const html = await res.text();
  const matches = html.matchAll(/src="\/_next\/(static\/[^"]+\.js)"/g);
  const seen = new Set();
  let raw = 0;
  let gz = 0;
  for (const m of matches) {
    const rel = m[1];
    if (seen.has(rel)) continue;
    seen.add(rel);
    const file = join(repoRoot, ".next", rel);
    try {
      const buf = readFileSync(file);
      raw += statSync(file).size;
      gz += gzipSync(buf).length;
    } catch {
      // chunk listed in HTML but not present on disk — skip silently
    }
  }
  return { route, files: seen.size, raw, gz };
}

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  console.log("> next build\n");
  run("npx", ["next", "build"]);

  console.log("\n> Measuring per-route initial JS payload\n");
  const server = startServer();
  let serverErr = "";
  server.stderr.on("data", (b) => {
    serverErr += b.toString();
  });

  try {
    await waitForServer("http://127.0.0.1:3001/", 30_000);
    const results = [];
    for (const r of ROUTES) {
      results.push(await measureRoute(r));
    }
    const widest = Math.max(...results.map((r) => r.route.length), 8);
    console.log(
      `${"route".padEnd(widest)}  files  ${"raw".padStart(10)}  ${"gzipped".padStart(10)}`,
    );
    console.log("-".repeat(widest + 2 + 5 + 2 + 10 + 2 + 10));
    for (const r of results) {
      console.log(
        `${r.route.padEnd(widest)}  ${String(r.files).padStart(5)}  ${fmtKB(r.raw).padStart(10)}  ${fmtKB(r.gz).padStart(10)}`,
      );
    }
    console.log(
      "\nMeasured: sum of unique <script src=\"/_next/static/...\"> chunks per route.",
    );
    console.log(
      "Compare against the Performance budget in docs/contributing.",
    );
  } catch (err) {
    console.error(serverErr);
    throw err;
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
