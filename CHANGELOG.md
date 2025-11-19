# Changelog

All notable changes to Gemini Code Reviewer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-18

### 🎉 Major Release - Complete Overhaul

This is a complete rewrite and enhancement of the Gemini Code Reviewer with numerous new features, improved UX, and robustness.

### ✨ Added

#### Core Features
- **Multi-Model Support** - Added support for multiple Gemini models (2.5 Flash, 2.5 Pro, 1.5 Flash, 1.5 Pro)
- **Review Presets** - 5 specialized review focuses:
  - Complete Review (all aspects)
  - Security Focus (vulnerabilities, secure coding)
  - Performance Focus (optimization, complexity)
  - Best Practices Focus (code quality, readability)
  - Bug Detection Focus (logic errors, edge cases)

#### UI/UX Enhancements
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Settings Panel** - Comprehensive configuration modal
  - Theme selection
  - AI model selection
  - Review focus presets
  - UI language (Czech/English)
  - Toggle options (auto-save, line numbers, syntax highlighting, sounds)
- **History Panel** - Side panel for managing review history
  - Search functionality
  - Review/correction indicators
  - Delete individual items
  - Clear all history
  - Re-load previous reviews
- **Statistics Dashboard** - Analytics and usage tracking
  - Total reviews and corrections
  - Average processing time
  - Language usage statistics
  - Model usage statistics
- **Help Modal** - Comprehensive help and documentation
  - About section
  - How to use guide
  - Keyboard shortcuts reference
  - Feature list
  - FAQ section
- **Export Menu** - Export results to multiple formats
  - Markdown (.md)
  - JSON (.json)
  - HTML (.html) - with print-friendly styling

#### Developer Experience
- **Keyboard Shortcuts** - Full keyboard navigation support
  - `Ctrl+Enter` - Review code
  - `Ctrl+Shift+Enter` - Correct code
  - `Ctrl+,` - Open settings
  - `Ctrl+H` - Open history
  - `Ctrl+K` - Clear code
  - `Ctrl+D` - Toggle theme
  - `Ctrl+Shift+S` - Export results
  - `Shift+?` - Show help
- **Progress Indicators** - Visual feedback during AI processing
- **Header Component** - Unified navigation with quick access buttons
- **Improved Error Handling** - Better error messages and validation

#### Technical Infrastructure
- **Custom React Hooks**
  - `useTheme` - Theme management with localStorage persistence
  - `useSettings` - Settings state management
  - `useHistory` - History management with localStorage
  - `useKeyboardShortcuts` - Global keyboard shortcut handling
- **Utility Modules**
  - `storage.ts` - Safe localStorage wrapper with error handling
  - `analytics.ts` - Usage tracking and statistics
  - `export.ts` - Export functionality for multiple formats
  - `chunking.ts` - Large file support with code chunking
- **TypeScript Types** - Comprehensive type definitions
  - Theme, AIModel, ReviewFocus, Settings
  - ReviewHistoryItem, AnalyticsData
  - ModelInfo, ReviewPreset
- **Enhanced Constants** - Organized configuration
  - AI models configuration
  - Review presets
  - File extensions mapping
  - Rate limiting constants
  - Storage limits

### 🎨 Changed

#### UI/UX Improvements
- **Modernized Design** - Complete UI redesign with Tailwind CSS
- **Responsive Layout** - Better mobile and tablet support
- **Better Visual Hierarchy** - Improved spacing, colors, and typography
- **Smooth Transitions** - Added transitions for theme changes and interactions
- **Custom Scrollbars** - Styled scrollbars for better aesthetics

#### Component Updates
- **CodeInput** - Updated for dark mode support
- **FeedbackDisplay** - Enhanced styling and dark mode
- **CorrectedCodeDisplay** - Improved layout and dark mode
- **LanguageSelector** - Dark mode support

#### Service Layer
- **geminiService.ts** - Enhanced to support:
  - Multiple AI models
  - Review focus customization
  - Better error handling
  - API key validation
  - Processing time estimation

### 🐛 Fixed
- **localStorage Quota** - Added quota management and cleanup
- **Error Messages** - Improved user-friendly error messages
- **Type Safety** - Fixed TypeScript strict mode issues
- **Memory Leaks** - Proper cleanup in useEffect hooks
- **Speech Synthesis** - Better handling of TTS cleanup

### 🔧 Technical Details

#### New Files Created
```
components/
  - Header.tsx
  - Settings.tsx
  - HistoryPanel.tsx
  - StatsPanel.tsx
  - HelpModal.tsx
  - ExportMenu.tsx
  - ProgressBar.tsx

hooks/
  - useTheme.ts
  - useSettings.ts
  - useHistory.ts
  - useKeyboardShortcuts.ts

utils/
  - storage.ts
  - analytics.ts
  - export.ts
  - chunking.ts

types/
  - index.ts
```

#### Updated Files
```
- App.tsx (complete rewrite)
- index.html (dark mode support, custom CSS)
- constants.ts (expanded with new configs)
- services/geminiService.ts (multi-model support)
- components/CodeInput.tsx (dark mode)
- components/FeedbackDisplay.tsx (dark mode)
- components/CorrectedCodeDisplay.tsx (dark mode)
- components/LanguageSelector.tsx (dark mode)
```

### 📦 Dependencies
- React 19.2.0
- TypeScript 5.8.2
- Vite 6.2.0
- @google/genai 1.23.0
- Tailwind CSS (via CDN)

### 🔐 Security
- No external data storage (everything in localStorage)
- API key stored in environment variables
- Client-side only architecture
- No backend required

### 📊 Performance
- Optimized component re-renders
- Lazy loading of modals
- Efficient localStorage usage
- Progress indication for long operations

### ♿ Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management in modals
- Screen reader friendly

---

## [1.0.0] - 2025-10-10

### 🎉 Initial Release

#### Features
- Basic code review using Gemini 2.5 Flash
- Code correction with inline comments
- Support for 11 programming languages
- File upload functionality
- Download corrected code
- Text-to-speech for feedback
- Basic error handling

#### Languages Supported
- JavaScript, TypeScript
- Python, Java, C#
- PHP, Ruby, Go
- HTML, CSS, SQL

#### Components
- CodeInput
- FeedbackDisplay
- CorrectedCodeDisplay
- LanguageSelector
- Icon components

---

## Future Plans (Roadmap)

### v2.1.0 (Planned)
- [ ] Syntax highlighting with Prism.js
- [ ] Side-by-side diff viewer
- [ ] Multiple code snippets comparison
- [ ] Code snippets library
- [ ] Custom review templates

### v2.2.0 (Planned)
- [ ] More AI models (Claude, GPT-4)
- [ ] Batch processing
- [ ] API rate limiting UI
- [ ] Usage quotas and warnings
- [ ] Advanced analytics charts

### v3.0.0 (Future)
- [ ] Backend API
- [ ] User authentication
- [ ] Cloud storage for history
- [ ] Team collaboration features
- [ ] CI/CD integration

---

**Legend:**
- ✨ Added - New features
- 🎨 Changed - Changes in existing functionality
- 🐛 Fixed - Bug fixes
- 🔧 Technical - Technical improvements
- 📦 Dependencies - Dependency updates
- 🔐 Security - Security improvements
- 📊 Performance - Performance improvements
- ♿ Accessibility - Accessibility improvements
