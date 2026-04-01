import { Suspense } from "react";
import Link from "next/link";
import HeroIllustration from "@/components/HeroIllustration";
import DownloadInstall from "@/components/DownloadInstall";
import GitHubStars from "@/components/GitHubStars";
import HowItWorks from "@/components/HowItWorks";
import AgentModes from "@/components/AgentModes";
import ComponentsOverview from "@/components/ComponentsOverview";
import KeyFeatures from "@/components/KeyFeatures";
import FinalCTAServer from "@/components/FinalCTAServer";
import ScrollReveal from "@/components/ScrollReveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function Home() {
  return (
    <>
    <Header />
    <main>
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(224,112,64,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="hero-entrance relative mx-auto flex w-full max-w-7xl flex-col items-center gap-6 sm:gap-10 md:flex-row md:items-center md:gap-12 lg:gap-20">
        {/* Illustration — on mobile: shown above text, on md+: shown to the right */}
        <div className="w-full max-w-xs sm:max-w-sm md:order-2 md:max-w-none md:flex-1">
          <HeroIllustration />
        </div>

        {/* Text content */}
        <div className="min-w-0 flex-1 overflow-hidden text-center md:order-1 md:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-6xl">
            Better context.{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              Better code.
            </span>
          </h1>

          <p className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:text-lg md:text-2xl">
            Give your coding agents the right context and let them ship.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mt-6 sm:text-sm md:mx-0 lg:text-lg">
            Define your project once. Watchfire feeds agents the right specs, constraints, and codebase context&nbsp;&mdash; so they write better code.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4 md:justify-start">
            <Link
              href="/docs"
              className="rounded-lg border border-zinc-300 bg-white/60 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white sm:px-5 sm:py-3 sm:text-base"
            >
              Documentation
            </Link>
            <Suspense
              fallback={
                <a
                  href="https://github.com/watchfire-io/watchfire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300"
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
    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <HowItWorks />
    </ScrollReveal>

    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-800" />

    <ScrollReveal staggerChildren>
      <ComponentsOverview />
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
      <FinalCTAServer />
    </ScrollReveal>
    </main>
    <Footer />
    </>
  );
}
