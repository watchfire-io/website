import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Callout } from "fumadocs-ui/components/callout";
import Mermaid from "@/components/Mermaid";
import BlogArticleJsonLd from "@/components/BlogArticleJsonLd";
import BlogPostArt from "@/components/BlogPostArt";
import BlogPostToc from "@/components/BlogPostToc";
import EditOnGithub from "@/components/EditOnGithub";
import RelatedPosts from "@/components/RelatedPosts";
import {
  getBlogPage,
  getBlogPostBodyMarkdown,
  listPublishedBlogPosts,
} from "@/lib/blog-source";
import { isExternalUrl, normalizeBlogAuthor } from "@/lib/blog-author";
import { slugifyTag } from "@/lib/blog-tags";
import { extractBlogToc } from "@/lib/blog-toc";
import { estimateReadingTimeMinutes } from "@/lib/reading-time";
import { siteName, siteUrl } from "@/lib/site";
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
  const ogImage = page.data.ogImage
    ? resolveAbsoluteImageUrl(page.data.ogImage)
    : buildAbsoluteBlogOgUrl({
        title: page.data.title,
        description: page.data.summary,
        section: "Blog",
        art: slug,
        tags: page.data.tags,
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
      siteName: siteName,
      title: page.data.title,
      description: page.data.summary,
      url,
      // Explicit dimensions + alt: X, LinkedIn and Slack all render the card
      // more reliably when they don't have to fetch the image to size it.
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.data.title,
          type: "image/png",
        },
      ],
      publishedTime: page.data.date,
      tags: page.data.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.summary,
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.data.title }],
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
  const author = normalizeBlogAuthor(page.data.author);
  const readingMinutes = estimateReadingTimeMinutes(
    getBlogPostBodyMarkdown(slug),
  );
  const tocItems = extractBlogToc(slug);
  const hasToc = tocItems.length >= 2;
  const ogImage = page.data.ogImage
    ? resolveAbsoluteImageUrl(page.data.ogImage)
    : buildAbsoluteBlogOgUrl({
        title: page.data.title,
        description: page.data.summary,
        section: "Blog",
        art: slug,
        tags: page.data.tags,
      });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:max-w-6xl">
      <div className="lg:grid lg:grid-cols-[minmax(0,48rem)_minmax(0,14rem)] lg:items-start lg:gap-x-12">
        <div className="mx-auto min-w-0 max-w-3xl lg:mx-0">
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

        <BlogArticleJsonLd
          post={page}
          image={ogImage}
          readingMinutes={readingMinutes}
        />

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          {author ? (
            <>
              <span>
                <span className="text-zinc-500 dark:text-zinc-400">By </span>
                {author.url ? (
                  <Link
                    href={author.url}
                    {...(isExternalUrl(author.url)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="font-medium text-zinc-700 transition-colors hover:text-fire-600 dark:text-zinc-200 dark:hover:text-fire-400"
                  >
                    {author.name}
                  </Link>
                ) : (
                  <span className="font-medium text-zinc-700 dark:text-zinc-200">
                    {author.name}
                  </span>
                )}
                {author.title ? (
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {" · "}
                    {author.title}
                  </span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className="text-zinc-400 dark:text-zinc-600"
              >
                ·
              </span>
            </>
          ) : null}
          <time dateTime={page.data.date}>{formattedDate}</time>
          <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
            ·
          </span>
          <span>{readingMinutes} min read</span>
          {tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${slugifyTag(tag)}`}
                  className="rounded-full bg-fire-500/10 px-2 py-0.5 text-xs font-medium text-fire-500 transition-colors hover:bg-fire-500/20 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:text-fire-400 dark:hover:text-fire-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {page.data.image ? (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <Image
              src={page.data.image}
              alt={page.data.title}
              fill
              priority
              sizes="(min-width: 1024px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <BlogPostArt
            slug={slug}
            tags={page.data.tags}
            priority
            className="mt-8 aspect-[16/9] rounded-xl border border-zinc-200 dark:border-zinc-800"
          />
        )}
      </header>

      {hasToc ? (
        <details className="group mb-8 rounded-lg border border-zinc-200 bg-white/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 lg:hidden">
          <summary className="flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>On this page</span>
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
              className="motion-safe:transition-transform group-open:rotate-180"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="mt-4">
            <BlogPostToc items={tocItems} />
          </div>
        </details>
      ) : null}

      <div className="blog-prose space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <MDX components={{ Callout, Mermaid }} />
      </div>

      <EditOnGithub
        filePath={`content/blog/${slug}.mdx`}
        title={page.data.title}
        slug={slug}
        section="blog"
      />

      <RelatedPosts currentSlug={slug} />

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
        </div>
        {hasToc ? (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                On this page
              </p>
              <BlogPostToc items={tocItems} />
            </div>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
