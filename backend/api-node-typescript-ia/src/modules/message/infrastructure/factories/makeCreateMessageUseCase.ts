//factories para instanciar objetos com suas dependências:

import { PostgresConnectionAdapter } from "../../../../shared/infrastructure/database/PostgresConnectionAdapter";
import { CreateChatUseCase } from "../../../chat/application/usecases/CreateChatUseCase";
import { ChatRepository } from "../../../chat/infrastructure/repositories/ChatRepository";
import { GenerateResponseUseCase } from "../../../llm/application/usecases/GenerateResponseUseCase";
import { LLMProvider, LLMServiceFactory } from "../../../llm/infrastructure/factory/LLMServiceFactory";
import { CreateMessageUseCase } from "../../application/usecases/CreateMessageUseCase";
import { MessageRepository } from "../repositories/MessageRepository";

// export const makeCreateMessageUseCase = () => {
//   const messageRepository = new MessageRepository();
//   //return new CreateMessageUseCase(messageRepository);
//   return new CreateMessageUseCase();
// };

//instanciar objetos com dependências
export const makeCreateMessageUseCase = () => {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  const perplexityApiKey = process.env.PERPLEXITY_API_KEY;

  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not defined");
  }

  if (!anthropicApiKey) {
    throw new Error("ANTHROPIC_API_KEY is not defined");
  }

  if (!perplexityApiKey) {
    throw new Error("PERPLEXITY_API_KEY is not defined");
  }

  const connection = new PostgresConnectionAdapter();
  const messageRepository = new MessageRepository(connection);
  const chatRepository = new ChatRepository(connection);
  const createChatUseCase = new CreateChatUseCase(chatRepository);

  // Aqui vamos usar o factory para criar o serviço OpenAI como padrão
  // O serviço específico será escolhido no controller com base no modelo
  const llmService = LLMServiceFactory.create(LLMProvider.OPENAI, openaiApiKey);
  const generateResponseUseCase = new GenerateResponseUseCase(llmService);

  return new CreateMessageUseCase(messageRepository, generateResponseUseCase, createChatUseCase, chatRepository);
};
