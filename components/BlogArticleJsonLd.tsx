import type { BlogPage } from "@/lib/blog-source";
import type { Article, PersonRef } from "@/lib/jsonld-types";
import { normalizeBlogAuthor } from "@/lib/blog-author";
import { fileLastModified } from "@/lib/sitemap-dates";
import { siteUrl } from "@/lib/site";
import {
  buildAbsoluteBlogOgUrl,
  resolveAbsoluteImageUrl,
} from "@/lib/og-url";

const WATCHFIRE_AUTHOR = {
  "@type": "Organization" as const,
  name: "Watchfire",
  url: siteUrl,
};

const WATCHFIRE_PUBLISHER = {
  "@type": "Organization" as const,
  name: "Watchfire",
  url: siteUrl,
  logo: {
    "@type": "ImageObject" as const,
    url: `${siteUrl}/logo.svg`,
  },
};

export default function BlogArticleJsonLd({
  post,
  image,
  readingMinutes,
}: {
  post: BlogPage;
  image?: string;
  readingMinutes?: number;
}) {
  const slug = post.slugs[0];
  const filePath = `content/blog/${slug}.mdx`;
  const modifiedDate = fileLastModified(filePath);
  const datePublished = post.data.date;
  const dateModified =
    modifiedDate.getTime() > 0
      ? modifiedDate.toISOString()
      : new Date(datePublished).toISOString();

  const canonicalId =
    post.data.canonical ?? `${siteUrl}/blog/${slug}`;

  const resolvedImage =
    image ??
    (post.data.ogImage
      ? resolveAbsoluteImageUrl(post.data.ogImage)
      : buildAbsoluteBlogOgUrl({
          title: post.data.title,
          description: post.data.summary,
          section: "Blog",
          art: slug,
          tags: post.data.tags,
        }));

  const author = normalizeBlogAuthor(post.data.author);
  const articleAuthor: PersonRef | typeof WATCHFIRE_AUTHOR = author
    ? {
        "@type": "Person",
        name: author.name,
        ...(author.url ? { url: author.url } : {}),
      }
    : WATCHFIRE_AUTHOR;

  const article: Article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.summary,
    datePublished,
    dateModified,
    author: articleAuthor,
    publisher: WATCHFIRE_PUBLISHER,
    image: resolvedImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalId,
    },
  };

  if (readingMinutes && readingMinutes > 0) {
    article.timeRequired = `PT${readingMinutes}M`;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}
