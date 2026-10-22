---
title: "Why I Chose Vibecoding: Real Notes from a One-Person Workshop"
date: "2026-10-21"
summary: "Not to please investors or imaginary needs, only to fix my own daily pain points. How AI pair programming and Vibecoding let me build snappy, efficient Mac-native tools I actually want to use every day."
tags: ["Vibecoding", "Indie Dev", "Thoughts", "AI Coding"]
category: "Philosophy"
author: "JohnnyBoy"
featured: true
---

## Pain Points Are the Best Pool of Requirements

After years of building indie tools, my biggest takeaway is: **if you aren't the one who suffers through using it every day, it's easy to build flashy, useless features.**

Building an app used to be a long process: sketch prototypes, write interaction specs, set up the framework, read docs, fix bugs... After weeks or months, the passion was long worn down by tedious engineering setup. Worse, many features I built, I wouldn't use even once a month.

Until Vibecoding (vibe coding / intent-driven programming) became my main way of working, and everything changed.

> [!NOTE]
> **What is Vibecoding?**
> Vibecoding doesn't mean blindly letting AI generate a pile of uncontrollable junk code. The developer steers the taste, architecture and core flow, while handing concrete implementation and debugging to a brilliant model partner — for fast, end-to-end delivery.

---

## The Self-Making Rules of a One-Person Studio

At JohnnyBoyStudio, I set three iron rules for myself:

### 1. Never write code for imaginary personas
Every one of my tools (the photo culling workbench **QuickPick**, the life assistant **assistan01**, the cross-device ferry **Ferry**) started for one reason only — **I was personally annoyed by something every single day.**
If I can't be bothered to use it, it shouldn't exist.

### 2. Sharp interactions, no bloat
A good tool is a sharp Swiss army knife, not a toolbox stuffed with twenty plastic attachments.
- Launch must be millisecond-fast;
- Operations need clear tactile and shortcut feedback;
- Never interrupt the user's attention in critical flows.

### 3. Local first, respect the data
Users' assets, photos and privacy are sacred. Originals are never uploaded to the cloud; all image computation and local SQLite records stay on the user's Mac.

```swift
// A good native experience is about stripping out tedious waiting
func renderPhotoCanvas(rawPath: URL) async throws -> DecodedImage {
    // Millisecond native decoding, 100% read-only safe
    let safeBuffer = try await LocalDecoders.loadReadOnly(rawPath)
    return safeBuffer.renderToMetalSurface()
}
```

---

## How Vibecoding Changed My Flow

In the past, writing a complex Metal composition overlay or a multi-threaded Rust scanner meant poring over dozens of pages of low-level API manuals and debugging memory alignment.

With modern Vibecoding:
1. **Express intent**: I tell my AI pair exactly the visual feel, composition ratios (golden spiral and thirds) and zero-copy performance I want;
2. **Iterate fast**: the model generates the skeleton while I do taste review and edge-case stress testing;
3. **Stay in flow**: my mind isn't stuck on semicolons and config errors, but stays at the high level of **product vision** and **user experience**.

> [!TIP]
> When building tools for yourself, don't fear being too niche. As long as you make it exceptionally comfortable in some vertical scenario, there are surely others as picky as you waiting for it.

---

## Closing

Built for my own needs — apps that fit like a glove.

That's the whole reason JohnnyBoyStudio exists. I'll keep sharing thoughts on native macOS / iOS development, low-level Rust practice and indie self-making here — come visit often.
