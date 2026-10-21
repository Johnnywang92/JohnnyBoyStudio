"use client";

import React, { useEffect, useState } from "react";
import { HeadingItem } from "@/lib/blog";
import { List, ChevronDown, ChevronUp } from "lucide-react";

export default function TableOfContents({
  headings,
  mobileCollapsible = false,
}: {
  headings: HeadingItem[];
  mobileCollapsible?: boolean;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);

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

  // Mobile Collapsible Bar
  if (mobileCollapsible) {
    return (
      <div className="lg:hidden my-6 rounded-2xl glass-card overflow-hidden border-white/10">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-zinc-300 font-mono touch-manipulation min-h-[44px]"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-2">
            <List className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>文章目录导航 ({headings.length} 章节)</span>
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>

        {expanded && (
          <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-1">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setExpanded(false)}
                  className={`block py-1.5 text-xs transition-all ${
                    item.level === 3 ? "pl-4 text-zinc-400" : "font-medium"
                  } ${
                    isActive
                      ? "text-[#FF5A1F] font-bold"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {item.text}
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop Sticky Sidebar
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
