"use client";

import { useState, useEffect, useRef } from "react";
import type { InstallerUrls } from "@/lib/installer-urls";
import {
  type Platform,
  usePlatform,
  PLATFORM_ICONS,
  AppleIcon,
  LinuxIcon,
  WindowsIcon,
} from "@/lib/platform";

const BINARY_BASE =
  "https://github.com/watchfire-io/watchfire/releases/latest/download";
const RELEASES_URL =
  "https://github.com/watchfire-io/watchfire/releases/latest";

const INSTALL_COMMANDS: Record<Platform, string> = {
  macos:
    "brew tap watchfire-io/tap && brew install --cask watchfire-io/tap/watchfire",
  linux:
    "curl -fsSL https://raw.githubusercontent.com/watchfire-io/watchfire/main/scripts/install.sh | bash",
  windows:
    "irm https://raw.githubusercontent.com/watchfire-io/watchfire/main/scripts/install.ps1 | iex",
};

const INSTALL_LABELS: Record<Platform, string> = {
  macos: "or install via Homebrew (macOS)",
  linux: "or install via script (Linux)",
  windows: "or install via PowerShell (Windows)",
};

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

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
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
);

const ChevronIcon = ({ open }: { open: boolean }) => (
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
);

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

const PRIMARY_LABELS: Record<Platform, string> = {
  macos: "Download for macOS",
  linux: "Download for Linux",
  windows: "Download for Windows",
};

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

export default function PlatformInstall({
  installerUrls,
}: {
  installerUrls: InstallerUrls;
}) {
  const platform = usePlatform();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const command = INSTALL_COMMANDS[platform];
  const groups = getPlatformGroups(installerUrls);
  const primaryHref = getPrimaryHref(platform, installerUrls);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may not be available
    }
  }

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-4 overflow-visible md:items-start">
      {/* Download buttons row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Primary CTA — always a download link */}
        <a
          href={primaryHref}
          className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-6 py-3 font-medium text-white transition-colors hover:bg-fire-400"
        >
          {PLATFORM_ICONS[platform]}
          {PRIMARY_LABELS[platform]}
        </a>

        {/* Other platforms dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/60 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            All platforms
            <ChevronIcon open={dropdownOpen} />
          </button>

          {dropdownOpen && (
            <div className="absolute bottom-full left-0 z-50 mb-2 max-h-[calc(100vh-8rem)] w-72 overflow-y-auto overscroll-contain rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
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
                        onClick={() => setDropdownOpen(false)}
                      >
                        <DownloadIcon />
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
              <div className="border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-500 transition-colors hover:text-fire-500 dark:text-zinc-400 dark:hover:text-fire-400"
                  onClick={() => setDropdownOpen(false)}
                >
                  View all releases on GitHub →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terminal card with install command */}
      <div className="w-full max-w-full overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:max-w-xl">
        <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-1.5 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500/60" />
              <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
              <div className="h-2 w-2 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
              {INSTALL_LABELS[platform]}
            </span>
          </div>
          <button
            onClick={copyCommand}
            aria-label="Copy install command"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            {copied ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="5" width="8" height="8" rx="1.5" />
                  <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        <div className="px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="shrink-0 select-none font-mono text-xs text-zinc-300 dark:text-zinc-600">
              {platform === "windows" ? ">" : "$"}
            </span>
            <code className="break-all font-mono text-xs text-zinc-700 dark:text-zinc-300">
              {command}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
