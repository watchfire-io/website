import path from "node:path";
import { source } from "@/lib/source";
import type { Folder, Item, Node, Root } from "fumadocs-core/page-tree";

export interface DocEntry {
  title: string;
  description: string;
  url: string;
  slug: string;
  absolutePath: string;
}

const CONTENT_ROOT = path.resolve(process.cwd(), "content/docs");

function nodeText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function collectItems(node: Node | Root, out: Item[]): void {
  if ("children" in node && Array.isArray(node.children)) {
    if ("type" in node && node.type === "folder") {
      const folder = node as Folder;
      if (folder.index) out.push(folder.index);
    }
    for (const child of node.children) collectItems(child, out);
    return;
  }
  if ("type" in node && node.type === "page") {
    out.push(node as Item);
  }
}

export function getOrderedDocEntries(): DocEntry[] {
  const tree = source.getPageTree() as Root;
  const items: Item[] = [];
  collectItems(tree, items);

  const seen = new Set<string>();
  const entries: DocEntry[] = [];

  for (const item of items) {
    if (seen.has(item.url)) continue;
    seen.add(item.url);

    const page = source.getPageByHref(item.url);
    if (!page) continue;
    const data = page.page.data as { title?: string; description?: string };

    const absolutePath =
      page.page.absolutePath ?? path.join(CONTENT_ROOT, page.page.path);

    const title = data.title ?? nodeText(item.name) ?? item.url;
    const description = data.description ?? "";
    const slug = page.page.slugs.join("/") || "index";

    entries.push({
      title,
      description,
      url: item.url,
      slug,
      absolutePath,
    });
  }

  return entries;
}
