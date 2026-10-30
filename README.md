# ZenCord Mobile 📱

<p align="center">
  <b>High-performance, modular, and privacy-centric Discord mobile client modification.</b><br>
  Official mobile counterpart to <a href="https://github.com/turki-basha/ZenCord">ZenCord Desktop</a>.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-GPLv3-0969da.svg?style=flat-square" alt="License: GPL-3.0"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Language-TypeScript-3178c6.svg?style=flat-square" alt="TypeScript"></a>
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-2ea44f.svg?style=flat-square" alt="Platform: Android | iOS">
  <a href="https://www.zencord.site/"><img src="https://img.shields.io/badge/Website-zencord.site-5865f2.svg?style=flat-square" alt="Website"></a>
  <a href="https://discord.gg/zencord"><img src="https://img.shields.io/badge/Community-Discord-5865f2.svg?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

---

## 🌟 Overview

**ZenCord Mobile** brings the raw speed, customization power, and privacy safeguards of **ZenCord** to Android and iOS mobile devices. 

Built on a lightweight, modular TypeScript runtime targeting Discord's React Native environment, ZenCord Mobile operates without native overhead or UI lag while seamlessly integrating with the **ZenCord Ecosystem**.

---

## ✨ Key Features

- 🎖️ **Unified ZenCord Badges Sync:** Seamlessly renders official ZenCord badges (**Developer**, **VIP**, **Supporter**, **Official Bot**, and **Custom**) directly on user profiles, chat headers, and member lists in real-time, fetching directly from [zencord.site/api/badges](https://www.zencord.site/api/badges).
- 🚀 **Zero-Lag React Native Hooking:** Patches Discord's Metro bundler and Hermes bytecode efficiently without battery drain or framerate drops.
- 🎨 **Deep Theming Engine:** Custom color palettes, dark themes, OLED black modes, and custom fonts for touch displays.
- 🧩 **Extensible Mobile Plugins:** Dynamic add-on ecosystem with built-in mobile essentials (NoTrack telemetry blocker, QuickInstall, FakeNitro, and more).
- 🔄 **Over-The-Air (OTA) Instant Updates:** Automatically receives ZenCord core and badge updates instantly upon launch without requiring manual APK reinstallation.
- 🛡️ **Safe Mode & Recovery:** Built-in safeguards to disable malfunctioning add-ons or reset settings safely on boot.

---

## 📲 Installation

### Option 1: Pre-Patched Standalone APK (Recommended for most users)
1. Download the latest `ZenCord-Mobile.apk` from the [Releases](https://github.com/turki-basha/ZencordMobile/releases) page.
2. Install the APK on your Android device (no root required).
3. Log in to your Discord account and enjoy ZenCord Mobile with full badges and plugin support!

### Option 2: Using Xposed / LSPosed (Rooted Devices)
1. Install [BunnyXposed / LSPatch](https://github.com/bunny-mod/BunnyXposed).
2. Enable the module for Discord.
3. ZenCord Mobile will hook into Discord upon startup.

---

## 🛠️ Building From Source

### Prerequisites
- **Node.js:** `v20.0.0` or higher
- **pnpm:** `v9+` or `v10+` (or `npm`)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/turki-basha/ZencordMobile.git
   cd ZencordMobile
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Build the production bundle:**
   ```bash
   pnpm build
   ```
   The compiled bundle will be generated in `dist/zencord.js` and `dist/zencord.min.js`.

4. **Live Development Server:**
   ```bash
   pnpm serve
   ```
   This serves the bundle locally on `http://<your-local-ip>:4040/zencord.js`. You can point your mobile client's **ZenCord Developer Settings** -> **Load from custom URL** to this endpoint for instant hot-reload testing.

---

## 🎖️ Badges System Architecture

ZenCord Mobile queries the unified ZenCord API infrastructure:
1. `https://www.zencord.site/api/badges`
2. `https://zencord.site/api/badges`
3. Fallback: `https://raw.githubusercontent.com/turki-basha/ZenCord/main/badges.json`

Desktop and Mobile users share the exact same badges, avatars, and custom roles across all devices.

---

## 📜 License & Credits

- Licensed under **[GNU General Public License v3.0](LICENSE)** (GPL-3.0-or-later).
- Copyright (c) 2026 **ZenCord Team & Turki Basha**.
- Based on research and modular tooling from the Discord mobile modding community (Bunny, Pyoncord, Vendetta).
