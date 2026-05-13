import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { siteUrl } from "@/lib/site";
import {
  docPageLastModified,
  fileLastModified,
  maxLastModified,
} from "@/lib/sitemap-dates";
import { getChangelogEntries } from "@/lib/changelog";

function feedLastModified(): Date {
  const entries = getChangelogEntries();
  if (entries.length === 0) return new Date();
  return entries.reduce(
    (acc, e) => (e.date.getTime() > acc.getTime() ? e.date : acc),
    new Date(0),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: docPageLastModified(page.path),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const homeLastMod = maxLastModified([
    "app/page.tsx",
    "app/layout.tsx",
    "lib/site.ts",
    "components/AgentBackends.tsx",
    "components/AgentModes.tsx",
    "components/AnimatedTerminal.tsx",
    "components/AnimatedTerminalInternal.tsx",
    "components/ChangelogJsonLd.tsx",
    "components/CommonWorkflows.tsx",
    "components/ComponentsOverview.tsx",
    "components/DownloadButton.tsx",
    "components/DownloadButtonClient.tsx",
    "components/DownloadInstall.tsx",
    "components/EditOnGithub.tsx",
    "components/FAQ.tsx",
    "components/FAQJsonLd.tsx",
    "components/FinalCTA.tsx",
    "components/FinalCTAServer.tsx",
    "components/FlameLogo.tsx",
    "components/FleetOps.tsx",
    "components/Footer.tsx",
    "components/GitHubStars.tsx",
    "components/GitHubStarsClient.tsx",
    "components/GuiLayoutSvg.tsx",
    "components/Header.tsx",
    "components/HowItWorks.tsx",
    "components/HowItWorksInternal.tsx",
    "components/KeyFeatures.tsx",
    "components/Mermaid.tsx",
    "components/MermaidInternal.tsx",
    "components/PlatformInstall.tsx",
    "components/ProductShowcase.tsx",
    "components/RawVsWatchfire.tsx",
    "components/ScrollReveal.tsx",
    "components/ThemeToggle.tsx",
  ]);

  const brandLastMod = fileLastModified("app/brand/page.tsx");
  const privacyLastMod = fileLastModified("app/privacy/page.tsx");
  const feedLastMod = feedLastModified();

  return [
    {
      url: siteUrl,
      lastModified: homeLastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/brand`,
      lastModified: brandLastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: privacyLastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/feed.xml`,
      lastModified: feedLastMod,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/atom.xml`,
      lastModified: feedLastMod,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/feed.json`,
      lastModified: feedLastMod,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: feedLastMod,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified: feedLastMod,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    ...docPages,
  ];
}
