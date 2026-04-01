import FinalCTA from "./FinalCTA";
import { getInstallerUrls } from "@/lib/installer-urls";

export default async function FinalCTAServer() {
  const installerUrls = await getInstallerUrls();
  return <FinalCTA installerUrls={installerUrls} />;
}
