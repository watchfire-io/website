import BlogPostCard from "@/components/BlogPostCard";
import {
  listPublishedBlogPosts,
  type BlogPage,
} from "@/lib/blog-source";
import { slugifyTag } from "@/lib/blog-tags";

const MAX_RELATED = 3;

function normaliseTags(post: BlogPage): Set<string> {
  return new Set((post.data.tags ?? []).map((t) => slugifyTag(t)).filter(Boolean));
}

function gridColsClass(count: number): string {
  if (count >= 3) return "md:grid-cols-2 lg:grid-cols-3";
  if (count === 2) return "md:grid-cols-2";
  return "";
}

export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const all = listPublishedBlogPosts();
  const current = all.find((p) => p.slugs[0] === currentSlug);
  const others = all.filter((p) => p.slugs[0] !== currentSlug);
  if (others.length === 0) return null;

  const currentTags = current ? normaliseTags(current) : new Set<string>();

  const scored = others.map((post) => {
    const tags = normaliseTags(post);
    let overlap = 0;
    for (const t of tags) if (currentTags.has(t)) overlap += 1;
    return { post, overlap };
  });

  const tagMatches = scored
    .filter((s) => s.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return a.post.data.date < b.post.data.date ? 1 : -1;
    })
    .map((s) => s.post);

  const selected: BlogPage[] = tagMatches.slice(0, MAX_RELATED);

  if (selected.length < MAX_RELATED) {
    const taken = new Set(selected.map((p) => p.slugs[0]));
    for (const post of others) {
      if (selected.length >= MAX_RELATED) break;
      if (taken.has(post.slugs[0])) continue;
      selected.push(post);
      taken.add(post.slugs[0]);
    }
  }

  if (selected.length === 0) return null;

  return (
    <section className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        More posts
      </h2>
      <div
        className={`mt-6 grid grid-cols-1 gap-6 ${gridColsClass(selected.length)}`}
      >
        {selected.map((post) => (
          <BlogPostCard key={post.url} post={post} />
        ))}
      </div>
    </section>
  );
}
