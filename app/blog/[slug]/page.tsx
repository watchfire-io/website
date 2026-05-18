import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Callout } from "fumadocs-ui/components/callout";
import Mermaid from "@/components/Mermaid";
import BlogArticleJsonLd from "@/components/BlogArticleJsonLd";
import {
  getBlogPage,
  listPublishedBlogPosts,
} from "@/lib/blog-source";
import { siteUrl } from "@/lib/site";
import {
  buildAbsoluteBlogOgUrl,
  resolveAbsoluteImageUrl,
} from "@/lib/og-url";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listPublishedBlogPosts().map((post) => ({
    slug: post.slugs[0],
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getBlogPage(slug);
  if (!page || page.data.draft) notFound();

  const url = `${siteUrl}/blog/${slug}`;
  const canonical = page.data.canonical ?? url;
  const ogImage = page.data.image
    ? resolveAbsoluteImageUrl(page.data.image)
    : buildAbsoluteBlogOgUrl({
        title: page.data.title,
        description: page.data.summary,
        section: "Blog",
      });

  return {
    title: page.data.title,
    description: page.data.summary,
    alternates: {
      canonical,
      types: {
        "application/rss+xml": [
          { url: `${siteUrl}/blog/feed.xml`, title: "Watchfire Blog" },
        ],
      },
    },
    openGraph: {
      type: "article",
      title: page.data.title,
      description: page.data.summary,
      url,
      images: [ogImage],
      publishedTime: page.data.date,
      tags: page.data.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.summary,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  const page = getBlogPage(slug);
  if (!page || page.data.draft) notFound();

  const MDX = page.data.body;
  const formattedDate = formatDate(page.data.date);
  const tags = page.data.tags ?? [];
  const ogImage = page.data.image
    ? resolveAbsoluteImageUrl(page.data.image)
    : buildAbsoluteBlogOgUrl({
        title: page.data.title,
        description: page.data.summary,
        section: "Blog",
      });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <header className="mb-10">
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

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          {page.data.title}
        </h1>

        <BlogArticleJsonLd post={page} image={ogImage} />

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          <time dateTime={page.data.date}>{formattedDate}</time>
          {tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-fire-500/10 px-2 py-0.5 text-xs font-medium text-fire-500 dark:text-fire-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="blog-prose space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <MDX components={{ Callout, Mermaid }} />
      </div>

      <footer className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-4 py-2.5 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-fire-400/50 dark:hover:text-white"
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
      </footer>
    </article>
  );
}
