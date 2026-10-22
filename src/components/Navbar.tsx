"use client";

import React, { useState, useEffect } from "react";
import { useLang } from "@/components/LanguageProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studioInfo } from "@/data/studioData";
import { GithubIcon, TwitterXIcon } from "./SocialIcons";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Menu,
  X,
  Sparkles,
  LayoutGrid,
  Flame,
  BookOpen,
  Cpu,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { label: t("作品库", "Works"), href: "#products", icon: <LayoutGrid className="w-4 h-4 text-amber-400" /> },
    { label: t("Vibecoding 理念", "Philosophy"), href: "#philosophy", icon: <Flame className="w-4 h-4 text-orange-400" /> },
    { label: t("工坊手记", "Journal"), href: "/blog", icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
    { label: t("技术栈", "Tech Stack"), href: "#tech-stack", icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { label: t("关于与联络", "Contact"), href: "#contact", icon: <Mail className="w-4 h-4 text-emerald-400" /> },
  ];

  const getResolvedHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-2.5 sm:p-4 pt-[max(0.6rem,env(safe-area-inset-top))]">
        <nav
          className={`w-full max-w-5xl px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? "glass-panel shadow-2xl border-white/10 bg-zinc-950/90 backdrop-blur-xl"
              : "bg-white/[0.03] border border-white/10 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group touch-manipulation">
            <img
              src="/brand/logo/logo-mark.svg"
              alt="JohnnyBoyStudio Logo"
              width={32}
              height={32}
              fetchPriority="high"
              decoding="async"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-[#F6F4EF] group-hover:text-white transition-colors">
                JohnnyBoy<span className="text-[#FF5A1F]">Studio</span>
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 -mt-0.5">
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

          {/* Desktop Right Actions */}
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

            <LanguageSwitcher />

            <Link
              href={pathname === "/" ? "#contact" : "/#contact"}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all shadow-sm active:scale-95 ml-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t("交流合作", "Get in touch")}</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Fast Contact & Hamburger */}
          <div className="flex sm:hidden items-center gap-1.5">
            <LanguageSwitcher className="px-2 py-1.5" />
            <Link
              href={pathname === "/" ? "#contact" : "/#contact"}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 text-[11px] font-semibold text-white border border-white/10 active:scale-95 transition-transform"
            >
              {t("合作", "Contact")}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-300 hover:text-white active:bg-white/10 bg-white/5 border border-white/10 transition-all touch-manipulation"
              aria-label={t("切换菜单", "Toggle menu")}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF5A1F]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      {mobileMenuOpen && (
        <div className="fixed top-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] left-3 right-3 p-4 rounded-3xl glass-panel bg-zinc-950/98 border border-white/15 shadow-2xl flex flex-col gap-2 z-50 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-3 pb-1 border-b border-white/5">
            {t("导航菜单 · NAVIGATION", "NAVIGATION")}
          </div>

          <div className="space-y-1 mt-1">
            {navLinks.map((link) => {
              const resolvedHref = getResolvedHref(link.href);
              const isActive = link.href === "/blog" && pathname.startsWith("/blog");
              return (
                <Link
                  key={link.label}
                  href={resolvedHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-medium transition-all active:scale-[0.98] ${
                    isActive
                      ? "bg-[#FF5A1F]/20 text-[#FF5A1F] border border-[#FF5A1F]/30 font-semibold"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                    {link.icon}
                  </div>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <a
                href={studioInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center active:scale-95 transition-transform"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Twitter / X"
              >
                <TwitterXIcon className="w-4 h-4" />
              </a>
            </div>

            <Link
              href={pathname === "/" ? "#contact" : "/#contact"}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5A1F] text-xs font-bold text-white shadow-lg shadow-[#FF5A1F]/30 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("交流合作", "Get in touch")}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
