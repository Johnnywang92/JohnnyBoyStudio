---
title: "How to Publish a New Post on This Blog: A Minimal Markdown Writing Guide"
date: "2026-10-19"
summary: "Drop a .md file into content/posts/ and it's live instantly! Covers frontmatter fields, code highlighting, callouts and a quick syntax reference."
tags: ["Blog Guide", "Markdown", "Writing", "Next.js"]
category: "Guide"
author: "JohnnyBoy"
featured: false
---

## Publish a New Post in 3 Seconds

This blog module is built for efficient writing: **no database, no admin password — everything is driven by local Markdown files**.

Whenever you want to publish a post, just follow these steps:

1. Open the project's `content/posts/` directory;
2. Create a `.md` file, e.g. `my-thoughts-on-ios.md`;
3. Write the frontmatter metadata at the top of the file;
4. Save. Next.js hot-reloads and your post goes live right away!

> [!TIP]
> To add an English version, create a file with the same name plus `.en.md` (e.g. `my-thoughts-on-ios.en.md`). Posts without an English version fall back to the original.

---

## Frontmatter Template

Wrap the metadata at the top of the `.md` file with two `---` lines:

```yaml
---
title: "Your post title"
date: "2026-10-21"
summary: "A short summary shown in the post list and social share cards."
tags: ["Vibecoding", "macOS", "Essay"]
category: "Philosophy" # e.g. Philosophy / Product Notes / Essays
author: "JohnnyBoy"
featured: true # true pins the post on the blog home page
---
```

### Field Reference

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **title** | string | Required | Post title |
| **date** | date | Required | Publish date, e.g. `YYYY-MM-DD` |
| **summary** | string | Recommended | Summary (used for SEO and card previews) |
| **tags** | array | Optional | Tag list, e.g. `["macOS", "Swift"]` |
| **category** | string | Optional | Category name, e.g. `Product Notes` |
| **featured** | boolean | Optional | When `true`, pinned as the large card on the blog home |

---

## Rich Typesetting Components

Our Markdown renderer supports a full set of modern typesetting features:

### 1. Code Blocks with Mac Terminal Styling

With the three red/yellow/green Apple dots and one-click code copy:

```typescript
export function sayHello(name: string): string {
  return `Hello, ${name}! Welcome to JohnnyBoyStudio.`;
}
```

### 2. GitHub-style Callouts

Use `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]` or `> [!IMPORTANT]` to create nice callout cards:

> [!NOTE]
> This is a Note card, great for remarks and background info.

> [!TIP]
> This is a Tip card, great for sharing shortcuts and recommended practices.

> [!WARNING]
> This is a Warning card, great for flagging potential risks.

> [!IMPORTANT]
> This is an Important card, great for stressing core principles!

### 3. Tables and Quotes

Standard Markdown tables and blockquotes are supported:

> Great design is not when there is nothing more to add, but when there is nothing more to take away.

Now go write your first post!
