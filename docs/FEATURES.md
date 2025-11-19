# ✨ Features Overview

Kompletní přehled všech funkcí Gemini Code Reviewer napříč platformami.

## 📊 Porovnání platforem

| Feature | Web | Extension | Desktop |
|---------|-----|-----------|---------|
| Code Review | ✅ | ✅ | ✅ |
| Code Correction | ✅ | ✅ | ✅ |
| Multiple AI Models | ✅ | ✅ | ✅ |
| Review Focus Presets | ✅ | ✅ | ✅ |
| Dark/Light Mode | ✅ | ✅ | ✅ |
| History | ✅ | ✅ | ✅ |
| Statistics | ✅ | ✅ | ✅ |
| Export (MD/PDF/HTML/JSON) | ✅ | ✅ | ✅ |
| File Upload | ✅ | ❌ | ✅ |
| Batch Review | ✅ | ✅ | ✅ |
| Snippets Library | ✅ | ✅ | ✅ |
| Side Panel | ❌ | ✅ | ❌ |
| System Tray | ❌ | ❌ | ✅ |
| Global Shortcuts | ❌ | ✅ | ✅ |
| GitHub Integration | ❌ | ✅ | ❌ |
| Context Menu | ❌ | ✅ | ❌ |
| Content Scripts | ❌ | ✅ | ❌ |
| Native File Dialog | ❌ | ❌ | ✅ |
| Offline UI | ✅ | ✅ | ✅ |

## 🎯 Core Features

### 1. AI-Powered Code Review

**Popis:**
Využívá Google Gemini AI pro inteligentní analýzu kódu s možností výběru různých modelů a zaměření.

**Modely:**
- **Gemini 2.5 Flash** - Nejrychlejší, ideální pro rychlé kontroly
- **Gemini 2.5 Pro** - Nejkvalitnější, pro důkladné analýzy
- **Gemini 1.5 Flash** - Starší rychlý model
- **Gemini 1.5 Pro** - Starší pro model

**Review Focus (Zaměření):**
- **Complete** - Kompletní analýza (správnost, best practices, výkon, bezpečnost)
- **Security** - Zaměření na bezpečnostní zranitelnosti
- **Performance** - Analýza výkonu a optimalizací
- **Best Practices** - Kontrola konvencí a čitelnosti
- **Bugs** - Detekce chyb a edge cases

**Výstup:**
```markdown
### Správnost
- ✅ Funkce správně implementuje factorial
- ⚠️ Chybí ošetření záporných čísel
- ⚠️ Použití `==` místo `===`

### Best Practices
- Pojmenování proměnných je OK
- Doporučuji použít `for` loop místo `while`
- Přidat JSDoc komentáře

### Výkon
- Časová složitost: O(n) ✅
- Možná optimalizace: použít memoizaci
```

**Podporované jazyky:**
JavaScript, TypeScript, Python, Java, C#, PHP, Ruby, Go, HTML, CSS, SQL, Rust, C++, Swift, Kotlin, Scala

### 2. AI-Powered Code Correction

**Popis:**
Automatická oprava kódu s vysvětlujícími komentáři přímo v kódu.

**Funkce:**
- Oprava chyb a bugů
- Aplikace best practices
- Vylepšení čitelnosti
- Optimalizace výkonu
- Bezpečnostní vylepšení

**Příklad:**
```javascript
// Původní kód
function factorial(n) {
  if (n == 0) return 1;
  var i = n, result = 1;
  while(i > 0) {
    result = result * i;
    i = i - 1;
  }
  return result;
}

// Opravený kód s komentáři
function factorial(n) {
  // ✨ Přidána validace vstupu pro záporná čísla
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');

  // ✨ Změněno == na === pro striktní porovnání
  if (n === 0) return 1;

  // ✨ Použit let místo var pro block scoping
  let result = 1;

  // ✨ Optimalizováno - použit for loop místo while
  for (let i = n; i > 0; i--) {
    result *= i;  // ✨ Zkrácený zápis místo result = result * i
  }

  return result;
}
```

### 3. Batch Code Review

