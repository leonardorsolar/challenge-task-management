# 🚀 Arquitetura TypeScript Escalável - Sem ORM/Decorators com PostgreSQL

## 📁 Estrutura Aprimorada para Alta Escalabilidade

```
project-root/
├── .env                              # Variáveis de ambiente
├── .env.example                      # Template das variáveis
├── .gitignore                        # Arquivos ignorados
├── .eslintrc.js                      # Configuração do ESLint
├── .prettierrc                       # Configuração do Prettier
├── jest.config.js                    # Configuração do Jest
├── tsconfig.json                     # Configuração do TypeScript
├── package.json                      # Dependências e scripts
├── docker-compose.yml               # Container orchestration
├── Dockerfile                       # Imagem Docker
├── README.md                        # Documentação
├── nodemon.json                     # Configuração do Nodemon
├── Makefile                         # Scripts de automação
│
├── migrations/                       # Migrations do banco
│   ├── 001_create_tables.sql
│   ├── 002_add_indexes.sql
│   └── migrate.ts
│
├── scripts/                          # Scripts utilitários
│   ├── build.sh
│   ├── start.sh
│   ├── test.sh
│   └── seed.ts
│
├── src/
│   ├── index.ts                     # Entrada da aplicação
│   ├── app.ts                       # Configuração do Express
│   ├── server.ts                    # Servidor HTTP
│   │
│   ├── config/
│   │   ├── index.ts                 # Configurações centralizadas
│   │   ├── database.ts              # Configuração do PostgreSQL
│   │   ├── redis.ts                 # Configuração do Redis
│   │   ├── logger.ts                # Configuração de logs
│   │   └── container.ts             # Container de dependências
│   │
│   ├── shared/
│   │   ├── core/
│   │   │   ├── AppError.ts          # ✅ Já existe - melhorar
│   │   │   ├── Either.ts            # ✅ Já existe
│   │   │   ├── Result.ts            # ✅ Já existe
│   │   │   ├── IUseCase.ts          # ✅ Já existe - melhorar
│   │   │   ├── BaseEntity.ts        # 🆕 Entidade base
│   │   │   ├── BaseRepository.ts    # 🆕 Repository base
│   │   │   ├── BaseController.ts    # 🆕 Controller base
│   │   │   ├── BaseUseCase.ts       # 🆕 UseCase base
│   │   │   ├── ValueObject.ts       # 🆕 Value Objects
│   │   │   ├── AggregateRoot.ts     # 🆕 Aggregate Root
│   │   │   ├── DomainEvent.ts       # 🆕 Domain Events
│   │   │   ├── EventBus.ts          # 🆕 Event Bus
│   │   │   └── Validator.ts         # 🆕 Sistema de validação
│   │   │
│   │   ├── utils/
│   │   │   ├── crypto.ts            # Funções de criptografia
│   │   │   ├── pagination.ts        # Utilidades de paginação
│   │   │   ├── date.ts              # Manipulação de datas
│   │   │   ├── string.ts            # Manipulação de strings
│   │   │   ├── logger.ts            # Logger personalizado
│   │   │   └── validators.ts        # Validadores customizados
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts   # Autenticação JWT
│   │   │   ├── cors.middleware.ts   # CORS personalizado
│   │   │   ├── rate-limit.middleware.ts # Rate limiting
│   │   │   ├── error.middleware.ts  # Tratamento global de erros
│   │   │   ├── validation.middleware.ts # Validação de schemas
│   │   │   ├── logging.middleware.ts # Logs de requisições
│   │   │   ├── security.middleware.ts # Segurança (Helmet)
│   │   │   └── transaction.middleware.ts # Transações DB
│   │   │
│   │   ├── types/
│   │   │   ├── express.d.ts         # Extensões do Express
│   │   │   ├── pagination.types.ts  # Tipos de paginação
│   │   │   ├── response.types.ts    # Tipos de resposta padronizados
│   │   │   ├── database.types.ts    # Tipos do banco
│   │   │   ├── auth.types.ts        # Tipos de autenticação
│   │   │   └── common.types.ts      # Tipos comuns
│   │   │
│   │   ├── constants/
│   │   │   ├── http-status.ts       # Status HTTP
│   │   │   ├── error-codes.ts       # Códigos de erro padronizados
│   │   │   ├── pagination.ts        # Constantes de paginação
│   │   │   ├── regex.ts             # Expressões regulares
│   │   │   └── database.ts          # Constantes do banco
│   │   │
│   │   └── infrastructure/
│   │       ├── database/
│   │       │   ├── index.ts
│   │       │   ├── IConnection.ts   # ✅ Já existe - melhorar
│   │       │   ├── PostgresConnection.ts # 🔄 Melhorar o existente
│   │       │   ├── QueryBuilder.ts  # 🆕 Query Builder personalizado
│   │       │   ├── Transaction.ts   # 🆕 Gerenciador de transações
│   │       │   └── migrations/
│   │       │       ├── MigrationRunner.ts
│   │       │       └── BaseMigration.ts
│   │       ├── cache/
│   │       │   ├── ICache.ts        # Interface de cache
│   │       │   ├── RedisCache.ts    # Implementação Redis
│   │       │   └── InMemoryCache.ts # Cache em memória
│   │       ├── queue/
│   │       │   ├── IQueue.ts        # Interface de filas
│   │       │   ├── RedisQueue.ts    # Filas com Redis
│   │       │   └── BullQueue.ts     # Bull.js implementation
│   │       ├── external/
│   │       │   ├── IHttpClient.ts   # Interface HTTP client
│   │       │   ├── AxiosClient.ts   # Cliente HTTP
│   │       │   └── EmailService.ts  # Serviço de email
│   │       └── monitoring/
│   │           ├── IMetrics.ts      # Interface de métricas
│   │           ├── PrometheusMetrics.ts # Métricas Prometheus
│   │           └── HealthCheck.ts   # Health checks
│   │
│   ├── modules/
│   │   ├── auth/                    # 🆕 Módulo de autenticação
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── User.ts
│   │   │   │   ├── repositories/
│   │   │   │   │   └── IUserRepository.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── AuthService.ts
│   │   │   │   │   └── PasswordService.ts
│   │   │   │   └── value-objects/
│   │   │   │       ├── Email.ts
│   │   │   │       └── Password.ts
│   │   │   ├── application/
│   │   │   │   ├── usecases/
│   │   │   │   │   ├── LoginUseCase.ts
│   │   │   │   │   ├── RegisterUseCase.ts
│   │   │   │   │   └── RefreshTokenUseCase.ts
│   │   │   │   └── dto/
│   │   │   │       ├── LoginRequest.ts
│   │   │   │       ├── LoginResponse.ts
│   │   │   │       └── RegisterRequest.ts
│   │   │   ├── infrastructure/
│   │   │   │   └── repositories/
│   │   │   │       └── UserRepository.ts
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── AuthController.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── auth.routes.ts
│   │   │   │   └── schemas/
│   │   │   │       ├── LoginSchema.ts
│   │   │   │       └── RegisterSchema.ts
│   │   │   └── container.ts
│   │   │
│   │   └── task/                    # ✅ Já existe - melhorar
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   │   └── Task.ts      # 🔄 Melhorar existente
│   │       │   ├── repositories/
│   │       │   │   └── ITaskRepository.ts # 🔄 Melhorar existente
│   │       │   ├── services/
│   │       │   │   ├── TaskValidationService.ts
│   │       │   │   └── TaskNotificationService.ts
│   │       │   ├── value-objects/
│   │       │   │   ├── TaskStatus.ts
│   │       │   │   ├── TaskPriority.ts
│   │       │   │   └── TaskId.ts
│   │       │   └── events/
│   │       │       ├── TaskCreatedEvent.ts
│   │       │       ├── TaskUpdatedEvent.ts
│   │       │       └── TaskDeletedEvent.ts
│   │       ├── application/
│   │       │   ├── usecases/
│   │       │   │   ├── CreateTaskUseCase.ts # 🔄 Melhorar existente
│   │       │   │   ├── UpdateTaskUseCase.ts # 🔄 Melhorar existente
│   │       │   │   ├── DeleteTaskUseCase.ts # 🔄 Melhorar existente
│   │       │   │   ├── ListTasksUseCase.ts  # 🔄 Melhorar existente
│   │       │   │   ├── GetTaskUseCase.ts    # 🆕 Buscar por ID
│   │       │   │   └── BulkUpdateTasksUseCase.ts # 🆕 Operações em lote
│   │       │   ├── dto/
│   │       │   │   ├── CreateTaskRequest.ts
│   │       │   │   ├── UpdateTaskRequest.ts
│   │       │   │   ├── TaskResponse.ts
│   │       │   │   └── TaskListResponse.ts
│   │       │   └── handlers/
│   │       │       ├── TaskCreatedHandler.ts
│   │       │       └── TaskUpdatedHandler.ts
│   │       ├── infrastructure/
│   │       │   ├── repositories/
│   │       │   │   └── TaskRepository.ts # 🔄 Melhorar existente
│   │       │   └── external/
│   │       │       ├── TaskNotificationClient.ts
│   │       │       └── TaskAnalyticsClient.ts
│   │       ├── presentation/
│   │       │   ├── controllers/
│   │       │   │   ├── TaskController.ts # 🔄 Unificar controllers
│   │       │   │   └── TaskBulkController.ts # 🆕 Operações em lote
│   │       │   ├── routes/
│   │       │   │   └── task.routes.ts # 🔄 Melhorar existente
│   │       │   ├── schemas/
│   │       │   │   ├── CreateTaskSchema.ts
│   │       │   │   ├── UpdateTaskSchema.ts
│   │       │   │   └── TaskQuerySchema.ts
│   │       │   └── validators/
│   │       │       └── TaskValidator.ts
│   │       ├── test/
│   │       │   ├── unit/             # ✅ Já existe - expandir
│   │       │   ├── integration/      # ✅ Já existe - expandir
│   │       │   ├── e2e/              # 🆕 Testes end-to-end
│   │       │   └── fixtures/         # 🆕 Dados de teste
│   │       └── container.ts          # 🆕 Container do módulo
│   │
│   └── container.ts                  # 🆕 Container principal
│
├── tests/                            # 🆕 Testes globais
│   ├── setup.ts                     # Configuração global
│   ├── helpers/                     # Helpers de teste
│   └── mocks/                       # Mocks compartilhados
│
└── docs/                            # 🆕 Documentação
    ├── api/                         # Documentação da API
    ├── architecture/                # Documentação da arquitetura
    └── deployment/                  # Guias de deploy
```

