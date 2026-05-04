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
import { sectionLabel } from "@/lib/docs-section";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const filePath = `content/docs/${page.path}`;
  const slugPath = (params.slug ?? []).join("/");

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
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={{ Callout, DownloadButton, Mermaid }} />
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
  const ogParams = new URLSearchParams({
    title: page.data.title,
    description: page.data.description ?? "",
    section: sectionLabel(slug),
  });
  if (slug.length > 0) ogParams.set("slug", slug.join("/"));
  const ogImageUrl = `/api/og?${ogParams.toString()}`;

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
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
