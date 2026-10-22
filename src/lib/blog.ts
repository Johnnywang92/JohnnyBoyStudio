import fs from "fs";
import path from "path";
import { DEFAULT_LOCALE, type Locale } from "./i18n";

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

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

/**
 * Robust lightweight frontmatter parser that supports standard YAML-like frontmatter
 * without requiring external heavy dependencies.
 */
function parseFrontmatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: rawContent };
  }

  const rawYaml = match[1];
  const bodyContent = match[2];
  const data: Record<string, unknown> = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey: string | null = null;
  let currentList: string[] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Check for list item under current key (e.g. "  - tag")
    if (trimmed.startsWith("- ") && currentKey) {
      const itemVal = trimmed.slice(2).trim().replace(/^['"]|['"]$/g, "");
      if (!currentList) {
        currentList = [];
        data[currentKey] = currentList;
      }
      currentList.push(itemVal);
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      currentKey = key;
      currentList = null;

      if (!value) {
        // Value might be on following lines as a list
        continue;
      }

      // Handle boolean
      if (value.toLowerCase() === "true") {
        data[key] = true;
      } else if (value.toLowerCase() === "false") {
        data[key] = false;
      }
      // Handle array in inline format [tag1, tag2]
      else if (value.startsWith("[") && value.endsWith("]")) {
        const items = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
          .filter(Boolean);
        data[key] = items;
      }
      // Handle quoted or plain strings
      else {
        // Strip surrounding quotes
        value = value.replace(/^['"]|['"]$/g, "");
        data[key] = value;
      }
    }
  }

  return { data, content: bodyContent };
}

/**
 * Calculates estimated reading time for Chinese & English mixed text
 */
function calculateReadingTime(text: string, locale: Locale = DEFAULT_LOCALE): { readingTime: string; wordCount: number } {
  // Strip code blocks and markdown formatting to count real words
  const cleanText = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`.*?`/g, "")
    .replace(/[#*`~_\[\]()]/g, "");

  // Match Chinese characters
  const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
  // Match English words
  const englishWords = (cleanText.match(/[a-zA-Z0-9_-]+/g) || []).length;

  const totalWords = chineseChars + englishWords;
  // Average reading speed: 350 Chinese chars / 200 English words per minute
  const minutes = Math.max(1, Math.ceil(chineseChars / 350 + englishWords / 200));

  return {
    readingTime: locale === "en" ? `${minutes} min read` : `${minutes} 分钟阅读`,
    wordCount: totalWords,
  };
}

/**
 * Get all blog posts sorted by date descending
 */
export function getAllPosts(locale: Locale = DEFAULT_LOCALE): BlogPost[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const posts: BlogPost[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md") || fileName.toLowerCase() === "readme.md" || fileName.startsWith(".")) {
      continue;
    }

    // English translations live next to the source post as `<slug>.en.md`
    if (/\.en\.md$/.test(fileName)) {
      continue;
    }

    const slug = fileName.replace(/\.md$/, "");
    let fullPath = path.join(POSTS_DIRECTORY, fileName);
    if (locale === "en") {
      const enPath = path.join(POSTS_DIRECTORY, `${slug}.en.md`);
      if (fs.existsSync(enPath)) fullPath = enPath;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = parseFrontmatter(fileContents);
    const { readingTime, wordCount } = calculateReadingTime(content, locale);

    // Normalize tags
    let tags: string[] = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags;
    } else if (typeof data.tags === "string") {
      tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
    }

    posts.push({
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      date: data.date ? String(data.date) : new Date().toISOString().split("T")[0],
      summary: typeof data.summary === "string" ? data.summary : content.slice(0, 160).replace(/[#*`]/g, "").trim() + "...",
      tags,
      category: typeof data.category === "string" ? data.category : locale === "en" ? "Notes & Thoughts" : "思考与手记",
      author: typeof data.author === "string" ? data.author : "JohnnyBoy",
      readingTime,
      wordCount,
      featured: Boolean(data.featured),
      cover: typeof data.cover === "string" ? data.cover : undefined,
      content,
    });
  }

  // Sort posts by date descending
  return posts.sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));
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
