#!/usr/bin/env node
// Aggregates stats across .watchfire/tasks/ for the retrospective
// blog post "What 150 autonomous task runs taught us".
//
// Walks every NNNN.yaml and NNNN.metrics.yaml in .watchfire/tasks/,
// extracts the fields the post cites, and prints a Markdown summary
// to stdout. No dependencies — only the Node stdlib. Re-runnable so
// the numbers can be refreshed and the post updated in place.
//
//   node scripts/blog-retro-stats.mjs
//
// The script is deliberately tolerant of missing fields: most
// .metrics.yaml files were written by an earlier daemon that only
// captured duration for some tasks. A claim that does not survive
// that reality is dropped from the post rather than fudged.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();
const candidates = [
  join(repoRoot, ".watchfire", "tasks"),
  join(repoRoot, "..", "..", "..", ".watchfire", "tasks"),
];
const tasksDir = candidates.find((p) => existsSync(p));
if (!tasksDir) {
  console.error("No .watchfire/tasks directory found.");
  process.exit(1);
}

const TASK_RE = /^(\d{4})\.yaml$/;
const METRICS_RE = /^(\d{4})\.metrics\.yaml$/;

// Tiny YAML scanner: top-level scalar keys and the prompt body length.
// The Watchfire task schema is fixed; we only need a handful of fields.
function readTask(source) {
  const out = {
    scalars: {},
    promptLength: 0,
    acceptanceLength: 0,
  };
  const lines = source.split("\n");
  let block = null;
  let blockBuf = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (block !== null) {
      // Indented continuation or blank line: still inside the block.
      if (line.length === 0 || /^[ \t]/.test(line)) {
        blockBuf += line + "\n";
        continue;
      }
      // End of block.
      if (block === "prompt") out.promptLength = blockBuf.length;
      if (block === "acceptance_criteria") out.acceptanceLength = blockBuf.length;
      block = null;
      blockBuf = "";
    }
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    let value = m[2];
    if (value === "|" || value === ">" || value.startsWith("|") || value.startsWith(">")) {
      block = key;
      blockBuf = "";
      continue;
    }
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    out.scalars[key] = value.trim();
  }
  if (block !== null) {
    if (block === "prompt") out.promptLength = blockBuf.length;
    if (block === "acceptance_criteria") out.acceptanceLength = blockBuf.length;
  }
  return out;
}

function readMetrics(source) {
  const out = {};
  for (const line of source.split("\n")) {
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2];
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    out[m[1]] = value.trim();
  }
  return out;
}

function parseBool(v) {
  if (v === "true") return true;
  if (v === "false") return false;
  return null;
}

function parseIntSafe(v) {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) ? n : null;
}

