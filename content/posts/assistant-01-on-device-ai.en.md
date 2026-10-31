---
title: "Assistant (小助): Building a 100% On-Device Offline AI & Ambient Loop on iPhone"
date: "2026-10-31"
summary: "Most life assistants and expense trackers require constant network uploads and tedious UI taps. Here is how I built an on-device Qwen3 assistant for iOS 18 powered by Metal GPU, completing daily routines hands-free via a 16-in-1 Omnibox and Dynamic Island."
tags: ["iOS", "assistant-01", "SwiftUI", "OnDeviceAI", "Metal", "DynamicIsland"]
category: "Product Notes"
author: "JohnnyBoy"
featured: true
---

## Why I Need a 100% On-Device Offline Lifestyle Assistant

As an avid iPhone user, my daily high-frequency micro-tasks were scattered everywhere:
- When a courier sends a pickup code, I had to dig through SMS or WeChat while walking;
- After a 450ml Americano or a quick meal, I wanted to quickly log the cost, calories, and hydration;
- Random errands popped up during the day that needed scheduling at night;
- Sensitive photos of IDs or private credentials should never be uploaded to any commercial cloud.

Mainstream apps suffer from two major flaws:
1. **Privacy leaks & cloud dependence**: Logging meals, voice notes, or expenses usually requires pinging a remote server — failing completely in elevators, basements, or Airplane Mode;
2. **Fragmented workflows**: Expenses in one app, to-dos in Reminders, hydration in a third health app. You constantly jump between 4 or 5 different apps every single day.

So I built a personal, hacker-grade offline assistant tailored strictly for my own routine: **Assistant (小助)**.

---

## Core Architecture & Technical Evolution

```
┌────────────────────────────────────────────────────────┐
│                   iOS 18+ Ambient UI                   │
│  Dynamic Island Live Activities │ Widgets │ Watch Stack│
└───────────────────────────▲────────────────────────────┘
                            │ (Instant status feedback)
┌───────────────────────────┴────────────────────────────┐
│              Omnibox 16-in-1 Multi-Modal Intake         │
│   Text Input   │   Floating Offline Voice Ball   │ OCR │
└───────────────────────────┬────────────────────────────┘
                            │ (GBNF structured routing)
┌───────────────────────────▼────────────────────────────┐
│              Inference Engine Registry                 │
│   Native llama.xcframework   │    LAN Ollama Backend   │
│   (Metal GPU / Qwen3 GGUF)   │    (Local Wi-Fi port)   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│          SwiftData + Keychain Local Storage            │
│  To-dos & Deadlines │ Meals & Calories │ HealthKit Sync│
└────────────────────────────────────────────────────────┘
```

### 1. Native Metal GPU Acceleration & On-Device Qwen3
Early iterations relied on simple heuristic rules, but complex colloquial phrasing (e.g. *"Had beef noodles with Wang for 32 bucks, remind me to submit reimbursement tomorrow morning"*) quickly broke rigid parsers.

In the October 2026 update, the inference pipeline was completely overhauled:
- **Embedded `llama.xcframework`**: Directly taps into Apple Silicon's Metal GPU and Unified Memory to run quantized **Qwen3 GGUF** models offline;
- **GBNF Grammar Constraints**: Strict grammar-based sampling constrains open-ended LLM tokens into 16 validated JSON schema intents, eliminating hallucinations at the root;
- **Dual-Engine Registry**: Runs 100% locally on iPhone, while seamlessly delegating to a Mac/NAS Ollama backend when connected to the home Wi-Fi network.

---

## 5 Practical Loops for Real-World Scenarios

### 1. Omnibox 16-in-1 Multi-Modal Quick Logging
No need to pick a category first. Whether typing a sentence, holding the floating voice ball, or snapping a picture:
- **To-dos**: Extracts deadlines and priority automatically;
- **Meals & Calories**: Food photos trigger on-device calorie estimation with percentage sliders, linked directly to financial records;
- **Physical Storage**: Notes where emergency keys or passbooks are kept.

### 2. Hydration Tracking with Coefficient Conversion
Many water trackers count raw milliliters. In Assistant:
- Drinking a 450ml Americano automatically converts to `382ml` of net hydration using a `0.85` hydration coefficient;
- Bi-directional sync with Apple HealthKit writes back active hydration without manual input.

### 3. Dynamic Island Live Activities: Hands-Free Wrist Triage
When entering the pickup geofence, locker codes appear on the Dynamic Island. Walking past the locker, a single tap on the Apple Watch or lock screen marks it "Picked Up" and archives the task.

### 4. Hardware-Secured Face ID Vault
ID cards, passports, bank info, and private notes reside inside an encrypted SwiftData store. Protected by the Secure Enclave and Face ID biometrics, with encrypted PIN export for local backup.

---

## Conclusion: Build What You Love to Use Daily

Assistant is the direct fruit of **Vibecoding**: ignoring bloated commercial business models, and focusing purely on eliminating friction in everyday life. Pure, offline, and snappy — turning the iPhone into a truly secure personal second brain.
