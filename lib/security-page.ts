import type { ReactNode } from "react";

export type TrustPillarIcon =
  | "HardDrive"
  | "ShieldCheck"
  | "GitBranch"
  | "Unlock";

export interface TrustPillar {
  title: string;
  body: string;
  icon: TrustPillarIcon;
}

export const trustPillars: TrustPillar[] = [
  {
    title: "Local-first by default",
    body: "The daemon, your tasks, and your secrets live on your machine. Watchfire doesn't proxy your code through our servers — there are no Watchfire servers. The only outbound traffic is what your chosen agent backend already does.",
    icon: "HardDrive",
  },
  {
    title: "Sandboxed agent runs",
    body: "Every agent process is wrapped in a platform-native sandbox — Seatbelt on macOS, Landlock or Bubblewrap on Linux. Credential directories and shell config are blocked at the kernel level, not by an honor system.",
    icon: "ShieldCheck",
  },
  {
    title: "Isolated git worktrees",
    body: "Each task gets its own git worktree on its own branch. The agent can only touch that copy of the repo; merges back to your default branch happen through normal git flows that you review.",
    icon: "GitBranch",
  },
  {
    title: "Open source, auditable",
    body: "The daemon, CLI/TUI, and GUI are Apache-2.0 licensed and live on GitHub. Every sandbox profile, signature verifier, and secret-handling path is open for review — and reviewed.",
    icon: "Unlock",
  },
];

export interface ThreatItem {
  text: string;
}

export const threatsInScope: ThreatItem[] = [
  {
    text: "An agent reading or exfiltrating credentials in ~/.ssh, ~/.aws, ~/.gnupg, .env, .netrc, or .npmrc.",
  },
  {
    text: "An agent planting a .git/hooks payload that runs the next time you commit (enforced on macOS).",
  },
  {
    text: "A forged inbound webhook impersonating Slack, Discord, or GitHub to drive the daemon.",
  },
  {
    text: "A replayed inbound delivery executing the same slash command twice.",
  },
  {
    text: "An agent escaping its worktree to scribble over the rest of the repo.",
  },
];

export const threatsOutOfScope: ThreatItem[] = [
  {
    text: "The agent's reasoning itself. If a task prompt tells the agent to delete files in its worktree, it will.",
  },
  {
    text: "A malicious model provider you've configured. Watchfire trusts the backend you point it at.",
  },
  {
    text: "A locally-privileged user who can attach a debugger or read the OS keyring directly.",
  },
  {
    text: "A network attacker who can intercept loopback traffic on a multi-user machine.",
  },
  {
    text: "Windows hosts. The sandbox is not yet implemented there — agents run with your user's full permissions.",
  },
];

export type SandboxAccessLevel =
  | "read-write"
  | "read-only"
  | "blocked"
  | "allowed";

export interface SandboxBoundary {
  resource: string;
  detail: string;
  level: SandboxAccessLevel;
}

export const sandboxBoundaries: SandboxBoundary[] = [
  {
    resource: "Task worktree",
    detail: ".watchfire/worktrees/{n}/ — the agent's working copy",
    level: "read-write",
  },
  {
    resource: "/tmp",
    detail: "Scratch space for tooling and build caches",
    level: "read-write",
  },
  {
    resource: "Rest of the filesystem",
    detail: "Read-only access for compilers, language servers, and lookups",
    level: "read-only",
  },
  {
    resource: "Network",
    detail: "Full outbound access — your backend needs to call its model provider",
    level: "allowed",
  },
  {
    resource: "~/.ssh, ~/.aws, ~/.gnupg",
    detail: "SSH keys, cloud credentials, GPG keys",
    level: "blocked",
  },
  {
    resource: "~/.netrc, ~/.npmrc",
    detail: "HTTP and npm registry credentials",
    level: "blocked",
  },
  {
    resource: "~/Desktop, ~/Documents, ~/Downloads",
    detail: "Personal directories outside the project",
    level: "blocked",
  },
  {
    resource: ".env files and .git/hooks",
    detail: "Pattern-blocked on macOS (Seatbelt regex denies)",
    level: "blocked",
  },
];

export interface SecurityFaqItem {
  question: string;
  answer: ReactNode;
  answerText: string;
}
