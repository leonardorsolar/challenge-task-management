//deve conter apenas regras de negócio e dados essenciais, sem dependência de bibliotecas externas (como Express, Zod, Axios, etc).
import { Result } from "../../../../shared/core/Result";
import { v4 as uuidv4 } from "uuid"; // Importando a função para gerar UUID

export default class Message {
  constructor(
    public readonly id: string,
    public readonly chatId: string, // Referência ao chat, mas sem acoplamento direto
    public userId: string | null,
    public readonly content: string,
    public readonly llmModel: string,
    public readonly role: "user" | "assistant",
    public readonly createdAt?: Date //public readonly promptId?: string
  ) {}

  // factory method
  static create(
    chatId: string,
    userId: string | null,
    content: string,
    llmModel: string,
    role: any,
    id?: string,
    createdAt?: Date
  ): Result<Message> {
    // Gerar o ID como UUID se não fornecido
    /// Gerar um ID novo e único para cada mensagem
    const messageId = id || uuidv4(); // Use o ID fornecido ou gere um novo UUID
    const messageCreatedAt = createdAt || new Date();

    const message = new Message(messageId, chatId, userId, content, llmModel, role, messageCreatedAt);

    return Result.ok<Message>(message);
  }
}

//Se a lógica de negócios for complexa, considere adicionar Value Objects, Aggregates e Domain Events.
/* import { Result } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Guard } from "../../../../shared/core/Guard";
import { Either, right, left } from "../../../../shared/core/Either";
import { AppError } from "../../../../shared/core/AppError";

// Value Objects
export class MessageContent {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(content: string): Either<AppError, MessageContent> {
    const guardResult = Guard.againstNullOrUndefined(content, 'content');
    if (!guardResult.succeeded) {
      return left(new AppError('INVALID_MESSAGE_CONTENT', guardResult.message));
    }
    
    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
      return left(new AppError('INVALID_MESSAGE_CONTENT', 'Message content cannot be empty'));
    }
    
    if (trimmedContent.length > 10000) {
      return left(new AppError('INVALID_MESSAGE_CONTENT', 'Message content exceeds maximum length'));
    }

    return right(new MessageContent(trimmedContent));
  }
}

export class MessageRole {
  private readonly value: "user" | "assistant";

  private constructor(value: "user" | "assistant") {
    this.value = value;
  }

  public getValue(): "user" | "assistant" {
    return this.value;
  }

  public static create(role: string): Either<AppError, MessageRole> {
    if (role !== "user" && role !== "assistant") {
      return left(new AppError('INVALID_MESSAGE_ROLE', 'Role must be either "user" or "assistant"'));
    }

    return right(new MessageRole(role as "user" | "assistant"));
  }
}

// Message Entity (Aggregate Root)
export class Message extends Entity<MessageProps> {
  private constructor(props: MessageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get chatId(): string {
    return this.props.chatId;
  }

  get content(): MessageContent {
    return this.props.content;
  }

  get role(): MessageRole {
    return this.props.role;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get promptId(): string | undefined {
    return this.props.promptId;
  }

  public static create(props: MessageCreateProps, id?: UniqueEntityID): Either<AppError, Message> {
    const contentOrError = MessageContent.create(props.content);
    if (contentOrError.isLeft()) {
      return left(contentOrError.value);
    }

    const roleOrError = MessageRole.create(props.role);
    if (roleOrError.isLeft()) {
      return left(roleOrError.value);
    }

    const guardResult = Guard.againstNullOrUndefined(props.chatId, 'chatId');
    if (!guardResult.succeeded) {
      return left(new AppError('INVALID_CHAT_ID', guardResult.message));
    }

    const createdAt = props.createdAt ? props.createdAt : new Date();

    return right(new Message({
      chatId: props.chatId,
      content: contentOrError.value,
      role: roleOrError.value,
      createdAt,
      promptId: props.promptId
    }, id));
  }
}

// Props interfaces
interface MessageProps {
  chatId: string;
  content: MessageContent;
  role: MessageRole;
  createdAt: Date;
  promptId?: string;
}

interface MessageCreateProps {
  chatId: string;
  content: string;
  role: string;
  createdAt?: Date;
  promptId?: string;
} */

// Esta implementação inclui:

// Value Objects para conteúdo e função da mensagem (MessageContent e MessageRole), encapsulando regras de validação específicas
// Validações robustas usando Guard pattern
// Either/Result pattern para tratamento elegante de erros
// Interfaces explícitas para as propriedades
// Factory method com validações completas

// Esta abordagem orientada a domínio vai facilitar a migração para microserviços no futuro, já que:

// Os objetos de valor encapsulam regras de negócio específicas
// As validações estão isoladas no domínio
// O código é mais modular e testável
// Há clara separação entre objetos de valor e entidades

// Quando você migrar para microserviços, poderá levar esses objetos de domínio consigo, mantendo a mesma lógica de negócios e validações.
