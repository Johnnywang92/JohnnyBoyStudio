"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studioInfo } from "@/data/studioData";
import { GithubIcon, TwitterXIcon } from "./SocialIcons";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
    { label: "工坊手记", href: "/blog" },
    { label: "技术栈", href: "#tech-stack" },
    { label: "关于与联络", href: "#contact" },
  ];

  const getResolvedHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

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
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/brand/logo/logo-mark.svg"
            alt="JohnnyBoyStudio Logo"
            className="w-8 h-8 rounded-xl shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-[#F6F4EF] group-hover:text-white transition-colors">
              JohnnyBoy<span className="text-[#FF5A1F]">Studio</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-400 -mt-0.5">
              Mac &amp; iOS Indie Lab
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
          {navLinks.map((link) => {
            const resolvedHref = getResolvedHref(link.href);
            const isActive = link.href === "/blog" && pathname.startsWith("/blog");
            return (
              <Link
                key={link.label}
                href={resolvedHref}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "text-white bg-[#FF5A1F]/20 text-[#FF5A1F] border border-[#FF5A1F]/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-1.5">
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
            href={studioInfo.socials.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter / X"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            <TwitterXIcon className="w-4 h-4" />
          </a>

          <Link
            href={pathname === "/" ? "#contact" : "/#contact"}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all shadow-sm active:scale-95 ml-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>交流合作</span>
          </Link>
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
          {navLinks.map((link) => {
            const resolvedHref = getResolvedHref(link.href);
            const isActive = link.href === "/blog" && pathname.startsWith("/blog");
            return (
              <Link
                key={link.label}
                href={resolvedHref}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#FF5A1F]/20 text-[#FF5A1F]"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
            <Link
              href={pathname === "/" ? "#contact" : "/#contact"}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-1.5 rounded-xl bg-[#FF5A1F] text-xs font-semibold text-white"
            >
              交流合作
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
