// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Aurixa Capital — Investment & Asset Management",
  description:
    "Building Wealth. Creating Assets. Securing Your Future. Aurixa Capital offers strategic real estate investment, capital management, property management, and international investment advisory across India, Dubai, Singapore, Europe, and Malaysia.",
  keywords: [
    "investment",
    "asset management",
    "real estate",
    "Aurixa Capital",
    "property management",
    "NRI investment",
    "Dubai real estate",
    "mutual funds",
    "wealth management India",
  ],
  authors: [{ name: "Aurixa Capital" }],
  openGraph: {
    title: "Aurixa Capital — Investment & Asset Management",
    description: "Strategic Investments. Smarter Decisions. Stronger Futures.",
    url: "https://aurixacapital.in",
    siteName: "Aurixa Capital",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurixa Capital — Investment & Asset Management",
    description: "Strategic Investments. Smarter Decisions. Stronger Futures.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0A08",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — preconnect + stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aurixa Capital",
              url: "https://aurixacapital.in",
              description:
                "Investment and asset management company offering real estate investment, capital management, property management, and international advisory services.",
              telephone: "+919916077741",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://instagram.com/aurixacapital",
                "https://facebook.com/aurixacapital",
              ],
            }),
          }}
        />
      </head>
      <body>
        {/* Film grain texture overlay — fixed, pointer-events none */}
        <div className="film-grain" aria-hidden="true" />

        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
