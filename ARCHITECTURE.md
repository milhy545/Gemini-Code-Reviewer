# 🏗️ Gemini Code Reviewer - Architektura Monorepo

## 📦 Struktura Projektu

```
gemini-code-reviewer/ (root monorepo)
├── apps/
│   ├── web/              # Web aplikace (Vite + React)
│   ├── extension/        # Browser extension (WXT framework)
│   └── desktop/          # Desktop app (Tauri)
├── packages/
│   ├── shared/           # Sdílené React komponenty, hooks, utils
│   └── core/             # Core business logika (services, types)
├── turbo.json            # Turborepo konfigurace
├── pnpm-workspace.yaml   # PNPM workspace
└── package.json          # Root package manager
```

---

## 🎯 Package Architecture

### **@gemini-reviewer/core**
Core business logika bez React závislostí.

**Exports:**
```typescript
import {
  // Types
  AIModel, ReviewFocus, Settings, ReviewHistoryItem,

  // Constants
  LANGUAGES, AI_MODELS, REVIEW_PRESETS,

  // Services
  reviewCode, correctCode, validateApiKey
} from '@gemini-reviewer/core';
```

**Soubory:**
```
packages/core/
├── src/
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── services/
│   │   └── geminiService.ts  # Gemini AI integration
│   ├── constants.ts           # Konstanty (jazyky, modely, presety)
│   └── index.ts              # Main export
└── package.json
```

---

### **@gemini-reviewer/shared**
Sdílené React komponenty, hooks a utility.

**Exports:**
```typescript
import {
  // Components
  Header, Settings, HistoryPanel, StatsPanel,
  CodeInput, FeedbackDisplay, CorrectedCodeDisplay,

  // Hooks
  useTheme, useSettings, useHistory, useKeyboardShortcuts,

  // Utils
  storage, analytics, exportUtils, chunkingUtils
} from '@gemini-reviewer/shared';
```

**Soubory:**
```
packages/shared/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Settings.tsx
│   │   ├── HistoryPanel.tsx
│   │   ├── StatsPanel.tsx
│   │   ├── HelpModal.tsx
│   │   ├── ExportMenu.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── CodeInput.tsx
│   │   ├── FeedbackDisplay.tsx
│   │   ├── CorrectedCodeDisplay.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── icons/              # SVG icons
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useSettings.ts
│   │   ├── useHistory.ts
│   │   └── useKeyboardShortcuts.ts
│   ├── utils/
│   │   ├── storage.ts          # localStorage wrapper
│   │   ├── analytics.ts        # Usage tracking
│   │   ├── export.ts           # Export to PDF/JSON/MD
│   │   └── chunking.ts         # Large file handling
│   └── index.ts
└── package.json
```

---

## 🌐 Apps Architecture

### **1. Web App** (`apps/web/`)

**Standalone web aplikace běžící na localhost.**

```
apps/web/
├── src/
│   ├── App.tsx        # Main app component
│   ├── index.tsx      # Entry point
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

**Dependencies:**
```json
{
  "dependencies": {
    "@gemini-reviewer/shared": "workspace:*",
    "@gemini-reviewer/core": "workspace:*",
    "react": "^19.2.0",
    "@google/genai": "^1.23.0"
  }
}
```

**Usage:**
```bash
cd apps/web
pnpm dev     # localhost:5173
pnpm build   # Production build
```

---

### **2. Browser Extension** (`apps/extension/`)

**Cross-browser extension s WXT frameworkem.**

```
apps/extension/
├── entrypoints/
│   ├── sidepanel.tsx      # Side panel UI
│   ├── popup.tsx          # Extension popup
│   ├── content.tsx        # Content scripts
│   ├── background.ts      # Background worker
│   └── newtab.tsx         # New tab page
├── public/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── wxt.config.ts
└── package.json
```

**Features:**
- 📌 **Side panel** - Review kódu v side panelu
- 🖱️ **Context menu** - Pravý klik → Review vybraný kód
- 💻 **GitHub integration** - Review button v PR
- 🔍 **Code detection** - Auto-detekce kódu na stránce
- ⌨️ **Keyboard shortcuts** - `Ctrl+Shift+Y` otevře panel

**Browser Support:**
- Chrome/Edge/Brave (Chromium)
- Firefox
- Safari (via conversion)

**Build:**
```bash
cd apps/extension
pnpm dev        # Dev mode s hot reload
pnpm build      # Build pro všechny browsery
pnpm zip        # Create .zip pro store upload
```

---

### **3. Desktop App** (`apps/desktop/`)

**Nativní desktop aplikace s Tauri.**

```
apps/desktop/
├── src/            # Frontend (React)
│   ├── App.tsx
│   └── main.tsx
├── src-tauri/      # Backend (Rust)
│   ├── src/
│   │   └── main.rs
│   ├── tauri.conf.json
│   └── Cargo.toml
├── vite.config.ts
└── package.json
```

**Features:**
- 🖥️ **Native window** - Nativní aplikace (ne Electron)
- 🔔 **System tray** - Icon v system tray
- ⌨️ **Global shortcuts** - Ctrl+Alt+G otevře app
- 📂 **File system** - Přístup k lokálním souborům
- ⚡ **Malý size** - ~5MB installer (vs Electron ~150MB)

**Platform Support:**
- Windows (.exe, .msi)
- macOS (.dmg, .app)
- Linux (.deb, .AppImage)

**Build:**
```bash
cd apps/desktop
pnpm tauri dev      # Dev mode
pnpm tauri build    # Production build
```

---

## 🔗 Sdílený Kód Flow

### **Import Flow:**

```typescript
// apps/web/src/App.tsx
import { Header, Settings, CodeInput } from '@gemini-reviewer/shared';
import { reviewCode, AI_MODELS } from '@gemini-reviewer/core';

