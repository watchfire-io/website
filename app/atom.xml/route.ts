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

function iso(d: Date): string {
  return d.toISOString();
}

export function GET() {
  const entries = getChangelogEntries();
  const feedUrl = `${siteUrl}/atom.xml`;
  const channelTitle = `${siteName} — Changelog`;
  const channelLink = `${siteUrl}/docs/changelog`;
  const updated = entries[0]?.date ?? new Date();

  const items = entries
    .map((e) => {
      return [
        "  <entry>",
        `    <title>${escapeXml(e.title)}</title>`,
        `    <link href="${escapeXml(e.url)}" />`,
        `    <id>${escapeXml(e.url)}</id>`,
        `    <updated>${iso(e.date)}</updated>`,
        `    <published>${iso(e.date)}</published>`,
        `    <content type="html"><![CDATA[${e.html}]]></content>`,
        "  </entry>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(channelTitle)}</title>
  <subtitle>${escapeXml(siteDescription)}</subtitle>
  <link href="${escapeXml(channelLink)}" />
  <link href="${escapeXml(feedUrl)}" rel="self" type="application/atom+xml" />
  <id>${escapeXml(feedUrl)}</id>
  <updated>${iso(updated)}</updated>
  <author>
    <name>${escapeXml(siteName)}</name>
    <uri>${escapeXml(siteUrl)}</uri>
  </author>
${items}
</feed>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
