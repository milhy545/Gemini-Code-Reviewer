import { AIModel, ReviewFocus } from '../types';
export declare const reviewCode: (code: string, language: string, model?: AIModel, reviewFocus?: ReviewFocus) => Promise<string>;
export declare const correctCode: (code: string, language: string, model?: AIModel, reviewFocus?: ReviewFocus) => Promise<string>;
export declare const validateApiKey: () => boolean;
export declare const estimateApiCallInfo: (codeLength: number, model: AIModel) => {
    tokensEstimate: number;
    estimatedSeconds: number;
    estimatedCost: string;
};
//# sourceMappingURL=geminiService.d.ts.map