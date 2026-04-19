import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-200 dark:border-zinc-800">
      {/* Thin fire accent at very top of footer */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fire-500/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand + tagline */}
          <div className="flex max-w-sm flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Watchfire" width={28} height={28} />
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">Watchfire</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Better context. Better code.
            </p>
          </div>

          {/* Links */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <li>
              <Link href="/docs" className="text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400">
                Documentation
              </Link>
            </li>
            <li>
              <a href="https://github.com/watchfire-io/watchfire" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400">
                GitHub
              </a>
            </li>
            <li>
              <Link href="/docs/changelog" className="text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400">
                Changelog
              </Link>
            </li>
            <li>
              <a href="mailto:info@watchfire.io" className="text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400">
                Contact
              </a>
            </li>
            <li className="flex items-center gap-2 border-l border-zinc-200 pl-4 dark:border-zinc-800">
              <a href="https://bsky.app/profile/watchfire-io.bsky.social" target="_blank" rel="noopener noreferrer" aria-label="Bluesky" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-fire-500/10 hover:text-fire-600 dark:text-zinc-400 dark:hover:bg-fire-400/10 dark:hover:text-fire-400">
                <svg width="16" height="16" viewBox="0 0 600 530" fill="currentColor" aria-hidden="true">
                  <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.822c0-88.687 77.742-60.816 125.72-24.795Z" />
                </svg>
              </a>
              <a href="https://x.com/watchfire_dev" target="_blank" rel="noopener noreferrer" aria-label="X" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-fire-500/10 hover:text-fire-600 dark:text-zinc-400 dark:hover:bg-fire-400/10 dark:hover:text-fire-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://github.com/watchfire-io/watchfire" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-fire-500/10 hover:text-fire-600 dark:text-zinc-400 dark:hover:bg-fire-400/10 dark:hover:text-fire-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Watchfire. All rights reserved.</span>
          <span className="flex items-center gap-1.5 font-mono">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-fire-500 dark:bg-fire-400" />
            Built in the open.
          </span>
        </div>
      </div>
    </footer>
  );
}
