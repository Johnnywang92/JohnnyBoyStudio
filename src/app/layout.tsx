import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JohnnyBoyStudio | Mac & iOS App Studio",
  description: "Crafting delightful native macOS and iOS experiences with vibecoding magic.",
  keywords: ["macOS", "iOS", "App Developer", "Indie Hacker", "JohnnyBoyStudio", "Quickpick", "assistan01", "Ferry"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth dark">
      <body className="min-h-screen bg-[#08080a] text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