**Popis:**
Kontrola více souborů najednou s jednotným reportem.

**Funkce:**
- Výběr více souborů najednou
- Automatická detekce jazyka z přípony
- Postupné zpracování s progress barem
- Pokračování po chybě
- Export všech výsledků do jednoho dokumentu

**Workflow:**
```
1. Vybrat soubory → 2. Start Review → 3. Sledovat progress → 4. Export results
```

**Výstup:**
```markdown
# Batch Review Results
Generated: 2025-01-18 10:30:00

## utils.js
Language: javascript
Status: ✅ Completed

### Review:
[Výsledky review...]

---

## api.py
Language: python
Status: ✅ Completed

### Review:
[Výsledky review...]

---

## Database.java
Language: java
Status: ❌ Error
Error: File too large (exceeded 50,000 chars limit)
```

**Platformy:**
- ✅ Web - přes file input
- ✅ Extension - přes file picker API
- ✅ Desktop - přes native dialog

### 4. Code Snippets Library

**Popis:**
Knihovna často používaných kódových vzorů pro rychlé použití a reference.

**Funkce:**
- Vytváření vlastních snippetů
- Tagy pro organizaci
- Vyhledávání podle názvu, popisu, tagů
- Filtrování podle jazyka
- Sledování počtu použití
- Import/Export snippetů
- Využití v editoru jedním klikem

**Use Cases:**
- Ukládání často reviewovaných vzorů
- Šablony pro best practices
- Reference implementace
- Cheat sheets
- Opravené verze kódu

**Příklad snippet:**
```json
{
  "name": "React Custom Hook - useLocalStorage",
  "description": "Custom hook for persistent state in localStorage",
  "language": "typescript",
  "tags": ["react", "hooks", "storage", "persistence"],
  "code": "function useLocalStorage<T>(key: string, initialValue: T) { ... }",
  "usageCount": 15
}
```

**Platformy:**
- ✅ Web - localStorage
- ✅ Extension - chrome.storage.sync
- ✅ Desktop - local file storage

### 5. History & Analytics

**Historie:**
- Automatické ukládání všech reviews
- Časové razítko
- Původní kód + výsledky
- Použitý model a focus
- Možnost znovu načíst
- Smazání jednotlivých položek
- Vymazání celé historie
- Export historie

**Statistiky:**
```
📊 Celkové statistiky
- Celkem reviews: 247
- Celkem corrections: 89
- Celkový čas: 2h 15m
- Průměrný čas: 32s

📈 Nejpoužívanější jazyky
1. JavaScript - 98 (40%)
2. Python - 67 (27%)
3. TypeScript - 45 (18%)
4. Java - 37 (15%)

🤖 Nejpoužívanější modely
1. Gemini 2.5 Flash - 180 (73%)
2. Gemini 2.5 Pro - 67 (27%)

📅 Aktivita v čase
[Graf použití po dnech]
```

**Platformy:**
- ✅ Všechny platformy

### 6. Export Results

**Podporované formáty:**

**Markdown (.md):**
```markdown
# Code Review Results
**Language:** JavaScript
**Model:** Gemini 2.5 Flash
**Focus:** Complete

## Original Code
\`\`\`javascript
function factorial(n) { ... }
\`\`\`

## Review
### Správnost
- ✅ Funkce...
```

**PDF (.pdf):**
- Profesionální formátování
- Syntax highlighting
- Metadata (autor, datum, model)

**HTML (.html):**
- Interaktivní web stránka
- Responzivní design
- Code highlighting
- Možnost sdílení online

**JSON (.json):**
```json
{
  "timestamp": 1705571400000,
  "language": "javascript",
  "model": "gemini-2.5-flash",
  "code": "...",
  "review": "...",
  "metadata": {}
}
```

**Platformy:**
- ✅ Všechny platformy

## 🌐 Extension-Specific Features

### 1. Side Panel

**Popis:**
Boční panel integrovaný do prohlížeče s plným rozhraním aplikace.

**Výhody:**
- Vždy po ruce během browsingu
- Nekryje obsah stránky
- Přetrvává napříč taby
- Rychlý přístup k review

