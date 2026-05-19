export type AgentBackendIcon =
  | "Sparkles"
  | "Cpu"
  | "Code2"
  | "Gem"
  | "Github"
  | "MousePointer2";

export type AgentBackend = {
  slug: string;
  name: string;
  tagline: string;
  vendor: string;
  homepage: string;
  summary: string;
  withWatchfire: string;
  installCommand: string;
  quirks: string[];
  docsHref: string;
  icon: AgentBackendIcon;
};

export const agentBackends: readonly AgentBackend[] = [
  {
    slug: "claude-code",
    name: "Claude Code",
    tagline: "Anthropic's CLI coding agent — the original Watchfire backend.",
    vendor: "Anthropic",
    homepage: "https://www.anthropic.com/claude-code",
    summary:
      "Claude Code is Anthropic's official command-line coding agent. It runs locally, reads and writes files in your project, and pairs with Claude models for long-running engineering work. It is the backend Watchfire was originally built around.",
    withWatchfire:
      "Watchfire wraps Claude Code in per-task git worktrees and a platform sandbox, so each session gets its own isolated copy of the repo and a clean transcript. You keep your normal Claude login — Watchfire just appends its project and task prompt at launch time so multiple tasks can run in parallel without stepping on each other.",
    installCommand: "watchfire init --agent claude-code",
    quirks: [
      "Uses your normal Claude install — no separate per-session home directory to manage",
      "Watchfire appends its project/task system prompt at launch time",
      "Sign in with Claude Code before using it through Watchfire",
    ],
    docsHref: "/docs/concepts/supported-agents#claude-code",
    icon: "Sparkles",
  },
  {
    slug: "codex",
    name: "Codex",
    tagline: "OpenAI's Codex CLI — long-running coding sessions with isolated homes.",
    vendor: "OpenAI",
    homepage: "https://developers.openai.com/codex/cli",
    summary:
      "OpenAI Codex CLI is OpenAI's command-line coding agent. It runs locally, drives long agentic engineering sessions, and reuses your existing OpenAI login and config from `~/.codex/`.",
    withWatchfire:
      "Watchfire gives each Codex session its own `CODEX_HOME` under `~/.watchfire/codex-home/<session>/`, while reusing your real `~/.codex/auth.json` and `config.toml`. That means session-specific prompts, logs, and `AGENTS.md` stay isolated from your personal Codex history — but auth and config still carry over from your normal setup.",
    installCommand: "watchfire init --agent codex",
    quirks: [
      "Each session gets its own `CODEX_HOME` directory",
      "Reuses `~/.codex/auth.json` and `config.toml` from your normal setup",
      "Watchfire writes the generated `AGENTS.md` into the session home",
      "Complete Codex login once before running through Watchfire",
    ],
    docsHref: "/docs/concepts/supported-agents#openai-codex",
    icon: "Cpu",
  },
  {
    slug: "opencode",
    name: "opencode",
    tagline: "Open-source coding agent — bring your own provider.",
    vendor: "Open source",
    homepage: "https://opencode.ai",
    summary:
      "opencode is an open-source CLI coding agent. You configure it against the model provider you want, sign in once, and it stores config and data under `~/.config/opencode/`.",
    withWatchfire:
      "Watchfire gives each opencode session its own `OPENCODE_CONFIG_DIR` and `OPENCODE_DATA_DIR` under `~/.watchfire/opencode-home/<session>/`. Your existing auth and provider setup are linked in from `~/.config/opencode/`, so the login you already have keeps working — but per-session prompts, transcripts, and permission config stay isolated.",
    installCommand: "watchfire init --agent opencode",
    quirks: [
      "Each session gets its own config and data directories",
      "Reuses auth and provider setup from `~/.config/opencode/`",
      "Watchfire writes its own per-session `AGENTS.md` and permission config",
      "Sign in to opencode normally before using it with Watchfire",
    ],
    docsHref: "/docs/concepts/supported-agents#opencode",
    icon: "Code2",
  },
  {
    slug: "gemini",
    name: "Gemini CLI",
    tagline: "Google's Gemini coding agent on the command line.",
    vendor: "Google",
    homepage: "https://github.com/google-gemini/gemini-cli",
    summary:
      "Gemini CLI is Google's command-line coding agent backed by Gemini models. It uses a shared global setup at `~/.gemini/` for auth and configuration, then accepts a per-invocation system prompt.",
    withWatchfire:
      "Watchfire writes a dedicated prompt file under `~/.watchfire/gemini-home/<session>/system.md` for each session and points `GEMINI_SYSTEM_MD` at it. Your Gemini login and shared CLI settings still come from `~/.gemini/`, but the Watchfire system prompt and task context stay isolated per session.",
    installCommand: "watchfire init --agent gemini",
    quirks: [
      "Watchfire sets `GEMINI_SYSTEM_MD` to a per-session prompt file",
      "Auth and shared settings live in `~/.gemini/`",
      "Keep Gemini CLI working outside Watchfire first — Watchfire reuses the shared setup",
    ],
    docsHref: "/docs/concepts/supported-agents#gemini-cli",
    icon: "Gem",
  },
  {
    slug: "copilot",
    name: "GitHub Copilot CLI",
    tagline: "GitHub Copilot from the command line, running in yolo mode behind the sandbox.",
    vendor: "GitHub",
    homepage: "https://github.com/github/copilot-cli",
    summary:
      "GitHub Copilot CLI is GitHub's command-line Copilot agent. It signs in via `gh` or its own flow and stores config, MCP setup, and session history under `~/.copilot/`.",
    withWatchfire:
      "Watchfire gives each Copilot session its own `COPILOT_HOME`, symlinks your real `~/.copilot/{config.json,mcp-config.json,session-store.db}` into it, and points Copilot at a Watchfire-generated `AGENTS.md` via `COPILOT_CUSTOM_INSTRUCTIONS_DIRS`. Sessions run in yolo mode (`--allow-all`) — the Watchfire sandbox is the boundary, not Copilot's prompt gate.",
    installCommand: "watchfire init --agent copilot",
    quirks: [
      "Sessions run in yolo mode — Watchfire sandbox is the boundary",
      "Symlinks `~/.copilot/{config.json,mcp-config.json,session-store.db}` into the session home",
      "Uses `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` to load the per-session `AGENTS.md`",
      "Sign in with `gh` or Copilot CLI before running through Watchfire",
    ],
    docsHref: "/docs/concepts/supported-agents#github-copilot-cli",
    icon: "Github",
  },
  {
    slug: "cursor",
    name: "Cursor Agent",
    tagline: "Cursor's headless agent CLI — distinct from the in-editor agent.",
    vendor: "Anysphere",
    homepage: "https://docs.cursor.com/cli",
    summary:
      "Cursor Agent CLI is the headless command-line companion to the Cursor editor. It runs autonomously via `cursor-agent --workspace ... --print` and reuses auth and config from `~/.cursor/`. It is distinct from the interactive agent inside the Cursor editor.",
    withWatchfire:
      "Watchfire gives each Cursor Agent session its own home under `~/.watchfire/cursor-home/<project_id>/<session_id>/` and symlinks the real `~/.cursor/` auth and config files into it. The composed Watchfire system prompt is installed as `AGENTS.md` in the session home, and sessions launch headless with the yolo / trust flag behind the Watchfire sandbox.",
    installCommand: "watchfire init --agent cursor",
    quirks: [
      "Symlinks `~/.cursor/` auth/config files into the per-session home",
      "Launches headless with `cursor-agent --workspace <worktree> --print`",
      "Runs with the yolo / trust flag — Watchfire sandbox is the boundary",
      "Distinct from the Cursor editor's interactive in-editor agent",
    ],
    docsHref: "/docs/concepts/supported-agents#cursor-agent",
    icon: "MousePointer2",
  },
];

export function getAgentBackend(slug: string): AgentBackend | undefined {
  return agentBackends.find((agent) => agent.slug === slug);
}
