"use client";

import React, { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { getStudioInfo } from "@/data/studioData";
import ConfettiButton from "./ConfettiButton";
import { GithubIcon } from "./SocialIcons";
import {
  ArrowDown,
  Sparkles,
  Camera,
  Compass,
  Heart,
} from "lucide-react";

export default function Hero() {
  const { t, locale } = useLang();
  const studioInfo = getStudioInfo(locale);
  const [activeDockItem, setActiveDockItem] = useState<string | null>(null);

  const dockApps = [
    {
      id: "quickpick",
      name: "QuickPick",
      tag: t("专业摄影选片", "Pro photo culling"),
      icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />,
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      id: "assistan01",
      name: t("小助", "Assistant"),
      tag: t("离线生活助理", "Offline life assistant"),
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />,
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
      id: "ferry",
      name: "Ferry",
      tag: t("SFTP 客户端", "SFTP client"),
      icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />,
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      id: "wedding",
      name: t("婚礼 RSVP", "Wedding RSVP"),
      tag: t("电影数字请柬", "Cinematic invitation"),
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />,
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      id: "vibecoding",
      name: t("工坊", "Studio"),
      tag: t("核心理念", "Philosophy"),
      icon: (
        <img
          src="/brand/logo/logo-mark.svg"
          alt="JohnnyBoyStudio"
          width={20}
          height={20}
          loading="eager"
          decoding="async"
          className="w-4 h-4 sm:w-5 sm:h-5 rounded"
        />
      ),
      color: "from-orange-500/20 to-amber-500/20",
    },
  ];

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden">
      {/* Optimized ambient background glows (scaled down on mobile for GPU speed) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] h-[200px] sm:h-[360px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-cyan-500/10 rounded-full blur-[60px] sm:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-6 sm:right-10 w-44 sm:w-72 h-44 sm:h-72 bg-amber-500/10 rounded-full blur-[50px] sm:blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 sm:mb-8 shadow-lg max-w-full">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-zinc-300 truncate">
            {studioInfo.badge}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-[1.18] sm:leading-[1.1]">
          <span>JohnnyBoy</span>
          <span className="text-[#FF5A1F]">Studio</span>
          <span className="text-apple-gradient text-xl sm:text-3xl lg:text-5xl font-bold mt-2 sm:mt-3 block tracking-normal">
            {t("因自身所需而造，做真正顺手的专属应用", "Built for my own needs — apps that fit like a glove")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal px-2">
          {studioInfo.subTagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10 sm:mb-14">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-200 active:scale-95 touch-manipulation min-h-[44px]"
          >
            <span>{t("探索产品作品", "Explore my work")}</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>

          <a
            href={studioInfo.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 font-medium text-xs sm:text-sm border border-white/10 transition-all duration-200 active:scale-95 touch-manipulation min-h-[44px]"
          >
            <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>GitHub</span>
          </a>

          <ConfettiButton label="Vibe Spark" />
        </div>

        {/* Interactive macOS Dock (Mobile Optimized) */}
        <div className="max-w-md mx-auto">
          <div className="relative p-1.5 sm:p-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center gap-1.5 sm:gap-3">
            {dockApps.map((app) => (
              <div
                key={app.id}
                onMouseEnter={() => setActiveDockItem(app.id)}
                onMouseLeave={() => setActiveDockItem(null)}
                className="relative group touch-manipulation"
              >
                {/* Tooltip */}
                {activeDockItem === app.id && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-lg bg-zinc-900 border border-white/10 text-[10px] font-medium text-zinc-200 whitespace-nowrap shadow-lg pointer-events-none z-20">
                    <span className="font-semibold">{app.name}</span>
                    <span className="text-zinc-500 ml-1">· {app.tag}</span>
                  </div>
                )}

                <a
                  href="#products"
                  aria-label={app.name}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${app.color} border border-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-110 active:scale-95 shadow-md`}
                >
                  {app.icon}
                </a>

                {/* Dock indicator dot */}
                <div className="w-1 h-1 rounded-full bg-zinc-400 mx-auto mt-1 opacity-70 group-hover:bg-white group-hover:opacity-100" />
              </div>
            ))}
          </div>
          <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-2 font-mono">
            {t("macOS Dock 控制台 · 轻触直达作品详情", "macOS Dock console · tap to jump to details")}
          </p>
        </div>

        {/* Studio Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/5">
          {studioInfo.stats.map((stat, i) => (
            <div key={i} className="text-center p-2.5 sm:p-3 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
              <div className="text-lg sm:text-2xl font-bold text-white font-mono">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
