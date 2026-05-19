"use client";

import { useEffect, useState } from "react";
import type { BlogTocItem } from "@/lib/blog-toc";

type Props = {
  items: BlogTocItem[];
  className?: string;
};

export default function BlogPostToc({ items, className }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const pickActive = () => {
      if (visible.size === 0) return;
      for (const item of items) {
        if (visible.has(item.id)) {
          setActiveId(item.id);
          return;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        pickActive();
      },
      {
        // Treat the top band of the viewport as the active zone — a heading
        // counts as "in view" once it crosses that line, which feels natural
        // while reading top-to-bottom.
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <ul
      className={`space-y-0.5 border-l border-zinc-200 dark:border-zinc-800 ${className ?? ""}`}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const indent = item.depth === 3 ? "pl-6" : "pl-3";
        const stateClasses = isActive
          ? "border-fire-500 text-fire-600 dark:border-fire-400 dark:text-fire-400 font-medium"
          : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100";
        return (
          <li key={item.id} className="-ml-px">
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`block border-l py-1 text-sm leading-snug motion-safe:transition-colors ${indent} ${stateClasses}`}
            >
              {item.value}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