**Zkratka:**
`Ctrl+Shift+Y` (Windows/Linux) nebo `Cmd+Shift+Y` (Mac)

### 2. GitHub Integration

**Popis:**
Automatické přidání review buttonu do GitHub Pull Requestů.

**Funkce:**
- Detekce GitHub PR stránek
- Přidání "✨ Review with Gemini" buttonu k file headers
- Automatická extrakce kódu z diff
- Detekce jazyka z přípony
- Review jednotlivých souborů
- Review celého PR

**Workflow:**
```
1. Otevřít PR → 2. Kliknout "Review with Gemini" → 3. Side panel se otevře → 4. Automatický review
```

### 3. Content Scripts

**Popis:**
Automatická detekce code bloků na webových stránkách a přidání review buttonů.

**Podporované weby:**
- GitHub, GitLab, Bitbucket
- Stack Overflow, Reddit
- Medium, Dev.to, Hashnode
- Jakékoliv `<pre><code>` bloky
- Documentation sites

**Funkce:**
- MutationObserver pro dynamický obsah
- Detekce jazyka z class name (např. `language-javascript`)
- Review button overlay
- Automatické načtení do side panelu

### 4. Context Menu

**Popis:**
Pravé tlačítko myši na vybraný text → "Review with Gemini"

**Workflow:**
```
1. Vybrat kód → 2. Pravý klik → 3. "Review with Gemini" → 4. Side panel s review
```

### 5. Popup (Quick Review)

**Popis:**
Malý popup pro rychlou kontrolu vybraného textu.

**Funkce:**
- Automatický import vybraného textu
- Quick review tlačítko
- Open side panel button
- Kompaktní interface (400px)

## 🖥️ Desktop-Specific Features

### 1. System Tray

**Popis:**
Aplikace běží v systémové liště pro rychlý přístup.

**Menu:**
- Show Window - zobrazit hlavní okno
- Hide Window - skrýt okno
- Quick Review - rychlá kontrola aktuálního kódu
- Quit - ukončit aplikaci

**Hide on Close:**
- Při zavření okna (křížek) se aplikace minimalizuje do tray
- Zůstává běžící na pozadí
- Pro úplné ukončení: Quit z menu nebo Ctrl+Q

### 2. Global Shortcuts

**Popis:**
Systémové klávesové zkratky fungující odkudkoliv v OS.

**Zkratky:**
- `Ctrl+Alt+G` (Win/Linux) nebo `Cmd+Alt+G` (Mac) - Otevřít/fokusovat aplikaci

**Use Case:**
```
1. Pracujete v IDE
2. Chcete rychle zkontrolovat kód
3. Stisknete Ctrl+Alt+G
4. Aplikace se otevře
5. Paste kód → Review → Zpět do IDE
```

### 3. Native File Dialog

**Popis:**
Nativní systémový dialog pro otevírání souborů.

**Výhody:**
- Známé UI pro uživatele
- Podpora všech OS features (search, favorites, recent)
- Integrace s file system

**Podporované formáty:**
Všechny textové soubory s kódovými příponami

### 4. Quick Review from Tray

**Popis:**
Rychlá kontrola kódu přímo ze system tray bez otevírání okna.

**Workflow:**
```
1. Vložte kód do editoru
2. Minimalizujte okno
3. Pravý klik na tray ikonu → Quick Review
4. Okno se otevře a spustí review automaticky
```

## 🎨 UI/UX Features

### 1. Dark/Light Mode

**Popis:**
Přepínání mezi tmavým a světlým režimem.

**Implementace:**
- Tailwind CSS dark: prefix
- Uložení preference v localStorage
- Aplikace na celé UI včetně code bloků

**Toggle:**
Settings → Appearance → Dark/Light

### 2. Responsive Design

**Popis:**
Responzivní layout pro různé velikosti obrazovek.

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Adaptace:**
- Mobile: Single column layout
- Desktop: Two column layout (editor + results)

### 3. Progress Indicators

**Popis:**
Vizuální indikátory průběhu operací.

