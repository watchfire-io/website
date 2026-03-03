import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

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
    "Watchfire orchestrates AI coding agents with task management, git worktree isolation, and sandboxed execution. A remote control for Claude Code and beyond.",
  openGraph: {
    title: "Watchfire — Better context. Better code.",
    description:
      "Orchestrate AI coding agents with task management, git worktree isolation, and sandboxed execution.",
    type: "website",
    siteName: "Watchfire",
    url: siteUrl,
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchfire — Better context. Better code.",
    description:
      "Orchestrate AI coding agents with task management, git worktree isolation, and sandboxed execution.",
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
