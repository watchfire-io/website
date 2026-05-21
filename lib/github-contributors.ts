export type GitHubContributor = {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  contributions: number;
  type: string;
};

type ContributorApiResponse = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
};

const CONTRIBUTORS_URL =
  "https://api.github.com/repos/watchfire-io/watchfire/contributors?per_page=100";

const ONE_DAY_SECONDS = 60 * 60 * 24;

export async function getContributors(): Promise<GitHubContributor[]> {
  try {
    const res = await fetch(CONTRIBUTORS_URL, {
      next: { revalidate: ONE_DAY_SECONDS },
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ContributorApiResponse[];
    if (!Array.isArray(data)) return [];
    return data
      .filter((c) => c.type !== "Bot")
      .map((c) => ({
        login: c.login,
        avatarUrl: c.avatar_url,
        htmlUrl: c.html_url,
        contributions: c.contributions,
        type: c.type,
      }));
  } catch {
    return [];
  }
}
