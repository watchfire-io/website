import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";
import {
  siteUrl,
  siteName,
  siteTitle,
  siteDescription,
  siteShareDescription,
  softwareVersion,
  socialLinks,
} from "@/lib/site";

const GA_ID = "G-HZXJ271420";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#e07040",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteShareDescription,
    type: "website",
    siteName,
    url: siteUrl,
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteShareDescription,
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
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
      "application/atom+xml": `${siteUrl}/atom.xml`,
      "application/feed+json": `${siteUrl}/feed.json`,
      "text/plain": [
        { url: `${siteUrl}/llms.txt`, title: "llms.txt" },
        { url: `${siteUrl}/llms-full.txt`, title: "llms-full.txt" },
      ],
    },
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: siteDescription,
  sameAs: [socialLinks.github, socialLinks.bluesky, socialLinks.x],
};

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  description: siteDescription,
  url: siteUrl,
  downloadUrl: `${siteUrl}/docs/installation`,
  softwareVersion,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  author: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-fire-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-300 focus-visible:ring-offset-2"
        >
          Skip to main content
        </a>
        <script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          id="ld-software-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationLd),
          }}
        />
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
