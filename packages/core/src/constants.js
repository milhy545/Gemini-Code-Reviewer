export const LANGUAGES = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
];
export const DEFAULT_CODE_SNIPPET = `function factorial(n) {
  if (n == 0)
    return 1;
  var i = n;
  var result = 1;
  while(i > 0) {
    result = result * i;
    i = i - 1;
  }
  return result;
}`;
// AI Models configuration
export const AI_MODELS = [
    {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
        description: 'Nejrychlejší model, ideální pro rychlé kontroly',
        speed: 'fast',
        quality: 'good',
        costLevel: 'low',
    },
    {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        description: 'Vybalancovaný model s vysokou kvalitou',
        speed: 'medium',
        quality: 'best',
        costLevel: 'medium',
    },
    {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        description: 'Starší rychlý model',
        speed: 'fast',
        quality: 'good',
        costLevel: 'low',
    },
    {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        description: 'Starší pro model',
        speed: 'medium',
        quality: 'better',
        costLevel: 'medium',
    },
];
// Review focus presets
export const REVIEW_PRESETS = [
    {
        id: 'complete',
        name: 'Kompletní kontrola',
        description: 'Kontrola všech aspektů kódu (chyby, best practices, výkon, bezpečnost)',
        icon: '🔍',
    },
    {
        id: 'security',
        name: 'Bezpečnost',
        description: 'Zaměření na bezpečnostní zranitelnosti a rizika',
        icon: '🔒',
    },
    {
        id: 'performance',
        name: 'Výkon',
        description: 'Analýza výkonu a optimalizační příležitosti',
        icon: '⚡',
    },
    {
        id: 'bestPractices',
        name: 'Best Practices',
        description: 'Kontrola čitelnosti, konvencí a best practices',
        icon: '✨',
    },
    {
        id: 'bugs',
        name: 'Detekce chyb',
        description: 'Hledání bugů, logických chyb a edge cases',
        icon: '🐛',
    },
];
// File extension mapping for downloads
export const FILE_EXTENSIONS = {
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
    sql: 'sql',
};
// Accepted file types for upload
export const ACCEPTED_FILE_TYPES = [
    '.js', '.ts', '.jsx', '.tsx',
    '.py', '.java', '.cs', '.php',
    '.rb', '.go', '.html', '.css',
    '.sql', '.txt', '.json', '.xml',
];
// UI Language labels
export const UI_LANGUAGES = [
    { value: 'cs', label: 'Čeština' },
    { value: 'en', label: 'English' },
];
// App metadata
export const APP_INFO = {
    name: 'Gemini Code Reviewer',
    version: '2.0.0',
    description: 'AI-powered code review and correction tool using Google Gemini',
    author: 'Your Name',
    repository: 'https://github.com/yourusername/gemini-code-reviewer',
    license: 'MIT',
};
// Rate limiting constants
export const RATE_LIMITS = {
    MAX_REQUESTS_PER_MINUTE: 10,
    MAX_CODE_LENGTH: 50000, // characters
    MAX_FILE_SIZE: 1024 * 1024, // 1MB
    COOLDOWN_MS: 1000, // 1 second between requests
};
// LocalStorage size limits
export const STORAGE_LIMITS = {
    MAX_HISTORY_ITEMS: 50,
    WARNING_SIZE_MB: 4,
    MAX_SIZE_MB: 5,
};
