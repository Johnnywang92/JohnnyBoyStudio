import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { getLocale } from "@/lib/i18n-server";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#08080c",
};

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getLocale()) === "en";
  return {
  metadataBase: new URL("https://johnnyboystudio.com"),
  title: en ? "JohnnyBoyStudio | A workshop of apps built for my own needs" : "JohnnyBoyStudio | 因自身所需而造的专属应用工坊",
  description: en
    ? "Not chasing the market, just fixing my own daily pain points. Crafting sharp, snappy native Mac and iOS tools with modern Vibecoding and a hacker spirit."
    : "不为迎合市场，只为解决自己的高频痛点。以现代 Vibecoding 与极客动手精神，定制利落顺手的 Mac 与 iOS 原生好工具。",
  keywords: ["macOS", "iOS", "App Developer", "Indie Hacker", "JohnnyBoyStudio", "QuickPick", "assistan01", "Ferry"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "JohnnyBoyStudio | Mac & iOS App Studio",
    description: "Crafting delightful native macOS and iOS experiences with vibecoding magic.",
    url: "https://johnnyboystudio.com",
    siteName: "JohnnyBoyStudio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JohnnyBoyStudio - Mac & iOS App Studio",
      },
    ],
    locale: en ? "en_US" : "zh_CN",
    type: "website",
  },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale === "en" ? "en" : "zh-CN"} className="scroll-smooth dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-[#08080c] text-zinc-100 antialiased selection:bg-[#FF5A1F]/30 selection:text-[#FF5A1F]">
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
