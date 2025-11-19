import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage.js';

export interface CodeSnippet {
  id: string;
  name: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  usageCount: number;
}

interface SnippetsLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onUseSnippet: (snippet: CodeSnippet) => void;
}

export const SnippetsLibrary: React.FC<SnippetsLibraryProps> = ({
  isOpen,
  onClose,
  onUseSnippet,
}) => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<CodeSnippet>>({});

  // Load snippets from storage
  useEffect(() => {
    const loadSnippets = () => {
      const saved = storage.get<CodeSnippet[]>('fullCodes', []);
      setSnippets(saved);
    };
    loadSnippets();
  }, []);

  // Save snippets to storage
  const saveSnippets = (newSnippets: CodeSnippet[]) => {
    storage.set('fullCodes', newSnippets);
    setSnippets(newSnippets);
  };

  const handleCreateNew = () => {
    setEditForm({
      name: '',
      description: '',
      language: 'javascript',
      code: '',
      tags: [],
    });
    setIsEditing(true);
    setSelectedSnippet(null);
  };

  const handleEdit = (snippet: CodeSnippet) => {
    setEditForm(snippet);
    setIsEditing(true);
    setSelectedSnippet(snippet);
  };

  const handleSave = () => {
    if (!editForm.name || !editForm.code) {
      alert('Název a kód jsou povinné');
      return;
    }

    const now = Date.now();
    const snippet: CodeSnippet = {
      id: editForm.id || `snippet-${now}`,
      name: editForm.name!,
      description: editForm.description || '',
      language: editForm.language || 'javascript',
      code: editForm.code!,
      tags: editForm.tags || [],
      createdAt: editForm.createdAt || now,
      updatedAt: now,
      usageCount: editForm.usageCount || 0,
    };

    if (selectedSnippet) {
      // Update existing
      saveSnippets(snippets.map((s) => (s.id === snippet.id ? snippet : s)));
    } else {
      // Create new
      saveSnippets([...snippets, snippet]);
    }

    setIsEditing(false);
    setEditForm({});
    setSelectedSnippet(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Opravdu chcete smazat tento snippet?')) {
      saveSnippets(snippets.filter((s) => s.id !== id));
      if (selectedSnippet?.id === id) {
        setSelectedSnippet(null);
      }
    }
  };

  const handleUse = (snippet: CodeSnippet) => {
    // Increment usage count
    const updated = snippets.map((s) =>
      s.id === snippet.id ? { ...s, usageCount: s.usageCount + 1 } : s
    );
    saveSnippets(updated);
    onUseSnippet(snippet);
    onClose();
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      const newTag = e.currentTarget.value.trim();
      setEditForm({
        ...editForm,
        tags: [...(editForm.tags || []), newTag],
      });
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tag: string) => {
    setEditForm({
      ...editForm,
      tags: (editForm.tags || []).filter((t) => t !== tag),
    });
  };

  // Filter snippets
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      searchQuery === '' ||
      snippet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage =
      selectedLanguage === 'all' || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  // Get unique languages
  const languages = Array.from(new Set(snippets.map((s) => s.language)));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📚 Knihovna kódových snippetů
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar - List */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <input
                type="text"
                placeholder="🔍 Hledat snippety..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-2"
              />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="all">Všechny jazyky</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <button
                onClick={handleCreateNew}
                className="w-full mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
              >
                ➕ Nový snippet
              </button>
            </div>

            {/* Snippets List */}
            <div className="flex-1 overflow-y-auto">
              {filteredSnippets.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">📝</div>
                  <p>Žádné snippety</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredSnippets.map((snippet) => (
                    <button
                      key={snippet.id}
                      onClick={() => setSelectedSnippet(snippet)}
                      className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                        selectedSnippet?.id === snippet.id
                          ? 'bg-indigo-100 dark:bg-indigo-900 border-2 border-indigo-500'
                          : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent'
                      }`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {snippet.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {snippet.language} • Použito {snippet.usageCount}×
                      </div>
                      {snippet.tags.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {snippet.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Detail/Edit */}
          <div className="flex-1 flex flex-col">
            {isEditing ? (
              /* Edit Form */
              <div className="flex-1 overflow-y-auto p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {selectedSnippet ? 'Upravit snippet' : 'Nový snippet'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Název *
                    </label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      placeholder="Název snippetu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Popis
                    </label>
                    <input
                      type="text"
                      value={editForm.description || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      placeholder="Stručný popis"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Jazyk
                    </label>
                    <select
                      value={editForm.language || 'javascript'}
                      onChange={(e) =>
                        setEditForm({ ...editForm, language: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="go">Go</option>
                      <option value="rust">Rust</option>
                      <option value="cpp">C++</option>
                      <option value="csharp">C#</option>
                      <option value="ruby">Ruby</option>
                      <option value="php">PHP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tagy
                    </label>
                    <input
                      type="text"
                      onKeyDown={handleTagInput}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      placeholder="Stiskněte Enter pro přidání tagu"
                    />
                    {editForm.tags && editForm.tags.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {editForm.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-sm"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="hover:text-red-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Kód *
                    </label>
                    <textarea
                      value={editForm.code || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, code: e.target.value })
                      }
                      rows={12}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
                      placeholder="Vložte kód..."
                    />
                  </div>
                </div>
              </div>
            ) : selectedSnippet ? (
              /* Detail View */
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedSnippet.name}
                    </h3>
                    {selectedSnippet.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {selectedSnippet.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(selectedSnippet)}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      ✏️ Upravit
                    </button>
                    <button
                      onClick={() => handleDelete(selectedSnippet.id)}
                      className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                    >
                      🗑️ Smazat
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
                    {selectedSnippet.language}
                  </span>
                  <span>Použito {selectedSnippet.usageCount}×</span>
                  <span>
                    Vytvořeno {new Date(selectedSnippet.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {selectedSnippet.tags.length > 0 && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {selectedSnippet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap text-gray-900 dark:text-white">
                    {selectedSnippet.code}
                  </pre>
                </div>

                <button
                  onClick={() => handleUse(selectedSnippet)}
                  className="w-full mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                >
                  ✨ Použít tento snippet
                </button>
              </div>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">👈</div>
                  <p>Vyberte snippet nebo vytvořte nový</p>
                </div>
              </div>
            )}

            {/* Edit Actions */}
            {isEditing && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({});
                    setSelectedSnippet(null);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                >
                  💾 Uložit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
