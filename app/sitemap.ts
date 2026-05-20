import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { siteUrl } from "@/lib/site";
import {
  docPageLastModified,
  fileLastModified,
  maxLastModified,
} from "@/lib/sitemap-dates";
import { getChangelogEntries } from "@/lib/changelog";
import { listPublishedBlogPosts } from "@/lib/blog-source";
import { getAllTags, getPostsByTagSlug } from "@/lib/blog-tags";
import { agentBackends } from "@/lib/agent-backends";
import { comparisons } from "@/lib/comparisons";

function feedLastModified(): Date {
  const entries = getChangelogEntries();
  if (entries.length === 0) return new Date();
  return entries.reduce(
    (acc, e) => (e.date.getTime() > acc.getTime() ? e.date : acc),
    new Date(0),
  );
}

function blogPostLastModified(slug: string, fallbackIso: string): Date {
  const filePath = `content/blog/${slug}.mdx`;
  const fromGit = fileLastModified(filePath);
  const epoch = new Date(0).getTime();
  if (fromGit.getTime() > epoch) return fromGit;
  return new Date(fallbackIso);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: docPageLastModified(page.path),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPosts = listPublishedBlogPosts();
  const blogPostPages = blogPosts.map((post) => {
    const slug = post.slugs[0];
    return {
      url: `${siteUrl}/blog/${slug}`,
      lastModified: blogPostLastModified(slug, post.data.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  const blogIndexLastMod = maxLastModified([
    ...blogPosts.map((p) => `content/blog/${p.slugs[0]}.mdx`),
    "app/blog/page.tsx",
    "app/blog/layout.tsx",
    "app/blog/[slug]/page.tsx",
    "components/BlogPostCard.tsx",
    "components/BlogArticleJsonLd.tsx",
  ]);

  const tags = getAllTags();
  const tagsIndexLastMod = maxLastModified([
    ...blogPosts.map((p) => `content/blog/${p.slugs[0]}.mdx`),
    "app/blog/tags/page.tsx",
    "app/blog/tags/[tag]/page.tsx",
    "lib/blog-tags.ts",
  ]);

  const tagPages = tags.map(({ slug }) => {
    const posts = getPostsByTagSlug(slug);
    const newest = posts.reduce((acc, post) => {
      const mod = blogPostLastModified(post.slugs[0], post.data.date);
      return mod > acc ? mod : acc;
    }, new Date(0));
    const lastModified =
      newest.getTime() > 0 ? newest : fileLastModified("app/blog/tags/[tag]/page.tsx");
    return {
      url: `${siteUrl}/blog/tags/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };
  });

  const blogFeedLastMod =
    blogPostPages.length > 0
      ? blogPostPages.reduce(
          (acc, p) => (p.lastModified > acc ? p.lastModified : acc),
          new Date(0),
        )
      : new Date();

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
  const demosLastMod = maxLastModified([
    "app/demos/page.tsx",
    "components/LiteYouTube.tsx",
  ]);
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
      url: `${siteUrl}/badge`,
      lastModified: maxLastModified([
        "app/badge/page.tsx",
        "components/CodeCopyButton.tsx",
      ]),
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
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/press`,
      lastModified: maxLastModified([
        "app/press/page.tsx",
        "lib/press-kit.ts",
        "components/CodeCopyButton.tsx",
      ]),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/demos`,
      lastModified: demosLastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/use-cases`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/showcase`,
      lastModified: maxLastModified([
        "app/showcase/page.tsx",
        "lib/showcase.ts",
      ]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/built-with-watchfire`,
      lastModified: maxLastModified([
        "app/built-with-watchfire/page.tsx",
        "lib/dogfood.ts",
      ]),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/templates`,
      lastModified: maxLastModified([
        "app/templates/page.tsx",
        "lib/task-templates.ts",
        "components/CodeCopyButton.tsx",
      ]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/playground`,
      lastModified: maxLastModified([
        "app/playground/page.tsx",
        "components/PlaygroundBuilder.tsx",
      ]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/community`,
      lastModified: fileLastModified("app/community/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/changelog`,
      lastModified: maxLastModified([
        "app/changelog/page.tsx",
        "lib/changelog.ts",
        "content/docs/changelog.mdx",
      ]),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: maxLastModified([
        "app/faq/page.tsx",
        "components/FaqFilter.tsx",
        "components/FaqAnchor.tsx",
        "lib/faq-page-data.tsx",
      ]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/agents`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/integrations`,
      lastModified: maxLastModified([
        "app/integrations/page.tsx",
        "lib/integrations.ts",
        "lib/agent-backends.ts",
      ]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...agentBackends.map((agent) => ({
      url: `${siteUrl}/agents/${agent.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...comparisons.map((c) => ({
      url: `${siteUrl}/compare/${c.slug}`,
      lastModified: maxLastModified([
        "app/compare/[slug]/page.tsx",
        "lib/comparisons.ts",
      ]),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: blogIndexLastMod,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog/tags`,
      lastModified: tagsIndexLastMod,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/blog/feed.xml`,
      lastModified: blogFeedLastMod,
      changeFrequency: "weekly",
      priority: 0.4,
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
    ...blogPostPages,
    ...tagPages,
  ];
}
