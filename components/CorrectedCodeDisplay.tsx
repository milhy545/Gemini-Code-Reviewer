import React from 'react';
import { WandIcon } from './icons/WandIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface CorrectedCodeDisplayProps {
  code: string;
  language: string;
}

const CorrectedCodeDisplay: React.FC<CorrectedCodeDisplayProps> = ({ code, language }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const extensionMap: { [key: string]: string } = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      html: 'html',
      css: 'css',
      sql: 'sql'
    };
    const extension = extensionMap[language] || 'txt';
    a.download = `corrected-code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!code) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        <WandIcon className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Opravený kód</h3>
        <p className="text-sm">Opravená verze kódu se zde zobrazí.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
          <WandIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          Opravený kód
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            title="Stáhnout soubor"
          >
            <DownloadIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            Kopírovat
          </button>
        </div>
      </div>
      <div className="p-4 overflow-auto h-full bg-gray-50 dark:bg-gray-950">
        <pre className="text-gray-900 dark:text-gray-100"><code className={`language-${language} text-sm font-mono`}>{code}</code></pre>
      </div>
    </div>
  );
};

export default CorrectedCodeDisplay;
