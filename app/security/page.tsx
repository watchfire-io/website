import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  GitBranch,
  HardDrive,
  KeyRound,
  Lock,
  Mail,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Unlock,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Github } from "@/components/icons/Github";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FinalCTAServer from "@/components/FinalCTAServer";
import { siteUrl } from "@/lib/site";
import { buildBlogOgUrl } from "@/lib/og-url";
import type { BreadcrumbList } from "@/lib/jsonld-types";
import {
  sandboxBoundaries,
  threatsInScope,
  threatsOutOfScope,
  trustPillars,
  type SandboxAccessLevel,
  type TrustPillarIcon,
} from "@/lib/security-page";

const description =
  "How Watchfire keeps agent runs contained: local-first design, kernel-level sandboxing, isolated git worktrees, and an open-source audit trail you can read.";

const ogImage = buildBlogOgUrl({
  title: "Security",
  description,
  section: "Security",
});

export const metadata: Metadata = {
  title: "Security — Watchfire",
  description,
  alternates: {
    canonical: `${siteUrl}/security`,
  },
  openGraph: {
    type: "website",
    title: "Security — Watchfire",
    description,
    url: `${siteUrl}/security`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security — Watchfire",
    description,
    images: [ogImage],
  },
};

const breadcrumbsLd: BreadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Security",
      item: `${siteUrl}/security`,
    },
  ],
};

const pillarIconMap: Record<TrustPillarIcon, LucideIcon> = {
  HardDrive,
  ShieldCheck,
  GitBranch,
  Unlock,
};

interface SecurityFaqEntry {
  question: string;
  answer: React.ReactNode;
  answerText: string;
}

