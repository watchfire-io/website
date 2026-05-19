import { Check, Minus, X } from "lucide-react";

type CellState = "positive" | "neutral" | "negative";

type Cell = {
  label: string;
  state: CellState;
};

type Row = {
  axis: string;
  description: string;
  cells: [Cell, Cell, Cell, Cell, Cell, Cell];
};

const COLUMNS = [
  "Watchfire",
  "Aider",
  "Cursor agents",
  "Raw Claude Code",
  "Copilot Workspace",
  "Devin-style",
] as const;

const ROWS: Row[] = [
  {
    axis: "Agent backend",
    description: "What model/agent runs the work",
    cells: [
      { label: "Pluggable CLI", state: "positive" },
      { label: "BYO model", state: "neutral" },
      { label: "Cursor / BYO", state: "neutral" },
      { label: "Pinned CLI", state: "neutral" },
      { label: "GitHub-hosted", state: "negative" },
      { label: "Vendor-managed", state: "negative" },
    ],
  },
  {
    axis: "Isolation",
    description: "What protects the repo and credentials",
    cells: [
      { label: "Worktree + branch", state: "positive" },
      { label: "Working tree", state: "negative" },
      { label: "Working tree", state: "negative" },
      { label: "Working tree", state: "negative" },
      { label: "Hosted VM", state: "neutral" },
      { label: "Vendor VM", state: "neutral" },
    ],
  },
  {
    axis: "Sandbox",
    description: "OS-level process sandbox",
    cells: [
      { label: "Seatbelt / Landlock", state: "positive" },
      { label: "No", state: "negative" },
      { label: "No", state: "negative" },
      { label: "No", state: "negative" },
      { label: "Cloud VM", state: "neutral" },
      { label: "Vendor VM", state: "neutral" },
    ],
  },
  {
    axis: "Parallel tasks",
    description: "Concurrent tasks across projects",
    cells: [
      { label: "Many projects", state: "positive" },
      { label: "One session", state: "negative" },
      { label: "Limited", state: "neutral" },
      { label: "One terminal", state: "negative" },
      { label: "One per task", state: "negative" },
      { label: "Vendor-side", state: "neutral" },
    ],
  },
  {
    axis: "Autonomy",
    description: "Interactive vs. autonomous loop",
    cells: [
      { label: "Interactive + loop", state: "positive" },
      { label: "Interactive", state: "neutral" },
      { label: "Interactive", state: "neutral" },
      { label: "Interactive", state: "neutral" },
      { label: "Plan-first PR", state: "neutral" },
      { label: "Autonomous", state: "neutral" },
    ],
  },
  {
    axis: "Hosting",
    description: "Local machine vs. cloud",
    cells: [
      { label: "Local", state: "positive" },
      { label: "Local", state: "positive" },
      { label: "Local + cloud", state: "neutral" },
      { label: "Local", state: "positive" },
      { label: "Cloud only", state: "negative" },
      { label: "Cloud only", state: "negative" },
    ],
  },
  {
    axis: "Source available",
    description: "Code is readable / forkable",
    cells: [
      { label: "Apache-2.0", state: "positive" },
      { label: "Apache-2.0", state: "positive" },
      { label: "No", state: "negative" },
      { label: "Mixed", state: "neutral" },
      { label: "No", state: "negative" },
      { label: "No", state: "negative" },
    ],
  },
  {
    axis: "You bring the keys",
    description: "Agent API keys stay on your machine",
    cells: [
      { label: "Yes", state: "positive" },
      { label: "Yes", state: "positive" },
      { label: "Optional", state: "neutral" },
      { label: "Yes", state: "positive" },
      { label: "No", state: "negative" },
      { label: "No", state: "negative" },
    ],
  },
];

function CellMarker({ state }: { state: CellState }) {
  if (state === "positive") {
    return (
      <Check
        className="h-3.5 w-3.5 shrink-0 text-fire-600 dark:text-fire-400"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    );
  }
  if (state === "negative") {
    return (
      <X
        className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-600"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    );
  }
  return (
    <Minus
      className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500"
      strokeWidth={2.5}
      aria-hidden="true"
    />
  );
}

function cellClasses(state: CellState): string {
  if (state === "positive") {
    return "text-fire-700 dark:text-fire-300 font-medium";
  }
  if (state === "negative") {
    return "text-zinc-400 line-through decoration-zinc-300 decoration-1 dark:text-zinc-500 dark:decoration-zinc-700";
  }
  return "text-zinc-600 dark:text-zinc-400";
}

function stateSrLabel(state: CellState): string {
  if (state === "positive") return "Matches Watchfire's posture";
  if (state === "negative") return "Does not match";
  return "Partial or different model";
}

export default function ComparisonMatrix() {
  return (
    <div className="my-8">
      <div
        role="region"
        aria-label="Feature comparison matrix: Watchfire versus adjacent agent tools"
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-zinc-200 bg-white/60 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th
                scope="col"
                className="sticky left-0 z-10 min-w-[10rem] bg-zinc-50/95 px-4 py-3 align-bottom text-[11px] font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:bg-zinc-900/95 dark:text-zinc-400"
              >
                Axis
              </th>
              {COLUMNS.map((col) => {
                const isWatchfire = col === "Watchfire";
                return (
                  <th
                    key={col}
                    scope="col"
                    className={
                      isWatchfire
                        ? "min-w-[8.5rem] whitespace-nowrap px-4 py-3 align-bottom text-xs font-semibold text-fire-600 dark:text-fire-400"
                        : "min-w-[8.5rem] whitespace-nowrap px-4 py-3 align-bottom text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    }
                  >
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, rowIndex) => (
              <tr
                key={row.axis}
                className={
                  rowIndex === ROWS.length - 1
                    ? "transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40"
                    : "border-b border-zinc-100 transition-colors hover:bg-zinc-50/60 dark:border-zinc-800/60 dark:hover:bg-zinc-900/40"
                }
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 min-w-[10rem] bg-white/95 px-4 py-3 align-top text-sm font-medium text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/95 dark:text-zinc-100"
                >
                  <span className="block">{row.axis}</span>
                  <span className="mt-0.5 block text-[11px] font-normal leading-snug text-zinc-500 dark:text-zinc-400">
                    {row.description}
                  </span>
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={`${row.axis}-${COLUMNS[i]}`}
                    className={`px-4 py-3 align-top text-xs leading-snug ${cellClasses(cell.state)}`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <CellMarker state={cell.state} />
                      <span>
                        <span className="sr-only">
                          {stateSrLabel(cell.state)}:{" "}
                        </span>
                        {cell.label}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs italic leading-relaxed text-zinc-500 dark:text-zinc-400">
        This is a snapshot. Read the per-tool notes below for nuance &mdash;
        every tool here is good at something Watchfire is not.
      </p>
    </div>
  );
}
