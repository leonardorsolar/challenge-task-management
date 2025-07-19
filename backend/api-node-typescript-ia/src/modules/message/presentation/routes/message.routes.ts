import { Router } from "express";
import CreateMessageController from "../controllers/CreateMessageController";
import { CreateMessageUseCase } from "../../application/usecases/CreateMessageUseCase";
import { OpenAIService } from "../../../llm/infrastructure/services/OpenAIService";

const messageRouter = Router();

// Configuração das dependências
const openAIService = new OpenAIService(process.env.OPENAI_API_KEY || "");
const createMessageUseCase = new CreateMessageUseCase(openAIService);
const createMessageController = new CreateMessageController(createMessageUseCase);

// Rotas
messageRouter.post("/create", (req, res): any => {
  console.log("create message");
  return createMessageController.handle(req, res);
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
