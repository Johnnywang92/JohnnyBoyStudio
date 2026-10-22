"use client";

import React from "react";
import { useLang } from "@/components/LanguageProvider";
import { getPhilosophyList } from "@/data/studioData";
import { Flame, Apple, Gauge, ShieldCheck, Sparkles } from "lucide-react";

export default function Philosophy() {
  const { t, locale } = useLang();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-5 h-5 text-orange-400" />;
      case "Apple":
        return <Apple className="w-5 h-5 text-zinc-100" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-emerald-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="philosophy" className="py-14 sm:py-20 relative border-t border-white/5 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-mono mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>BUILT FOR MYSELF · VIBECODING CRAFT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t("为什么而造？自用驱动的开发哲学", "Why build? A self-driven development philosophy")}
          </h2>
          <p className="text-xs sm:text-base text-zinc-400 mt-2 sm:mt-3 leading-relaxed px-2">
            {t("从自己日常使用最真实的痛点出发，用 Vibecoding 把灵感亲手打造成每天都想用的趁手工具。", "Starting from the most real pain points of my own daily use, I turn ideas by hand into tools I want to use every day, with Vibecoding.")}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {getPhilosophyList(locale).map((item, idx) => (
            <div
              key={idx}
              className="group p-5 sm:p-8 rounded-3xl glass-card relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-white/20 transition-all duration-300">
                  {getIcon(item.icon)}
                </div>

                <div className="text-xs font-mono text-zinc-500 mb-1">
                  {item.subtitle}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Core Value #{idx + 1}</span>
                <span className="text-zinc-600">●●●</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
