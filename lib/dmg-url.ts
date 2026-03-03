const REPO = "watchfire-io/watchfire";
const RELEASES_FALLBACK = `https://github.com/${REPO}/releases/latest`;
const LATEST_MAC_URL = `https://github.com/${REPO}/releases/latest/download/latest-mac.yml`;

export async function getDmgUrl(): Promise<string> {
  try {
    const res = await fetch(LATEST_MAC_URL, { next: { revalidate: 900 } });
    if (!res.ok) return RELEASES_FALLBACK;
    const yaml = await res.text();

    const versionMatch = yaml.match(/^version:\s*(.+)$/m);
    if (!versionMatch) return RELEASES_FALLBACK;
    const version = versionMatch[1].trim();

    const dmgMatch = yaml.match(/url:\s*(.*\.dmg)\s*$/m);
    if (!dmgMatch) return RELEASES_FALLBACK;
    const dmgFilename = dmgMatch[1].trim();

    return `https://github.com/${REPO}/releases/download/v${version}/${dmgFilename}`;
  } catch {
    return RELEASES_FALLBACK;
  }
}
