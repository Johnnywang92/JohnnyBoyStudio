import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogListClient from "@/components/blog/BlogListClient";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/blog";
import { getLocale } from "@/lib/i18n-server";
import { pick } from "@/lib/i18n";
import { BookOpen } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = pick(locale, "工坊手记 · 思考与自造实践 | JohnnyBoyStudio", "Journal · Thoughts & Self-Made Practice | JohnnyBoyStudio");
  const description = pick(
    locale,
    "记录从高频痛点出发的真实自用工具诞生历程、现代 Vibecoding 结对心得与 macOS/iOS 原生产品思考。",
    "The real story of building tools from my own pain points, modern Vibecoding pair-programming notes, and thoughts on native macOS/iOS products."
  );
  return {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://johnnyboystudio.com/blog",
    siteName: "JohnnyBoyStudio",
    type: "website",
  },
  };
}

export default async function BlogIndexPage() {
  const locale = await getLocale();
  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);
  const categories = getAllCategories(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[#08080c] text-zinc-100 bg-grid-pattern relative selection:bg-[#FF5A1F]/30 selection:text-white">
      {/* Top Floating Glass Navigation */}
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-mono mb-3 sm:mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>JOHNNYBOY LOGS &amp; INSIGHTS</span>
            </div>

            <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-white">
              {pick(locale, "工坊手记 · 思考与自造", "Journal · Thoughts & Self-Made")}
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-zinc-400 leading-relaxed px-2">
              {pick(locale, "不写套话，只记录从高频痛点出发的真实工具构建历程、", "No fluff — just the real journey of building tools from my own pain points,")}
              <br className="hidden sm:inline" />
              {pick(locale, "现代 Vibecoding 实战心得与 macOS/iOS 原生开发思考。", "hands-on Vibecoding lessons and native macOS/iOS development thoughts.")}
            </p>
          </div>

          {/* Interactive Blog List & Filters */}
          <BlogListClient posts={posts} tags={tags} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
