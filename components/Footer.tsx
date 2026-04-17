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
              <a href="https://bsky.app/profile/watchfire-io.bsky.social" target="_blank" rel="noopener noreferrer" aria-label="Bluesky" className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                <svg width="16" height="16" viewBox="0 0 600 530" fill="currentColor" aria-hidden="true">
                  <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.822c0-88.687 77.742-60.816 125.72-24.795Z" />
                </svg>
              </a>
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
