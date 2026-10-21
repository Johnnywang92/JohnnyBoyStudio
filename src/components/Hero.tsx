"use client";

import React, { useState } from "react";
import { studioInfo } from "@/data/studioData";
import ConfettiButton from "./ConfettiButton";
import { GithubIcon } from "./SocialIcons";
import {
  ArrowDown,
  Sparkles,
  Camera,
  Compass,
  Heart,
  Terminal,
} from "lucide-react";

export default function Hero() {
  const [activeDockItem, setActiveDockItem] = useState<string | null>(null);

  const dockApps = [
    {
      id: "quickpick",
      name: "QuickPick（极选）",
      tag: "专业摄影极速选片",
      icon: <Camera className="w-5 h-5 text-amber-400" />,
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      id: "assistan01",
      name: "小助（Assistant）",
      tag: "iPhone 离线生活助理",
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
      id: "ferry",
      name: "Ferry",
      tag: "macOS SFTP 客户端",
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      id: "wedding",
      name: "首映礼婚礼 RSVP",
      tag: "电影主题数字请柬",
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      id: "vibecoding",
      name: "JohnnyBoyStudio",
      tag: "品牌核心工坊",
      icon: <img src="/brand/logo/logo-mark.svg" alt="JohnnyBoyStudio" className="w-5 h-5 rounded" />,
      color: "from-orange-500/20 to-amber-500/20",
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 animate-fade-in shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-zinc-300">
            {studioInfo.badge}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          <span>JohnnyBoy</span>
          <span className="text-vibe-gradient">Studio</span>
          <br />
          <span className="text-apple-gradient text-3xl sm:text-5xl lg:text-6xl font-bold mt-2 block">
            为苹果生态，雕琢有灵魂的原生应用
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {studioInfo.subTagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-200 active:scale-95"
          >
            <span>探索产品作品</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={studioInfo.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 font-medium text-sm border border-white/10 transition-all duration-200 active:scale-95"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <ConfettiButton label="Vibe Spark" />
        </div>

        {/* Interactive macOS Dock */}
        <div className="max-w-md mx-auto">
          <div className="relative p-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-2xl flex items-center justify-center gap-2 sm:gap-3">
            {dockApps.map((app) => (
              <div
                key={app.id}
                onMouseEnter={() => setActiveDockItem(app.id)}
                onMouseLeave={() => setActiveDockItem(null)}
                className="relative group"
              >
                {/* Tooltip */}
                {activeDockItem === app.id && (
                  <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-[11px] font-medium text-zinc-200 whitespace-nowrap shadow-lg pointer-events-none z-20">
                    <span className="font-semibold">{app.name}</span>
                    <span className="text-zinc-500 ml-1">· {app.tag}</span>
                  </div>
                )}

                <a
                  href="#products"
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${app.color} border border-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-110 active:scale-95 shadow-md`}
                >
                  {app.icon}
                </a>

                {/* Dock indicator dot */}
                <div className="w-1 h-1 rounded-full bg-zinc-400 mx-auto mt-1 opacity-70 group-hover:bg-white group-hover:opacity-100" />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 font-mono">
            macOS Dock 风格随行控制台 · 点击直达详情
          </p>
        </div>

        {/* Studio Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/5">
          {studioInfo.stats.map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-2xl bg-white/[0.01]">
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
