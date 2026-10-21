"use client";

import React, { useState, useEffect } from "react";
import { studioInfo } from "@/data/studioData";
import { GithubIcon } from "./SocialIcons";
import { Menu, X, Sparkles, Command } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "作品库", href: "#products" },
    { label: "Vibecoding 理念", href: "#philosophy" },
    { label: "技术栈", href: "#tech-stack" },
    { label: "关于与联络", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav
        className={`w-full max-w-5xl px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "glass-panel shadow-2xl border-white/10 bg-zinc-950/85 backdrop-blur-xl"
            : "bg-white/[0.02] border border-white/5 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Command className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              JohnnyBoy<span className="text-indigo-400">Studio</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-500 -mt-0.5">
              Mac &amp; iOS Indie Lab
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={studioInfo.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>交流合作</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 p-4 rounded-2xl glass-panel bg-zinc-950/95 border-white/10 shadow-2xl flex flex-col gap-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <a
              href={studioInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-zinc-400 flex items-center gap-1.5 p-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white"
            >
              交流合作
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
