import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Code2,
  Cpu,
  ExternalLink,
  FileText,
  Gem,
  Github,
  Headphones,
  Layers,
  Lightbulb,
  MessagesSquare,
  Mic,
  MousePointer2,
  Newspaper,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import BlogPostCard from "@/components/BlogPostCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { agentBackends, type AgentBackendIcon } from "@/lib/agent-backends";
import { listPublishedBlogPosts } from "@/lib/blog-source";
import { buildBlogOgUrl } from "@/lib/og-url";
import { siteUrl, socialLinks } from "@/lib/site";
import type { BreadcrumbList } from "@/lib/jsonld-types";

const description =
  "What we read so you don't have to — a curated reading list on AI coding agents, agent CLIs, the OSS projects Watchfire stands on, and the talks worth your time.";

const ogImage = buildBlogOgUrl({
  title: "Resources",
  description,
  section: "Resources",
});

export const metadata: Metadata = {
  title: "Resources — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/resources`,
  },
  openGraph: {
    type: "website",
    title: "Resources — Watchfire",
    description,
    url: `${siteUrl}/resources`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources — Watchfire",
    description,
    images: [ogImage],
  },
};

const breadcrumbsLd: BreadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Resources",
      item: `${siteUrl}/resources`,
    },
  ],
};

type Entry = {
  title: string;
  hook: string;
  href: string;
  publication: string;
  year: string;
};

const foundationalReading: Entry[] = [
  {
    title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
    hook: "The benchmark every serious agent is measured against — read it once and the leaderboards stop being mysterious.",
    href: "https://arxiv.org/abs/2310.06770",
    publication: "Jimenez et al. · arXiv",
    year: "2023",
  },
  {
    title: "Building effective agents",
    hook: "Anthropic's plain-language taxonomy of agent patterns — the post most other agent posts are quietly remixing.",
    href: "https://www.anthropic.com/engineering/building-effective-agents",
    publication: "Anthropic Engineering",
    year: "2024",
  },
  {
    title: "Claude Code best practices",
    hook: "Concrete guidance from the team that ships Claude Code — most of it generalises cleanly to any agent CLI.",
    href: "https://www.anthropic.com/engineering/claude-code-best-practices",
    publication: "Anthropic Engineering",
    year: "2025",
  },
  {
    title: "SWE-agent: agent-computer interfaces enable software engineering",
    hook: "Princeton's paper on how the shape of the agent's tool surface — not just the model — drives task success.",
    href: "https://arxiv.org/abs/2405.15793",
    publication: "Yang et al. · arXiv",
    year: "2024",
  },
  {
    title: "Aider LLM leaderboards",
    hook: "Practical, code-edit-focused benchmarks updated as new models ship — closer to the work most operators actually do.",
    href: "https://aider.chat/docs/leaderboards/",
    publication: "Aider",
    year: "ongoing",
  },
  {
    title: "Exploring Gen AI",
    hook: "Martin Fowler and friends, writing slowly and carefully about agents in real engineering teams — a counterweight to the hype feeds.",
    href: "https://martinfowler.com/articles/exploring-gen-ai.html",
    publication: "martinfowler.com",
    year: "ongoing",
  },
  {
    title: "Introducing the Model Context Protocol",
    hook: "The announcement that turned tool-use from per-vendor bespoke wiring into something you can actually compose. Worth re-reading after each major release.",
    href: "https://www.anthropic.com/news/model-context-protocol",
    publication: "Anthropic",
    year: "2024",
  },
  {
    title: "LLMs in 2024",
    hook: "Simon Willison's year-end stocktake — the single best 10,000-foot view of where coding agents actually landed last year.",
    href: "https://simonwillison.net/2024/Dec/31/llms-in-2024/",
    publication: "Simon Willison",
    year: "2024",
  },
  {
    title: "Aider — benchmarking SWE-bench Lite",
    hook: "The post that made it obvious how much of \"agent skill\" is actually editor mechanics — pairs well with the SWE-agent paper.",
    href: "https://aider.chat/2024/05/22/swe-bench-lite.html",
    publication: "Aider",
    year: "2024",
  },
];

