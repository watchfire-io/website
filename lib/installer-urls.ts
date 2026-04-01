const REPO = "watchfire-io/watchfire";
const RELEASES_FALLBACK = `https://github.com/${REPO}/releases/latest`;

const LATEST_MAC_URL = `https://github.com/${REPO}/releases/latest/download/latest-mac.yml`;
const LATEST_WIN_URL = `https://github.com/${REPO}/releases/latest/download/latest.yml`;
const LATEST_LINUX_URL = `https://github.com/${REPO}/releases/latest/download/latest-linux.yml`;

export interface InstallerUrls {
  mac: string;
  windows: string;
  linuxAppImage: string;
  linuxDeb: string;
}

async function fetchInstallerUrl(
  manifestUrl: string,
  extPattern: RegExp
): Promise<{ version: string; url: string } | null> {
  try {
    const res = await fetch(manifestUrl, { next: { revalidate: 900 } });
    if (!res.ok) return null;
    const yaml = await res.text();

    const versionMatch = yaml.match(/^version:\s*(.+)$/m);
    if (!versionMatch) return null;
    const version = versionMatch[1].trim();

    const urlMatch = yaml.match(
      new RegExp(`url:\\s*(.*${extPattern.source})\\s*$`, "m")
    );
    if (!urlMatch) return null;
    const filename = urlMatch[1].trim();

    return {
      version,
      url: `https://github.com/${REPO}/releases/download/v${version}/${filename}`,
    };
  } catch {
    return null;
  }
}

export async function getInstallerUrls(): Promise<InstallerUrls> {
  const [mac, win, linuxAppImage, linuxDeb] = await Promise.all([
    fetchInstallerUrl(LATEST_MAC_URL, /\.dmg/),
    fetchInstallerUrl(LATEST_WIN_URL, /\.exe/),
    fetchInstallerUrl(LATEST_LINUX_URL, /\.AppImage/),
    fetchInstallerUrl(LATEST_LINUX_URL, /\.deb/),
  ]);

  return {
    mac: mac?.url ?? RELEASES_FALLBACK,
    windows: win?.url ?? RELEASES_FALLBACK,
    linuxAppImage: linuxAppImage?.url ?? RELEASES_FALLBACK,
    linuxDeb: linuxDeb?.url ?? RELEASES_FALLBACK,
  };
}

/** Backward-compatible helper — returns just the macOS DMG URL. */
export async function getDmgUrl(): Promise<string> {
  const urls = await getInstallerUrls();
  return urls.mac;
}
