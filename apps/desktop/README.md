# 🖥️ Gemini Code Reviewer - Desktop App

Nativní desktop aplikace postavená na **Tauri** + **React**.

## ✨ Features

- 🖥️ **Native window** - Malá, rychlá nativní aplikace
- 🔔 **System tray** - Icon v system tray s quick access
- ⌨️ **Global shortcuts** - Ctrl+Alt+G otevře app kdekoli
- 📂 **File system** - Přístup k lokálním souborům
- ⚡ **~5MB installer** - Malý size (vs Electron ~150MB)

## 🚀 Development

```bash
# Install dependencies (v root monorepo)
cd ../.. && pnpm install

# Run dev server
cd apps/desktop
pnpm tauri:dev

# Build for production
pnpm tauri:build
```

## 📦 Build Output

**Windows:**
- `.exe` - Portable executable
- `.msi` - Windows installer

**macOS:**
- `.dmg` - Disk image
- `.app` - Application bundle

**Linux:**
- `.deb` - Debian package
- `.AppImage` - Universal Linux app

## 🔧 Configuration

Edit `src-tauri/tauri.conf.json`:

```json
{
  "productName": "Gemini Code Reviewer",
  "version": "2.0.0",
  "identifier": "com.gemini.code-reviewer"
}
```

## 🎯 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Rust (Tauri)
- **Build**: Tauri CLI
- **Shared Code**: @gemini-reviewer/shared & core

---

**Pro tip:** Desktop app sdílí stejný kód jako web a extension díky monorepo!
