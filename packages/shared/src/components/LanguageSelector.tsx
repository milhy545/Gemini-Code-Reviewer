
import React from 'react';

interface Language {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
  languages: Language[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange, languages }) => {
  return (
    <div>
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        Vyberte jazyk
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
