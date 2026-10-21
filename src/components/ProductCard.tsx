"use client";

import React from "react";
import { Product } from "@/data/studioData";
import {
  QuickpickMockup,
  Assistan01Mockup,
  FerryMockup,
  WeddingMockup,
} from "./ProductMockups";
import { GithubIcon } from "./SocialIcons";
import {
  ExternalLink,
  CheckCircle2,
  Apple,
  Globe,
  Smartphone,
  Sparkles,
  Zap,
  Compass,
  Heart,
  Camera,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderMockup = () => {
    switch (product.mockupType) {
      case "quickpick-workbench":
      case "mac-menubar":
        return <QuickpickMockup />;
      case "ios-island":
        return <Assistan01Mockup />;
      case "transfer-radar":
        return <FerryMockup />;
      case "wedding-card":
        return <WeddingMockup />;
      default:
        return null;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "macOS":
        return <Apple className="w-3.5 h-3.5" />;
      case "iOS":
        return <Smartphone className="w-3.5 h-3.5" />;
      case "Web":
        return <Globe className="w-3.5 h-3.5" />;
      default:
        return <Apple className="w-3.5 h-3.5" />;
    }
  };

  const getProductIcon = (name: string) => {
    switch (name) {
      case "Camera":
        return <Camera className="w-5 h-5 text-amber-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case "Heart":
        return <Heart className="w-5 h-5 text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="group relative rounded-3xl p-6 sm:p-7 glass-card flex flex-col justify-between overflow-hidden">
      {/* Background ambient gradient glow on hover */}
      <div
        className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{ background: product.bgGlow }}
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category */}
            <span className="text-[11px] font-medium text-zinc-400 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
              {product.category}
            </span>

            {/* Platform Badges */}
            <div className="flex items-center gap-1">
              {product.platforms.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 px-2 py-0.5 rounded-full bg-zinc-800/60 border border-white/5"
                >
                  {getPlatformIcon(p)}
                  <span>{p}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              product.status === "Featured"
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                : product.status === "Live"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
            }`}
          >
            ● {product.status}
          </span>
        </div>

        {/* Title & Taglines */}
        <div className="flex items-start gap-3.5 mb-2.5">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
            {getProductIcon(product.iconName)}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-0.5">
              {product.tagline}
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-500 font-mono italic mb-3">
          {product.enTagline}
        </p>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
          {product.description}
        </p>

        {/* Interactive Mockup Component */}
        <div className="mb-5">{renderMockup()}</div>

        {/* Feature List */}
        <div className="space-y-1.5 mb-5">
          {product.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5 group-hover:text-zinc-300 transition-colors" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Metrics and CTA */}
      <div className="pt-4 border-t border-white/5">
        {/* Metrics Bar */}
        {product.metrics && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {product.metrics.map((metric, i) => (
              <div
                key={i}
                className="px-2.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-center"
              >
                <div className="text-[10px] text-zinc-500">{metric.label}</div>
                <div className="text-xs font-semibold text-zinc-200 font-mono mt-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            {product.links?.github && (
              <a
                href={product.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>源码</span>
              </a>
            )}
            {product.links?.testFlight && (
              <a
                href={product.links.testFlight}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors"
              >
                <span>TestFlight</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <a
            href={product.links?.demo || "#"}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/10 hover:border-white/25 transition-all shadow-sm"
          >
            <span>体验 / 详情</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
