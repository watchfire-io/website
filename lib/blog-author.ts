export interface BlogAuthor {
  name: string;
  url?: string;
  title?: string;
}

export function normalizeBlogAuthor(value: unknown): BlogAuthor | null {
  if (value === null || value === undefined) return null;

  if (typeof value === "string") {
    const name = value.trim();
    return name ? { name } : null;
  }

  if (typeof value === "object") {
    const obj = value as { name?: unknown; url?: unknown; title?: unknown };
    if (typeof obj.name !== "string") return null;
    const name = obj.name.trim();
    if (!name) return null;

    const result: BlogAuthor = { name };
    if (typeof obj.url === "string" && obj.url.trim()) {
      result.url = obj.url.trim();
    }
    if (typeof obj.title === "string" && obj.title.trim()) {
      result.title = obj.title.trim();
    }
    return result;
  }

  return null;
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