## 🔧 Implementações Melhoradas

### 1. **Sistema de Configuração Centralizado**

```typescript
// src/config/index.ts
interface Config {
  app: {
    name: string;
    version: string;
    port: number;
    env: "development" | "production" | "test";
    logLevel: "debug" | "info" | "warn" | "error";
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
    ssl: boolean;
    maxConnections: number;
    idleTimeout: number;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
    db: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  monitoring: {
    enableMetrics: boolean;
    enableHealthChecks: boolean;
    sentryDsn?: string;
  };
}

class ConfigManager {
  private static instance: Config;

  static get(): Config {
    if (!ConfigManager.instance) {
      ConfigManager.instance = {
        app: {
          name: process.env.APP_NAME || "Scalable API",
          version: process.env.APP_VERSION || "1.0.0",
          port: parseInt(process.env.PORT || "3000"),
          env: (process.env.NODE_ENV as any) || "development",
          logLevel: (process.env.LOG_LEVEL as any) || "info",
        },
        database: {
          host: process.env.DB_HOST || "localhost",
          port: parseInt(process.env.DB_PORT || "5432"),
          name: process.env.DB_NAME || "app_db",
          username: process.env.DB_USERNAME || "postgres",
          password: process.env.DB_PASSWORD || "password",
          ssl: process.env.DB_SSL === "true",
          maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || "20"),
          idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || "10000"),
        },
        redis: {
          host: process.env.REDIS_HOST || "localhost",
          port: parseInt(process.env.REDIS_PORT || "6379"),
          password: process.env.REDIS_PASSWORD,
          db: parseInt(process.env.REDIS_DB || "0"),
        },
        jwt: {
          secret: process.env.JWT_SECRET || "your-secret-key",
          expiresIn: process.env.JWT_EXPIRES_IN || "1h",
          refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
          refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        },
        monitoring: {
          enableMetrics: process.env.ENABLE_METRICS === "true",
          enableHealthChecks: process.env.ENABLE_HEALTH_CHECKS === "true",
          sentryDsn: process.env.SENTRY_DSN,
        },
      };
    }
    return ConfigManager.instance;
  }
}

export const config = ConfigManager.get();
```

### 2. **Connection PostgreSQL Aprimorada**

