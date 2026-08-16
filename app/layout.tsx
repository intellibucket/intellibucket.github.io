import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07130f",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://intellibucket.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "IntelliBucket", template: "%s — IntelliBucket" },
  description: "Focused mobile apps and desktop tools from IntelliBucket.",
  applicationName: "IntelliBucket",
  authors: [{ name: "IntelliBucket", url: "https://intellibucket.com" }],
  creator: "IntelliBucket",
  openGraph: {
    type: "website",
    siteName: "IntelliBucket",
    title: "IntelliBucket — Small software, sharply made",
    description: "Focused apps for the little moments technology should handle better.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "IntelliBucket — Small software. Sharply made." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliBucket — Small software, sharply made",
    description: "Focused apps for the little moments technology should handle better.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/logo-mark.png", type: "image/png" }],
    shortcut: "/logo-mark.png",
    apple: "/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
