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
