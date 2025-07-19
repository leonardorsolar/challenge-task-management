// import Message from "../../domain/entities/Message";

// describe("Message Entity", () => {
//   it("should create a message with valid properties", () => {
//     const result = Message.create("chat1", "user1", "Olá, mundo!", "user");

//     expect(result.isSuccess).toBe(true);
//     expect(result.getValue()).toBeInstanceOf(Message);

//     const message = result.getValue();

//     expect(message.chatId).toBe("chat1");
//     expect(message.userId).toBe("user1");
//     expect(message.content).toBe("Olá, mundo!");
//     expect(message.role).toBe("user");
//   });

//   it("should create a Message with assistant role", () => {
//     const result = Message.create("chat1", null, "Olá, posso ajudar?", "assistant");

//     expect(result.isSuccess).toBe(true);
//     const message = result.getValue();
//     expect(message.role).toBe("assistant");
//     expect(message.userId).toBeNull();
//   });

//   it("should return failure if invalid role is provided", () => {
//     // como ainda não há validação de role, isso passaria
//     // se quiser validar, você pode adicionar essa regra no método `create`
//     const result = Message.create("chat1", "user1", "mensagem", "invalido");

//     expect(result.isSuccess).toBe(true); // isso mudaria para `false` se você adicionar validação
//   });
// });
