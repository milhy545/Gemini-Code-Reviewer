import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const reviewCode = async (code: string, language: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const languageLabel = language.charAt(0).toUpperCase() + language.slice(1);

  const prompt = `
    Jste expert na kontrolu kódu a vystupujete jako seniorní softwarový inženýr. Vaším úkolem je poskytnout komplexní revizi následujícího úryvku kódu napsaného v jazyce ${languageLabel}. Odpovídejte VŽDY v češtině.

    Analyzujte kód z následujících hledisek:
    1.  **Správnost a chyby:** Identifikujte všechny potenciální chyby, logické nedostatky nebo okrajové případy, které nejsou ošetřeny.
    2.  **Osvědčené postupy a čitelnost:** Navrhněte vylepšení na základě zavedených osvědčených postupů pro jazyk ${languageLabel}. Komentujte srozumitelnost kódu, konvence pojmenování a celkovou strukturu.
    3.  **Výkon:** Upozorněte na jakékoli potenciální problémy s výkonem a navrhněte optimalizace.
    4.  **Bezpečnost:** Zvýrazněte veškeré bezpečnostní zranitelnosti, pokud jsou relevantní.

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
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini API.");
  }
};

export const correctCode = async (code: string, language: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  const languageLabel = language.charAt(0).toUpperCase() + language.slice(1);

  const prompt = `
    Jste expertní softwarový inženýr. Vaším úkolem je opravit následující kód v jazyce ${languageLabel}.
    Aplikujte osvědčené postupy, opravte všechny chyby a vylepšete čitelnost.

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
    const text = response.text;
    const codeBlockRegex = /```(?:[a-zA-Z0-9]*)?\n([\s\S]*?)```/;
    const match = text.match(codeBlockRegex);
    return match ? match[1].trim() : text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for code correction:", error);
    throw new Error("Failed to get corrected code from Gemini API.");
  }
};
