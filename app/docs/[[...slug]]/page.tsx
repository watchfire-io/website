import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { Callout } from "fumadocs-ui/components/callout";
import DownloadButton from "@/components/DownloadButton";
import EditOnGithub from "@/components/EditOnGithub";
import Mermaid from "@/components/Mermaid";
import ChangelogJsonLd from "@/components/ChangelogJsonLd";
import { sectionLabel } from "@/lib/docs-section";
import { siteUrl } from "@/lib/site";
import { buildOgUrl, buildAbsoluteOgUrl } from "@/lib/og-url";
import { getPageDates } from "@/lib/page-dates";
import type {
  BreadcrumbList,
  BreadcrumbListItem,
  TechArticle,
  HowTo,
  HowToFrontmatter,
} from "@/lib/jsonld-types";

const WATCHFIRE_ORG = {
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

function buildBreadcrumbs(
  slug: string[],
  pageTitle: string,
  pageUrl: string,
): BreadcrumbList {
  const items: BreadcrumbListItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Docs",
      item: `${siteUrl}/docs`,
    },
  ];

  if (slug.length === 0) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    };
  }

  if (slug.length >= 2) {
    const sectionSlug = slug[0];
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: sectionLabel([sectionSlug]),
      item: `${siteUrl}/docs/${sectionSlug}`,
    });
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: pageTitle,
    item: pageUrl,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function buildHowTo(howto: HowToFrontmatter): HowTo {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howto.name,
    ...(howto.totalTime ? { totalTime: howto.totalTime } : {}),
    step: howto.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const filePath = `content/docs/${page.path}`;
  const slug = params.slug ?? [];
  const slugPath = slug.join("/");
  const pageUrl =
    slug.length === 0 ? `${siteUrl}/docs` : `${siteUrl}/docs/${slugPath}`;

  const breadcrumbsLd = buildBreadcrumbs(slug, page.data.title, pageUrl);

  const { published, modified } = getPageDates(page.path);
  const techArticleLd: TechArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.data.title,
    ...(page.data.description
      ? { description: page.data.description }
      : {}),
    url: pageUrl,
    image: buildAbsoluteOgUrl(page, slug),
    datePublished: published,
    dateModified: modified,
    author: WATCHFIRE_ORG,
    publisher: WATCHFIRE_PUBLISHER,
    inLanguage: "en",
  };

  const howto = (page.data as { howto?: HowToFrontmatter }).howto;
  const howToLd = howto ? buildHowTo(howto) : null;

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{ style: "clerk" }}
      breadcrumb={{ enabled: true }}
      footer={{ enabled: true }}
    >
      <span id="main-content" tabIndex={-1} className="sr-only">
        Main content
      </span>
      <script
        id="ld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        id="ld-tech-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleLd) }}
      />
      {howToLd && (
        <script
          id="ld-howto"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      )}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={{ Callout, DownloadButton, Mermaid, ChangelogJsonLd }}
        />
      </DocsBody>
      <EditOnGithub
        filePath={filePath}
        title={page.data.title}
        slug={slugPath}
      />
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const slug = params.slug ?? [];
  const ogImageUrl = buildOgUrl(page, slug);
  const canonical = `${siteUrl}${page.url}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      url: canonical,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${page.data.title} — Watchfire documentation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [ogImageUrl],
    },
  };
}
