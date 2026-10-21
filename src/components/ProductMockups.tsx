"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Smartphone,
  Laptop,
  Heart,
  Calendar,
  Camera,
  Sliders,
  CheckCircle2,
  Film,
  Layers,
  ShieldCheck,
  Package,
  Mic,
  Lock,
  Wallet,
  Server,
  Folder,
  ArrowRight,
  Ticket,
  QrCode,
  Radio,
  FileCode,
} from "lucide-react";

export function QuickpickMockup() {
  const [gridMode, setGridMode] = useState<"thirds" | "spiral" | "none">("thirds");
  const [lutEnabled, setLutEnabled] = useState(true);
  const [frameMode, setFrameMode] = useState(false);
  const [selected, setSelected] = useState(true);

  const cycleGrid = () => {
    if (gridMode === "thirds") setGridMode("spiral");
    else if (gridMode === "spiral") setGridMode("none");
    else setGridMode("thirds");
  };

  return (
    <div className="w-full bg-zinc-950/95 rounded-2xl border border-white/10 p-3 shadow-2xl backdrop-blur-xl font-sans text-xs select-none">
      {/* macOS Window Title Bar */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] text-zinc-400 ml-2 font-mono flex items-center gap-1">
            <Camera className="w-3 h-3 text-amber-400" />
            <span>QuickPick 极选 · DSC04892.ARW</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
            <ShieldCheck className="w-3 h-3" />
            <span>100% 只读安全</span>
          </span>
        </div>
      </div>

      {/* Main Viewport / Canvas Simulator */}
      <div
        className={`relative w-full h-44 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center transition-all duration-300 ${
          frameMode
            ? "bg-stone-100 text-stone-900 p-3 shadow-inner"
            : lutEnabled
            ? "bg-gradient-to-tr from-amber-950/80 via-zinc-900 to-indigo-950/80"
            : "bg-zinc-900"
        }`}
      >
        <div className="relative w-full h-full flex flex-col justify-between p-3 z-10">
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-md ${
                frameMode
                  ? "bg-stone-900/10 text-stone-700 font-semibold"
                  : "bg-black/60 text-zinc-300 border border-white/10"
              }`}
            >
              Sony A7R V · 35mm F1.4 GM · 1/800s ƒ/1.4 ISO 100
            </span>

            <div className="flex items-center gap-1">
              {lutEnabled && (
                <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded backdrop-blur-md">
                  LUT: Portra 400
                </span>
              )}
              {selected && (
                <span className="flex items-center gap-0.5 text-[9px] font-semibold bg-emerald-500 text-white px-1.5 py-0.5 rounded shadow">
                  <CheckCircle2 className="w-2.5 h-2.5" /> 已选入
                </span>
              )}
            </div>
          </div>

          {gridMode === "thirds" && !frameMode && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-amber-400/20">
              <div className="border-r border-b border-amber-400/30 relative">
                <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-black" />
              </div>
              <div className="border-r border-b border-amber-400/30 relative">
                <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-black" />
              </div>
              <div className="border-b border-amber-400/30" />
              <div className="border-r border-b border-amber-400/30 relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-black" />
              </div>
              <div className="border-r border-b border-amber-400/30 relative">
                <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-black" />
              </div>
              <div className="border-b border-amber-400/30" />
              <div className="border-r border-amber-400/30" />
              <div className="border-r border-amber-400/30" />
              <div />
            </div>
          )}

          {gridMode === "spiral" && !frameMode && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-full text-amber-400/50" viewBox="0 0 100 100">
                <path
                  d="M 10 90 A 80 80 0 0 1 90 10 A 50 50 0 0 1 40 60 A 30 30 0 0 1 70 30 A 18 18 0 0 1 52 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
          )}

          <div className="my-auto text-center pointer-events-none">
            <span
              className={`text-xs font-serif tracking-widest uppercase ${
                frameMode ? "text-stone-800" : "text-white/80"
              }`}
            >
              {frameMode ? "JohnnyBoy Studio · Fine Art Frame" : "6100 万全画幅 RAW 细节无损预览"}
            </span>
            <div
              className={`text-[10px] mt-0.5 ${
                frameMode ? "text-stone-500" : "text-zinc-400"
              }`}
            >
              闭眼检测 0 · 锐度方差 98.4 (精准合焦)
            </div>
          </div>

          {frameMode && (
            <div className="flex items-end justify-between pt-1 border-t border-stone-300/80 text-[9px] text-stone-600 font-serif">
              <span>LEICA / SONY MISTERIO</span>
              <span className="font-mono">F1.4 · 1/800s · ISO 100</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-1.5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button
            onClick={cycleGrid}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition-all ${
              gridMode !== "none"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10"
            }`}
            title="按 O 切换构图参考线"
          >
            <Layers className="w-3 h-3" />
            <span>
              构图线: {gridMode === "thirds" ? "三分法" : gridMode === "spiral" ? "黄金螺旋" : "关"}
            </span>
          </button>

          <button
            onClick={() => setFrameMode(!frameMode)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition-all ${
              frameMode
                ? "bg-white text-zinc-950 border-white font-semibold"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10"
            }`}
            title="按 E 切换艺术相框"
          >
            <Sliders className="w-3 h-3" />
            <span>EXIF 相框</span>
          </button>

          <button
            onClick={() => setLutEnabled(!lutEnabled)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition-all ${
              lutEnabled
                ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10"
            }`}
            title="按 L 开关 3D LUT"
          >
            <Film className="w-3 h-3" />
            <span>3D LUT</span>
          </button>
        </div>

        <button
          onClick={() => setSelected(!selected)}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
            selected
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
          title="按 Space 选入或剔除"
        >
          {selected ? "已保留 [Space]" : "剔除 [Space]"}
        </button>
      </div>

      <div className="mt-2 text-[10px] text-zinc-500 flex items-center justify-between font-mono px-0.5">
        <span>快捷键: [O] 构图 [E] 相框 [L] 调色 [Space] 挑选</span>
        <span className="text-amber-400/80">Tauri + Rust + Pixi.js</span>
      </div>
    </div>
  );
}

