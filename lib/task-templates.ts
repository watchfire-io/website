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
  /** kebab-case identifier, used as the URL slug. */
  slug: string;
  /** Backwards-compatible alias for slug — older call sites still reference `id`. */
  id: string;
  title: string;
  /** One-sentence subhead for hero blocks and OG cards. */
  tagline: string;
  /** 2-3 sentence overview used on the detail page lead. */
  description: string;
  /** Original short "when to use" sentence — preserved for the index page. */
  whenToUse: string;
  /** Bullets answering "when should I reach for this template?" */
  when: string[];
  /** Original one-sentence pitfall — preserved for the index page. */
  pitfall: string;
  /** Bullets covering common ways agents go wrong with this category. */
  pitfalls: string[];
  icon: LucideIcon;
  yaml: string;
  /** 2-3 other template slugs to suggest as related work. */
  relatedSlugs: string[];
  /** Optional slugs of `/use-cases/[slug]` playbooks that pair with this template. */
  relatedUseCases?: string[];
};

export const taskTemplates: TaskTemplate[] = [
  {
    slug: "fix-a-bug",
    id: "fix-a-bug",
    title: "Fix a bug",
    tagline:
      "Hand the agent a repro and a narrow brief — and get back a fix, not a rewrite.",
    description:
      "A bug fix is the smallest unit of agent work that pays its way. The win condition is a tight diff against a known repro, not a guided tour of the surrounding module. This template pins the request to the failing input, the file you already suspect, and the validation pattern the rest of the codebase already uses.",
    whenToUse:
      "You have a repro and want a narrow fix — not a rewrite of the surrounding module.",
    when: [
      "You can reproduce the bug locally and paste the exact repro steps.",
      "You already know which file or function is implicated.",
      "You want a fix in one or two files — not a refactor of the module.",
      "The desired error contract (status code, body shape) is clear up front.",
    ],
    pitfall:
      "If you can't write the repro steps, the agent can't either. Reproduce the bug yourself first, then paste the steps verbatim.",
    pitfalls: [
      "Skipping the repro. If you can't paste a `curl`, a script, or a unit test that fails, the agent can't either — it will guess at what the bug is and 'fix' something else.",
      "Letting the prompt say 'while you're there, clean up X.' The agent will believe you, the diff balloons, and the fix becomes unreviewable.",
      "Naming the symptom but not the desired behaviour. 'Don't 500' is not a spec — 'return 400 with body `{error: \"items_required\"}`' is.",
      "Forgetting to require a regression test. Without one, the same bug ships again the next time someone refactors the file.",
    ],
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
    relatedSlugs: ["add-tests", "investigate-and-report", "refactor-or-rename"],
    relatedUseCases: ["review-prep"],
  },
  {
    slug: "add-small-feature",
    id: "add-small-feature",
    title: "Add a small feature",
    tagline:
      "One capability you can describe in a sentence — with a list of what it isn't.",
    description:
      "Small features fail when they grow. The agent is happy to 'just tidy up the neighbouring component while it's there', and what was supposed to be a button becomes a 400-line PR. This template forces you to spell out the affordance and the negation list before the agent starts.",
    whenToUse:
      "One well-scoped capability you can describe in a single sentence — and a clear list of what it is not.",
    when: [
      "You can write the feature as a single sentence ('Add a CSV export button to /analytics').",
      "There's an obvious existing component, hook, or pattern the new code should mirror.",
      "You're willing to commit to an explicit out-of-scope list.",
      "The diff should plausibly touch one or two directories — not the whole app.",
    ],
    pitfall:
      "Without an explicit out-of-scope list, the agent will tidy up neighbouring code 'while it's there.' Write the negation list before the prompt.",
    pitfalls: [
      "No out-of-scope list. The agent will helpfully 'while I'm here' itself into a tour of the codebase.",
      "Describing the feature in the abstract instead of pointing at the file. 'Add a CSV button' becomes a new download library and three useEffect hooks; 'add a `<Button>` next to the date-range picker in `app/analytics/page.tsx`' becomes ten lines.",
      "Letting the prompt invent new infrastructure. If you don't say 'no new API route' or 'no new dependency', the agent will reach for one.",
      "Skipping acceptance criteria for the visible outcome. 'A button is visible on /analytics' is a check the agent can self-verify; 'the feature works' is not.",
    ],
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
    relatedSlugs: ["fix-a-bug", "add-tests", "add-docs"],
    relatedUseCases: ["parallel-work", "switch-from-raw-cli"],
  },
  {
    slug: "refactor-or-rename",
    id: "refactor-or-rename",
    title: "Refactor / rename",
    tagline:
      "A mechanical move kept mechanical — so the diff stays cheap to review.",
    description:
      "Renames and moves are the easiest agent task to ship — and the easiest to ruin by letting the agent 'improve things slightly' along the way. This template scopes the change to a pure mechanical operation: same signature, same behaviour, new path. The reviewer reads the diff once and moves on.",
    whenToUse:
      "A mechanical, behaviour-preserving change: a rename, a move, a signature tightening.",
    when: [
      "The change is mechanical: a rename, a move, an import rewrite.",
      "You want the function body, the signature, and the test surface to stay byte-identical.",
      "You'd happily land it as a single 'no behaviour change' commit.",
      "There's a downstream task (or PR) where the behaviour change actually belongs.",
    ],
    pitfall:
      "Resist the urge to fold in a 'tiny cleanup' — keep the diff mechanical so review stays cheap.",
    pitfalls: [
      "Folding in 'one tiny cleanup'. Each cleanup turns the review from 'verify the move' into 'audit every line', which is the opposite of cheap.",
      "Letting the agent reformat unrelated lines. Forbid reformatting in the prompt; otherwise Prettier-on-save will quietly rewrite half the file.",
      "Forgetting the grep check. If you don't make 'no importer of the old path remains' an acceptance criterion, you'll discover dangling imports a week later.",
      "Bundling a rename with a behaviour change. If the agent has to think about semantics, it'll think about both — and the review surface doubles.",
    ],
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
    relatedSlugs: ["update-dependency", "add-tests", "investigate-and-report"],
    relatedUseCases: ["refactor", "migration"],
  },
  {
    slug: "add-tests",
    id: "add-tests",
    title: "Add tests for an untested module",
    tagline:
      "Backfill coverage against a named bar — not the agent's idea of 'enough tests'.",
    description:
      "'Add tests' is one of the most-abused prompts in agent work. Without a bar, the agent ships three happy-path snapshots and declares victory. This template names the specific cases that must be covered, the structural template to imitate, and the runner command that has to pass.",
    whenToUse:
      "Backfilling coverage on one file with zero or near-zero tests, against a clear bar.",
    when: [
      "You can list the specific cases that need to be covered (happy path, empty input, malformed input, the bug you hit last week).",
      "An existing test file shows the structural pattern to imitate.",
      "You want a measurable bar — a coverage threshold, a list of `it(...)` blocks, a specific failing case.",
      "You're willing to forbid changes to the module under test.",
    ],
    pitfall:
      "'Add tests' without naming the cases produces shallow happy-path coverage. List the specific cases that must be covered.",
    pitfalls: [
      "Saying 'add tests' without naming the cases. The agent writes three happy-path assertions and moves on; the regression you actually cared about stays uncovered.",
      "Not pointing at a structural template. The agent will invent its own test style, your repo gets two flavours, and `describe`/`it` nesting drifts.",
      "Letting the agent edit the module under test. It will 'helpfully' tweak the function to make the test simpler — and you'll never know the original behaviour wasn't the bug.",
      "Pinning coverage but not behaviour. A 90% threshold passes with assertions like `expect(fn).not.toThrow()`; name the actual outcomes you want verified.",
    ],
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
    relatedSlugs: ["fix-a-bug", "refactor-or-rename", "perf-regression-hunt"],
    relatedUseCases: ["test-coverage", "refactor"],
  },
  {
    slug: "update-dependency",
    id: "update-dependency",
    title: "Update a dependency / migration",
    tagline:
      "One library, one changelog, one diff — not three half-finished upgrades in a trench coat.",
    description:
      "Dependency upgrades succeed when the agent can hold one library's breaking changes in its head. They fail when the prompt says 'upgrade everything' and the agent fans out across five changelogs at once. This template restricts the upgrade to one library, names the breaking changes to handle, and forbids opportunistic refactors.",
    whenToUse:
      "Bumping a library across a major version, with breaking changes the agent has to read about and handle.",
    when: [
      "You're bumping a single library across a major version with documented breaking changes.",
      "The changelog or release notes are linkable from the prompt.",
      "You can grep for the removed APIs the agent has to replace.",
      "You're willing to defer 'while we're at it' bumps to their own tasks.",
    ],
    pitfall:
      "Don't bundle two upgrades into one task. The agent needs to read one changelog at a time or the failure mode is unreadable.",
    pitfalls: [
      "Bundling multiple bumps into one task. When the build breaks, you can't tell which library's breaking change did it — the task becomes an unreadable debug session.",
      "Not linking the changelog. The agent will rely on its training-cutoff understanding of v9 and miss the breaking change that landed in v9.2.",
      "Letting the agent add a compatibility shim. Once you have a shim, you also have technical debt; force the rewrite at the call site.",
      "Skipping the runtime check. 'Tests pass' isn't enough — `npm run dev` boots cleanly and the log output shape is the same.",
    ],
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
    relatedSlugs: ["refactor-or-rename", "add-tests", "investigate-and-report"],
    relatedUseCases: ["migration"],
  },
  {
    slug: "add-docs",
    id: "add-docs",
    title: "Add a documentation page",
    tagline:
      "A focused docs page with a length budget — not a 3,000-word essay.",
    description:
      "Docs tasks fail when they're open-ended. 'Document the sandbox' is a prompt the agent will happily turn into a wall of marketing prose. This template caps the word count, lists the required sections, and anchors the new page to an existing one as a structural template.",
    whenToUse:
      "A new docs page or section with a clear shape, length budget, and zero code changes.",
    when: [
      "You can name an existing docs page to copy the structure from.",
      "You can list the required sections in order.",
      "You're willing to set a word-count budget (and let the agent enforce it).",
      "The task ships markdown only — no code changes, no new dependencies.",
    ],
    pitfall:
      "Without a length bound and an outline, agents drift into a 3,000-word essay. Cap the word count and list the sections.",
    pitfalls: [
      "No length cap. The agent will pad — three paragraphs become eight, and the docs page becomes the longest one in the site without saying much more.",
      "No structural template. The agent invents a new frontmatter shape and the docs registry quietly stops indexing the page.",
      "Letting marketing prose creep in. Docs that read like a landing page are docs nobody trusts; require concrete examples and links to source.",
      "Forgetting the navigation registration. New docs pages need to be linked into a `meta.json` or sidebar — make it an acceptance criterion or the page becomes unreachable.",
    ],
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
    relatedSlugs: ["add-small-feature", "investigate-and-report", "add-tests"],
    relatedUseCases: ["docs-sprint"],
  },
  {
    slug: "investigate-and-report",
    id: "investigate-and-report",
    title: "Investigate and report (no code changes)",
    tagline:
      "Diagnosis only — the artifact is a Markdown report, not a patch.",
    description:
      "Sometimes you need to know what's wrong before you decide how to fix it. Without an explicit 'no code changes' rule, the agent will produce a half-baked fix and call it diagnosis. This template makes the artifact a structured Markdown report and makes a clean `git diff --stat` a literal acceptance criterion.",
    whenToUse:
      "You need a written diagnosis before deciding on a fix — the task ships a Markdown report, not a diff.",
    when: [
      "You're not yet sure whether the bug needs a fix, a refactor, or a product decision.",
      "You want the diagnosis written down before anyone touches the code.",
      "The next step depends on what the agent finds — and you'd rather scope the fix as a follow-up task.",
      "You want file:line references you can hand to the next agent (or human).",
    ],
    pitfall:
      "If you don't say 'diagnosis only,' the agent will try to fix it. Make 'no code changes' a literal acceptance criterion.",
    pitfalls: [
      "Forgetting to forbid code changes. Agents default to fixing things; without an explicit 'no diff outside the report file' criterion, you get an investigation and a half-finished fix.",
      "Vague output shape. 'Write up what you found' gives you a wall of prose; a numbered section list gives you a report you can act on.",
      "Letting the report paraphrase instead of cite. Require `file:line` references for every claim about behaviour.",
      "Skipping the 'could not reproduce' branch. Without it, the agent will invent a repro that doesn't exist rather than admit the bug is non-deterministic.",
    ],
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
    relatedSlugs: ["fix-a-bug", "perf-regression-hunt", "refactor-or-rename"],
    relatedUseCases: ["review-prep"],
  },
  {
    slug: "perf-regression-hunt",
    id: "perf-regression-hunt",
    title: "Performance regression hunt",
    tagline:
      "Pin the threshold in the acceptance criteria — and make the agent prove it.",
    description:
      "Performance fixes are the easiest place for an agent to ship a 'looks faster' diff that regresses production. This template forces a measurable bar: a baseline number on `main`, a benchmark command the agent has to run, and a numeric threshold the change has to beat before it can be merged.",
    whenToUse:
      "Something got slower and you want a measured before/after, not a vibes-based fix.",
    when: [
      "You have a measurable baseline — a benchmark script, a p95 graph, a load test.",
      "You can name a numeric pass/fail threshold the change has to clear.",
      "There's a recent commit range or version delta where the regression appears.",
      "You're willing to throw the change away if the numbers don't move.",
    ],
    pitfall:
      "Without a numeric pass/fail bar, the agent declares 'feels faster' and merges a regression. Pin the threshold.",
    pitfalls: [
      "No numeric bar. 'Make it faster' lets the agent declare victory after a 2% improvement; pin a real threshold ('p95 under 100ms on the staging dataset').",
      "No baseline measurement. Without numbers from `main`, you can't tell whether the agent's 'after' is genuinely better or just measured on a quieter machine.",
      "Letting the agent change the response shape to win the benchmark. Forbid it in the prompt; otherwise the regression silently moves to a different layer.",
      "Skipping the 'throw it away' rule. Without 'if the bench doesn't pass, drop the change and try a different hypothesis', the agent ships a marginal improvement and calls it done.",
    ],
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
    relatedSlugs: ["investigate-and-report", "fix-a-bug", "add-tests"],
    relatedUseCases: ["test-coverage"],
  },
];

export function getTaskTemplate(slug: string): TaskTemplate | undefined {
  return taskTemplates.find((template) => template.slug === slug);
}

export function getRelatedTaskTemplates(template: TaskTemplate): TaskTemplate[] {
  return template.relatedSlugs
    .map((slug) => getTaskTemplate(slug))
    .filter((t): t is TaskTemplate => t !== undefined);
}
