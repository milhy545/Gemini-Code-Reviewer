# 🤖 Gemini Code Reviewer

AI-powered nástroj pro kontrolu a opravu kódu pomocí Google Gemini API.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)

## ✨ Funkce

### 🎯 Hlavní funkce
- **AI Code Review** - Detailní analýza kódu pomocí Google Gemini AI
- **Automatická oprava kódu** - Oprava chyb a vylepšení kódu s komentáři
- **11+ programovacích jazyků** - JavaScript, TypeScript, Python, Java, C#, PHP, Ruby, Go, HTML, CSS, SQL
- **Více AI modelů** - Výběr mezi Gemini Flash (rychlý) a Pro (kvalitní)
- **Specializované review presets** - Security, Performance, Best Practices, Bug Detection

### 🎨 UI & UX Features
- **Dark/Light Mode** - Plná podpora tmavého a světlého režimu
- **Historie reviews** - Automatické ukládání a správa historie
- **Statistiky a analytika** - Sledování použití a výkonu
- **Export funkcionalita** - Export do PDF, JSON, Markdown, HTML
- **Keyboard shortcuts** - Rychlé ovládání klávesnicí
- **Text-to-speech** - Poslech zpětné vazby
- **Responsivní design** - Funguje na desktopu i mobilu

### ⚙️ Pokročilé funkce
- **Persistence nastavení** - Automatické ukládání do localStorage
- **Progress indikátory** - Vizuální feedback během zpracování
- **Validace vstupů** - Kontrola velikosti a formátu kódu
- **Error handling** - Robustní zpracování chyb
- **Accessibility** - Podpora klávesových zkratek a ARIA

## 🚀 Rychlý start

### Předpoklady
- Node.js 18+
- Google Gemini API klíč ([získat zde](https://ai.google.dev/))

### Instalace

1. **Klonujte repozitář**
```bash
git clone https://github.com/yourusername/gemini-code-reviewer.git
cd gemini-code-reviewer
```

2. **Nainstalujte závislosti**
```bash
npm install
```

3. **Spusťte setup (doporučeno)**
```bash
npm run setup
```
Setup vás provede nastavením API klíče a volbou portu.

**Nebo manuálně:** Vytvořte `.env.local` soubor:
```env
API_KEY=váš_gemini_api_klíč
PORT=5173  # volitelné, výchozí je 5173
```

4. **Spusťte dev server**
```bash
npm run dev
```

Aplikace běží na `http://localhost:5173` (nebo vlastním portu)

### Build pro produkci

```bash
npm run build
npm run preview
```

## 📖 Použití

### Základní workflow

1. **Vložte kód** - Napište nebo nahrajte kód do levého panelu
2. **Vyberte jazyk** - Zvolte programovací jazyk z dropdownu
3. **Nastavte preferences** - (Volitelné) Otevřete nastavení (Ctrl+,) a zvolte AI model a review focus
4. **Zkontrolujte kód** - Klikněte "Zkontrolovat kód" (Ctrl+Enter)
5. **Nebo opravte kód** - Klikněte "Opravit kód" (Ctrl+Shift+Enter)
6. **Exportujte výsledky** - (Volitelné) Exportujte do preferovaného formátu

### Klávesové zkratky

| Zkratka | Akce |
|---------|------|
| `Ctrl + Enter` | Zkontrolovat kód |
| `Ctrl + Shift + Enter` | Opravit kód |
| `Ctrl + ,` | Otevřít nastavení |
| `Ctrl + H` | Otevřít historii |
| `Ctrl + K` | Vymazat kód |
| `Ctrl + D` | Přepnout téma |
| `Ctrl + Shift + S` | Exportovat výsledky |
| `Shift + ?` | Zobrazit nápovědu |

### Review Presets

#### 🔍 Kompletní kontrola (výchozí)
Kontrola všech aspektů: chyby, best practices, výkon, bezpečnost

#### 🔒 Bezpečnost
Zaměření na bezpečnostní zranitelnosti (SQL injection, XSS, CSRF, atd.)

#### ⚡ Výkon
Analýza výkonnostních problémů a optimalizací

#### ✨ Best Practices
Kontrola kvality kódu, čitelnosti a konvencí

#### 🐛 Detekce chyb
Hledání bugů, logických chyb a edge cases

## 📝 Changelog

Viz [CHANGELOG.md](./CHANGELOG.md) pro historii změn.

## 📄 Licence

MIT License

## 🙏 Poděkování

- [Google Gemini AI](https://ai.google.dev/) - AI engine
- [React](https://react.dev/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

**Made with ❤️ using React, TypeScript, and Google Gemini AI**
