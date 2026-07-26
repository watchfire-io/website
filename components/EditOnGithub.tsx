import { editBranch, editRepoUrl, siteUrl } from "@/lib/site";

type EditOnGithubProps = {
  filePath: string;
  title: string;
  slug: string;
};

function PencilIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

export default function EditOnGithub({
  filePath,
  title,
  slug,
}: EditOnGithubProps) {
  const editUrl = `${editRepoUrl}/edit/${editBranch}/${filePath}`;
  const pageUrl = `${siteUrl}/docs${slug ? `/${slug}` : ""}`;
  const issueTitle = `Docs feedback: ${title}`;
  const issueBody = [
    `Page: ${pageUrl}`,
    `Source: ${filePath}`,
    "",
    "Description:",
    "<one-line summary of the issue>",
    "",
    "Suggested fix (optional):",
    "",
  ].join("\n");
  const issueUrl =
    `${editRepoUrl}/issues/new` +
    `?title=${encodeURIComponent(issueTitle)}` +
    `&body=${encodeURIComponent(issueBody)}`;

  return (
    <div className="not-prose mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-fd-border pt-6 text-sm">
      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-fd-muted-foreground transition-colors hover:text-fire-500 dark:hover:text-fire-400"
      >
        <PencilIcon />
        <span>Edit this page on GitHub</span>
        <ArrowRightIcon />
      </a>
      <a
        href={issueUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-fd-muted-foreground transition-colors hover:text-fire-500 dark:hover:text-fire-400"
      >
        <MessageIcon />
        <span>Report a docs issue</span>
      </a>
    </div>
  );
}
