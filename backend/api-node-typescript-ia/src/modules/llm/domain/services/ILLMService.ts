import { IAISuggestion } from "../entities/LLMResponse";

export interface ILLMRequest {
  content: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface ILLMResponse {
  content: string;
  model: string;
  aiSuggestion?: IAISuggestion;
  metadata?: any;
}

export interface ILLMService {
  generateResponse(request: ILLMRequest): Promise<any>;
}
