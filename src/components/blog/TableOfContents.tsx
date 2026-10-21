"use client";

import React, { useEffect, useState } from "react";
import { HeadingItem } from "@/lib/blog";
import { List } from "lucide-react";

export default function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Find the last heading above the scroll position
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= top - 140) {
            setActiveId(headings[i].id);
            return;
          }
        }
      }
      setActiveId(headings[0].id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length < 2) {
    return null;
  }

  return (
    <nav className="p-5 rounded-2xl glass-card space-y-3 sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 tracking-wider uppercase pb-2 border-b border-white/5 font-mono">
        <List className="w-3.5 h-3.5 text-[#FF5A1F]" />
        <span>目录导航 · TOC</span>
      </div>

      <ul className="space-y-1.5 text-xs">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={item.level === 3 ? "pl-3.5" : "pl-0"}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-all rounded leading-normal ${
                  isActive
                    ? "text-[#FF5A1F] font-semibold translate-x-0.5"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