function median(xs) {
  if (xs.length === 0) return 0;
  const sorted = [...xs].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function percentile(xs, p) {
  if (xs.length === 0) return 0;
  const sorted = [...xs].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(rank);
  const hi = Math.ceil(rank);
  if (lo === hi) return sorted[lo];
  const frac = rank - lo;
  return sorted[lo] * (1 - frac) + sorted[hi] * frac;
}

function fmtDuration(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return "—";
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(0)}s`;
  const m = s / 60;
  if (m < 60) return `${m.toFixed(1)}m`;
  const h = m / 60;
  return `${h.toFixed(1)}h`;
}

const entries = readdirSync(tasksDir);
const tasks = new Map();
const metrics = new Map();

for (const entry of entries) {
  const tm = TASK_RE.exec(entry);
  const mm = METRICS_RE.exec(entry);
  if (tm) {
    const n = Number.parseInt(tm[1], 10);
    const raw = readFileSync(join(tasksDir, entry), "utf8");
    tasks.set(n, readTask(raw));
  } else if (mm) {
    const n = Number.parseInt(mm[1], 10);
    const raw = readFileSync(join(tasksDir, entry), "utf8");
    metrics.set(n, readMetrics(raw));
  }
}

const taskNumbers = [...tasks.keys()].sort((a, b) => a - b);
const totalTasks = taskNumbers.length;

let doneCount = 0;
let successCount = 0;
let failureCount = 0;
let readyOrDraft = 0;
const sessionsDist = new Map();
let singlePass = 0;
let multiPass = 0;
const multiPassTasks = [];
const promptLengths = [];
const acceptanceLengths = [];

for (const n of taskNumbers) {
  const t = tasks.get(n);
  const s = t.scalars;
  if (s.status === "done") doneCount += 1;
  else readyOrDraft += 1;
  if (parseBool(s.success) === true) successCount += 1;
  if (parseBool(s.success) === false) failureCount += 1;
  const sessions = parseIntSafe(s.agent_sessions) ?? 0;
  sessionsDist.set(sessions, (sessionsDist.get(sessions) ?? 0) + 1);
  if (sessions <= 1) singlePass += 1;
  else {
    multiPass += 1;
    multiPassTasks.push({ n, sessions, title: s.title ?? "" });
  }
  if (t.promptLength > 0) promptLengths.push(t.promptLength);
  if (t.acceptanceLength > 0) acceptanceLengths.push(t.acceptanceLength);
}

const durations = [];
const durationsByTask = new Map();
let metricsWithDuration = 0;
for (const [n, m] of metrics) {
  const d = parseIntSafe(m.duration_ms);
  if (d !== null && d > 0) {
    durations.push(d);
    durationsByTask.set(n, d);
    metricsWithDuration += 1;
  }
}

const totalMetrics = metrics.size;
const metricsWithoutDuration = totalMetrics - metricsWithDuration;

const sortedByDur = [...durationsByTask.entries()].sort((a, b) => b[1] - a[1]);
const slowest = sortedByDur.slice(0, 5).map(([n, d]) => ({
  n,
  d,
  title: tasks.get(n)?.scalars.title ?? "",
}));
const fastest = sortedByDur.slice(-5).reverse().map(([n, d]) => ({
  n,
  d,
  title: tasks.get(n)?.scalars.title ?? "",
}));

// Tasks per calendar month, from each task's created_at.
const perMonth = new Map();
for (const n of taskNumbers) {
  const created = tasks.get(n).scalars.created_at ?? "";
  if (!created || created.startsWith("0001-")) continue;
  const ym = created.slice(0, 7);
  perMonth.set(ym, (perMonth.get(ym) ?? 0) + 1);
}
const monthKeys = [...perMonth.keys()].sort();

const firstReal = (() => {
  for (const n of taskNumbers) {
    const c = tasks.get(n).scalars.created_at ?? "";
    if (c && !c.startsWith("0001-")) return { n, date: c };
  }
  return null;
})();
const lastReal = (() => {
  for (let i = taskNumbers.length - 1; i >= 0; i--) {
    const n = taskNumbers[i];
    const c = tasks.get(n).scalars.created_at ?? "";
    if (c && !c.startsWith("0001-")) return { n, date: c };
  }
  return null;
})();

const avgPrompt = promptLengths.length
  ? Math.round(promptLengths.reduce((a, b) => a + b, 0) / promptLengths.length)
  : 0;
const medPrompt = Math.round(median(promptLengths));
const p90Prompt = Math.round(percentile(promptLengths, 90));
const longestPrompt = promptLengths.length ? Math.max(...promptLengths) : 0;
const shortestPrompt = promptLengths.length ? Math.min(...promptLengths) : 0;

const avgAcc = acceptanceLengths.length
  ? Math.round(acceptanceLengths.reduce((a, b) => a + b, 0) / acceptanceLengths.length)
  : 0;
const medAcc = Math.round(median(acceptanceLengths));

// ===== Print Markdown summary =====
const lines = [];
const push = (s = "") => lines.push(s);

push("# Watchfire retrospective stats");
push("");
push(`_Aggregated from \`${tasksDir}\` at ${new Date().toISOString()}._`);
push("");
push("## Headline numbers");
push("");
push(`- Total task files: **${totalTasks}**`);
push(`- Done: **${doneCount}** (${((doneCount / totalTasks) * 100).toFixed(1)}%)`);
push(`- Successful: **${successCount}**`);
push(`- Failed (\`success: false\`): **${failureCount}**`);
push(`- Open / not done: **${readyOrDraft}**`);
push(`- Success rate among done tasks: **${doneCount === 0 ? "n/a" : ((successCount / doneCount) * 100).toFixed(1) + "%"}**`);
push("");
push("## Agent sessions per task");
push("");
const sessionKeys = [...sessionsDist.keys()].sort((a, b) => a - b);
for (const k of sessionKeys) {
  push(`- ${k} session(s): **${sessionsDist.get(k)}** task(s)`);
}
push(`- Single-pass tasks (≤1 session): **${singlePass}** (${((singlePass / totalTasks) * 100).toFixed(1)}%)`);
push(`- Multi-pass tasks (>1 session): **${multiPass}** (${((multiPass / totalTasks) * 100).toFixed(1)}%)`);
push("");
if (multiPassTasks.length) {
  push("### Multi-pass tasks");
  push("");
  for (const t of multiPassTasks.sort((a, b) => b.sessions - a.sessions || a.n - b.n)) {
    push(`- #${String(t.n).padStart(4, "0")} (${t.sessions} sessions) — ${t.title}`);
  }
  push("");
}

