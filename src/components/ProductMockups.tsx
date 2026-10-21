"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Laptop,
  ArrowRightLeft,
  Heart,
  Volume2,
  Calendar,
} from "lucide-react";

export function QuickpickMockup() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const items = [
    { type: "color", label: "#6366F1", detail: "Indigo Accent", badge: "Color" },
    { type: "code", label: "struct Studio: App", detail: "SwiftUI Entry", badge: "Swift" },
    { type: "link", label: "johnnyboy.studio", detail: "Studio URL", badge: "Link" },
  ];

  const handleCopy = (index: number) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="w-full bg-zinc-950/90 rounded-2xl border border-white/10 p-3.5 shadow-2xl backdrop-blur-xl font-mono text-xs select-none">
      {/* Menubar Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Quickpick 快捷坞 · ⌘⌥V</span>
        </div>
        <div className="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded bg-white/5">14MB</div>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 mb-2.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400">
        <span className="text-zinc-500">🔍</span>
        <span className="text-zinc-300 font-sans text-xs">搜索或一键粘贴...</span>
        <span className="ml-auto text-[10px] text-zinc-600 bg-white/5 px-1 rounded">↵</span>
      </div>

      {/* Snippet List */}
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleCopy(idx)}
            className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              {item.type === "color" && (
                <div className="w-4 h-4 rounded bg-[#6366f1] ring-1 ring-white/20" />
              )}
              {item.type === "code" && (
                <div className="w-4 h-4 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px]">
                  &lt;&gt;
                </div>
              )}
              {item.type === "link" && (
                <div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">
                  ↗
                </div>
              )}
              <div>
                <div className="text-zinc-200 group-hover:text-amber-300 transition-colors font-medium">
                  {item.label}
                </div>
                <div className="text-[10px] text-zinc-500 font-sans">{item.detail}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-800/80">
                {item.badge}
              </span>
              <button
                className="p-1 rounded text-zinc-400 group-hover:text-zinc-200"
                title="点击复制"
              >
                {copiedIndex === idx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Assistan01Mockup() {
  const [islandExpanded, setIslandExpanded] = useState(false);

  return (
    <div className="w-full bg-zinc-950/90 rounded-2xl border border-white/10 p-3.5 shadow-2xl backdrop-blur-xl select-none">
      {/* Dynamic Island Container */}
      <div
        onClick={() => setIslandExpanded(!islandExpanded)}
        className="cursor-pointer transition-all duration-300 mx-auto bg-black rounded-full border border-zinc-800 px-3.5 py-1.5 max-w-[280px] hover:border-indigo-500/40"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-indigo-200 font-medium text-[11px]">assistan01</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-indigo-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-purple-400 rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-150" />
            </div>
            <Volume2 className="w-3 h-3 text-zinc-500" />
          </div>
        </div>
      </div>

      <div className="text-center mt-1 text-[10px] text-zinc-500">
        轻触模拟灵动岛展开 / 折叠
      </div>

      {/* Expanded Context Card */}
      <div
        className={`mt-3 p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 transition-all duration-300 ${
          islandExpanded ? "scale-100 opacity-100" : "scale-98 opacity-90"
        }`}
      >
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-200">智能上下文提醒</span>
              <span className="text-[10px] text-indigo-400 flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" /> 15:00
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
              Johnny，检测到 Swift 构建已通过。需要同步唤起 TestFlight 并通知测试组吗？
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-[10px] font-medium text-white transition-colors">
                一键自动化流转
              </button>
              <button className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] text-zinc-400 transition-colors">
                稍后提醒
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-500 px-1">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> CoreML 离线端侧引擎
        </span>
        <span>隐私零回传</span>
      </div>
    </div>
  );
}

export function FerryMockup() {
  const [transferring, setTransferring] = useState(false);

  return (
    <div className="w-full bg-zinc-950/90 rounded-2xl border border-white/10 p-3.5 shadow-2xl backdrop-blur-xl select-none">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-medium text-zinc-200">Ferry 局域渡口</span>
        </div>
        <span className="text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
          千兆局域 P2P 直连
        </span>
      </div>

      {/* Device connection diagram */}
      <div className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-950/20 via-zinc-900/60 to-blue-950/20 border border-white/5 flex items-center justify-between">
        {/* Device 1: Mac */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400 shadow-inner">
            <Laptop className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-zinc-200">MacBook M3</span>
          <span className="text-[9px] text-zinc-500">局域网主机</span>
        </div>

        {/* Transfer animation bridge */}
        <div className="flex-1 px-3 flex flex-col items-center">
          <div className="text-[10px] font-mono text-cyan-300 mb-1 flex items-center gap-1">
            <span>92.4 MB/s</span>
            <span className="text-zinc-600">·</span>
            <span className="text-emerald-400">极速</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-3/4 rounded-full animate-pulse" />
          </div>
          <div className="text-[9px] text-zinc-500 mt-1">Design_Tokens.swift</div>
        </div>

        {/* Device 2: iPhone */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-blue-400 shadow-inner">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-zinc-200">iPhone 16 Pro</span>
          <span className="text-[9px] text-zinc-500">已就绪</span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={() => {
          setTransferring(true);
          setTimeout(() => setTransferring(false), 1200);
        }}
        className="mt-2.5 w-full py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>{transferring ? "正在渡运数据包..." : "模拟拖放文件直传"}</span>
        <ArrowRightLeft className={`w-3 h-3 ${transferring ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}

export function WeddingMockup() {
  const [hearts, setHearts] = useState(28);
  const [liked, setLiked] = useState(false);

  const toggleHeart = () => {
    if (!liked) {
      setHearts(hearts + 1);
      setLiked(true);
    } else {
      setHearts(hearts - 1);
      setLiked(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-rose-950/30 via-zinc-950 to-zinc-950 rounded-2xl border border-rose-500/20 p-3.5 shadow-2xl backdrop-blur-xl select-none">
      {/* Wedding Header Tag */}
      <div className="text-center pb-2 border-b border-rose-500/10">
        <span className="text-[10px] tracking-widest uppercase text-rose-300/80 font-serif">
          Save the Date · 专属婚礼请柬空间
        </span>
      </div>

      {/* Main Invitation Card Content */}
      <div className="my-2.5 p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/15 text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 mb-1.5">
          <Heart className="w-4 h-4 fill-rose-500/40" />
        </div>
        <h4 className="text-sm font-serif font-medium text-rose-100 tracking-wide">
          Johnny &amp; Grace
        </h4>
        <p className="text-[10px] text-zinc-400 mt-1">
          两颗星轨的相遇，邀请您共赴浪漫誓约
        </p>

        <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] text-rose-300/90 font-mono">
          <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
            视差画卷故事
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
            实时祝福弹幕
          </span>
        </div>
      </div>

      {/* Guest interaction preview */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="text-[11px] text-zinc-400">“愿所爱长相伴，岁岁常欢愉”</span>
        <button
          onClick={toggleHeart}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
            liked
              ? "bg-rose-500 text-white border-rose-400 scale-105"
              : "bg-white/5 text-rose-300 border-rose-500/20 hover:bg-rose-500/10"
          }`}
        >
          <Heart className={`w-3 h-3 ${liked ? "fill-white" : ""}`} />
          <span>{hearts}</span>
        </button>
      </div>
    </div>
  );
}