```typescript
// src/shared/infrastructure/database/PostgresConnection.ts
import { Pool, PoolClient } from "pg";
import { config } from "../../../config";
import { logger } from "../../utils/logger";
import IConnection from "./IConnection";

export class PostgresConnection implements IConnection {
  private pool: Pool;
  private static instance: PostgresConnection;

  private constructor() {
    this.pool = new Pool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.username,
      password: config.database.password,
      ssl: config.database.ssl,
      max: config.database.maxConnections,
      idleTimeoutMillis: config.database.idleTimeout,
      connectionTimeoutMillis: 2000,
    });

    this.setupEventListeners();
  }

  static getInstance(): PostgresConnection {
    if (!PostgresConnection.instance) {
      PostgresConnection.instance = new PostgresConnection();
    }
    return PostgresConnection.instance;
  }

  private setupEventListeners(): void {
    this.pool.on("connect", () => {
      logger.debug("Connected to PostgreSQL database");
    });

    this.pool.on("error", (err) => {
      logger.error("Unexpected error on idle client", err);
    });
  }

  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const start = Date.now();
    let client: PoolClient | undefined;

    try {
      client = await this.pool.connect();
      const result = await client.query(text, params);

      const duration = Date.now() - start;
      logger.debug("Executed query", {
        text: text.substring(0, 100),
        duration,
        rows: result.rowCount,
      });

      return result.rows;
    } catch (error) {
      logger.error("Database query error", { text, params, error });
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async insert<T = any>(text: string, params?: any[]): Promise<T> {
    const result = await this.query<T>(text + " RETURNING *", params);
    return result[0];
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");
      const result = await callback(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
    logger.info("Database connection closed");
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.query("SELECT 1");
      return true;
    } catch {
      return false;
    }
  }
}
```

### 3. **Query Builder Personalizado**

```typescript
// src/shared/infrastructure/database/QueryBuilder.ts
export class QueryBuilder {
  private selectFields: string[] = ["*"];
  private fromTable: string = "";
  private joinClauses: string[] = [];
  private whereConditions: string[] = [];
  private orderByClauses: string[] = [];
  private limitValue?: number;
  private offsetValue?: number;
  private params: any[] = [];
  private paramCounter: number = 1;

  select(fields: string | string[]): QueryBuilder {
    this.selectFields = Array.isArray(fields) ? fields : [fields];
    return this;
  }

  from(table: string): QueryBuilder {
    this.fromTable = table;
    return this;
  }

  where(condition: string, value?: any): QueryBuilder {
    if (value !== undefined) {
      this.whereConditions.push(condition.replace("?", `$${this.paramCounter}`));
      this.params.push(value);
      this.paramCounter++;
    } else {
      this.whereConditions.push(condition);
    }
    return this;
  }

  whereIn(field: string, values: any[]): QueryBuilder {
    if (values.length === 0) return this;

    const placeholders = values.map(() => `$${this.paramCounter++}`).join(", ");
    this.whereConditions.push(`${field} IN (${placeholders})`);
    this.params.push(...values);
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): QueryBuilder {
    this.orderByClauses.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitValue = count;
    return this;
  }

  offset(count: number): QueryBuilder {
    this.offsetValue = count;
    return this;
  }

  build(): { query: string; params: any[] } {
    let query = `SELECT ${this.selectFields.join(", ")} FROM ${this.fromTable}`;

    if (this.joinClauses.length > 0) {
      query += " " + this.joinClauses.join(" ");
    }

    if (this.whereConditions.length > 0) {
      query += " WHERE " + this.whereConditions.join(" AND ");
    }

    if (this.orderByClauses.length > 0) {
      query += " ORDER BY " + this.orderByClauses.join(", ");
    }

    if (this.limitValue) {
      query += ` LIMIT ${this.limitValue}`;
    }

    if (this.offsetValue) {
      query += ` OFFSET ${this.offsetValue}`;
    }

    return { query, params: this.params };
  }

  // Métodos estáticos para operações comuns
  static insert(table: string, data: Record<string, any>): { query: string; params: any[] } {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    return {
      query: `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      params: values,
    };
  }

  static update(
    table: string,
    data: Record<string, any>,
    whereClause: string,
    whereParams: any[]
  ): { query: string; params: any[] } {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
    const whereParamsStartIndex = values.length + 1;
    const adjustedWhereClause = whereClause.replace(/\$(\d+)/g, (match, num) => {
      return `$${parseInt(num) + values.length}`;
    });

    return {
      query: `UPDATE ${table} SET ${setClause} WHERE ${adjustedWhereClause} RETURNING *`,
      params: [...values, ...whereParams],
    };
  }

  static delete(table: string, whereClause: string, whereParams: any[]): { query: string; params: any[] } {
    return {
      query: `DELETE FROM ${table} WHERE ${whereClause}`,
      params: whereParams,
    };
  }
}
```

### 4. **Repository Base Genérico**

```typescript
// src/shared/core/BaseRepository.ts
import { QueryBuilder } from "../infrastructure/database/QueryBuilder";
import IConnection from "../infrastructure/database/IConnection";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export abstract class BaseRepository<T> {
  protected connection: IConnection;
  protected tableName: string;

  constructor(connection: IConnection, tableName: string) {
    this.connection = connection;
    this.tableName = tableName;
  }

  async findById(id: string): Promise<T | null> {
    const { query, params } = new QueryBuilder().select("*").from(this.tableName).where("id = ?", id).build();

    const result = await this.connection.query(query, params);

    if (result.length === 0) {
      return null;
    }

    return this.mapToEntity(result[0]);
  }

  async findAll(options?: PaginationOptions): Promise<PaginationResult<T>> {
    let queryBuilder = new QueryBuilder().select("*").from(this.tableName).orderBy("created_at", "DESC");

    if (options) {
      queryBuilder = queryBuilder.limit(options.limit).offset((options.page - 1) * options.limit);
    }

    const { query, params } = queryBuilder.build();

    // Execute query para dados
    const result = await this.connection.query(query, params);
    const data = result.map((row) => this.mapToEntity(row));

    // Execute query para total de registros (se paginação for usada)
    let total = data.length;
    if (options) {
      const countResult = await this.connection.query(`SELECT COUNT(*) as total FROM ${this.tableName}`, []);
      total = parseInt(countResult[0].total);
    }

    return {
      data,
      pagination: options
        ? {
            page: options.page,
            limit: options.limit,
            total,
            totalPages: Math.ceil(total / options.limit),
            hasNext: options.page * options.limit < total,
            hasPrev: options.page > 1,
          }
        : {
            page: 1,
            limit: data.length,
            total,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          },
    };
  }

  async create(entity: T): Promise<T> {
    const data = this.mapToData(entity);
    const { query, params } = QueryBuilder.insert(this.tableName, data);

    const result = await this.connection.query(query, params);
    return this.mapToEntity(result[0]);
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    const data = this.mapToData(entity);
    const { query, params } = QueryBuilder.update(this.tableName, data, "id = $1", [id]);

    const result = await this.connection.query(query, params);

    if (result.length === 0) {
      return null;
    }

    return this.mapToEntity(result[0]);
  }

  async delete(id: string): Promise<boolean> {
    const { query, params } = QueryBuilder.delete(this.tableName, "id = $1", [id]);

    const result = await this.connection.query(query, params);
    return result.length > 0;
  }

  async exists(id: string): Promise<boolean> {
    const { query, params } = new QueryBuilder().select("1").from(this.tableName).where("id = ?", id).limit(1).build();

    const result = await this.connection.query(query, params);
    return result.length > 0;
  }

  protected abstract mapToEntity(row: any): T;
  protected abstract mapToData(entity: T | Partial<T>): Record<string, any>;
}
```

### 5. **Sistema de Validação Robusto**

```typescript
// src/shared/core/Validator.ts
export interface ValidationRule<T = any> {
  field: string;
  message: string;
  validate: (value: T, data?: any) => boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export class Validator {
  private rules: ValidationRule[] = [];

  static create(): Validator {
    return new Validator();
  }

  required(field: string, message?: string): Validator {
    this.rules.push({
      field,
      message: message || `${field} is required`,
      validate: (value) => value !== null && value !== undefined && value !== "",
    });
    return this;
  }

  email(field: string, message?: string): Validator {
    this.rules.push({
      field,
      message: message || `${field} must be a valid email`,
      validate: (value) => {
        if (!value) return true; // só valida se tiver valor
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
    });
    return this;
  }

  minLength(field: string, min: number, message?: string): Validator {
    this.rules.push({
      field,
      message: message || `${field} must be at least ${min} characters long`,
      validate: (value) => {
        if (!value) return true;
        return value.length >= min;
      },
    });
    return this;
  }

  maxLength(field: string, max: number, message?: string): Validator {
    this.rules.push({
      field,
      message: message || `${field} must not exceed ${max} characters`,
      validate: (value) => {
        if (!value) return true;
        return value.length <= max;
      },
    });
    return this;
  }

  oneOf(field: string, allowedValues: any[], message?: string): Validator {
    this.rules.push({
      field,
      message: message || `${field} must be one of: ${allowedValues.join(", ")}`,
      validate: (value) => {
        if (!value) return true;
        return allowedValues.includes(value);
      },
    });
    return this;
  }

  uuid(field: string, message?: string): Validator {
    this.rules.push({
      field,
      message: message || `${field} must be a valid UUID`,
      validate: (value) => {
        if (!value) return true;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(value);
      },
    });
    return this;
  }

  custom(field: string, validate: (value: any, data?: any) => boolean, message: string): Validator {
    this.rules.push({
      field,
      message,
      validate,
    });
    return this;
  }

  validate(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const rule of this.rules) {
      const value = this.getFieldValue(data, rule.field);

      if (!rule.validate(value, data)) {
        errors.push({
          field: rule.field,
          message: rule.message,
          value,
        });
      }
    }

    return errors;
  }

  validateAndThrow(data: any): void {
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new ValidationException(errors);
    }
  }

