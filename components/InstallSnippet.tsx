"use client";

import PlatformInstall from "./PlatformInstall";

export default function InstallSnippet({ dmgUrl }: { dmgUrl: string }) {
  return <PlatformInstall dmgUrl={dmgUrl} />;
}
