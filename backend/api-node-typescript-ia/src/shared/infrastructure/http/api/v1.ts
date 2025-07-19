import { Router } from "express";
import messageRouter from "../../../../modules/message/presentation/routes/message.routes";

const v1Router = Router();

v1Router.get("/", (req, res) => {
  res.json({
    message: "API v1 - OpenAI Integration",
    version: "1.0.0",
    endpoints: {
      messages: "/api/v1/message",
      routes: [
        "POST /api/v1/message/create - Criar mensagem e gerar resposta da IA",
        "POST /api/v1/message/ai-test - Testar IA diretamente",
      ],
    },
  });
});

//Register routes
// api/v1/message
v1Router.use("/message", messageRouter);

export default v1Router;
