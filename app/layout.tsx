import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "intellibucket.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
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
      images: [{ url: new URL("/og.png", baseUrl).toString(), width: 1200, height: 630, alt: "IntelliBucket — Small software. Sharply made." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "IntelliBucket — Small software, sharply made",
      description: "Focused apps for the little moments technology should handle better.",
      images: [new URL("/og.png", baseUrl).toString()],
    },
    icons: {
      icon: [{ url: "/logo-mark.png", type: "image/png" }],
      shortcut: "/logo-mark.png",
      apple: "/logo-mark.png",
    },
  };
}

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