const backendIconMap: Record<AgentBackendIcon, LucideIcon> = {
  Sparkles,
  Cpu,
  Code2,
  Gem,
  Github,
  MousePointer2,
};

type OssProject = {
  category: string;
  title: string;
  hook: string;
  href: string;
};

const ossProjects: OssProject[] = [
  {
    category: "Sandboxing",
    title: "Bubblewrap",
    hook: "The unprivileged Linux sandbox Watchfire uses to fence each agent run on Linux — a single static binary doing a lot of namespace work.",
    href: "https://github.com/containers/bubblewrap",
  },
  {
    category: "Sandboxing",
    title: "Landlock",
    hook: "Linux's unprivileged access-control LSM — the building block that makes per-process filesystem policies possible without root.",
    href: "https://landlock.io",
  },
  {
    category: "Sandboxing",
    title: "Apple App Sandbox design guide",
    hook: "Apple's reference for the `sandbox-exec` policy language Watchfire targets on macOS — the canonical source for what the seatbelt actually does.",
    href: "https://developer.apple.com/library/archive/documentation/Security/Conceptual/AppSandboxDesignGuide/AboutAppSandbox/AboutAppSandbox.html",
  },
  {
    category: "Dev containers",
    title: "Dev Containers specification",
    hook: "The open spec for repo-pinned development environments — the closest thing the wider industry has to Watchfire-style per-project setup.",
    href: "https://containers.dev/",
  },
  {
    category: "Dev containers",
    title: "devcontainers/spec",
    hook: "The source repo for the Dev Containers spec — read the issues to see how the rest of the ecosystem reasons about reproducible agent environments.",
    href: "https://github.com/devcontainers/spec",
  },
  {
    category: "Protocols",
    title: "Model Context Protocol",
    hook: "The protocol Watchfire's secrets and integrations story will lean on more and more — agent-to-tool wiring you only have to learn once.",
    href: "https://modelcontextprotocol.io/",
  },
  {
    category: "Protocols",
    title: "gRPC",
    hook: "The transport between `watchfired` and every Watchfire client. The official docs are still the fastest way to understand what we're getting from it.",
    href: "https://grpc.io/",
  },
  {
    category: "TUI building blocks",
    title: "Bubble Tea",
    hook: "The Elm-inspired TUI framework the Watchfire CLI/TUI is built on — read the README before you read our terminal code.",
    href: "https://github.com/charmbracelet/bubbletea",
  },
  {
    category: "TUI building blocks",
    title: "Lipgloss",
    hook: "The styling layer that makes Bubble Tea apps look like Bubble Tea apps — including ours.",
    href: "https://github.com/charmbracelet/lipgloss",
  },
  {
    category: "Adjacent agents",
    title: "OpenHands",
    hook: "An open-source SWE-bench-grade autonomous coding agent — useful to skim if you want to see a very different shape from the Watchfire model.",
    href: "https://github.com/All-Hands-AI/OpenHands",
  },
  {
    category: "Adjacent agents",
    title: "SWE-agent",
    hook: "The Princeton-NLP agent that gave the SWE-bench paper its teeth — small surface, very readable code.",
    href: "https://github.com/SWE-agent/SWE-agent",
  },
];

const talks: Entry[] = [
  {
    title: "Sholto Douglas & Trenton Bricken on the Dwarkesh Podcast",
    hook: "Two researchers from Anthropic on where models are actually getting better — useful context for why coding agents kept improving through 2024–25.",
    href: "https://www.dwarkesh.com/p/sholto-trenton-2",
    publication: "Dwarkesh Podcast",
    year: "2024",
  },
  {
    title: "Latent Space — the AI engineer podcast",
    hook: "The interview feed that has, for several years, talked to almost everyone shipping coding agents — start with whichever episode covers a backend you use.",
    href: "https://www.latent.space/",
    publication: "Latent Space",
    year: "ongoing",
  },
  {
    title: "The Pragmatic Engineer on AI coding tools",
    hook: "Gergely Orosz's survey of how engineering teams are actually adopting agents — practical, evidence-led, low on hype.",
    href: "https://newsletter.pragmaticengineer.com/p/ai-coding-tools",
    publication: "Pragmatic Engineer",
    year: "2024",
  },
];

