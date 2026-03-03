<p align="center">
  <img src="public/og-image.png" alt="Watchfire" width="600" />
</p>

<h3 align="center"><strong>Better context. Better code.</strong></h3>

<p align="center">
  Watchfire is a context management and orchestration platform for AI coding agents. Define your project, break work into tasks, and let agents execute with full awareness of your codebase.
</p>

<p align="center">
  <a href="https://watchfire.io">Website</a> · <a href="https://watchfire.io/docs">Docs</a> · <a href="https://github.com/watchfire-io/watchfire">GitHub</a>
</p>

---

## Key Features

- **Context Management** — Define your project once. Agents get the right specs, constraints, and codebase context automatically.
- **Task Orchestration** — Break projects into well-scoped tasks with clear acceptance criteria. Agents tackle them in order.
- **Git Worktree Isolation** — Each task runs in its own git worktree branch. No conflicts, clean merges.
- **Sandboxed Execution** — Agents run in sandboxed environments with controlled filesystem and network access.
- **Multiple Agent Modes** — Chat, Task, Start All, Wildfire (autonomous loop), and auto-generation modes.
- **Multi-Project Support** — Manage and monitor multiple projects in parallel from TUI or GUI.

## Quick Start

```bash
brew install watchfire-io/tap/watchfire
```

```bash
cd your-project
watchfire init        # Initialize a project
watchfire task add    # Add tasks
watchfire             # Launch the TUI
```

## About This Repo

This is the source for the [Watchfire website](https://watchfire.io) — built with Next.js, Tailwind CSS, and TypeScript.

## License

MIT
