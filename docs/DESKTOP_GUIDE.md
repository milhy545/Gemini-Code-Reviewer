# 🖥️ Desktop App - User Guide

Gemini Code Reviewer jako nativní desktopová aplikace pro Windows, macOS a Linux.

## 🎯 Funkce

### ✨ Hlavní funkce

- **Native App** - Nativní aplikace postavená na Tauri (Rust + React)
- **System Tray** - Běží v systémové liště, vždy po ruce
- **Global Shortcuts** - Ctrl+Alt+G pro okamžité otevření odkudkoliv
- **File Dialog** - Nativní dialog pro otevírání souborů
- **Offline-capable** - Veškerá logika kromě AI běží lokálně
- **Malá velikost** - ~5MB instalátor (vs. Electron ~150MB)
- **Nízká spotřeba** - Minimální využití RAM a CPU

### 🔧 Pokročilé funkce

- **Batch Review** - Kontrola více souborů/složek najednou
- **Snippets Library** - Knihovna často používaných kódových vzorů
- **History** - Historie všech kontrol s možností exportu
- **Stats** - Statistiky použití a analýzy
- **Dark Mode** - Tmavý/světlý režim
- **Export** - Export výsledků do Markdown, PDF, HTML, JSON
- **Quick Review** - Rychlá kontrola ze system tray
- **Hide on Close** - Aplikace se minimalizuje do tray místo ukončení

## 📥 Instalace

### Windows

#### Metoda 1: Installer (.msi)
1. Stáhněte `Gemini-Code-Reviewer_2.0.0_x64.msi`
2. Dvojklik na soubor
3. Postupujte podle průvodce instalací
4. Aplikace se nainstaluje do `C:\Program Files\Gemini Code Reviewer`

#### Metoda 2: Portable (.exe)
1. Stáhněte `Gemini-Code-Reviewer_2.0.0_x64.exe`
2. Přesuňte do libovolné složky
3. Spusťte přímým kliknutím (není potřeba instalace)

### macOS

#### Metoda 1: DMG Image
1. Stáhněte `Gemini-Code-Reviewer_2.0.0_universal.dmg`
2. Otevřete DMG soubor
3. Přetáhněte aplikaci do složky Applications
4. Při prvním spuštění: Pravý klik → Open (obejde se Gatekeeper)

#### Metoda 2: Homebrew (PŘIPRAVUJEME)
```bash
brew install --cask gemini-code-reviewer
```

### Linux

#### Debian/Ubuntu (.deb)
```bash
sudo dpkg -i gemini-code-reviewer_2.0.0_amd64.deb
sudo apt-get install -f  # Doinstaluje závislosti
```

#### Fedora/RHEL (.rpm)
```bash
sudo rpm -i gemini-code-reviewer-2.0.0.x86_64.rpm
```

#### AppImage (Universal)
```bash
chmod +x Gemini-Code-Reviewer_2.0.0_amd64.AppImage
./Gemini-Code-Reviewer_2.0.0_amd64.AppImage
```

#### Arch Linux (AUR)
```bash
yay -S gemini-code-reviewer
```

## ⚙️ Konfigurace

### První spuštění

1. Spusťte aplikaci
2. Klikněte na ⚙️ (Settings)
3. Zadejte váš **Google Gemini API Key**
   - Získat API klíč: https://makersuite.google.com/app/apikey
   - API klíč se ukládá lokálně na vašem počítači (není sdílený)

### Nastavení API klíče

```
Settings → API Key → Zadejte klíč → Save
```

API klíč je uložen v:
- **Windows**: `%APPDATA%\com.gemini.code-reviewer\config.json`
- **macOS**: `~/Library/Application Support/com.gemini.code-reviewer/config.json`
- **Linux**: `~/.config/com.gemini.code-reviewer/config.json`

### Další nastavení

- **AI Model**: Vyberte model (Flash/Pro)
- **Review Focus**: Zaměření kontroly (Complete, Security, Performance, Best Practices, Bugs)
- **Auto-save History**: Automaticky ukládat historii
- **Dark Mode**: Tmavý/světlý režim
- **Max History Items**: Počet uchovávaných položek v historii

## 🚀 Použití

### 1. Základní použití

**Otevření aplikace:**
- Klikněte na ikonu v system tray
- Nebo použijte global shortcut: `Ctrl+Alt+G` (Win/Linux) nebo `Cmd+Alt+G` (Mac)

**Workflow:**
1. **Vložit kód** - Napište nebo vložte kód do editoru
2. **Nebo otevřít soubor** - Klikněte "📂 Otevřít soubor" a vyberte soubor
3. **Vybrat jazyk** - Automaticky detekován z přípony souboru
4. **Review nebo Correction** - Klikněte příslušné tlačítko
5. **Prohlédnout výsledky** - Výsledky se zobrazí v pravém panelu

### 2. System Tray

**Funkce v tray menu:**
- **Show Window** - Zobrazit hlavní okno
- **Hide Window** - Skrýt okno (aplikace běží na pozadí)
- **Quick Review** - Rychlá kontrola aktuálního kódu
- **Quit** - Ukončit aplikaci

