#!/usr/bin/env node
// Lints internal links across the site:
//   - links to /docs/* must resolve to a known Fumadocs page
//   - top-level routes (`/`, `/docs`, `/brand`, `/privacy`) are always allowed
//   - trailing slashes on internal links are an error (the site does not use them)
//   - a page that links to its own absolute path with a hash (e.g. `/docs/x#y`
//     from inside `/docs/x.mdx`) is rewritten to `#y` — error if found
//
// Run as part of `npm run lint`. Exits non-zero on any error.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, dirname, posix } from "node:path";

const repoRoot = process.cwd();
const docsDir = join(repoRoot, "content/docs");

function listMdx(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...listMdx(full));
    } else if (entry.endsWith(".mdx")) {
      out.push(full);
    }
  }
  return out;
}

function pageUrlForFile(absPath) {
  // content/docs/foo/bar.mdx -> /docs/foo/bar
  // content/docs/foo/index.mdx -> /docs/foo
  // content/docs/index.mdx -> /docs
  const rel = relative(docsDir, absPath).replace(/\\/g, "/");
  const noExt = rel.replace(/\.mdx$/, "");
  if (noExt === "index") return "/docs";
  if (noExt.endsWith("/index")) return `/docs/${noExt.slice(0, -"/index".length)}`;
  return `/docs/${noExt}`;
}

const STATIC_ROUTES = new Set([
  "/",
  "/docs",
  "/brand",
  "/privacy",
  "/feed.xml",
  "/atom.xml",
  "/feed.json",
  "/llms.txt",
  "/llms-full.txt",
  "/sitemap.xml",
  "/robots.txt",
]);

const docFiles = listMdx(docsDir);
const knownDocUrls = new Set(docFiles.map(pageUrlForFile));
const allKnownUrls = new Set([...STATIC_ROUTES, ...knownDocUrls]);

function listSourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    if (entry === "node_modules") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...listSourceFiles(full));
    } else if (/\.(tsx|jsx|ts|js)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const errors = [];

// Match markdown links [label](href) — captures href only.
const mdLinkRe = /\[(?:[^\]]|\\\])*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
// Match HTML href attributes (handles single + double quotes).
const htmlHrefRe = /href\s*=\s*("([^"]*)"|'([^']*)')/g;

function* extractLinks(content) {
  let m;
  mdLinkRe.lastIndex = 0;
  while ((m = mdLinkRe.exec(content)) !== null) {
    yield { href: m[1], index: m.index };
  }
  htmlHrefRe.lastIndex = 0;
  while ((m = htmlHrefRe.exec(content)) !== null) {
    const value = m[2] ?? m[3] ?? "";
    yield { href: value, index: m.index };
  }
}

function lineFor(content, index) {
  return content.slice(0, index).split("\n").length;
}

function isInternalRoute(href) {
  return href.startsWith("/") && !href.startsWith("//");
}

function stripFragment(href) {
  const i = href.indexOf("#");
  return i === -1 ? href : href.slice(0, i);
}

function fragmentOf(href) {
  const i = href.indexOf("#");
  return i === -1 ? "" : href.slice(i);
}

function checkFile(file, ownUrl) {
  const content = readFileSync(file, "utf8");
  const relFile = relative(repoRoot, file);

  for (const { href, index } of extractLinks(content)) {
    if (!isInternalRoute(href)) continue;
    if (href.startsWith("/api/")) continue; // API routes
    const path = stripFragment(href);
    const frag = fragmentOf(href);
    const line = lineFor(content, index);

    // Trailing slash check (allow bare "/")
    if (path !== "/" && path.endsWith("/")) {
      errors.push(
        `${relFile}:${line}: trailing slash in internal link "${href}" — drop the trailing "/"`,
      );
      continue;
    }

    // Self-link check
    if (ownUrl && path === ownUrl && frag) {
      errors.push(
        `${relFile}:${line}: self-link "${href}" — use the bare fragment "${frag}" instead`,
      );
      continue;
    }

    // Existence check
    if (!allKnownUrls.has(path)) {
      errors.push(
        `${relFile}:${line}: broken internal link "${href}" — no such route ${path}`,
      );
    }
  }
}

for (const file of docFiles) {
  checkFile(file, pageUrlForFile(file));
}

// Also sweep the React source for href="/..." links so PRs that touch components
// can't introduce broken or trailing-slashed internal navigation.
const sourceDirs = ["app", "components"];
for (const d of sourceDirs) {
  const dir = join(repoRoot, d);
  let exists = true;
  try {
    statSync(dir);
  } catch {
    exists = false;
  }
  if (!exists) continue;
  for (const file of listSourceFiles(dir)) {
    checkFile(file, null);
  }
}

if (errors.length > 0) {
  console.error(`check-links: ${errors.length} error${errors.length === 1 ? "" : "s"}`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

console.log(
  `check-links: ${docFiles.length} MDX files, ${knownDocUrls.size} doc routes, 0 errors`,
);

// Reference 'posix' / 'dirname' to satisfy linters that flag unused imports.
void posix;
void dirname;
