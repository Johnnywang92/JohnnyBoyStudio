---
title: "如何在这个博客发布新文章：极简 Markdown 写作指南"
date: "2026-10-19"
summary: "在 content/posts/ 目录下新建一个 .md 文件即可瞬间在网站上发布！包含 Frontmatter 字段配置、代码高亮、Callout 提示框与排版语法速查。"
tags: ["博客指南", "Markdown", "写作", "Next.js"]
category: "使用指南"
author: "JohnnyBoy"
featured: false
---

## 3 秒发布新文章

这个博客模块专为高效输出而设计，**无需数据库，无需后台管理密码，完全基于本地 Markdown 文件驱动**。

每次你想发表一篇文章，只需按照以下步骤：

1. 打开项目的 `content/posts/` 目录；
2. 新建一个 `.md` 文件，例如 `my-thoughts-on-ios.md`；
3. 在文件顶部写入 Frontmatter 元数据；
4. 保存文件，Next.js 会自动热重载，网站立刻上线你的新文章！

---

## Frontmatter 元数据模板

在 `.md` 文件开头用两个 `---` 包裹元数据：

```yaml
---
title: "你的文章标题"
date: "2026-10-21"
summary: "这是文章的简要摘要，会展示在文章列表和社交分享卡片中。"
tags: ["Vibecoding", "macOS", "随笔"]
category: "开发哲学" # 例如：开发哲学 / 产品实战 / 随笔思考
author: "JohnnyBoy"
featured: true # 设置为 true 则会在博客首页置顶展示
---
```

### 字段说明表

| 字段名 | 类型 | 是否必填 | 说明 |
| :--- | :--- | :--- | :--- |
| **title** | 字符串 | 必填 | 文章标题 |
| **date** | 日期格式 | 必填 | 发布日期，如 `YYYY-MM-DD` |
| **summary** | 字符串 | 推荐 | 摘要简介（用于 SEO 与卡片预览） |
| **tags** | 数组 | 可选 | 标签列表，如 `["macOS", "Swift"]` |
| **category** | 字符串 | 可选 | 分类名称，如 `产品实战` |
| **featured** | 布尔值 | 可选 | 为 `true` 时在博客首页大卡片置顶 |

---

## 丰富的排版组件支持

我们的 Markdown 渲染器支持全套现代排版规范：

### 1. 代码块与 Mac 终端风高亮

包含红黄绿三个苹果控制点与一键复制代码功能：

```typescript
export function sayHello(name: string): string {
  return `Hello, ${name}! Welcome to JohnnyBoyStudio.`;
}
```

### 2. GitHub 风格提示框 (Callouts)

你可以使用 `> [!NOTE]`、`> [!TIP]`、`> [!WARNING]` 或 `> [!IMPORTANT]` 创建漂亮的提示卡片：

> [!NOTE]
> 这是 Note 提示卡片，适合标注说明和背景信息。

> [!TIP]
> 这是 Tip 心得卡片，适合分享快捷技巧与推荐做法。

> [!WARNING]
> 这是 Warning 警告卡片，适合提醒潜在风险。

> [!IMPORTANT]
> 这是 Important 重要卡片，适合强调核心原则！

### 3. 表格与引用

支持标准 Markdown 表格与引用样式：

> 优秀的设计不是添加不可再添加的东西，而是减少到不可再减少。

现在就开始写你的第一篇文章吧！
