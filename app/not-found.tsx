import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <Flame className="mb-6 h-16 w-16 text-[#e07040]" strokeWidth={1.5} />
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-fd-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-[#e07040] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c85e30]"
        >
          Back to Home
        </Link>
        <Link
          href="/docs"
          className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
}
