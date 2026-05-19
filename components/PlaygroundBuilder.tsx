"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Clipboard, Download } from "lucide-react";

type AgentValue =
  | ""
  | "claude-code"
  | "codex"
  | "opencode"
  | "gemini"
  | "copilot"
  | "cursor";

type StatusValue = "draft" | "ready";

const AGENT_OPTIONS: { value: AgentValue; label: string }[] = [
  { value: "", label: "Inherit from project default" },
  { value: "claude-code", label: "claude-code" },
  { value: "codex", label: "codex" },
  { value: "opencode", label: "opencode" },
  { value: "gemini", label: "gemini" },
  { value: "copilot", label: "copilot" },
  { value: "cursor", label: "cursor" },
];

const STATUS_OPTIONS: { value: StatusValue; label: string }[] = [
  { value: "ready", label: "ready" },
  { value: "draft", label: "draft" },
];

const PLACEHOLDER_TASK_ID = "00000000";
const PLACEHOLDER_TIMESTAMP = "1970-01-01T00:00:00.000Z";

const TASK_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateTaskId(): string {
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += TASK_ID_ALPHABET[Math.floor(Math.random() * TASK_ID_ALPHABET.length)];
  }
  return out;
}

// Double-quote any single-line string. Escapes backslashes and quotes so the
// result is always a valid YAML double-quoted scalar — safe for colons,
// hashes, leading dashes, etc.
function yamlDoubleQuote(value: string): string {
  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${escaped}"`;
}

