import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/blog-tags";
import { siteUrl } from "@/lib/site";
import { buildAbsoluteBlogOgUrl } from "@/lib/og-url";

const title = "Tags";
const description = "Browse Watchfire blog posts by tag.";

const ogImage = buildAbsoluteBlogOgUrl({
  title: "Browse by tag",
  description,
  section: "Blog · Tags",
});

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/blog/tags`,
  },
  openGraph: {
    type: "website",
    title: "Tags | Watchfire Blog",
    description,
    url: `${siteUrl}/blog/tags`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tags | Watchfire Blog",
    description,
    images: [ogImage],
  },
};

export default function BlogTagsIndexPage() {
  const tags = getAllTags();

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400"
        >
          <svg
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <div className="mt-6 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            Blog · Tags
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Browse by tag
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Filter posts by topic.
          </p>
        </div>

        {tags.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map(({ tag, slug, count }) => (
              <Link
                key={slug}
                href={`/blog/tags/${slug}`}
                className="card-hover group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <span className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-fire-600 dark:text-white dark:group-hover:text-fire-400">
                  {tag}
                </span>
                <span className="rounded-full bg-fire-500/10 px-2.5 py-0.5 text-xs font-medium text-fire-500 dark:text-fire-400">
                  {count} {count === 1 ? "post" : "posts"}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-400">
            No tags yet.
          </p>
        )}
      </div>
    </section>
  );
}