// apps/extension/entrypoints/sidepanel.tsx
import { Header, CodeInput } from '@gemini-reviewer/shared';
import { reviewCode } from '@gemini-reviewer/core';

// apps/desktop/src/App.tsx
import { Header, Settings } from '@gemini-reviewer/shared';
import { reviewCode } from '@gemini-reviewer/core';
```

### **Výhody:**
✅ **DRY** - Kód jednou, použij všude
✅ **Consistency** - Stejné UI across platforms
✅ **Maintainability** - Fix bug jednou, opraví se všude
✅ **Type safety** - TypeScript across the stack

---

## 🚀 Development Workflow

### **Initial Setup:**
```bash
# Install pnpm globally
npm install -g pnpm

# Clone repo
git clone <repo>
cd gemini-code-reviewer

# Install all dependencies (root + workspaces)
pnpm install

# Build all packages
pnpm build
```

### **Run Specific App:**
```bash
# Web app
pnpm web:dev

# Browser extension
pnpm extension:dev

# Desktop app
pnpm desktop:dev
```

### **Run All Apps (parallel):**
```bash
pnpm dev  # Turborepo runs all apps
```

### **Build for Production:**
```bash
# Build all
pnpm build

# Build specific
pnpm web:build
pnpm extension:build
pnpm desktop:build
```

---

## 🔌 Page Assist Integration

### **Plugin API Design:**

```typescript
// packages/shared/src/plugins/page-assist-plugin.ts

export interface PageAssistPlugin {
  id: 'code-reviewer';
  name: 'Gemini Code Reviewer';
  version: '2.0.0';

  // Lifecycle hooks
  activate(context: PluginContext): void;
  deactivate(): void;

  // Features
  features: {
    codeReview: boolean;
    codeCorrection: boolean;
    githubIntegration: boolean;
  };

  // Methods called by Page Assist
  handleTextSelection(text: string): Promise<ReviewResult>;
  handleCodeBlock(code: string, language: string): Promise<ReviewResult>;

  // UI contribution
  getSidebarComponent(): React.ComponentType;
  getSettingsPanel(): React.ComponentType;
}
```

### **Integration Flow:**

```
Page Assist Host
     ↓
  Plugin API
     ↓
Code Reviewer Plugin
     ↓
@gemini-reviewer/shared (komponenty)
     ↓
@gemini-reviewer/core (services)
```

### **Shared State:**
- API klíče (shared across plugins)
- Theme (dark/light mode sync)
- Historie (optionally shared)

---

## 🧪 Testing Strategy

### **Unit Tests:**
```bash
packages/core/
  ├── __tests__/
  │   ├── geminiService.test.ts
  │   └── constants.test.ts

packages/shared/
  ├── __tests__/
  │   ├── hooks/
  │   ├── utils/
  │   └── components/
```

**Framework:** Vitest + React Testing Library

### **E2E Tests:**
```bash
apps/extension/
  └── e2e/
      ├── sidepanel.spec.ts
      └── github-integration.spec.ts

apps/desktop/
  └── e2e/
      └── main-window.spec.ts
```

**Framework:** Playwright

### **Run Tests:**
```bash
pnpm test              # All tests
pnpm test:unit         # Unit only
pnpm test:e2e          # E2E only
pnpm test:coverage     # With coverage
```

---

## 📊 Build System (Turborepo)

### **turbo.json:**
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
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### **Benefits:**
- ⚡ **Parallel builds** - Build packages concurrently
- 📦 **Caching** - Skip unchanged packages
- 🔄 **Dependency graph** - Correct build order
- 🎯 **Filtering** - Build only what changed

---

## 🎨 Tech Stack Summary

| Layer | Technology |
|-------|------------|
| **Monorepo** | Turborepo + pnpm |
| **Language** | TypeScript |
| **UI Framework** | React 19 |
| **Styling** | Tailwind CSS |
| **Web Build** | Vite |
| **Extension Framework** | WXT |
| **Desktop Framework** | Tauri |
| **AI Engine** | Google Gemini API |
| **Testing** | Vitest + Playwright |
| **CI/CD** | GitHub Actions |

---

## 📝 Next Steps

### **Phase 1: Foundation** ✅
- [x] Monorepo setup
- [x] Packages (core, shared)
- [x] Web app migration

### **Phase 2: Extension** 🔨
- [ ] WXT setup
- [ ] Side panel implementation
- [ ] GitHub integration
- [ ] Context menu
- [ ] Build for stores

### **Phase 3: Desktop** 🔨
- [ ] Tauri setup
- [ ] Main window
- [ ] System tray
- [ ] Global shortcuts
- [ ] Build for platforms

### **Phase 4: Integration** 🔨
- [ ] Page Assist plugin API
- [ ] Plugin implementation
- [ ] Shared state management
- [ ] Documentation

### **Phase 5: Polish** 🔨
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Documentation
- [ ] CI/CD pipelines

---

**Made with ❤️ using Turborepo, React, TypeScript, WXT, and Tauri**
