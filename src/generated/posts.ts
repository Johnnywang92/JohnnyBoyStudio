// Generated automatically by scripts/build-content.mjs
import type { BlogPost } from "@/lib/blog";

export const postsZh: BlogPost[] = [
  {
    "slug": "assistant-01-on-device-ai",
    "title": "小助（Assistant）：在 iPhone 与 Apple Watch 上打造 100% 端侧全能生活助理",
    "date": "2026-11-09",
    "summary": "市面上的生活助理与记账工具要么处处要联网上传，要么在四五个 App 之间反复横跳。记录我如何为 iOS 18 与 watchOS 11 打造基于 Metal GPU 端侧多模态模型、Apple Watch 独立伴生闭环与完全离线加密的私人数字外脑。",
    "tags": [
      "iOS",
      "watchOS",
      "assistant-01",
      "SwiftUI",
      "端侧AI",
      "Metal",
      "Vibecoding"
    ],
    "category": "产品实战",
    "author": "JohnnyBoy",
    "readingTime": "5 分钟阅读",
    "wordCount": 1515,
    "featured": true,
    "cover": "/blog/assistant/home.jpg",
    "content": "\n## 引言：为什么我不再想在 5 个 App 间来回横跳？\n\n作为深度 iPhone 与 Apple Watch 用户，我每天的高频碎片操作极其分散：\n- 顺丰或菜鸟发来取件码，走在路上要掏出手机在短信或微信里反复翻找；\n- 刚喝了一杯 450ml 美式或吃了一顿简餐，想顺手记一笔账、记一下热量和饮水量；\n- 下班走到电梯口，突然强迫症发作：钥匙带了吗？身份证带了吗？\n- 还有重要的身份证件复印件、私密备忘录，我绝不放心上传到任何商业云盘。\n\n市场上的主流 App 存在两个致命痛点：\n1. **隐私与网络依赖**：记账、语音、笔记动辄要上传服务器，在电梯、地下车库或飞行模式下直接瘫痪或转菊花；\n2. **碎片割裂**：记账在记账软件、待办在提醒事项、喝水在健康工具、随想在备忘录，一天要在四五个 App 之间反复横跳。\n\n因此，我决定因自身所需，打造一个**「完全运行在 iPhone 本地、数据绝不上云、免掏手机腕上闭环」**的极客级全能生活助理 —— **小助（Assistant）**。\n\n---\n\n## 核心架构与技术演进\n\n```\n┌─────────────────────────────────────────────────────────────────┐\n│                    iOS 18 + watchOS 11 双端交互                  │\n│   独立 Apple Watch 伴生 App  │  灵动岛 Live Activity  │ 交互小组件 │\n└────────────────────────────────▲────────────────────────────────┘\n                                 │ (双端乐观重放 & 幂等对账)\n┌────────────────────────────────┴────────────────────────────────┐\n│                   Omnibox 全域 16 类生活多模态入口                 │\n│      文字输入   │   悬浮离线语音球 (ASR)   │   截图/订单 OCR 识别    │\n└────────────────────────────────┬────────────────────────────────┘\n                                 │ (GBNF 文法严格约束)\n┌────────────────────────────────▼────────────────────────────────┐\n│                    多后端端侧推理引擎 (Inference)                 │\n│      原生 llama.xcframework      │       Qwen3-VL-2B (mtmd)     │\n│   (Metal GPU / Qwen3 GGUF 离线)  │    (语言模型 + 视觉多模态部件)  │\n└────────────────────────────────┬────────────────────────────────┘\n                                 │\n┌────────────────────────────────▼────────────────────────────────┐\n│                  SwiftData V12 + Keychain 本地强加密             │\n│   四段日程  │  宏量营养与饮水  │  健康双指数  │  Face ID 证件保险箱  │\n└─────────────────────────────────────────────────────────────────┘\n```\n\n### 1. 原生 Metal GPU 加速与端侧视觉多模态 (Qwen3 + VL)\n最初版本我曾尝试过简单的规则匹配与轻量级第三方框架，但对于口语化复杂的模糊输入（如“中午和老王吃了碗牛肉面花了 32 顺便记下明天上午把发票报销了”），传统规则往往束手无策。\n\n在 2026 年底的最新更新中，推理核心彻底蜕变：\n- **内置 `llama.xcframework`**：直接调用 Apple Silicon 的 Metal GPU 与 Unified Memory，无缝运行量化版 **Qwen3 GGUF** 模型；\n- **GBNF 文法严格约束**：通过 Grammar-Based Sampling 将模型的自由发散强制规范为 16 种标准 JSON 意图结构，从底层根除大模型幻觉；\n- **引入 Qwen3-VL-2B 视觉多模态**：支持下载语言模型 + `mmproj` 视觉编码器，实现离线拍照多菜热量估算与营养成分推算。模型按部件下载、逐件校验、只允许整包删除。\n\n---\n\n## 击中日常高频痛点的五大闭环体验\n\n### 1. 今日聚焦与极速记账：不给生活增添心智负担\n\n在设计首页和记账模块时，我刻意克制了信息轰炸：\n- **首页「现在最该做什么」**：拒绝罗列几十项让人焦虑的清单，当前时段永远只高亮最核心的一件事，配合**今日时间轴**呈现空闲时间预算；\n- **「今日安心花」与工作日蓄水**：月预算扣除固定开销后，按天动态算出今天能花多少。工作日省下的额度会自动滚入周末蓄水池，花钱再也没有心理包袱。\n\n![首页：时间轴与即时任务聚焦](/blog/assistant/home.jpg)\n![记账：今日安心花与工作日蓄水](/blog/assistant/expense.jpg)\n\n### 2. 生活档案：17 大全域生活模块的私人数字外脑\n\n不把需求拆分给 5 个不同软件。小助拥有完整的**生活档案库**：\n- **8 大核心资产位**：涵盖人生大事、证件保险箱、本地密码库、物品收纳（日均持有成本与保修）、防丢核对与爱车备忘；\n- **动态频率排布**：下方 17 个子模块根据个人使用频次自动置顶（如健康数据、饮食热量估算、物品收纳）。\n\n![生活档案：全域 17 类模块与高频动态排列](/blog/assistant/vault.jpg)\n\n### 3. 独立 Apple Watch 伴生应用：免掏手机，抬腕即销号\n\n小助拥有专属的 **watchOS 11 伴生应用**，与 iPhone 端通过唯一的指令信封（Command Envelope）双向对账：\n- **取件码实时上岛上腕**：走进驿站地理围栏，取件码直接推送到手表屏幕。双手抱满快递无需掏出手机，抬手一点“已取件”，即时销号并自动收起灵动岛；\n- **出门防丢清点**：锁屏与手表逐项打勾（钥匙、耳机、工卡），必带项红点提醒，全清点后自动收卡；\n- **离线乐观状态同步**：手表脱离手机时依然可以打卡、记账，重新连上后毫秒级对账落库，一条都不丢。\n\n### 4. 块级语音备忘录与近场面对面互联\n\n随手记录不再只是干瘪的录音文件，小助让碎片记录变得井井有条，同时保留完全的数字主权：\n- **分块语音备忘录**：长按屏幕任意位置悬浮语音球说话，支持中断续录；端侧 ASR 离线转写后自动切分成可图文混排的块级笔记，支持导出高清长图；\n- **离线面对面碰一碰**：无需添加好友、不经过任何中心化服务器，两台 iPhone 贴近即可通过离线近场通信互传待办清单与 AA 账单；\n- **WebDAV 私有云强加密**：支持群晖、极空间、坚果云等私有网盘备份，离开设备前全部经由 **PBKDF2（31 万轮迭代）+ AES-256-GCM** 端到端加密，即便私有云暴露公网也绝对不可破译。\n\n![语音备忘：随行灵感转写与声波切片](/blog/assistant/memo.jpg)\n![设置：离线面对面碰一碰与助手定制](/blog/assistant/settings.jpg)\n\n---\n\n## 结语：自己的工具，自己先用爽\n\n小助从第一行代码写起到现在的稳定日常使用，正是典型 **Vibecoding** 的成果：历经 SwiftData 12 个版本的平滑迁移演进、超过 1100 项纯逻辑自动化测试。\n\n不迎合大众市场的繁琐商业模式，只聚焦解决自己在真实生活里不愿将就的微小痛点。保持纯粹，端侧离线，让 iPhone 与 Apple Watch 真正成为安全、趁手且聪明的私人生活外脑。\n"
  },
  {
    "slug": "ferry-swift6-resilient-file-transfer",
    "title": "Ferry：以 Swift 6 严格并发与零丢失防御，重塑 macOS 双栏文件传输工具",
    "date": "2026-10-31",
    "summary": "市面上的 SFTP 客户端为什么总是卡死、闪退甚至静默覆盖生产环境文件？记录我如何遵循 Apple 现代设计哲学，用 Swift 6 严格并发、RelayEngine 服务器直传与 3-Way 冲突真值表打造高韧性 macOS 双栏传输客户端 Ferry。",
    "tags": [
      "macOS",
      "Ferry",
      "Swift 6",
      "SFTP",
      "并发编程",
      "生产力工具"
    ],
    "category": "产品实战",
    "author": "JohnnyBoy",
    "readingTime": "3 分钟阅读",
    "wordCount": 927,
    "featured": true,
    "content": "\n## 为什么在这个时代，我们依然需要一款全新的 SFTP 客户端？\n\n在日常管理远程服务器、同步开发测试集群或备份云端大文件时，文件传输工具是工程师每分每秒都在交互的命脉工具。\n\n然而，打开 macOS 上现存的经典客户端（如 FileZilla、Cyberduck 等），体验往往让人崩溃：\n1. **老旧非原生的 Java/C++ 界面**：高分辨率视网膜屏幕下滚动卡顿、无法响应 macOS 现代交互手势，缺乏 macOS 15+ 现代审美质感；\n2. **并发数据竞争与闪退**：多任务传输一旦遇到网络波动，整个 App 界面瞬间冻结（UI 卡死），甚至由于线程冲突导致任务列表直接崩溃丢弃；\n3. **静默覆盖的噩梦**：两端修改发生冲突时，缺乏严格可视化的差异比对决策（DiffPlan），一不小心就会把生产服务器的新代码彻底覆盖。\n\n作为追求极致确定感和视觉洁癖的开发者，我受够了将就。**Ferry** 由此诞生 —— 它的核心信条只有一条：**“核心零 C 依赖、传输严格防御、用户数据零丢失”**。\n\n---\n\n## 核心架构设计与工程突破\n\n```\n┌────────────────────────────────────────────────────────┐\n│             SwiftUI + AppKit 双栈混合界面                │\n│    多连接会话标签栏 (Tabs)   │  双栏原生极速文件树 (Finder 体验)   │\n└───────────────────────────▲────────────────────────────┘\n                            │ (严格主线程隔离与双向拖拽)\n┌───────────────────────────┴────────────────────────────┐\n│          Swift 6 严格并发传输调度器 (TaskGroup)           │\n│   每任务独立故障隔离  │  双向独立带宽限速  │  指数退避自愈   │\n└───────────────────────────┬────────────────────────────┘\n                            │\n┌───────────────────────────▼────────────────────────────┐\n│               核心传输引擎与协议矩阵 (Core Engine)        │\n│   RelayEngine 跨服务器直传   │   3-Way DiffPlan 冲突真值表  │\n│   libssh2+OpenSSL3 (SFTP)   │   libcurl + TLS 1.3 (FTPS)   │\n└────────────────────────────────────────────────────────┘\n```\n\n### 1. Swift 6 严格并发（Strict Concurrency）架构\nFerry 从底层网络契约到顶层 UI 交互完全拥抱 Swift 6 严格并发模型。\n- 通过 `@MainActor` 隔离所有 UI 绘制；\n- 每一个上传/下载任务均运行在独立的结构化并发 `TaskGroup` 中，单任务网络异常绝不会击溃其它传输流；\n- 彻底根除传统多线程网络库中的数据竞争（Data Race），在万级小文件并发传输时内存占用依旧稳定平缓。\n\n### 2. RelayEngine：跨服务器流式中继直传\n在传统工作流中，如果想把 Server A 的 50GB 数据迁移到 Server B，通常需要先下载到本地 Mac 磁盘，再从 Mac 上传到 Server B —— 既浪费本地 SSD 寿命，又白白消耗双倍带宽。\n\n在全新发布的 **1.0.0-beta.2** 中，Ferry 引入了 **RelayEngine 服务器直传工作台**：\n- 支持建立直连流式中继管道，本地仅作为控制流指挥枢纽，数据在两台远端服务器间直接飞渡；\n- 避免了本地磁盘 I/O 写入与空间占用，跨云数据迁移速度翻倍。\n\n### 3. 3-Way 三方同步与 DiffPlan 冲突真值表\n在同步模式下，Ferry 绝不采取激进的“静默覆盖”策略。\n- 采用三方比对（本地、远端、上次基线）计算出状态真值表；\n- 生成可视化的 DiffPlan 执行计划，清晰标明上行覆盖、下行拉取或冲突警告，只有在用户明确授权下才执行不可逆操作。\n\n### 4. 专为 macOS 度身定制的现代细节\n- **全模式凭据认证**：密码自动存入 macOS 登录钥匙串 Keychain，全面支持 OpenSSH 格式私钥、加密口令私钥与本地 `ssh-agent` 转发；\n- **Finder 双向拖拽矩阵**：完美支持与系统访达的双向直接拖拽、Promise 延迟下载与空格键 Quick Look 极速预览；\n- **弹性流控与定时任务**：支持上行与下行独立带宽限速，并提供夜间低峰期定时备份传输能力。\n\n---\n\n## 结语\n\n一个好工具的标准，不是功能堆砌，而是在最关键的时刻给你**“绝对靠谱”**的掌控感。Ferry 的每一个像素与每一行并发逻辑，都为了让 macOS 用户在每一次敲下传输键时，拥有极致的从容与优雅。\n"
  },
  {
    "slug": "why-vibecoding-for-indie-devs",
    "title": "为什么我选择 Vibecoding：一人工坊的真实自造手记",
    "date": "2026-10-21",
    "summary": "不为迎合资本或伪需求，只为解决自己的高频痛点。记录我如何借助 AI 结对与 Vibecoding，亲手打造趁手、高效且真正愿意每天使用的 Mac 原生工具。",
    "tags": [
      "Vibecoding",
      "独立开发",
      "思考",
      "AI编程"
    ],
    "category": "开发哲学",
    "author": "JohnnyBoy",
    "readingTime": "3 分钟阅读",
    "wordCount": 794,
    "featured": true,
    "content": "\n## 痛点才是最好的需求池\n\n做独立工具多年，我最大的体会是：**只要你不是那个每天都会痛苦使用它的人，你就很容易做出浮夸而无用的功能。**\n\n以往做一款 App，流程往往冗长：画原型、写交互设计规范、搭框架、查文档、改 Bug……耗费数周乃至数月后，热情早已被琐碎的工程配置消磨殆尽。更糟糕的是，很多功能做出来后，自己一个月也用不上一次。\n\n直到 Vibecoding（氛围感编程 / 意图驱动编程）成为我的主力工作方式，一切彻底变了。\n\n> [!NOTE]\n> **什么是 Vibecoding？**\n> Vibecoding 并不是盲目让 AI 生成一堆不可控的垃圾代码，而是由开发者掌舵审美、架构理念与核心心流，把具象的代码实现与调试交给高智商大模型伙伴，实现端到端的极速现实交付。\n\n---\n\n## 一人工坊的自造法则\n\n在 JohnnyBoyStudio，我给自己立下了三条铁律：\n\n### 1. 绝不为虚构的用户画像写代码\n我的每一个工具（例如摄影选片工作台 **QuickPick**、生活流助理 **assistan01**、跨端摆渡 **Ferry**），最初的立项原因都只有一个——**我自己每天都在为某个环节暴躁。**\n如果我自己都懒得用，那它就不该存在。\n\n### 2. 交互要利落，拒绝臃肿\n好的工具像一把锋利的瑞士军刀，而不是堆砌了二十种塑料配件的工具箱。\n- 启动必须是毫秒级；\n- 操作要有清晰的触觉与快捷键反馈；\n- 绝不在关键流程中打断用户的注意力。\n\n### 3. 本地优先，数据尊重\n用户的素材、照片和隐私是神圣的。原片绝不上传云端，所有图像计算与本地 SQLite 记录都留在用户的 Mac 本地芯片上。\n\n```swift\n// 一个好的原生体验，核心在于把繁琐的等待剥离\nfunc renderPhotoCanvas(rawPath: URL) async throws -> DecodedImage {\n    // 毫秒级原生解码，100% 只读安全\n    let safeBuffer = try await LocalDecoders.loadReadOnly(rawPath)\n    return safeBuffer.renderToMetalSurface()\n}\n```\n\n---\n\n## Vibecoding 是如何改变开发心流的？\n\n在以前，写一个复杂的 Metal 构图线或 Rust 多线程扫描，需要反复阅读数十页的底层 API 手册与排查内存对齐。\n\n而在现代 Vibecoding 下：\n1. **表达意图**：我明确告诉 AI 结对伙伴我想要的视觉质感、构图比例（黄金螺旋与三分线）以及零拷贝性能要求；\n2. **极速迭代**：大模型生成结构骨架，我来做审美验收与边界压力测试；\n3. **沉浸心流**：思维不再卡在语法分号和配置报错里，而是一直保持在**产品构想**与**用户体验**的高维层级。\n\n> [!TIP]\n> 当你在构建自用工具时，不要害怕它太小众。只要你在某个垂直场景下把它做到了极度顺手，这世界上一定有一群和你一样挑剔的同类在等待它。\n\n---\n\n## 结语\n\n因自身所需而造，定制真正顺手的专属应用。\n\n这就是 JohnnyBoyStudio 存在的全部意义。未来我还会在这里分享更多关于 macOS / iOS 原生开发、Rust 底层实践与独立自造的思考，欢迎常来看看。\n"
  },
  {
    "slug": "quickpick-local-first-architecture",
    "title": "打造 QuickPick 极速选片工作台：Tauri + Rust 原生只读架构实践",
    "date": "2026-10-20",
    "summary": "商业摄影师选片最怕什么？一是卡顿，二是误删原片。记录我如何采用 Tauri + Rust 搭配 Pixi.js 硬件加速，打造 100% 只读安全的本地选片工作台。",
    "tags": [
      "macOS",
      "QuickPick",
      "Tauri",
      "Rust",
      "影像技术"
    ],
    "category": "产品实战",
    "author": "JohnnyBoy",
    "readingTime": "3 分钟阅读",
    "wordCount": 659,
    "featured": false,
    "content": "\n## 为什么 Lightroom 和各类修图软件还是不够快？\n\n每次商业拍摄后，插上读卡器面对 2000+ 张 4500 万像素的 RAW 原片，那种等待目录导入、建立智能预览的焦躁感，只有摄影师自己最清楚。\n\n市场上的重量级软件，往往把「选片」、「调色修图」、「图库管理」全部杂糅在一起。但实际上：**选片是一个极度高频且要求毫秒级决策的过程。**\n\n我需要的是：\n1. **即插即看**：不要等待几十秒的导入进度条；\n2. **绝对安全**：100% 原片只读，绝不修改、覆盖或误删原始底片；\n3. **专业辅助**：内置 5 大摄影构图线、闭眼与严重虚焦 AI 智能漏斗、胶片 3D LUT 实时预览。\n\n于是，**QuickPick（极选）** 诞生了。\n\n---\n\n## 技术架构选型：为什么是 Tauri + Rust + Pixi.js？\n\n在技术选型时，我对比了纯 Electron、纯 Swift/AppKit 以及 Tauri + Rust。\n\n| 架构方案 | 安装包体积 | 内存占用 | 跨平台潜力 | 图像处理性能 |\n| :--- | :--- | :--- | :--- | :--- |\n| **Electron** | > 180MB | 高 (Chromium) | 强 | 中等 |\n| **纯 Swift/AppKit** | < 25MB | 极低 | 仅限 Apple | 极高 (Metal) |\n| **Tauri + Rust (QuickPick)** | ~18MB | 极低 | 极高 (Mac/Win) | 极高 (多线程 SIMD) |\n\n最终选择了 **Tauri + Rust**，原因有三：\n\n1. **底片只读只写在操作系统层级锁死**：Rust 的所有权模型和强类型系统，确保底片文件操作仅在只读句柄下进行；\n2. **Pixi.js v8 硬件加速**：在 WebGL/WebGPU 画布上绘制黄金螺旋、三分构图线和高帧率平移缩放，丝滑程度如同原生；\n3. **包体积与启动速度**：打包后体积仅不到 20MB，启动时间不足 300 毫秒。\n\n```rust\n// 原片只读安全保护层设计\npub struct SafeRawHandle {\n    path: PathBuf,\n    read_only: bool,\n}\n\nimpl SafeRawHandle {\n    pub fn open_readonly(path: PathBuf) -> Result<Self, QuickPickError> {\n        // 严格以只读模式打开，禁止写权限\n        let _file = std::fs::OpenOptions::new()\n            .read(true)\n            .write(false)\n            .create(false)\n            .open(&path)?;\n\n        Ok(Self { path, read_only: true })\n    }\n}\n```\n\n---\n\n## 摄影构图辅助线与 3D LUT 胶片影调\n\n很多修图师在初筛时，肉眼很难一眼看出微小的闭眼或者裁切潜力。\n\n我们在 QuickPick 中内置了由 GPU 着色器驱动的 5 种构图指引：\n- **三分法 (Rule of Thirds)**：人像经典安全区；\n- **黄金螺旋 (Golden Spiral)**：戏剧性视觉焦点引流；\n- **动态对称 (Dynamic Symmetry)**：大片级复杂空间关系校准。\n\n> [!TIP]\n> 配合 3D LUT（.cube 文件）实时着色，摄影师可以在挑选底片的同时直接看到富士 Classic Chrome 或柯达 Tri-X 黑白影调，选片判断效率提升 3 倍以上。\n\n---\n\n## 后续演进\n\nQuickPick 目前正在持续优化废片粉碎漏斗与相机 EXIF 艺术相框导出能力。所有代码已在 GitHub 开源，并提供免费 dmg 下载体验。\n欢迎摄影同好一起交流！\n"
  },
  {
    "slug": "how-to-publish-new-article",
    "title": "如何在这个博客发布新文章：极简 Markdown 写作指南",
    "date": "2026-10-19",
    "summary": "在 content/posts/ 目录下新建一个 .md 文件即可瞬间在网站上发布！包含 Frontmatter 字段配置、代码高亮、Callout 提示框与排版语法速查。",
    "tags": [
      "博客指南",
      "Markdown",
      "写作",
      "Next.js"
    ],
    "category": "使用指南",
    "author": "JohnnyBoy",
    "readingTime": "2 分钟阅读",
    "wordCount": 449,
    "featured": false,
    "content": "\n## 3 秒发布新文章\n\n这个博客模块专为高效输出而设计，**无需数据库，无需后台管理密码，完全基于本地 Markdown 文件驱动**。\n\n每次你想发表一篇文章，只需按照以下步骤：\n\n1. 打开项目的 `content/posts/` 目录；\n2. 新建一个 `.md` 文件，例如 `my-thoughts-on-ios.md`；\n3. 在文件顶部写入 Frontmatter 元数据；\n4. 保存文件，Next.js 会自动热重载，网站立刻上线你的新文章！\n\n---\n\n## Frontmatter 元数据模板\n\n在 `.md` 文件开头用两个 `---` 包裹元数据：\n\n```yaml\n---\ntitle: \"你的文章标题\"\ndate: \"2026-10-21\"\nsummary: \"这是文章的简要摘要，会展示在文章列表和社交分享卡片中。\"\ntags: [\"Vibecoding\", \"macOS\", \"随笔\"]\ncategory: \"开发哲学\" # 例如：开发哲学 / 产品实战 / 随笔思考\nauthor: \"JohnnyBoy\"\nfeatured: true # 设置为 true 则会在博客首页置顶展示\n---\n```\n\n### 字段说明表\n\n| 字段名 | 类型 | 是否必填 | 说明 |\n| :--- | :--- | :--- | :--- |\n| **title** | 字符串 | 必填 | 文章标题 |\n| **date** | 日期格式 | 必填 | 发布日期，如 `YYYY-MM-DD` |\n| **summary** | 字符串 | 推荐 | 摘要简介（用于 SEO 与卡片预览） |\n| **tags** | 数组 | 可选 | 标签列表，如 `[\"macOS\", \"Swift\"]` |\n| **category** | 字符串 | 可选 | 分类名称，如 `产品实战` |\n| **featured** | 布尔值 | 可选 | 为 `true` 时在博客首页大卡片置顶 |\n\n---\n\n## 丰富的排版组件支持\n\n我们的 Markdown 渲染器支持全套现代排版规范：\n\n### 1. 代码块与 Mac 终端风高亮\n\n包含红黄绿三个苹果控制点与一键复制代码功能：\n\n```typescript\nexport function sayHello(name: string): string {\n  return `Hello, ${name}! Welcome to JohnnyBoyStudio.`;\n}\n```\n\n### 2. GitHub 风格提示框 (Callouts)\n\n你可以使用 `> [!NOTE]`、`> [!TIP]`、`> [!WARNING]` 或 `> [!IMPORTANT]` 创建漂亮的提示卡片：\n\n> [!NOTE]\n> 这是 Note 提示卡片，适合标注说明和背景信息。\n\n> [!TIP]\n> 这是 Tip 心得卡片，适合分享快捷技巧与推荐做法。\n\n> [!WARNING]\n> 这是 Warning 警告卡片，适合提醒潜在风险。\n\n> [!IMPORTANT]\n> 这是 Important 重要卡片，适合强调核心原则！\n\n### 3. 表格与引用\n\n支持标准 Markdown 表格与引用样式：\n\n> 优秀的设计不是添加不可再添加的东西，而是减少到不可再减少。\n\n现在就开始写你的第一篇文章吧！\n"
  }
];

