# 文章发表指南 (Blog Posts)

欢迎来到 JohnnyBoyStudio 的博客内容目录！

## 如何发表一篇文章？

1. 在当前目录下新建一个 `.md` 文件，例如：`my-new-post.md`。
2. 在文件头部配置 Frontmatter：

```markdown
---
title: "你的文章标题"
date: "2026-10-21"
summary: "用一两句话总结文章核心观点，会作为列表摘要展示。"
tags: ["标签一", "标签二"]
category: "开发手记"
author: "JohnnyBoy"
featured: false
---

这里开始写正文，支持所有标准 Markdown 语法！
```

3. 运行本地开发服务 `pnpm dev` 查看效果，或者直接提交推送触发构建上线。
