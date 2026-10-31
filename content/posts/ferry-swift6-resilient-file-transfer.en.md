---
title: "Ferry: Reimagining the macOS Dual-Pane SFTP Client with Swift 6 Strict Concurrency"
date: "2026-10-31"
summary: "Why do legacy SFTP clients crash, freeze, or silently overwrite critical files on production servers? Here is how I designed Ferry for macOS 15+ around Swift 6 strict concurrency, a RelayEngine server-to-server workspace, and 3-way DiffPlan truth-table conflict guards."
tags: ["macOS", "Ferry", "Swift 6", "SFTP", "Concurrency", "Productivity"]
category: "Product Notes"
author: "JohnnyBoy"
featured: true
---

## Why Do We Still Need a Brand-New SFTP Client Today?

When managing remote Linux servers, dev clusters, or cloud archives, an engineer interacts with file transfer tools every single working day.

Yet classical macOS clients (such as FileZilla, Cyberduck, etc.) consistently deliver a painful experience:
1. **Outdated, non-native legacy UI**: Clunky scrolling on Retina displays, zero support for modern macOS gestures, completely out of touch with macOS 15+ design aesthetics;
2. **Data races and sudden crashes**: When transferring thousands of files across an unstable connection, the UI frequently freezes or the entire app crashes due to uncaught concurrency errors;
3. **The silent overwrite nightmare**: When files change on both ends, traditional tools lack a clear visual DiffPlan, easily clobbering production code without warning.

As a developer who values absolute predictability and clean visual craft, I refused to compromise. **Ferry** was born with one fundamental rule: **"Zero dynamic C dependencies at the core, strictly defensive transfers, and zero user data loss."**

---

## Core Architecture & Engineering Highlights

```
┌────────────────────────────────────────────────────────┐
│             SwiftUI + AppKit Hybrid UI Matrix          │
│   Multi-Session Connection Tabs  │  Native Dual-Pane   │
└───────────────────────────▲────────────────────────────┘
                            │ (Strict MainActor isolation)
┌───────────────────────────┴────────────────────────────┐
│      Swift 6 Strict Concurrency Scheduler (TaskGroup)  │
│   Per-task fault isolation │ Independent Limits │ Retry │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  Core Engine & Protocols               │
│   RelayEngine Server-to-Server │ 3-Way DiffPlan Matrix │
│   libssh2 + OpenSSL 3 (SFTP)   │ libcurl + TLS 1.3     │
└────────────────────────────────────────────────────────┘
```

### 1. Swift 6 Strict Concurrency Architecture
Ferry is built from ground up on Swift 6's strict concurrency model:
- All UI drawing and view mutations are isolated with `@MainActor`;
- Each upload and download task executes inside an independent structured `TaskGroup`. A single transient network failure never tears down concurrent streams;
- Data races are eliminated at compile time. Memory consumption remains rock-solid even during tens of thousands of batch file transfers.

### 2. RelayEngine: Streaming Server-to-Server Direct Transfers
In traditional workflows, moving 50GB from Server A to Server B requires downloading files to your local Mac SSD first, then re-uploading them to Server B. This doubles network usage and wastes SSD endurance.

In the newly released **1.0.0-beta.2**, Ferry introduces the **RelayEngine Workspace**:
- Establishes a direct streaming pipeline where the local Mac acts purely as the command control plane;
- Zero local disk staging, doubling cross-cloud migration throughput.

### 3. 3-Way Sync & Truth-Table DiffPlan
In sync mode, Ferry strictly prohibits silent overwrites:
- Evaluates differences between Local, Remote, and Last Known Baseline into an atomic truth table;
- Generates an actionable DiffPlan visualizing upstream pushes, downstream pulls, and collision warnings. Irreversible changes require explicit user authorization.

### 4. Polished Specifically for macOS
- **Full Credential Matrix**: Passwords store safely in the macOS Keychain; supports modern OpenSSH private keys, encrypted passphrases, and local `ssh-agent` forwarding;
- **Finder Bidirectional Drag Matrix**: Full drag-and-drop support with system Finder, Promise lazy downloads, and Spacebar Quick Look previews;
- **Traffic Shaping & Scheduled Transfers**: Independent upstream/downstream bandwidth limits, plus scheduled off-peak automated backups.

---

## Conclusion

The mark of a great tool is not feature bloat, but the unwavering sense of **reliability** when stakes are highest. Every pixel and concurrent task in Ferry is tuned so macOS users can transfer with absolute peace of mind.
