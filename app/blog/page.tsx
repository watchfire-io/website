import type { Metadata } from "next";
import Link from "next/link";
import BlogPostCard from "@/components/BlogPostCard";
import BlogSubscribe from "@/components/BlogSubscribe";
import { listPublishedBlogPosts } from "@/lib/blog-source";
import { getAllTags } from "@/lib/blog-tags";
import { siteUrl } from "@/lib/site";
import { buildAbsoluteBlogOgUrl } from "@/lib/og-url";

const description =
  "Notes, releases, and deep dives from the team building Watchfire, the remote control for AI coding agents running in sandboxed git worktrees.";

const ogImage = buildAbsoluteBlogOgUrl({
  title: "Watchfire Blog",
  description,
  section: "Blog",
});

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: `${siteUrl}/blog`,
    types: {
      "application/rss+xml": [
        { url: `${siteUrl}/blog/feed.xml`, title: "Watchfire Blog" },
      ],
    },
  },
  openGraph: {
    type: "website",
    title: "Blog | Watchfire",
    description,
    url: `${siteUrl}/blog`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Watchfire",
    description,
    images: [ogImage],
  },
};

export default function BlogIndexPage() {
  const posts = listPublishedBlogPosts();
  const tags = getAllTags();

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            Blog
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Notes from the team
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Notes from the team building Watchfire. Releases, deep dives, the
            occasional behind-the-scenes look at running coding agents in
            sandboxed git worktrees.
          </p>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
            New to the terminology? Skim the{" "}
            <Link
              href="/glossary"
              className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
            >
              Glossary &rarr;
            </Link>
          </p>
        </div>

        {tags.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Tags
            </span>
            {tags.map(({ tag, slug }) => (
              <Link
                key={slug}
                href={`/blog/tags/${slug}`}
                className="rounded-full bg-fire-500/10 px-2.5 py-0.5 text-xs font-medium text-fire-500 transition-colors hover:bg-fire-500/20 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:text-fire-400 dark:hover:text-fire-300"
              >
                {tag}
              </Link>
            ))}
            <Link
              href="/blog/tags"
              className="rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs font-medium text-zinc-600 transition-colors hover:border-fire-500/50 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-fire-300"
            >
              All tags →
            </Link>
          </div>
        ) : null}

        <BlogSubscribe />

        <div className="mx-auto mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.url} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
