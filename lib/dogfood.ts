// Build-time loader for the /built-with-watchfire page.
//
// Reads the project's own task YAML files at `.watchfire/tasks/NNNN.yaml`
// and returns a typed summary. Pure / side-effect-free, no new dependencies.
// The YAML schema is fixed (Watchfire-emitted), so a tiny hand-rolled parser
// is enough — it only needs to extract a handful of top-level scalar fields.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type DogfoodTask = {
  taskNumber: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  success: boolean | null;
};

export type DogfoodWeek = {
  // ISO date (UTC) of the Monday that starts this week, e.g. "2026-05-18".
  weekStart: string;
  // Short label for the chart axis (e.g. "05/18").
  label: string;
  count: number;
};

export type DogfoodSummary = {
  totalTasks: number;
  doneTasks: number;
  successfulTasks: number;
  failedTasks: number;
  firstTaskDate: string | null;
  latestTaskDate: string | null;
  latestTasks: DogfoodTask[];
  tasksPerWeek: DogfoodWeek[];
  tasksDir: string | null;
};

const TASK_FILE_RE = /^(\d{4})\.yaml$/;

// Resolve the directory that holds task YAML files. The loader runs at build
// time from one of two places: the project root, or a Watchfire worktree at
// `<root>/.watchfire/worktrees/NNNN/`. Two known candidates is enough.
function findTasksDir(): string | null {
  const cwd = process.cwd();
  const candidates = [
    join(cwd, ".watchfire", "tasks"),
    join(cwd, "..", "..", "..", ".watchfire", "tasks"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

// Minimal YAML reader: extracts top-level scalar fields. Skips block scalars
// (lines like `prompt: |` followed by indented content). The task schema only
// puts the fields we care about (task_number, title, status, success,
// created_at, updated_at) at the top level as plain scalars.
function readTopLevelFields(source: string): Record<string, string> {
  const out: Record<string, string> = {};
  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Top-level key: starts at column 0, alpha/underscore, then a colon.
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    let value = m[2];
    // Block-scalar indicator — skip the indented block that follows.
    if (
      value === "|" ||
      value === ">" ||
      value === "|-" ||
      value === ">-" ||
      value === "|+" ||
      value === ">+"
    ) {
      while (i + 1 < lines.length) {
        const next = lines[i + 1];
        if (next.length === 0 || /^[ \t]/.test(next)) {
          i++;
          continue;
        }
        break;
      }
      continue;
    }
    // Strip surrounding quotes if present.
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value.trim();
  }
  return out;
}

function parseBool(value: string | undefined): boolean | null {
  if (value === undefined) return null;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

// Return the UTC date of the Monday that starts the week containing `d`.
function mondayOf(d: Date): Date {
  const day = d.getUTCDay(); // 0=Sun, 1=Mon, ... 6=Sat
  const offset = day === 0 ? 6 : day - 1;
  const monday = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - offset),
  );
  return monday;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function shortLabel(d: Date): string {
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${mm}/${dd}`;
}

let cached: DogfoodSummary | null = null;

export function getDogfoodSummary(): DogfoodSummary {
  if (cached) return cached;

  const tasksDir = findTasksDir();
  if (!tasksDir) {
    cached = {
      totalTasks: 0,
      doneTasks: 0,
      successfulTasks: 0,
      failedTasks: 0,
      firstTaskDate: null,
      latestTaskDate: null,
      latestTasks: [],
      tasksPerWeek: [],
      tasksDir: null,
    };
    return cached;
  }

  const entries = readdirSync(tasksDir);
  const tasks: DogfoodTask[] = [];
  for (const name of entries) {
    if (!TASK_FILE_RE.test(name)) continue; // Skip metrics, drafts, etc.
    const raw = readFileSync(join(tasksDir, name), "utf8");
    const fields = readTopLevelFields(raw);
    const taskNumber = Number.parseInt(fields.task_number ?? "", 10);
    if (!Number.isFinite(taskNumber)) continue;
    const title = fields.title ?? "";
    const createdAt = fields.created_at ?? "";
    const updatedAt = fields.updated_at ?? createdAt;
    const status = fields.status ?? "";
    const success = parseBool(fields.success);
    tasks.push({
      taskNumber,
      title,
      createdAt,
      updatedAt,
      status,
      success,
    });
  }

  const doneTasks = tasks.filter((t) => t.status === "done");
  const successful = doneTasks.filter((t) => t.success === true);
  const failed = doneTasks.filter((t) => t.success === false);

  // Some early tasks have the Go zero-value "0001-01-01T00:00:00Z" for
  // created_at because the daemon didn't stamp creation dates yet. Ignore
  // those for date calculations — they're not real dates.
  const isRealDate = (iso: string): boolean => {
    if (!iso || iso.startsWith("0001-")) return false;
    const t = Date.parse(iso);
    return Number.isFinite(t);
  };

  const createdTimes = successful
    .filter((t) => isRealDate(t.createdAt))
    .map((t) => Date.parse(t.createdAt));
  const firstTaskDate =
    createdTimes.length > 0
      ? new Date(Math.min(...createdTimes)).toISOString()
      : null;
  const latestTaskDate =
    createdTimes.length > 0
      ? new Date(Math.max(...createdTimes)).toISOString()
      : null;

  const latestTasks = [...successful]
    .filter((t) => isRealDate(t.createdAt))
    .sort((a, b) => {
      const diff = Date.parse(b.createdAt) - Date.parse(a.createdAt);
      if (diff !== 0) return diff;
      return b.taskNumber - a.taskNumber;
    })
    .slice(0, 10);

  // tasksPerWeek: 12 weeks ending with the most recent Monday <= today.
  const today = new Date();
  const lastMonday = mondayOf(today);
  const weeks: DogfoodWeek[] = [];
  for (let i = 11; i >= 0; i--) {
    const start = new Date(
      Date.UTC(
        lastMonday.getUTCFullYear(),
        lastMonday.getUTCMonth(),
        lastMonday.getUTCDate() - i * 7,
      ),
    );
    weeks.push({ weekStart: isoDate(start), label: shortLabel(start), count: 0 });
  }
  const weekIndex = new Map(weeks.map((w, i) => [w.weekStart, i] as const));
  for (const task of successful) {
    if (!isRealDate(task.createdAt)) continue;
    const created = Date.parse(task.createdAt);
    const wk = isoDate(mondayOf(new Date(created)));
    const idx = weekIndex.get(wk);
    if (idx !== undefined) weeks[idx].count += 1;
  }

  cached = {
    totalTasks: tasks.length,
    doneTasks: doneTasks.length,
    successfulTasks: successful.length,
    failedTasks: failed.length,
    firstTaskDate,
    latestTaskDate,
    latestTasks,
    tasksPerWeek: weeks,
    tasksDir,
  };
  return cached;
}

// Small inline helper — "today", "yesterday", "N days ago", "N weeks ago".
export function relativeFromIso(iso: string | null, now: Date = new Date()): string {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const startToday = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const startThat = (() => {
    const d = new Date(t);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  })();
  const diffDays = Math.floor((startToday - startThat) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function daysBetween(fromIso: string | null, to: Date = new Date()): number {
  if (!fromIso) return 0;
  const t = Date.parse(fromIso);
  if (!Number.isFinite(t)) return 0;
  const diff = to.getTime() - t;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}
