import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://watchfire.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Watchfire — Remote control for AI coding agents",
    template: "%s | Watchfire",
  },
  description:
    "Watchfire orchestrates AI coding agents with task management, git worktree isolation, and sandboxed execution. A remote control for Claude Code and beyond.",
  openGraph: {
    title: "Watchfire — Remote control for AI coding agents",
    description:
      "Orchestrate AI coding agents with task management, git worktree isolation, and sandboxed execution.",
    type: "website",
    siteName: "Watchfire",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchfire — Remote control for AI coding agents",
    description:
      "Orchestrate AI coding agents with task management, git worktree isolation, and sandboxed execution.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased transition-colors bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
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
