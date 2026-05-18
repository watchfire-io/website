import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostCard from "@/components/BlogPostCard";
import {
  findTagBySlug,
  getAllTags,
  getPostsByTagSlug,
} from "@/lib/blog-tags";
import { siteUrl } from "@/lib/site";
import { buildAbsoluteBlogOgUrl } from "@/lib/og-url";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { tag: slug } = await props.params;
  const name = findTagBySlug(slug);
  if (!name) notFound();

  const title = `Tag: ${name}`;
  const description = `Watchfire blog posts tagged "${name}".`;
  const url = `${siteUrl}/blog/tags/${slug}`;
  const ogImage = buildAbsoluteBlogOgUrl({
    title,
    description,
    section: "Blog · Tag",
  });

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${title} | Watchfire Blog`,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Watchfire Blog`,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogTagPage(props: PageProps) {
  const { tag: slug } = await props.params;
  const name = findTagBySlug(slug);
  if (!name) notFound();

  const posts = getPostsByTagSlug(slug);
  if (posts.length === 0) notFound();

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400"
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
          <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
            ·
          </span>
          <Link
            href="/blog/tags"
            className="text-zinc-500 transition-colors hover:text-fire-600 dark:text-zinc-400 dark:hover:text-fire-400"
          >
            All tags
          </Link>
        </div>

        <div className="mt-6 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
            Blog · Tag
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Tag: {name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {posts.length} {posts.length === 1 ? "post" : "posts"} tagged
            {" “"}
            {name}
            {"”"}.
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