push("## Prompt + acceptance criteria sizes");
push("");
push(`- Tasks with a non-empty prompt block: **${promptLengths.length}**`);
push(`- Average prompt body: **${avgPrompt} chars**`);
push(`- Median prompt body: **${medPrompt} chars**`);
push(`- p90 prompt body: **${p90Prompt} chars**`);
push(`- Shortest prompt: **${shortestPrompt} chars**`);
push(`- Longest prompt: **${longestPrompt} chars**`);
push(`- Average acceptance criteria: **${avgAcc} chars**`);
push(`- Median acceptance criteria: **${medAcc} chars**`);
push("");

push("## Duration (from .metrics.yaml)");
push("");
push(`- Metrics files on disk: **${totalMetrics}**`);
push(`- Metrics files with non-zero duration: **${metricsWithDuration}**`);
push(`- Metrics files with duration unrecorded (zero): **${metricsWithoutDuration}**`);
push("");
if (durations.length) {
  push(`- Average duration: **${fmtDuration(durations.reduce((a, b) => a + b, 0) / durations.length)}**`);
  push(`- Median duration: **${fmtDuration(median(durations))}**`);
  push(`- p90 duration: **${fmtDuration(percentile(durations, 90))}**`);
  push(`- Min duration: **${fmtDuration(Math.min(...durations))}**`);
  push(`- Max duration: **${fmtDuration(Math.max(...durations))}**`);
  push("");
  push("### Slowest tasks (by recorded duration)");
  push("");
  for (const t of slowest) {
    push(`- #${String(t.n).padStart(4, "0")} — ${fmtDuration(t.d)} — ${t.title}`);
  }
  push("");
  push("### Fastest tasks (by recorded duration)");
  push("");
  for (const t of fastest) {
    push(`- #${String(t.n).padStart(4, "0")} — ${fmtDuration(t.d)} — ${t.title}`);
  }
  push("");
} else {
  push("_(No metrics files have a non-zero duration. The current daemon ships with duration=0 placeholders for most runs — only a handful of recent ones were captured by a daemon build that recorded wall-clock time. The post should not over-cite this.)_");
  push("");
}

push("## Cadence — tasks per calendar month (by created_at)");
push("");
for (const k of monthKeys) {
  push(`- ${k}: **${perMonth.get(k)}** tasks`);
}
push("");

if (firstReal) push(`- First task with a real created_at timestamp: #${String(firstReal.n).padStart(4, "0")} on ${firstReal.date}`);
if (lastReal) push(`- Last task with a real created_at timestamp: #${String(lastReal.n).padStart(4, "0")} on ${lastReal.date}`);
push("");

push("## A few notable tasks (by title keywords)");
push("");
const keywords = ["rebrand", "blog", "docs", "fix", "refactor", "telemetry", "compare", "SEO", "RSS"];
for (const k of keywords) {
  const matches = taskNumbers.filter((n) =>
    (tasks.get(n).scalars.title ?? "").toLowerCase().includes(k.toLowerCase()),
  );
  push(`- ${k}: **${matches.length}** task(s)`);
}
push("");

console.log(lines.join("\n"));
