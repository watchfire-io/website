// TODO: Replace placeholder quotes with real testimonials/use-cases
const quotes = [
  {
    quote:
      "Watchfire turned our backlog into a pipeline. We define tasks, hit start, and review PRs — the agent handles everything in between.",
    author: "Alex Chen",
    role: "Staff Engineer",
  },
  {
    quote:
      "Git worktree isolation is a game-changer. Multiple agents working in parallel without stepping on each other's toes.",
    author: "Maria Santos",
    role: "Engineering Lead",
  },
  {
    quote:
      "Wildfire mode is wild. I came back from lunch to find six tasks completed and waiting for review.",
    author: "Jamie Park",
    role: "Solo Founder",
  },
  {
    quote:
      "The sandbox gives us confidence to let agents run autonomously. No more worrying about rogue commands.",
    author: "Sam Okafor",
    role: "Platform Engineer",
  },
];

export default function SocialProof() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Built for developers
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
          Teams use Watchfire to ship faster with AI agents they can actually trust.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((item, i) => (
            <div
              key={i}
              data-stagger
              className="card-hover rounded-xl border border-l-4 border-zinc-200 border-l-fire-500 bg-white/60 p-6 dark:border-zinc-800 dark:border-l-fire-500 dark:bg-zinc-900/60"
            >
              <blockquote className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {item.author}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
