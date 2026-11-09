import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "content", "posts");
const outDir = path.join(process.cwd(), "src", "generated");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: rawContent };

  const rawYaml = match[1];
  const bodyContent = match[2];
  const data = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey = null;
  let currentList = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

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

      if (!value) continue;

      if (value.toLowerCase() === "true") data[key] = true;
      else if (value.toLowerCase() === "false") data[key] = false;
      else if (value.startsWith("[") && value.endsWith("]")) {
        data[key] = value.slice(1, -1).split(",").map(s => s.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
      } else {
        data[key] = value.replace(/^['"]|['"]$/g, "");
      }
    }
  }

  return { data, content: bodyContent };
}

function calculateReadingTime(text, locale) {
  const cleanText = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`.*?`/g, "")
    .replace(/[#*`~_\[\]()]/g, "");

  const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (cleanText.match(/[a-zA-Z0-9_-]+/g) || []).length;
  const totalWords = chineseChars + englishWords;
  const minutes = Math.max(1, Math.ceil(chineseChars / 350 + englishWords / 200));

  return {
    readingTime: locale === "en" ? `${minutes} min read` : `${minutes} 分钟阅读`,
    wordCount: totalWords,
  };
}

const fileNames = fs.readdirSync(postsDir);
const postsZh = [];
const postsEn = [];

for (const fileName of fileNames) {
  if (!fileName.endsWith(".md") || fileName.toLowerCase() === "readme.md" || fileName.startsWith(".") || /\.en\.md$/.test(fileName)) {
    continue;
  }

  const slug = fileName.replace(/\.md$/, "");
  
  // Chinese
  const zhPath = path.join(postsDir, fileName);
  const zhRaw = fs.readFileSync(zhPath, "utf8");
  const { data: zhData, content: zhContent } = parseFrontmatter(zhRaw);
  const { readingTime: zhTime, wordCount: zhWords } = calculateReadingTime(zhContent, "zh");

  postsZh.push({
    slug,
    title: typeof zhData.title === "string" ? zhData.title : slug,
    date: zhData.date ? String(zhData.date) : "2026-10-31",
    summary: typeof zhData.summary === "string" ? zhData.summary : zhContent.slice(0, 160).replace(/[#*`]/g, "").trim() + "...",
    tags: Array.isArray(zhData.tags) ? zhData.tags : (typeof zhData.tags === "string" ? zhData.tags.split(",").map(t => t.trim()) : []),
    category: typeof zhData.category === "string" ? zhData.category : "思考与手记",
    author: typeof zhData.author === "string" ? zhData.author : "JohnnyBoy",
    readingTime: zhTime,
    wordCount: zhWords,
    featured: Boolean(zhData.featured),
    cover: typeof zhData.cover === "string" ? zhData.cover : undefined,
    content: zhContent,
  });

  // English
  const enPath = path.join(postsDir, `${slug}.en.md`);
  const enRaw = fs.existsSync(enPath) ? fs.readFileSync(enPath, "utf8") : zhRaw;
  const { data: enData, content: enContent } = parseFrontmatter(enRaw);
  const { readingTime: enTime, wordCount: enWords } = calculateReadingTime(enContent, "en");

  postsEn.push({
    slug,
    title: typeof enData.title === "string" ? enData.title : slug,
    date: enData.date ? String(enData.date) : "2026-10-31",
    summary: typeof enData.summary === "string" ? enData.summary : enContent.slice(0, 160).replace(/[#*`]/g, "").trim() + "...",
    tags: Array.isArray(enData.tags) ? enData.tags : (typeof enData.tags === "string" ? enData.tags.split(",").map(t => t.trim()) : []),
    category: typeof enData.category === "string" ? enData.category : "Notes & Thoughts",
    author: typeof enData.author === "string" ? enData.author : "JohnnyBoy",
    readingTime: enTime,
    wordCount: enWords,
    featured: Boolean(enData.featured),
    cover: typeof enData.cover === "string" ? enData.cover : undefined,
    content: enContent,
  });
}

postsZh.sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));
postsEn.sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));

const tsCode = `// Generated automatically by scripts/build-content.mjs
import type { BlogPost } from "@/lib/blog";

export const postsZh: BlogPost[] = ${JSON.stringify(postsZh, null, 2)};

export const postsEn: BlogPost[] = ${JSON.stringify(postsEn, null, 2)};
`;

fs.writeFileSync(path.join(outDir, "posts.ts"), tsCode, "utf8");
console.log("Successfully generated src/generated/posts.ts with", postsZh.length, "posts");
