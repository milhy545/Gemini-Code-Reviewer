# 🤖 Gemini Code Reviewer - Monorepo

**Multi-platform AI code reviewer** postavený na Google Gemini AI.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](/)
[![Monorepo](https://img.shields.io/badge/monorepo-Turborepo-blueviolet.svg)](https://turbo.build/)

---

## 🌍 Platformy

Tento monorepo obsahuje **3 platformy** sdílející stejný kód:

| Platform | Status | Tech Stack | Usage |
|----------|--------|------------|-------|
| 🌐 **Web App** | ✅ Ready | React + Vite | `pnpm web:dev` |
| 🔌 **Browser Extension** | 🔨 MVP | React + WXT | `pnpm extension:dev` |
| 🖥️ **Desktop App** | 🔨 Structure | React + Tauri | `pnpm desktop:dev` |

---

## 📦 Struktura

```
gemini-code-reviewer/
├── apps/
│   ├── web/              # Web aplikace (localhost)
│   ├── extension/        # Browser extension (Chrome, Firefox)
│   └── desktop/          # Desktop app (Windows, macOS, Linux)
├── packages/
│   ├── shared/           # Sdílené React komponenty, hooks, utils
│   └── core/             # Core business logika (Gemini AI service)
├── turbo.json            # Turborepo config
├── pnpm-workspace.yaml   # PNPM workspace
└── package.json          # Root package manager
```

**Výhoda:** Komponenty, hooks a business logika jsou **sdílené** across všech platforem!

---

## 🚀 Quick Start

### **Prerequisites:**
- Node.js 18+
- pnpm 8+ (`npm install -g pnpm`)
- Google Gemini API klíč ([získat zde](https://ai.google.dev/))

### **Setup:**

```bash
# 1. Clone repo
git clone <repo>
cd gemini-code-reviewer

# 2. Install all dependencies
pnpm install

# 3. Build packages
pnpm build

# 4. Setup API key
echo "API_KEY=your_gemini_api_key" > apps/web/.env.local
```

### **Run Specific App:**

```bash
# Web app (localhost:5173)
pnpm web:dev

# Browser extension (with hot reload)
pnpm extension:dev

# Desktop app (Tauri)
pnpm desktop:dev
```

### **Run All Apps (parallel):**

```bash
pnpm dev  # Runs all apps concurrently
```

---

## 📚 Dokumentace

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Kompletní architektura monorepo
- **[apps/web/README.md](./apps/web/README.md)** - Web app guide
- **[apps/extension/README.md](./apps/extension/README.md)** - Extension guide
- **[apps/desktop/README.md](./apps/desktop/README.md)** - Desktop guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Historie změn

---

## 🎯 Features

### **Všechny platformy:**
- ✅ AI Code Review (Gemini 2.5 Flash/Pro)
- ✅ Automatická oprava kódu s komentáři
- ✅ 11+ programovacích jazyků
- ✅ 5 review presets (Security, Performance, Best Practices, atd.)
- ✅ Dark/Light mode
- ✅ Historie a statistiky
- ✅ Export (Markdown, JSON, HTML)
- ✅ Keyboard shortcuts

### **Browser Extension navíc:**
- 📌 Side panel na jakékoliv stránce
- 🖱️ Context menu (Pravý klik → Review)
- 💻 GitHub integration (Review v PR)
- ⌨️ `Ctrl+Shift+Y` otevře panel

### **Desktop App navíc:**
- 🔔 System tray integration
- ⌨️ Global shortcuts (`Ctrl+Alt+G`)
- 📂 Přístup k lokálním souborům
- ⚡ Malý installer (~5MB)

---

## 🔧 Development

### **Workspace Commands:**

```bash
# Install deps for all workspaces
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint all code
pnpm lint

# Clean all build artifacts
pnpm clean
```

### **Individual App Commands:**

```bash
# Web app
cd apps/web
pnpm dev
pnpm build

# Extension
cd apps/extension
pnpm dev              # Dev mode with hot reload
pnpm build           # Build for all browsers
pnpm build:chrome    # Chrome only
pnpm build:firefox   # Firefox only
pnpm zip             # Create .zip for store

# Desktop
cd apps/desktop
pnpm tauri:dev       # Dev mode
pnpm tauri:build     # Production build
```

---

## 📦 Packages

### **@gemini-reviewer/core**
Core business logika bez React závislostí.

```typescript
import { reviewCode, correctCode, AI_MODELS } from '@gemini-reviewer/core';
```

**Obsahuje:**
- Gemini AI service
- TypeScript types
- Konstanty (languages, models, presets)

### **@gemini-reviewer/shared**
Sdílené React komponenty, hooks, utils.

```typescript
import {
  Header, Settings, CodeInput,
  useTheme, useSettings, useHistory,
  storage, analytics, exportUtils
} from '@gemini-reviewer/shared';
```

**Obsahuje:**
- React komponenty (Header, Settings, CodeInput, atd.)
- Custom hooks (useTheme, useSettings, atd.)
- Utility funkce (storage, analytics, export)

---

## 🏗️ Build System

Používáme **Turborepo** pro efektivní builds:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Benefits:**
- ⚡ **Parallel builds** - Build multiple packages concurrently
- 📦 **Smart caching** - Skip unchanged packages
- 🔄 **Dependency graph** - Correct build order
- 🎯 **Filtering** - Build only what changed

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|------------|
| **Monorepo** | Turborepo + pnpm workspaces |
| **Language** | TypeScript 5.8 |
| **UI** | React 19 + Tailwind CSS |
| **Web** | Vite 6.2 |
| **Extension** | WXT (cross-browser framework) |
| **Desktop** | Tauri 2.0 (Rust + React) |
| **AI** | Google Gemini API |
| **Testing** | Vitest + Playwright |

---

## 📝 Roadmap

### ✅ **Phase 1: Foundation** (Hotovo)
- [x] Monorepo setup (Turborepo + pnpm)
- [x] Packages (core, shared)
- [x] Web app migration
- [x] Basic extension structure
- [x] Basic desktop structure

### 🔨 **Phase 2: Extension** (V práci)
- [ ] Side panel implementation
- [ ] GitHub integration (PR reviews)
- [ ] Context menu actions
- [ ] Browser store publishing

### 🔨 **Phase 3: Desktop** (Plánováno)
- [ ] Main window implementation
- [ ] System tray
- [ ] Global shortcuts
- [ ] Multi-platform builds

### 🔨 **Phase 4: Integration** (Plánováno)
- [ ] Page Assist plugin API
- [ ] Plugin implementation
- [ ] Shared state management

### 🔨 **Phase 5: Polish** (Plánováno)
- [ ] Unit tests (all packages)
- [ ] E2E tests (extension + desktop)
- [ ] Performance optimization
- [ ] CI/CD pipelines

---

## 🤝 Contributing

Toto je monorepo projekt. Contributions jsou vítány!

### **Add new shared component:**
```bash
# 1. Add to packages/shared/src/components/
# 2. Export from packages/shared/src/components/index.ts
# 3. Use in any app:
import { NewComponent } from '@gemini-reviewer/shared';
```

### **Add new feature to specific app:**
```bash
# Work in specific app directory
cd apps/web  # or extension, desktop
# Make changes
# Test locally
pnpm dev
```

---

## 📄 License

MIT License - See [LICENSE](./LICENSE)

---

## 🙏 Credits

- [Google Gemini AI](https://ai.google.dev/) - AI engine
- [Turborepo](https://turbo.build/) - Monorepo build system
- [WXT](https://wxt.dev/) - Cross-browser extension framework
- [Tauri](https://tauri.app/) - Desktop app framework
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool

---

**Made with ❤️ using Turborepo, React, TypeScript, WXT, and Tauri**

**Questions?** Check [ARCHITECTURE.md](./ARCHITECTURE.md) or open an issue!
