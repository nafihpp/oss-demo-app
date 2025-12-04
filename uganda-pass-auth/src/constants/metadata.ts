import type { Metadata } from "next";

/**
 * Global metadata — structured for SEO, social sharing, and app store previews.
 * This makes the app resilient and future-proof.
 */
export const const_metadata: Metadata = {
  title: "X Pass - AlphaX Secure Digital Identity",
  description: "X Pass provides a secure, seamless digital identity authentication system.",
  keywords: ["X Pass", "Digital Identity", "Authentication", "AlphaX", "Secure Login"],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "X Pass - AlphaX Secure Digital Identity",
    description: "Authenticate securely using X Pass by AlphaX.",
    url: "https://ug-gov-portal.vercel.app",
    siteName: "X Pass",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "X Pass Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Pass - AlphaX Secure Digital Identity",
    description: "Authenticate securely with X Pass.",
    images: ["/twitter-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#000000",
};