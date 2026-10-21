import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://johnnyboystudio.com"),
  title: "JohnnyBoyStudio | 因自身所需而造的专属应用工坊",
  description: "不为迎合市场，只为解决自己的高频痛点。以现代 Vibecoding 与极客动手精神，定制利落顺手的 Mac 与 iOS 原生好工具。",
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
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FF5A1F" />
      </head>
      <body className="min-h-screen bg-[#08080a] text-zinc-100 antialiased selection:bg-[#FF5A1F]/30 selection:text-[#FF5A1F]">
        {children}
      </body>
    </html>
  );
}
