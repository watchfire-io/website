import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Watchfire" width={24} height={24} />
              <span className="font-semibold text-zinc-900 dark:text-white">Watchfire</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Remote control for AI coding agents. Orchestrate tasks, isolate worktrees, sandbox execution.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/docs" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/watchfire-io/watchfire" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/watchfire-io/watchfire/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Built with */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Built with</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  Next.js
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  Vercel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Watchfire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
