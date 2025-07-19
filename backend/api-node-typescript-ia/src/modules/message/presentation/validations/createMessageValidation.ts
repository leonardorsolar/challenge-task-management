//Implementar validação robusta: Usar uma biblioteca como Zod ou class-validator.
//Quando as validações estão em uma pasta separada, elas podem ser facilmente reutilizadas por outros controllers. Por exemplo, se você tiver um UpdateMessageController no futuro, ele provavelmente compartilhará grande parte da mesma lógica de validação do CreateMessageController.
//Usando o transform do Zod para garantir que createdAt sempre seja um objeto Date.
//deixando o Zod validar e transformar os dados de entrada.

import { z } from "zod";

export const createMessageSchema = z.object({
  id: z.string().uuid("ID inválido").optional(),

  chatId: z.string().min(1, "chatId é obrigatório"), // remove UUID
  userId: z.string().min(1, "userId é obrigatório").optional(), // agora aceito
  content: z.string().min(1, "O conteúdo é obrigatório"),

  systemPrompt: z.string().optional(), // agora aceito

  role: z.enum(["user", "assistant"]).optional().default("user"),

  createdAt: z
    .union([z.string().datetime({ message: "Data inválida, use formato ISO" }), z.date()])
    .optional()
    .transform((val) => (val instanceof Date ? val : val ? new Date(val) : undefined)),

  promptId: z.string().uuid("promptId inválido").optional(),
});

// import { z } from 'zod';

// export const createMessageSchema = z.object({
//   content: z.string().min(1, 'O conteúdo é obrigatório'),
//   chatId: z.string().uuid('ID de chat inválido'),
//   role: z.enum(['user', 'assistant'], {
//     errorMap: () => ({ message: 'O papel deve ser user ou assistant' })
//   }),
//   // outros campos
// });

// export type CreateMessageInput = z.infer<typeof createMessageSchema>;

// // No controller:
// import { createMessageSchema } from '../validations/createMessageValidation';

// // ...
// const validation = createMessageSchema.safeParse(req.body);
// if (!validation.success) {
//   return res.status(400).json({
//     errors: validation.error.format()
//   });
// }
// const validData = validation.data;
// ...
