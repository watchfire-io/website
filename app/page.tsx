import { Suspense } from "react";
import Link from "next/link";
import HeroIllustration from "@/components/HeroIllustration";
import DownloadInstall from "@/components/DownloadInstall";
import GitHubStars from "@/components/GitHubStars";
import HowItWorks from "@/components/HowItWorks";
import AgentModes from "@/components/AgentModes";
import AgentBackends from "@/components/AgentBackends";
import ComponentsOverview from "@/components/ComponentsOverview";
import ProductShowcase from "@/components/ProductShowcase";
import KeyFeatures from "@/components/KeyFeatures";
import FinalCTAServer from "@/components/FinalCTAServer";
import ScrollReveal from "@/components/ScrollReveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function Home() {
  return (
    <>
    <Header />
    <main className="pt-16">
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      {/* Ambient glow blobs */}
      <div
        className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[12%] h-[420px] w-[420px]"
        aria-hidden="true"
      />
      <div
        className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/3 h-[340px] w-[340px]"
        aria-hidden="true"
      />

      {/* Soft radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 35%, rgba(224,112,64,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="hero-entrance relative mx-auto flex w-full max-w-7xl flex-col items-center gap-6 sm:gap-10 md:flex-row md:items-center md:gap-12 lg:gap-20">
        {/* Illustration — on mobile: shown above text, on md+: shown to the right */}
        <div className="w-full max-w-xs sm:max-w-sm md:order-2 md:max-w-none md:flex-1">
          <HeroIllustration />
        </div>

        {/* Text content */}
        <div className="min-w-0 flex-1 text-center md:order-1 md:text-left">
          <div className="mb-5 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium text-fire-600 shadow-[0_0_20px_rgba(224,112,64,0.15)] backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300 sm:text-sm">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-fire-500/60 dark:bg-fire-400/60" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-fire-500 dark:bg-fire-400" />
              </span>
              v3.0.0 — Blaze
            </span>
            <Link
              href="/docs/changelog#300-blaze"
              className="group inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-sm transition-colors hover:border-fire-500/50 hover:text-fire-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-fire-300 sm:text-sm"
            >
              Now with GitHub Copilot CLI
              <svg
                className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <h1 className="text-[2rem] font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-[4.25rem]">
            Better context.{" "}
            <span className="relative inline-block bg-gradient-to-r from-fire-400 via-fire-500 to-ember-500 bg-clip-text text-transparent">
              Better code.
            </span>
          </h1>

          <p className="mt-4 text-base font-medium text-zinc-700 dark:text-zinc-300 sm:text-xl md:text-2xl">
            Define what you want. Let Claude Code, Codex, opencode, Gemini CLI, and GitHub Copilot CLI build it — safely.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mt-6 sm:text-base md:mx-0 lg:text-lg">
            Watchfire turns clear specs into scoped tasks, then hands each one to an agent in its own git worktree and sandbox. Better context in, better code out&nbsp;&mdash; with clean transcripts and full control at every step.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4 md:justify-start">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-4 py-2.5 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 hover:shadow-[0_0_20px_rgba(224,112,64,0.15)] dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:px-5 sm:py-3 sm:text-base"
            >
              Documentation
              <svg className="transition-transform group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Suspense
              fallback={
                <a
                  href="https://github.com/watchfire-io/watchfire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300"
                >
                  Star on GitHub
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
      </div>
    </section>

    {/* Section divider */}

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <AgentModes />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <AgentBackends />
    </ScrollReveal>
    
    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal>
      <KeyFeatures />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal>
      <FinalCTAServer />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <HowItWorks />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <ProductShowcase />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <ComponentsOverview />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />

    <ScrollReveal>
      <FinalCTAServer />
    </ScrollReveal>
    </main>
    <Footer />
    </>
  );
}