// Emit a block scalar (`|`) with `indent`-space indentation. Empty lines are
// emitted as truly empty (no trailing whitespace) which is valid inside the
// scalar.
function yamlBlockScalar(value: string, indent = 4): string {
  const pad = " ".repeat(indent);
  // Normalise CRLF -> LF for safety.
  const normalised = value.replace(/\r\n/g, "\n");
  const lines = normalised.split("\n");
  // Drop a single trailing empty line if present (it would round-trip to the
  // same string under `|`-clip semantics, but keeping it makes the preview
  // noisier).
  if (lines.length > 1 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  const body = lines
    .map((line) => (line.length === 0 ? "" : pad + line))
    .join("\n");
  return `|\n${body}`;
}

type BuilderState = {
  title: string;
  agent: AgentValue;
  prompt: string;
  acceptanceCriteria: string;
  status: StatusValue;
  taskNumber: number;
};

function buildYaml(
  state: BuilderState,
  meta: { taskId: string; timestamp: string },
): string {
  const lines: string[] = [];
  lines.push("version: 1");
  lines.push(`task_id: ${meta.taskId}`);
  lines.push(`task_number: ${state.taskNumber}`);
  lines.push(`title: ${yamlDoubleQuote(state.title)}`);
  if (state.agent !== "") {
    lines.push(`agent: ${state.agent}`);
  }
  lines.push(`prompt: ${yamlBlockScalar(state.prompt)}`);
  lines.push(`acceptance_criteria: ${yamlBlockScalar(state.acceptanceCriteria)}`);
  lines.push(`status: ${state.status}`);
  lines.push("success: null");
  lines.push('failure_reason: ""');
  lines.push("position: 1");
  lines.push("agent_sessions: 0");
  lines.push(`created_at: ${yamlDoubleQuote(meta.timestamp)}`);
  lines.push(`updated_at: ${yamlDoubleQuote(meta.timestamp)}`);
  return lines.join("\n") + "\n";
}

const INPUT_BASE =
  "w-full rounded-lg border border-zinc-300 bg-white/80 px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-fire-500 focus:outline-none focus:ring-2 focus:ring-fire-500/40 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-white dark:placeholder-zinc-500 dark:focus:border-fire-400 dark:focus:ring-fire-400/40";

const LABEL_BASE =
  "block text-sm font-medium text-zinc-800 dark:text-zinc-200";

const HELPER_BASE =
  "mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500";

const REQUIRED_BADGE = (
  <span
    className="ml-1.5 inline-flex items-center rounded-full bg-fire-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fire-600 dark:bg-fire-400/10 dark:text-fire-400"
    aria-label="required"
  >
    required
  </span>
);

export function PlaygroundBuilder() {
  const [state, setState] = useState<BuilderState>({
    title: "Fix 500 on POST /api/orders when items[] is empty",
    agent: "",
    prompt: `POST /api/orders returns 500 with an unhandled
TypeError when items is empty.

Return a 400 with body { "error": "items_required" }
when items is missing or empty. Mirror the validation
pattern used in services/users.ts.`,
    acceptanceCriteria: `- The empty-items case returns 400, not 500.
- A new test in services/orders.test.ts covers it
  and fails on main without the fix.
- npm run test passes.
- npm run lint passes.`,
    status: "ready",
    taskNumber: 1,
  });

  // Stable session-scoped task_id and timestamps. Initialised with
  // deterministic placeholders so server-rendered HTML matches client-
  // rendered HTML (no hydration mismatch), then replaced with real values on
  // mount.
  const [taskId, setTaskId] = useState<string>(PLACEHOLDER_TASK_ID);
  const [timestamp, setTimestamp] = useState<string>(PLACEHOLDER_TIMESTAMP);

  useEffect(() => {
    // Replace deterministic SSR placeholders with real client-only values on
    // mount. setState-in-effect is the right tool here because we cannot
    // produce a fresh random id / Date.now() during render without breaking
    // hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTaskId(generateTaskId());
    setTimestamp(new Date().toISOString());
  }, []);

  const yaml = useMemo(
    () => buildYaml(state, { taskId, timestamp }),
    [state, taskId, timestamp],
  );

  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard write can fail in sandboxed environments — fall back silently.
    }
  }, [yaml]);

  const onDownload = useCallback(() => {
    const blob = new Blob([yaml], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "0001.yaml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [yaml]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {/* Form column */}
      <form
        className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Task YAML builder form"
      >
        <div>
          <label htmlFor="pg-title" className={LABEL_BASE}>
            Title{REQUIRED_BADGE}
          </label>
          <input
            id="pg-title"
            type="text"
            value={state.title}
            onChange={(e) =>
              setState((s) => ({ ...s, title: e.target.value }))
            }
            placeholder="A one-line summary of the work"
            className={`mt-1.5 ${INPUT_BASE}`}
            required
          />
          <p className={HELPER_BASE}>
            Short, specific, action-oriented. Becomes the task&rsquo;s file
            name and the agent&rsquo;s North Star.
          </p>
        </div>

        <div>
          <label htmlFor="pg-agent" className={LABEL_BASE}>
            Agent
          </label>
          <select
            id="pg-agent"
            value={state.agent}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                agent: e.target.value as AgentValue,
              }))
            }
            className={`mt-1.5 ${INPUT_BASE}`}
          >
            {AGENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className={HELPER_BASE}>
            Optional. Leave on the default to inherit from{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
              project.default_agent
            </code>
            .
          </p>
        </div>

        <div>
          <label htmlFor="pg-prompt" className={LABEL_BASE}>
            Prompt{REQUIRED_BADGE}
          </label>
          <textarea
            id="pg-prompt"
            value={state.prompt}
            onChange={(e) =>
              setState((s) => ({ ...s, prompt: e.target.value }))
            }
            rows={9}
            placeholder="What the agent should do."
            className={`mt-1.5 ${INPUT_BASE} font-mono text-[13px] leading-relaxed`}
            required
          />
          <p className={HELPER_BASE}>
            What the agent should do. Be specific: paths, behaviour, what to
            change and what to leave alone.
          </p>
        </div>

        <div>
          <label htmlFor="pg-criteria" className={LABEL_BASE}>
            Acceptance criteria{REQUIRED_BADGE}
          </label>
          <textarea
            id="pg-criteria"
            value={state.acceptanceCriteria}
            onChange={(e) =>
              setState((s) => ({ ...s, acceptanceCriteria: e.target.value }))
            }
            rows={6}
            placeholder="- Bullet 1&#10;- Bullet 2"
            className={`mt-1.5 ${INPUT_BASE} font-mono text-[13px] leading-relaxed`}
            required
          />
          <p className={HELPER_BASE}>
            How the agent (and you) know it&rsquo;s done. Bullet list works
            best — each bullet is a check the agent must pass.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pg-status" className={LABEL_BASE}>
              Status
            </label>
            <select
              id="pg-status"
              value={state.status}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  status: e.target.value as StatusValue,
                }))
              }
              className={`mt-1.5 ${INPUT_BASE}`}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className={HELPER_BASE}>
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                ready
              </code>{" "}
              starts immediately;{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                draft
              </code>{" "}
              sits in the queue.
            </p>
          </div>

          <div>
            <label htmlFor="pg-task-number" className={LABEL_BASE}>
              Task number
            </label>
            <input
              id="pg-task-number"
              type="number"
              min={1}
              step={1}
              value={state.taskNumber}
              onChange={(e) => {
                const n = Number.parseInt(e.target.value, 10);
                setState((s) => ({
                  ...s,
                  taskNumber: Number.isFinite(n) && n >= 1 ? n : 1,
                }));
              }}
              className={`mt-1.5 ${INPUT_BASE}`}
            />
            <p className={HELPER_BASE}>
              Pick the next free number in{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                .watchfire/tasks/
              </code>
              .
            </p>
          </div>
        </div>
      </form>

      {/* Preview column */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
            Live YAML preview
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopy}
              aria-label={copied ? "Copied" : "Copy YAML to clipboard"}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:border-fire-500/60 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/60 dark:hover:text-fire-400 dark:focus-visible:ring-fire-400/60"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Clipboard className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              )}
              <span>{copied ? "Copied" : "Copy YAML"}</span>
            </button>
            <button
              type="button"
              onClick={onDownload}
              aria-label="Download YAML as 0001.yaml"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:border-fire-500/60 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/60 dark:hover:text-fire-400 dark:focus-visible:ring-fire-400/60"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              <span>Download 0001.yaml</span>
            </button>
          </div>
        </div>
        <pre className="max-h-[640px] overflow-auto rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-[12.5px] leading-relaxed text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200 sm:text-[13px]">
          <code className="language-yaml font-mono whitespace-pre">{yaml}</code>
        </pre>
      </div>
    </div>
  );
}
