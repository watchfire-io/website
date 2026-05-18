import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { blog } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
});

export type BlogPage = ReturnType<typeof blogSource.getPages>[number];

export function getBlogPages(): BlogPage[] {
  return blogSource.getPages();
}

export function getBlogPage(slug: string): BlogPage | undefined {
  return blogSource.getPage([slug]);
}

export function listPublishedBlogPosts(): BlogPage[] {
  return getBlogPages()
    .filter((page) => !page.data.draft)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : a.data.date > b.data.date ? -1 : 0));
}

const bodyCache = new Map<string, string>();

export function getBlogPostBodyMarkdown(slug: string): string {
  const cached = bodyCache.get(slug);
  if (cached !== undefined) return cached;

  const filePath = join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  let raw = '';
  try {
    raw = readFileSync(filePath, 'utf8');
  } catch {
    bodyCache.set(slug, '');
    return '';
  }

  // Strip YAML frontmatter block: leading `---` line through next `---` line.
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  bodyCache.set(slug, body);
  return body;
}
