import type { Metadata } from "next";
import BlogPostCard from "@/components/BlogPostCard";
import { listPublishedBlogPosts } from "@/lib/blog-source";
import { siteUrl } from "@/lib/site";

const description =
  "Notes, releases, and deep dives from the team building Watchfire, the remote control for AI coding agents running in sandboxed git worktrees.";

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
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Watchfire",
    description,
    images: ["/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const posts = listPublishedBlogPosts();

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
        </div>

        <div className="mx-auto mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.url} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
