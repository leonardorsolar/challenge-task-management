// import { PostgresConnectionAdapter } from "../../../../shared/infrastructure/database/PostgresConnectionAdapter";
// import Message from "../../domain/entities/Message";
// import { MessageRepository } from "../../infrastructure/repositories/MessageRepository";
// import { v4 as uuidv4 } from "uuid";

// describe("MessageRepository Integration Test", () => {
//   let connection: PostgresConnectionAdapter;
//   let repository: MessageRepository;

//   let chatId: string;
//   let userId: string;

//   beforeAll(async () => {
//     connection = PostgresConnectionAdapter.getInstance();
//     repository = new MessageRepository(connection);

//     chatId = uuidv4();
//     userId = uuidv4();

//     await connection.query(
//       `
//     INSERT INTO chats (id, user_id, content, llm_model, created_at, updated_at)
//     VALUES ($1, $2, $3, $4, NOW(), NOW())
//     `,
//       [chatId, userId, "Teste de integração", "gpt-3.5-turbo"]
//     );
//   });

//   it("should save a message to the database", async () => {
//     const message = new Message(
//       uuidv4(), // use uuid ou gere dinamicamente
//       chatId,
//       userId,
//       "Olá, mundo!",
//       "user",
//       new Date()
//     );

//     await repository.save(message);

//     // Buscando diretamente do banco para verificar
//     const result = await connection.query("SELECT * FROM messages WHERE id = $1", [message.id]);

//     expect(result.length).toBe(1);
//     expect(result[0].content).toBe("Olá, mundo!");
//     expect(result[0].role).toBe("user");
//   });
// });
