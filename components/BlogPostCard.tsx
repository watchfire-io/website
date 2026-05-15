import Image from "next/image";
import Link from "next/link";
import type { BlogPage } from "@/lib/blog-source";

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

  return (
    <Link
      href={href}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {post.data.image ? (
          <Image
            src={post.data.image}
            alt={post.data.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(224,112,64,0.55) 0%, rgba(226,144,32,0.45) 50%, rgba(255,245,230,0) 100%), radial-gradient(circle at 30% 40%, rgba(255,245,230,0.35), transparent 60%)",
            }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* TODO(blogsect): tag landing pages /blog/tag/<name> are out of scope for this task; chips are display-only */}
        {tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-fire-500/10 px-2 py-0.5 text-xs font-medium text-fire-500 dark:text-fire-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-fire-600 dark:text-white dark:group-hover:text-fire-400">
          {post.data.title}
        </h3>

        <time
          dateTime={post.data.date}
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {formattedDate}
        </time>

        <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.data.summary}
        </p>
      </div>
    </Link>
  );
}
