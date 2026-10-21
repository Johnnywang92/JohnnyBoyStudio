"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ["#6366f1", "#ec4899", "#38bdf8", "#fbbf24", "#10b981"],
      disableForReducedMotion: true,
    });

    setTimeout(() => setClicked(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Vibe Check"
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 ${className}`}
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
