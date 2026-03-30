import { getDmgUrl } from "@/lib/dmg-url";
import DownloadButtonClient from "./DownloadButtonClient";

export default async function DownloadButton() {
  const dmgUrl = await getDmgUrl();
  return <DownloadButtonClient dmgUrl={dmgUrl} />;
}