const securityFaqItems: SecurityFaqEntry[] = [
  {
    question: "Can the agent read my SSH keys?",
    answer: (
      <>
        No. On macOS and Linux, the platform sandbox denies read{" "}
        <span className="font-mono text-[0.9em]">and</span> write access to{" "}
        <code className="font-mono text-[0.9em]">~/.ssh</code>,{" "}
        <code className="font-mono text-[0.9em]">~/.aws</code>,{" "}
        <code className="font-mono text-[0.9em]">~/.gnupg</code>,{" "}
        <code className="font-mono text-[0.9em]">~/.netrc</code>, and{" "}
        <code className="font-mono text-[0.9em]">~/.npmrc</code> for every
        agent process. The enforcement is at the kernel level — Seatbelt on
        macOS, Landlock (or Bubblewrap) on Linux — so it does not rely on the
        agent being well-behaved.
      </>
    ),
    answerText:
      "No. On macOS and Linux, the platform sandbox denies read and write access to ~/.ssh, ~/.aws, ~/.gnupg, ~/.netrc, and ~/.npmrc for every agent process. The enforcement is at the kernel level — Seatbelt on macOS, Landlock (or Bubblewrap) on Linux — so it does not rely on the agent being well-behaved.",
  },
  {
    question: "Does Watchfire send my code to Anthropic, OpenAI, or anyone else?",
    answer: (
      <>
        Watchfire itself doesn&rsquo;t. The daemon and every client are
        local-first and have no Watchfire-operated server to phone home to.
        The agent backend you configure (Claude Code, OpenAI Codex, opencode,
        Gemini CLI, GitHub Copilot CLI, Cursor Agent) still talks to its own
        model provider exactly the way it would if you ran it directly — that
        traffic is between you and that vendor. See{" "}
        <Link
          href="/privacy"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          /privacy
        </Link>{" "}
        for the full data-flow picture.
      </>
    ),
    answerText:
      "Watchfire itself doesn't. The daemon and every client are local-first and have no Watchfire-operated server to phone home to. The agent backend you configure (Claude Code, OpenAI Codex, opencode, Gemini CLI, GitHub Copilot CLI, Cursor Agent) still talks to its own model provider exactly the way it would if you ran it directly — that traffic is between you and that vendor. See /privacy for the full data-flow picture.",
  },
  {
    question: "What happens if an agent goes rogue?",
    answer: (
      <>
        The blast radius is bounded by three things: the sandbox (no access to
        credentials or directories outside the project), the worktree (writes
        land on a{" "}
        <code className="font-mono text-[0.9em]">watchfire/&lt;n&gt;</code>{" "}
        branch, not on your default branch), and you (nothing merges without a
        review you triggered). Restart protection also caps runaway loops
        before they burn through tokens or budget. If something looks wrong
        mid-run, stop the task — the worktree and branch stay behind for
        forensics.
      </>
    ),
    answerText:
      "The blast radius is bounded by three things: the sandbox (no access to credentials or directories outside the project), the worktree (writes land on a watchfire/<n> branch, not on your default branch), and you (nothing merges without a review you triggered). Restart protection also caps runaway loops before they burn through tokens or budget. If something looks wrong mid-run, stop the task — the worktree and branch stay behind for forensics.",
  },
  {
    question: "Is the sandbox available on Linux?",
    answer: (
      <>
        Yes — Watchfire uses Landlock on Linux 5.13+ and falls back to
        Bubblewrap on older kernels. Both block credential directories at the
        kernel level. The one asymmetry: Seatbelt on macOS supports regex
        patterns and additionally blocks{" "}
        <code className="font-mono text-[0.9em]">.env</code> and{" "}
        <code className="font-mono text-[0.9em]">.git/hooks</code> directly;
        Landlock and Bubblewrap are path-based and don&rsquo;t enforce those
        two patterns. Full backend matrix lives in{" "}
        <Link
          href="/docs/security"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          /docs/security
        </Link>
        .
      </>
    ),
    answerText:
      "Yes — Watchfire uses Landlock on Linux 5.13+ and falls back to Bubblewrap on older kernels. Both block credential directories at the kernel level. The one asymmetry: Seatbelt on macOS supports regex patterns and additionally blocks .env and .git/hooks directly; Landlock and Bubblewrap are path-based and don't enforce those two patterns. Full backend matrix lives in /docs/security.",
  },
  {
    question: "Can I disable the sandbox?",
    answer: (
      <>
        You can, but you have to ask for it explicitly per project — the
        default is sandboxed. We don&rsquo;t recommend running unsandboxed for
        any project you care about; the only legitimate reasons are
        environments where the platform doesn&rsquo;t support sandboxing
        (currently Windows) or short-lived test runs where you need the agent
        to touch something the sandbox blocks.
      </>
    ),
    answerText:
      "You can, but you have to ask for it explicitly per project — the default is sandboxed. We don't recommend running unsandboxed for any project you care about; the only legitimate reasons are environments where the platform doesn't support sandboxing (currently Windows) or short-lived test runs where you need the agent to touch something the sandbox blocks.",
  },
  {
    question: "Where do I report a vulnerability?",
    answer: (
      <>
        Email{" "}
        <a
          href="mailto:security@watchfire.io"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          security@watchfire.io
        </a>{" "}
        with reproduction steps and impact. The machine-readable contact
        lives at{" "}
        <a
          href="/.well-known/security.txt"
          className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
        >
          /.well-known/security.txt
        </a>
        . We acknowledge within 48 hours, complete initial assessment within a
        week, and target coordinated disclosure within 30 days. Reporters are
        credited unless they prefer anonymity. Please don&rsquo;t file public
        GitHub issues for security reports.
      </>
    ),
    answerText:
      "Email security@watchfire.io with reproduction steps and impact. The machine-readable contact lives at /.well-known/security.txt. We acknowledge within 48 hours, complete initial assessment within a week, and target coordinated disclosure within 30 days. Reporters are credited unless they prefer anonymity. Please don't file public GitHub issues for security reports.",
  },
];

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: securityFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answerText,
    },
  })),
};

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}

