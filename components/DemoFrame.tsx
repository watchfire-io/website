type Props = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export default function DemoFrame({ label, children, className }: Props) {
  const outerClass = [
    "relative mx-auto w-full max-w-2xl",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={outerClass}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(224,112,64,0.30), transparent 70%)",
        }}
      />
      <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-300/70 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-700/70 dark:bg-[#16181d] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-2 border-b border-zinc-300/70 px-4 py-2.5 dark:border-zinc-700/70">
          <span
            className="h-3 w-3 rounded-full bg-[#ff5f57]"
            aria-hidden="true"
          />
          <span
            className="h-3 w-3 rounded-full bg-[#febc2e]"
            aria-hidden="true"
          />
          <span
            className="h-3 w-3 rounded-full bg-[#28c840]"
            aria-hidden="true"
          />
          <span className="ml-3 truncate font-mono text-[11px] text-zinc-500">
            {label}
          </span>
        </div>
        <div className="relative aspect-[16/10]">{children}</div>
      </div>
    </div>
  );
}
