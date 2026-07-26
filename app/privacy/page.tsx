import type { Metadata } from "next";
import Link from "next/link";
import {
  Cpu,
  Globe2,
  Inbox,
  LineChart,
  Mail,
  Send,
  Shield,
  UserCheck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";

const LAST_UPDATED = "2026-05-04";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Watchfire's privacy policy: no telemetry or analytics in the software, GA4-only on the site, no cross-site tracking, and clear opt-out instructions.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy",
    description:
      "What Watchfire collects, what it doesn't, and what the website does with visitor data.",
    url: `${siteUrl}/privacy`,
    type: "article",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy",
    description:
      "What Watchfire collects, what it doesn't, and what the website does with visitor data.",
    images: ["/og-image.png"],
  },
};

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

const toc: Section[] = [
  { id: "software", title: "The software", icon: <Cpu className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> },
  { id: "outbound", title: "Outbound integrations", icon: <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> },
  { id: "inbound", title: "Inbound integrations", icon: <Inbox className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> },
  { id: "website", title: "The website", icon: <Globe2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> },
  { id: "analytics", title: "Analytics & opt-out", icon: <LineChart className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> },
  { id: "rights", title: "Your rights", icon: <UserCheck className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> },
  { id: "contact", title: "Contact", icon: <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> },
];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="group scroll-mt-24 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
    >
      <a
        href={`#${id}`}
        className="inline-flex items-center gap-2 no-underline hover:text-fire-600 dark:hover:text-fire-400"
      >
        {children}
        <span
          aria-hidden="true"
          className="text-base font-normal text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600"
        >
          #
        </span>
      </a>
    </h2>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-12 pt-20 sm:pt-28">
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
              <Shield className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              Privacy
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Privacy
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Watchfire is a developer tool that runs on your machine. The
              software does not phone home, does not collect telemetry, and
              does not send your code anywhere unless you wire it up to do
              so. This page explains what that means in practice, and what
              the website at watchfire.io does with visitor data.
            </p>
            <p className="mt-3 font-mono text-xs text-zinc-500 dark:text-zinc-500">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* TOC */}
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-3xl">
            <nav
              aria-label="On this page"
              className="rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                On this page
              </p>
              <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {toc.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-fire-600 dark:text-zinc-300 dark:hover:text-fire-400"
                    >
                      <span className="text-zinc-400 dark:text-zinc-500">
                        {s.icon}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* 1. Software */}
        <section className="px-6 py-10">
          <article className="prose-privacy mx-auto max-w-[70ch]">
            <SectionHeading id="software">
              1. Watchfire (the software)
            </SectionHeading>
            <Lede>
              The daemon (<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">watchfired</code>),
              the CLI/TUI (<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">watchfire</code>),
              and the GUI (Watchfire.app) all run entirely on your machine.
            </Lede>
            <Body>
              <p>
                Watchfire itself does not phone home. There is no telemetry,
                no analytics, no usage reporting, no crash reporting, and no
                automatic update check that sends your data anywhere. The
                daemon does not open an outbound connection on your behalf
                unless you have explicitly configured one.
              </p>
              <p>
                Project files, task YAML, prompts, terminal transcripts, and
                worktree contents stay on your machine. Nothing about your
                tasks or your code leaves your filesystem unless you
                configure an outbound integration (a webhook, Slack, Discord,
                or GitHub auto-PR) or invoke an agent backend that talks to
                a remote provider.
              </p>
              <p>
                When you invoke an agent backend &mdash; Claude Code, OpenAI
                Codex, opencode, Gemini CLI, or GitHub Copilot CLI &mdash;
                the prompts, file contents, and tool outputs that backend
                needs are sent to that backend&apos;s provider, governed by
                that provider&apos;s own terms and privacy policy. Watchfire
                does not interpose, log, or copy that traffic beyond what
                the agent CLI itself writes to disk in your worktree
                (transcripts, tool call logs, etc.).
              </p>
              <p>
                For the threat model and sandbox guarantees that back these
                claims, see{" "}
                <Link
                  href="/docs/security"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /docs/security
                </Link>
                .
              </p>
            </Body>
          </article>
        </section>

        <Divider />

        {/* 2. Outbound integrations */}
        <section className="px-6 py-10">
          <article className="prose-privacy mx-auto max-w-[70ch]">
            <SectionHeading id="outbound">
              2. Outbound integrations
            </SectionHeading>
            <Lede>
              Webhook, Slack, Discord, and GitHub auto-PR adapters. Each one
              is opt-in and requires you to provide credentials.
            </Lede>
            <Body>
              <p>
                None of these adapters are wired by default. They activate
                only when you configure a destination URL, bot token, or
                signing secret through the GUI, the CLI, or your project
                configuration. With no integrations configured, the daemon
                makes no outbound calls of any kind.
              </p>
              <p>
                Outbound webhooks are signed with HMAC-SHA256 over the raw
                request body, using a secret you supply. The signature is
                sent in the{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  X-Watchfire-Signature
                </code>{" "}
                header, so receivers can prove the call came from your
                daemon and not a third party. Slack, Discord, and the GitHub
                auto-PR adapter use the provider&apos;s own auth (bot token,
                webhook URL, or local{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  gh
                </code>{" "}
                CLI session).
              </p>
              <p>
                Recipients receive the fields you opt into. The exact
                payload schema, including which task and project metadata is
                sent, is documented at{" "}
                <Link
                  href="/docs/concepts/integrations"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /docs/concepts/integrations
                </Link>
                . Your code, your transcripts, and your task contents are
                not included unless the payload schema explicitly says so.
              </p>
            </Body>
          </article>
        </section>

        <Divider />

        {/* 3. Inbound integrations */}
        <section className="px-6 py-10">
          <article className="prose-privacy mx-auto max-w-[70ch]">
            <SectionHeading id="inbound">
              3. Inbound integrations
            </SectionHeading>
            <Lede>
              An optional HTTP server that lets Slack, Discord, or GitHub
              webhooks drive your daemon back.
            </Lede>
            <Body>
              <p>
                The inbound HTTP server is opt-in. With no provider
                configured, the daemon does not bind a port at all. When
                you do enable a provider, the server listens on the
                loopback interface (<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">127.0.0.1:8765</code>)
                by default &mdash; nothing is reachable from the network
                until you change that bind address yourself.
              </p>
              <p>
                Every inbound request is verified with a constant-time
                signature check (HMAC-SHA256 for GitHub and Slack, Ed25519
                for Discord) and de-duplicated through an in-process replay
                cache, so a forged or replayed delivery is rejected before
                it can drive any action. Watchfire never opens a port
                automatically, never registers a public URL on your behalf,
                and never relays inbound traffic to a third party.
              </p>
              <p>
                For the full setup walkthrough and the verifier matrix,
                see{" "}
                <Link
                  href="/docs/concepts/integrations"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /docs/concepts/integrations
                </Link>
                .
              </p>
            </Body>
          </article>
        </section>

        <Divider />

        {/* 4. The website */}
        <section className="px-6 py-10">
          <article className="prose-privacy mx-auto max-w-[70ch]">
            <SectionHeading id="website">
              4. The website
            </SectionHeading>
            <Lede>
              Everything below is about <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">watchfire.io</code>{" "}
              &mdash; the marketing and documentation site you are
              currently reading.
            </Lede>
            <Body>
              <p>
                <strong>Hosting.</strong> The site is built with Next.js and
                deployed on Vercel. Vercel terminates TLS and serves the
                static and server-rendered output. As with any HTTP request,
                Vercel&apos;s edge will see your IP address and your
                browser&apos;s User-Agent header for the duration of the
                request. We do not maintain a separate access log on top of
                what Vercel collects.
              </p>
              <p>
                <strong>Fonts.</strong> The site uses three Google Fonts:
                Outfit (UI and body), JetBrains Mono (code), and Syne (the
                wordmark, on the{" "}
                <Link
                  href="/brand"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  /brand
                </Link>{" "}
                page only). They are loaded through Next.js&apos;s{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  next/font
                </code>{" "}
                helper, which downloads font files at build time and serves
                them from the same origin as the rest of the site. Your
                browser does <strong>not</strong> contact{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  fonts.googleapis.com
                </code>{" "}
                or{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  fonts.gstatic.com
                </code>{" "}
                at runtime when you load a page on this site.
              </p>
              <p>
                <strong>Documentation search.</strong> The docs use
                Fumadocs&apos;s built-in search. When you type a query into
                the &#8984;K modal, the request goes to{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  /api/search
                </code>{" "}
                on this same site &mdash; never to a third-party search
                provider. Queries are not logged beyond Vercel&apos;s
                standard request logs.
              </p>
              <p>
                <strong>GitHub stars counter.</strong> The star count in the
                header is fetched from the public GitHub API on the server,
                cached, and re-rendered into the page. Your browser does
                not talk to GitHub for the counter, so your IP and identity
                are not sent to GitHub when you open this site.
              </p>
              <p>
                <strong>What is not here.</strong> No third-party
                advertising. No cross-site identifiers. No behavioral
                tracking. No marketing pixels (Facebook, LinkedIn, X, etc.).
                No session-replay tooling. No A/B testing platforms.
              </p>
            </Body>
          </article>
        </section>

        <Divider />

        {/* 5. Analytics */}
        <section className="px-6 py-10">
          <article className="prose-privacy mx-auto max-w-[70ch]">
            <SectionHeading id="analytics">
              5. Analytics &amp; opt-out
            </SectionHeading>
            <Lede>
              The site loads Google Analytics 4 (GA4) for aggregate visit
              counts and high-level navigation patterns. That is the only
              analytics tool on the page.
            </Lede>
            <Body>
              <p>
                GA4 is loaded through the standard{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  gtag.js
                </code>{" "}
                snippet served from{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  googletagmanager.com
                </code>
                . When it loads, GA4 typically sets two first-party cookies
                in your browser:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                    _ga
                  </code>{" "}
                  &mdash; a randomly generated client identifier (default
                  expiry: 2 years).
                </li>
                <li>
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                    _ga_&lt;property-id&gt;
                  </code>{" "}
                  &mdash; a per-property session and engagement counter
                  (default expiry: 2 years).
                </li>
              </ul>
              <p>
                We use GA4 only to understand which docs pages are useful
                and where readers drop off. We do not use GA4 audiences for
                ads, do not link Google Ads or Google Signals to the
                property, and do not export data to other Google services
                for re-targeting. Google&apos;s own handling of the data it
                receives is governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  Google&apos;s privacy policy
                </a>
                .
              </p>
              <p>
                <strong>Opting out.</strong> You can prevent GA4 from
                running on this site in any of the following ways:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>
                  Install the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                  >
                    Google Analytics opt-out browser add-on
                  </a>
                  .
                </li>
                <li>
                  Use a tracker-blocking extension such as uBlock Origin,
                  Privacy Badger, or DuckDuckGo Privacy Essentials.
                </li>
                <li>
                  Enable your browser&apos;s tracking-protection or strict
                  content-blocking mode (Firefox, Brave, and Safari ship
                  this on by default).
                </li>
                <li>
                  Block third-party scripts at the network level (Pi-hole,
                  NextDNS, AdGuard, etc.).
                </li>
              </ul>
              <p>
                Browser &ldquo;Do Not Track&rdquo; signals are honored to
                the extent the GA4 client honors them; we recommend the
                methods above as more reliable.
              </p>
            </Body>
          </article>
        </section>

        <Divider />

        {/* 6. Rights */}
        <section className="px-6 py-10">
          <article className="prose-privacy mx-auto max-w-[70ch]">
            <SectionHeading id="rights">
              6. Your rights
            </SectionHeading>
            <Body>
              <p>
                Watchfire has no account system. The site does not have
                logins, profiles, newsletters, or comment threads, so there
                is no per-user record to export, correct, or delete.
              </p>
              <p>
                For the GA4 analytics described above, the data point that
                identifies you is the random{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  _ga
                </code>{" "}
                cookie value. Clearing your site cookies (or using one of
                the opt-out methods above) is the most direct way to remove
                that identifier from your browser. To request deletion of
                already-collected analytics data tied to your client
                identifier, contact us at the address below; bring your{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  _ga
                </code>{" "}
                cookie value with you so we can locate the relevant rows.
              </p>
            </Body>
          </article>
        </section>

        <Divider />

        {/* 7. Contact */}
        <section className="px-6 py-10">
          <article className="prose-privacy mx-auto max-w-[70ch]">
            <SectionHeading id="contact">
              7. Contact
            </SectionHeading>
            <Body>
              <p>
                For privacy questions, reach the maintainers at{" "}
                <a
                  href="mailto:info@watchfire.io?subject=Privacy"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  info@watchfire.io
                </a>
                . For things that should not be filed publicly &mdash;
                security vulnerabilities especially &mdash; use{" "}
                <a
                  href="mailto:security@watchfire.io"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  security@watchfire.io
                </a>{" "}
                instead. The disclosure timeline is published on the{" "}
                <Link
                  href="/docs/security"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  Security page
                </Link>
                .
              </p>
              <p>
                Non-sensitive privacy questions are also welcome on{" "}
                <a
                  href="https://github.com/watchfire-io/watchfire/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  GitHub Discussions
                </a>
                {" "}or as an issue tagged{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200">
                  privacy
                </code>
                {" "}in the{" "}
                <a
                  href="https://github.com/watchfire-io/watchfire/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fire-600 underline-offset-2 hover:underline dark:text-fire-400"
                >
                  main repo
                </a>
                .
              </p>
              <p className="pt-4 font-mono text-xs text-zinc-500 dark:text-zinc-500">
                Last updated: {LAST_UPDATED}
              </p>
            </Body>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div className="mx-auto h-px max-w-[70ch] bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-70 dark:via-zinc-800" />
  );
}
