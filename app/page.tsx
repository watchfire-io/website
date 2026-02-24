export default function Home() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Remote control for{" "}
        <span className="text-purple-500">AI coding agents</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-400">
        Watchfire orchestrates coding agent sessions with task management, git
        worktree isolation, and sandboxed execution. Manage multiple projects in
        parallel from CLI, TUI, or GUI.
      </p>
      <div className="mt-10 flex gap-4">
        <a
          href="https://github.com/watchfire-io/watchfire"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-500"
        >
          View on GitHub
        </a>
        <a
          href="/docs"
          className="rounded-lg border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          Documentation
        </a>
      </div>
    </div>
  );
}
