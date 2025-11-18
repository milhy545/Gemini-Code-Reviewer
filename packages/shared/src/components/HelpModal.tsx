// Help modal with keyboard shortcuts and about info
import React from 'react';
import { APP_INFO } from '../constants';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', 'Enter'], description: 'Zkontrolovat kód' },
    { keys: ['Ctrl', 'Shift', 'Enter'], description: 'Opravit kód' },
    { keys: ['Ctrl', ','], description: 'Otevřít nastavení' },
    { keys: ['Ctrl', 'H'], description: 'Otevřít historii' },
    { keys: ['Ctrl', 'K'], description: 'Vymazat kód' },
    { keys: ['Ctrl', 'D'], description: 'Přepnout téma' },
    { keys: ['Ctrl', 'Shift', 'S'], description: 'Exportovat výsledky' },
    { keys: ['Shift', '?'], description: 'Zobrazit nápovědu' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nápověda
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Zavřít"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* About */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                O aplikaci
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>{APP_INFO.name}</strong> je AI-powered nástroj pro kontrolu a opravu kódu pomocí Google Gemini AI.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p><strong>Verze:</strong> {APP_INFO.version}</p>
                  <p><strong>Licence:</strong> {APP_INFO.license}</p>
                </div>
              </div>
            </section>

            {/* How to use */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">📖</span>
                Jak používat
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Vložte nebo nahrajte kód, který chcete zkontrolovat</li>
                <li>Vyberte programovací jazyk kódu</li>
                <li>V nastavení zvolte AI model a zaměření kontroly</li>
                <li>Klikněte na "Zkontrolovat kód" pro review nebo "Opravit kód" pro automatickou opravu</li>
                <li>Výsledky se automaticky uloží do historie</li>
                <li>Exportujte výsledky do PDF, JSON nebo Markdown</li>
              </ol>
            </section>

            {/* Keyboard Shortcuts */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">⌨️</span>
                Klávesové zkratky
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <span className="text-gray-400 text-xs">+</span>}
                            <kbd className="px-2 py-1 text-xs font-mono bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded shadow-sm text-gray-900 dark:text-gray-100">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Funkce
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">11+ programovacích jazyků</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Více AI modelů (Flash/Pro)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Specializované review presets</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Historie a statistiky</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Export do PDF/JSON/Markdown</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dark/Light mode</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Syntax highlighting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Text-to-speech feedback</span>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">❓</span>
                Často kladené otázky
              </h3>
              <div className="space-y-3">
                <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                    Jaké jazyky jsou podporovány?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    JavaScript, TypeScript, Python, Java, C#, PHP, Ruby, Go, HTML, CSS, SQL a další.
                  </p>
                </details>
                <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                    Jaký je rozdíl mezi modely Flash a Pro?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Flash je rychlejší a levnější, ideální pro běžné kontroly. Pro je pomalejší, ale poskytuje detailnější a kvalitnější analýzu.
                  </p>
                </details>
                <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                    Jsou moje data bezpečná?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Všechna data jsou ukládána pouze lokálně ve vašem prohlížeči (localStorage). Nic není zasíláno na externí servery kromě Google Gemini API pro analýzu.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Zavřít
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
