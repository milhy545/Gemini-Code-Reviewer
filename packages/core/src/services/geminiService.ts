import { GoogleGenAI } from "@google/genai";
import { AIModel, ReviewFocus } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Get review focus instructions based on selected preset
const getReviewFocusInstructions = (focus: ReviewFocus, language: string): string => {
  const languageLabel = language.charAt(0).toUpperCase() + language.slice(1);

  const focusInstructions = {
    complete: `
      Analyzujte kód z následujících hledisek:
      1.  **Správnost a chyby:** Identifikujte všechny potenciální chyby, logické nedostatky nebo okrajové případy, které nejsou ošetřeny.
      2.  **Osvědčené postupy a čitelnost:** Navrhněte vylepšení na základě zavedených osvědčených postupů pro jazyk ${languageLabel}. Komentujte srozumitelnost kódu, konvence pojmenování a celkovou strukturu.
      3.  **Výkon:** Upozorněte na jakékoli potenciální problémy s výkonem a navrhněte optimalizace.
      4.  **Bezpečnost:** Zvýrazněte veškeré bezpečnostní zranitelnosti, pokud jsou relevantní.
    `,
    security: `
      **ZAMĚŘTE SE PŘEDEVŠÍM NA BEZPEČNOST:**
      1.  **Bezpečnostní zranitelnosti:** Detailně analyzujte všechny potenciální bezpečnostní problémy (SQL injection, XSS, CSRF, autentizace, autorizace, šifrování, atd.)
      2.  **Bezpečné kódování:** Zkontrolujte, zda kód dodržuje bezpečné kódovací praktiky pro ${languageLabel}
      3.  **Validace vstupů:** Ověřte správnou validaci a sanitizaci všech vstupů
      4.  **Práce s citlivými daty:** Zkontrolujte zacházení s hesly, tokeny a citlivými informacemi
    `,
    performance: `
      **ZAMĚŘTE SE PŘEDEVŠÍM NA VÝKON:**
      1.  **Výkonnostní problémy:** Identifikujte úzká hrdla, neefektivní algoritmy a datové struktury
      2.  **Optimalizace:** Navrhněte konkrétní optimalizace pro lepší výkon
      3.  **Složitost:** Analyzujte časovou a prostorovou složitost kódu
      4.  **Best practices pro výkon:** Doporučte optimální přístupy specifické pro ${languageLabel}
    `,
    bestPractices: `
      **ZAMĚŘTE SE PŘEDEVŠÍM NA KVALITU KÓDU:**
      1.  **Konvence a standardy:** Zkontrolujte dodržování konvencí pro ${languageLabel}
      2.  **Čitelnost:** Ohodnoťte čitelnost, strukturu a organizaci kódu
      3.  **Maintainability:** Navrhněte vylepšení pro lepší udržovatelnost
      4.  **Code smells:** Identifikujte anti-patterny a code smells
    `,
    bugs: `
      **ZAMĚŘTE SE PŘEDEVŠÍM NA DETEKCI CHYB:**
      1.  **Logické chyby:** Hledejte logické chyby a nesprávné implementace
      2.  **Edge cases:** Identifikujte neošetřené okrajové případy
      3.  **Runtime errors:** Najděte potenciální runtime chyby (null reference, dělení nulou, array bounds, atd.)
      4.  **Type errors:** Zkontrolujte typovou bezpečnost a potenciální type mismatch
    `,
  };

  return focusInstructions[focus];
};

export const reviewCode = async (
  code: string,
  language: string,
  model: AIModel = 'gemini-2.5-flash',
  reviewFocus: ReviewFocus = 'complete'
): Promise<string> => {
  const languageLabel = language.charAt(0).toUpperCase() + language.slice(1);
  const focusInstructions = getReviewFocusInstructions(reviewFocus, language);

  const prompt = `
    Jste expert na kontrolu kódu a vystupujete jako seniorní softwarový inženýr. Vaším úkolem je poskytnout revizi následujícího úryvku kódu napsaného v jazyce ${languageLabel}. Odpovídejte VŽDY v češtině.

    ${focusInstructions}

    Poskytněte svou zpětnou vazbu ve strukturovaném formátu pomocí Markdownu. Použijte nadpisy pro každou kategorii (např. '### Správnost', '### Osvědčené postupy'). Pro konkrétní návrhy použijte odrážky. Buďte konstruktivní a v případě potřeby poskytněte příklady kódu v Markdown blocích pro objasnění vašich bodů.

    Kód ke kontrole:
    \`\`\`${language}
    ${code}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || '';
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      throw new Error(`Chyba při volání Gemini API: ${error.message}`);
    }
    throw new Error("Selhalo získání review z Gemini API.");
  }
};

export const correctCode = async (
  code: string,
  language: string,
  model: AIModel = 'gemini-2.5-flash',
  reviewFocus: ReviewFocus = 'complete'
): Promise<string> => {
  const languageLabel = language.charAt(0).toUpperCase() + language.slice(1);

  // Add focus-specific correction instructions
  const focusNote = reviewFocus !== 'complete'
    ? `Zaměřte se především na opravu problémů souvisejících s: ${
        reviewFocus === 'security' ? 'bezpečností' :
        reviewFocus === 'performance' ? 'výkonem' :
        reviewFocus === 'bestPractices' ? 'best practices' :
        'detekcí chyb'
      }.`
    : '';

  const prompt = `
    Jste expertní softwarový inženýr. Vaším úkolem je opravit následující kód v jazyce ${languageLabel}.
    Aplikujte osvědčené postupy, opravte všechny chyby a vylepšete čitelnost.
    ${focusNote}

    DŮLEŽITÉ:
    1. Ke každé provedené změně přidejte komentář přímo do kódu, který jasně a stručně vysvětluje, co a proč bylo změněno.
    2. Vraťte POUZE opravený kód v Markdown bloku.
    3. Nezačínejte odpověď žádným dodatečným textem jako "Jistě, zde je opravený kód:". Začněte rovnou s Markdown blokem \`\`\`${language}.

    Původní kód ke kontrole a opravě:
    \`\`\`${language}
    ${code}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    // Clean the response to only get the code within the markdown block
    const text = response.text || '';
    const codeBlockRegex = /```(?:[a-zA-Z0-9]*)?\n([\s\S]*?)```/;
    const match = text.match(codeBlockRegex);
    return match ? match[1].trim() : text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for code correction:", error);
    if (error instanceof Error) {
      throw new Error(`Chyba při volání Gemini API: ${error.message}`);
    }
    throw new Error("Selhalo získání opraveného kódu z Gemini API.");
  }
};

// Helper function to validate API key
export const validateApiKey = (): boolean => {
  return !!process.env.API_KEY && process.env.API_KEY.length > 0;
};

// Helper to estimate API call cost/time
export const estimateApiCallInfo = (codeLength: number, model: AIModel) => {
  const tokensEstimate = Math.ceil(codeLength / 4); // Rough estimate: 1 token ≈ 4 chars

  const modelSpeed = {
    'gemini-2.5-flash': 2000,  // tokens per second
    'gemini-2.5-pro': 1000,
    'gemini-1.5-flash': 2000,
    'gemini-1.5-pro': 1000,
  };

  const speed = modelSpeed[model] || 1000;
  const estimatedSeconds = Math.ceil(tokensEstimate / speed) + 2; // +2s for network overhead

  return {
    tokensEstimate,
    estimatedSeconds,
    estimatedCost: model.includes('pro') ? 'střední' : 'nízká',
  };
};