**Typy:**
- Progress bar pro batch review
- Spinner pro jednotlivé reviews
- Percentage indikátor
- Estimated time remaining

### 4. Syntax Highlighting

**Popis:**
Zvýraznění syntaxe v code blocích.

**Implementace:**
- Automatická detekce jazyka
- Podpora všech hlavních jazyků
- Přizpůsobení dark/light mode

## 🔒 Security & Privacy Features

### 1. Local API Key Storage

**Popis:**
API klíč je uložen pouze lokálně na vašem zařízení.

**Ukládání:**
- Web: localStorage
- Extension: chrome.storage.sync (šifrované)
- Desktop: local config file (OS secure storage)

**Bezpečnost:**
- Nikdy neodesíláno na servery (kromě Google Gemini API)
- Není sdíleno mezi zařízeními (kromě extension sync)
- Možnost smazat kdykoliv

### 2. No Telemetry

**Popis:**
Žádné sledování, žádná analytika, žádné odesílání dat.

**Privacy:**
- Veškerá data zůstávají lokálně
- Jediná komunikace: Google Gemini API pro review
- Open source - můžete ověřit kód

### 3. Offline Capable

**Popis:**
Veškerá UI logika běží offline, pouze AI volání vyžaduje internet.

**Offline funkce:**
- Načítání history
- Prohlížení snippetů
- Editace kódu
- Export výsledků (pokud jsou již načtené)

## 📦 Data Management Features

### 1. Import/Export

**Data typy:**
- Settings (JSON)
- History (JSON)
- Snippets (JSON)
- Complete backup (ZIP)

**Formáty:**
```json
{
  "version": "2.0.0",
  "exported": 1705571400000,
  "settings": { ... },
  "history": [ ... ],
  "snippets": [ ... ]
}
```

### 2. Storage Management

**Funkce:**
- Zobrazení využitého prostoru
- Vymazání starých dat
- Optimalizace storage
- Warning při překročení limitu

**Limity:**
- Web: 5MB localStorage
- Extension: 100KB sync storage, unlimited local
- Desktop: Unlimited

## 🚀 Performance Features

### 1. Code Chunking

**Popis:**
Automatické dělení velkých souborů na menší části.

**Implementace:**
- Detekce velikosti kódu
- Dělení po 10,000 znacích
- Postupné zpracování
- Sloučení výsledků

### 2. Rate Limiting

**Popis:**
Ochrana před překročením API limitů.

**Limity:**
- Max 10 requestů za minutu
- Cooldown 1 sekunda mezi requesty
- Queue system pro batch review

### 3. Caching

**Popis:**
Cachování výsledků pro rychlejší přístup.

**Strategie:**
- Hash kódu + model + focus = cache key
- TTL: 24 hodin
- Automatic cleanup

## 🔧 Developer Features

### 1. API Access (PŘIPRAVUJEME)

**Popis:**
REST API pro programatický přístup.

**Endpoints:**
```
POST /api/review
POST /api/correct
GET /api/history
POST /api/batch
```

### 2. CLI Tool (PŘIPRAVUJEME)

**Popis:**
Command-line interface pro CI/CD.

**Usage:**
```bash
gemini-review ./src/**/*.js --focus=security --output=report.md
```

### 3. Git Integration (PŘIPRAVUJEME)

**Popis:**
Git hooks pro automatickou kontrolu před commitem.

**Setup:**
```bash
gemini-review --install-hooks
# Pre-commit hook installed
```

## 📊 Roadmap Features

### Připravované funkce:

- [ ] Multi-language UI (EN, CS, DE, FR)
- [ ] AI Chat mode (konverzace s AI o kódu)
- [ ] Diff viewer (před/po opravě)
- [ ] Code comparison
- [ ] Team collaboration (shared snippets, reviews)
- [ ] VS Code extension
- [ ] JetBrains plugin
- [ ] Self-hosted AI models support
- [ ] Custom AI prompts
- [ ] Review templates
- [ ] Automation rules
- [ ] Webhook integrations

---

**📝 Poznámka:** Tento dokument je živý a bude aktualizován s novými features.
