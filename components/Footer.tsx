import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Watchfire" width={24} height={24} />
            <span className="font-semibold text-zinc-900 dark:text-white">Watchfire</span>
          </div>

          {/* Links */}
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link href="/docs" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                Documentation
              </Link>
            </li>
            <li>
              <a href="https://github.com/watchfire-io/watchfire" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                GitHub
              </a>
            </li>
            <li>
              <Link href="/docs/changelog" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                Changelog
              </Link>
            </li>
            <li>
              <a href="https://x.com/watchfire_dev" target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                𝕏
              </a>
            </li>
            <li>
              <a href="mailto:info@watchfire.io" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Watchfire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
