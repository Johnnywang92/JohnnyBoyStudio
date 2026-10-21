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
  mockupType: "mac-menubar" | "ios-island" | "transfer-radar" | "wedding-card";
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
    github: "https://github.com",
    twitter: "https://x.com",
    email: "johnnyboystudio@gmail.com",
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
    name: "Quickpick",
    tagline: "全局轻量极速拾取与随行剪贴坞",
    enTagline: "Instant capture & clipboard dock for macOS power users",
    description:
      "一键呼出、即刻拾取、无感流转。为键盘流与创作者打造的高性能 macOS 原生剪贴板与临时工作台，内存占用极低，毫秒级唤起。",
    platforms: ["macOS"],
    category: "Mac 生产力工具",
    status: "Featured",
    statusColor: "emerald",
    accentColor: "from-amber-400 via-orange-500 to-rose-500",
    bgGlow: "rgba(249, 115, 22, 0.15)",
    iconName: "Zap",
    features: [
      "⌘⌥V 全局毫秒级无延迟呼出",
      "智能类型识别（色值拾取、代码格式化、链接嗅探）",
      "原生 Swift & AppKit 架构，内存常驻 < 18MB",
      "纯本地沙盒加密存储，零网络回传保证隐私",
    ],
    metrics: [
      { label: "唤起延迟", value: "< 16ms" },
      { label: "常驻内存", value: "14 MB" },
      { label: "架构", value: "Swift / AppKit" },
    ],
    links: {
      github: "https://github.com",
      demo: "#",
    },
    mockupType: "mac-menubar",
  },
  {
    id: "assistan01",
    name: "assistan01",
    tagline: "深度融入系统的个人上下文 AI 伴侣",
    enTagline: "Ambient, contextual personal intelligence for iOS & Mac",
    description:
      "超越传统聊天机器人的上下文智能助理。常驻灵动岛与状态栏，以极其自然的拟物玻璃微动效感知你的日程、碎片想法与系统剪贴流。",
    platforms: ["iOS", "macOS"],
    category: "个人 AI 智能体",
    status: "Beta",
    statusColor: "indigo",
    accentColor: "from-indigo-500 via-purple-500 to-pink-500",
    bgGlow: "rgba(129, 140, 248, 0.15)",
    iconName: "Sparkles",
    features: [
      "灵动岛（Dynamic Island）实时待命与流转提示",
      "设备端本地 CoreML 模型与高性能云端大模型混合路由",
      "深度联动 iOS 快捷指令（Shortcuts）自动化日程与笔记",
      "精致毛玻璃质感，支持微触感与声音反馈",
    ],
    metrics: [
      { label: "形态", value: "灵动岛 & 菜单栏" },
      { label: "模型架构", value: "Local + Cloud" },
      { label: "系统兼容", value: "iOS 17+ / macOS 14+" },
    ],
    links: {
      testFlight: "#",
      demo: "#",
    },
    mockupType: "ios-island",
  },
  {
    id: "ferry",
    name: "Ferry",
    tagline: "轻盈无感的跨设备近场与局域流转渡轮",
    enTagline: "Effortless local device-to-device bridge & transport",
    description:
      "摆脱繁琐 AirDrop 搜索与网络传输限制。通过局域网广播与点对点极速连接，实现 Mac 与 iPhone 之间的无损文件直传与剪贴板实时同步。",
    platforms: ["macOS", "iOS"],
    category: "跨端互联传输",
    status: "Live",
    statusColor: "sky",
    accentColor: "from-cyan-400 via-teal-500 to-blue-600",
    bgGlow: "rgba(14, 165, 233, 0.15)",
    iconName: "Compass",
    features: [
      "基于 mDNS 局域网毫秒级发现对端设备，免配对",
      "大文件千兆对传无中转，不限文件大小与格式",
      "双向双端剪贴板秒级静默流转同步",
      "完全在局域网内点对点加密传输，断网亦可顺畅工作",
    ],
    metrics: [
      { label: "局域传输", value: "高达 90MB/s" },
      { label: "发现延迟", value: "< 200ms" },
      { label: "连接协议", value: "P2P Encrypted" },
    ],
    links: {
      github: "https://github.com",
      demo: "#",
    },
    mockupType: "transfer-radar",
  },
  {
    id: "wedding-web",
    name: "wedding web",
    tagline: "充满仪式感与浪漫交互的婚礼定制站点",
    enTagline: "A bespoke, poetic digital wedding experience & memory",
    description:
      "将真挚的爱情故事转化为一首流动的数字化诗篇。集视差画卷、心动动效、在线请柬、路线导航与宾客互动留言于一体的高定数字空间。",
    platforms: ["Web", "iOS"],
    category: "浪漫定制体验",
    status: "Featured",
    statusColor: "rose",
    accentColor: "from-rose-400 via-pink-500 to-amber-300",
    bgGlow: "rgba(244, 63, 94, 0.15)",
    iconName: "Heart",
    features: [
      "电影级长卷轴故事线与柔光微粒子心动动效",
      "宾客专属电子请柬与即时祝福弹幕留存系统",
      "智能礼堂地图导航、流程安排与座位一键指引",
      "全终端 Retina 极致适配，支持保存桌面小组件纪念",
    ],
    metrics: [
      { label: "适配", value: "响应式全端" },
      { label: "视觉引擎", value: "Canvas + CSS3D" },
      { label: "体验", value: "Bespoke" },
    ],
    links: {
      demo: "#",
      github: "https://github.com",
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
      { name: "Swift 6", desc: "现代高安全系统级语言" },
      { name: "SwiftUI", desc: "声明式流畅 UI 构建" },
      { name: "AppKit & UIKit", desc: "深度掌控系统底层事件" },
      { name: "CoreML", desc: "设备端端侧智能与推理" },
    ],
  },
  {
    category: "现代全栈与 Web",
    items: [
      { name: "Next.js & React 19", desc: "极速响应式 Web 架构" },
      { name: "TypeScript", desc: "严谨类型安全与工程架构" },
      { name: "Tailwind CSS", desc: "高质感设计系统落地" },
      { name: "Framer Motion", desc: "丝滑自然的物理微动效" },
    ],
  },
  {
    category: "工程与网络底层",
    items: [
      { name: "P2P & WebSocket", desc: "近场与局域低延迟通信" },
      { name: "Local-First Storage", desc: "SQLite / CoreData 本地沙盒" },
      { name: "Shortcuts & IPC", desc: "跨 App 管道与无感联动" },
    ],
  },
];
