import { Suspense } from "react";
import HeroIllustration from "@/components/HeroIllustration";
import InstallSnippet from "@/components/InstallSnippet";
import GitHubStars from "@/components/GitHubStars";
import HowItWorks from "@/components/HowItWorks";
import AgentModes from "@/components/AgentModes";
import KeyFeatures from "@/components/KeyFeatures";
import QuickInstall from "@/components/QuickInstall";

export default function Home() {
  return (
    <>
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-24">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(168,85,247,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Remote control for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              AI coding agents
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Orchestrate Claude Code sessions with task files, git worktree
            isolation, and sandboxed execution.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="/docs"
              className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-500"
            >
              Get Started
            </a>
            <Suspense
              fallback={
                <a
                  href="https://github.com/watchfire-io/watchfire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-5 py-3 font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  GitHub
                </a>
              }
            >
              <GitHubStars />
            </Suspense>
          </div>

          <InstallSnippet />
        </div>

        {/* Illustration */}
        <div className="flex-1">
          <HeroIllustration />
        </div>
      </div>
    </section>

    {/* Section divider */}
    <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

    <HowItWorks />

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

    <AgentModes />

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

    <KeyFeatures />

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

    <QuickInstall />
    </>
  );
}
