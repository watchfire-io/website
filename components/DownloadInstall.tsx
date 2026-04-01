import PlatformInstall from "./PlatformInstall";
import { getInstallerUrls } from "@/lib/installer-urls";

export default async function DownloadInstall() {
  const installerUrls = await getInstallerUrls();
  return <PlatformInstall installerUrls={installerUrls} />;
}
