import Link from "next/link";
import BlogPostCard from "@/components/BlogPostCard";
import { listPublishedBlogPosts } from "@/lib/blog-source";

export default function RecentBlogPosts() {
  const posts = listPublishedBlogPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  const gridClass =
    posts.length === 1
      ? "mx-auto mt-12 grid grid-cols-1 gap-6 md:max-w-md"
      : posts.length === 2
        ? "mx-auto mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        : "mx-auto mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              Blog
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Notes, releases, and deep dives from the team building Watchfire.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 self-start text-sm font-medium text-fire-600 transition-colors hover:text-fire-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:text-fire-400 dark:hover:text-fire-300 md:self-auto"
          >
            View all posts
            <svg
              className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              width="14"
              height="14"
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

        <div className={gridClass}>
          {posts.map((post) => (
            <BlogPostCard key={post.url} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