const relevantBlogSlugs = [
  "2026-05-22-what-it-costs-to-run-watchfire",
  "2026-05-21-which-mode-when",
  "2026-05-19-how-watchfire-sandboxes-every-agent",
  "2026-05-19-eating-our-own-dogfood",
  "2026-05-18-isolated-worktrees-per-task",
  "2026-05-19-anatomy-of-a-great-task",
] as const;

const allEntries: { name: string; url: string; description: string }[] = [
  ...foundationalReading.map((e) => ({
    name: e.title,
    url: e.href,
    description: e.hook,
  })),
  ...agentBackends.map((agent) => ({
    name: agent.name,
    url: agent.homepage,
    description: agent.tagline,
  })),
  ...ossProjects.map((e) => ({
    name: e.title,
    url: e.href,
    description: e.hook,
  })),
  ...talks.map((e) => ({
    name: e.title,
    url: e.href,
    description: e.hook,
  })),
];

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Watchfire Resources",
  description,
  url: `${siteUrl}/resources`,
  isPartOf: {
    "@type": "WebSite",
    name: "Watchfire",
    url: siteUrl,
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Curated resources for AI agent orchestration",
    numberOfItems: allEntries.length,
    itemListElement: allEntries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      description: entry.description,
      url: entry.url,
    })),
  },
};

const ossCategories = Array.from(
  new Set(ossProjects.map((project) => project.category)),
);

function ExternalArrow() {
  return (
    <ExternalLink
      className="h-3.5 w-3.5"
      strokeWidth={2}
      aria-hidden="true"
    />
  );
}

function EntryCard({
  entry,
  icon,
}: {
  entry: Entry;
  icon: LucideIcon;
}) {
  const Icon = icon;
  return (
    <article className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
            {entry.publication} &middot; {entry.year}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-[1.1rem]">
            {entry.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
        {entry.hook}
      </p>
      <p className="mt-5 text-sm">
        <a
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${entry.title} (opens in new tab)`}
          className="inline-flex items-center gap-1.5 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Read
          <ExternalArrow />
        </a>
      </p>
    </article>
  );
}

function BackendCard({
  backend,
}: {
  backend: (typeof agentBackends)[number];
}) {
  const Icon = backendIconMap[backend.icon];
  return (
    <article className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-400/10 dark:text-fire-400"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
            {backend.vendor}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white">
            {backend.name}
          </h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {backend.tagline}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <a
          href={backend.homepage}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${backend.name} homepage (opens in new tab)`}
          className="inline-flex items-center gap-1.5 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Homepage
          <ExternalArrow />
        </a>
        <Link
          href={`/agents/${backend.slug}`}
          className="inline-flex items-center gap-1 text-zinc-600 underline-offset-2 hover:text-fire-600 hover:underline dark:text-zinc-400 dark:hover:text-fire-400"
        >
          Watchfire integration &rarr;
        </Link>
      </div>
    </article>
  );
}

