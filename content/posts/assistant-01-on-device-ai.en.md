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

## November 2026 Update: From iPhone Assistant to iPhone + Watch Mind-Body Assistant

Since the last post, Assistant has gone through 70+ more commits. The biggest changes:

- **Dedicated Apple Watch companion app**: no longer just borrowing the Smart Stack. The Watch can now dismiss parcels, tick through the departure checklist, escort train/flight trips, check in meds and habits, log water and mood, and capture by voice. Watch actions apply optimistically and are reconciled idempotently by command ID once the iPhone persists them — nothing is lost while offline.
- **On-device vision-language model**: alongside Qwen3 text models, **Qwen3-VL-2B** (language model + mmproj vision encoder) now runs locally through llama.cpp's mtmd pipeline, paving the way for photo-based calorie estimation. Parts are downloaded and verified individually, and can only be deleted as a whole bundle to avoid half-installed models.
- **Health Dual-Index & mental state**: real-time Vitality and Pleasure indices from HRV, resting HR, sleep stages and activity, plus 10-second mood check-ins (mood / energy / stress), PHQ-9 / GAD-7 screening and a 7/14/30-day three-line emotional resonance chart.
- **Diet & ledger upgrades**: calorie estimation with gram/piece conversion, cooking coefficients and carb/protein/fat macros; pending-settlement items kept out of the safe-to-spend budget, AA splits, custom budget cycles, and Taobao/JD order screenshot recognition.
- **Block-based voice memos**: resumable multi-segment recordings, transcribed into rich text/image blocks with high-res long-image export.
- **Global search & sharing**: a custom Bigram inverted index with Pinyin search; offline face-to-face "bump" sharing for to-do lists and AA bills; WebDAV / NAS backups encrypted client-side with PBKDF2 (310k rounds) + AES-256-GCM.
- **Engineering quality**: SwiftData has evolved to a V12 versioned migration plan, AssistantCore now has 1,100+ unit tests, and CI runs seven static gates plus a pre-push hook.

---

## Conclusion: Build What You Love to Use Daily

Assistant is the direct fruit of **Vibecoding**: ignoring bloated commercial business models, and focusing purely on eliminating friction in everyday life. Pure, offline, and snappy — turning the iPhone into a truly secure personal second brain.
