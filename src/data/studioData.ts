export interface Product {
  id: string;
  name: string;
  tagline: string;
  enTagline: string;
  description: string;
  platforms: ("macOS" | "iOS" | "Web" | "iPadOS")[];
  category: string;
  status: "Live" | "Beta" | "Featured" | "Preview";
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
  mockupType: "mac-menubar" | "ios-island" | "transfer-radar" | "wedding-card" | "quickpick-workbench";
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
  badge: "Vibecoding Studio · Mac & iOS Indie Lab",
  tagline: "为苹果生态雕琢有温度的原生体验。",
  subTagline: "以现代 Vibecoding 灵感与极客匠心，将系统级交互与 AI 智力融合，打造高审美、无负担的独立产品。",
  bio: "我是 JohnnyBoy，一名专注于 Mac 与 iOS 生态的独立开发者。热衷于研究人机交互的微动效、极简的原生系统整合，以及通过 Vibecoding 敏捷将各种天马行空的灵感以高质感工程化落地。",
  location: "China · Remote Worldwide",
  availableForHire: false,
  socials: {
    github: "https://github.com/Johnnywang92",
    twitter: "https://x.com/yifanwang08",
    email: "johnny.boy.1km@gmail.com",
  },
  stats: [
    { label: "活跃项目", value: "4+" },
    { label: "原生支持", value: "macOS / iOS" },
    { label: "开发哲学", value: "Vibecoding" },
    { label: "设计原则", value: "Apple HIG" },
  ],
};

export const products: Product[] = [
  {
    id: "quickpick",
    name: "QuickPick（极选）",
    tagline: "专业摄影师本地极速选片与构图调色工作台",
    enTagline: "High-speed local photo curation, composition & grading studio",
    description:
      "专为摄影师、修图师与影像爱好者打造的 macOS 极速选片与交付工具。零上传、100% 原片只读安全，毫秒级 RAW 原生解码，集智能闭眼/虚焦筛查漏斗、5 大摄影构图线、相机 EXIF 艺术相框与 3D LUT 胶片影调于一体。",
    platforms: ["macOS"],
    category: "macOS 影像生产力",
    status: "Featured",
    statusColor: "emerald",
    accentColor: "from-amber-400 via-orange-500 to-rose-500",
    bgGlow: "rgba(249, 115, 22, 0.18)",
    iconName: "Camera",
    features: [
      "⚡ 废片一键粉碎漏斗：闭眼检测、严重脱焦与连拍冗余劣选 AI 智能筛查",
      "📐 5 大摄影构图线：三分法 / 黄金螺旋 / 动态对称（Pixi.js v8 硬件加速）",
      "🎨 相机 EXIF 艺术相框：6 大高审美模板、原创摄影徽标与一键智能调光",
      "🎞️ 3D LUT 胶片电影级调色：内置柯达/富士/莱卡黑白，支持自定义 .cube 导入",
      "🔒 100% 原片只读安全：本地 SQLite 记录，绝不修改、覆盖或破坏原始底片",
    ],
    metrics: [
      { label: "架构", value: "Tauri + Rust" },
      { label: "渲染引擎", value: "Pixi.js v8 / GPU" },
      { label: "底片安全", value: "100% 只读" },
    ],
    links: {
      github: "https://github.com/Johnnywang92/QuickPick",
      demo: "https://github.com/Johnnywang92/QuickPick/releases",
    },
    mockupType: "quickpick-workbench",
  },
  {
    id: "assistan01",
    name: "小助（Assistant）",
    tagline: "完全运行在 iPhone 本地的全能离线生活助理",
    enTagline: "Private, local-first ambient lifestyle assistant for iOS 18+",
    description:
      "围绕「待办排期、一句话记账、快递取件、证件保险箱、离线语音对话」等高频场景，串联成免掏手机的生活闭环。数据全存本机，支持端侧离线语音识别与端侧 LLM（LlamaSwift GGUF），并通过灵动岛实时活动（Live Activities）、桌面小组件与 Apple Watch 带来沉浸腕上操作。",
    platforms: ["iOS"],
    category: "iOS 本地生活助理",
    status: "Beta",
    statusColor: "indigo",
    accentColor: "from-indigo-500 via-purple-500 to-pink-500",
    bgGlow: "rgba(129, 140, 248, 0.18)",
    iconName: "Sparkles",
    features: [
      "🏝️ 灵动岛 Live Activities：取件码实时上岛与锁屏、手表抬腕「已取件」即销号",
      "🎙️ 悬浮离线语音球：离线 ASR 语音识别 + 统一意图路由，无需联网对话处理",
      "💰 一句话口语化记账：口语金额自适应归一化，动态「今日安心花」额度控制",
      "🔒 Face ID 硬件级安全：证件保险箱与本地加密密码库，100% 数据只存本机",
      "🧠 端侧本地 LLM 推理：支持 LlamaSwift 本地 GGUF 运行与局域网 Ollama 联动",
    ],
    metrics: [
      { label: "系统要求", value: "iOS 18.0+" },
      { label: "数据架构", value: "SwiftUI + SwiftData" },
      { label: "端侧智能", value: "LlamaSwift GGUF" },
    ],
    links: {
      github: "https://github.com/Johnnywang92/assistant-01",
      demo: "https://github.com/Johnnywang92/assistant-01",
    },
    mockupType: "ios-island",
  },
  {
    id: "ferry",
    name: "Ferry",
    tagline: "专为 macOS 设计的现代化高韧性 SFTP / FTP 双栏客户端",
    enTagline: "Modern, high-resilience dual-pane SFTP / FTP / FTPS client for macOS",
    description:
      "遵循 Apple 现代化设计哲学的高性能文件传输工具。以“核心零 C 依赖、传输严格防御、用户数据零丢失”为准则，采用 Swift 6 严格并发架构打造。深度融合 AppKit 原生高性能双栏列表与 SwiftUI 现代界面，内置钥匙串密钥管理、弹性并发传输队列与 3-Way 三方同步 DiffPlan 引擎。",
    platforms: ["macOS"],
    category: "macOS 专业网络工具",
    status: "Featured",
    statusColor: "sky",
    accentColor: "from-cyan-400 via-teal-500 to-blue-600",
    bgGlow: "rgba(14, 165, 233, 0.18)",
    iconName: "Compass",
    features: [
      "⚡ Swift 6 严格并发架构：多任务并发传输队列与单任务异常隔离，零数据竞争",
      "🔐 全模式连接认证：SFTP (内联 libssh2+OpenSSL3) + FTPS (TLS 1.3)，Keychain 与 ssh-agent",
      "📂 AppKit+SwiftUI 双栈融合：双栏原生极速文件树、完整拖拽回写与空格 Quick Look 预览",
      "🔄 3-Way 三方同步与 DiffPlan：真值表冲突拦截，可视化决断上行/下行，绝不静默覆盖",
      "🛡️ 弹性传输引擎：断点续传、置信度自检、1s/2s/4s 指数退避重试与崩溃防抖自愈",
    ],
    metrics: [
      { label: "系统要求", value: "macOS 15+" },
      { label: "并发架构", value: "Swift 6 Strict" },
      { label: "核心准则", value: "零数据丢失" },
    ],
    links: {
      github: "https://github.com/Johnnywang92/Ferry",
      demo: "https://github.com/Johnnywang92/Ferry",
    },
    mockupType: "transfer-radar",
  },
  {
    id: "wedding-web",
    name: "首映礼婚礼 RSVP 系统",
    tagline: "电影首映礼主题互动邀请函 & 电子票根回执系统",
    enTagline: "Cinematic premiere wedding invitation, RSVP & memory wall",
    description:
      "以电影首映礼为设计灵感的定制化数字邀请函与宾客互动系统。包含三幕双图自动轮播故事画廊、本地生成专属电子票根 QR 码、时空胶囊云祝福墙与 Service Worker 离线网络防护。",
    platforms: ["Web", "iOS"],
    category: "电影主题浪漫定制",
    status: "Featured",
    statusColor: "rose",
    accentColor: "from-rose-400 via-pink-500 to-amber-300",
    bgGlow: "rgba(244, 63, 94, 0.18)",
    iconName: "Heart",
    features: [
      "🎬 电影首映礼沉浸长卷：三幕双图电影质感画卷故事线与首映礼美学",
      "🎟️ 专属电影电子票根：浏览器本地生成个性化 QR 凭证，支持微信分享",
      "💌 密闭式云祝福墙：来宾上传照片留言，婚期日定时拆阅与审核管理",
      "📶 Service Worker 离线防护：弱网断网静态缓存，网络恢复自动重传",
    ],
    metrics: [
      { label: "前端架构", value: "Vue 3 SPA" },
      { label: "后端服务", value: "Flask + SQLite" },
      { label: "离线特性", value: "PWA ServiceWorker" },
    ],
    links: {
      github: "https://github.com/Johnnywang92",
      demo: "#",
    },
    mockupType: "wedding-card",
  },
];