**Quick Review:**
1. Zadejte kód do editoru
2. Minimalizujte okno
3. Pravý klik na ikonu v tray → "Quick Review"
4. Aplikace se otevře a automaticky spustí review

**Hide on Close:**
- Když zavřete okno (křížek), aplikace se pouze minimalizuje do tray
- Pro úplné ukončení použijte Quit z menu nebo Ctrl+Q

### 3. File Operations

**Otevření souboru:**
1. Klikněte "📂 Otevřít soubor"
2. Vyberte soubor z nativního dialogu
3. Obsah se automaticky načte do editoru
4. Jazyk se automaticky nastaví podle přípony

**Podporované formáty:**
- JavaScript/TypeScript: .js, .ts, .jsx, .tsx
- Python: .py
- Java: .java
- Go: .go
- Rust: .rs
- C/C++: .c, .cpp, .h
- C#: .cs
- Ruby: .rb
- PHP: .php
- Swift: .swift
- Kotlin: .kt
- Scala: .scala

**Drag & Drop:** (PŘIPRAVUJEME)
- Přetáhněte soubor do okna aplikace
- Automaticky se načte

### 4. Batch Review (Dávková kontrola)

**Použití:**
1. Klikněte na "📦 Batch Review"
2. Vyberte více souborů najednou (Ctrl+klik nebo Shift+klik)
3. Klikněte "Zkontrolovat X souborů"
4. Aplikace postupně zkontroluje všechny soubory
5. Průběh můžete sledovat v progress baru
6. Po dokončení exportujte výsledky

**Výhody:**
- Kontrola celého projektu najednou
- Automatická detekce jazyka
- Export do jednoho dokumentu
- Pokračování po chybě (nekončí při první chybě)

### 5. Snippets Library (Knihovna snippetů)

**Vytvoření snippetu:**
1. Klikněte na "📚 Snippets"
2. "➕ Nový snippet"
3. Vyplňte:
   - Název (např. "React useState Hook")
   - Popis (volitelný)
   - Jazyk
   - Tagy (pro lepší vyhledávání)
   - Kód
4. Uložte

**Použití snippetu:**
1. Otevřete Snippets Library
2. Vyhledejte snippet (podle názvu, tagu, jazyka)
3. Klikněte na snippet v seznamu
4. Prohlédněte si detail
5. Klikněte "Použít" - načte se do editoru

**Import/Export snippetů:**
```json
{
  "name": "React useState",
  "language": "typescript",
  "code": "const [state, setState] = useState(initialValue);",
  "tags": ["react", "hooks"]
}
```

### 6. Historie & Statistiky

**Historie:**
- Automaticky ukládá všechny reviews (pokud je zapnuto v nastavení)
- Filtrování podle data, jazyka, modelu
- Kliknutím na položku se načte původní kód a výsledek
- Možnost smazat jednotlivé položky nebo vymazat vše

**Statistiky:**
- Celkový počet reviews a corrections
- Graf použití v čase
- Nejpoužívanější jazyky
- Nejpoužívanější modely
- Průměrný čas zpracování
- Reset statistik

## 🎨 Klávesové zkratky

### Globální (fungují kdykoliv)
| Zkratka | Akce |
|---------|------|
| `Ctrl+Alt+G` | Otevřít/přenést fokus na aplikaci |

### V aplikaci
| Zkratka | Akce |
|---------|------|
| `Ctrl+O` | Otevřít soubor |
| `Ctrl+Enter` | Spustit review |
| `Ctrl+Shift+Enter` | Spustit correction |
| `Ctrl+,` | Otevřít nastavení |
| `Ctrl+H` | Zobrazit historii |
| `Ctrl+B` | Batch review |
| `Ctrl+L` | Snippets library |
| `Ctrl+Q` | Ukončit aplikaci |
| `Esc` | Zavřít modaly |
| `F11` | Fullscreen |

## 💾 Export výsledků

**Podporované formáty:**
- **Markdown** (.md) - Pro dokumentaci, README
- **PDF** (.pdf) - Pro sdílení, prezentace
- **HTML** (.html) - Pro web, emailing
- **JSON** (.json) - Pro další zpracování, API

**Export:**
1. Po dokončení review klikněte "💾 Export"
2. Vyberte formát
3. Vyberte umístění v nativním dialogu
4. Soubor se uloží

**Batch Export:**
- V Batch Review můžete exportovat všechny výsledky do jednoho souboru
- Každý soubor má vlastní sekci s názvem a výsledky

## 🔧 Pokročilá konfigurace

### Konfigurace přes config.json

Manuálně upravte konfigurační soubor:

```json
{
  "apiKey": "your-api-key",
  "aiModel": "gemini-2.5-flash",
  "reviewFocus": "complete",
  "autoSaveHistory": true,
  "darkMode": true,
  "maxHistoryItems": 50,
  "language": "cs"
}
```

Restart aplikace po změnách.

### Automatický start při spuštění systému

#### Windows:
1. Win+R → `shell:startup`
2. Vytvořte shortcut na aplikaci
3. Přesuňte do otevřené složky