  private getFieldValue(data: any, field: string): any {
    return field.split(".").reduce((obj, key) => obj?.[key], data);
  }
}

export class ValidationException extends Error {
  constructor(public errors: ValidationError[]) {
    super("Validation failed");
    this.name = "ValidationException";
  }

  getFirstError(): ValidationError | null {
    return this.errors[0] || null;
  }

  getErrorsForField(field: string): ValidationError[] {
    return this.errors.filter((error) => error.field === field);
  }

  toJSON() {
    return {
      message: this.message,
      errors: this.errors,
    };
  }
}
```

### 6. **Sistema de Eventos Aprimorado**

```typescript
// src/shared/core/DomainEvent.ts
export interface DomainEvent {
  readonly eventId: string;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly eventData: any;
  readonly occurredAt: Date;
  readonly version: number;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventType: string;
  public readonly aggregateId: string;
  public readonly occurredAt: Date;
  public readonly version: number;

  constructor(aggregateId: string, eventData: any, version: number = 1) {
    this.eventId = this.generateEventId();
    this.eventType = this.constructor.name;
    this.aggregateId = aggregateId;
    this.eventData = eventData;
    this.occurredAt = new Date();
    this.version = version;
  }

  private generateEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  abstract eventData: any;
}

// src/shared/core/EventBus.ts
export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}

export class EventBus {
  private handlers = new Map<string, EventHandler<any>[]>();
  private static instance: EventBus;

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  subscribe<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventType) || [];

    const promises = handlers.map((handler) =>
      handler.handle(event).catch((error) => {
        console.error(`Error handling event ${event.eventType}:`, error);
      })
    );

    await Promise.all(promises);
  }

  async publishAll(events: DomainEvent[]): Promise<void> {
    const promises = events.map((event) => this.publish(event));
    await Promise.all(promises);
  }
}
```

### 7. **Entidade Task Aprimorada**

```typescript
// src/modules/task/domain/entities/Task.ts
import { BaseEntity } from "../../../../shared/core/BaseEntity";
import { Either, left, right } from "../../../../shared/core/Either";
import { Result } from "../../../../shared/core/Result";
import { TaskStatus } from "../value-objects/TaskStatus";
import { TaskPriority } from "../value-objects/TaskPriority";
import { TaskId } from "../value-objects/TaskId";
import { TaskCreatedEvent } from "../events/TaskCreatedEvent";
import { TaskUpdatedEvent } from "../events/TaskUpdatedEvent";

