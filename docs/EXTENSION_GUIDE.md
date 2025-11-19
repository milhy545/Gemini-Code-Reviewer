# 📦 Browser Extension - User Guide

Gemini Code Reviewer jako rozšíření prohlížeče pro rychlou kontrolu kódu přímo ve vašem browseru.

## 🎯 Funkce

### ✨ Hlavní funkce

- **Side Panel** - Boční panel s plným rozhraním pro kontrolu a opravu kódu
- **Popup** - Rychlý přístup k review vybraného textu
- **Content Scripts** - Automatická detekce kódu na webových stránkách
- **GitHub Integration** - Přidává tlačítko "Review with Gemini" přímo do GitHub Pull Requestů
- **Context Menu** - Pravé tlačítko myši → "Review with Gemini" pro vybraný kód
- **Keyboard Shortcuts** - Ctrl+Shift+Y pro otevření side panelu
- **Cross-browser** - Podpora Chrome, Firefox, Edge, Safari

### 🔧 Pokročilé funkce

- **Batch Review** - Kontrola více souborů najednou
- **Snippets Library** - Knihovna často používaných kódových vzorů
- **History** - Historie všech kontrol s možností exportu
- **Stats** - Statistiky použití a analýzy
- **Dark Mode** - Tmavý/světlý režim
- **Export** - Export výsledků do Markdown, PDF, HTML, JSON

## 📥 Instalace

### Metoda 1: Z Chrome Web Store (PŘIPRAVUJEME)

