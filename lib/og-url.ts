import { siteUrl } from "@/lib/site";
import { sectionLabel } from "@/lib/docs-section";

export interface OgUrlPage {
  data: {
    title: string;
    description?: string;
  };
}

export interface OgUrlOptions {
  title: string;
  description?: string;
  section?: string;
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

export function buildBlogOgUrl(options: OgUrlOptions): string {
  const params = new URLSearchParams({ title: options.title });
  if (options.description) params.set("description", options.description);
  if (options.section) params.set("section", options.section);
  return `/api/og?${params.toString()}`;
}

export function buildAbsoluteBlogOgUrl(options: OgUrlOptions): string {
  return `${siteUrl}${buildBlogOgUrl(options)}`;
}

export function resolveAbsoluteImageUrl(image: string): string {
  if (/^https?:\/\//.test(image)) return image;
  return `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;
}