#### macOS:
1. System Preferences → Users & Groups
2. Login Items → klikněte "+"
3. Vyberte Gemini Code Reviewer

#### Linux (systemd):
```bash
[Desktop Entry]
Type=Application
Name=Gemini Code Reviewer
Exec=/usr/bin/gemini-code-reviewer
Hidden=true
X-GNOME-Autostart-enabled=true
```

Uložte do `~/.config/autostart/gemini-code-reviewer.desktop`

### Limity

- **Max délka kódu**: 50,000 znaků
- **Max velikost souboru**: 1MB
- **Max requests za minutu**: 10 (Google Gemini limit)
- **History items**: Max 50 položek (konfigurovatelné)
- **Snippets**: Neomezený počet

## 🎨 Přizpůsobení

### Změna tématu
Settings → Appearance → Dark/Light Mode

### Vlastní CSS (PŘIPRAVUJEME)
```css
/* custom.css */
.code-editor {
  font-family: "Fira Code", monospace;
  font-size: 14px;
}
```

Umístěte do:
- Windows: `%APPDATA%\com.gemini.code-reviewer\custom.css`
- macOS/Linux: `~/.config/com.gemini.code-reviewer/custom.css`

## 🐛 Řešení problémů

### Aplikace se nespustí

**Windows:**
- Ujistěte se, že máte nainstalovaný [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
- Zkuste spustit jako administrátor
- Zkontrolujte antivirus (může blokovat Tauri aplikace)

**macOS:**
- Při prvním spuštění: Pravý klik → Open
- System Preferences → Security → "Allow apps from: anywhere"

**Linux:**
- Ujistěte se, že máte nainstalované závislosti:
  ```bash
  # Debian/Ubuntu
  sudo apt install libwebkit2gtk-4.0-dev libgtk-3-dev

  # Fedora
  sudo dnf install webkit2gtk3-devel gtk3-devel
  ```

### API chyby

**"API key not found"**
- Ujistěte se, že jste zadali API klíč v nastavení
- Zkontrolujte, že klíč je validní na https://makersuite.google.com
- Zkuste konfigurační soubor smazat a zadat klíč znovu

**"Rate limit exceeded"**
- Počkejte 1 minutu a zkuste znovu
- Gemini API má limit 10 requestů za minutu
- Zvažte upgrade na placený plán pro vyšší limity

**"Network error"**
- Zkontrolujte připojení k internetu
- Zkontrolujte firewall (aplikace potřebuje přístup k gemini.google.com)
- Zkuste deaktivovat VPN

### System Tray nefunguje

**Windows:**
- Zkontrolujte, že ikona není skrytá v "Hidden Icons"
- System Tray settings → Select icons

**Linux:**
- Některé desktop environmenty nepodporují system tray
- Zkuste nainstalovat extension pro podporu tray (GNOME)
- KDE Plasma má plnou podporu

### Global Shortcut nefunguje

- Zkontrolujte, že zkratka není použita jinou aplikací
- Zkuste změnit zkratku v nastavení (PŘIPRAVUJEME)
- Restart aplikace

### Vysoká spotřeba paměti

- Aplikace by měla používat ~100-200MB RAM
- Vyčistěte historii: Settings → Clear History
- Snižte Max History Items v nastavení
- Restart aplikace

## 🔄 Aktualizace

### Automatické aktualizace (PŘIPRAVUJEME)
Aplikace kontroluje aktualizace při spuštění a nabídne download nové verze.

### Manuální aktualizace
1. Stáhněte novou verzi z GitHub Releases
2. Nainstalujte přes původní instalaci
3. Nastavení a data zůstanou zachována

## 📦 Build z source kódu

```bash
# Clone repository
git clone https://github.com/yourusername/gemini-code-reviewer.git
cd gemini-code-reviewer

# Install dependencies
pnpm install

# Build desktop app
cd apps/desktop
pnpm tauri:build

# Output:
# Windows: target/release/bundle/msi/
# macOS: target/release/bundle/dmg/
# Linux: target/release/bundle/deb/ (nebo rpm/AppImage)
```

## 🆘 Podpora

- **Issues**: https://github.com/yourusername/gemini-code-reviewer/issues
- **Discussions**: https://github.com/yourusername/gemini-code-reviewer/discussions
- **Email**: support@example.com
- **Discord**: https://discord.gg/gemini-code-reviewer

## 📝 Changelog

### v2.0.0 (2025-01-18)
- ✨ Desktop aplikace s Tauri
- ✨ System Tray integration
- ✨ Global shortcuts (Ctrl+Alt+G)
- ✨ Native file dialog
- ✨ Batch Review
- ✨ Snippets Library
- ✨ Hide on close
- ✨ Quick Review from tray
- 🎨 Dark/Light mode
- 🔧 Multi-platform support (Windows, macOS, Linux)

### v1.0.0 (2024)
- 🎉 První vydání web aplikace

## 📄 Licence

MIT License - viz [LICENSE](../LICENSE) soubor

---

**🌟 Užijte si efektivnější code reviews s nativní desktopovou aplikací! 🌟**
