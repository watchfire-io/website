import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: "Watchfire",
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
