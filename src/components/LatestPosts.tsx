import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-14 sm:py-20 relative border-t border-white/5 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-mono mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>LOGS &amp; INSIGHTS · 思考与手记</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              工坊手记 · 思考与实践
            </h2>
            <p className="text-xs sm:text-base text-zinc-400 mt-2 max-w-xl">
              记录从高频痛点出发的真实工具诞生历程、Vibecoding 结对心得与原生技术思考。
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-xs font-semibold text-white transition-all self-start md:self-auto group touch-manipulation min-h-[40px]"
          >
            <span>查看全部文章</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-5 sm:p-7 rounded-3xl glass-card flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden touch-manipulation"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span className="text-[11px] font-mono text-zinc-500">
                    {post.readingTime}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-xs text-[#FF5A1F] group-hover:translate-x-1 transition-transform font-medium">
                  <span>阅读</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
