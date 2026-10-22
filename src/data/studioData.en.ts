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
      "A blazing-fast macOS culling and delivery tool for photographers, retouchers and image enthusiasts. Zero uploads, 100% read-only originals, millisecond native RAW decoding — with an AI closed-eye / out-of-focus screening funnel, 5 composition guides, EXIF art frames and 3D LUT film looks in one place.",
    category: "macOS Imaging Productivity",
    features: [
      "⚡ One-click reject funnel: AI screening for closed eyes, severe defocus and redundant burst shots",
      "📐 5 composition guides: rule of thirds / golden spiral / dynamic symmetry (Pixi.js v8 GPU-accelerated)",
      "🎨 Camera EXIF art frames: 6 refined templates, original photo badges and one-tap smart light adjustment",
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
    tagline: "A fully offline, all-in-one life assistant running locally on your iPhone",
    description:
      "Built around high-frequency scenarios — to-dos, one-sentence expense logging, parcel pickup, an ID vault and offline voice chat — into a hands-free daily loop. All data stays on-device, with on-device offline speech recognition and local LLMs (LlamaSwift GGUF), plus Dynamic Island Live Activities, widgets and Apple Watch for immersive wrist control.",
    category: "iOS Local Life Assistant",
    features: [
      "🏝️ Dynamic Island Live Activities: pickup codes appear on the island and lock screen; raise your wrist to mark \"picked up\"",
      "🎙️ Floating offline voice orb: offline ASR + unified intent routing, no network needed",
      "💰 One-sentence spoken expense logging: colloquial amounts auto-normalized, dynamic \"safe to spend today\" budget",
      "🔒 Hardware-level Face ID security: ID vault and encrypted local password store, 100% on-device",
      "🧠 On-device LLM inference: run local GGUF via LlamaSwift, or link to a LAN Ollama",
    ],
    metrics: [
      { label: "Requires", value: "iOS 18.0+" },
      { label: "Data stack", value: "SwiftUI + SwiftData" },
      { label: "On-device AI", value: "LlamaSwift GGUF" },
    ],
  },
  ferry: {
    name: "Ferry",
    tagline: "A modern, high-resilience dual-pane SFTP / FTP client built for macOS",
    description:
      "A high-performance file transfer tool following Apple's modern design philosophy. Guided by \"zero C dependencies at the core, strictly defensive transfers, zero data loss\", it is built on Swift 6 strict concurrency. It blends a high-performance AppKit dual-pane list with a modern SwiftUI interface, with Keychain key management, a resilient concurrent transfer queue and a 3-way sync DiffPlan engine.",
    category: "macOS Pro Network Tool",
    features: [
      "⚡ Swift 6 strict concurrency: concurrent transfer queue with per-task fault isolation, zero data races",
      "🔐 Full auth support: SFTP (embedded libssh2 + OpenSSL3) + FTPS (TLS 1.3), Keychain and ssh-agent",
      "📂 AppKit + SwiftUI hybrid: native dual-pane file tree, full drag-and-drop write-back and Space Quick Look",
      "🔄 3-way sync & DiffPlan: truth-table conflict interception, visual push/pull decisions, never silently overwrites",
      "🛡️ Resilient transfer engine: resumable transfers, confidence self-check, 1s/2s/4s exponential backoff and crash self-healing",
    ],
    metrics: [
      { label: "Requires", value: "macOS 15+" },
      { label: "Concurrency", value: "Swift 6 Strict" },
      { label: "Core rule", value: "Zero data loss" },
    ],
  },
  "wedding-web": {
    name: "Premiere Wedding RSVP",
    tagline: "A movie-premiere themed interactive invitation & e-ticket RSVP system",
    description:
      "A custom digital invitation and guest interaction system inspired by a film premiere. Includes a three-act dual-image auto-carousel story gallery, locally generated personal e-ticket QR codes, a time-capsule cloud wishes wall and Service Worker offline protection.",
    category: "Cinematic Romantic Custom",
    features: [
      "🎬 Immersive premiere scroll: a three-act cinematic storyline with premiere aesthetics",
      "🎟️ Personal movie e-ticket: personalized QR pass generated in-browser, shareable via WeChat",
      "💌 Sealed cloud wishes wall: guests upload photos & messages, unsealed on the wedding day with moderation",
      "📶 Service Worker offline guard: static caching on weak networks, auto-resend when back online",
    ],
    metrics: [
      { label: "Frontend", value: "Vue 3 SPA" },
      { label: "Backend", value: "Flask + SQLite" },
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
