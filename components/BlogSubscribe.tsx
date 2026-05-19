import { FileJson, Rss } from "lucide-react";
import SignupForm from "./SignupCTA.client";

type FeedPill = {
  href: string;
  label: string;
  type: string;
  icon: typeof Rss;
};

const feeds: FeedPill[] = [
  {
    href: "/blog/feed.xml",
    label: "RSS",
    type: "application/rss+xml",
    icon: Rss,
  },
  {
    href: "/atom.xml",
    label: "Atom",
    type: "application/atom+xml",
    icon: Rss,
  },
  {
    href: "/feed.json",
    label: "JSON Feed",
    type: "application/feed+json",
    icon: FileJson,
  },
];

export default function BlogSubscribe() {
  const endpoint = process.env.NEXT_PUBLIC_BUTTONDOWN_ENDPOINT ?? "";

  return (
    <section
      aria-label="Subscribe to the Watchfire blog"
      className="mt-10 overflow-hidden rounded-2xl border border-fire-500/20 bg-fire-500/[0.04] p-6 shadow-[0_0_40px_rgba(224,112,64,0.12)] dark:border-fire-400/25 dark:bg-fire-400/[0.05] dark:shadow-[0_0_50px_rgba(224,112,64,0.18)] sm:p-8"
    >
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
        {/* Left — email signup */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
            Subscribe by email
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Get every new post in your inbox. Roughly one a fortnight — opt out
            from any email.
          </p>
          <div className="mt-5">
            <SignupForm endpoint={endpoint} />
          </div>
        </div>

        {/* Right — feeds */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
            Subscribe by feed
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Or wire it into your feed reader.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {feeds.map(({ href, label, type, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  rel="alternate"
                  type={type}
                  className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1.5 text-sm font-medium text-fire-600 transition-all hover:border-fire-500/50 hover:bg-fire-500/15 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 motion-reduce:transition-none dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300 dark:hover:border-fire-400/60 dark:hover:bg-fire-400/15"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
