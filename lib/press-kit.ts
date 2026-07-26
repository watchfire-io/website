import { siteDescription, socialLinks, softwareVersion } from "@/lib/site";
import { agentBackends } from "@/lib/agent-backends";

export type Tagline = {
  length: "micro" | "short" | "long";
  label: string;
  caption: string;
  text: string;
};

export const taglines: readonly Tagline[] = [
  {
    length: "micro",
    label: "Micro",
    caption: "For a tweet, a chip, or a headline.",
    text: "Better context. Better code.",
  },
  {
    length: "short",
    label: "Short",
    caption: "For a deck slide or a meta description.",
    text: siteDescription,
  },
  {
    length: "long",
    label: "Long",
    caption: "For an article intro or a release-notes paragraph.",
    text: "Watchfire turns clear specs into scoped tasks, then hands each one to an agent in its own git worktree and sandbox. Better context in, better code out — with clean transcripts and full control at every step.",
  },
];

export const boilerplate =
  "Watchfire is an open-source remote control for AI coding agents. It turns clear specs into scoped YAML tasks, then runs each one in a sandboxed git worktree with a coding agent of your choice — Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, or Cursor Agent. Watchfire ships as a daemon, a CLI/TUI, and a desktop GUI, running on macOS, Linux, and Windows. It is free and open source under Apache-2.0; users pay their own model API costs.";

export type LogoAsset = {
  label: string;
  href: string;
  filename: string;
  /** Background that flatters this asset in a thumbnail. */
  surface: "dark" | "light";
  format: "SVG" | "PNG";
  note?: string;
};

/** Logos that already live in `public/`. Do not list anything that isn't there. */
export const logoAssets: readonly LogoAsset[] = [
  {
    label: "Flame logo — full bleed",
    href: "/logo.svg",
    filename: "watchfire-logo.svg",
    surface: "dark",
    format: "SVG",
    note: "Vector source, scales to any size.",
  },
  {
    label: "Favicon",
    href: "/favicon.svg",
    filename: "watchfire-favicon.svg",
    surface: "light",
    format: "SVG",
    note: "Compact mark — square crop.",
  },
  {
    label: "Banner — dark",
    href: "/banner-dark.png",
    filename: "watchfire-banner-dark.png",
    surface: "dark",
    format: "PNG",
    note: "Wide banner for dark layouts.",
  },
  {
    label: "Banner — light",
    href: "/banner-light.png",
    filename: "watchfire-banner-light.png",
    surface: "light",
    format: "PNG",
    note: "Wide banner for light layouts.",
  },
  {
    label: "Banner — app",
    href: "/banner-app.png",
    filename: "watchfire-banner-app.png",
    surface: "dark",
    format: "PNG",
    note: "Square / app-store-style banner.",
  },
  {
    label: "Social card (OG image)",
    href: "/og-image.png",
    filename: "watchfire-og-image.png",
    surface: "dark",
    format: "PNG",
    note: "Default Open Graph card, 1200×630.",
  },
];

export type PressScreenshot = {
  label: string;
  href: string;
  filename: string;
  caption: string;
};

/**
 * GUI screenshots that already live in `public/screenshots/`. The same set
 * the homepage GUI carousel pulls from, plus the rest of the surface area
 * (settings, logs, branches) for journalists who want to illustrate
 * something specific.
 */
