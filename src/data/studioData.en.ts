import type { Product, StudioInfo } from "./studioData";

export const studioInfoEn: Pick<StudioInfo, "badge" | "tagline" | "subTagline" | "bio" | "stats"> = {
  badge: "Vibecoding · A personal workshop of self-made tools",
  tagline: "Built for my own needs — apps that fit like a glove.",
  subTagline:
    "Not chasing the market, just fixing my own daily pain points. With modern Vibecoding and a hacker's hands-on spirit, I craft sharp, snappy, no-compromise tools for my own Mac and iPhone.",
  bio: "I'm JohnnyBoy. Every app here — photo culling and grading, a life assistant, file transfer, or a romantic keepsake — started from a real need (and a bit of perfectionism) of my own. With AI pair programming and Vibecoding, I turn ideas into native tools I use every single day.",
  stats: [
    { label: "Active personal projects", value: "4+" },
    { label: "Daily drivers", value: "Mac & iPhone" },
    { label: "Philosophy", value: "Vibecoding" },
    { label: "Core principle", value: "Love it myself first" },
  ],
};

export const productsEn: Record<string, Partial<Product>> = {
  quickpick: {
    name: "QuickPick",
    tagline: "High-speed local photo culling, composition & grading workbench for pros",
    description:
      "A blazing-fast macOS culling and delivery tool for photographers, retouchers and image enthusiasts. Zero uploads, 100% read-only originals, millisecond native RAW decoding — with an AI closed-eye / out-of-focus screening funnel, Pixi.js v8 composition guides, Lights Out cinema mode, EXIF art frames and 3D LUT film looks in one place.",
    category: "macOS Imaging Productivity",
    features: [
      "⚡ One-click reject funnel: AI screening for closed eyes, severe defocus and redundant burst shots",
      "📐 5 composition guides: rule of thirds / golden spiral / dynamic symmetry (Pixi.js v8 GPU-accelerated)",
      "🎬 Cinema Lights Out mode: one-tap pitch-black canvas hiding UI to focus purely on light, tone and texture",
      "🎨 Camera EXIF art frames: 6 refined templates, original photo badges, auto-tone and Cmd+C clipboard copy",
      "🎞️ Cinematic 3D LUT film grading: built-in Kodak / Fuji / Leica B&W, with custom .cube import",
      "🔒 100% read-only originals: local SQLite records, never modifies, overwrites or damages your negatives",
    ],
    metrics: [
      { label: "Architecture", value: "Tauri + Rust" },
      { label: "Render engine", value: "Pixi.js v8 / GPU" },
      { label: "Original safety", value: "100% read-only" },
    ],
  },
  assistan01: {
    name: "Assistant (小助)",
    tagline: "A fully offline, all-in-one ambient lifestyle assistant running locally on your iPhone",
    description:
      "Built around high-frequency scenarios — 16-category Omnibox quick logging, expense & calorie linking, hydration tracking, to-dos, parcel pickup on Dynamic Island and a Face ID vault — into a hands-free on-device loop. 100% on-device data with native llama.xcframework (Metal GPU accelerated) supporting Qwen3 local GGUF models, combined with Dynamic Island Live Activities, interactive widgets and Apple Watch Smart Stack.",
    category: "iOS Local Life Assistant",
    features: [
      "🌐 Omnibox 16-in-1 multi-modal intake: text, voice, and screenshot input with on-device GBNF grammars & 16-intent routing across to-dos, expenses, hydration, storage, habits & vaults",
      "💧 Hydration tracking with drink conversion: smart coefficient conversion for coffee, milk tea, and tea, with bi-directional Apple HealthKit sync",
      "🥗 Calorie estimation & expense sync: multi-dish food photo calorie estimation with percentage adjustment; food logging auto-links with expenses with anti-hallucination pipelines",
      "🏝️ Dynamic Island Live Activities: pickup codes & travel countdowns live on island & lock screen; raise your wrist on Apple Watch for instant one-tap completion",
      "🧠 Native Metal GPU on-device LLM: built-in llama.xcframework supporting Qwen3 GGUF local offline inference, plus LAN Ollama support",
      "🔒 Hardware-level Face ID privacy: encrypted ID vault, PBKDF2-secured password storage, and PIN-encrypted export — zero cloud tracking",
    ],
    metrics: [
      { label: "Requires", value: "iOS 18.0+" },
      { label: "On-device AI", value: "Metal GGUF / Qwen3" },
      { label: "Data stack", value: "SwiftUI + SwiftData" },
    ],
  },
  ferry: {
    name: "Ferry",
    tagline: "A modern, high-resilience dual-pane SFTP / FTP client built for macOS",
    description:
      "A high-performance file transfer tool following Apple's modern design philosophy. Guided by \"zero C dependencies at the core, strictly defensive transfers, zero data loss\", it is built on Swift 6 strict concurrency. Version 1.0.0-beta.2 introduces multi-connection tabs, RelayEngine server-to-server transfers, bidirectional throttling, and scheduled transfers.",
    category: "macOS Pro Network Tool",
    features: [
      "⚡ Swift 6 strict concurrency: concurrent transfer queue with per-task fault isolation, zero data races",
      "🗂️ Multi-session connection tabs: manage multiple server connections concurrently with flexible tiling",
      "🚀 RelayEngine server-to-server workspace: streaming inter-server relay transfers without local disk staging",
      "🔄 3-way sync & DiffPlan: truth-table conflict interception, visual push/pull decisions, never silently overwrites",
      "⏱️ Resilient throttling & schedules: independent up/down bandwidth limits, scheduled off-peak sync, and auto-retry",
      "📂 Finder bidirectional drag matrix: support for Promise lazy download, full drag-and-drop, and Space Quick Look",
    ],
    metrics: [
      { label: "Requires", value: "macOS 15+" },
      { label: "Concurrency", value: "Swift 6 Strict" },
      { label: "Release", value: "1.0.0-beta.2" },
    ],
  },
  "wedding-web": {
    name: "Premiere Wedding RSVP",
    tagline: "A movie-premiere themed interactive invitation & e-ticket RSVP system",
    description:
      "A custom digital invitation and guest interaction system inspired by a film premiere. Includes a three-act dual-image auto-carousel story gallery, locally generated personal e-ticket QR codes, TV slideshow projection mode, time-capsule cloud wishes wall and Service Worker offline protection.",
    category: "Cinematic Romantic Custom",
    features: [
      "🎬 Immersive premiere scroll: a three-act cinematic storyline with premiere aesthetics",
      "📺 TV Slideshow projection mode: living room big-screen photo carousel with real-time guest blessing wall",
      "🎟️ Personal movie e-ticket: personalized QR pass generated in-browser, shareable via WeChat",
      "💌 Sealed cloud wishes wall: guests upload photos & messages, unsealed on the wedding day with moderation",
      "📶 Service Worker offline guard: static caching on weak networks, auto-resend when back online",
    ],
    metrics: [
      { label: "Frontend", value: "Vue 3 SPA" },
      { label: "Live Stage", value: "TV Slideshow" },
      { label: "Offline", value: "PWA ServiceWorker" },
    ],
  },
};

