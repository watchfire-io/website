"use client";

import { useSyncExternalStore } from "react";

export type Platform = "macos" | "linux" | "windows";

export function detectPlatform(): Platform {
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

const subscribe = () => () => {};

export function usePlatform(): Platform {
  return useSyncExternalStore(
    subscribe,
    () => detectPlatform(),
    () => "macos" as Platform
  );
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  macos: "macOS",
  linux: "Linux",
  windows: "Windows",
};

export function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  );
}

export function LinuxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.074 1.741-.356 2.075-.97.09-.168.14-.339.176-.544.036-.207.038-.442.063-.671.05-.463.116-.943.286-1.288.086-.176.196-.328.295-.494.09-.165.173-.344.236-.592a2.29 2.29 0 00.048-.498c-.012-.399-.108-.712-.196-.998-.089-.289-.178-.564-.196-.868-.018-.307.025-.642.089-.99.065-.345.141-.71.179-1.139.035-.41.027-.87-.076-1.388-.053-.26-.136-.51-.24-.762a4.545 4.545 0 00-.583-1.012 7.845 7.845 0 00-.15-.205c-.278-.377-.58-.745-.862-1.122-.282-.375-.543-.762-.695-1.185-.152-.421-.203-.878-.203-1.388 0-.116-.004-.237-.01-.338C18.24 4.37 18.85.198 14.113.028 13.718.009 13.318 0 12.918 0h-.414z" />
    </svg>
  );
}

export function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

export const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  macos: <AppleIcon />,
  linux: <LinuxIcon />,
  windows: <WindowsIcon />,
};
