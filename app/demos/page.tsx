import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import DemoFrame from "@/components/DemoFrame";
import GuiScreenshotCarousel from "@/components/GuiScreenshotCarousel";
import TuiPreviewSvg from "@/components/TuiPreviewSvg";
import { siteUrl } from "@/lib/site";

const description =
  "See Watchfire in action across three interfaces: the scriptable CLI, the interactive TUI, and the multi-project GUI for AI coding agents.";

export const metadata: Metadata = {
  title: "Demos",
  description,
  alternates: {
    canonical: `${siteUrl}/demos`,
  },
  openGraph: {
    type: "website",
    title: "Demos | Watchfire",
    description,
    url: `${siteUrl}/demos`,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demos | Watchfire",
    description,
    images: ["/og-image.png"],
  },
};

type Demo = {
  id: "cli" | "tui" | "gui";
  heading: string;
  description: string;
  docsHref: string;
  docsLabel: string;
};

const demos: Demo[] = [
  {
    id: "cli",
    heading: "CLI",
    description:
      "Scriptable commands you can run anywhere. Bootstrap a project with watchfire init, define work with watchfire task add, and slot Watchfire into the shell, scripts, or CI you already use.",
    docsHref: "/docs/components/cli",
    docsLabel: "Read the CLI docs",
  },
  {
    id: "tui",
    heading: "TUI",
    description:
      "An interactive Bubbletea interface with a multi-project sidebar and live terminal output from every running agent. The same keystrokes work on macOS, Linux, and a remote SSH session.",
    docsHref: "/docs/components/cli#tui-mode",
    docsLabel: "Read the TUI docs",
  },
  {
    id: "gui",
    heading: "GUI",
    description:
      "An Electron dashboard for juggling many projects at once. Drag and drop to reorder tasks, watch agent transcripts as they stream, and keep an eye on everything from the system tray.",
    docsHref: "/docs/components/gui",
    docsLabel: "Read the GUI docs",
  },
];

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: demos.map((demo, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: demo.heading,
    url: `${siteUrl}/demos#${demo.id}`,
  })),
};

function DemoPreview({ id }: { id: Demo["id"] }) {
  if (id === "cli") {
    return <AnimatedTerminal />;
  }
  if (id === "tui") {
    return (
      <DemoFrame label="watchfire — tui">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <TuiPreviewSvg className="h-full w-full" />
        </div>
      </DemoFrame>
    );
  }
  return (
    <DemoFrame label="Watchfire.app">
      <GuiScreenshotCarousel />
    </DemoFrame>
  );
}

export default function DemosPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-demos-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
                Demos
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                See Watchfire in action
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Three views of the same project, each tuned for a different
                workflow. Pick the surface that fits how you already work.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-16">
              {demos.map((demo) => (
                <article
                  key={demo.id}
                  id={demo.id}
                  className="scroll-mt-24"
                >
                  <div className="mx-auto max-w-[880px]">
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                      {demo.heading}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {demo.description}
                    </p>
                    <div className="mt-6">
                      <DemoPreview id={demo.id} />
                    </div>
                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <Link
                        href={demo.docsHref}
                        className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                      >
                        {demo.docsLabel}
                      </Link>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