export const pressScreenshots: readonly PressScreenshot[] = [
  {
    label: "Watchfire.app — dashboard",
    href: "/screenshots/dashboard.webp",
    filename: "watchfire-dashboard.webp",
    caption: "Multi-project dashboard with live task counts.",
  },
  {
    label: "Watchfire.app — project tasks",
    href: "/screenshots/project-tasks.webp",
    filename: "watchfire-project-tasks.webp",
    caption: "A project's task list with the live agent terminal alongside.",
  },
  {
    label: "Watchfire.app — task editor",
    href: "/screenshots/task-edit.webp",
    filename: "watchfire-task-edit.webp",
    caption: "Editing a task's prompt and acceptance criteria.",
  },
  {
    label: "Watchfire.app — live logs",
    href: "/screenshots/project-logs.webp",
    filename: "watchfire-project-logs.webp",
    caption: "Streaming the live terminal output from a running agent.",
  },
  {
    label: "Watchfire.app — chat",
    href: "/screenshots/chat-active.webp",
    filename: "watchfire-chat-active.webp",
    caption: "An active chat session with a coding agent.",
  },
  {
    label: "Watchfire.app — task list",
    href: "/screenshots/task-list.webp",
    filename: "watchfire-task-list.webp",
    caption: "The full task list with status, age, and last run.",
  },
  {
    label: "Watchfire.app — project definition",
    href: "/screenshots/project-definition.webp",
    filename: "watchfire-project-definition.webp",
    caption: "Editing the project definition — the prompt the agent reads first.",
  },
  {
    label: "Watchfire.app — project settings",
    href: "/screenshots/project-settings.webp",
    filename: "watchfire-project-settings.webp",
    caption: "Project-level settings: default agent, auto-merge, sandbox.",
  },
  {
    label: "Watchfire.app — global settings",
    href: "/screenshots/global-settings.webp",
    filename: "watchfire-global-settings.webp",
    caption: "Daemon-wide settings shared across all projects.",
  },
  {
    label: "Watchfire.app — branches",
    href: "/screenshots/branches.webp",
    filename: "watchfire-branches.webp",
    caption: "Per-task git worktrees, each on its own watchfire/NNNN branch.",
  },
  {
    label: "Watchfire.app — secrets",
    href: "/screenshots/project-secrets.webp",
    filename: "watchfire-project-secrets.webp",
    caption: "Per-project secrets passed into the sandbox at run time.",
  },
  {
    label: "Watchfire.app — trash",
    href: "/screenshots/project-trash.webp",
    filename: "watchfire-project-trash.webp",
    caption: "Recoverable trash for tasks the operator soft-deletes.",
  },
];

export type Founder = {
  name: string;
  role: string;
  bio: string;
  links: { label: string; href: string }[];
};

/**
 * Founders and maintainers. Names, roles, and bio text mirror `/about` —
 * do not introduce new biographical claims here.
 */
export const founders: readonly Founder[] = [
  {
    name: "Nuno Coração",
    role: "Creator and maintainer",
    bio: "Nuno started Watchfire because he wanted to run coding agents without babysitting a terminal. He writes most of the daemon, the CLI/TUI, the GUI, and — in a properly recursive way — uses Watchfire to build Watchfire.",
    links: [
      { label: "GitHub", href: "https://github.com/nunocoracao" },
    ],
  },
];

/** Press contact. Reuses the most-public address already on the site. */
export const pressContact = {
  email: "info@watchfire.io",
  subject: "Press",
  discussionsUrl: `${socialLinks.github}/discussions`,
};

export type Fact = {
  label: string;
  value: string;
  detail?: string;
};

export const facts: readonly Fact[] = [
  {
    label: "Founded",
    value: "2025",
    detail: "First public commit late 2025.",
  },
  {
    label: "License",
    value: "Apache-2.0",
    detail: "Free and open source. Users pay their own model API costs.",
  },
  {
    label: "Current version",
    value: `v${softwareVersion}`,
    detail: "See the changelog for the full release history.",
  },
  {
    label: "Pricing",
    value: "Free",
    detail: "No paid tier. Users pay their own model API.",
  },
  {
    label: "Supported agents",
    value: `${agentBackends.length} backends`,
    detail: agentBackends.map((a) => a.name).join(", ") + ".",
  },
  {
    label: "Platform",
    value: "macOS, Linux, Windows",
    detail:
      "Daemon, CLI/TUI, and GUI on all three. Sandboxing uses Seatbelt on macOS and Landlock or Bubblewrap on Linux; Windows currently runs unsandboxed.",
  },
  {
    label: "Source",
    value: "GitHub",
    detail: socialLinks.github,
  },
];
