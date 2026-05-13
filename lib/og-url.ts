import { siteUrl } from "@/lib/site";
import { sectionLabel } from "@/lib/docs-section";

export interface OgUrlPage {
  data: {
    title: string;
    description?: string;
  };
}

export function buildOgUrl(page: OgUrlPage, slug: string[]): string {
  const params = new URLSearchParams({
    title: page.data.title,
    description: page.data.description ?? "",
    section: sectionLabel(slug),
  });
  if (slug.length > 0) params.set("slug", slug.join("/"));
  return `/api/og?${params.toString()}`;
}

export function buildAbsoluteOgUrl(page: OgUrlPage, slug: string[]): string {
  return `${siteUrl}${buildOgUrl(page, slug)}`;
}
