import { DEFAULT_LOCALE, type Locale } from "./i18n";
import { postsZh, postsEn } from "@/generated/posts";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
  author: string;
  readingTime: string;
  wordCount: number;
  featured?: boolean;
  cover?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = markdown.split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim().replace(/[*_`]/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      headings.push({ id, text, level });
    }
  }

  return headings;
}

/**
 * Get all blog posts sorted by date descending
 */
export function getAllPosts(locale: Locale = DEFAULT_LOCALE): BlogPost[] {
  return locale === "en" ? postsEn : postsZh;
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): BlogPost | null {
  const posts = getAllPosts(locale);
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Get all unique tags with count
 */
export function getAllTags(locale: Locale = DEFAULT_LOCALE): { name: string; count: number }[] {
  const posts = getAllPosts(locale);
  const tagCounts: Record<string, number> = {};

  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all unique categories
 */
export function getAllCategories(locale: Locale = DEFAULT_LOCALE): string[] {
  const posts = getAllPosts(locale);
  const categories = new Set<string>();
  posts.forEach((p) => categories.add(p.category));
  return Array.from(categories);
}

/**
 * Get related posts for a given post
 */
export function getRelatedPosts(currentSlug: string, tags: string[], limit = 2, locale: Locale = DEFAULT_LOCALE): BlogPost[] {
  const posts = getAllPosts(locale).filter((p) => p.slug !== currentSlug);
  if (!tags.length) return posts.slice(0, limit);

  // Score posts by number of shared tags
  const scored = posts.map((p) => {
    const shared = p.tags.filter((t) => tags.includes(t)).length;
    return { post: p, score: shared };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.post)
    .slice(0, limit);
}
