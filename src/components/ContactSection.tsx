"use client";

import React, { useState } from "react";
import { studioInfo } from "@/data/studioData";
import { GithubIcon, TwitterXIcon } from "./SocialIcons";
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studioInfo.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setUserMsg("");
      setUserEmail("");
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LET&apos;S CONNECT &amp; COLLABORATE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            联络与交流
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            无论是关于 Quickpick、assistan01、Ferry 的体验反馈，还是探讨 Vibecoding 灵感碰撞，随时欢迎畅聊。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: About JohnnyBoy & Direct Email Card */}
          <div className="p-7 sm:p-8 rounded-3xl glass-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg text-white shadow-lg">
                  JB
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">JohnnyBoy</h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Founder &amp; Indie Creator · JohnnyBoyStudio
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {studioInfo.bio}
              </p>

              {/* Email Copy Card */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-zinc-500">工作室官方邮箱</div>
                    <div className="text-xs sm:text-sm font-mono text-zinc-200 truncate">
                      {studioInfo.socials.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors shrink-0 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <a
                href={studioInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/5 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={studioInfo.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/5 transition-all"
              >
                <TwitterXIcon className="w-4 h-4" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Message Box */}
          <div className="p-7 sm:p-8 rounded-3xl glass-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>快速留言板</span>
              </div>
              <p className="text-xs text-zinc-400 mb-5">
                直接留下你的想法或产品体验建议，消息将直达工作室：
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    你的称呼或邮箱
                  </label>
                  <input
                    type="text"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. yourname@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-200 placeholder-zinc-600 text-xs focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    想说的话 / 合作或建议
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={userMsg}
                    onChange={(e) => setUserMsg(e.target.value)}
                    placeholder="分享你对 Quickpick、assistan01、Ferry 的体验期待或合作想法..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-200 placeholder-zinc-600 text-xs focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={messageSent}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70"
                >
                  {messageSent ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>已收到，Johnny 会尽快查看！</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>发送即时留言</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="text-[10px] text-zinc-500 mt-4 text-center font-mono">
              纯净无干扰 · 隐私安全保障
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
