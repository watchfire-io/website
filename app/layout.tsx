import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

const GA_ID = "G-HZXJ271420";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://watchfire.io";

export const viewport: Viewport = {
  themeColor: "#e07040",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Watchfire — Better context. Better code.",
    template: "%s | Watchfire",
  },
  description:
    "Better context. Better code. Watchfire turns clear specs into scoped tasks, then lets Claude Code, OpenAI Codex, opencode, or Gemini CLI build them in sandboxed git worktrees.",
  openGraph: {
    title: "Watchfire — Better context. Better code.",
    description:
      "Better context. Better code. Define what you want, and let Claude Code, OpenAI Codex, opencode, or Gemini CLI build it — in sandboxed git worktrees with clean transcripts.",
    type: "website",
    siteName: "Watchfire",
    url: siteUrl,
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchfire — Better context. Better code.",
    description:
      "Better context. Better code. Define what you want, and let Claude Code, OpenAI Codex, opencode, or Gemini CLI build it — in sandboxed git worktrees with clean transcripts.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/favicon-16.svg", type: "image/svg+xml", sizes: "16x16" },
    ],
    apple: [{ url: "/favicon.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased transition-colors bg-white text-zinc-900 dark:bg-[#16181d] dark:text-zinc-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <RootProvider
            theme={{
              enabled: false,
            }}
          >
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
