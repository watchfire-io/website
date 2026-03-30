"use client";

import { useState, useEffect, useRef } from "react";

type Platform = "macos" | "linux" | "windows";

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
  linux: "install script (macOS / Linux)",
  windows: "PowerShell install script",
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

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
  </svg>
);

const LinuxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.074 1.741-.356 2.075-.97.09-.168.14-.339.176-.544.036-.207.038-.442.063-.671.05-.463.116-.943.286-1.288.086-.176.196-.328.295-.494.09-.165.173-.344.236-.592a2.29 2.29 0 00.048-.498c-.012-.399-.108-.712-.196-.998-.089-.289-.178-.564-.196-.868-.018-.307.025-.642.089-.99.065-.345.141-.71.179-1.139.035-.41.027-.87-.076-1.388-.053-.26-.136-.51-.24-.762a4.545 4.545 0 00-.583-1.012 7.845 7.845 0 00-.15-.205c-.278-.377-.58-.745-.862-1.122-.282-.375-.543-.762-.695-1.185-.152-.421-.203-.878-.203-1.388 0-.116-.004-.237-.01-.338C18.24 4.37 18.85.198 14.113.028 13.718.009 13.318 0 12.918 0h-.414z" />
  </svg>
);

const WindowsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

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

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "macos";
  const ua = navigator.userAgent.toLowerCase();
  const platform = (
    (navigator as { userAgentData?: { platform?: string } }).userAgentData
      ?.platform ?? navigator.platform
  ).toLowerCase();

  if (platform.includes("win") || ua.includes("windows")) return "windows";
  if (platform.includes("linux") || ua.includes("linux")) return "linux";
  return "macos";
}

function getPlatformGroups(dmgUrl: string): PlatformGroup[] {
  return [
    {
      platform: "macos",
      label: "macOS",
      icon: <AppleIcon />,
      options: [
        {
          label: "Download .dmg (Universal)",
          href: dmgUrl,
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
        {
          label: "Daemon — Apple Silicon (arm64)",
          href: `${BINARY_BASE}/watchfired-darwin-arm64`,
        },
        {
          label: "Daemon — Intel (amd64)",
          href: `${BINARY_BASE}/watchfired-darwin-amd64`,
        },
      ],
    },
    {
      platform: "linux",
      label: "Linux",
      icon: <LinuxIcon />,
      options: [
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
      ],
    },
    {
      platform: "windows",
      label: "Windows",
      icon: <WindowsIcon />,
      options: [
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
      ],
    },
  ];
}

const PRIMARY_LABELS: Record<Platform, string> = {
  macos: "Download for macOS",
  linux: "Install on Linux",
  windows: "Install on Windows",
};

const PRIMARY_ICONS: Record<Platform, React.ReactNode> = {
  macos: <AppleIcon />,
  linux: <LinuxIcon />,
  windows: <WindowsIcon />,
};

function getPrimaryHref(
  platform: Platform,
  dmgUrl: string
): string | undefined {
  if (platform === "macos") return dmgUrl;
  return undefined;
}

export default function PlatformInstall({ dmgUrl }: { dmgUrl: string }) {
  const [platform, setPlatform] = useState<Platform>("macos");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

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
  const groups = getPlatformGroups(dmgUrl);
  const primaryHref = getPrimaryHref(platform, dmgUrl);

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
    <div className="mt-8 flex w-full flex-col items-center gap-4 md:items-start">
      {/* Download buttons row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Primary CTA */}
        {primaryHref ? (
          <a
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-6 py-3 font-medium text-white transition-colors hover:bg-fire-400"
          >
            {PRIMARY_ICONS[platform]}
            {PRIMARY_LABELS[platform]}
          </a>
        ) : (
          <button
            onClick={copyCommand}
            className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-6 py-3 font-medium text-white transition-colors hover:bg-fire-400"
          >
            {PRIMARY_ICONS[platform]}
            {copied ? "Copied!" : PRIMARY_LABELS[platform]}
          </button>
        )}

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
            <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
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
