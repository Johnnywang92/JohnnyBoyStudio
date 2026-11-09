---
title: "Assistant (小助): Building a 100% On-Device Offline AI & Ambient Loop on iPhone and Apple Watch"
date: "2026-11-09"
summary: "Most lifestyle and expense apps require constant cloud uploads or force you to hop across 4-5 fragmented tools. Here is how I built an on-device multi-modal AI assistant for iOS 18 & watchOS 11 powered by Metal GPU, completing daily routines hands-free."
tags: ["iOS", "watchOS", "assistant-01", "SwiftUI", "OnDeviceAI", "Metal", "Vibecoding"]
category: "Product Notes"
author: "JohnnyBoy"
featured: true
cover: "/blog/assistant/home.jpg"
---

## Why I Built a 100% On-Device Offline Life Assistant

As an avid iPhone and Apple Watch user, my daily micro-tasks were scattered everywhere:
- When a courier sends a pickup code, I had to dig through SMS or WeChat while walking;
- After a 450ml Americano or a quick meal, I wanted to quickly log the cost, calories, and hydration;
- Before stepping out the door, the OCD kicks in: do I have my keys, badges, and IDs?
- Sensitive photos of IDs or private credentials should never be uploaded to any commercial cloud.

Mainstream apps suffer from two major flaws:
1. **Privacy leaks & cloud dependence**: Logging meals, voice notes, or expenses usually requires pinging a remote server — failing completely in elevators, basements, or Airplane Mode;
2. **Fragmented workflows**: Expenses in one app, to-dos in Reminders, hydration in a third health app. You constantly jump between 4 or 5 different apps every single day.

So I built a personal, hacker-grade offline assistant tailored strictly for my own routine: **Assistant (小助)**.

---

## Core Architecture & Technical Evolution

```
┌─────────────────────────────────────────────────────────────────┐
│                    iOS 18 + watchOS 11 Dual-Device UI            │
│   Dedicated Apple Watch App  │  Dynamic Island  │  Widgets     │
└────────────────────────────────▲────────────────────────────────┘
                                 │ (Optimistic replay & idempotent sync)
┌────────────────────────────────┴────────────────────────────────┐
│                   Omnibox 16-in-1 Multi-Modal Intake            │
│      Text Input   │   Floating Voice Orb   │   Receipt OCR      │
└────────────────────────────────┬────────────────────────────────┘
                                 │ (Strict GBNF grammars)
┌────────────────────────────────▼────────────────────────────────┐
│                    On-Device Inference Registry                 │
│      Native llama.xcframework    │       Qwen3-VL-2B (mtmd)     │
│   (Metal GPU / Qwen3 GGUF)       │    (LLM + Vision Encoder)    │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────┐
│                  SwiftData V12 + Keychain Hardened Local Store  │
│   Schedules  │  Nutrients & Water  │  Dual Index  │  Face ID    │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Metal GPU Acceleration & On-Device Vision (Qwen3 + VL)
Early iterations relied on simple heuristic rules, but complex colloquial phrasing quickly broke rigid parsers.

In the late 2026 update, the inference pipeline was completely overhauled:
- **Embedded `llama.xcframework`**: Directly taps into Apple Silicon's Metal GPU and Unified Memory to run quantized **Qwen3 GGUF** models offline;
- **GBNF Grammar Constraints**: Strict grammar-based sampling constrains open-ended LLM tokens into 16 validated JSON schema intents, eliminating hallucinations at the root;
- **On-Device Vision (Qwen3-VL-2B)**: Runs language models alongside `mmproj` vision encoders to estimate meal calories and nutrients completely offline.

---

## 5 Practical Loops for Real-World Scenarios

### 1. Daily Focus & Seamless Expense Tracking

When designing the Home and Expense tabs, I deliberately cut out cognitive noise:
- **Home "What to do right now"**: Instead of overwhelming you with 50 to-dos, the home screen spotlights the single most crucial task at the current moment, backed by an interactive **Day Timeline**;
- **"Safe to Spend" & Workday Savings**: After deducting fixed commitments from monthly budgets, it computes a daily spend allowance. Weekday savings roll over into the weekend pool.

![Home: Day Timeline & Immediate Focus](/blog/assistant/home.jpg)
![Expenses: Safe to Spend & Budget Rhythm](/blog/assistant/expense.jpg)

### 2. Life Vault: 17 Ambient Modules as Your Second Brain

Stop dividing life management across 5 different apps. Assistant comes with a consolidated **Life Vault**:
- **8 Core Asset Tiles**: Life milestones, Face ID credential vault, offline passwords, item holding cost & warranty, departure checklist, and vehicle notes;
- **Dynamic Frequency Sorting**: 17 sub-modules dynamically float to the top based on real-world usage frequency.

![Life Vault: 17 Categorized Modules & Dynamic Ranking](/blog/assistant/vault.jpg)

### 3. Dedicated Apple Watch App: Hands-Free Wrist Triage

Assistant features a native **watchOS 11 companion app** communicating via idempotent Command Envelopes:
- **Pickup Codes on Wrist**: Near the locker geofence, pickup codes pop up on the watch screen. Hands full with packages? Tap "Picked up" on your wrist to dismiss;
- **Departure Checklist**: Check off keys, wallet, badges on wrist or lock screen with red dots on essentials;
- **Optimistic Offline Sync**: Action items while away from your phone; everything reconciles cleanly once reconnected.

### 4. Block-Based Voice Memos & Peer-to-Peer Bump Sharing

Capturing thoughts is no longer just dry audio files:
- **Segmented Block Memos**: Hold the voice orb anywhere, pause and resume anytime; on-device ASR breaks transcripts into editable text & image blocks exportable as high-res long cards;
- **Offline Bump Sharing**: Bump two iPhones together to transfer to-do lists or split bills offline without cloud intermediaries;
- **Hardened WebDAV NAS Backup**: Client-side **PBKDF2 (310k rounds) + AES-256-GCM** encryption ensures data remains uncrackable even on public networks.

![Voice Memos: Segmented Transcripts & Audio Slices](/blog/assistant/memo.jpg)
![Settings: Offline Bump Sharing & Customization](/blog/assistant/settings.jpg)

---

## Conclusion: Build What You Love to Use Daily

Assistant is the direct fruit of **Vibecoding**: 12 iterations of schema migrations and over 1,100 automated pure-logic tests.

No subscription popups, no surveillance trackers — just laser focus on eliminating daily friction. Pure, offline, and snappy — turning the iPhone and Apple Watch into a truly secure personal second brain.
