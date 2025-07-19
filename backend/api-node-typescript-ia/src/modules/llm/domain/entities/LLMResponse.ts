import { Result } from "../../../../shared/core/Result";
import { v4 as uuidv4 } from "uuid";

export interface IAISuggestion {
  suggestedDescription?: string;
  suggestedPriority?: "low" | "medium" | "high";
  suggestedStatus?: "pending" | "in-progress" | "completed";
  suggestedDueDate?: string;
  reasoning?: string;
}

export default class LLMResponse {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly model: string,
    public readonly aiSuggestion?: IAISuggestion,
    public readonly metadata?: any,
    public readonly createdAt?: Date
  ) {}

  static create(
    content: string,
    model: string,
    aiSuggestion?: IAISuggestion,
    metadata?: any,
    id?: string,
    createdAt?: Date
  ): Result<LLMResponse> {
    const responseId = id || uuidv4();
    const responseCreatedAt = createdAt || new Date();

    const llmResponse = new LLMResponse(responseId, content, model, aiSuggestion, metadata, responseCreatedAt);

    return Result.ok<LLMResponse>(llmResponse);
  }
}
