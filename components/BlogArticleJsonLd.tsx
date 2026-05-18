import type { BlogPage } from "@/lib/blog-source";
import type { Article } from "@/lib/jsonld-types";
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
}: {
  post: BlogPage;
  image?: string;
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
    (post.data.image
      ? resolveAbsoluteImageUrl(post.data.image)
      : buildAbsoluteBlogOgUrl({
          title: post.data.title,
          description: post.data.summary,
          section: "Blog",
        }));

  const article: Article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.summary,
    datePublished,
    dateModified,
    author: WATCHFIRE_AUTHOR,
    publisher: WATCHFIRE_PUBLISHER,
    image: resolvedImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalId,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}
