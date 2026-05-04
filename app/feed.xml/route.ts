import { getChangelogEntries } from "@/lib/changelog";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

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
  const entries = getChangelogEntries();
  const feedUrl = `${siteUrl}/feed.xml`;
  const channelTitle = `${siteName} — Changelog`;
  const channelLink = `${siteUrl}/docs/changelog`;
  const lastBuild = entries[0]?.date ?? new Date();

  const items = entries
    .map((e) => {
      return [
        "    <item>",
        `      <title>${escapeXml(e.title)}</title>`,
        `      <link>${escapeXml(e.url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(e.url)}</guid>`,
        `      <pubDate>${rfc822(e.date)}</pubDate>`,
        `      <description><![CDATA[${e.html}]]></description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(siteDescription)}</description>
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
    },
  });
}
