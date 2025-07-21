import { Request, Response } from "express";
import { CreateMessageUseCase } from "../../../application/usecases/CreateMessageUseCase";

export default class CreateMessageController {
  constructor(private createMessageUseCase: CreateMessageUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    //console.log(req.body);
    try {
      //const { userId, content, llmModel } = req.body;
      //console.log(req.body);

      // Validação básica
      // if (!content) {
      //   return res.status(400).json({
      //     error: "content é obrigatório",
      //   });
      // }

      const responseOrError = await this.createMessageUseCase.execute(req.body);
      console.log("responseOrError");
      console.log(responseOrError);

      if (responseOrError.isLeft()) {
        const error = responseOrError.value;
        return res.status(error.statusCode).json(error.message);
      } else {
        return res.status(201).json(responseOrError.value);
      }
      return res.status(201).json("ok");
    } catch (error) {
      console.error("Erro no CreateMessageController:", error);
      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }
}
