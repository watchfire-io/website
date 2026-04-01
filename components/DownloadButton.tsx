import { getInstallerUrls } from "@/lib/installer-urls";
import DownloadButtonClient from "./DownloadButtonClient";

export default async function DownloadButton() {
  const installerUrls = await getInstallerUrls();
  return <DownloadButtonClient installerUrls={installerUrls} />;
}
