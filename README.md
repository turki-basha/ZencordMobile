# ZenCord Mobile

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865f2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/EYzpnZuSba)
[![Website](https://img.shields.io/badge/Website-zencord.site-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.zencord.site/)
[![GitHub](https://img.shields.io/badge/GitHub-ZenCord%20Mobile-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/turki-basha/ZencordMobile)
[![License](https://img.shields.io/badge/License-BSD--3--Clause-0969da?style=for-the-badge)](LICENSE)

**The most advanced & lightweight Discord mobile client modification.**

Built for modern Discord (React Native), featuring complete plugin, theme, font customization, full Arabic localization support, and zero bloat.

---

## Features

- **Blazing Fast & Lightweight**: Optimized bundle size with instant startup and smooth performance.
- **Custom Plugins & Ecosystem**: Full compatibility with plugins and themes.
- **Custom Fonts**: Apply any custom font directly on mobile.
- **Native Arabic Localization**: First-class Arabic support and right-to-left layout care.
- **Privacy Friendly**: Disables Discord telemetry, analytics tracking, and telemetry crash reporting.
- **Universal Loader Compatibility**: Works with pre-patched standalone APKs (non-root) and LSPosed/Xposed modules (root).

---

## Building from Source

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) or `npm`

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/turki-basha/ZencordMobile.git
   cd ZencordMobile
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the bundle:
   ```bash
   pnpm run build
   ```
   The built bundle will be output to `dist/zencord.js` (and `dist/zencord.min.js`).

4. Development / Live Reloading:
   ```bash
   pnpm run serve
   ```
   This will start a local server at port `4040`. On your phone in **ZenCord Settings > Developer Settings**, enable **Load from custom URL** and point it to:
   ```
   http://<YOUR_LOCAL_IP>:4040/zencord.js
   ```

---

## Community & Support

Join our official ZenCord Community Discord server:  
**https://discord.gg/EYzpnZuSba**

Official Website:  
**https://www.zencord.site/**

---

## Disclaimer
Discord is a trademark of Discord Inc. ZenCord Mobile is not affiliated with, endorsed by, or sponsored by Discord Inc. Using client modifications is technically against Discord's Terms of Service. Use at your own discretion.
