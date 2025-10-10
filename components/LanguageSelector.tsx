
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
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-400 mb-2">
        Vyberte jazyk
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
