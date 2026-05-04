export type AnsiColor =
  | "fire"
  | "ember"
  | "flame"
  | "muted"
  | "green"
  | "red"
  | "blue"
  | "default";

export type OutputSegment = {
  text: string;
  color?: AnsiColor;
};

export type TerminalLine =
  | { type: "command"; text: string; pauseAfter?: number }
  | { type: "output"; segments: OutputSegment[]; pauseAfter?: number }
  | { type: "blank"; pauseAfter?: number };

export const defaultScript: TerminalLine[] = [
  { type: "command", text: "watchfire init" },
  {
    type: "output",
    segments: [
      { text: "✓ ", color: "green" },
      { text: "Created " },
      { text: ".watchfire/project.yaml", color: "muted" },
    ],
  },
  {
    type: "output",
    segments: [
      { text: "✓ ", color: "green" },
      { text: "Daemon connected on " },
      { text: ":7766", color: "ember" },
    ],
  },
  { type: "blank" },
  { type: "command", text: "watchfire task add" },
  {
    type: "output",
    segments: [
      { text: "  Title: ", color: "muted" },
      { text: "Add dark mode toggle" },
    ],
  },
  {
    type: "output",
    segments: [
      { text: "✓ ", color: "green" },
      { text: "Created task " },
      { text: "0001", color: "fire" },
      { text: " ", color: "muted" },
      { text: "(ready)", color: "muted" },
    ],
    pauseAfter: 350,
  },
  { type: "blank" },
  { type: "command", text: "watchfire task add" },
  {
    type: "output",
    segments: [
      { text: "  Title: ", color: "muted" },
      { text: "Wire up MDX search" },
    ],
  },
  {
    type: "output",
    segments: [
      { text: "✓ ", color: "green" },
      { text: "Created task " },
      { text: "0002", color: "fire" },
      { text: " ", color: "muted" },
      { text: "(ready)", color: "muted" },
    ],
    pauseAfter: 350,
  },
  { type: "blank" },
  { type: "command", text: "watchfire task list" },
  {
    type: "output",
    segments: [
      { text: "  0001  ", color: "muted" },
      { text: "ready  ", color: "fire" },
      { text: "Add dark mode toggle" },
    ],
  },
  {
    type: "output",
    segments: [
      { text: "  0002  ", color: "muted" },
      { text: "ready  ", color: "fire" },
      { text: "Wire up MDX search" },
    ],
  },
  {
    type: "output",
    segments: [
      { text: "  0003  ", color: "muted" },
      { text: "done   ", color: "green" },
      { text: "Add OG image generation" },
    ],
    pauseAfter: 500,
  },
  { type: "blank" },
  { type: "command", text: "watchfire wildfire" },
  {
    type: "output",
    segments: [
      { text: "→ ", color: "ember" },
      { text: "Phase 1: ", color: "ember" },
      { text: "execute" },
    ],
  },
  {
    type: "output",
    segments: [
      { text: "→ ", color: "ember" },
      { text: "Agent " },
      { text: "claude-code", color: "fire" },
      { text: " spawned in " },
      { text: ".watchfire/worktrees/0001", color: "muted" },
    ],
    pauseAfter: 320,
  },
  {
    type: "output",
    segments: [
      { text: "  Reading ", color: "muted" },
      { text: "components/Header.tsx" },
    ],
    pauseAfter: 280,
  },
  {
    type: "output",
    segments: [
      { text: "  Editing ", color: "muted" },
      { text: "app/globals.css" },
    ],
    pauseAfter: 280,
  },
  {
    type: "output",
    segments: [{ text: "  Running build…", color: "muted" }],
    pauseAfter: 350,
  },
  {
    type: "output",
    segments: [
      { text: "  ✓ ", color: "green" },
      { text: "Tests passed" },
    ],
    pauseAfter: 250,
  },
  { type: "blank" },
  {
    type: "output",
    segments: [
      { text: "✓ ", color: "green" },
      { text: "0001 done", color: "fire" },
      { text: " · ", color: "muted" },
      { text: "0002 done", color: "fire" },
      { text: " · merged into ", color: "muted" },
      { text: "main", color: "ember" },
    ],
    pauseAfter: 1200,
  },
];
