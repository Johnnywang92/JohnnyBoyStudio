"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Flame,
  FileText,
  X,
} from "lucide-react";

interface BlogListClientProps {
  posts: BlogPostMeta[];
  tags: { name: string; count: number }[];
  categories: string[];
}

export default function BlogListClient({
  posts,
  tags,
  categories,
}: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (selectedCategory && post.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesSummary = post.summary.toLowerCase().includes(query);
        const matchesTag = post.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = post.category.toLowerCase().includes(query);
        return matchesTitle || matchesSummary || matchesTag || matchesCategory;
      }
      return true;
    });
  }, [posts, searchQuery, selectedTag, selectedCategory]);

  const featuredPost = useMemo(() => {
    // Only highlight featured if no active search or filter
    if (searchQuery || selectedTag || selectedCategory) return null;
    return posts.find((p) => p.featured) || posts[0] || null;
  }, [posts, searchQuery, selectedTag, selectedCategory]);

  const regularPosts = useMemo(() => {
    if (featuredPost && !searchQuery && !selectedTag && !selectedCategory) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, searchQuery, selectedTag, selectedCategory]);

  const hasActiveFilters = Boolean(searchQuery || selectedTag || selectedCategory);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-10">
      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-6 rounded-3xl glass-card space-y-4">
        {/* Top: Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文章标题、标签或关键字（如：Vibecoding、QuickPick、macOS）..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]/50 focus:ring-1 focus:ring-[#FF5A1F]/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
              aria-label="清除搜索"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills: Categories & Tags (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5 overflow-x-auto no-scrollbar pb-0.5">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedTag(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all touch-manipulation min-h-[34px] flex items-center shrink-0 ${
              !selectedCategory && !selectedTag
                ? "bg-[#FF5A1F] text-white shadow-lg shadow-[#FF5A1F]/20"
                : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            全部文章 ({posts.length})
          </button>

          {/* Categories */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat ? null : cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all touch-manipulation min-h-[34px] flex items-center ${
                selectedCategory === cat
                  ? "bg-white text-zinc-950 font-bold shadow-md"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Popular Tags */}
          {tags.slice(0, 5).map(({ name, count }) => (
            <button
              key={name}
              onClick={() => {
                setSelectedTag(selectedTag === name ? null : name);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all touch-manipulation min-h-[34px] ${
                selectedTag === name
                  ? "bg-[#FF5A1F]/20 text-[#FF5A1F] border border-[#FF5A1F]/40"
                  : "bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-white/5"
              }`}
            >
              <Tag className="w-3 h-3 opacity-60" />
              <span>#{name}</span>
              <span className="text-[10px] text-zinc-500 font-mono">({count})</span>
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-zinc-500 hover:text-[#FF5A1F] underline ml-auto py-1 transition-colors"
            >
              清除所有筛选
            </button>
          )}
        </div>
      </div>

      {/* Featured Post Card (Hero Banner) */}
      {featuredPost && (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF5A1F] via-amber-500 to-indigo-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-35 transition duration-500" />
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="relative block p-6 sm:p-10 rounded-3xl glass-card border-white/15 hover:border-white/30 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>置顶精选</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-400 text-xs font-mono">
                {featuredPost.category}
              </span>

              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono ml-auto">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readingTime}
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-200 transition-colors">
              {featuredPost.title}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed line-clamp-3">
              {featuredPost.summary}
            </p>

            <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF5A1F] group-hover:text-[#ff7847]">
                <span>阅读全文</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-6 sm:p-7 rounded-3xl glass-card flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              {/* Bottom Tags & Read Link */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-zinc-500 bg-white/[0.03] px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                  <span>阅读</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 p-8 rounded-3xl glass-card">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">未找到匹配的文章</h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
            没有找到与 “{searchQuery || selectedTag || selectedCategory}” 相关的文章。可以尝试更换关键词或清除筛选。
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
          >
            重置所有筛选
          </button>
        </div>
      )}
    </div>
  );
}
