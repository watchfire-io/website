"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";

type Platform = "macos" | "linux" | "windows";

const subscribe = () => () => {};
function usePlatform(): Platform {
  return useSyncExternalStore(
    subscribe,
    () => detectPlatform(),
    () => "macos" as Platform
  );
}

const BINARY_BASE =
  "https://github.com/watchfire-io/watchfire/releases/latest/download";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "macos";
  const ua = navigator.userAgent.toLowerCase();
  const p = (
    (navigator as { userAgentData?: { platform?: string } }).userAgentData
      ?.platform ?? navigator.platform
  ).toLowerCase();
  if (p.includes("win") || ua.includes("windows")) return "windows";
  if (p.includes("linux") || ua.includes("linux")) return "linux";
  return "macos";
}

interface DownloadOption {
  label: string;
  href: string;
}

function getOptions(platform: Platform, dmgUrl: string): DownloadOption[] {
  switch (platform) {
    case "macos":
      return [
        { label: "Download .dmg (Universal)", href: dmgUrl },
        {
          label: "CLI — Apple Silicon (arm64)",
          href: `${BINARY_BASE}/watchfire-darwin-arm64`,
        },
        {
          label: "CLI — Intel (amd64)",
          href: `${BINARY_BASE}/watchfire-darwin-amd64`,
        },
      ];
    case "linux":
      return [
        {
          label: "CLI — x86_64 (amd64)",
          href: `${BINARY_BASE}/watchfire-linux-amd64`,
        },
        {
          label: "CLI — ARM (arm64)",
          href: `${BINARY_BASE}/watchfire-linux-arm64`,
        },
        {
          label: "Daemon — x86_64 (amd64)",
          href: `${BINARY_BASE}/watchfired-linux-amd64`,
        },
        {
          label: "Daemon — ARM (arm64)",
          href: `${BINARY_BASE}/watchfired-linux-arm64`,
        },
      ];
    case "windows":
      return [
        {
          label: "CLI — x86_64 (amd64)",
          href: `${BINARY_BASE}/watchfire-windows-amd64.exe`,
        },
        {
          label: "CLI — ARM (arm64)",
          href: `${BINARY_BASE}/watchfire-windows-arm64.exe`,
        },
        {
          label: "Daemon — x86_64 (amd64)",
          href: `${BINARY_BASE}/watchfired-windows-amd64.exe`,
        },
        {
          label: "Daemon — ARM (arm64)",
          href: `${BINARY_BASE}/watchfired-windows-arm64.exe`,
        },
      ];
  }
}

const PLATFORM_LABELS: Record<Platform, string> = {
  macos: "macOS",
  linux: "Linux",
  windows: "Windows",
};

export default function DownloadButtonClient({
  dmgUrl,
}: {
  dmgUrl: string;
}) {
  const platform = usePlatform();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  const options = getOptions(platform, dmgUrl);
  const primary = options[0];

  return (
    <div className="not-prose flex flex-col gap-3" ref={ref}>
      <div className="flex items-center gap-2">
        <a
          href={primary.href}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fire-400"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download for {PLATFORM_LABELS[platform]}
        </a>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 bg-white/60 px-3 py-2.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          {open && (
            <div className="absolute left-0 top-full z-50 mt-1 w-60 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              {options.map((opt) => (
                <a
                  key={opt.label}
                  href={opt.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-fire-50 hover:text-fire-600 dark:text-zinc-300 dark:hover:bg-fire-500/10 dark:hover:text-fire-400"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {opt.label}
                </a>
              ))}
              <a
                href="https://github.com/watchfire-io/watchfire/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-t border-zinc-100 px-3 py-2 text-sm text-zinc-500 hover:text-fire-500 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-fire-400"
                onClick={() => setOpen(false)}
              >
                View all releases →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
