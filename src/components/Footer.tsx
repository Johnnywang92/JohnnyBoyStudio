"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studioInfo } from "@/data/studioData";
import { ArrowUp, Heart, Terminal } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getResolvedHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <footer className="py-10 sm:py-12 border-t border-white/5 bg-zinc-950/40 text-xs text-zinc-500 pb-[max(2rem,calc(env(safe-area-inset-bottom)+1rem))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
              <img
                src="/brand/logo/logo-mark.svg"
                alt="JohnnyBoyStudio"
                width={20}
                height={20}
                loading="lazy"
                decoding="async"
                className="w-5 h-5 rounded-md"
              />
              <span>{studioInfo.name}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[11px] font-mono text-zinc-500 font-normal">
                Indie App Studio
              </span>
            </div>
            <p className="mt-1 text-zinc-500">
              Crafted with <Heart className="w-3 h-3 inline text-rose-500 fill-rose-500 mx-0.5" /> and modern Vibecoding.
            </p>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href={getResolvedHref("#products")}
              className="py-1 px-1.5 hover:text-zinc-300 transition-colors touch-manipulation min-h-[36px] flex items-center"
            >
              精选作品
            </Link>
            <Link
              href={getResolvedHref("#philosophy")}
              className="py-1 px-1.5 hover:text-zinc-300 transition-colors touch-manipulation min-h-[36px] flex items-center"
            >
              开发理念
            </Link>
            <Link
              href="/blog"
              className="py-1 px-1.5 hover:text-white text-zinc-400 font-medium transition-colors touch-manipulation min-h-[36px] flex items-center"
            >
              工坊手记
            </Link>
            <Link
              href={getResolvedHref("#tech-stack")}
              className="py-1 px-1.5 hover:text-zinc-300 transition-colors touch-manipulation min-h-[36px] flex items-center"
            >
              技术栈
            </Link>
            <a
              href={studioInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="py-1 px-1.5 hover:text-zinc-300 transition-colors touch-manipulation min-h-[36px] flex items-center"
            >
              GitHub
            </a>
            <a
              href={studioInfo.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="py-1 px-1.5 hover:text-zinc-300 transition-colors touch-manipulation min-h-[36px] flex items-center"
            >
              Twitter / X
            </a>
          </div>

          {/* Right Back to Top & Time */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 font-mono text-[11px]">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>v1.0.0 · 2026</span>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors touch-manipulation"
              title="返回顶部"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.03] text-center text-[11px] text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} JohnnyBoyStudio. All rights reserved.</div>
          <div className="font-mono">
            QuickPick · assistan01 · Ferry · Wedding
          </div>
        </div>
      </div>
    </footer>
  );
}