export const philosophyList = [
  {
    title: "Vibecoding 灵动实践",
    subtitle: "AI Pair-Programming with Soul",
    description:
      "不再深陷重复轮子的泥潭，而是将 AI 作为随行极客架构师。让直觉引领创意，用现代工具链将灵感以天为单位迅速演进为可用原型。",
    icon: "Flame",
  },
  {
    title: "Apple 原生美学沉浸",
    subtitle: "Native HIG & Tactile Feedback",
    description:
      "推崇苹果人机交互指南（HIG），精心调校每一个圆角比例、磨砂毛玻璃透光率、触觉震动反馈与物理弹性曲线，让软件如实体般顺手。",
    icon: "Apple",
  },
  {
    title: "克制与极致性能",
    subtitle: "Lightweight & Zero Bloat",
    description:
      "对常驻内存和后台 CPU 消耗有严苛的洁癖。应用启动无需等待，不绑架系统资源，做桌面和手机里安静、可靠、召之即来的得力工具。",
    icon: "Gauge",
  },
  {
    title: "数据与隐私主权",
    subtitle: "Local First & Privacy by Design",
    description:
      "坚守 Local-first 本地优先设计。用户的剪贴记录、日程、文件流转绝不上报或用于无关商业追踪，安全与安心是第一位。",
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
      { name: "P2P & WebSocket", desc: "近场与局域低延迟设备通信" },
      { name: "Shortcuts & IPC", desc: "跨 App 管道与系统级联动" },
    ],
  },
];
