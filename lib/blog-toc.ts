import GithubSlugger from 'github-slugger';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import type { Heading, Root } from 'mdast';

import { getBlogPostBodyMarkdown } from './blog-source';

export type BlogTocItem = {
  depth: 2 | 3;
  value: string;
  id: string;
};

const tocCache = new Map<string, BlogTocItem[]>();

function flatten(node: Heading): string {
  let out = '';
  visit(node, (child) => {
    if ('value' in child && typeof child.value === 'string') {
      out += child.value;
    }
  });
  return out;
}

export function extractBlogToc(slug: string): BlogTocItem[] {
  const cached = tocCache.get(slug);
  if (cached) return cached;

  const body = getBlogPostBodyMarkdown(slug);
  if (!body) {
    tocCache.set(slug, []);
    return [];
  }

  const tree = unified().use(remarkParse).parse(body) as Root;
  const slugger = new GithubSlugger();
  const items: BlogTocItem[] = [];

  visit(tree, 'heading', (node) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const value = flatten(node).trim();
    if (!value) return;
    items.push({
      depth: node.depth,
      value,
      id: slugger.slug(value),
    });
  });

  tocCache.set(slug, items);
  return items;
}
