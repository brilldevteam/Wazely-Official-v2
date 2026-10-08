import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteUrl, siteConfig } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const monaSans = localFont({
  src: "./mona-sans.woff2",
  display: "swap",
  variable: "--font-mona",
  weight: "200 900",
  fallback: ["Inter", "Arial", "sans-serif"],
});

// Handwritten accent face (SIL Open Font License), self-hosted like Mona Sans.
const caveat = localFont({
  src: "./caveat.woff2",
  display: "swap",
  variable: "--font-caveat",
  weight: "400 700",
  fallback: ["Segoe Script", "cursive"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.title,
    template: "%s | Wazely",
  },
  description: siteConfig.description,
  applicationName: siteConfig.companyName,
  authors: [{ name: siteConfig.companyName, url: "/" }],
  creator: siteConfig.companyName,
  publisher: siteConfig.companyName,
  category: "business software",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/wazely-favicon.png", apple: "/wazely-favicon.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: "Wazely",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${monaSans.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('wazely-theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationJsonLd, websiteJsonLd],
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
