# 🔧 Troubleshooting Guide

Kompletní průvodce řešením problémů napříč všemi platformami.

## 📋 Obsah

- [Obecné problémy](#obecné-problémy)
- [Web App](#web-app-problémy)
- [Browser Extension](#browser-extension-problémy)
- [Desktop App](#desktop-app-problémy)
- [API Problémy](#api-problémy)
- [Build Problémy](#build-problémy)

---

## Obecné problémy

### ❌ API klíč nefunguje

**Symptomy:**
- Chyba "API key not found"
- Chyba "Invalid API key"

**Řešení:**

1. **Zkontrolujte formát API klíče:**
   ```
   Správný formát: AIza...
   Délka: ~39 znaků
   ```

2. **Ověřte klíč na Google AI Studio:**
   - Navštivte https://makersuite.google.com/app/apikey
   - Zkontrolujte, že klíč existuje a je aktivní
   - Zkuste vygenerovat nový klíč

3. **Ujistěte se, že klíč je správně zadán:**
   - Bez mezer na začátku/konci
   - Bez uvozovek
   - Celý klíč (zkopírujte celý řetězec)

4. **Clear storage a zadejte znovu:**
   - Web: DevTools → Application → Clear Storage
   - Extension: chrome://extensions → Remove → Reinstall
   - Desktop: Smazat config soubor

### ❌ "Rate limit exceeded"

**Symptomy:**
- Chyba po několika reviews
- "Too many requests"

**Řešení:**

1. **Počkejte 60 sekund** - Google Gemini limit je 10 requests/minutu

2. **Použijte batch review s delay:**
   - Batch review automaticky přidává 1s delay mezi requesty

3. **Upgrade na placený plán:**
   - Free tier: 10 requests/min
   - Paid tier: 60+ requests/min
   - https://ai.google.dev/pricing

4. **Optimalizujte použití:**
   - Kontrolujte pouze změněný kód, ne celé soubory
   - Používejte Flash model pro běžné kontroly
   - Pro důkladné kontroly používejte Pro model

### ❌ "Code too long"

**Symptomy:**
- Chyba "Code exceeds maximum length"
- Limit 50,000 znaků

**Řešení:**

1. **Rozdělte kód na menší části:**
   ```javascript
   // Místo kontroly celého souboru
   // kontrolujte funkce jednotlivě
   ```

2. **Použijte batch review:**
   - Rozdělte na více souborů
   - Batch review je zpracuje postupně

3. **Odstraňte komentáře a whitespace:**
   ```bash
   # Minify before review (ne doporučeno pro production)
   ```

4. **Zaměřte se na problémové části:**
   - Kontrolujte pouze funkce s chybami
   - Ne celý soubor najednou

### ❌ Pomalé zpracování

**Symptomy:**
- Review trvá > 30 sekund
- Timeout chyby

**Řešení:**

1. **Použijte Flash model místo Pro:**
   - Flash: ~2-5 sekund
   - Pro: ~10-30 sekund

2. **Zkraťte kód:**
   - Menší kód = rychlejší zpracování

3. **Zkontrolujte internet připojení:**
   ```bash
   ping gemini.google.com
   ```

4. **Zkuste později:**
   - Google servery mohou být přetížené
   - Zkuste mimo špičku (ráno/večer)

---

## Web App Problémy

### ❌ Aplikace se nenačte

**Symptomy:**
- Bílá obrazovka
- "Failed to load"

**Řešení:**

1. **Hard refresh:**
   - Ctrl+Shift+R (Win/Linux)
   - Cmd+Shift+R (Mac)

2. **Vyčistěte cache:**
   - DevTools (F12)
   - Application → Clear Storage → Clear Site Data

3. **Zkontrolujte konzoli:**
   - F12 → Console
   - Podívejte se na chybové hlášky
   - Screenshot + report issue

4. **Zkuste jiný prohlížeč:**
   - Chrome, Firefox, Edge, Safari

### ❌ Dark mode nefunguje

**Symptomy:**
- Zůstává světlý režim
- Přepínač nefunguje

**Řešení:**

1. **Clear localStorage:**
   ```javascript
   // V konzoli
   localStorage.removeItem('theme');
   localStorage.setItem('theme', 'dark');
   location.reload();
   ```

2. **Zkontrolujte system preferences:**
   - Windows: Settings → Personalization → Colors
   - macOS: System Preferences → General → Appearance
   - Linux: Depends on DE

3. **Force dark mode:**
   - Settings → Appearance → Dark

### ❌ File upload nefunguje

**Symptomy:**
- File picker se neotevře
- Soubor se nenačte

**Řešení:**

1. **Zkontrolujte velikost souboru:**
   - Max 1MB
   - Větší soubory komprimujte

2. **Zkontrolujte formát:**
   - Podporované: .js, .ts, .py, .java, atd.
   - Textové soubory only

3. **Zkuste drag & drop:**
   - Přetáhněte soubor do editoru

4. **Zkontrolujte browser permissions:**
   - Některé browsery blokují file access

---

## Browser Extension Problémy

### ❌ Extension se nenačte

**Symptomy:**
- Extension není v seznamu
- "Failed to load extension"

**Řešení:**

1. **Zkontrolujte Developer Mode:**
   - chrome://extensions/
   - Zapněte "Developer mode"

2. **Reload extension:**
   - chrome://extensions/
   - Klikněte na reload ikonu

3. **Zkontrolujte chyby:**
   - chrome://extensions/
   - Klikněte "Errors"
   - Podívejte se na error log

4. **Reinstall extension:**
   ```bash
   cd apps/extension
   pnpm build
   # Load unpacked: .output/chrome-mv3
   ```

### ❌ Side panel se neotevírá

**Symptomy:**
- Ctrl+Shift+Y nefunguje
- "Open Side Panel" tlačítko neděla nic

**Řešení:**

1. **Zkontrolujte verzi Chrome:**
   - Side Panel API vyžaduje Chrome 114+
   - chrome://version/

2. **Zkuste kliknout na ikonu extension:**
   - Místo zkratky

3. **Restart Chrome:**
   ```
   Zavřete všechny Chrome okna
   Otevřete znovu
   ```

4. **Reinstall extension**

### ❌ GitHub integration nefunguje

**Symptomy:**
- Žádné "Review with Gemini" buttony na GitHub
- Content script se nenačte

**Řešení:**

1. **Reload stránku:**
   - F5 nebo Ctrl+R

2. **Zkontrolujte permissions:**
   - Extension má přístup k github.com?
   - chrome://extensions → Details → Site access

3. **Zkontrolujte console:**
   - F12 na GitHub stránce
   - Podívejte se na chyby

4. **Zkontrolujte že jste na PR:**
   - URL: github.com/user/repo/pull/123
   - Files changed tab

### ❌ Context menu chybí

**Symptomy:**
- Pravý klik → žádná "Review with Gemini" option

**Řešení:**

1. **Vyberte text nejdřív:**
   - Context menu se zobrazí pouze když je vybrán text

2. **Reload extension:**
   - chrome://extensions/ → Reload

3. **Zkontrolujte permissions:**
   - Extension potřebuje "contextMenus" permission

### ❌ Popup se nenačte

**Symptomy:**
- Bílý popup
- Chyby v popup

**Řešení:**

1. **Pravý klik na popup → Inspect:**
   - Podívejte se na console errors

2. **Clear extension storage:**
   ```javascript
   // V popup console
   chrome.storage.local.clear();
   chrome.storage.sync.clear();
   ```

3. **Reinstall extension**

---

## Desktop App Problémy

### ❌ Aplikace se nespustí (Windows)

**Symptomy:**
- Nic se nestane po kliknutí
- Chyba "WebView2 not found"

**Řešení:**

1. **Nainstalujte WebView2:**
   - Download: https://developer.microsoft.com/microsoft-edge/webview2/
   - Nebo použijte Evergreen Bootstrap installer

2. **Spusťte jako admin:**
   - Pravý klik → Run as administrator

3. **Zkontrolujte antivirus:**
   - Některé antiviry blokují Tauri apps
   - Přidejte exception pro Gemini Code Reviewer

4. **Reinstall aplikaci:**
   ```bash
   # Uninstall
   Control Panel → Programs → Uninstall

   # Install znovu
   ```

### ❌ Aplikace se nespustí (macOS)

**Symptomy:**
- "App can't be opened"
- Gatekeeper blokuje aplikaci

**Řešení:**

1. **Bypass Gatekeeper:**
   - Pravý klik na aplikaci → Open
   - Confirm "Open"

2. **Nebo via Terminal:**
   ```bash
   xattr -d com.apple.quarantine "/Applications/Gemini Code Reviewer.app"
   ```

3. **System Preferences:**
   - Security & Privacy
   - General tab
   - "Open Anyway"

### ❌ Aplikace se nespustí (Linux)

**Symptomy:**
- "Shared library not found"
- Dependency errors

**Řešení:**

1. **Nainstalujte dependencies:**

   **Debian/Ubuntu:**
   ```bash
   sudo apt update
   sudo apt install libwebkit2gtk-4.0-dev libgtk-3-dev
   ```

   **Fedora:**
   ```bash
   sudo dnf install webkit2gtk3-devel gtk3-devel
   ```

   **Arch:**
   ```bash
   sudo pacman -S webkit2gtk gtk3
   ```

2. **Zkontrolujte permissions:**
   ```bash
   chmod +x /path/to/gemini-code-reviewer
   ```

3. **Spusťte z terminalu:**
   ```bash
   ./gemini-code-reviewer
   # Podívejte se na error output
   ```

### ❌ System tray nefunguje

**Symptomy:**
- Žádná ikona v tray
- Aplikace zmizí po zavření

**Řešení:**

**Windows:**
1. Zkontrolujte Hidden Icons
2. Nastavení → Taskbar → Select icons

**macOS:**
1. Menu bar má omezenou šířku
2. Skryjte jiné ikony pro uvolnění místa

**Linux:**
1. **GNOME:** Nainstalujte TopIcons Plus extension
   ```bash
   gnome-shell-extension-tool -e TopIcons@ag.github.com
   ```

2. **KDE Plasma:** Funguje nativně

3. **Zkuste jiný desktop environment**

### ❌ Global shortcut nefunguje

**Symptomy:**
- Ctrl+Alt+G nic nedělá

**Řešení:**

1. **Zkontrolujte že zkratka není použita:**
   - Windows: Zkontrolujte jiné aplikace
   - macOS: System Preferences → Keyboard → Shortcuts
   - Linux: Settings → Keyboard → Shortcuts

2. **Restart aplikaci:**
   - Quit z tray menu
   - Spusťte znovu

3. **Zkuste změnit zkratku:** (PŘIPRAVUJEME)

### ❌ File dialog se neotevírá

**Symptomy:**
- Nic se nestane po kliknutí "Open File"

**Řešení:**

1. **Zkontrolujte permissions:**
   - Aplikace potřebuje read access k filesystému

2. **Restart aplikaci**

3. **Zkuste drag & drop:** (PŘIPRAVUJEME)

### ❌ Vysoká spotřeba RAM/CPU

**Symptomy:**
- Aplikace používá > 500MB RAM
- CPU 100%

**Řešení:**

1. **Clear history:**
   - Settings → Clear History
   - Max History Items: 20 (místo 50)

2. **Restart aplikaci**

3. **Zkontrolujte running processes:**
   ```bash
   # Linux/macOS
   ps aux | grep gemini

   # Windows
   Task Manager
   ```

4. **Reinstall aplikaci**

---

## API Problémy

### ❌ Network errors

**Symptomy:**
- "Failed to fetch"
- "Network request failed"
- "ERR_CONNECTION_REFUSED"

**Řešení:**

1. **Zkontrolujte internet:**
   ```bash
   ping 8.8.8.8
   ping gemini.google.com
   ```

2. **Zkontrolujte firewall:**
   - Povolte access pro aplikaci
   - Port 443 (HTTPS)

3. **Deaktivujte VPN:**
   - Některé VPN blokují Google API

4. **Zkontrolujte proxy:**
   - Pokud používáte corporate proxy
   - Možná potřebujete konfiguraci

5. **Zkuste jiné připojení:**
   - Mobilní hotspot
   - Jiná WiFi

### ❌ CORS errors (Web only)

**Symptomy:**
- "CORS policy blocked"
- "No Access-Control-Allow-Origin"

**Řešení:**

1. **Pro development - CORS proxy:**
   ```javascript
   // vite.config.ts
   server: {
     proxy: {
       '/api': 'https://gemini.google.com'
     }
   }
   ```

2. **Pro production:**
   - Používejte vlastní backend proxy
   - Nebo používejte Extension/Desktop (nemají CORS omezení)

### ❌ Invalid response

**Symptomy:**
- "Invalid JSON"
- "Unexpected response format"

**Řešení:**

1. **Zkontrolujte API status:**
   - https://status.cloud.google.com/

2. **Zkuste jiný model:**
   - Flash místo Pro
   - 1.5 místo 2.5

3. **Report issue:**
   - GitHub Issues s response logem

---

## Build Problémy

### ❌ npm/pnpm install fails

**Symptomy:**
- "ERESOLVE unable to resolve dependency tree"
- "Cannot find module"

**Řešení:**

1. **Clear cache:**
   ```bash
   pnpm store prune
   rm -rf node_modules
   rm pnpm-lock.yaml
   pnpm install
   ```

2. **Zkontrolujte Node.js verzi:**
   ```bash
   node --version  # Should be 18+
   pnpm --version  # Should be 8+
   ```

3. **Install s --force:**
   ```bash
   pnpm install --force
   ```

### ❌ Build fails (Web/Extension)

**Symptomy:**
- Vite build errors
- TypeScript errors

**Řešení:**

1. **Clear dist:**
   ```bash
   rm -rf dist .output
   pnpm build
   ```

2. **Zkontrolujte TypeScript:**
   ```bash
   pnpm tsc --noEmit
   ```

3. **Zkontrolujte dependencies:**
   ```bash
   pnpm install
   ```

### ❌ Build fails (Desktop)

**Symptomy:**
- Tauri build errors
- Rust compilation errors

**Řešení:**

1. **Nainstalujte Rust:**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Zkontrolujte Rust verzi:**
   ```bash
   rustc --version  # Should be 1.70+
   ```

3. **Install system dependencies:**

   **macOS:**
   ```bash
   xcode-select --install
   ```

   **Linux:**
   ```bash
   sudo apt install libwebkit2gtk-4.0-dev \
     build-essential curl wget libssl-dev \
     libgtk-3-dev libayatana-appindicator3-dev \
     librsvg2-dev
   ```

4. **Clear target:**
   ```bash
   cd apps/desktop/src-tauri
   cargo clean
   cd ../../..
   pnpm tauri:build
   ```

### ❌ "Permission denied" při buildu

**Řešení:**

1. **Linux/macOS:**
   ```bash
   chmod +x scripts/*
   ```

2. **Windows:**
   - Run PowerShell as Administrator

---

## 🆘 Stále nefunguje?

### Kde získat pomoc:

1. **GitHub Issues:**
   - https://github.com/yourusername/gemini-code-reviewer/issues
   - Před created issue zkontrolujte existing issues

2. **Discussions:**
   - https://github.com/yourusername/gemini-code-reviewer/discussions
   - Community support

3. **Discord:**
   - https://discord.gg/gemini-code-reviewer
   - Real-time chat

4. **Email:**
   - support@example.com
   - Response within 48 hours

### Co zahrnout do bug reportu:

```markdown
**Popis problému:**
[Jasný popis co nefunguje]

**Kroky k reprodukci:**
1. Otevřít aplikaci
2. Kliknout na...
3. ...

**Očekávané chování:**
[Co by se mělo stát]

**Aktuální chování:**
[Co se stává]

**Screenshots:**
[Pokud relevantní]

**Prostředí:**
- Platform: Web/Extension/Desktop
- OS: Windows 11 / macOS 14 / Ubuntu 22.04
- Browser: Chrome 120 / Firefox 121 (pokud relevant)
- Version: 2.0.0

**Error logs:**
```
[Paste console errors here]
```

**Další kontext:**
[Cokoli dalšího co může pomoci]
```

---

## 📝 Poznámky

- Tento guide je živý dokument a bude aktualizován
- Pokud najdete řešení problému, který zde není, prosím přidejte ho přes Pull Request
- Pokud máte návrhy na vylepšení, otevřete Issue nebo Discussion

**Poslední aktualizace:** 2025-01-18
