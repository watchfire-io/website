import Image from "next/image";
import Link from "next/link";
import BlogPostArt from "@/components/BlogPostArt";
import { getBlogPostBodyMarkdown, type BlogPage } from "@/lib/blog-source";
import { slugifyTag } from "@/lib/blog-tags";
import { estimateReadingTimeMinutes } from "@/lib/reading-time";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export default function BlogPostCard({ post }: { post: BlogPage }) {
  const slug = post.slugs[0];
  const href = `/blog/${slug}`;
  const tags = (post.data.tags ?? []).slice(0, 2);
  const formattedDate = formatDate(post.data.date);
  const readingMinutes = estimateReadingTimeMinutes(
    getBlogPostBodyMarkdown(slug),
  );
  // No explicit frontmatter image? Fall back to the post's generated artwork
  // rather than the shared Watchfire banner, so every card is distinct.
  const thumbnail = post.data.image;

  return (
    <article className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={post.data.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <BlogPostArt
            slug={slug}
            tags={post.data.tags}
            className="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {tags.length > 0 ? (
          <div className="relative z-10 flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${slugifyTag(tag)}`}
                className="rounded-full bg-fire-500/10 px-2 py-0.5 text-xs font-medium text-fire-500 transition-colors hover:bg-fire-500/20 hover:text-fire-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 dark:text-fire-400 dark:hover:text-fire-300"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}

        <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-fire-600 dark:text-white dark:group-hover:text-fire-400">
          <Link href={href} className="after:absolute after:inset-0 after:z-0 after:content-['']">
            <span className="relative z-10">{post.data.title}</span>
          </Link>
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.data.date}>{formattedDate}</time>
          <span aria-hidden="true"> · </span>
          <span>{readingMinutes} min</span>
        </p>

        <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.data.summary}
        </p>
      </div>
    </article>
  );
}
