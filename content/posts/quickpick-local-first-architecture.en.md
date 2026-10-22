---
title: "Building QuickPick, a Lightning-Fast Culling Workbench: A Tauri + Rust Read-Only Architecture"
date: "2026-10-20"
summary: "What do commercial photographers fear most when culling? Lag, and accidentally deleting originals. Here's how I used Tauri + Rust with Pixi.js hardware acceleration to build a 100% read-only, local-first culling workbench."
tags: ["macOS", "QuickPick", "Tauri", "Rust", "Imaging"]
category: "Product Notes"
author: "JohnnyBoy"
featured: false
---

## Why Are Lightroom and Other Editors Still Not Fast Enough?

After every commercial shoot, you plug in the card reader and face 2000+ 45-megapixel RAW files. The frustration of waiting for catalog import and smart previews is something only photographers truly know.

Heavyweight software tends to lump "culling", "grading & retouching" and "library management" together. But in reality: **culling is an extremely high-frequency process that demands millisecond decisions.**

What I need:
1. **Plug and view**: no waiting on a minute-long import progress bar;
2. **Absolute safety**: 100% read-only originals — never modify, overwrite or delete your negatives;
3. **Pro assistance**: 5 built-in composition guides, an AI funnel for closed eyes and severe defocus, and real-time film 3D LUT preview.

So **QuickPick** was born.

---

## Architecture Choice: Why Tauri + Rust + Pixi.js?

When choosing the stack, I compared pure Electron, pure Swift/AppKit and Tauri + Rust.

| Approach | Bundle size | Memory | Cross-platform | Image performance |
| :--- | :--- | :--- | :--- | :--- |
| **Electron** | > 180MB | High (Chromium) | Strong | Moderate |
| **Pure Swift/AppKit** | < 25MB | Very low | Apple only | Very high (Metal) |
| **Tauri + Rust (QuickPick)** | ~18MB | Very low | Very high (Mac/Win) | Very high (multi-threaded SIMD) |

I went with **Tauri + Rust** for three reasons:

1. **Read-only access locked at the OS level**: Rust's ownership model and strong type system ensure file operations on negatives only happen through read-only handles;
2. **Pixi.js v8 hardware acceleration**: golden spirals, rule-of-thirds guides and high-frame-rate pan & zoom on a WebGL/WebGPU canvas feel as smooth as native;
3. **Bundle size and startup**: under 20MB packaged, and startup in under 300 ms.

```rust
// Design of the read-only safety layer for originals
pub struct SafeRawHandle {
    path: PathBuf,
    read_only: bool,
}

impl SafeRawHandle {
    pub fn open_readonly(path: PathBuf) -> Result<Self, QuickPickError> {
        // Strictly open in read-only mode; write access is forbidden
        let _file = std::fs::OpenOptions::new()
            .read(true)
            .write(false)
            .create(false)
            .open(&path)?;

        Ok(Self { path, read_only: true })
    }
}
```

---

## Composition Guides and 3D LUT Film Looks

During first-pass culling, it's hard to spot a subtle closed eye or cropping potential at a glance.

QuickPick has 5 built-in GPU-shader-driven composition guides:
- **Rule of Thirds**: the classic safe zone for portraits;
- **Golden Spiral**: guides the eye to a dramatic focal point;
- **Dynamic Symmetry**: calibrates complex spatial relationships in big shots.

> [!TIP]
> With real-time 3D LUT (.cube) coloring, photographers can see Fuji Classic Chrome or Kodak Tri-X black & white looks while picking, making culling decisions over 3x faster.

---

## What's Next

QuickPick is continuously improving the reject funnel and EXIF art frame export. All the code is open source on GitHub, with a free dmg download.
Fellow photographers, come chat with me!
