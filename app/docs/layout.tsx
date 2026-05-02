import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import FlameLogo from "@/components/FlameLogo";

export const metadata: Metadata = {
  title: {
    template: "%s | Watchfire Docs",
    default: "Watchfire Docs",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="inline-flex items-center gap-2">
            <FlameLogo size={22} />
            <span className="font-semibold">Watchfire</span>
          </span>
        ),
        url: "/",
      }}
      sidebar={{
        defaultOpenLevel: 1,
        collapsible: true,
      }}
    >
      {children}
    </DocsLayout>
  );
}
