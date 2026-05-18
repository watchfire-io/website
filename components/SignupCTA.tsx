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
            <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-fire-500/15 bg-fire-500/[0.04] px-6 py-8 shadow-[0_0_40px_rgba(224,112,64,0.12)] dark:border-fire-400/20 dark:bg-fire-400/[0.05] dark:shadow-[0_0_50px_rgba(224,112,64,0.18)]">
              <Suspense fallback={githubStarsFallback}>
                <GitHubStars />
              </Suspense>
              <div className="flex items-center gap-3">
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
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.335 5.144c2.929 2.199 6.08 6.658 7.236 9.052 1.157-2.394 4.308-6.853 7.237-9.052 2.113-1.587 5.535-2.815 5.535 1.09 0 .779-.447 6.546-.71 7.483-.91 3.255-4.227 4.086-7.18 3.583 5.16.879 6.474 3.787 3.64 6.694-5.382 5.522-7.733-1.386-8.337-3.156-.11-.325-.161-.476-.161-.346 0-.13-.05.021-.16.346-.604 1.77-2.955 8.678-8.337 3.156-2.834-2.907-1.52-5.815 3.64-6.694-2.953.503-6.27-.328-7.18-3.583-.263-.937-.71-6.704-.71-7.483 0-3.905 3.422-2.677 5.535-1.09z" />
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
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
