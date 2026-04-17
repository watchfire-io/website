"use client";

import { useState, useEffect, useRef } from "react";
import type { InstallerUrls } from "@/lib/installer-urls";
import {
  type Platform,
  usePlatform,
  PLATFORM_LABELS,
  AppleIcon,
  LinuxIcon,
  WindowsIcon,
} from "@/lib/platform";

const BINARY_BASE =
  "https://github.com/watchfire-io/watchfire/releases/latest/download";
const RELEASES_URL =
  "https://github.com/watchfire-io/watchfire/releases/latest";

interface DownloadOption {
  label: string;
  href: string;
  description?: string;
}

interface PlatformGroup {
  platform: Platform;
  label: string;
  icon: React.ReactNode;
  options: DownloadOption[];
}

function getPlatformGroups(urls: InstallerUrls): PlatformGroup[] {
  return [
    {
      platform: "macos",
      label: "macOS",
      icon: <AppleIcon />,
      options: [
        {
          label: "Download .dmg (Universal)",
          href: urls.mac,
          description: "GUI + CLI + Daemon",
        },
        {
          label: "CLI — Apple Silicon (arm64)",
          href: `${BINARY_BASE}/watchfire-darwin-arm64`,
        },
        {
          label: "CLI — Intel (amd64)",
          href: `${BINARY_BASE}/watchfire-darwin-amd64`,
        },
      ],
    },
    {
      platform: "linux",
      label: "Linux",
      icon: <LinuxIcon />,
      options: [
        {
          label: "Download .AppImage (x64)",
          href: urls.linuxAppImage,
          description: "GUI + CLI + Daemon",
        },
        {
          label: "Download .deb (x64)",
          href: urls.linuxDeb,
          description: "GUI + CLI + Daemon",
        },
        {
          label: "CLI — x86_64 (amd64)",
          href: `${BINARY_BASE}/watchfire-linux-amd64`,
        },
        {
          label: "CLI — ARM (arm64)",
          href: `${BINARY_BASE}/watchfire-linux-arm64`,
        },
      ],
    },
    {
      platform: "windows",
      label: "Windows",
      icon: <WindowsIcon />,
      options: [
        {
          label: "Download .exe Installer (x64)",
          href: urls.windows,
          description: "GUI + CLI + Daemon",
        },
        {
          label: "CLI — x86_64 (amd64)",
          href: `${BINARY_BASE}/watchfire-windows-amd64.exe`,
        },
        {
          label: "CLI — ARM (arm64)",
          href: `${BINARY_BASE}/watchfire-windows-arm64.exe`,
        },
      ],
    },
  ];
}

function getPrimaryHref(platform: Platform, urls: InstallerUrls): string {
  switch (platform) {
    case "macos":
      return urls.mac;
    case "windows":
      return urls.windows;
    case "linux":
      return urls.linuxAppImage;
  }
}

export default function DownloadButtonClient({
  installerUrls,
}: {
  installerUrls: InstallerUrls;
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

  const groups = getPlatformGroups(installerUrls);
  const primaryHref = getPrimaryHref(platform, installerUrls);

  return (
    <div className="not-prose flex flex-col gap-3" ref={ref}>
      <div className="flex items-center gap-2">
        <a
          href={primaryHref}
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
            aria-label="All platforms"
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
            <div className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              {groups.map((group) => (
                <div key={group.platform}>
                  <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                    {group.icon}
                    {group.label}
                  </div>
                  <div className="py-1">
                    {group.options.map((opt) => (
                      <a
                        key={opt.label}
                        href={opt.href}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-fire-50 hover:text-fire-600 dark:text-zinc-300 dark:hover:bg-fire-500/10 dark:hover:text-fire-400"
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
                        <span>
                          {opt.label}
                          {opt.description && (
                            <span className="ml-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                              {opt.description}
                            </span>
                          )}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-t border-zinc-100 px-4 py-2.5 text-sm text-zinc-500 hover:text-fire-500 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-fire-400"
                onClick={() => setOpen(false)}
              >
                View all releases on GitHub →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
