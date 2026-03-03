import InstallSnippet from "./InstallSnippet";
import { getDmgUrl } from "@/lib/dmg-url";

export default async function DownloadInstall() {
  const dmgUrl = await getDmgUrl();
  return <InstallSnippet dmgUrl={dmgUrl} />;
}