export interface TaskProps {
  id?: TaskId;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task extends BaseEntity {
  private constructor(private props: TaskProps) {
    super(props.id?.value, props.createdAt, props.updatedAt);
  }

  static create(
    title: string,
    description: string | undefined,
    status: string,
    priority: string,
    dueDate: Date | undefined,
    userId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): Either<Error, Result<Task>> {
    // Validações
    if (!title || title.trim().length === 0) {
      return left(new Error("Task title is required"));
    }

    if (title.length > 255) {
      return left(new Error("Task title must not exceed 255 characters"));
    }

    if (!userId || userId.trim().length === 0) {
      return left(new Error("User ID is required"));
    }

    // Criação dos Value Objects
    const taskIdResult = id ? TaskId.create(id) : TaskId.generate();
    if (taskIdResult.isLeft()) {
      return left(taskIdResult.value);
    }

    const taskStatusResult = TaskStatus.create(status);
    if (taskStatusResult.isLeft()) {
      return left(taskStatusResult.value);
    }

    const taskPriorityResult = TaskPriority.create(priority);
    if (taskPriorityResult.isLeft()) {
      return left(taskPriorityResult.value);
    }

    // Validação de data
    if (dueDate && dueDate < new Date()) {
      return left(new Error("Due date cannot be in the past"));
    }

    const task = new Task({
      id: taskIdResult.value,
      title: title.trim(),
      description: description?.trim(),
      status: taskStatusResult.value,
      priority: taskPriorityResult.value,
      dueDate,
      userId: userId.trim(),
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });

    // Se é uma nova task (sem id fornecido), adiciona evento
    if (!id) {
      task.addDomainEvent(
        new TaskCreatedEvent(task.id, {
          title: task.title,
          status: task.status.value,
          priority: task.priority.value,
          userId: task.userId,
        })
      );
    }

    return right(Result.ok(task));
  }

  // Getters
  get id(): string {
    return this.props.id!.value;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get priority(): TaskPriority {
    return this.props.priority;
  }

  get dueDate(): Date | undefined {
    return this.props.dueDate;
  }

  get userId(): string {
    return this.props.userId;
  }

  get created_at(): Date {
    return this.props.createdAt!;
  }

  get updated_at(): Date {
    return this.props.updatedAt!;
  }

  // Métodos de negócio
  updateTitle(newTitle: string): Either<Error, void> {
    if (!newTitle || newTitle.trim().length === 0) {
      return left(new Error("Task title is required"));
    }

    if (newTitle.length > 255) {
      return left(new Error("Task title must not exceed 255 characters"));
    }

    const oldTitle = this.props.title;
    this.props.title = newTitle.trim();
    this.updateTimestamp();

    this.addDomainEvent(new TaskUpdatedEvent(this.id, { field: "title", oldValue: oldTitle, newValue: newTitle }));

    return right(undefined);
  }

  updateStatus(newStatus: string): Either<Error, void> {
    const statusResult = TaskStatus.create(newStatus);
    if (statusResult.isLeft()) {
      return left(statusResult.value);
    }

    const oldStatus = this.props.status.value;
    this.props.status = statusResult.value;
    this.updateTimestamp();

    this.addDomainEvent(new TaskUpdatedEvent(this.id, { field: "status", oldValue: oldStatus, newValue: newStatus }));

    return right(undefined);
  }

  updatePriority(newPriority: string): Either<Error, void> {
    const priorityResult = TaskPriority.create(newPriority);
    if (priorityResult.isLeft()) {
      return left(priorityResult.value);
    }

    const oldPriority = this.props.priority.value;
    this.props.priority = priorityResult.value;
    this.updateTimestamp();

    this.addDomainEvent(
      new TaskUpdatedEvent(this.id, { field: "priority", oldValue: oldPriority, newValue: newPriority })
    );

    return right(undefined);
  }

  updateDescription(newDescription?: string): Either<Error, void> {
    const oldDescription = this.props.description;
    this.props.description = newDescription?.trim();
    this.updateTimestamp();

    this.addDomainEvent(
      new TaskUpdatedEvent(this.id, { field: "description", oldValue: oldDescription, newValue: newDescription })
    );

    return right(undefined);
  }

  updateDueDate(newDueDate?: Date): Either<Error, void> {
    if (newDueDate && newDueDate < new Date()) {
      return left(new Error("Due date cannot be in the past"));
    }

    const oldDueDate = this.props.dueDate;
    this.props.dueDate = newDueDate;
    this.updateTimestamp();

    this.addDomainEvent(
      new TaskUpdatedEvent(this.id, { field: "dueDate", oldValue: oldDueDate, newValue: newDueDate })
    );

    return right(undefined);
  }

  markAsCompleted(): Either<Error, void> {
    return this.updateStatus("completed");
  }

  markAsInProgress(): Either<Error, void> {
    return this.updateStatus("in_progress");
  }

  markAsPending(): Either<Error, void> {
    return this.updateStatus("pending");
  }

  isOverdue(): boolean {
    return this.dueDate ? this.dueDate < new Date() : false;
  }

  isCompleted(): boolean {
    return this.status.value === "completed";
  }

  canBeDeleted(): boolean {
    // Regra de negócio: só pode deletar se não estiver em progresso
    return this.status.value !== "in_progress";
  }

  private updateTimestamp(): void {
    this.props.updatedAt = new Date();
  }
}
```

### 8. **Value Objects**

```typescript
// src/modules/task/domain/value-objects/TaskStatus.ts
import { Either, left, right } from "../../../../shared/core/Either";

export class TaskStatus {
  private static readonly VALID_STATUSES = ["pending", "in_progress", "completed"] as const;

  private constructor(private readonly _value: string) {}

  static create(status: string): Either<Error, TaskStatus> {
    if (!status || typeof status !== "string") {
      return left(new Error("Status is required"));
    }

    const normalizedStatus = status.toLowerCase().trim();

    if (!this.VALID_STATUSES.includes(normalizedStatus as any)) {
      return left(new Error(`Invalid status. Valid statuses are: ${this.VALID_STATUSES.join(", ")}`));
    }

    return right(new TaskStatus(normalizedStatus));
  }

  get value(): string {
    return this._value;
  }

  equals(other: TaskStatus): boolean {
    return this._value === other._value;
  }

  isPending(): boolean {
    return this._value === "pending";
  }

  isInProgress(): boolean {
    return this._value === "in_progress";
  }

  isCompleted(): boolean {
    return this._value === "completed";
  }
}

// src/modules/task/domain/value-objects/TaskPriority.ts
import { Either, left, right } from "../../../../shared/core/Either";

export class TaskPriority {
  private static readonly VALID_PRIORITIES = ["low", "medium", "high"] as const;

  private constructor(private readonly _value: string) {}

  static create(priority: string): Either<Error, TaskPriority> {
    if (!priority || typeof priority !== "string") {
      return left(new Error("Priority is required"));
    }

    const normalizedPriority = priority.toLowerCase().trim();

    if (!this.VALID_PRIORITIES.includes(normalizedPriority as any)) {
      return left(new Error(`Invalid priority. Valid priorities are: ${this.VALID_PRIORITIES.join(", ")}`));
    }

    return right(new TaskPriority(normalizedPriority));
  }

  get value(): string {
    return this._value;
  }

  equals(other: TaskPriority): boolean {
    return this._value === other._value;
  }

  getNumericValue(): number {
    switch (this._value) {
      case "low":
        return 1;
      case "medium":
        return 2;
      case "high":
        return 3;
      default:
        return 0;
    }
  }
}

// src/modules/task/domain/value-objects/TaskId.ts
import { Either, left, right } from "../../../../shared/core/Either";
import { v4 as uuidv4 } from "uuid";

export class TaskId {
  private constructor(private readonly _value: string) {}

  static create(id: string): Either<Error, TaskId> {
    if (!id || typeof id !== "string") {
      return left(new Error("Task ID is required"));
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return left(new Error("Task ID must be a valid UUID"));
    }

    return right(new TaskId(id));
  }

  static generate(): Either<Error, TaskId> {
    return right(new TaskId(uuidv4()));
  }

  get value(): string {
    return this._value;
  }

  equals(other: TaskId): boolean {
    return this._value === other._value;
  }
}
```

### 9. **Repository Melhorado**

```typescript
// src/modules/task/infrastructure/repositories/TaskRepository.ts
import { BaseRepository } from "../../../../shared/core/BaseRepository";
import { QueryBuilder } from "../../../../shared/infrastructure/database/QueryBuilder";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import IConnection from "../../../../shared/infrastructure/database/IConnection";

export class TaskRepository extends BaseRepository<Task> implements ITaskRepository {
  constructor(connection: IConnection) {
    super(connection, "tasks");
  }

  async findByUserId(
    userId: string,
    options?: { status?: string; priority?: string; page?: number; limit?: number }
  ): Promise<{ data: Task[]; total: number }> {
    let queryBuilder = new QueryBuilder()
      .select("*")
      .from(this.tableName)
      .where("user_id = ?", userId)
      .orderBy("created_at", "DESC");

    if (options?.status) {
      queryBuilder = queryBuilder.where("status = ?", options.status);
    }

    if (options?.priority) {
      queryBuilder = queryBuilder.where("priority = ?", options.priority);
    }

    if (options?.page && options?.limit) {
      queryBuilder = queryBuilder.limit(options.limit).offset((options.page - 1) * options.limit);
    }

    const { query, params } = queryBuilder.build();
    const result = await this.connection.query(query, params);

    // Count total
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM ${this.tableName} 
      WHERE user_id = $1
      ${options?.status ? "AND status = $2" : ""}
      ${options?.priority ? `AND priority = ${options?.status ? "3" : "2"}` : ""}
    `;

    const countParams = [userId];
    if (options?.status) countParams.push(options.status);
    if (options?.priority) countParams.push(options.priority);

    const countResult = await this.connection.query(countQuery, countParams);
    const total = parseInt(countResult[0].total);

    return {
      data: result.map((row) => this.mapToEntity(row)),
      total,
    };
  }

  async findByTitleAndUserId(title: string, userId: string): Promise<Task | null> {
    const { query, params } = new QueryBuilder()
      .select("*")
      .from(this.tableName)
      .where("title = ?", title)
      .where("user_id = ?", userId)
      .limit(1)
      .build();

    const result = await this.connection.query(query, params);

    if (result.length === 0) {
      return null;
    }

    return this.mapToEntity(result[0]);
  }

  async findOverdueTasks(): Promise<Task[]> {
    const { query, params } = new QueryBuilder()
      .select("*")
      .from(this.tableName)
      .where("due_date < NOW()")
      .where("status != ?", "completed")
      .orderBy("due_date", "ASC")
      .build();

    const result = await this.connection.query(query, params);
    return result.map((row) => this.mapToEntity(row));
  }

  async countByStatus(userId: string): Promise<Record<string, number>> {
    const query = `
      SELECT status, COUNT(*) as count
      FROM ${this.tableName}
      WHERE user_id = $1
      GROUP BY status
    `;

    const result = await this.connection.query(query, [userId]);

    const counts: Record<string, number> = {
      pending: 0,
      in_progress: 0,
      completed: 0,
    };

    result.forEach((row) => {
      counts[row.status] = parseInt(row.count);
    });

    return counts;
  }

  protected mapToEntity(row: any): Task {
    const taskResult = Task.create(
      row.title,
      row.description,
      row.status,
      row.priority,
      row.due_date ? new Date(row.due_date) : undefined,
      row.user_id,
      row.id,
      new Date(row.created_at),
      new Date(row.updated_at)
    );

    if (taskResult.isLeft()) {
      throw new Error(`Failed to map task entity: ${taskResult.value.message}`);
    }

    return taskResult.value.getValue();
  }

  protected mapToData(entity: Task | Partial<Task>): Record<string, any> {
    const data: Record<string, any> = {};

    if ("id" in entity && entity.id) {
      data.id = entity.id;
    }

    if ("title" in entity && entity.title) {
      data.title = entity.title;
    }

    if ("description" in entity) {
      data.description = entity.description;
    }

    if ("status" in entity && entity.status) {
      data.status = typeof entity.status === "string" ? entity.status : entity.status.value;
    }

    if ("priority" in entity && entity.priority) {
      data.priority = typeof entity.priority === "string" ? entity.priority : entity.priority.value;
    }

    if ("dueDate" in entity) {
      data.due_date = entity.dueDate;
    }

    if ("userId" in entity && entity.userId) {
      data.user_id = entity.userId;
    }

    if ("created_at" in entity && entity.created_at) {
      data.created_at = entity.created_at;
    }

    if ("updated_at" in entity && entity.updated_at) {
      data.updated_at = entity.updated_at;
    }

    return data;
  }
}
```

### 10. **UseCase Melhorado**

```typescript
// src/modules/task/application/usecases/CreateTaskUseCase.ts
import { Either, left, right } from "../../../../shared/core/Either";
import { BaseUseCase } from "../../../../shared/core/BaseUseCase";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";
import { CreateTaskRequest } from "../dto/CreateTaskRequest";
import { TaskResponse } from "../dto/TaskResponse";
import { Validator } from "../../../../shared/core/Validator";
import { EventBus } from "../../../../shared/core/EventBus";

export class CreateTaskUseCase extends BaseUseCase<CreateTaskRequest, TaskResponse> {
  constructor(private taskRepository: ITaskRepository, private eventBus: EventBus) {
    super();
  }

  async execute(request: CreateTaskRequest): Promise<Either<Error, TaskResponse>> {
    try {
      // Validação de entrada
      const validationResult = this.validateRequest(request);
      if (validationResult.isLeft()) {
        return left(validationResult.value);
      }

      // Verificar se já existe uma task com o mesmo título para o usuário
      const existingTask = await this.taskRepository.findByTitleAndUserId(request.title, request.userId);

      if (existingTask) {
        return left(new Error(`Task with title "${request.title}" already exists for this user`));
      }

      // Criar a entidade Task
      const taskResult = Task.create(
        request.title,
        request.description,
        request.status,
        request.priority,
        request.dueDate,
        request.userId
      );

      if (taskResult.isLeft()) {
        return left(taskResult.value);
      }

      const task = taskResult.value.getValue();

      // Salvar no repositório
      const savedTask = await this.taskRepository.create(task);

      // Publicar eventos de domínio
      await this.eventBus.publishAll(task.getDomainEvents());
      task.clearDomainEvents();

      // Retornar resposta
      return right(TaskResponse.fromEntity(savedTask));
    } catch (error) {
      return left(error as Error);
    }
  }

  private validateRequest(request: CreateTaskRequest): Either<Error, void> {
    const validator = Validator.create()
      .required("title", "Title is required")
      .maxLength("title", 255, "Title must not exceed 255 characters")
      .required("status", "Status is required")
      .oneOf("status", ["pending", "in_progress", "completed"], "Invalid status")
      .required("priority", "Priority is required")
      .oneOf("priority", ["low", "medium", "high"], "Invalid priority")
      .required("userId", "User ID is required")
      .uuid("userId", "User ID must be a valid UUID");

    if (request.description) {
      validator.maxLength("description", 1000, "Description must not exceed 1000 characters");
    }

    try {
      validator.validateAndThrow(request);
      return right(undefined);
    } catch (error) {
      return left(error as Error);
    }
  }
}
```

### 11. **Controller Unificado**

```typescript
// src/modules/task/presentation/controllers/TaskController.ts
import { Request, Response } from "express";
import { BaseController } from "../../../../shared/core/BaseController";
import { CreateTaskUseCase } from "../../application/usecases/CreateTaskUseCase";
import { UpdateTaskUseCase } from "../../application/usecases/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "../../application/usecases/DeleteTaskUseCase";
import { ListTasksUseCase } from "../../application/usecases/ListTasksUseCase";
import { GetTaskUseCase } from "../../application/usecases/GetTaskUseCase";
import { CreateTaskRequest } from "../../application/dto/CreateTaskRequest";
import { UpdateTaskRequest } from "../../application/dto/UpdateTaskRequest";
import { HTTP_STATUS } from "../../../../shared/constants/http-status";

export class TaskController extends BaseController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private listTasksUseCase: ListTasksUseCase,
    private getTaskUseCase: GetTaskUseCase
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const request: CreateTaskRequest = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
        userId: req.user?.id || req.body.userId, // from auth middleware or body
      };

      const result = await this.createTaskUseCase.execute(request);

      if (result.isLeft()) {
        return this.badRequest(res, result.value.message);
      }

      return this.created(res, result.value);
    } catch (error) {
      return this.internalError(res, "Failed to create task");
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const result = await this.getTaskUseCase.execute({ id, userId });

      if (result.isLeft()) {
        return this.badRequest(res, result.value.message);
      }

      if (!result.value) {
        return this.notFound(res, "Task not found");
      }

      return this.ok(res, result.value);
    } catch (error) {
      return this.internalError(res, "Failed to get task");
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      const { status, priority, page = 1, limit = 10 } = req.query;

      const result = await this.listTasksUseCase.execute({
        userId,
        status: status as string,
        priority: priority as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });

      if (result.isLeft()) {
        return this.badRequest(res, result.value.message);
      }

      return this.ok(res, result.value);
    } catch (error) {
      return this.internalError(res, "Failed to list tasks");
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const request: UpdateTaskRequest = {
        id,
        userId,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
      };

      const result = await this.updateTaskUseCase.execute(request);

      if (result.isLeft()) {
        return this.badRequest(res, result.value.message);
      }

      return this.ok(res, result.value);
    } catch (error) {
      return this.internalError(res, "Failed to update task");
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const result = await this.deleteTaskUseCase.execute({ id, userId });

      if (result.isLeft()) {
        return this.badRequest(res, result.value.message);
      }

      return this.noContent(res);
    } catch (error) {
      return this.internalError(res, "Failed to delete task");
    }
  }
}
```

### 12. **Base Controller**

```typescript
// src/shared/core/BaseController.ts
import { Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";

export abstract class BaseController {
  protected ok<T>(res: Response, data?: T): Response {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data,
    });
  }

  protected created<T>(res: Response, data?: T): Response {
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data,
    });
  }

  protected noContent(res: Response): Response {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }

  protected badRequest(res: Response, message: string, errors?: any[]): Response {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message,
      errors,
    });
  }

  protected unauthorized(res: Response, message: string = "Unauthorized"): Response {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message,
    });
  }

  protected forbidden(res: Response, message: string = "Forbidden"): Response {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message,
    });
  }

  protected notFound(res: Response, message: string = "Not found"): Response {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message,
    });
  }

  protected conflict(res: Response, message: string): Response {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message,
    });
  }

  protected internalError(res: Response, message: string = "Internal server error"): Response {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
    });
  }

  protected unprocessableEntity(res: Response, message: string, errors?: any[]): Response {
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      success: false,
      message,
      errors,
    });
  }
}
```

### 13. **Routes Aprimoradas**

```typescript
// src/modules/task/presentation/routes/task.routes.ts
import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
import { validationMiddleware } from "../../../../shared/middleware/validation.middleware";
import { CreateTaskSchema } from "../schemas/CreateTaskSchema";
import { UpdateTaskSchema } from "../schemas/UpdateTaskSchema";
import { TaskQuerySchema } from "../schemas/TaskQuerySchema";
import { taskContainer } from "../../container";

const taskRouter = Router();

// Middleware de autenticação para todas as rotas
taskRouter.use(authMiddleware);

// Instância do controller (usando container)
const taskController = taskContainer.getTaskController();

// Rotas
taskRouter.post("/", validationMiddleware(CreateTaskSchema), (req, res) => taskController.create(req, res));

taskRouter.get("/", validationMiddleware(TaskQuerySchema, "query"), (req, res) => taskController.list(req, res));

taskRouter.get("/:id", (req, res) => taskController.getById(req, res));

taskRouter.put("/:id", validationMiddleware(UpdateTaskSchema), (req, res) => taskController.update(req, res));

taskRouter.delete("/:id", (req, res) => taskController.delete(req, res));

export default taskRouter;
```

### 14. **Container de Dependências**

```typescript
// src/modules/task/container.ts
import { PostgresConnection } from "../../shared/infrastructure/database/PostgresConnection";
import { TaskRepository } from "./infrastructure/repositories/TaskRepository";
import { CreateTaskUseCase } from "./application/usecases/CreateTaskUseCase";
import { UpdateTaskUseCase } from "./application/usecases/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "./application/usecases/DeleteTaskUseCase";
import { ListTasksUseCase } from "./application/usecases/ListTasksUseCase";
import { GetTaskUseCase } from "./application/usecases/GetTaskUseCase";
import { TaskController } from "./presentation/controllers/TaskController";
import { EventBus } from "../../shared/core/EventBus";

class TaskContainer {
  private static instance: TaskContainer;
  private connection: PostgresConnection;
  private eventBus: EventBus;
  private taskRepository: TaskRepository;

  private constructor() {
    this.connection = PostgresConnection.getInstance();
    this.eventBus = EventBus.getInstance();
    this.taskRepository = new TaskRepository(this.connection);
  }

  static getInstance(): TaskContainer {
    if (!TaskContainer.instance) {
      TaskContainer.instance = new TaskContainer();
    }
    return TaskContainer.instance;
  }

  getTaskController(): TaskController {
    const createTaskUseCase = new CreateTaskUseCase(this.taskRepository, this.eventBus);
    const updateTaskUseCase = new UpdateTaskUseCase(this.taskRepository, this.eventBus);
    const deleteTaskUseCase = new DeleteTaskUseCase(this.taskRepository, this.eventBus);
    const listTasksUseCase = new ListTasksUseCase(this.taskRepository);
    const getTaskUseCase = new GetTaskUseCase(this.taskRepository);

    return new TaskController(
      createTaskUseCase,
      updateTaskUseCase,
      deleteTaskUseCase,
      listTasksUseCase,
      getTaskUseCase
    );
  }

  getTaskRepository(): TaskRepository {
    return this.taskRepository;
  }
}

export const taskContainer = TaskContainer.getInstance();
```

### 15. **Schemas de Validação**

```typescript
// src/modules/task/presentation/schemas/CreateTaskSchema.ts
import Joi from "joi";

export const CreateTaskSchema = Joi.object({
  title: Joi.string().required().max(255).trim(),
  description: Joi.string().optional().max(1000).trim(),
  status: Joi.string().required().valid("pending", "in_progress", "completed"),
  priority: Joi.string().required().valid("low", "medium", "high"),
  dueDate: Joi.date().optional().greater("now"),
  userId: Joi.string().uuid().optional(), // opcional se vier do middleware de auth
});

// src/modules/task/presentation/schemas/UpdateTaskSchema.ts
export const UpdateTaskSchema = Joi.object({
  title: Joi.string().optional().max(255).trim(),
  description: Joi.string().optional().max(1000).trim().allow(""),
  status: Joi.string().optional().valid("pending", "in_progress", "completed"),
  priority: Joi.string().optional().valid("low", "medium", "high"),
  dueDate: Joi.date().optional().allow(null),
});

// src/modules/task/presentation/schemas/TaskQuerySchema.ts
export const TaskQuerySchema = Joi.object({
  status: Joi.string().optional().valid("pending", "in_progress", "completed"),
  priority: Joi.string().optional().valid("low", "medium", "high"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
```

### 16. **Middleware de Validação**

```typescript
// src/shared/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HTTP_STATUS } from "../constants/http-status";

export const validationMiddleware = (schema: Joi.ObjectSchema, property: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
        value: detail.context?.value,
      }));

      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Substitui os dados validados
    req[property] = value;
    next();
  };
};
```

### 17. **Middleware de Autenticação**

```typescript
// src/shared/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { HTTP_STATUS } from "../constants/http-status";

interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Access token is required",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Access token is required",
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
```

### 18. **Middleware de Tratamento de Erros**

```typescript
// src/shared/middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../core/Validator";
import { HTTP_STATUS } from "../constants/http-status";
import { logger } from "../utils/logger";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled error:", {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
  });

  if (error instanceof ValidationException) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: error.errors,
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Token expired",
    });
  }

  // Erro genérico
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};
```

### 19. **Logger Estruturado**

```typescript
// src/shared/utils/logger.ts
import winston from "winston";
import { config } from "../../config";

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  config.app.env === "production"
    ? winston.format.json()
    : winston.format.combine(winston.format.colorize(), winston.format.simple())
);

export const logger = winston.createLogger({
  level: config.app.logLevel,
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

export default logger;
```

### 20. **Scripts SQL**

```sql
-- migrations/001_create_tables.sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    due_date TIMESTAMP,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 21. **Package.json Otimizado**

```json
{
  "name": "scalable-typescript-api",
  "version": "1.0.0",
  "description": "Scalable TypeScript API with Clean Architecture",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src/**/*.ts",
    "migrate": "node dist/scripts/migrate.js",
    "seed": "node dist/scripts/seed.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "joi": "^17.11.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "winston": "^3.11.0",
    "uuid": "^9.0.1",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/pg": "^8.10.7",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/uuid": "^9.0.7",
    "@types/node": "^20.9.0",
    "@types/jest": "^29.5.8",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1",
    "typescript": "^5.2.2"
  }
}
```

### 22. **Makefile para Automação**

```makefile
.PHONY: install build start dev test lint format migrate seed docker-build docker-run

install:
	npm install

build:
	npm run build

start:
	npm start

dev:
	npm run dev

test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

lint:
	npm run lint

lint-fix:
	npm run lint:fix

format:
	npm run format

migrate:
	npm run migrate

seed:
	npm run seed

docker-build:
	docker-compose build

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down

clean:
	rm -rf dist node_modules

setup: install migrate seed

check: lint test

ci: install build test

deploy: build docker-build docker-run
```

## 🚀 Principais Melhorias Implementadas

### **1. Escalabilidade**

- **Modularização por domínio** facilita crescimento da equipe
- **Base classes genéricas** reduzem duplicação de código
- **Container de dependências** centraliza configuração
- **Query Builder personalizado** para consultas complexas

### **2. Qualidade**

- **Sistema de validação robusto** com Joi + validadores customizados
- **Tratamento de erros padronizado** em toda aplicação
- **Logging estruturado** para monitoramento
- **Testes organizados** por camadas

### **3. Manutenibilidade**

- **Value Objects** para regras de negócio
- **Domain Events** para comunicação entre módulos
- **Either/Result pattern** para tratamento de erros
- **Interfaces bem definidas** entre camadas

### **4. Performance**

- **Connection pooling** no PostgreSQL
- **Índices otimizados** no banco
- **Paginação nativa** em consultas
- **Transações explícitas** quando necessário

### **5. Produção Ready**

- **Docker** para containerização
- **Middleware de segurança** (Helmet, CORS, Rate Limiting)
- **Health checks** para monitoramento
- **Scripts automatizados** para deploy

Esta arquitetura fornece uma base sólida para aplicações enterprise que precisam escalar horizontalmente e ser mantidas por equipes maiores.