1. Navštivte [Chrome Web Store](https://chrome.google.com/webstore) (link bude přidán)
2. Klikněte na "Add to Chrome"
3. Potvrďte instalaci

### Metoda 2: Manuální instalace (Developer Mode)

#### Chrome/Edge:

1. **Stáhněte extension:**
   ```bash
   git clone https://github.com/yourusername/gemini-code-reviewer.git
   cd gemini-code-reviewer
   pnpm install
   cd apps/extension
   pnpm build:chrome
   ```

2. **Načtěte extension:**
   - Otevřete `chrome://extensions/`
   - Zapněte "Developer mode" (pravý horní roh)
   - Klikněte "Load unpacked"
   - Vyberte složku `.output/chrome-mv3`

#### Firefox:

1. **Stáhněte extension:**
   ```bash
   cd apps/extension
   pnpm build:firefox
   ```

2. **Načtěte extension:**
   - Otevřete `about:debugging#/runtime/this-firefox`
   - Klikněte "Load Temporary Add-on"
   - Vyberte soubor `manifest.json` z `.output/firefox-mv3`

## ⚙️ Konfigurace

### První spuštění

1. Klikněte na ikonu extension v toolbaru
2. Klikněte na ⚙️ (Settings)
3. Zadejte váš **Google Gemini API Key**
   - Získat API klíč: https://makersuite.google.com/app/apikey
   - API klíč se ukládá lokálně ve vašem prohlížeči (není sdílený)

### Nastavení API klíče

```
Settings → API Key → Zadejte klíč → Save
```

API klíč je uložen v `browser.storage.sync` a je automaticky synchronizován napříč zařízeními (pokud je zapnutá synchronizace prohlížeče).

### Další nastavení

- **AI Model**: Vyberte model (Flash/Pro)
- **Review Focus**: Zaměření kontroly (Complete, Security, Performance, Best Practices, Bugs)
- **Auto-save History**: Automaticky ukládat historii
- **Dark Mode**: Tmavý/světlý režim

## 🚀 Použití

### 1. Side Panel (Hlavní rozhraní)

**Otevření:**
- Klikněte na ikonu extension → "Open Side Panel"
- Klávesová zkratka: `Ctrl+Shift+Y` (Windows/Linux) nebo `Cmd+Shift+Y` (Mac)

**Použití:**
1. Vložte nebo napište kód do editoru
2. Vyberte jazyk (JavaScript, Python, Java, atd.)
3. Klikněte "Zkontrolovat kód" nebo "Opravit kód"
4. Prohlédněte si výsledky v pravém panelu

### 2. Popup (Rychlá kontrola)

**Otevření:**
- Klikněte na ikonu extension v toolbaru

**Použití:**
1. Vyberte text na webové stránce
2. Klikněte na ikonu extension
3. Popup automaticky načte vybraný text
4. Klikněte "Review" pro rychlou analýzu

### 3. Context Menu (Pravé tlačítko)

**Použití:**
1. Vyberte kód na jakékoliv webové stránce
2. Pravé tlačítko myši → "Review with Gemini"
3. Otevře se side panel s vybraným kódem a automaticky spustí review

### 4. GitHub Integration

**Na GitHub Pull Requestu:**
1. Otevřete jakýkoliv Pull Request na GitHub.com
2. V sekci "Files changed" najděte hlavičku souboru
3. Klikněte na nové tlačítko "✨ Review with Gemini"
4. Extension automaticky extrahuje kód a spustí review v side panelu

**Automatické funkce:**
- Detekce jazyka z přípony souboru
- Zvýraznění změn v diff
- Možnost reviewovat jednotlivé soubory nebo celý PR

### 5. Automatická detekce kódu

Extension automaticky detekuje code blocky na webových stránkách:
- GitHub, GitLab, Bitbucket
- Stack Overflow, Reddit
- Medium, Dev.to
- Dokumentace, blogy
- Jakékoliv `<pre><code>` bloky

**Jak to funguje:**
1. Extension přidá tlačítko "✨ Review with Gemini" nad každý code block
2. Kliknutím se otevře side panel s kódem
3. Review se spustí automaticky

### 6. Batch Review (Dávková kontrola)

**Použití:**
1. Otevřete side panel
2. Klikněte na "📦 Batch Review"
3. Vyberte více souborů najednou
4. Klikněte "Start Review"
5. Extension postupně zkontroluje všechny soubory
6. Exportujte výsledky do jednoho dokumentu

**Podporované formáty:**
- .js, .ts, .jsx, .tsx
- .py, .java, .go, .rs
- .cpp, .c, .cs, .rb, .php

### 7. Snippets Library (Knihovna snippetů)

**Vytvoření snippetu:**
1. Klikněte na "📚 Snippets Library"
2. "➕ Nový snippet"
3. Vyplňte název, popis, jazyk, tagy
4. Vložte kód
5. Uložte

**Použití snippetu:**
1. Otevřete Snippets Library
2. Vyberte snippet ze seznamu
3. Klikněte "Použít"
4. Snippet se načte do editoru

**Funkce:**
- Vyhledávání podle názvu, popisu, tagů
- Filtrování podle jazyka
- Sledování počtu použití
- Export/Import snippetů

## 🎨 Klávesové zkratky

| Zkratka | Akce |
|---------|------|
| `Ctrl+Shift+Y` | Otevřít/zavřít side panel |
| `Ctrl+Enter` | Spustit review (v editoru) |
| `Ctrl+Shift+Enter` | Spustit correction (v editoru) |
| `Ctrl+/` | Zaměřit se na editor |
| `Esc` | Zavřít modaly |

## 💾 Export výsledků

**Podporované formáty:**
- **Markdown** (.md) - Pro dokumentaci
- **PDF** (.pdf) - Pro sdílení
- **HTML** (.html) - Pro web
- **JSON** (.json) - Pro další zpracování

**Export:**
1. Po dokončení review klikněte "💾 Export"
2. Vyberte formát
3. Soubor se stáhne automaticky

## 📊 Historie & Statistiky

### Historie
- Zobrazuje všechny provedené reviews
- Filtrování podle data, jazyka, modelu
- Možnost smazat jednotlivé položky nebo vymazat vše
- Kliknutím na položku se načte původní kód a výsledek

### Statistiky
- Celkový počet reviews a corrections
- Nejpoužívanější jazyky
- Nejpoužívanější modely
- Průměrný čas zpracování
- Graf použití v čase

## 🔧 Pokročilá konfigurace

### Oprávnění extension

Extension vyžaduje následující oprávnění:
- `activeTab` - Pro přístup k aktuální stránce
- `storage` - Pro uložení nastavení a historie
- `contextMenus` - Pro context menu
- `sidePanel` - Pro boční panel

**Bezpečnost:**
- Všechna data jsou uložena pouze lokálně
- API klíč není nikdy sdílený
- Žádná telemetrie, žádné tracking

### Limity

- **Max délka kódu**: 50,000 znaků
- **Max velikost souboru**: 1MB
- **Max requests za minutu**: 10 (Google Gemini limit)
- **History items**: Max 50 položek

### Sync napříč zařízeními

Pokud používáte stejný Google/Firefox účet na více zařízeních:
- Nastavení se synchronizuje automaticky
- API klíč se synchronizuje automaticky
- Historie a snippety se NESYNCHRONIZUJÍ (lokální storage)

## 🐛 Řešení problémů

### Extension se nenačte

1. Zkontrolujte, že máte zapnutý Developer Mode
2. Zkuste extension znovu načíst
3. Zkontrolujte konzoli na chyby: `chrome://extensions/` → "Errors"

### API chyby

**"API key not found"**
- Ujistěte se, že jste zadali API klíč v nastavení
- Zkontrolujte, že klíč je validní na https://makersuite.google.com

**"Rate limit exceeded"**
- Počkejte 1 minutu a zkuste znovu
- Gemini API má limit 10 requestů za minutu

**"Code too long"**
- Zkraťte kód na méně než 50,000 znaků
- Použijte batch review pro kontrolu více částí

### Side panel se neotevírá

1. Zkontrolujte, že váš prohlížeč podporuje Side Panel API (Chrome 114+)
2. Zkuste kliknout na ikonu extension a vybrat "Open Side Panel"
3. Restartujte prohlížeč

### GitHub integration nefunguje

1. Obnovte stránku Pull Requestu (F5)
2. Zkontrolujte, že extension má oprávnění pro github.com
3. Zkontrolujte konzoli na chyby

## 🔄 Aktualizace

### Automatické aktualizace (Chrome Web Store)
Extension se automaticky aktualizuje při vydání nové verze.

### Manuální aktualizace (Developer Mode)
```bash
git pull origin main
pnpm install
cd apps/extension
pnpm build
```

Pak klikněte "Reload" v `chrome://extensions/`.

## 🆘 Podpora

- **Issues**: https://github.com/yourusername/gemini-code-reviewer/issues
- **Discussions**: https://github.com/yourusername/gemini-code-reviewer/discussions
- **Email**: support@example.com

## 📝 Changelog

### v2.0.0 (2025-01-18)
- ✨ Přidán Side Panel
- ✨ GitHub Integration
- ✨ Batch Review
- ✨ Snippets Library
- ✨ Content Scripts s automatickou detekcí kódu
- ✨ Context Menu
- 🎨 Nový UI/UX design
- 🔧 Cross-browser podpora

### v1.0.0 (2024)
- 🎉 První vydání
- ✨ Základní popup interface
- ✨ Review a correction funkcionalita

## 📄 Licence

MIT License - viz [LICENSE](../LICENSE) soubor

---

**🌟 Užijte si efektivnější code reviews s AI! 🌟**
