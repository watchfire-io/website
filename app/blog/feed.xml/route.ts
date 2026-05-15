import { listPublishedBlogPosts } from "@/lib/blog-source";
import { siteName, siteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(d: Date): string {
  return d.toUTCString();
}

export function GET() {
  const posts = listPublishedBlogPosts();
  const feedUrl = `${siteUrl}/blog/feed.xml`;
  const channelTitle = `${siteName} – Blog`;
  const channelLink = `${siteUrl}/blog`;
  const channelDescription =
    "Notes, releases, and deep dives from the team building Watchfire.";
  const lastBuild =
    posts.length > 0 ? new Date(posts[0].data.date) : new Date();

  const items = posts
    .map((post) => {
      const slug = post.slugs[0];
      const itemUrl = `${siteUrl}/blog/${slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.data.title)}</title>`,
        `      <link>${escapeXml(itemUrl)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(itemUrl)}</guid>`,
        `      <pubDate>${rfc822(new Date(post.data.date))}</pubDate>`,
        `      <description><![CDATA[${post.data.summary}]]></description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
