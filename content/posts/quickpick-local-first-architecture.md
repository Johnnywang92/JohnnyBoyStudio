---
title: "打造 QuickPick 极速选片工作台：Tauri + Rust 原生只读架构实践"
date: "2026-10-20"
summary: "商业摄影师选片最怕什么？一是卡顿，二是误删原片。记录我如何采用 Tauri + Rust 搭配 Pixi.js 硬件加速，打造 100% 只读安全的本地选片工作台。"
tags: ["macOS", "QuickPick", "Tauri", "Rust", "影像技术"]
category: "产品实战"
author: "JohnnyBoy"
featured: false
---

## 为什么 Lightroom 和各类修图软件还是不够快？

每次商业拍摄后，插上读卡器面对 2000+ 张 4500 万像素的 RAW 原片，那种等待目录导入、建立智能预览的焦躁感，只有摄影师自己最清楚。

市场上的重量级软件，往往把「选片」、「调色修图」、「图库管理」全部杂糅在一起。但实际上：**选片是一个极度高频且要求毫秒级决策的过程。**

我需要的是：
1. **即插即看**：不要等待几十秒的导入进度条；
2. **绝对安全**：100% 原片只读，绝不修改、覆盖或误删原始底片；
3. **专业辅助**：内置 5 大摄影构图线、闭眼与严重虚焦 AI 智能漏斗、胶片 3D LUT 实时预览。

于是，**QuickPick（极选）** 诞生了。

---

## 技术架构选型：为什么是 Tauri + Rust + Pixi.js？

在技术选型时，我对比了纯 Electron、纯 Swift/AppKit 以及 Tauri + Rust。

| 架构方案 | 安装包体积 | 内存占用 | 跨平台潜力 | 图像处理性能 |
| :--- | :--- | :--- | :--- | :--- |
| **Electron** | > 180MB | 高 (Chromium) | 强 | 中等 |
| **纯 Swift/AppKit** | < 25MB | 极低 | 仅限 Apple | 极高 (Metal) |
| **Tauri + Rust (QuickPick)** | ~18MB | 极低 | 极高 (Mac/Win) | 极高 (多线程 SIMD) |

最终选择了 **Tauri + Rust**，原因有三：

1. **底片只读只写在操作系统层级锁死**：Rust 的所有权模型和强类型系统，确保底片文件操作仅在只读句柄下进行；
2. **Pixi.js v8 硬件加速**：在 WebGL/WebGPU 画布上绘制黄金螺旋、三分构图线和高帧率平移缩放，丝滑程度如同原生；
3. **包体积与启动速度**：打包后体积仅不到 20MB，启动时间不足 300 毫秒。

```rust
// 原片只读安全保护层设计
pub struct SafeRawHandle {
    path: PathBuf,
    read_only: bool,
}

impl SafeRawHandle {
    pub fn open_readonly(path: PathBuf) -> Result<Self, QuickPickError> {
        // 严格以只读模式打开，禁止写权限
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

## 摄影构图辅助线与 3D LUT 胶片影调

很多修图师在初筛时，肉眼很难一眼看出微小的闭眼或者裁切潜力。

我们在 QuickPick 中内置了由 GPU 着色器驱动的 5 种构图指引：
- **三分法 (Rule of Thirds)**：人像经典安全区；
- **黄金螺旋 (Golden Spiral)**：戏剧性视觉焦点引流；
- **动态对称 (Dynamic Symmetry)**：大片级复杂空间关系校准。

> [!TIP]
> 配合 3D LUT（.cube 文件）实时着色，摄影师可以在挑选底片的同时直接看到富士 Classic Chrome 或柯达 Tri-X 黑白影调，选片判断效率提升 3 倍以上。

---

## 后续演进

QuickPick 目前正在持续优化废片粉碎漏斗与相机 EXIF 艺术相框导出能力。所有代码已在 GitHub 开源，并提供免费 dmg 下载体验。
欢迎摄影同好一起交流！
