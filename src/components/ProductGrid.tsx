"use client";

import React, { useState } from "react";
import { products, Product } from "@/data/studioData";
import ProductCard from "./ProductCard";
import { Sparkles, Terminal } from "lucide-react";

export default function ProductGrid() {
  const [filter, setFilter] = useState<string>("ALL");

  const categories = [
    { key: "ALL", label: "全部作品" },
    { key: "macOS", label: "macOS 桌面" },
    { key: "iOS", label: "iOS 移动" },
    { key: "Web", label: "Web 交互" },
  ];

  const filteredProducts = products.filter((p) => {
    if (filter === "ALL") return true;
    return p.platforms.includes(filter as Product["platforms"][number]);
  });

  return (
    <section id="products" className="py-14 sm:py-20 relative content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CRAFTED APPS &amp; PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              精选独立作品集
            </h2>
            <p className="text-xs sm:text-base text-zinc-400 mt-2 max-w-xl">
              探索 JohnnyBoyStudio 针对 macOS、iOS 以及现代 Web 深度打磨的原生产品。
            </p>
          </div>

          {/* Filter Pills with Mobile Horizontal Scrolling */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md self-start md:self-auto overflow-x-auto max-w-full no-scrollbar touch-manipulation">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all touch-manipulation min-h-[36px] flex items-center justify-center ${
                  filter === cat.key
                    ? "bg-white text-zinc-900 shadow-md font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 active:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}

          {/* Incubation / Next Idea Card */}
          <div className="relative rounded-3xl p-6 sm:p-7 border border-dashed border-zinc-800 bg-zinc-950/40 flex flex-col justify-between items-center text-center group hover:border-zinc-700 transition-colors">
            <div className="my-auto py-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500 group-hover:text-amber-400 transition-colors">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">
                下一个 Vibecoding 灵感正在孵化...
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-2 leading-relaxed">
                更多基于 Swift 6、CoreML 本地模型与 VisionOS 交互的实验性项目正在开发中。欢迎提交灵感与协作建议。
              </p>
            </div>

            <div className="text-[10px] sm:text-[11px] font-mono text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full border border-white/5">
              status: active_coding · git commit daily
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