export const postsEn: BlogPost[] = [
  {
    "slug": "assistant-01-on-device-ai",
    "title": "Assistant (小助): Building a 100% On-Device Offline AI & Ambient Loop on iPhone and Apple Watch",
    "date": "2026-11-09",
    "summary": "Most lifestyle and expense apps require constant cloud uploads or force you to hop across 4-5 fragmented tools. Here is how I built an on-device multi-modal AI assistant for iOS 18 & watchOS 11 powered by Metal GPU, completing daily routines hands-free.",
    "tags": [
      "iOS",
      "watchOS",
      "assistant-01",
      "SwiftUI",
      "OnDeviceAI",
      "Metal",
      "Vibecoding"
    ],
    "category": "Product Notes",
    "author": "JohnnyBoy",
    "readingTime": "4 min read",
    "wordCount": 691,
    "featured": true,
    "cover": "/blog/assistant/home.jpg",
    "content": "\n## Why I Built a 100% On-Device Offline Life Assistant\n\nAs an avid iPhone and Apple Watch user, my daily micro-tasks were scattered everywhere:\n- When a courier sends a pickup code, I had to dig through SMS or WeChat while walking;\n- After a 450ml Americano or a quick meal, I wanted to quickly log the cost, calories, and hydration;\n- Before stepping out the door, the OCD kicks in: do I have my keys, badges, and IDs?\n- Sensitive photos of IDs or private credentials should never be uploaded to any commercial cloud.\n\nMainstream apps suffer from two major flaws:\n1. **Privacy leaks & cloud dependence**: Logging meals, voice notes, or expenses usually requires pinging a remote server — failing completely in elevators, basements, or Airplane Mode;\n2. **Fragmented workflows**: Expenses in one app, to-dos in Reminders, hydration in a third health app. You constantly jump between 4 or 5 different apps every single day.\n\nSo I built a personal, hacker-grade offline assistant tailored strictly for my own routine: **Assistant (小助)**.\n\n---\n\n## Core Architecture & Technical Evolution\n\n```\n┌─────────────────────────────────────────────────────────────────┐\n│                    iOS 18 + watchOS 11 Dual-Device UI            │\n│   Dedicated Apple Watch App  │  Dynamic Island  │  Widgets     │\n└────────────────────────────────▲────────────────────────────────┘\n                                 │ (Optimistic replay & idempotent sync)\n┌────────────────────────────────┴────────────────────────────────┐\n│                   Omnibox 16-in-1 Multi-Modal Intake            │\n│      Text Input   │   Floating Voice Orb   │   Receipt OCR      │\n└────────────────────────────────┬────────────────────────────────┘\n                                 │ (Strict GBNF grammars)\n┌────────────────────────────────▼────────────────────────────────┐\n│                    On-Device Inference Registry                 │\n│      Native llama.xcframework    │       Qwen3-VL-2B (mtmd)     │\n│   (Metal GPU / Qwen3 GGUF)       │    (LLM + Vision Encoder)    │\n└────────────────────────────────┬────────────────────────────────┘\n                                 │\n┌────────────────────────────────▼────────────────────────────────┐\n│                  SwiftData V12 + Keychain Hardened Local Store  │\n│   Schedules  │  Nutrients & Water  │  Dual Index  │  Face ID    │\n└─────────────────────────────────────────────────────────────────┘\n```\n\n### 1. Metal GPU Acceleration & On-Device Vision (Qwen3 + VL)\nEarly iterations relied on simple heuristic rules, but complex colloquial phrasing quickly broke rigid parsers.\n\nIn the late 2026 update, the inference pipeline was completely overhauled:\n- **Embedded `llama.xcframework`**: Directly taps into Apple Silicon's Metal GPU and Unified Memory to run quantized **Qwen3 GGUF** models offline;\n- **GBNF Grammar Constraints**: Strict grammar-based sampling constrains open-ended LLM tokens into 16 validated JSON schema intents, eliminating hallucinations at the root;\n- **On-Device Vision (Qwen3-VL-2B)**: Runs language models alongside `mmproj` vision encoders to estimate meal calories and nutrients completely offline.\n\n---\n\n## 5 Practical Loops for Real-World Scenarios\n\n### 1. Daily Focus & Seamless Expense Tracking\n\nWhen designing the Home and Expense tabs, I deliberately cut out cognitive noise:\n- **Home \"What to do right now\"**: Instead of overwhelming you with 50 to-dos, the home screen spotlights the single most crucial task at the current moment, backed by an interactive **Day Timeline**;\n- **\"Safe to Spend\" & Workday Savings**: After deducting fixed commitments from monthly budgets, it computes a daily spend allowance. Weekday savings roll over into the weekend pool.\n\n![Home: Day Timeline & Immediate Focus](/blog/assistant/home.jpg)\n![Expenses: Safe to Spend & Budget Rhythm](/blog/assistant/expense.jpg)\n\n### 2. Life Vault: 17 Ambient Modules as Your Second Brain\n\nStop dividing life management across 5 different apps. Assistant comes with a consolidated **Life Vault**:\n- **8 Core Asset Tiles**: Life milestones, Face ID credential vault, offline passwords, item holding cost & warranty, departure checklist, and vehicle notes;\n- **Dynamic Frequency Sorting**: 17 sub-modules dynamically float to the top based on real-world usage frequency.\n\n![Life Vault: 17 Categorized Modules & Dynamic Ranking](/blog/assistant/vault.jpg)\n\n### 3. Dedicated Apple Watch App: Hands-Free Wrist Triage\n\nAssistant features a native **watchOS 11 companion app** communicating via idempotent Command Envelopes:\n- **Pickup Codes on Wrist**: Near the locker geofence, pickup codes pop up on the watch screen. Hands full with packages? Tap \"Picked up\" on your wrist to dismiss;\n- **Departure Checklist**: Check off keys, wallet, badges on wrist or lock screen with red dots on essentials;\n- **Optimistic Offline Sync**: Action items while away from your phone; everything reconciles cleanly once reconnected.\n\n### 4. Block-Based Voice Memos & Peer-to-Peer Bump Sharing\n\nCapturing thoughts is no longer just dry audio files:\n- **Segmented Block Memos**: Hold the voice orb anywhere, pause and resume anytime; on-device ASR breaks transcripts into editable text & image blocks exportable as high-res long cards;\n- **Offline Bump Sharing**: Bump two iPhones together to transfer to-do lists or split bills offline without cloud intermediaries;\n- **Hardened WebDAV NAS Backup**: Client-side **PBKDF2 (310k rounds) + AES-256-GCM** encryption ensures data remains uncrackable even on public networks.\n\n![Voice Memos: Segmented Transcripts & Audio Slices](/blog/assistant/memo.jpg)\n![Settings: Offline Bump Sharing & Customization](/blog/assistant/settings.jpg)\n\n---\n\n## Conclusion: Build What You Love to Use Daily\n\nAssistant is the direct fruit of **Vibecoding**: 12 iterations of schema migrations and over 1,100 automated pure-logic tests.\n\nNo subscription popups, no surveillance trackers — just laser focus on eliminating daily friction. Pure, offline, and snappy — turning the iPhone and Apple Watch into a truly secure personal second brain.\n"
  },
  {
    "slug": "ferry-swift6-resilient-file-transfer",
    "title": "Ferry: Reimagining the macOS Dual-Pane SFTP Client with Swift 6 Strict Concurrency",
    "date": "2026-10-31",
    "summary": "Why do legacy SFTP clients crash, freeze, or silently overwrite critical files on production servers? Here is how I designed Ferry for macOS 15+ around Swift 6 strict concurrency, a RelayEngine server-to-server workspace, and 3-way DiffPlan truth-table conflict guards.",
    "tags": [
      "macOS",
      "Ferry",
      "Swift 6",
      "SFTP",
      "Concurrency",
      "Productivity"
    ],
    "category": "Product Notes",
    "author": "JohnnyBoy",
    "readingTime": "3 min read",
    "wordCount": 463,
    "featured": true,
    "content": "\n## Why Do We Still Need a Brand-New SFTP Client Today?\n\nWhen managing remote Linux servers, dev clusters, or cloud archives, an engineer interacts with file transfer tools every single working day.\n\nYet classical macOS clients (such as FileZilla, Cyberduck, etc.) consistently deliver a painful experience:\n1. **Outdated, non-native legacy UI**: Clunky scrolling on Retina displays, zero support for modern macOS gestures, completely out of touch with macOS 15+ design aesthetics;\n2. **Data races and sudden crashes**: When transferring thousands of files across an unstable connection, the UI frequently freezes or the entire app crashes due to uncaught concurrency errors;\n3. **The silent overwrite nightmare**: When files change on both ends, traditional tools lack a clear visual DiffPlan, easily clobbering production code without warning.\n\nAs a developer who values absolute predictability and clean visual craft, I refused to compromise. **Ferry** was born with one fundamental rule: **\"Zero dynamic C dependencies at the core, strictly defensive transfers, and zero user data loss.\"**\n\n---\n\n## Core Architecture & Engineering Highlights\n\n```\n┌────────────────────────────────────────────────────────┐\n│             SwiftUI + AppKit Hybrid UI Matrix          │\n│   Multi-Session Connection Tabs  │  Native Dual-Pane   │\n└───────────────────────────▲────────────────────────────┘\n                            │ (Strict MainActor isolation)\n┌───────────────────────────┴────────────────────────────┐\n│      Swift 6 Strict Concurrency Scheduler (TaskGroup)  │\n│   Per-task fault isolation │ Independent Limits │ Retry │\n└───────────────────────────┬────────────────────────────┘\n                            │\n┌───────────────────────────▼────────────────────────────┐\n│                  Core Engine & Protocols               │\n│   RelayEngine Server-to-Server │ 3-Way DiffPlan Matrix │\n│   libssh2 + OpenSSL 3 (SFTP)   │ libcurl + TLS 1.3     │\n└────────────────────────────────────────────────────────┘\n```\n\n### 1. Swift 6 Strict Concurrency Architecture\nFerry is built from ground up on Swift 6's strict concurrency model:\n- All UI drawing and view mutations are isolated with `@MainActor`;\n- Each upload and download task executes inside an independent structured `TaskGroup`. A single transient network failure never tears down concurrent streams;\n- Data races are eliminated at compile time. Memory consumption remains rock-solid even during tens of thousands of batch file transfers.\n\n### 2. RelayEngine: Streaming Server-to-Server Direct Transfers\nIn traditional workflows, moving 50GB from Server A to Server B requires downloading files to your local Mac SSD first, then re-uploading them to Server B. This doubles network usage and wastes SSD endurance.\n\nIn the newly released **1.0.0-beta.2**, Ferry introduces the **RelayEngine Workspace**:\n- Establishes a direct streaming pipeline where the local Mac acts purely as the command control plane;\n- Zero local disk staging, doubling cross-cloud migration throughput.\n\n### 3. 3-Way Sync & Truth-Table DiffPlan\nIn sync mode, Ferry strictly prohibits silent overwrites:\n- Evaluates differences between Local, Remote, and Last Known Baseline into an atomic truth table;\n- Generates an actionable DiffPlan visualizing upstream pushes, downstream pulls, and collision warnings. Irreversible changes require explicit user authorization.\n\n### 4. Polished Specifically for macOS\n- **Full Credential Matrix**: Passwords store safely in the macOS Keychain; supports modern OpenSSH private keys, encrypted passphrases, and local `ssh-agent` forwarding;\n- **Finder Bidirectional Drag Matrix**: Full drag-and-drop support with system Finder, Promise lazy downloads, and Spacebar Quick Look previews;\n- **Traffic Shaping & Scheduled Transfers**: Independent upstream/downstream bandwidth limits, plus scheduled off-peak automated backups.\n\n---\n\n## Conclusion\n\nThe mark of a great tool is not feature bloat, but the unwavering sense of **reliability** when stakes are highest. Every pixel and concurrent task in Ferry is tuned so macOS users can transfer with absolute peace of mind.\n"
  },
  {
    "slug": "why-vibecoding-for-indie-devs",
    "title": "Why I Chose Vibecoding: Real Notes from a One-Person Workshop",
    "date": "2026-10-21",
    "summary": "Not to please investors or imaginary needs, only to fix my own daily pain points. How AI pair programming and Vibecoding let me build snappy, efficient Mac-native tools I actually want to use every day.",
    "tags": [
      "Vibecoding",
      "Indie Dev",
      "Thoughts",
      "AI Coding"
    ],
    "category": "Philosophy",
    "author": "JohnnyBoy",
    "readingTime": "3 min read",
    "wordCount": 470,
    "featured": true,
    "content": "\n## Pain Points Are the Best Pool of Requirements\n\nAfter years of building indie tools, my biggest takeaway is: **if you aren't the one who suffers through using it every day, it's easy to build flashy, useless features.**\n\nBuilding an app used to be a long process: sketch prototypes, write interaction specs, set up the framework, read docs, fix bugs... After weeks or months, the passion was long worn down by tedious engineering setup. Worse, many features I built, I wouldn't use even once a month.\n\nUntil Vibecoding (vibe coding / intent-driven programming) became my main way of working, and everything changed.\n\n> [!NOTE]\n> **What is Vibecoding?**\n> Vibecoding doesn't mean blindly letting AI generate a pile of uncontrollable junk code. The developer steers the taste, architecture and core flow, while handing concrete implementation and debugging to a brilliant model partner — for fast, end-to-end delivery.\n\n---\n\n## The Self-Making Rules of a One-Person Studio\n\nAt JohnnyBoyStudio, I set three iron rules for myself:\n\n### 1. Never write code for imaginary personas\nEvery one of my tools (the photo culling workbench **QuickPick**, the life assistant **assistan01**, the cross-device ferry **Ferry**) started for one reason only — **I was personally annoyed by something every single day.**\nIf I can't be bothered to use it, it shouldn't exist.\n\n### 2. Sharp interactions, no bloat\nA good tool is a sharp Swiss army knife, not a toolbox stuffed with twenty plastic attachments.\n- Launch must be millisecond-fast;\n- Operations need clear tactile and shortcut feedback;\n- Never interrupt the user's attention in critical flows.\n\n### 3. Local first, respect the data\nUsers' assets, photos and privacy are sacred. Originals are never uploaded to the cloud; all image computation and local SQLite records stay on the user's Mac.\n\n```swift\n// A good native experience is about stripping out tedious waiting\nfunc renderPhotoCanvas(rawPath: URL) async throws -> DecodedImage {\n    // Millisecond native decoding, 100% read-only safe\n    let safeBuffer = try await LocalDecoders.loadReadOnly(rawPath)\n    return safeBuffer.renderToMetalSurface()\n}\n```\n\n---\n\n## How Vibecoding Changed My Flow\n\nIn the past, writing a complex Metal composition overlay or a multi-threaded Rust scanner meant poring over dozens of pages of low-level API manuals and debugging memory alignment.\n\nWith modern Vibecoding:\n1. **Express intent**: I tell my AI pair exactly the visual feel, composition ratios (golden spiral and thirds) and zero-copy performance I want;\n2. **Iterate fast**: the model generates the skeleton while I do taste review and edge-case stress testing;\n3. **Stay in flow**: my mind isn't stuck on semicolons and config errors, but stays at the high level of **product vision** and **user experience**.\n\n> [!TIP]\n> When building tools for yourself, don't fear being too niche. As long as you make it exceptionally comfortable in some vertical scenario, there are surely others as picky as you waiting for it.\n\n---\n\n## Closing\n\nBuilt for my own needs — apps that fit like a glove.\n\nThat's the whole reason JohnnyBoyStudio exists. I'll keep sharing thoughts on native macOS / iOS development, low-level Rust practice and indie self-making here — come visit often.\n"
  },
  {
    "slug": "quickpick-local-first-architecture",
    "title": "Building QuickPick, a Lightning-Fast Culling Workbench: A Tauri + Rust Read-Only Architecture",
    "date": "2026-10-20",
    "summary": "What do commercial photographers fear most when culling? Lag, and accidentally deleting originals. Here's how I used Tauri + Rust with Pixi.js hardware acceleration to build a 100% read-only, local-first culling workbench.",
    "tags": [
      "macOS",
      "QuickPick",
      "Tauri",
      "Rust",
      "Imaging"
    ],
    "category": "Product Notes",
    "author": "JohnnyBoy",
    "readingTime": "2 min read",
    "wordCount": 384,
    "featured": false,
    "content": "\n## Why Are Lightroom and Other Editors Still Not Fast Enough?\n\nAfter every commercial shoot, you plug in the card reader and face 2000+ 45-megapixel RAW files. The frustration of waiting for catalog import and smart previews is something only photographers truly know.\n\nHeavyweight software tends to lump \"culling\", \"grading & retouching\" and \"library management\" together. But in reality: **culling is an extremely high-frequency process that demands millisecond decisions.**\n\nWhat I need:\n1. **Plug and view**: no waiting on a minute-long import progress bar;\n2. **Absolute safety**: 100% read-only originals — never modify, overwrite or delete your negatives;\n3. **Pro assistance**: 5 built-in composition guides, an AI funnel for closed eyes and severe defocus, and real-time film 3D LUT preview.\n\nSo **QuickPick** was born.\n\n---\n\n## Architecture Choice: Why Tauri + Rust + Pixi.js?\n\nWhen choosing the stack, I compared pure Electron, pure Swift/AppKit and Tauri + Rust.\n\n| Approach | Bundle size | Memory | Cross-platform | Image performance |\n| :--- | :--- | :--- | :--- | :--- |\n| **Electron** | > 180MB | High (Chromium) | Strong | Moderate |\n| **Pure Swift/AppKit** | < 25MB | Very low | Apple only | Very high (Metal) |\n| **Tauri + Rust (QuickPick)** | ~18MB | Very low | Very high (Mac/Win) | Very high (multi-threaded SIMD) |\n\nI went with **Tauri + Rust** for three reasons:\n\n1. **Read-only access locked at the OS level**: Rust's ownership model and strong type system ensure file operations on negatives only happen through read-only handles;\n2. **Pixi.js v8 hardware acceleration**: golden spirals, rule-of-thirds guides and high-frame-rate pan & zoom on a WebGL/WebGPU canvas feel as smooth as native;\n3. **Bundle size and startup**: under 20MB packaged, and startup in under 300 ms.\n\n```rust\n// Design of the read-only safety layer for originals\npub struct SafeRawHandle {\n    path: PathBuf,\n    read_only: bool,\n}\n\nimpl SafeRawHandle {\n    pub fn open_readonly(path: PathBuf) -> Result<Self, QuickPickError> {\n        // Strictly open in read-only mode; write access is forbidden\n        let _file = std::fs::OpenOptions::new()\n            .read(true)\n            .write(false)\n            .create(false)\n            .open(&path)?;\n\n        Ok(Self { path, read_only: true })\n    }\n}\n```\n\n---\n\n## Composition Guides and 3D LUT Film Looks\n\nDuring first-pass culling, it's hard to spot a subtle closed eye or cropping potential at a glance.\n\nQuickPick has 5 built-in GPU-shader-driven composition guides:\n- **Rule of Thirds**: the classic safe zone for portraits;\n- **Golden Spiral**: guides the eye to a dramatic focal point;\n- **Dynamic Symmetry**: calibrates complex spatial relationships in big shots.\n\n> [!TIP]\n> With real-time 3D LUT (.cube) coloring, photographers can see Fuji Classic Chrome or Kodak Tri-X black & white looks while picking, making culling decisions over 3x faster.\n\n---\n\n## What's Next\n\nQuickPick is continuously improving the reject funnel and EXIF art frame export. All the code is open source on GitHub, with a free dmg download.\nFellow photographers, come chat with me!\n"
  },
  {
    "slug": "how-to-publish-new-article",
    "title": "How to Publish a New Post on This Blog: A Minimal Markdown Writing Guide",
    "date": "2026-10-19",
    "summary": "Drop a .md file into content/posts/ and it's live instantly! Covers frontmatter fields, code highlighting, callouts and a quick syntax reference.",
    "tags": [
      "Blog Guide",
      "Markdown",
      "Writing",
      "Next.js"
    ],
    "category": "Guide",
    "author": "JohnnyBoy",
    "readingTime": "2 min read",
    "wordCount": 301,
    "featured": false,
    "content": "\n## Publish a New Post in 3 Seconds\n\nThis blog module is built for efficient writing: **no database, no admin password — everything is driven by local Markdown files**.\n\nWhenever you want to publish a post, just follow these steps:\n\n1. Open the project's `content/posts/` directory;\n2. Create a `.md` file, e.g. `my-thoughts-on-ios.md`;\n3. Write the frontmatter metadata at the top of the file;\n4. Save. Next.js hot-reloads and your post goes live right away!\n\n> [!TIP]\n> To add an English version, create a file with the same name plus `.en.md` (e.g. `my-thoughts-on-ios.en.md`). Posts without an English version fall back to the original.\n\n---\n\n## Frontmatter Template\n\nWrap the metadata at the top of the `.md` file with two `---` lines:\n\n```yaml\n---\ntitle: \"Your post title\"\ndate: \"2026-10-21\"\nsummary: \"A short summary shown in the post list and social share cards.\"\ntags: [\"Vibecoding\", \"macOS\", \"Essay\"]\ncategory: \"Philosophy\" # e.g. Philosophy / Product Notes / Essays\nauthor: \"JohnnyBoy\"\nfeatured: true # true pins the post on the blog home page\n---\n```\n\n### Field Reference\n\n| Field | Type | Required | Description |\n| :--- | :--- | :--- | :--- |\n| **title** | string | Required | Post title |\n| **date** | date | Required | Publish date, e.g. `YYYY-MM-DD` |\n| **summary** | string | Recommended | Summary (used for SEO and card previews) |\n| **tags** | array | Optional | Tag list, e.g. `[\"macOS\", \"Swift\"]` |\n| **category** | string | Optional | Category name, e.g. `Product Notes` |\n| **featured** | boolean | Optional | When `true`, pinned as the large card on the blog home |\n\n---\n\n## Rich Typesetting Components\n\nOur Markdown renderer supports a full set of modern typesetting features:\n\n### 1. Code Blocks with Mac Terminal Styling\n\nWith the three red/yellow/green Apple dots and one-click code copy:\n\n```typescript\nexport function sayHello(name: string): string {\n  return `Hello, ${name}! Welcome to JohnnyBoyStudio.`;\n}\n```\n\n### 2. GitHub-style Callouts\n\nUse `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]` or `> [!IMPORTANT]` to create nice callout cards:\n\n> [!NOTE]\n> This is a Note card, great for remarks and background info.\n\n> [!TIP]\n> This is a Tip card, great for sharing shortcuts and recommended practices.\n\n> [!WARNING]\n> This is a Warning card, great for flagging potential risks.\n\n> [!IMPORTANT]\n> This is an Important card, great for stressing core principles!\n\n### 3. Tables and Quotes\n\nStandard Markdown tables and blockquotes are supported:\n\n> Great design is not when there is nothing more to add, but when there is nothing more to take away.\n\nNow go write your first post!\n"
  }
];
