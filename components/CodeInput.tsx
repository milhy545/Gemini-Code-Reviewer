import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  onFileRead: (content: string) => void;
  language: string;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, onCodeChange, onFileRead, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileRead(content);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">Váš kód</span>
        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title="Nahrát soubor"
        >
          <UploadIcon className="w-4 h-4" />
          Nahrát
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".js,.ts,.py,.java,.cs,.php,.rb,.go,.html,.css,.sql,.txt"
        />
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        className="w-full h-full p-4 font-mono text-sm text-gray-200 bg-transparent resize-none focus:outline-none"
        placeholder="Vložte svůj kód zde..."
        spellCheck="false"
      />
    </div>
  );
};

export default CodeInput;
