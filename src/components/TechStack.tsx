"use client";

import React from "react";
import { techStackCategories } from "@/data/studioData";
import { Layers, Cpu, Code2, Network } from "lucide-react";

export default function TechStack() {
  const getCategoryIcon = (category: string) => {
    if (category.includes("Apple")) return <Cpu className="w-4 h-4 text-zinc-100" />;
    if (category.includes("Web")) return <Code2 className="w-4 h-4 text-cyan-400" />;
    return <Network className="w-4 h-4 text-indigo-400" />;
  };

  return (
    <section id="tech-stack" className="py-14 sm:py-20 relative border-t border-white/5 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE TOOLCHAIN &amp; STACK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            技术栈与工程武器库
          </h2>
          <p className="text-xs sm:text-base text-zinc-400 mt-2 sm:mt-3 leading-relaxed px-2">
            以 Apple 现代化语言体系为基石，融合前沿 Web 响应式架构与底层网络通信。
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {techStackCategories.map((cat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-3xl glass-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="text-base font-bold text-white">{cat.category}</h3>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="text-sm font-semibold text-zinc-200 font-mono">
                        {item.name}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 text-[11px] text-zinc-500 font-mono">
                verified in production
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
