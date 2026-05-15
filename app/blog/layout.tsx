import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": [
        { url: `${siteUrl}/blog/feed.xml`, title: "Watchfire Blog" },
      ],
    },
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
