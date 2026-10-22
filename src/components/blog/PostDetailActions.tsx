"use client";

import React, { useState, useEffect } from "react";
import { useLang } from "@/components/LanguageProvider";
import { Copy, Check, ArrowLeft } from "lucide-react";
import { TwitterXIcon } from "@/components/SocialIcons";
import Link from "next/link";

interface PostDetailActionsProps {
  title: string;
}

export default function PostDetailActions({ title }: PostDetailActionsProps) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`《${title}》 - JohnnyBoyStudio`);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-[#FF5A1F] via-amber-400 to-[#FF5A1F] z-[60] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4 py-4 border-y border-white/5 my-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t("返回全部文章", "All posts")}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all border border-white/5"
            aria-label={t("复制文章链接", "Copy post link")}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t("链接已复制", "Link copied")}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t("复制链接", "Copy link")}</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareTwitter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all border border-white/5"
            aria-label={t("分享到 X / Twitter", "Share on X / Twitter")}
          >
            <TwitterXIcon className="w-3.5 h-3.5" />
            <span>{t("分享", "Share")}</span>
          </button>
        </div>
      </div>
    </>
  );
}
