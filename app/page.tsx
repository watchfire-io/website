import { Suspense } from "react";
import HeroIllustration from "@/components/HeroIllustration";
import DownloadInstall from "@/components/DownloadInstall";
import GitHubStars from "@/components/GitHubStars";
import HowItWorks from "@/components/HowItWorks";
import AgentModes from "@/components/AgentModes";
import KeyFeatures from "@/components/KeyFeatures";
import FinalCTA from "@/components/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Header />
    <main>
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-24">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(224,112,64,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="hero-entrance relative mx-auto flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
            Better context.{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              Better code.
            </span>
          </h1>

          <p className="mt-3 text-xl font-medium text-zinc-700 dark:text-zinc-300 sm:text-2xl">
            Give your coding agents the right context and let them ship.
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Define your project once. Watchfire feeds agents the right specs,
            constraints, and codebase context — so they write better code.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="/docs"
              className="rounded-lg border border-zinc-300 bg-white/60 px-5 py-3 font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
            >
              Documentation
            </a>
            <Suspense
              fallback={
                <a
                  href="https://github.com/watchfire-io/watchfire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/60 px-5 py-3 font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
                >
                  GitHub
                </a>
              }
            >
              <GitHubStars />
            </Suspense>
          </div>

          <Suspense>
            <DownloadInstall />
          </Suspense>
        </div>

        {/* Illustration */}
        <div className="flex-1">
          <HeroIllustration />
        </div>
      </div>
    </section>

    {/* Section divider */}
    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <HowItWorks />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <AgentModes />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-800" />

    <ScrollReveal>
      <KeyFeatures />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-800" />

    <ScrollReveal>
      <FinalCTA />
    </ScrollReveal>
    </main>
    <Footer />
    </>
  );
}
