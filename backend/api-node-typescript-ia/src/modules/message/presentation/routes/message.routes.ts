import { Router } from "express";
import { CreateMessageUseCase } from "../../application/usecases/CreateMessageUseCase";
import { OpenAIService } from "../../../llm/infrastructure/services/OpenAIService";
import CreateMessageController from "../controllers/createMessageController/CreateMessageController";
import { MessageRepository } from "../../infrastructure/repositories/MessageRepository";
import { SqliteConnectionAdapter } from "../../../../shared/infrastructure/database/SqliteConnectionAdapter";
import { ListMessagesUseCase } from "../../application/usecases/ListMessagesUseCase";
import ListMessagesController from "../controllers/ListMessagesController";

const messageRouter = Router();

console.log(process.env.OPENAI_API_KEY);

// Configuração das dependências
const connection = SqliteConnectionAdapter.getInstance();
const openAIService = new OpenAIService(process.env.OPENAI_API_KEY || "");
console.log(openAIService);
const messageRepository = new MessageRepository(connection);
const createMessageUseCase = new CreateMessageUseCase(openAIService, messageRepository);
const createMessageController = new CreateMessageController(createMessageUseCase);

// Rotas
messageRouter.post("/ai-suggestion", (req, res): any => {
  console.log("create message ai-suggestion");
  return createMessageController.handle(req, res);
});

const listMessagesUseCase = new ListMessagesUseCase(messageRepository);
const listMessagesController = new ListMessagesController(listMessagesUseCase);

// rota para listar mensagens
messageRouter.get("/list", (req, res): any => {
  return listMessagesController.handle(req, res);
});

// Rota para testar IA diretamente
messageRouter.post("/ai-test", async (req, res): Promise<any> => {
  try {
    const { content, model } = req.body;

    if (!content) {
      return res.status(400).json({ error: "content é obrigatório" });
    }

    const response = await openAIService.generateResponse({
      content,
      model: model || "gpt-3.5-turbo",
    });

    return res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      error: `Erro ao testar IA: ${error}`,
    });
  }
});

export default messageRouter;