function OssCard({ project }: { project: OssProject }) {
  return (
    <article className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
        {project.category}
      </span>
      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {project.hook}
      </p>
      <p className="mt-5 text-sm">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} (opens in new tab)`}
          className="inline-flex items-center gap-1.5 text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          Open project
          <ExternalArrow />
        </a>
      </p>
    </article>
  );
}

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}

function pickReadingIcon(index: number): LucideIcon {
  const icons: LucideIcon[] = [
    BookOpen,
    FileText,
    Newspaper,
    Lightbulb,
    Layers,
    Sparkles,
    Boxes,
    Terminal,
    Code2,
  ];
  return icons[index % icons.length];
}

export default function ResourcesPage() {
  const publishedPosts = listPublishedBlogPosts();
  const featuredPosts = relevantBlogSlugs
    .map((slug) => publishedPosts.find((p) => p.slugs[0] === slug))
    .filter(
      (post): post is NonNullable<typeof post> => post !== undefined,
    );

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-resources-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-resources-collection"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pt-28">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[360px] w-[360px]"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/4 h-[280px] w-[280px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              Resources
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              What we read so you don&rsquo;t have to.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Watchfire doesn&rsquo;t exist in a vacuum &mdash; it sits on top of
              years of research and engineering on coding agents, sandboxes, and
              the protocols that connect them. This is the short, opinionated
              list of papers, posts, projects, and talks that have actually
              shaped how we think. If you&rsquo;re trying to decide whether to
              take agents seriously, start here.
            </p>
          </div>
        </section>

        <Divider />

        {/* Foundational reading */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Foundational reading on AI coding agents.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The papers and posts we point new contributors at &mdash;
                benchmarks, agent design, and a couple of survey-style essays
                that age unusually well.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {foundationalReading.map((entry, index) => (
                <EntryCard
                  key={entry.href}
                  entry={entry}
                  icon={pickReadingIcon(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Backend agent CLIs */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Backend agent CLIs.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The six command-line coding agents Watchfire drives today. Each
                card links to the project&rsquo;s own home plus the Watchfire
                page explaining how it&rsquo;s wired up here.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {agentBackends.map((backend) => (
                <BackendCard key={backend.slug} backend={backend} />
              ))}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              See the full backend comparison on the{" "}
              <Link
                href="/agents"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                agents page
              </Link>
              .
            </p>
          </div>
        </section>

        <Divider />

        {/* Related OSS */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Related open-source projects.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The orchestration, sandboxing, and TUI projects in
                Watchfire&rsquo;s extended family &mdash; some we depend on,
                some we just learn from.
              </p>
            </div>

            <div className="mt-10 space-y-10">
              {ossCategories.map((category) => {
                const inCategory = ossProjects.filter(
                  (p) => p.category === category,
                );
                return (
                  <div key={category}>
                    <h3 className="text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {category}
                    </h3>
                    <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {inCategory.map((project) => (
                        <OssCard key={project.href} project={project} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* Talks & podcasts */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Talks &amp; podcasts.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The audio and video corner is intentionally short &mdash; we only
                list things we&rsquo;ve actually finished. This section is in
                progress; if you have a favourite, tell us in{" "}
                <a
                  href="https://github.com/watchfire-io/watchfire/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  Discussions
                </a>
                .
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {talks.map((talk, index) => (
                <EntryCard
                  key={talk.href}
                  entry={talk}
                  icon={index === 0 ? Mic : index === 1 ? Headphones : Newspaper}
                />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* From the Watchfire blog */}
        {featuredPosts.length > 0 ? (
          <section className="px-6 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  From the Watchfire blog.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  A few of our own posts that pair well with the reading list
                  above &mdash; cost, mode picking, sandbox design, and what we
                  learned dogfooding the thing on itself.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <BlogPostCard key={post.url} post={post} />
                ))}
              </div>

              <p className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                More on the{" "}
                <Link
                  href="/blog"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  blog index
                </Link>
                .
              </p>
            </div>
          </section>
        ) : null}

        <Divider />

        {/* Got a suggestion */}
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Got a suggestion?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
              This page is a living curation, not a definitive list. If a paper,
              post, or talk changed how you think about coding agents, send it
              our way &mdash; we read every one.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://github.com/watchfire-io/watchfire/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="shine group inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_15px_40px_rgba(224,112,64,0.4)] sm:text-base"
              >
                <MessagesSquare
                  className="h-4 w-4"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                Suggest a resource
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white sm:text-base"
              >
                <Github className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Star on GitHub
              </a>
            </div>
            <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
              Or drop a note in{" "}
              <Link
                href="/community"
                className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
              >
                /community
              </Link>{" "}
              if you&rsquo;d rather say hi first.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
