// src/modules/message/presentation/controllers/getMessagesByChatIdController.ts
import { Request, Response } from "express";
import { PostgresConnectionAdapter } from "../../../../shared/infrastructure/database/PostgresConnectionAdapter";
import { MessageRepository } from "../../infrastructure/repositories/MessageRepository";

class GetMessagesByChatIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    console.log("GetMessagesByChatIdController");
    try {
      const { chatId } = req.params;

      if (!chatId) {
        return res.status(400).json({ message: "chatId is required" });
      }

      const connection = PostgresConnectionAdapter.getInstance();
      const messageRepository = new MessageRepository(connection);

      const messages = await messageRepository.findByChatId(chatId);
      console.log("GetMessagesByChatIdController - retorno");
      //console.log(messages);

      return res.status(200).json(messages);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({
        message: `Error getting messages: ${err.message}`,
      });
    }
  }
}

export const getMessagesByChatIdController = new GetMessagesByChatIdController();
