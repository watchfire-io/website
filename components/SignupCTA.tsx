import { Suspense } from "react";
import GitHubStars from "./GitHubStars";
import SignupForm from "./SignupCTA.client";
import { socialLinks } from "@/lib/site";

const githubStarsFallback = (
  <a
    href="https://github.com/watchfire-io/watchfire"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300"
  >
    Star on GitHub
  </a>
);

export default function SignupCTA() {
  const endpoint = process.env.NEXT_PUBLIC_BUTTONDOWN_ENDPOINT ?? "";

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
      <div
        className="glow-blob glow-blob-fire pointer-events-none -left-16 top-1/4 h-[320px] w-[320px]"
        aria-hidden="true"
      />
      <div
        className="glow-blob glow-blob-ember pointer-events-none -right-10 bottom-0 h-[280px] w-[280px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Left column — email signup */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Get updates
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Releases, deep dives, and the occasional behind-the-scenes note. No spam.
            </p>
            <div className="mt-6">
              <SignupForm endpoint={endpoint} />
            </div>
          </div>

          {/* Right column — GitHub star */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Star us on GitHub
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Help us reach more developers.
            </p>
            <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-fire-500/15 bg-fire-500/[0.04] px-6 py-8 shadow-[0_0_40px_rgba(224,112,64,0.12)] dark:border-fire-400/20 dark:bg-fire-400/[0.05] dark:shadow-[0_0_50px_rgba(224,112,64,0.18)] md:items-start">
              <Suspense fallback={githubStarsFallback}>
                <GitHubStars />
              </Suspense>
              <div className="flex items-center gap-4">
                <a
                  href={socialLinks.bluesky}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watchfire on Bluesky"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/70 text-zinc-600 transition-colors hover:border-fire-500/50 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-fire-300"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 11C9.5 6.5 5.5 3.5 4 5.5C2.8 7.5 3.5 10.5 5 12.5C3.2 13.2 3 16 5 17C7 18 10 15 12 13C14 15 17 18 19 17C21 16 20.8 13.2 19 12.5C20.5 10.5 21.2 7.5 20 5.5C18.5 3.5 14.5 6.5 12 11Z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watchfire on X"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/70 text-zinc-600 transition-colors hover:border-fire-500/50 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-fire-300"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4L20 20" />
                    <path d="M20 4L4 20" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