function AccessPill({ level }: { level: SandboxAccessLevel }) {
  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider";
  if (level === "read-write" || level === "allowed") {
    return (
      <span
        className={`${baseClasses} border border-fire-500/40 bg-fire-500/10 text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300`}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-fire-500 dark:bg-fire-400"
        />
        {level === "read-write" ? "Read / Write" : "Allowed"}
      </span>
    );
  }
  if (level === "read-only") {
    return (
      <span
        className={`${baseClasses} border border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300`}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400"
        />
        Read-only
      </span>
    );
  }
  return (
    <span
      className={`${baseClasses} border border-red-300/70 bg-red-100/60 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400"
      />
      Blocked
    </span>
  );
}

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <script
          id="ld-security-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <script
          id="ld-security-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pt-28">
          <div
            className="glow-blob glow-blob-fire pointer-events-none -top-24 left-[10%] h-[360px] w-[360px]"
            aria-hidden="true"
          />
          <div
            className="glow-blob glow-blob-ember pointer-events-none right-[8%] top-1/4 h-[280px] w-[280px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-fire-600 backdrop-blur-sm dark:border-fire-400/40 dark:bg-fire-400/10 dark:text-fire-300">
              Security
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Security you can actually inspect.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Watchfire runs AI coding agents against your source tree. That
              only works if the containment is honest. Everything that runs is
              local-first, every agent process is kernel-sandboxed, every
              change lands in an isolated git worktree, and every line of code
              that enforces it is open source.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/security"
                className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
              >
                Read the threat model
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </Link>
              <a
                href="/.well-known/security.txt"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
              >
                <ShieldAlert
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Report a vulnerability
              </a>
            </div>
          </div>
        </section>

        <Divider />

        {/* Trust pillars */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Four things that are true on every run.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Not aspirations. These are the properties the daemon is built
                to keep.
              </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {trustPillars.map((pillar) => {
                const Icon = pillarIconMap[pillar.icon];
                return (
                  <li
                    key={pillar.title}
                    className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {pillar.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <Divider />

        {/* Threat model snapshot */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                The threat model, in two columns.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Honest about what the sandbox defends against and what it
                doesn&rsquo;t. The full version &mdash; trust boundaries,
                signature verification, network exposure &mdash; lives in{" "}
                <Link
                  href="/docs/security"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /docs/security
                </Link>
                .
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-fire-500 dark:text-fire-400"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                    In scope
                  </h3>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  What the daemon is designed to defend against.
                </p>
                <ul className="mt-5 space-y-3">
                  {threatsInScope.map((t) => (
                    <li
                      key={t.text}
                      className="flex gap-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fire-500 dark:bg-fire-400"
                      />
                      <span>{t.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
                <div className="flex items-center gap-2">
                  <XCircle
                    className="h-5 w-5 text-zinc-500 dark:text-zinc-400"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Out of scope
                  </h3>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Where the sandbox is honest about its limits.
                </p>
                <ul className="mt-5 space-y-3">
                  {threatsOutOfScope.map((t) => (
                    <li
                      key={t.text}
                      className="flex gap-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"
                      />
                      <span>{t.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <Divider />

        {/* Sandbox boundaries */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                What every agent run can &mdash; and can&rsquo;t &mdash; reach.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                These rules apply to every Watchfire-spawned agent process on
                macOS and Linux. Windows currently runs unsandboxed; prefer a
                supported platform for security-sensitive work.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50/80 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:bg-zinc-900/80 dark:text-zinc-400">
                  <tr>
                    <th scope="col" className="px-5 py-3 sm:px-6">
                      Resource
                    </th>
                    <th
                      scope="col"
                      className="hidden px-5 py-3 sm:table-cell sm:px-6"
                    >
                      Detail
                    </th>
                    <th scope="col" className="px-5 py-3 text-right sm:px-6">
                      Access
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {sandboxBoundaries.map((row) => (
                    <tr
                      key={row.resource}
                      className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40"
                    >
                      <td className="px-5 py-4 sm:px-6">
                        <p className="font-mono text-[13px] font-semibold text-zinc-900 dark:text-white">
                          {row.resource}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:hidden">
                          {row.detail}
                        </p>
                      </td>
                      <td className="hidden px-5 py-4 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400 sm:table-cell sm:px-6">
                        {row.detail}
                      </td>
                      <td className="px-5 py-4 text-right sm:px-6">
                        <AccessPill level={row.level} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Backed by Seatbelt (<code className="font-mono">sandbox-exec</code>)
              on macOS, Landlock on Linux 5.13+, and Bubblewrap on older
              kernels. The daemon also strips its internal environment
              variables before exec, so agents start with a clean environment.
            </p>
          </div>
        </section>

        <Divider />

        {/* Secrets handling */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                  <KeyRound
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  Secrets stay on your machine.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Watchfire never sends adapter credentials, signing secrets,
                  or anything in{" "}
                  <code className="font-mono text-[0.9em]">.watchfire/secrets/</code>{" "}
                  off the machine. There is no Watchfire-operated server in
                  the path.
                </p>
              </div>
              <div className="space-y-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                <p>
                  Integration credentials live in the OS keyring (Keychain on
                  macOS, Secret Service on Linux, Credential Manager on
                  Windows), with a clearly-flagged file-store fallback for
                  hosts without a keyring backend. The{" "}
                  <code className="font-mono text-[0.9em]">IntegrationsService.Save</code>{" "}
                  gRPC is write-only on the wire: clients can replace secrets,
                  but never read existing values back over RPC.
                </p>
                <p>
                  Per-project secrets you want the agent to use live in{" "}
                  <code className="font-mono text-[0.9em]">.watchfire/secrets/instructions.md</code>{" "}
                  &mdash; a file the agent sees read-only via its system
                  prompt. The directory is gitignored by default; it is your
                  file, not ours.
                </p>
                <p>
                  Deeper details:{" "}
                  <Link
                    href="/blog/2026-05-19-where-watchfire-keeps-your-secrets"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    Where Watchfire keeps your secrets
                  </Link>{" "}
                  walks through the storage layout end to end, and{" "}
                  <Link
                    href="/docs/security"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    /docs/security
                  </Link>{" "}
                  covers the signature-verification and outbound-signing path.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Audit trail */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Every run leaves a trail you can read.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Watchfire writes everything to disk in formats you can{" "}
                <code className="font-mono text-[0.9em]">cat</code>,{" "}
                <code className="font-mono text-[0.9em]">grep</code>, and{" "}
                <code className="font-mono text-[0.9em]">git log</code>.
                Nothing is hidden in an opaque database.
              </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              <li className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                  <FileText
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Task files
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Plain YAML at{" "}
                  <code className="font-mono text-[0.85em]">.watchfire/tasks/</code>{" "}
                  &mdash; one file per task, with prompt, acceptance criteria,
                  status, and outcome.
                </p>
              </li>
              <li className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                  <GitBranch
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Branches &amp; worktrees
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Every task lives on a{" "}
                  <code className="font-mono text-[0.85em]">
                    watchfire/&lt;n&gt;
                  </code>{" "}
                  branch in its own worktree under{" "}
                  <code className="font-mono text-[0.85em]">.watchfire/worktrees/</code>
                  . Reviewable like any other branch.
                </p>
              </li>
              <li className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                  <ScrollText
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                  PTY transcripts
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  The exact bytes the agent saw and sent, captured per task.
                  Replayable in the GUI/TUI or readable directly from disk.
                </p>
              </li>
              <li className="card-hover rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-sm transition-colors hover:border-fire-500/50 hover:shadow-[0_0_20px_rgba(224,112,64,0.3)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fire-500/30 bg-fire-500/10 text-fire-600 dark:border-fire-400/30 dark:bg-fire-400/10 dark:text-fire-300">
                  <Lock
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Metrics files
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  A{" "}
                  <code className="font-mono text-[0.85em]">
                    {"{n}"}.metrics.yaml
                  </code>{" "}
                  sibling to every task captures duration, tokens, cost, and
                  outcome &mdash; structured, diffable, auditable.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <Divider />

        {/* Responsible disclosure */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-fire-500/30 bg-fire-500/5 p-7 backdrop-blur-sm dark:border-fire-400/30 dark:bg-fire-400/5 sm:p-9">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-fire-500/40 bg-fire-500/15 text-fire-600 dark:border-fire-400/40 dark:bg-fire-400/15 dark:text-fire-300">
                  <AlertTriangle
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  Found something? Tell us first.
                </h2>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                Please don&rsquo;t file public GitHub issues for security
                vulnerabilities &mdash; public disclosure before a fix puts
                every Watchfire user at risk. Email us with reproduction steps
                and impact, and we&rsquo;ll coordinate.
              </p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                    Acknowledgment
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    Within 48 hours
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                    Initial assessment
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    Within 1 week
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                    Coordinated disclosure
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    Targeted within 30 days
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-fire-600 dark:text-fire-400">
                    Credit
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    In release notes, unless you prefer anonymity
                  </dd>
                </div>
              </dl>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:security@watchfire.io"
                  className="inline-flex items-center gap-2 rounded-lg bg-fire-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(224,112,64,0.35)] transition-all hover:bg-fire-600 hover:shadow-[0_0_40px_rgba(224,112,64,0.55)] dark:bg-fire-500 dark:hover:bg-fire-400"
                >
                  <Mail
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  security@watchfire.io
                </a>
                <a
                  href="/.well-known/security.txt"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
                >
                  security.txt
                </a>
                <a
                  href="https://github.com/watchfire-io/watchfire/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-fire-400/50 dark:hover:text-white"
                >
                  <Github
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  SECURITY.md
                  <ExternalLink
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                Security FAQ
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Direct answers to the{" "}
                <span className="bg-gradient-to-r from-fire-400 to-ember-500 bg-clip-text text-transparent">
                  hard questions
                </span>
                .
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The ones that come up before a security review signs off.
              </p>
            </div>
            <div className="mt-12 space-y-3">
              {securityFaqItems.map((item) => (
                <details
                  key={item.question}
                  className="group/faq overflow-hidden rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-sm transition-colors hover:border-fire-500/30 open:border-fire-500/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-fire-400/30 dark:open:border-fire-400/40 [&[open]>summary>svg]:rotate-180"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-zinc-900 marker:hidden dark:text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <svg
                      className="mt-1 shrink-0 text-zinc-400 transition-transform duration-200 group-hover/faq:text-fire-500 dark:group-hover/faq:text-fire-400"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTAServer />
      </main>
      <Footer />
    </>
  );
}
