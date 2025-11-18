import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { reviewCode } from '@gemini-reviewer/core';
import { storage } from '@gemini-reviewer/shared';

function PopupApp() {
  const [selectedText, setSelectedText] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Get selected text from current tab
    browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      if (tab.id) {
        browser.tabs.sendMessage(tab.id, { type: 'GET_SELECTION' }).then((response) => {
          if (response?.text) {
            setSelectedText(response.text);
          }
        });
      }
    });
  }, []);

  const handleReview = async () => {
    if (!selectedText.trim()) {
      alert('Vyberte kód na stránce nebo vložte do panelu');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const feedback = await reviewCode(selectedText, language);
      setResult(feedback);

      // Save to history
      const history = storage.get('review-history', []);
      history.unshift({
        code: selectedText.substring(0, 100),
        language,
        result: feedback,
        timestamp: Date.now()
      });
      storage.set('review-history', history.slice(0, 20));
    } catch (error) {
      console.error('Review failed:', error);
      setResult('❌ Chyba: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const openSidePanel = () => {
    browser.sidePanel.open({});
  };

  const openOptions = () => {
    browser.runtime.openOptionsPage();
  };

  return (
    <div className="bg-gray-900 text-white p-4 min-h-screen">
      <div className="mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🤖 Gemini Code Reviewer
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Vyberte kód na stránce nebo otevřete panel
        </p>
      </div>

      <div className="space-y-3">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={openSidePanel}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm font-medium transition"
          >
            📋 Otevřít Panel
          </button>
          <button
            onClick={openOptions}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition"
          >
            ⚙️ Nastavení
          </button>
        </div>

        {/* Language Selector */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Jazyk kódu:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
        </div>

        {/* Selected Text Preview */}
        {selectedText && (
          <div>
            <label className="block text-xs text-gray-400 mb-1">Vybraný kód:</label>
            <div className="bg-gray-800 border border-gray-700 rounded p-2 text-xs font-mono max-h-32 overflow-auto">
              {selectedText.substring(0, 200)}
              {selectedText.length > 200 && '...'}
            </div>
          </div>
        )}

        {/* Review Button */}
        <button
          onClick={handleReview}
          disabled={loading || !selectedText}
          className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? '⏳ Analyzuji...' : '✨ Zkontrolovat kód'}
        </button>

        {/* Result */}
        {result && (
          <div className="bg-gray-800 border border-gray-700 rounded p-3">
            <h3 className="text-sm font-bold mb-2">📝 Výsledek:</h3>
            <div className="text-xs whitespace-pre-wrap max-h-48 overflow-auto">
              {result}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-800">
          <p><strong>💡 Tip:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Vyberte kód → Pravý klik → Review</li>
            <li>Ctrl+Shift+Y → Otevře panel</li>
            <li>Panel = plná funkcionalita</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);

export default PopupApp;
