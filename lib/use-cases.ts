export type UseCaseIcon =
  | "Hammer"
  | "ArrowRightLeft"
  | "TestTube"
  | "Layers"
  | "BookOpen"
  | "Eye"
  | "Terminal";

export type UseCaseWorkflowStep = {
  step: number;
  title: string;
  body: string;
};

export type UseCaseRelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export type UseCase = {
  slug: string;
  title: string;
  tagline: string;
  tag: string;
  icon: UseCaseIcon;
  intent: string;
  workflow: UseCaseWorkflowStep[];
  taskExample: string;
  whyWatchfire: string[];
  related: string[];
  relatedDocs: UseCaseRelatedLink[];
};

export const useCases: readonly UseCase[] = [
  {
    slug: "refactor",
    title: "Refactor a tangled module",
    tagline:
      "Carve a sprawling refactor into scoped diffs you can actually review.",
    tag: "Refactor",
    icon: "Hammer",
    intent:
      "You are looking at a module that has grown into a load-bearing mess — circular helpers, three flavours of the same util, a god class everyone is afraid to touch. You want to break the work down into focused subtasks, run them in isolated worktrees, and review one tight diff at a time instead of one branch that touches forty files.",
    workflow: [
      {
        step: 1,
        title: "Draft the carve-out as a project definition",
        body: "Open the project in Watchfire and write the refactor plan into `project.yaml` — the seams you want to introduce, the modules to split, the public API that must not change. The definition becomes the steady context every subtask inherits, so the agent stops over and over with the same intent.",
      },
      {
        step: 2,
        title: "Create one task per seam",
        body: "Add a task YAML per slice: extract the helper, move the type, swap the call sites. Keep each task's `prompt` and `acceptance_criteria` narrow enough that a single diff can close it. If a slice grows past 200 lines on paper, split it before you start.",
      },
      {
        step: 3,
        title: "Let Watchfire run them in isolated worktrees",
        body: "Hit start on the ready tasks (or flip Wildfire on for the whole queue). Each one runs in its own `watchfire/<n>` worktree on a dedicated branch, so a half-finished extraction in task #2 never poisons task #3. Failures stay scoped — only the offending subtask needs a rerun.",
      },
      {
        step: 4,
        title: "Review diffs one slice at a time",
        body: "When a task lands, you get a tight reviewable branch with the task definition right next to the diff. Merge the ones that pass review immediately and send the messy ones back as a new task with sharper acceptance criteria — without unwinding everything else.",
      },
    ],
    taskExample: `task_id: rfctr001
task_number: 12
title: "Extract pricing helpers out of orders.ts into lib/pricing.ts"
prompt: |
  \`services/orders.ts\` has grown to 1.4k lines and
  mixes order lifecycle with pricing math. Extract
  every pricing helper (anything that touches
  \`Money\`, discounts, tax, or rounding) into a new
  \`lib/pricing.ts\` module.

  Keep the public surface of \`services/orders.ts\`
  identical — callers must not need to change. Move
  the helpers, re-export the ones that are
  consumed externally from \`services/orders.ts\`
  for now, and update internal calls to import
  from \`lib/pricing.ts\` directly.

  Out of scope:
  - Renaming any helper.
  - Touching the database layer.
  - Changes outside \`services/orders.ts\`,
    \`lib/pricing.ts\`, and their existing tests.
acceptance_criteria: |
  - \`lib/pricing.ts\` exists and exports every
    helper that used to live inline in
    \`services/orders.ts\`.
  - \`services/orders.ts\` no longer defines any
    pricing math directly.
  - \`npm run test\` and \`npm run lint\` pass.
  - \`git diff main -- services/orders.ts\` only
    shows imports and re-exports — no behaviour
    changes.
status: ready
`,
    whyWatchfire: [
      "Per-task git worktrees mean an aborted extraction can't leak dirty state into the next slice — you just restart the one task that failed.",
      "Acceptance criteria force you to declare the public API contract up front, so the agent can't quietly broaden the refactor while you're not looking.",
      "Wildfire mode keeps the queue moving on its own, so an eight-step refactor finishes overnight instead of stretching across a week of pair-driving the CLI.",
      "Every subtask lands on its own `watchfire/<n>` branch, so review and merge can happen incrementally — no one-shot mega-PR.",
      "The transcript per task is preserved, so when a reviewer asks 'why did you do it this way?' you have the prompt, the acceptance criteria, and the agent's reasoning side by side.",
    ],
    related: ["migration", "test-coverage", "review-prep"],
    relatedDocs: [
      {
        href: "/docs/recipes#refactor-a-module-across-multiple-tasks",
        label: "Recipe: refactor a module across multiple tasks",
        description: "The full walkthrough this use case is distilled from.",
      },
      {
        href: "/docs/concepts/projects-and-tasks",
        label: "Projects and tasks",
        description: "How project.yaml and task YAMLs fit together.",
      },
      {
        href: "/blog/2026-05-18-isolated-worktrees-per-task",
        label: "Why isolated worktrees per task",
      },
    ],
  },
  {
    slug: "migration",
    title: "Drive a migration or codemod in parallel",
    tagline: "Slice a framework upgrade per package and run them concurrently.",
    tag: "Migration",
    icon: "ArrowRightLeft",
    intent:
      "You have a migration the size of a small mountain — a framework bump, a deprecated API removal, a codemod across hundreds of files. Driving the agent one prompt at a time is brittle, and a single mega-branch is unreviewable. You want concurrent per-package tasks that can each fail or succeed independently.",
    workflow: [
      {
        step: 1,
        title: "Pin the target in the project definition",
        body: "Spell out the exact version, codemod, or API you're migrating to in `project.yaml`. Include the canonical 'before/after' snippet — that becomes the worked example every subtask falls back on when the codebase doesn't match what the agent expected.",
      },
      {
        step: 2,
        title: "Slice by package, module, or directory",
        body: "Create one task per migration unit — a package, a feature folder, a top-level route. Each task's prompt names the exact paths it owns and the acceptance criteria for that slice. Keep the slices small enough to merge independently.",
      },
      {
        step: 3,
        title: "Run the queue concurrently with Wildfire",
        body: "Mark every task `ready` and turn on Wildfire mode. The daemon dispatches them across isolated worktrees, so a transform that goes sideways on package A never blocks package B — and the sandbox keeps each agent from reaching into its neighbour's files.",
      },
      {
        step: 4,
        title: "Re-run the flaky ones in isolation",
        body: "When you spot a task that landed in a weird state — codemod ran twice, type imports broken, tests skipped — open the transcript, tighten the acceptance criteria, and rerun just that subtask. Everything that passed stays merged.",
      },
    ],
    taskExample: `task_id: mig00007
task_number: 7
title: "Migrate packages/billing/* from react-query v4 to v5"
prompt: |
  Upgrade every \`@tanstack/react-query\` usage
  under \`packages/billing/\` from v4 to v5.

  Concretely:
  - Replace \`useQuery({ queryKey, queryFn })\`
    object-form calls that still use the v4
    callback options (\`onSuccess\`, \`onError\`,
    \`onSettled\`) with v5-equivalent
    \`useEffect\`-style side effects on the
    component.
  - Replace any \`isLoading\` reads that should now
    be \`isPending\`.
  - Update \`packages/billing/package.json\` to
    \`@tanstack/react-query@^5\` and re-run
    \`pnpm install\` inside the worktree.

  Do not touch anything outside
  \`packages/billing/\`. Other packages have their
  own migration tasks.
acceptance_criteria: |
  - No \`onSuccess\`/\`onError\`/\`onSettled\`
    options remain on \`useQuery\` calls in
    \`packages/billing/\`.
  - \`packages/billing\` builds against
    \`@tanstack/react-query@^5\`.
  - \`pnpm --filter billing test\` passes.
  - \`pnpm --filter billing lint\` passes.
  - The lockfile in the worktree is committed.
status: ready
`,
    whyWatchfire: [
      "Per-task worktrees mean concurrent migrations don't fight over the working tree — package A and package B run side by side on their own branches.",
      "The sandbox blocks each agent from reading or writing outside the project, so a runaway codemod on one slice can't accidentally rewrite another team's files.",
      "Each task's acceptance criteria nail the slice's contract — 'no v4 options remain', 'lockfile committed' — so 'looks done' isn't enough to close the task.",
      "If one package's transform is dirty, you re-queue just that task. The clean ones merge immediately instead of waiting for the laggard.",
      "The daemon tracks every transcript, so when a reviewer asks 'why this approach for package C?' the answer is one click away.",
    ],
    related: ["refactor", "parallel-work", "test-coverage"],
    relatedDocs: [
      {
        href: "/docs/concepts/projects-and-tasks",
        label: "Projects and tasks",
        description: "Task scoping and YAML reference.",
      },
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes — Wildfire and start-all",
      },
      {
        href: "/blog/2026-05-18-inside-wildfire-mode",
        label: "Inside Wildfire mode",
      },
    ],
  },
  {
    slug: "test-coverage",
    title: "Backfill tests on an under-covered module",
    tagline:
      "Pin the coverage bar in acceptance criteria — and make the agent earn it.",
    tag: "Test coverage",
    icon: "TestTube",
    intent:
      "You inherited a module that nobody covered properly. Coverage is in the 30s, every PR adds a little, nobody ever does the boring sweep. You want to point an agent at it with a real bar to clear — a failing test, a missing edge case, a coverage threshold — and only call the task done when the bar is actually met.",
    workflow: [
      {
        step: 1,
        title: "Encode the bar in the acceptance criteria",
        body: "Write the criterion as a measurable outcome — `npm run coverage` on `lib/foo/**` lands above 85%, the regression for issue #341 has a test, the branch in `parse()` that swallows errors gets covered. The task isn't done until that command exits 0.",
      },
      {
        step: 2,
        title: "Point the prompt at real cases, not 'add tests'",
        body: "Give the prompt the actual situations to cover: the bug repro, the edge cases your team has hit, the inputs that today blow up at runtime. Vague 'add tests' tasks produce vague tests; specific cases produce tests that catch the next regression.",
      },
      {
        step: 3,
        title: "Run inside the sandboxed worktree",
        body: "Watchfire spins the task up in its own worktree with the sandbox on. The agent can run the test runner, read coverage reports, and iterate locally — but it can't ssh out or rewrite global config. You get coverage that came from real test runs, not made-up assertions.",
      },
      {
        step: 4,
        title: "Reject 'snapshot it and move on'",
        body: "Review the diff with the acceptance criteria open. If a test only asserts the function didn't throw, send it back with sharper criteria — 'a test must fail on `main` when the assertion is inverted'. Tighten until the test actually proves the behaviour.",
      },
    ],
    taskExample: `task_id: tst00004
task_number: 4
title: "Backfill tests for lib/parse-csv.ts to 90% line coverage"
prompt: |
  \`lib/parse-csv.ts\` sits at 41% line coverage and
  has been the source of three recent bugs:
  - Quoted commas inside fields were split as
    column boundaries (#312).
  - Trailing newlines produced an empty trailing
    row (#327).
  - CRLF line endings doubled the row count on
    Windows-exported files (#341).

  Add tests under
  \`lib/parse-csv.test.ts\` covering at minimum:
  - A field containing a quoted comma.
  - A file ending with one and with two newlines.
  - A file using \`\\r\\n\` line endings.
  - An empty file (zero rows, no error).
  - A header-only file (zero data rows).

  Use the existing Vitest setup. Do not change
  \`lib/parse-csv.ts\` — if a test surfaces a real
  bug, leave it failing and add a TODO comment
  with the issue number.
acceptance_criteria: |
  - \`npm run coverage -- lib/parse-csv.ts\` reports
    \\>= 90% line coverage on that file.
  - All the listed cases above exist as named
    \`it(...)\` blocks.
  - \`npm run test\` passes (except for any
    intentionally-failing test added per the
    prompt — those must be marked \`it.fails(...)\`
    with the issue number).
  - No changes outside \`lib/parse-csv.test.ts\`.
status: ready
`,
    whyWatchfire: [
      "Acceptance criteria pin the test bar in machine-checkable form — coverage thresholds, named cases, runner exit code — so 'I added a test' isn't the same as 'the task is done'.",
      "The agent runs the test runner inside the worktree, so the coverage numbers come from real runs you can re-verify, not from the agent's belief that the tests probably pass.",
      "Sandboxing keeps the agent from monkey-patching CI config or coverage exclusions to 'fix' the threshold — the path to passing is to actually add the test.",
      "Each module can have its own task, so you can run a coverage sweep across half a dozen modules in parallel without stepping on each other's runs.",
      "The transcript records exactly which cases the agent considered and which it skipped, so a reviewer can spot 'oh, you never tested CRLF' before merge instead of after.",
    ],
    related: ["refactor", "migration", "review-prep"],
    relatedDocs: [
      {
        href: "/docs/recipes#add-tests-to-an-untested-module",
        label: "Recipe: add tests to an untested module",
      },
      {
        href: "/docs/tips",
        label: "Tips for writing good tasks",
      },
      {
        href: "/templates",
        label: "Task templates — copy-paste starters",
      },
    ],
  },
  {
    slug: "parallel-work",
    title: "Run several features in flight at once",
    tagline:
      "Queue background work and let Wildfire keep it moving while you ship the main thing.",
    tag: "Parallel work",
    icon: "Layers",
    intent:
      "You have one feature that needs your full attention and four others that need to land this sprint. You don't want to ignore the four, but you also don't want to babysit them. You want background work running in isolation, surfacing for review when it's actually ready — not interrupting you mid-flow.",
    workflow: [
      {
        step: 1,
        title: "Draft every feature as its own task",
        body: "Write a task YAML per feature — prompt, acceptance criteria, status `ready`. Don't lump them together; the whole point is that each one can land or fail independently and the queue can pick the next one up the moment one finishes.",
      },
      {
        step: 2,
        title: "Turn on Wildfire mode",
        body: "Flip Wildfire on in the TUI or GUI. The daemon picks ready tasks off the queue, refines drafts that aren't tight enough, and even drafts new tasks from the project definition when the queue runs dry. You stop being the dispatcher.",
      },
      {
        step: 3,
        title: "Keep coding on `main`",
        body: "While Wildfire chews on the queue, your working tree is untouched — every task lives in its own `watchfire/<n>` worktree. You can keep editing on `main`, commit, push, even rebase, without colliding with any in-flight agent session.",
      },
      {
        step: 4,
        title: "Review what landed when you come up for air",
        body: "Background tasks merge into reviewable branches (or auto-merge if you trust the criteria). When you're ready, you do a single review pass over the batch instead of context-switching one PR at a time — and the messy ones go back as new tasks with sharper criteria.",
      },
    ],
    taskExample: `task_id: para0009
task_number: 9
title: "Add per-org rate limits to /api/* (Wildfire-friendly slice)"
prompt: |
  Add per-organization rate limits to every route
  under \`/api/\`. Use the existing Redis client at
  \`lib/redis.ts\` and the token-bucket helper at
  \`lib/rate-limit.ts\`. Read the org id from the
  request context populated by
  \`middleware/auth.ts\` — do not introduce a new
  way to derive the org.

  Limits, defaults:
  - 60 requests / minute for GET routes.
  - 30 requests / minute for POST/PUT/PATCH.
  - 10 requests / minute for DELETE.
  Allow overrides by setting
  \`org.rateLimitOverrides\` in the user-loaded
  context; respect them when present.

  When a request exceeds the limit, return 429
  with body \`{ "error": "rate_limited",
  "retryAfterSeconds": <int> }\` and a
  \`Retry-After\` header.

  Out of scope:
  - Touching any non-\`/api/\` route.
  - UI changes.
  - Adding a new dependency.
acceptance_criteria: |
  - Every \`app/api/*\` route applies the rate
    limit before reaching the handler body.
  - The 429 response matches the spec above (body
    and header).
  - New tests exist under \`app/api/__tests__/\`
    covering: GET above limit, POST under limit,
    override honoured, missing org id returns 401.
  - \`npm run test\` and \`npm run lint\` pass.
  - No new runtime dependencies in
    \`package.json\`.
status: ready
`,
    whyWatchfire: [
      "Per-task git worktrees mean background tasks can't touch the file you're editing on `main` — there's no 'oh, the agent stomped my work' failure mode.",
      "Wildfire mode keeps the queue moving on its own, refining drafts and starting the next ready task as soon as one finishes, so the background pile actually drains instead of stalling.",
      "Each task gets its own sandbox, so a feature that wedges a process, opens a port, or spawns a watcher only wedges its own session.",
      "The daemon survives client restarts — close the TUI, reboot the laptop, the background tasks keep running and pick back up.",
      "When a feature lands, it's on its own reviewable branch with the full transcript attached, so you can context-switch in for a focused review without losing your place on the main thread.",
    ],
    related: ["migration", "refactor", "docs-sprint"],
    relatedDocs: [
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes — Chat, Task, Wildfire",
      },
      {
        href: "/blog/2026-05-18-inside-wildfire-mode",
        label: "Inside Wildfire mode",
      },
      {
        href: "/docs/concepts/projects-and-tasks",
        label: "Projects and tasks",
      },
    ],
  },
  {
    slug: "docs-sprint",
    title: "Refresh docs from the source of truth",
    tagline:
      "Ship a docs pass page by page — not as one unreviewable docs-mega-PR.",
    tag: "Docs sprint",
    icon: "BookOpen",
    intent:
      "Your README has drifted, half the docs pages reference a flag that was renamed two releases ago, and the architecture page is from before the daemon split. You want to fix the lot, but a single 'update the docs' branch is unreviewable — and an agent given the whole job at once will paraphrase instead of pulling from real source.",
    workflow: [
      {
        step: 1,
        title: "List the pages, one task each",
        body: "Pick the pages or sections that need a pass and create one task per page. Each task's prompt names the file, the canonical source of truth in the repo (README, code comment, architecture note), and the rules for what counts as 'updated' — quoting code, linking to source, no marketing fluff.",
      },
      {
        step: 2,
        title: "Anchor every page to in-repo source",
        body: "In each prompt, point the agent at the actual files it should read — `lib/sandbox.go`, `cmd/watchfired/main.go`, the relevant CHANGELOG entry. Acceptance criteria require linked references, not paraphrase. The docs end up grounded in code, not in the agent's memory.",
      },
      {
        step: 3,
        title: "Run them in parallel, one page per branch",
        body: "Hit start across the queue. Each page lands as its own diff on its own `watchfire/<n>` branch. You can ship the clean ones immediately and send the messy ones back for another pass without holding up the rest of the sprint.",
      },
      {
        step: 4,
        title: "Cross-link in a final pass",
        body: "Once the per-page passes are in, queue one last task to walk the doc set and add the cross-links that only make sense once you can see the whole new shape — 'see also' boxes, related pages, fixed broken internal links. Small task, big polish payoff.",
      },
    ],
    taskExample: `task_id: doc00003
task_number: 3
title: "Refresh /docs/concepts/sandbox to match current Landlock setup"
prompt: |
  Rewrite \`content/docs/concepts/sandbox.mdx\` so
  it matches the current implementation in
  \`daemon/sandbox/landlock.go\` and
  \`daemon/sandbox/seatbelt.go\`.

  Specifically:
  - Replace any reference to \`bubblewrap\` as the
    default Linux sandbox — Landlock is the
    default now, with Bubblewrap as fallback.
  - Document the actual default blocklist (read
    it from \`daemon/sandbox/blocklist.go\`, do
    not invent entries).
  - Update the macOS section to reference
    \`seatbelt.sb\` directly and quote the actual
    deny rules in the file.
  - Add a "Troubleshooting" section listing the
    three most common errors users hit (look at
    the last 60 days of GitHub issues tagged
    \`sandbox\`).

  Every claim about behaviour must link to the
  source file or the issue that motivated it.
  No marketing prose — this is a reference page.
acceptance_criteria: |
  - The page no longer claims Bubblewrap is the
    default on Linux.
  - Every \`code\` block of a blocklist entry
    matches a literal entry in
    \`daemon/sandbox/blocklist.go\`.
  - The macOS section quotes from
    \`seatbelt.sb\`, not paraphrase.
  - At least three troubleshooting items exist,
    each linking to a real GitHub issue.
  - \`pnpm run check-links\` passes.
status: ready
`,
    whyWatchfire: [
      "One task per page keeps every diff reviewable — you can ship the README pass today and send the sandbox page back for another swing without blocking either.",
      "Acceptance criteria force the agent to ground its claims in source files instead of paraphrasing from training data, so the docs end up matching the code.",
      "Per-task worktrees mean every page edits in isolation, so two docs tasks can run concurrently without merge-conflict drama.",
      "The transcript shows which source files the agent actually read — invaluable when reviewing whether a 'reference page' actually consulted the reference.",
      "Wildfire mode can drain a 20-page docs queue overnight, so the messy ones come back for a focused human pass instead of dragging the whole sprint.",
    ],
    related: ["review-prep", "parallel-work", "refactor"],
    relatedDocs: [
      {
        href: "/docs/concepts/agent-modes",
        label: "Agent modes — Wildfire",
      },
      {
        href: "/docs/tips",
        label: "Tips for writing good tasks",
      },
      {
        href: "/docs/recipes",
        label: "Recipes — full walkthroughs",
      },
    ],
  },
  {
    slug: "review-prep",
    title: "Hand a branch the PR description it deserves",
    tagline:
      "Point an agent at a branch you already have — get a real PR write-up.",
    tag: "Review prep",
    icon: "Eye",
    intent:
      "You're done with the work. The branch is green. You just don't want to write the PR description, the changelog entry, the migration notes, and the test-plan checklist at 6pm on a Friday. You want an agent that already has the diff, the task definition, and your conventions, and that produces a write-up that matches the actual work — not one that hallucinates a 'refactor' that never happened.",
    workflow: [
      {
        step: 1,
        title: "Point the task at the branch you already have",
        body: "Create a task whose prompt names the branch, the comparison base (`main`), and the artifacts you want: PR description, changelog entry, migration notes, test plan. The agent gets the diff as context, plus your project definition — which is where your team's PR conventions live.",
      },
      {
        step: 2,
        title: "Spell out the conventions in acceptance criteria",
        body: "Encode the rules: 'must include a `## Test plan` checklist', 'changelog entry follows Keep-a-Changelog', 'migration notes must list every breaking change in the diff'. Generic 'write a PR description' tasks produce generic 'misc fixes' output.",
      },
      {
        step: 3,
        title: "Let the agent read the diff in a clean worktree",
        body: "The task runs in a worktree checked out at your branch. The agent can `git diff`, `git log`, and read the affected files directly — so the write-up references real symbols, real files, and real commits, not a vague summary of what it 'thinks' the branch did.",
      },
      {
        step: 4,
        title: "Paste, tweak, ship",
        body: "When the task finishes, the artifacts land in the worktree as plain markdown files (or wherever you asked them to go). Copy into the PR, edit anything that doesn't quite match your voice, and ship. You stop writing 'misc fixes' on a Friday.",
      },
    ],
    taskExample: `task_id: prep0011
task_number: 11
title: "Draft PR description, changelog, and migration notes for feature/per-org-limits"
prompt: |
  The branch \`feature/per-org-limits\` adds
  per-organization rate limiting to every
  \`/api/*\` route. The diff vs \`main\` is the
  full source of truth — do not invent changes
  that aren't in it.

  Produce three artifacts inside the worktree:

  1. \`PR_BODY.md\` — a PR description with:
     - One-paragraph summary.
     - "What changed" bullet list, grouped by
       area (routes, middleware, tests, infra).
     - "How to test" section with concrete curl
       commands or test invocations.
     - "Out of scope" section listing things this
       PR deliberately doesn't do.
  2. \`CHANGELOG_ENTRY.md\` — one entry in
     Keep-a-Changelog format under
     \`### Added\` / \`### Changed\` /
     \`### Fixed\` as appropriate.
  3. \`MIGRATION_NOTES.md\` — only if there's a
     breaking change for users of the API. List
     each breaking change with the old behaviour,
     the new behaviour, and the upgrade step.

  No marketing language. No 'this PR cleans up'
  unless cleanup is literally in the diff. If
  something is uncertain, leave a
  \`TODO: confirm\` line and move on.
acceptance_criteria: |
  - \`PR_BODY.md\` exists and references every
    top-level directory touched by
    \`git diff main...HEAD --name-only\`.
  - \`CHANGELOG_ENTRY.md\` is a single,
    well-formed Keep-a-Changelog entry.
  - \`MIGRATION_NOTES.md\` exists if and only if
    the diff contains an API-breaking change.
  - No claim in any artifact contradicts the
    actual diff.
status: ready
`,
    whyWatchfire: [
      "The task starts with the full diff and the project definition as context, so the write-up matches the actual work instead of a hallucinated summary.",
      "Acceptance criteria let you encode your team's PR conventions once — 'must include a test plan', 'changelog must follow Keep-a-Changelog' — and reuse them for every future review-prep task.",
      "The worktree gives the agent real `git diff` and `git log` access, so it references real file names and real commits, not a paraphrase from training data.",
      "Run it across half a dozen branches in parallel — every open PR gets its write-up while you're in a meeting.",
      "The transcript captures what the agent looked at, so if a reviewer questions a claim in the PR body you can trace it back to the diff line it came from.",
    ],
    related: ["docs-sprint", "switch-from-raw-cli", "refactor"],
    relatedDocs: [
      {
        href: "/docs/tips",
        label: "Tips for writing good tasks",
      },
      {
        href: "/docs/recipes",
        label: "Recipes — full walkthroughs",
      },
      {
        href: "/templates",
        label: "Task templates",
      },
    ],
  },
  {
    slug: "switch-from-raw-cli",
    title: "Switch from raw Claude Code or Codex",
    tagline:
      "Keep the agent you trust — add the seatbelts your working tree doesn't have.",
    tag: "Switching from raw CLI",
    icon: "Terminal",
    intent:
      "You already drive Claude Code, Codex, or another agent CLI directly. You like it. You're not looking to swap models or rewrite your workflow. You want the same agent, with worktree isolation so it stops trampling your working tree, a sandbox so it stops reading random files, and a task contract so the work has a shape you can review.",
    workflow: [
      {
        step: 1,
        title: "Init the project with the agent you already use",
        body: "`watchfire init --agent claude-code` (or `codex`, `opencode`, `gemini`, `copilot`, `cursor`) wraps the agent you already have authenticated — Watchfire doesn't replace your login or your model choice. The result is a `project.yaml` and a place to write tasks.",
      },
      {
        step: 2,
        title: "Translate your next prompt into a task",
        body: "Instead of typing the same intent into the agent CLI prompt, write it as a task: prompt, acceptance criteria, status `ready`. The four real shifts are: task instead of prompt, worktree instead of working tree, sandbox, and diff-review instead of mid-run intervention.",
      },
      {
        step: 3,
        title: "Run it and stay out of the way",
        body: "Watchfire spins the agent up in a fresh worktree with the sandbox on. You don't have to pause it to keep editing on `main` — the worktree is separate. You don't have to babysit — the task either meets its acceptance criteria or it doesn't.",
      },
      {
        step: 4,
        title: "Review the diff, then queue the next one",
        body: "When the task lands, you review a tight branch instead of debugging in the same terminal where the agent is still typing. Like the result? Merge. Don't? Re-queue with sharper criteria. Either way, the working tree stays clean and the next task is already pulling from the queue.",
      },
    ],
    taskExample: `task_id: swap0001
task_number: 1
title: "Your first Watchfire task, translated from a prompt you'd usually type"
prompt: |
  This is the kind of thing you would have typed
  straight into Claude Code or Codex. The only
  difference: write it down once, run it inside a
  worktree, and review a diff at the end.

  Add a \`/healthz\` route to \`app/healthz/\` that
  returns \`{ "ok": true, "version": <commit-sha> }\`
  with HTTP 200. Read the commit sha at build time
  from \`GIT_COMMIT_SHA\` if it's set, otherwise
  fall back to \`process.env.npm_package_version\`.

  Do not add a new dependency. Do not touch any
  existing route.
acceptance_criteria: |
  - GET \`/healthz\` returns 200 with the body
    described above.
  - A test exists under \`app/healthz/__tests__/\`
    that covers both the \`GIT_COMMIT_SHA\` path
    and the fallback.
  - \`npm run test\` and \`npm run lint\` pass.
  - No changes outside \`app/healthz/\` and (if
    needed) one tiny helper in \`lib/\`.
status: ready
`,
    whyWatchfire: [
      "Same agent, same login, same model — Watchfire wraps the CLI you already trust instead of replacing it.",
      "The agent runs in a worktree on its own branch, so you can keep editing and committing on `main` without an 'oops, the agent overwrote my file' moment.",
      "Sandboxing blocks `~/.ssh`, credential stores, and `.git/hooks` by default, so a misfired prompt can't reach out and grab something it shouldn't.",
      "Acceptance criteria mean the agent has a definition of done — you stop having to interrupt mid-run to nudge it back on track.",
      "When a task fails, you re-queue it. You don't restart a long REPL session and reconstruct the context from memory.",
    ],
    related: ["refactor", "parallel-work", "review-prep"],
    relatedDocs: [
      {
        href: "/blog/2026-05-20-migrating-from-raw-cli-to-watchfire",
        label: "Migrating from raw CLI to Watchfire",
        description: "The full migration walkthrough.",
      },
      {
        href: "/agents",
        label: "All six supported agent backends",
      },
      {
        href: "/docs/quickstart",
        label: "Quickstart — `watchfire init` to first task",
      },
    ],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((useCase) => useCase.slug === slug);
}

export function getRelatedUseCases(useCase: UseCase): UseCase[] {
  return useCase.related
    .map((slug) => getUseCase(slug))
    .filter((u): u is UseCase => u !== undefined);
}
