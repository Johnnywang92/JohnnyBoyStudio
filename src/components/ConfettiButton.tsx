"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

interface ConfettiButtonProps {
  label?: string;
  className?: string;
}

export default function ConfettiButton({
  label = "Vibe Check",
  className = "",
}: ConfettiButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      // Lazy-load canvas-confetti on demand to keep initial bundle ultra-lean
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { x, y },
        colors: ["#FF5A1F", "#f59e0b", "#6366f1", "#10b981", "#ec4899"],
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback gracefully if loading fails
    }

    setTimeout(() => setClicked(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Vibe Check"
      className={`relative inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-xs font-medium rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 touch-manipulation min-h-[42px] sm:min-h-[36px] ${className}`}
    >
      <Sparkles
        className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-300 ${
          clicked ? "rotate-45 scale-125" : ""
        }`}
      />
      <span>{label}</span>
    </button>
  );
}
