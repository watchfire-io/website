import type { LucideIcon } from "lucide-react";
import {
  Bug,
  PackagePlus,
  Replace,
  TestTube,
  ArrowUpCircle,
  FileText,
  Search,
  Gauge,
} from "lucide-react";

export type TaskTemplate = {
  id: string;
  title: string;
  whenToUse: string;
  pitfall: string;
  icon: LucideIcon;
  yaml: string;
};

export const taskTemplates: TaskTemplate[] = [
  {
    id: "fix-a-bug",
    title: "Fix a bug",
    whenToUse:
      "You have a repro and want a narrow fix — not a rewrite of the surrounding module.",
    pitfall:
      "If you can't write the repro steps, the agent can't either. Reproduce the bug yourself first, then paste the steps verbatim.",
    icon: Bug,
    yaml: `task_id: bug00001
task_number: 1
title: "Fix 500 on POST /api/orders when items[] is empty"
prompt: |
  POST /api/orders returns 500 with an unhandled
  TypeError when the request body has \`items: []\`.
  Repro: \`curl -X POST localhost:3000/api/orders -H 'content-type: application/json' -d '{"items":[]}'\`.
  Stack trace points at \`services/orders.ts:142\`,
  where \`items[0].price\` is read without a length
  check.

  Return a 400 with body
  \`{ "error": "items_required" }\` when \`items\`
  is missing or empty. Mirror the validation
  pattern used in \`services/users.ts\` for empty
  payloads. Do not change the handler signature
  or the success-path response shape.
acceptance_criteria: |
  - The curl above returns 400 with the documented
    error body, not 500.
  - A new test in \`services/orders.test.ts\` covers
    the empty-items case and fails on \`main\`
    without the fix.
  - \`npm run test\` passes.
  - \`npm run lint\` passes.
  - No changes outside \`services/orders.ts\` and
    \`services/orders.test.ts\`.
status: ready
`,
  },
  {
    id: "add-small-feature",
    title: "Add a small feature",
    whenToUse:
      "One well-scoped capability you can describe in a single sentence — and a clear list of what it is not.",
    pitfall:
      "Without an explicit out-of-scope list, the agent will tidy up neighbouring code 'while it's there.' Write the negation list before the prompt.",
    icon: PackagePlus,
    yaml: `task_id: feat0002
task_number: 2
title: "Add CSV export button to /analytics"
prompt: |
  Add a CSV export button to the analytics page
  (\`app/analytics/page.tsx\`). Clicking it
  downloads the currently-filtered rows as
  \`analytics-YYYY-MM-DD.csv\`. Reuse the existing
  \`<Button>\` from \`components/ui/Button.tsx\`
  and place it next to the date-range picker.

  Generate the CSV client-side from the rows
  already in state — do not add a new API route.
  Use the same column order as the on-screen
  table, with the header row matching the visible
  column titles.

  Out of scope:
  - Changing the data-fetching layer.
  - Adding XLSX/PDF export.
  - Restyling the date-range picker.
  - Anything outside \`app/analytics/\` and a small
    \`lib/csv.ts\` helper if one is needed.
acceptance_criteria: |
  - A "Download CSV" button is visible on
    \`/analytics\` next to the date-range picker.
  - Clicking it triggers a download of a valid
    CSV matching the on-screen rows.
  - \`npm run test\` and \`npm run lint\` pass.
  - No new runtime dependencies in
    \`package.json\`.
  - No changes outside \`app/analytics/\` and (at
    most) one new file under \`lib/\`.
status: ready
`,
  },
  {
    id: "refactor-or-rename",
    title: "Refactor / rename",
    whenToUse:
      "A mechanical, behaviour-preserving change: a rename, a move, a signature tightening.",
    pitfall:
      "Resist the urge to fold in a 'tiny cleanup' — keep the diff mechanical so review stays cheap.",
    icon: Replace,
    yaml: `task_id: refac003
task_number: 3
title: "Move parseInput from lib/parse.ts to lib/input/parse.ts"
prompt: |
  Move \`parseInput\` from \`lib/parse.ts\` into a
  new file \`lib/input/parse.ts\`. Update every
  importer in the repo to use the new path. Keep
  the function signature, the function body, and
  the exported name byte-identical — this is a
  mechanical move, not a rewrite.

  If \`lib/parse.ts\` ends up empty after the move,
  delete it. If it still has other exports, leave
  it alone.

  Do NOT:
  - Reformat any unrelated code.
  - Change the function body.
  - Add or remove tests beyond updating their
    imports.
  - Touch \`tsconfig.json\` paths.
acceptance_criteria: |
  - \`lib/input/parse.ts\` exists and exports
    \`parseInput\` with an identical signature.
  - No file in the repo imports from the old
    \`lib/parse.ts\` path (verify with grep).
  - \`npm run test\` passes with no test edits
    other than import paths.
  - \`npm run build\` and \`npm run lint\` pass.
  - The diff is a pure move + import rewrites —
    no unrelated changes.
status: ready
`,
  },
  {
    id: "add-tests",
    title: "Add tests for an untested module",
    whenToUse:
      "Backfilling coverage on one file with zero or near-zero tests, against a clear bar.",
    pitfall:
      "'Add tests' without naming the cases produces shallow happy-path coverage. List the specific cases that must be covered.",
    icon: TestTube,
    yaml: `task_id: test0004
task_number: 4
title: "Add vitest unit tests for lib/parser.ts"
prompt: |
  \`lib/parser.ts\` exports four functions
  (\`parseInput\`, \`parseHeader\`, \`parseRow\`,
  \`parseFooter\`) and currently has no tests.
  Add a colocated suite at \`lib/parser.test.ts\`
  using vitest 1.x — the existing runner
  configured in \`vitest.config.ts\`.

  Use \`lib/format.test.ts\` as the structural
  template: same import order, same describe/it
  nesting, same assertion style (\`expect(...)\`,
  not snapshots).

  For each exported function, cover:
  - One happy-path case with realistic input.
  - The empty-input case.
  - The malformed-input case (assert the thrown
    error type and message).
  Do not refactor \`lib/parser.ts\` itself.
acceptance_criteria: |
  - \`lib/parser.test.ts\` exists with at least 12
    test cases (4 functions × 3 cases each).
  - \`npm run test -- parser\` passes.
  - \`npm run test\` (full suite) passes.
  - \`npm run lint\` passes.
  - No new dependencies; no changes to
    \`lib/parser.ts\`.
status: ready
`,
  },
  {
    id: "update-dependency",
    title: "Update a dependency / migration",
    whenToUse:
      "Bumping a library across a major version, with breaking changes the agent has to read about and handle.",
    pitfall:
      "Don't bundle two upgrades into one task. The agent needs to read one changelog at a time or the failure mode is unreadable.",
    icon: ArrowUpCircle,
    yaml: `task_id: depbump5
task_number: 5
title: "Upgrade pino from 8.x to 9.x"
prompt: |
  Upgrade \`pino\` and \`pino-pretty\` from 8.x to
  the latest 9.x release in \`package.json\` and
  \`package-lock.json\`. Read the pino 9.0 release
  notes (https://github.com/pinojs/pino/releases)
  and handle the documented breaking changes —
  in particular the changes around
  \`transport\` options and the removal of legacy
  level-by-string helpers.

  Where the codebase uses removed APIs (search
  for \`pino.levels\` and \`pino.symbols\`), update
  the call sites to the 9.x equivalents. Do not
  add a compatibility shim.

  Out of scope:
  - Upgrading any other dependency.
  - Reorganising log structure or fields.
  - Switching transports.
acceptance_criteria: |
  - \`pino\` and \`pino-pretty\` resolve to 9.x in
    \`package.json\` and \`package-lock.json\`.
  - No usage of removed pino 8.x APIs remains
    (grep clean).
  - \`npm run test\` passes with no warnings about
    deprecated pino APIs.
  - \`npm run lint\` passes with no new warnings.
  - The application boots locally with the same
    log output shape as before
    (\`npm run dev\` succeeds).
status: ready
`,
  },
  {
    id: "add-docs",
    title: "Add a documentation page",
    whenToUse:
      "A new docs page or section with a clear shape, length budget, and zero code changes.",
    pitfall:
      "Without a length bound and an outline, agents drift into a 3,000-word essay. Cap the word count and list the sections.",
    icon: FileText,
    yaml: `task_id: docs0006
task_number: 6
title: "Add docs page: /docs/concepts/sandboxing"
prompt: |
  Add a new docs page at
  \`content/docs/concepts/sandboxing.mdx\` that
  explains how Watchfire isolates each agent with
  \`sandbox-exec\` on macOS. Use
  \`content/docs/concepts/worktrees.mdx\` as the
  structural template — same frontmatter shape,
  same heading depth, same voice.

  Sections, in order:
  1. _Why a sandbox?_ — one paragraph on what
     could go wrong without one.
  2. _What the policy allows_ — bullet list:
     read most of the filesystem, write to
     project/temp dirs, full network.
  3. _What the policy blocks_ — bullet list:
     \`~/.ssh\`, \`~/.aws\`, \`~/.gnupg\`,
     \`~/Desktop\`, \`~/Documents\`, \`~/Downloads\`,
     \`.env\`, \`.git/hooks\`.
  4. _Turning it off_ — short, with a clear
     warning.

  Target length: 600–900 words. No new
  illustrations. No new dependencies. Register
  the page in \`content/docs/concepts/meta.json\`
  in the correct position.
acceptance_criteria: |
  - \`content/docs/concepts/sandboxing.mdx\` exists
    with the four sections above, in order.
  - The page is registered in
    \`content/docs/concepts/meta.json\`.
  - Word count is between 600 and 900 (rough
    \`wc -w\` is fine).
  - \`npm run build\` passes; the page renders at
    \`/docs/concepts/sandboxing\`.
  - \`npm run lint\` passes.
  - No code changes outside \`content/docs/\`.
status: ready
`,
  },
  {
    id: "investigate-and-report",
    title: "Investigate and report (no code changes)",
    whenToUse:
      "You need a written diagnosis before deciding on a fix — the task ships a Markdown report, not a diff.",
    pitfall:
      "If you don't say 'diagnosis only,' the agent will try to fix it. Make 'no code changes' a literal acceptance criterion.",
    icon: Search,
    yaml: `task_id: invest07
task_number: 7
title: "Diagnose intermittent 500s on POST /api/orders since deploy abc123"
prompt: |
  Since commit \`abc123\` we see intermittent 500s
  on POST /api/orders, roughly 1 in 30 requests.
  The Sentry trace points at
  \`services/orders.ts:142\`. Reproduce locally if
  you can, identify the root cause, and write
  your findings to \`INVESTIGATION.md\` at the
  repo root.

  This is a diagnosis task, not a fix task. Do
  NOT change any code outside of
  \`INVESTIGATION.md\`. The follow-up fix will be
  a separate task once we agree on the proposed
  approach.

  \`INVESTIGATION.md\` must include sections:
  - _Symptom_ — what users see.
  - _Reproduction_ — exact commands that
    reproduce locally (or "could not reproduce"
    with what you tried).
  - _Root cause_ — the actual mechanism, with
    file:line references.
  - _Proposed fix_ — the smallest plausible
    change, as a bulleted spec for a future task.
  - _Open questions_ — anything you couldn't
    resolve without product input.
acceptance_criteria: |
  - \`INVESTIGATION.md\` exists at the repo root
    with the five sections above.
  - The Root cause section names at least one
    specific \`file:line\` location.
  - No code changes outside \`INVESTIGATION.md\`
    (verify with \`git diff --stat\`).
  - The file is valid Markdown (renders cleanly
    in GitHub preview).
  - \`npm run lint\` passes (no incidental
    formatting changes).
status: ready
`,
  },
  {
    id: "perf-regression-hunt",
    title: "Performance regression hunt",
    whenToUse:
      "Something got slower and you want a measured before/after, not a vibes-based fix.",
    pitfall:
      "Without a numeric pass/fail bar, the agent declares 'feels faster' and merges a regression. Pin the threshold.",
    icon: Gauge,
    yaml: `task_id: perf0008
task_number: 8
title: "Investigate and fix /api/search p95 regression since v1.4.0"
prompt: |
  Since v1.4.0, \`GET /api/search?q=...\` p95
  latency has roughly doubled (from ~80ms to
  ~160ms on the staging dataset). Find the
  regression and fix it.

  Workflow:
  1. Establish a baseline. Run
     \`npm run bench:search\` (existing script,
     see \`bench/search.ts\`) on \`main\` and
     record p50/p95/p99 in your scratch notes.
  2. Form a hypothesis from the v1.3.0..v1.4.0
     git log and reading the touched files.
  3. Implement the smallest plausible fix.
  4. Re-run \`npm run bench:search\` and record
     the new numbers.
  5. If p95 is not back under 100ms on the same
     dataset, throw the change away and try a
     different hypothesis. Do not merge a
     regression-flavoured improvement.

  Ship the diff only if the benchmark passes.
acceptance_criteria: |
  - \`npm run bench:search\` reports p95 under
    100ms on the staging dataset after the
    change.
  - The PR description (paste it into the task's
    final commit message) includes before/after
    numbers for p50, p95, p99.
  - \`npm run test\` and \`npm run lint\` pass.
  - No changes to the public response shape of
    \`/api/search\`.
  - No new runtime dependencies.
status: ready
`,
  },
];
