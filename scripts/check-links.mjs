#!/usr/bin/env node
// Lints internal links across the site:
//   - links to /docs/* must resolve to a known Fumadocs page
//   - top-level routes (`/`, `/docs`, `/brand`, `/privacy`, `/demos`) are always allowed
//   - trailing slashes on internal links are an error (the site does not use them)
//   - a page that links to its own absolute path with a hash (e.g. `/docs/x#y`
//     from inside `/docs/x.mdx`) is rewritten to `#y` — error if found
//
// Run as part of `npm run lint`. Exits non-zero on any error.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, dirname, posix } from "node:path";

const repoRoot = process.cwd();
const docsDir = join(repoRoot, "content/docs");
const blogDir = join(repoRoot, "content/blog");

function listMdx(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
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

function blogUrlForFile(absPath) {
  // content/blog/2026-05-14-hello-world.mdx -> /blog/2026-05-14-hello-world
  const rel = relative(blogDir, absPath).replace(/\\/g, "/");
  const noExt = rel.replace(/\.mdx$/, "");
  return `/blog/${noExt}`;
}

const STATIC_ROUTES = new Set([
  "/",
  "/docs",
  "/brand",
  "/badge",
  "/privacy",
  "/about",
  "/when-not-to-use",
  "/press",
  "/security",
  "/faq",
  "/demos",
  "/tour",
  "/interfaces",
  "/use-cases",
  "/showcase",
  "/built-with-watchfire",
  "/templates",
  "/embed",
  "/embed/stats",
  "/playground",
  "/community",
  "/open-source",
  "/pricing",
  "/changelog",
  "/agents",
  "/integrations",
  "/agents/claude-code",
  "/agents/codex",
  "/agents/opencode",
  "/agents/gemini",
  "/agents/copilot",
  "/agents/cursor",
  "/integrations/claude-code",
  "/integrations/codex",
  "/integrations/opencode",
  "/integrations/gemini",
  "/integrations/copilot",
  "/integrations/cursor",
  "/integrations/git",
  "/integrations/github",
  "/integrations/gitlab",
  "/integrations/bitbucket",
  "/integrations/forgejo",
  "/integrations/vs-code",
  "/integrations/jetbrains",
  "/integrations/neovim",
  "/integrations/cursor-editor",
  "/integrations/seatbelt",
  "/integrations/landlock",
  "/integrations/bubblewrap",
  "/integrations/os-keyring",
  "/integrations/password-manager-cli",
  "/integrations/dotenv",
  "/integrations/github-actions",
  "/integrations/generic-ci",
  "/integrations/posix-shells",
  "/compare/aider",
  "/compare/cursor-agents",
  "/compare/raw-cli",
  "/compare/devin",
  "/compare/copilot-workspace",
  "/compare/cline",
  "/compare/continue-dev",
  "/compare/openhands",
  "/compare/sourcegraph-cody",
  "/compare/goose",
  "/blog",
  "/blog/tags",
  "/blog/feed.xml",
  "/feed.xml",
  "/atom.xml",
  "/feed.json",
  "/llms.txt",
  "/llms-full.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/security.txt",
  "/.well-known/security.txt",
]);

// Mirror lib/blog-tags.ts slugify rule for tag URL detection.
function slugifyTag(tag) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractTagsFromMdx(absPath) {
  const content = readFileSync(absPath, "utf8");
  // Look at the frontmatter block for a `tags: [...]` array. Crude but
  // sufficient for the simple inline-array format used in content/blog.
  const fm = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return [];
  const tagsLine = fm[1].match(/^tags:\s*\[(.*)\]\s*$/m);
  if (!tagsLine) return [];
  const items = [...tagsLine[1].matchAll(/"([^"]*)"|'([^']*)'/g)];
  return items.map((m) => m[1] ?? m[2]).filter(Boolean);
}

function blogIsDraft(absPath) {
  const content = readFileSync(absPath, "utf8");
  const fm = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return false;
  return /^draft:\s*true\s*$/m.test(fm[1]);
}

const docFiles = listMdx(docsDir);
const blogFiles = listMdx(blogDir);
const knownDocUrls = new Set(docFiles.map(pageUrlForFile));
const knownBlogUrls = new Set(blogFiles.map(blogUrlForFile));

const knownTagUrls = new Set();
for (const file of blogFiles) {
  if (blogIsDraft(file)) continue;
  for (const tag of extractTagsFromMdx(file)) {
    const slug = slugifyTag(tag);
    if (slug) knownTagUrls.add(`/blog/tags/${slug}`);
  }
}

const allKnownUrls = new Set([
  ...STATIC_ROUTES,
  ...knownDocUrls,
  ...knownBlogUrls,
  ...knownTagUrls,
]);

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

for (const file of blogFiles) {
  checkFile(file, blogUrlForFile(file));
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
  `check-links: ${docFiles.length} doc + ${blogFiles.length} blog MDX files, ${knownDocUrls.size + knownBlogUrls.size + knownTagUrls.size} content routes, 0 errors`,
);

// Reference 'posix' / 'dirname' to satisfy linters that flag unused imports.
void posix;
void dirname;
