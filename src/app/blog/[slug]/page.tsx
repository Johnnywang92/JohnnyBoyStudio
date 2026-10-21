import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import PostDetailActions from "@/components/blog/PostDetailActions";
import { getAllPosts, getPostBySlug, getRelatedPosts, extractHeadings } from "@/lib/blog";
import { studioInfo } from "@/data/studioData";
import { GithubIcon, TwitterXIcon } from "@/components/SocialIcons";
import {
  Calendar,
  Clock,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到 | JohnnyBoyStudio",
    };
  }

  return {
    title: `${post.title} | JohnnyBoyStudio 博客`,
    description: post.summary,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | JohnnyBoyStudio`,
      description: post.summary,
      url: `https://johnnyboystudio.com/blog/${slug}`,
      siteName: "JohnnyBoyStudio",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      creator: "@yifanwang08",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const relatedPosts = getRelatedPosts(post.slug, post.tags, 2);

  // Find previous and next posts
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#08080c] text-zinc-100 bg-grid-pattern relative selection:bg-[#FF5A1F]/30 selection:text-white">
      {/* Top Floating Glass Navigation */}
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-8 font-mono">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              首页
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">
              手记专栏
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-semibold">
                {post.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author info & tags */}
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 p-0.5 flex items-center justify-center">
                  <img
                    src="/brand/logo/logo-mark.svg"
                    alt={post.author}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-200">{post.author}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Mac &amp; iOS Indie Hacker</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Main Layout: Article + Optional Sticky TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Article Content Column */}
            <article className="lg:col-span-8 min-w-0">
              {/* Summary Lead-in Card */}
              {post.summary && (
                <div className="p-5 sm:p-6 rounded-2xl glass-card border-[#FF5A1F]/20 bg-[#FF5A1F]/[0.03] mb-8">
                  <div className="text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>核心摘要 · Summary</span>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                    {post.summary}
                  </p>
                </div>
              )}

              {/* Rendered Markdown Body */}
              <MarkdownRenderer content={post.content} />

              {/* Share & Actions Toolbar */}
              <PostDetailActions title={post.title} />

              {/* Author Bio Box */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card border-white/10 my-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/15 p-1 shrink-0">
                    <img
                      src="/brand/logo/logo-mark.svg"
                      alt={studioInfo.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                      <div className="font-bold text-white text-base">
                        关于作者 · {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={studioInfo.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={studioInfo.socials.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Twitter / X"
                        >
                          <TwitterXIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {studioInfo.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prev & Next Posts Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="p-4 rounded-2xl glass-card hover:border-white/20 transition-all text-left group"
                  >
                    <div className="text-[11px] font-mono text-zinc-500 mb-1 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                      <span>上一篇</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-[#FF5A1F] transition-colors line-clamp-1">
                      {prevPost.title}
                    </div>
                  </Link>
                ) : (
                  <div className="p-4 rounded-2xl border border-white/5 text-zinc-600 text-xs font-mono">
                    已经是第一篇了
                  </div>
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="p-4 rounded-2xl glass-card hover:border-white/20 transition-all text-right group"
                  >
                    <div className="text-[11px] font-mono text-zinc-500 mb-1 flex items-center justify-end gap-1">
                      <span>下一篇</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-[#FF5A1F] transition-colors line-clamp-1">
                      {nextPost.title}
                    </div>
                  </Link>
                ) : (
                  <div className="p-4 rounded-2xl border border-white/5 text-zinc-600 text-xs font-mono text-right">
                    已经是最新一篇了
                  </div>
                )}
              </div>
            </article>

            {/* Desktop Sticky Sidebar (TOC + Studio Callout) */}
            <aside className="hidden lg:block lg:col-span-4 space-y-6">
              {headings.length > 1 && <TableOfContents headings={headings} />}

              {/* Related Posts Card */}
              {relatedPosts.length > 0 && (
                <div className="p-5 rounded-2xl glass-card space-y-3">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider pb-2 border-b border-white/5 flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>相关手记 · Related</span>
                  </div>

                  <div className="space-y-3">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className="block group"
                      >
                        <div className="text-xs text-zinc-300 group-hover:text-[#FF5A1F] transition-colors line-clamp-2 font-medium">
                          {rel.title}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-1">
                          {rel.date} · {rel.readingTime}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Studio Callout */}
              <div className="p-5 rounded-2xl glass-card bg-gradient-to-br from-zinc-900 to-zinc-950 border-white/10">
                <div className="text-xs font-mono text-zinc-400 mb-1">JohnnyBoyStudio</div>
                <div className="text-sm font-bold text-white mb-2">
                  因自身所需而造的专属应用
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  每一个工具都源自真实需求，纯粹、利落、不将就。
                </p>
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-1.5 text-xs text-[#FF5A1F] hover:text-[#ff7847] font-semibold"
                >
                  <span>查看作品库</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