export function Assistan01Mockup() {
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [packagePicked, setPackagePicked] = useState(false);

  return (
    <div className="w-full bg-zinc-950/90 rounded-2xl border border-white/10 p-3.5 shadow-2xl backdrop-blur-xl select-none">
      {/* Dynamic Island Container */}
      <div
        onClick={() => setIslandExpanded(!islandExpanded)}
        className="cursor-pointer transition-all duration-300 mx-auto bg-black rounded-full border border-zinc-800 px-3.5 py-2 max-w-[310px] hover:border-indigo-500/50 shadow-lg"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-indigo-200 font-medium text-[11px] font-mono">小助 · Live Activity</span>
          </div>

          <div className="flex items-center gap-2">
            {!packagePicked ? (
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                <Package className="w-2.5 h-2.5" /> 取件码 4-2-3088
              </span>
            ) : (
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> 已取件销号
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-1 text-[10px] text-zinc-500">
        轻触展开 / 折叠灵动岛（全场景免掏手机闭环）
      </div>

      {/* Expanded Modules Grid */}
      <div
        className={`mt-2.5 space-y-2 transition-all duration-300 ${
          islandExpanded ? "scale-100 opacity-100" : "scale-98 opacity-95"
        }`}
      >
        {/* Module 1: Package Live Activity */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <span>菜鸟驿站地理围栏到达</span>
                <span className="text-[9px] text-zinc-500 bg-white/5 px-1 rounded">实时活动</span>
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                丰巢/驿站取件码: <span className="text-amber-300 font-bold">4-2-3088</span> (顺丰速运)
              </div>
            </div>
          </div>

          <button
            onClick={() => setPackagePicked(!packagePicked)}
            className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
              packagePicked
                ? "bg-zinc-800 text-zinc-400"
                : "bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold"
            }`}
          >
            {packagePicked ? "撤销" : "抬腕已取"}
          </button>
        </div>

        {/* Module 2: Budget & Voice Assistant */}
        <div className="grid grid-cols-2 gap-2">
          {/* Wallet */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center justify-between text-zinc-400 text-[10px]">
              <span className="flex items-center gap-1 font-medium">
                <Wallet className="w-3 h-3 text-emerald-400" /> 今日安心花
              </span>
              <span className="text-emerald-400 font-mono font-semibold">充裕</span>
            </div>
            <div className="text-sm font-bold text-zinc-100 font-mono mt-1">¥ 186.50</div>
            <div className="text-[9px] text-zinc-500 mt-0.5">口语一句话记账自动扣减</div>
          </div>

          {/* Offline ASR & Privacy Vault */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center justify-between text-zinc-400 text-[10px]">
              <span className="flex items-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-indigo-400" /> Face ID 保险箱
              </span>
              <span className="text-indigo-400 font-mono">已锁定</span>
            </div>
            <div className="text-[11px] font-semibold text-zinc-200 mt-1 flex items-center gap-1">
              <Mic className="w-3 h-3 text-pink-400" /> 悬浮离线语音球
            </div>
            <div className="text-[9px] text-zinc-500 mt-0.5">端侧 LlamaSwift 推理</div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-500 px-1 font-mono">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> iOS 18+ · 纯离线无网络依赖
        </span>
        <span>SwiftData 零泄漏</span>
      </div>
    </div>
  );
}

export function FerryMockup() {
  const [syncing, setSyncing] = useState(false);
  const [viewMode, setViewMode] = useState<"dual" | "diff">("dual");

  return (
    <div className="w-full bg-zinc-950/90 rounded-2xl border border-white/10 p-3.5 shadow-2xl backdrop-blur-xl select-none font-sans">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-zinc-200">Ferry · macOS 现代化 SFTP/FTP 客户端</span>
        </div>
        <span className="text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full font-mono">
          Swift 6 严格并发 · 零数据丢失
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-2">
        <button
          onClick={() => setViewMode("dual")}
          className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
            viewMode === "dual"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          AppKit 原生双栏文件树
        </button>
        <button
          onClick={() => setViewMode("diff")}
          className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
            viewMode === "diff"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          3-Way 同步与 DiffPlan 决策
        </button>
      </div>

      {viewMode === "dual" ? (
        <>
          {/* Dual Pane Interface Simulator */}
          <div className="grid grid-cols-2 gap-2 my-2 text-xs">
            {/* Left Pane: Local Mac */}
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5 pb-1 border-b border-white/5">
                <span className="font-mono text-zinc-300 flex items-center gap-1">
                  <Laptop className="w-3 h-3 text-cyan-400" /> 本地 Mac (AppKit)
                </span>
                <span className="text-zinc-500 font-mono">~/workspace</span>
              </div>
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex items-center justify-between text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded">
                  <span className="flex items-center gap-1">
                    <FileCode className="w-2.5 h-2.5 text-orange-400" /> App.pkg
                  </span>
                  <span className="text-zinc-500">142MB</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 px-1.5 py-0.5">
                  <span className="flex items-center gap-1">
                    <Folder className="w-2.5 h-2.5 text-amber-400" /> Assets/
                  </span>
                  <span className="text-zinc-500">12项</span>
                </div>
              </div>
            </div>

            {/* Right Pane: Remote SFTP Server */}
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5 pb-1 border-b border-white/5">
                <span className="font-mono text-cyan-300 flex items-center gap-1">
                  <Server className="w-3 h-3" /> 远端 Linux (SFTP)
                </span>
                <span className="text-zinc-500 font-mono">/var/www/prod</span>
              </div>
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex items-center justify-between text-cyan-200 bg-cyan-950/40 border border-cyan-800/30 px-1.5 py-0.5 rounded">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> release_v1.tar
                  </span>
                  <span className="text-emerald-400">已就绪</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 px-1.5 py-0.5">
                  <span className="flex items-center gap-1">
                    <Folder className="w-2.5 h-2.5 text-blue-400" /> logs/
                  </span>
                  <span className="text-zinc-500">8.4MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Concurrent Transfer Progress Bar */}
          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1 font-mono">
              <span className="flex items-center gap-1 text-cyan-300">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>并发传输队列 (3/3) · 48.6 MB/s</span>
              </span>
              <span className="text-emerald-400 font-semibold">Keychain 钥匙串已解密</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-4/5 rounded-full animate-pulse" />
            </div>
          </div>
        </>
      ) : (
        /* DiffPlan Preview Simulator */
        <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-white/10 my-2 text-xs font-mono">
          <div className="text-[10px] text-cyan-300 font-bold mb-2 flex items-center justify-between border-b border-white/5 pb-1">
            <span>DiffPlan 审计快照 · 绝不静默覆盖</span>
            <span className="text-zinc-500 font-normal">真值表判定已就绪</span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between p-1 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
              <span>⬆️ 上行同步: config.json (本地较新)</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20">覆盖远端</span>
            </div>
            <div className="flex items-center justify-between p-1 rounded bg-blue-950/30 border border-blue-500/20 text-blue-300">
              <span>⬇️ 下行拉取: server_report.csv (远端新增)</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-500/20">下载入本地</span>
            </div>
            <div className="flex items-center justify-between p-1 rounded bg-amber-950/30 border border-amber-500/20 text-amber-300">
              <span>⚠️ 冲突拦截: index.html (双端同时被修改)</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 font-bold">保留双份</span>
            </div>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => {
          setSyncing(true);
          setTimeout(() => setSyncing(false), 1200);
        }}
        className="mt-2 w-full py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>{syncing ? "严格防御传输中..." : "模拟并发传输 App.pkg 到远端"}</span>
        <ArrowRight className={`w-3 h-3 ${syncing ? "translate-x-1" : ""}`} />
      </button>
    </div>
  );
}

export function WeddingMockup() {
  const [hearts, setHearts] = useState(36);
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
    <div className="w-full bg-gradient-to-b from-rose-950/40 via-zinc-950 to-zinc-950 rounded-2xl border border-rose-500/20 p-3.5 shadow-2xl backdrop-blur-xl select-none font-sans">
      {/* Wedding Header Tag */}
      <div className="flex items-center justify-between pb-2 border-b border-rose-500/10 text-xs">
        <span className="text-[10px] tracking-widest uppercase text-rose-300/90 font-serif flex items-center gap-1">
          <Ticket className="w-3 h-3 text-rose-400" />
          <span>电影首映礼主题 RSVP 系统</span>
        </span>
        <span className="text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
          Vue 3 + Flask + PWA
        </span>
      </div>

      {/* Cinema Ticket Card Simulator */}
      <div className="my-2.5 p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-rose-300/80 font-serif">
            PREMIERE TICKET · 专属电子票根
          </div>
          <h4 className="text-sm font-serif font-bold text-rose-100 tracking-wide mt-0.5">
            Johnny &amp; Grace · 浪漫首映礼
          </h4>
          <p className="text-[10px] text-zinc-400 mt-1">
            三幕自动轮播故事画廊 · 专属 QR 凭证
          </p>
        </div>

        {/* QR Code Simulation */}
        <div className="w-14 h-14 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
          <QrCode className="w-full h-full text-zinc-900" />
        </div>
      </div>

      {/* Cloud Wishes & Offline status */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>时空胶囊云祝福墙 · Service Worker 离线守护</span>
        </div>
        <button
          onClick={toggleHeart}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
            liked
              ? "bg-rose-500 text-white border-rose-400 scale-105 shadow-md"
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
