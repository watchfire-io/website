import { getChangelogEntries } from "@/lib/changelog";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  const entries = getChangelogEntries();
  const feedUrl = `${siteUrl}/feed.json`;
  const channelLink = `${siteUrl}/docs/changelog`;

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: `${siteName} — Changelog`,
    home_page_url: channelLink,
    feed_url: feedUrl,
    description: siteDescription,
    language: "en-US",
    authors: [
      {
        name: siteName,
        url: siteUrl,
      },
    ],
    items: entries.map((e) => ({
      id: e.url,
      url: e.url,
      title: e.title,
      content_html: e.html,
      content_text: e.markdown,
      date_published: e.date.toISOString(),
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  });
}
