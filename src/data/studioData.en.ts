import type { Product, StudioInfo } from "./studioData";

export const studioInfoEn: Pick<StudioInfo, "badge" | "tagline" | "subTagline" | "bio" | "stats"> = {
  badge: "Vibecoding · A personal workshop of self-made tools",
  tagline: "Built for my own needs — apps that fit like a glove.",
  subTagline:
    "Not chasing the market, just fixing my own daily pain points. With modern Vibecoding and a hacker's hands-on spirit, I craft sharp, snappy, no-compromise tools for my own Mac and iPhone.",
  bio: "I'm JohnnyBoy. Every app here — photo culling and grading, a life assistant, file transfer, or a romantic keepsake — started from a real need (and a bit of perfectionism) of my own. With AI pair programming and Vibecoding, I turn ideas into native tools I use every single day.",
  stats: [
    { label: "Active personal projects", value: "5+" },
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
    tagline: "A 100% on-device offline life & mind-body assistant for iPhone and Apple Watch",
    description:
      "Unifies high-frequency daily loops — Omnibox capture, 4-stage structured schedules, expense & pending-settlement tracking, macro-nutrient & hydration conversion, Vitality & Pleasure Dual-Index, 3-channel emotional resonance, block-based voice memos, wrist-first parcel/departure/travel loops, and a Face ID vault. Runs 100% locally with native llama.xcframework (Metal GPU accelerated Qwen3 & Qwen3-VL multi-modal inference), a dedicated watchOS 11 companion app, Dynamic Island Live Activities, face-to-face bump sharing, and E2EE WebDAV sync.",
    category: "iOS + watchOS On-Device Assistant",
    features: [
      "⌚ Dedicated Apple Watch app + Dynamic Island loop: raise your wrist for parcel dismissal, departure checklist, train/flight escort, med/habit check-ins & voice capture with optimistic reconciliation",
      "🧠 Metal GPU on-device LLM & Vision-Language (VL): embedded llama.xcframework running Qwen3 & Qwen3-VL-2B (mtmd vision encoder) offline, GBNF 16-intent grammar constraints & LAN Ollama",
      "💚 Health Dual-Index & 3-channel emotional resonance: real-time Vitality & Pleasure Index from HRV, resting HR & sleep stages, plus 10s mood check-ins, PHQ-9/GAD-7 & 7/14/30d trend charts",
      "🥗 Macro-nutrients, hydration conversion & safe-to-spend ledger: weight/cooking-coefficient calorie & carb/protein/fat tracking, drink hydration sync with HealthKit, receipt OCR & pending/AA bill settlement",
      "🎙️ Multi-segment block memos & Pinyin inverted index: resumable voice recording with offline ASR into rich-text/image blocks & long-image export; millisecond Bigram + Pinyin global search",
      "🔒 Hardware privacy, bump sharing & E2EE WebDAV backup: Face ID perspective-cropped ID vault, offline peer-to-peer bump sharing, and PBKDF2 (310k rounds) + AES-256-GCM NAS sync",
    ],
    metrics: [
      { label: "Platforms", value: "iOS 18 + watchOS 11" },
      { label: "On-device AI", value: "Qwen3 + VL (Metal)" },
      { label: "Quality Gate", value: "SwiftData V12 · 1100+ Tests" },
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
  safehalo: {
    name: "SafeHalo",
    tagline: "Passive fall detection & active safety guard using Wi-Fi CSI & mmWave radar",
    description:
      "A zero-wearable, privacy-first invisible safety guard designed for solitary elders and home safety. Leveraging legacy Wi-Fi routers and low-cost ESP32-S3 edge probes to capture Wi-Fi CSI (Channel State Information) micro-Doppler perturbations, fused with mmWave radar spatial diversity, SafeHalo executes a four-stage closed-loop: 'Impact → Stationary → Unanswered Audio-Visual Inquiry → Emergency Alert'. Features multi-day auto-baseline learning, a zero-cargo-dependency Rust daemon, WeChat Mini Program misfire calibration, and Home Assistant MQTT integration.",
    category: "IoT · Spatial Sensing & Active Safety",
    features: [
      "📶 Wi-Fi CSI contactless spatial sensing: leverages legacy routers & ESP32-S3 probes to analyze channel state information — zero wearables, zero cameras, 100% private",
      "🛡️ 4-stage closed-loop escalation: 'Impact → Stationary → Unanswered Inquiry → Alert', eliminating spurious triggers like dropped cups or flopping onto a sofa",
      "📡 Dual-mode mmWave radar fusion: integrates LD2410 / LD2450 radar micro-motion energy & distance gates to conquer deadzones and multipath noise",
      "📈 Multi-day auto-baseline calibration: continuously adapts to household routines and furniture shifts, auto-tuning channel variance over time",
      "🦀 Ultra-light Rust daemon: zero Cargo external dependencies, static musl binary for 24/7 rock-solid execution on OpenWrt and Raspberry Pi",
      "🔔 Full-link alerting: built-in Web audit console, WeChat Mini Program alerts, PushPlus, and Home Assistant MQTT Auto-Discovery",
    ],
    metrics: [
      { label: "Status", value: "In Dev (Phase 1 & 2)" },
      { label: "Hardware entry", value: "Legacy Wi-Fi + ESP32" },
      { label: "Sensing mode", value: "CSI + mmWave dual-fusion" },
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
      { desc: "Channel state micro-Doppler & mmWave spatial sensing" },
      { desc: "Low-latency near-field and LAN device communication" },
      { desc: "Cross-app pipelines and system-level integration" },
    ],
  },
];
