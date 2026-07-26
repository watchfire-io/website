import { faqItems } from "@/lib/faq-data";

export default function FAQ() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Questions,{" "}
            <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
              answered
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The honest version — what Watchfire does, what it doesn&rsquo;t, and
            how it stays out of your way.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              open={item.defaultOpen}
              className="group/faq overflow-hidden rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-sm transition-colors hover:border-fire-500/30 open:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30 dark:open:border-fire-400/40 [&[open]>summary>svg]:rotate-180"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-zinc-900 marker:hidden dark:text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <svg
                  className="mt-1 shrink-0 text-zinc-400 transition-transform duration-200 group-hover/faq:text-fire-500 dark:group-hover/faq:text-fire-400"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
