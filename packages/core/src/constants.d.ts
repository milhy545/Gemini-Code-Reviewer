import { ModelInfo, ReviewPreset } from './types';
export declare const LANGUAGES: {
    value: string;
    label: string;
}[];
export declare const DEFAULT_CODE_SNIPPET = "function factorial(n) {\n  if (n == 0)\n    return 1;\n  var i = n;\n  var result = 1;\n  while(i > 0) {\n    result = result * i;\n    i = i - 1;\n  }\n  return result;\n}";
export declare const AI_MODELS: ModelInfo[];
export declare const REVIEW_PRESETS: ReviewPreset[];
export declare const FILE_EXTENSIONS: Record<string, string>;
export declare const ACCEPTED_FILE_TYPES: string[];
export declare const UI_LANGUAGES: {
    value: string;
    label: string;
}[];
export declare const APP_INFO: {
    name: string;
    version: string;
    description: string;
    author: string;
    repository: string;
    license: string;
};
export declare const RATE_LIMITS: {
    MAX_REQUESTS_PER_MINUTE: number;
    MAX_CODE_LENGTH: number;
    MAX_FILE_SIZE: number;
    COOLDOWN_MS: number;
};
export declare const STORAGE_LIMITS: {
    MAX_HISTORY_ITEMS: number;
    WARNING_SIZE_MB: number;
    MAX_SIZE_MB: number;
};
//# sourceMappingURL=constants.d.ts.map