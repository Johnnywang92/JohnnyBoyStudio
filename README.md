# JohnnyBoyStudio 官方主页 

> **Crafting delightful native macOS and iOS experiences with vibecoding magic.**  
> 专为 Apple 生态打造的高质感、高审美独立开发者个人工作室主页。

---

## 🌟 核心特色与设计规范

-  **Apple 原生质感 Bento Grid**：毛玻璃（Glassmorphism）、微拟物高光流光、微动效与暗黑主题。
- ⚡ **原生体验至上**：极速加载、零外部网络字体依赖（自适应系统级 SF Pro Display / Text 字体）。
- 🎨 **动态交互展示**：
  - **Quickpick**：可交互 macOS 菜单栏与临时剪贴坞模拟器（支持点击复制与实时反馈）
  - **assistan01**：可展开折叠的 iPhone 灵动岛 (Dynamic Island) 与上下文伴侣卡片
  - **Ferry**：双端雷达与千兆局域网文件流转对传进度模拟
  - **wedding web**：专属高定浪漫婚礼空间，集成心动点赞计数与故事画卷
  - **macOS Floating Dock**：悬浮式底部快捷应用坞，支持触感气泡与悬停提示
  - **Vibe Sparkle**：定制 Apple 色系粒子庆典交互
- 🛠️ **模块化数据架构**：所有产品信息、标签、指标均在 `src/data/studioData.ts` 中统一维护，方便随时增删改。

---

## 🚀 快速启动

### 1. 本地开发服务器

```bash
pnpm dev
# 或
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可预览。

### 2. 生产构建测试

```bash
pnpm build
pnpm start
```

---

## 📂 项目结构指南

```
JohnnyBoyStudio/
├── src/
│   ├── app/
│   │   ├── globals.css           # Apple 毛玻璃、光效与 Tailwind 样式
│   │   ├── layout.tsx            # 原生字体与元数据配置
│   │   └── page.tsx              # 主页组合入口
│   ├── components/
│   │   ├── Navbar.tsx            # 顶部悬浮毛玻璃导航栏
│   │   ├── Hero.tsx              # 英雄区与 macOS Dock 交互组件
│   │   ├── ProductGrid.tsx       # 产品作品 Bento Grid 布局与分类筛选
│   │   ├── ProductCard.tsx       # 单个产品卡片（含指标与平台标签）
│   │   ├── ProductMockups.tsx    # 4 大产品高真交互原型组件
│   │   ├── Philosophy.tsx        # Vibecoding 理念与 Apple 匠心原则
│   │   ├── TechStack.tsx         # 核心技术栈与工程武器库
│   │   ├── ContactSection.tsx    # 邮箱一键复制与快速留言互动
│   │   ├── ConfettiButton.tsx    # 灵感粒子庆典交互按钮
│   │   ├── SocialIcons.tsx       # 纯净矢量图标 (GitHub, X, etc.)
│   │   └── Footer.tsx            # 极简底栏
│   ├── data/
│   │   └── studioData.ts         # 统一数据源（作品详情、理念、社交信息）
│   └── lib/
│       └── utils.ts              # 通用样式合并辅助函数
├── package.json
└── README.md
```

---

## 🛠️ 如何添加新产品？

打开 [`src/data/studioData.ts`](./src/data/studioData.ts)，在 `products` 数组中添加新项即可自动渲染到 Bento Grid 中：

```typescript
{
  id: "new-app",
  name: "NewApp",
  tagline: "极简实用的新工具",
  enTagline: "Minimalist productivity companion",
  description: "你的产品详细介绍...",
  platforms: ["macOS", "iOS"],
  category: "Mac 实用工具",
  status: "Beta",
  // ...
}
```

---

## 🚢 部署指南

### 一键部署到 Vercel (推荐)
1. 将本项目推送到 GitHub 仓库。
2. 登录 [Vercel](https://vercel.com)，点击 **Add New Project** 导入仓库。
3. 框架选择 **Next.js**，点击 **Deploy** 即可全自动构建并分配全球 CDN 域名。

---

© 2026 JohnnyBoyStudio. Crafted with craft and Vibecoding.
