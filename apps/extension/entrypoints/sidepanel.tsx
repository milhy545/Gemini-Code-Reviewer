import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header, CodeInput, Settings } from '@gemini-reviewer/shared';
import { reviewCode } from '@gemini-reviewer/core';
import './sidepanel.css';

function SidePanelApp() {
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('javascript');
  const [feedback, setFeedback] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const result = await reviewCode(code, language);
      setFeedback(result);
    } catch (error) {
      console.error('Review failed:', error);
      setFeedback('Chyba při analýze kódu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Header
        theme="dark"
        onToggleTheme={() => {}}
        onOpenSettings={() => {}}
        onOpenHistory={() => {}}
        onOpenStats={() => {}}
        onOpenHelp={() => {}}
      />

      <main className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Code Review Extension</h2>

        <div className="mb-4">
          <CodeInput
            code={code}
            onCodeChange={setCode}
            onFileRead={setCode}
            language={language}
          />
        </div>

        <button
          onClick={handleReview}
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Analyzuji...' : 'Zkontrolovat kód'}
        </button>

        {feedback && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Výsledek:</h3>
            <pre className="whitespace-pre-wrap text-sm">{feedback}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

// Mount app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SidePanelApp />
  </React.StrictMode>
);

export default SidePanelApp;