export const philosophyEn = [
  {
    title: "Eat My Own Dog Food",
    subtitle: "Scratch My Own Itch",
    description:
      "No invented needs. Every app comes from a real pain point I refuse to compromise on in daily life and work. I'm the very first user — a product only has real life if I enjoy using it every day.",
  },
  {
    title: "Vibecoding: Rapid Self-Making",
    subtitle: "Idea to Everyday Tool with AI",
    description:
      "With a pain point and a spark, I prototype tonight and run it on my own Mac or iPhone tomorrow. AI is my on-call architect — turning intuition into reality fast, skipping the ceremony and focusing on what I have in mind.",
  },
  {
    title: "Tailored for Ultimate Comfort",
    subtitle: "Tailored for Natural Intuition",
    description:
      "Shortcuts, gestures and micro-animations cut to fit my high-frequency actions. Millisecond summoning, keyboard-first flow and a tiny footprint — no tolerance for redundant steps or lag. The most comfortable personal digital tools.",
  },
  {
    title: "100% Local & Private",
    subtitle: "Local First & Zero Bloat",
    description:
      "Clean, pure personal software. Negatives are never altered, passwords stay on-device, and no data is silently reported to commercial trackers. Secure, controllable and reassuring — fully in your own hands.",
  },
];

export const techStackEn = [
  {
    category: "Apple Ecosystem",
    items: [
      { desc: "Declarative, fluid UI with native performance" },
      { desc: "Secure, fast native system-level foundations" },
      { desc: "Deep control of system windows and low-level events" },
      { desc: "On-device intelligence and inference engine" },
    ],
  },
  {
    category: "Graphics & Rendering",
    items: [
      { desc: "Hardware-accelerated, ultra-HD composition guides" },
      { desc: "Real-time, high-frame-rate film grading mapping" },
      { desc: "Fast, responsive web architecture" },
      { desc: "Physical springs and silky micro-animations" },
    ],
  },
  {
    category: "Engineering & Networking",
    items: [
      { desc: "100% read-only safety and SQLite local sandbox" },
      { desc: "Low-latency near-field and LAN device communication" },
      { desc: "Cross-app pipelines and system-level integration" },
    ],
  },
];
