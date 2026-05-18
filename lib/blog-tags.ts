import { listPublishedBlogPosts, type BlogPage } from "@/lib/blog-source";

// Slug rule: lowercase, replace non-alphanum with "-", collapse repeats,
// strip leading/trailing dashes. If two distinct logical tags collapse to
// the same slug (e.g. "C++" and "C"), they will share one archive bucket;
// we accept that ambiguity rather than adding disambiguation logic.
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TagSummary {
  tag: string;
  slug: string;
  count: number;
}

interface TagBucket {
  slug: string;
  posts: BlogPage[];
  displayName: string;
}

function buildBuckets(): Map<string, TagBucket> {
  const posts = listPublishedBlogPosts();
  const buckets = new Map<string, TagBucket>();

  for (const post of posts) {
    const tags = post.data.tags ?? [];
    for (const tag of tags) {
      const slug = slugifyTag(tag);
      if (!slug) continue;
      const existing = buckets.get(slug);
      if (existing) {
        existing.posts.push(post);
      } else {
        buckets.set(slug, { slug, posts: [post], displayName: tag });
      }
    }
  }

  // `listPublishedBlogPosts()` is sorted newest first, so the FIRST occurrence
  // of a slug in iteration order is the casing used by the most recent post.
  // No further work needed for displayName.
  return buckets;
}

export function getAllTags(): TagSummary[] {
  const buckets = buildBuckets();
  return Array.from(buckets.values())
    .map((b) => ({ tag: b.displayName, slug: b.slug, count: b.posts.length }))
    .sort((a, b) =>
      b.count - a.count || a.tag.localeCompare(b.tag, "en", { sensitivity: "base" }),
    );
}

export function getPostsByTagSlug(slug: string): BlogPage[] {
  const bucket = buildBuckets().get(slug);
  return bucket ? bucket.posts : [];
}

export function findTagBySlug(slug: string): string | null {
  const bucket = buildBuckets().get(slug);
  return bucket ? bucket.displayName : null;
}
