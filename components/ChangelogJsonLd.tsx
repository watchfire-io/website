import { getChangelogEntries } from "@/lib/changelog";
import { siteUrl } from "@/lib/site";
import type { ArticleEntry } from "@/lib/jsonld-types";

const MAX_RELEASES = 12;
const BODY_LIMIT = 300;

function firstParagraph(markdown: string): string {
  const blocks = markdown.split(/\n\s*\n/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) continue;
    return trimmed.replace(/\s+/g, " ");
  }
  return "";
}

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).trimEnd()}…`;
}

export default function ChangelogJsonLd() {
  const entries = getChangelogEntries().slice(0, MAX_RELEASES);
  const author = {
    "@type": "Organization" as const,
    name: "Watchfire",
    url: siteUrl,
  };
  const publisher = {
    "@type": "Organization" as const,
    name: "Watchfire",
    url: siteUrl,
    logo: {
      "@type": "ImageObject" as const,
      url: `${siteUrl}/logo.svg`,
    },
  };

  return (
    <>
      {entries.map((entry) => {
        const body = truncate(firstParagraph(entry.markdown), BODY_LIMIT);
        const article: ArticleEntry = {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": entry.url,
          headline: entry.title,
          url: entry.url,
          datePublished: entry.date.toISOString(),
          author,
          publisher,
          articleBody: body,
          inLanguage: "en",
        };
        return (
          <script
            key={entry.version}
            id={`ld-article-${entry.version}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
          />
        );
      })}
    </>
  );
}
