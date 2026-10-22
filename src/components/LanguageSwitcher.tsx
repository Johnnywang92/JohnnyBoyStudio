"use client";

import React from "react";
import { Languages } from "lucide-react";
import { useLang } from "./LanguageProvider";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLang();
  const next = locale === "zh" ? "en" : "zh";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={locale === "zh" ? "Switch to English" : "切换为中文"}
      title={locale === "zh" ? "Switch to English" : "切换为中文"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors touch-manipulation ${className}`}
    >
      <Languages className="w-4 h-4" />
      <span>{locale === "zh" ? "EN" : "中文"}</span>
    </button>
  );
}
