export interface Product {
  id: string;
  name: string;
  tagline: string;
  enTagline: string;
  description: string;
  platforms: ("macOS" | "iOS" | "watchOS" | "Web" | "iPadOS" | "Linux" | "IoT")[];
  category: string;
  status: "Live" | "Beta" | "Featured" | "Preview" | "In Dev";
  statusColor: string;
  accentColor: string; // gradient classes
  bgGlow: string;
  iconName: string;
  features: string[];
  metrics?: { label: string; value: string }[];
  links?: {
    appStore?: string;
    testFlight?: string;
    demo?: string;
    github?: string;
  };
  caseStudySlug?: string;
  mockupType: "mac-menubar" | "ios-island" | "transfer-radar" | "wedding-card" | "quickpick-workbench" | "safehalo-radar";
}

export interface StudioInfo {
  name: string;
  badge: string;
  tagline: string;
  subTagline: string;
  bio: string;
  location: string;
  availableForHire: boolean;
  socials: {
    github: string;
    twitter: string;
    email: string;
    appStore?: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}

export const studioInfo: StudioInfo = {
  name: "JohnnyBoyStudio",
  badge: "Vibecoding · 自造自用的个人数字工坊",
  tagline: "因自身所需而造，定制真正顺手的专属应用。",
  subTagline: "不为迎合市场，只为解决自己的高频痛点。以现代 Vibecoding 与极客动手精神，为自己的 Mac 与 iPhone 量身打造利落、趁手、不将就的自用好工具。",
  bio: "我是 JohnnyBoy。这里的每一个 App（不管是选片调色、生活助理，还是文件流转与浪漫纪念），最初都源于我自己的真实需求与强迫症痛点。借助 AI 结对与 Vibecoding，我把想法亲手实现为自己每天都在高频使用的专属原生工具。",
  location: "China · Remote Worldwide",
  availableForHire: false,
  socials: {
    github: "https://github.com/Johnnywang92",
    twitter: "https://x.com/yifanwang08",
    email: "johnny.boy.1km@gmail.com",
  },
  stats: [
    { label: "活跃自用项目", value: "5+" },
    { label: "日常主力机", value: "Mac & iPhone" },
    { label: "开发哲学", value: "Vibecoding" },
    { label: "核心原则", value: "自己先用爽" },
  ],
};

export const products: Product[] = [
  {
    id: "quickpick",
    name: "QuickPick（极选）",
    tagline: "专业摄影师本地极速选片与构图调色工作台",
    enTagline: "High-speed local photo curation, composition & grading studio",
    description:
      "专为摄影师、修图师与影像爱好者打造的 macOS 极速选片与交付工具。零上传、100% 原片只读安全，毫秒级 RAW 原生解码，集智能闭眼/虚焦筛查漏斗、Pixi.js v8 经典构图线、Cinema 沉浸看片模式、相机 EXIF 艺术相框与 3D LUT 胶片影调于一体。",
    platforms: ["macOS"],
    category: "macOS 影像生产力",
    status: "Featured",
    statusColor: "emerald",
    accentColor: "from-amber-400 via-orange-500 to-rose-500",
    bgGlow: "rgba(249, 115, 22, 0.18)",
    iconName: "Camera",
    features: [
      "⚡ 废片一键粉碎漏斗：闭眼检测、严重脱焦与连拍冗余劣选 AI 智能筛查",
      "📐 5 大摄影构图线：三分法 / 黄金螺旋 / 动态对称（Pixi.js v8 硬件加速保持锐利）",
      "🎬 Cinema 全屏沉浸看片模式：一键纯黑隐去工具栏，专注光影与细节质感",
      "🎨 相机 EXIF 艺术相框：6 大高审美模板、原创摄影徽标、智能调光与 Cmd+C 高清图复制",
      "🎞️ 3D LUT 胶片电影级调色：内置柯达/富士/莱卡黑白，支持自定义 .cube 导入",
      "🔒 100% 原片只读安全：本地 SQLite 记录，绝不修改、覆盖或破坏原始底片",
    ],
    metrics: [
      { label: "底层架构", value: "Tauri + Rust" },
      { label: "渲染引擎", value: "Pixi.js v8 / GPU" },
      { label: "底片安全", value: "100% 只读" },
    ],
    links: {
      github: "https://github.com/Johnnywang92/QuickPick",
      demo: "https://github.com/Johnnywang92/QuickPick/releases",
    },
    caseStudySlug: "quickpick-local-first-architecture",
    mockupType: "quickpick-workbench",
  },
  {
    id: "assistan01",
    name: "小助（Assistant）",
    tagline: "完全运行在 iPhone 与 Apple Watch 本地的全能离线生活与身心助理",
    enTagline: "100% On-Device AI, Watch Companion & Mind-Body Life Assistant for iOS 18+ & watchOS 11+",
    description:
      "围绕「Omnibox 万能速记、待办四段式日程、记账与待结算核销、饮食宏量营养与饮水折算、身心双指数与情绪三线共振、多段块级语音备忘、取件/出门/行程腕上闭环、证件密码保险箱」打造的全场景端侧助理。数据 100% 存本机，内置原生 llama.xcframework（Metal GPU 加速 Qwen3 与 Qwen3-VL 视觉多模态推理），配备独立 Apple Watch 伴生应用、灵动岛实时活动、面对面碰一碰互联与 WebDAV 端到端加密同步。",
    platforms: ["iOS", "watchOS"],
    category: "iOS + watchOS 端侧全能助理",
    status: "Featured",
    statusColor: "indigo",
    accentColor: "from-indigo-500 via-purple-500 to-pink-500",
    bgGlow: "rgba(129, 140, 248, 0.18)",
    iconName: "Sparkles",
    features: [
      "⌚ 独立 Apple Watch 伴生应用 + 灵动岛闭环：抬腕完成快递销号、出门防丢逐项清点、高铁/航班护航、服药习惯打卡与语音速记，双端乐观状态重放与幂等对账",
      "🧠 Metal GPU 端侧语言 + 视觉多模态大模型：内置 llama.xcframework，支持 Qwen3 与 Qwen3-VL-2B（mtmd 视觉编码）离线推理、GBNF 16 类意图约束与局域网 Ollama",
      "💚 健康双指数与心理情绪三通道共振：融合 HRV/静息心率/睡眠分期实时推断「活力指数」与「身心愉悦指数」，配齐 10 秒情绪微记录、PHQ-9/GAD-7 筛查与 7/14/30 天三线共振图",
      "🥗 饮食宏量营养、饮水折算与安心花记账：支持克数/烹饪系数热量与碳水/蛋白/脂肪估算、咖啡奶茶水合系数折算（同步 HealthKit）、订单截图识别及待结算/AA 款项隔离核销",
      "🎙️ 多段块级图文备忘录与全域拼音搜索：录音中断续录、离线 ASR 自动切分为可混排图文的块级笔记并支持高清长图导出；内置 Bigram 倒排索引 + 拼音毫秒级全域检索",
      "🔒 硬件级隐私、碰一碰互联与 WebDAV 加密备份：Face ID 证件裁切保险箱、面对面离线碰一碰传清单/AA 账单，以及 PBKDF2（31万轮）+ AES-256-GCM 私有云/NAS 备份",
    ],
    metrics: [
      { label: "双端架构", value: "iOS 18 + watchOS 11" },
      { label: "端侧多模态", value: "Qwen3 + VL (Metal)" },
      { label: "质量门禁", value: "SwiftData V12 · 1100+ 单测" },
    ],
    links: {
      github: "https://github.com/Johnnywang92/assistant-01",
      demo: "https://github.com/Johnnywang92/assistant-01",
    },
    caseStudySlug: "assistant-01-on-device-ai",
    mockupType: "ios-island",
  },
  {
    id: "ferry",
    name: "Ferry",
    tagline: "专为 macOS 设计的现代化高韧性 SFTP / FTP 双栏客户端",
    enTagline: "Modern, high-resilience dual-pane SFTP / FTP / FTPS client for macOS",
    description:
      "遵循 Apple 现代化设计哲学的高性能文件传输工具。以“核心零 C 依赖、传输严格防御、用户数据零丢失”为准则，采用 Swift 6 严格并发架构打造。全新 1.0.0-beta.2 引入多连接标签栏、RelayEngine 服务器直传工作台、双向独立限速与定时计划任务，保障关键资产传输坚不可摧。",
    platforms: ["macOS"],
    category: "macOS 专业网络工具",
    status: "Featured",
    statusColor: "sky",
    accentColor: "from-cyan-400 via-teal-500 to-blue-600",
    bgGlow: "rgba(14, 165, 233, 0.18)",
    iconName: "Compass",
    features: [
      "⚡ Swift 6 严格并发架构：多任务并发传输队列与单任务异常隔离，零数据竞争",
      "🗂️ 多会话连接标签栏（Tabs）：多服务器会话独立并发管理，自由平铺切分",
      "🚀 RelayEngine 服务器直传工作台：跨服务器流式中继直传，无需本地磁盘中转",
      "🔄 3-Way 三方同步与 DiffPlan：真值表冲突拦截，可视化决断上行/下行，绝不静默覆盖",
      "⏱️ 弹性流控与定时任务：双向独立带宽限速、夜间定时计划传输、指数退避自动重试",
      "📂 Finder 双向拖拽矩阵：支持延迟下载 Promise、完整拖拽回写与空格 Quick Look 预览",
    ],
    metrics: [
      { label: "系统要求", value: "macOS 15+" },
      { label: "并发架构", value: "Swift 6 Strict" },
      { label: "当前版本", value: "1.0.0-beta.2" },
    ],
    links: {
      github: "https://github.com/Johnnywang92/Ferry",
      demo: "https://github.com/Johnnywang92/Ferry/releases",
    },
    caseStudySlug: "ferry-swift6-resilient-file-transfer",
    mockupType: "transfer-radar",
  },
  {
    id: "safehalo",
    name: "SafeHalo",
    tagline: "基于 Wi-Fi CSI 空间微动感知与毫米波雷达的低成本无感跌倒守护系统",
    enTagline: "Passive fall detection & active safety guard using Wi-Fi CSI & mmWave radar",
    description:
      "专为独居老人与居家安全打造的零穿戴、零摄像头隐形守护系统。利用旧路由器与极低成本 ESP32-S3 边缘探针提取 Wi-Fi CSI（信道状态信息）微多普勒扰动，结合毫米波雷达双模空间分集融合算法，实现「冲击 → 静止 → 声光质询无应答 → 紧急通知」四段式闭环预警。具备多日基线自动学习、低内存 Rust 独立守护进程、微信小程序误报靶向调参及 Home Assistant 联动生态。",
    platforms: ["Web", "macOS", "Linux", "IoT"],
    category: "IoT 空间感知与主动安全",
    status: "In Dev",
    statusColor: "amber",
    accentColor: "from-emerald-400 via-teal-500 to-cyan-600",
    bgGlow: "rgba(16, 185, 129, 0.18)",
    iconName: "ShieldAlert",
    features: [
      "📶 Wi-Fi CSI 无感空间感知：利用旧路由器与 ESP32-S3 探针提取信道状态信息，无需穿戴任何设备、零摄像头隐私侵犯",
      "🛡️ 四段式闭环拦截机制：「冲击 → 静止 → 声光质询无应答 → 告警推送」，多重过滤打翻水杯、剧烈躺倒等偶发误报",
      "📡 毫米波雷达空间分集双模融合：融合 LD2410 / LD2450 / MR60FDA1 雷达微动能量与距离门，消除盲区与多径干扰",
      "📈 多日环境基线自动校准：自动学习住户作息与家具变动微扰动，动态跟踪信道稳态方差，越用越准",
      "🦀 极低内存 Rust 独立常驻服务：零 Cargo 外部依赖纯 Rust + musl 静态二进制，可在 OpenWrt / 树莓派低算力边缘设备 7×24h 稳定常驻",
      "🔔 全链路多端协同：内置 Web 审计控制台、微信小程序订阅消息推送、PushPlus 及 Home Assistant MQTT Auto-Discovery",
    ],
    metrics: [
      { label: "当前状态", value: "开发中 (阶段 1 & 2)" },
      { label: "硬件门槛", value: "旧路由器 + ESP32" },
      { label: "检测架构", value: "CSI + 毫米波双模" },
    ],
    links: {
      github: "https://github.com/Johnnywang92/SafeHalo",
      demo: "https://github.com/Johnnywang92/SafeHalo",
    },
    mockupType: "safehalo-radar",
  },
  {
    id: "wedding-web",
    name: "首映礼婚礼 RSVP 系统",
    tagline: "电影首映礼主题互动邀请函 & 电子票根回执系统",
    enTagline: "Cinematic premiere wedding invitation, RSVP & memory wall",
    description:
      "以电影首映礼为设计灵感的定制化数字邀请函与宾客互动系统。包含三幕双图自动轮播故事画廊、本地生成专属电子票根 QR 码、婚房现场大屏投影模式 (TV Slideshow)、时空胶囊云祝福墙与 Service Worker 离线网络防护。",
    platforms: ["Web", "iOS"],
    category: "电影主题浪漫定制",
    status: "Featured",
    statusColor: "rose",
    accentColor: "from-rose-400 via-pink-500 to-amber-300",
    bgGlow: "rgba(244, 63, 94, 0.18)",
    iconName: "Heart",
    features: [
      "🎬 电影首映礼沉浸长卷：三幕双图电影质感画卷故事线与首映礼美学",
      "📺 现场大屏投影模式 (TV Slideshow)：婚房大屏多图轮播与实时来宾祝福墙互动",
      "🎟️ 专属电影电子票根：浏览器本地生成个性化 QR 凭证，支持微信分享",
      "💌 密闭式云祝福墙：来宾上传照片留言，婚期日定时拆阅与审核管理",
      "📶 Service Worker 离线防护：弱网断网静态缓存，网络恢复自动重传",
    ],
    metrics: [
      { label: "前端架构", value: "Vue 3 SPA" },
      { label: "现场大屏", value: "TV Slideshow" },
      { label: "离线特性", value: "PWA ServiceWorker" },
    ],
    links: {
      github: "https://github.com/Johnnywang92",
      demo: "https://github.com/Johnnywang92",
    },
    mockupType: "wedding-card",
  },
];

export const philosophyList = [
  {
    title: "真实自用驱动 (Eat My Own Dog Food)",
    subtitle: "Scratch My Own Itch",
    description:
      "不为编造伪需求，每一个 App 都源于我自己在日常生活与工作流中不愿妥协的真实痛点。我自己就是第一号核心用户，只有自己每天用着爽，产品才有真正的生命力。",
    icon: "Flame",
  },
  {
    title: "Vibecoding 极速自造",
    subtitle: "Idea to Everyday Tool with AI",
    description:
      "有了痛点与灵感，今晚就搭出原型，明天就跑在自己的 Mac 或 iPhone 上。将 AI 作为随行架构师，让直觉与创意快速落地，省去繁冗流程，专注实现心中所想。",
    icon: "Apple",
  },
  {
    title: "量身定制的极致顺手",
    subtitle: "Tailored for Natural Intuition",
    description:
      "为自己的高频操作度身剪裁快捷键、手势与微动效。毫秒级唤起、键盘流盲打、极轻资源占用，绝不容忍冗余流程与卡顿，做最得心应手的私人数字工具。",
    icon: "Gauge",
  },
  {
    title: "100% 本地与隐私主权",
    subtitle: "Local First & Zero Bloat",
    description:
      "做干净纯粹的自用软件。底片绝不篡改、账目密码全存本机、数据绝不静默上报商业追踪。安全、可控、安心，完全掌控在自己手中。",
    icon: "ShieldCheck",
  },
];

export const techStackCategories = [
  {
    category: "Apple 生态系统",
    items: [
      { name: "Swift 6 & SwiftUI", desc: "声明式流畅 UI 与原生性能" },
      { name: "Rust & Tauri", desc: "高安全极速原生系统级底层" },
      { name: "AppKit & UIKit", desc: "深度掌控系统窗口与底层事件" },
      { name: "CoreML", desc: "设备端端侧智能与推理引擎" },
    ],
  },
  {
    category: "图形与前沿渲染",
    items: [
      { name: "Pixi.js v8", desc: "硬件加速与超高清构图参考线" },
      { name: "3D LUT & WebGPU", desc: "胶片调色实时高帧率映射" },
      { name: "Next.js & React 19", desc: "极速响应式 Web 架构" },
      { name: "Framer Motion", desc: "物理弹簧与丝滑微动效" },
    ],
  },
  {
    category: "工程与网络底层",
    items: [
      { name: "Local-First Storage", desc: "100% 只读安全与 SQLite 本地沙盒" },
      { name: "IoT & Wi-Fi CSI", desc: "信道状态微多普勒与毫米波空间感知" },
      { name: "P2P & WebSocket", desc: "近场与局域低延迟设备通信" },
      { name: "Shortcuts & IPC", desc: "跨 App 管道与系统级联动" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Localization helpers (zh is the source language, en overlays on top)
// ---------------------------------------------------------------------------
import type { Locale } from "@/lib/i18n";
import { studioInfoEn, productsEn, philosophyEn, techStackEn } from "./studioData.en";

export function getStudioInfo(locale: Locale): StudioInfo {
  return locale === "en" ? { ...studioInfo, ...studioInfoEn } : studioInfo;
}

export function getProducts(locale: Locale): Product[] {
  if (locale !== "en") return products;
  return products.map((p) => ({ ...p, ...productsEn[p.id] }));
}

export function getPhilosophyList(locale: Locale) {
  if (locale !== "en") return philosophyList;
  return philosophyList.map((item, i) => ({ ...item, ...philosophyEn[i] }));
}

export function getTechStackCategories(locale: Locale) {
  if (locale !== "en") return techStackCategories;
  return techStackCategories.map((cat, ci) => ({
    category: techStackEn[ci].category,
    items: cat.items.map((item, ii) => ({ ...item, ...techStackEn[ci].items[ii] })),
  }));
}
