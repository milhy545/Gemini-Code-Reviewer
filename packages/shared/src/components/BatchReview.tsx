import React, { useState } from 'react';
import type { AIModel, ReviewFocus } from '@gemini-reviewer/core';

export interface BatchFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  status: 'pending' | 'reviewing' | 'completed' | 'error';
  result?: string;
  error?: string;
}

interface BatchReviewProps {
  isOpen: boolean;
  onClose: () => void;
  aiModel: AIModel;
  reviewFocus: ReviewFocus;
  onReview: (code: string, language: string) => Promise<string>;
}

export const BatchReview: React.FC<BatchReviewProps> = ({
  isOpen,
  onClose,
  aiModel,
  reviewFocus,
  onReview,
}) => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const detectLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const langMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      java: 'java',
      go: 'go',
      rs: 'rust',
      cpp: 'cpp',
      c: 'c',
      cs: 'csharp',
      rb: 'ruby',
      php: 'php',
      swift: 'swift',
      kt: 'kotlin',
      scala: 'scala',
    };
    return langMap[ext] || 'javascript';
  };

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const batchFiles: BatchFile[] = selectedFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      path: file.name,
      content: '',
      language: detectLanguage(file.name),
      status: 'pending',
    }));

    // Read file contents
    Promise.all(
      selectedFiles.map((file, idx) =>
        file.text().then((content) => {
          batchFiles[idx].content = content;
        })
      )
    ).then(() => {
      setFiles(batchFiles);
    });
  };

  const handleStartReview = async () => {
    setIsReviewing(true);
    setCurrentFileIndex(0);

    for (let i = 0; i < files.length; i++) {
      setCurrentFileIndex(i);
      const file = files[i];

      // Update status to reviewing
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: 'reviewing' } : f))
      );

      try {
        const result = await onReview(file.content, file.language);

        // Update with result
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'completed', result } : f
          )
        );
      } catch (error) {
        // Update with error
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  status: 'error',
                  error: error instanceof Error ? error.message : 'Unknown error',
                }
              : f
          )
        );
      }

      // Small delay between reviews to avoid rate limiting
      if (i < files.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    setIsReviewing(false);
  };

  const handleExportResults = () => {
    const results = files
      .filter((f) => f.result)
      .map(
        (f) =>
          `# ${f.name}\n\nLanguage: ${f.language}\n\n## Review Result:\n\n${f.result}\n\n---\n\n`
      )
      .join('\n');

    const blob = new Blob([results], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-review-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFiles([]);
    setCurrentFileIndex(0);
  };

  const getStatusIcon = (status: BatchFile['status']) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'reviewing':
        return '🔄';
      case 'completed':
        return '✅';
      case 'error':
        return '❌';
    }
  };

  if (!isOpen) return null;

  const completedCount = files.filter((f) => f.status === 'completed').length;
  const errorCount = files.filter((f) => f.status === 'error').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📦 Dávková kontrola kódu
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* File Selection */}
          {files.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Vyberte soubory ke kontrole
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Můžete vybrat více souborů najednou
              </p>
              <label className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".js,.jsx,.ts,.tsx,.py,.java,.go,.rs,.cpp,.c,.cs,.rb,.php,.swift,.kt,.scala"
                  onChange={handleFilesSelect}
                  className="hidden"
                />
                📂 Vybrat soubory
              </label>
            </div>
          )}

          {/* Files List */}
          {files.length > 0 && (
            <div>
              {/* Progress */}
              {isReviewing && (
                <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                      Probíhá kontrola...
                    </span>
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">
                      {currentFileIndex + 1} / {files.length}
                    </span>
                  </div>
                  <div className="w-full bg-indigo-200 dark:bg-indigo-900 rounded-full h-2">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentFileIndex + 1) / files.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Summary */}
              {!isReviewing && (completedCount > 0 || errorCount > 0) && (
                <div className="mb-4 flex gap-4">
                  <div className="flex-1 bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {completedCount}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Úspěšně zkontrolováno
                    </div>
                  </div>
                  {errorCount > 0 && (
                    <div className="flex-1 bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
                      <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                        {errorCount}
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-400">
                        Chyby
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Files */}
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{getStatusIcon(file.status)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {file.language} • {file.content.length} znaků
                          </div>
                        </div>
                      </div>
                      {file.status === 'completed' && file.result && (
                        <button
                          onClick={() => {
                            const detail = document.getElementById(`detail-${file.id}`);
                            if (detail) {
                              detail.classList.toggle('hidden');
                            }
                          }}
                          className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800"
                        >
                          Zobrazit
                        </button>
                      )}
                    </div>

                    {/* Result Detail */}
                    {file.status === 'completed' && file.result && (
                      <div
                        id={`detail-${file.id}`}
                        className="hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="prose dark:prose-invert max-w-none text-sm">
                          <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            {file.result}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Error Detail */}
                    {file.status === 'error' && file.error && (
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                        Chyba: {file.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {files.length > 0 && (
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                disabled={isReviewing}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🗑️ Vymazat
              </button>
              {completedCount > 0 && (
                <button
                  onClick={handleExportResults}
                  className="px-4 py-2 text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800"
                >
                  💾 Exportovat výsledky
                </button>
              )}
            </div>
            <button
              onClick={handleStartReview}
              disabled={isReviewing || files.length === 0}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isReviewing ? '⏳ Kontroluji...' : `✨ Zkontrolovat ${files.length} souborů`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
