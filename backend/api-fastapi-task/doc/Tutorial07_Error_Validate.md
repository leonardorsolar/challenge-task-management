# Tutorial: Melhorando Clean Architecture com Single Responsibility Principle (SRP)

## **O que você vai aprender**

Você aprenderá a separar responsabilidades, criar validações, tratar erros e organizar melhor o código.
Vamos transformar uma estrutura Clean Architecture básica em uma implementação robusta aplicando o **Single Responsibility Principle (SRP)**.

# Tutorial: Melhorando Clean Architecture com Single Responsibility Principle (SRP)

## **O que você vai aprender**

Neste tutorial, vamos transformar uma estrutura Clean Architecture básica em uma implementação robusta aplicando o **Single Responsibility Principle (SRP)**. Você aprenderá a separar responsabilidades, criar validações, tratar erros e organizar melhor o código.

---

## **O que é o Single Responsibility Principle (SRP)?**

O SRP diz que **cada classe deve ter apenas uma razão para mudar**. Em outras palavras:

-   Uma classe deve fazer apenas **uma coisa**
-   Se você precisa mudar uma funcionalidade, apenas **uma classe** deve ser alterada

**Exemplo prático**: Se você tem uma classe que valida dados E salva no banco, ela está violando o SRP. Deveria ter uma classe para validar e outra para salvar.

---

## **PASSO 1: Melhorando a Entidade Task (Domínio Puro)**

### **Problema Atual**

```python
class Task:
    def __init__(self, title: str, description: str):
        self.title = title
        self.description = description
```

**Problemas identificados:**

-   ❌ Não valida os dados de entrada
-   ❌ Não tem identificador único
-   ❌ Não controla quando foi criada

### **Solução com SRP (Domínio Puro - Sem Tecnologia)**

**`domain/entities/task.py`**

```python
class Task:
    """
    Entidade Task - Responsabilidade: Representar uma tarefa do domínio
    SRP: Esta classe só cuida de manter os dados de uma tarefa
    DOMÍNIO 100% PURO: Não usa nenhum decorator ou tecnologia específica do Python
    """

    def __init__(self, title, description, task_id=None, created_at=None):
        # Validações básicas de domínio
        self._validate_title(title)
        self._validate_description(description)

        self._title = title.strip()
        self._description = description.strip()
        self._id = task_id
        self._created_at = created_at

    def _validate_title(self, title):
        """Valida o título da tarefa"""
        if not title or not str(title).strip():
            raise ValueError("Title cannot be empty")
        if len(str(title).strip()) > 100:
            raise ValueError("Title too long (max 100 characters)")

    def _validate_description(self, description):
        """Valida a descrição da tarefa"""
        if not description or not str(description).strip():
            raise ValueError("Description cannot be empty")
        if len(str(description).strip()) > 500:
            raise ValueError("Description too long (max 500 characters)")

    # Getters (métodos simples sem decorators)
    def get_title(self):
        """Retorna o título da tarefa"""
        return self._title

    def get_description(self):
        """Retorna a descrição da tarefa"""
        return self._description

    def get_id(self):
        """Retorna o ID da tarefa"""
        return self._id

    def get_created_at(self):
        """Retorna a data de criação da tarefa"""
        return self._created_at

    # Métodos para definir ID e data (usados pela infraestrutura)
    def set_id(self, task_id):
        """Define o ID da tarefa (usado pelo repositório)"""
        if self._id is not None:
            raise ValueError("Task ID cannot be changed once set")
        self._id = task_id

    def set_created_at(self, created_at):
        """Define a data de criação (usado pelo repositório)"""
        if self._created_at is not None:
            raise ValueError("Created date cannot be changed once set")
        self._created_at = created_at

    def to_dict(self):
        """Converte a entidade para dicionário (para serialização)"""
        return {
            "id": self._id,
            "title": self._title,
            "description": self._description,
            "created_at": self._created_at
        }

    def equals(self, other):
        """Compara duas tarefas pela identidade (ID)"""
        if not hasattr(other, '_id') or not hasattr(other, '__class__'):
            return False
        if other.__class__.__name__ != 'Task':
            return False
        return self._id == other._id and self._id is not None

    def to_string(self):
        """Representação em string da tarefa (sem usar __repr__)"""
        return f"Task(id={self._id}, title='{self._title}', description='{self._description}')"
```

**`domain/validators/task_validator.py` (NOVA CLASSE)**

```python
class TaskValidator:
    """
    Responsabilidade: Validar dados de entrada para criação de tarefas
    SRP: Só cuida de validação, não sabe nada sobre persistência ou apresentação
    DOMÍNIO 100% PURO: Não usa decorators, type hints ou bibliotecas externas
    """

    def validate_creation_data(self, data):
        """Valida dados para criação de tarefa e retorna lista de erros"""
        errors = []

        # Validar se data é um dicionário
        if not isinstance(data, dict):
            errors.append("Invalid data format")
            return errors

        # Validar título
        title = data.get("title")
        if not title:
            errors.append("Title is required")
        elif not isinstance(title, str):
            errors.append("Title must be a string")
        elif len(str(title).strip()) == 0:
            errors.append("Title cannot be empty")
        elif len(str(title).strip()) > 100:
            errors.append("Title too long (max 100 characters)")

        # Validar descrição
        description = data.get("description")
        if not description:
            errors.append("Description is required")
        elif not isinstance(description, str):
            errors.append("Description must be a string")
        elif len(str(description).strip()) == 0:
            errors.append("Description cannot be empty")
        elif len(str(description).strip()) > 500:
            errors.append("Description too long (max 500 characters)")

        return errors

    def validate_title_format(self, title):
        """Valida se o título tem formato válido"""
        if not isinstance(title, str):
            return False
        return len(str(title).strip()) > 0 and len(str(title).strip()) <= 100

    def validate_description_format(self, description):
        """Valida se a descrição tem formato válido"""
        if not isinstance(description, str):
            return False
        return len(str(description).strip()) > 0 and len(str(description).strip()) <= 500
```

**Explicação para Iniciantes:**

-   **Sem @staticmethod**: Métodos normais da classe, sem decorators
-   **Sem Type Hints**: Não usamos `-> List[str]` ou `Dict`, apenas Python puro
-   **Python Básico**: Apenas `dict`, `list`, `str`, `isinstance()`, `len()`
-   **Instanciação**: Agora precisamos criar uma instância: `validator = TaskValidator()`

---

## **PASSO 2: Melhorando o Use Case**

### **Problema Atual**

```python
def execute(self, data: dict) -> dict:
    print("[CreateTaskUseCase] Executando lógica...")
    task = Task(title=data["title"], description=data["description"])
    return self.repository.save(task)
```

**Problemas:**

-   ❌ Não valida dados de entrada
-   ❌ Não trata erros
-   ❌ Mistura lógica de negócio com print

### **Solução com SRP**

**`application/usecases/create_task_usecase.py`**

```python
from app.modules.task.domain.entities.task import Task
from app.modules.task.domain.validators.task_validator import TaskValidator
from app.modules.task.domain.repositories.task_repository_interface import TaskRepositoryInterface

class CreateTaskUseCase:
    """
    Responsabilidade: Orquestrar a criação de uma tarefa
    SRP: Só cuida da lógica de negócio para criar tarefas
    DOMÍNIO PURO: Não usa bibliotecas externas, apenas entidades e interfaces do domínio
    """

    def __init__(self, repository: TaskRepositoryInterface):
        self.repository = repository
        self.validator = TaskValidator()

    def execute(self, data: dict) -> dict:
        """Executa o caso de uso de criação de tarefa"""

        # 1. Validar dados de entrada usando validador do domínio
        validation_errors = self.validator.validate_creation_data(data)
        if validation_errors:
            return {
                "success": False,
                "errors": validation_errors,
                "data": None
            }

        try:
            # 2. Criar entidade do domínio
            task = Task(
                title=data["title"],
                description=data["description"]
            )

            # 3. Persistir através da interface do repositório
            saved_task_data = self.repository.save(task)

            # 4. Retornar resultado de sucesso
            return {
                "success": True,
                "errors": [],
                "data": saved_task_data
            }

        except ValueError as e:
            # 5. Tratar erros de domínio (validação da entidade)
            return {
                "success": False,
                "errors": [str(e)],
                "data": None
            }
        except Exception as e:
            # 6. Tratar erros inesperados
            return {
                "success": False,
                "errors": [f"Unexpected error: {str(e)}"],
                "data": None
            }
```

**Explicação para Iniciantes:**

-   **Domínio Puro**: Task e TaskValidator não dependem de nenhuma biblioteca externa
-   **Python Nativo**: Usamos apenas `dict`, `list`, `str` - tipos básicos do Python
-   **Use Case Limpo**: Só conhece interfaces e entidades do domínio
-   **Tecnologia na Infraestrutura**: `datetime` só aparece no repositório (camada de infraestrutura)
-   **Separação Clara**: Domínio ← Application ← Infrastructure ← Presentation

### **Por que isso é importante?**

1. **Testabilidade**: Posso testar o domínio sem nenhuma dependência externa
2. **Portabilidade**: O domínio funciona em qualquer linguagem/framework
3. **Manutenibilidade**: Se mudar de FastAPI para Django, só mudo a camada de apresentação
4. **Evolução**: Posso trocar `datetime` por outra biblioteca sem afetar o domínio

---

## **PASSO 3: Melhorando o Repositório**

### **Solução com SRP**

**`infrastructure/repositories/task_repository.py`**

```python
from app.modules.task.domain.entities.task import Task
from app.modules.task.domain.repositories.task_repository_interface import TaskRepositoryInterface

class TaskRepository(TaskRepositoryInterface):
    """
    Responsabilidade: Persistir tarefas no banco de dados
    SRP: Só cuida de operações de persistência
    INFRAESTRUTURA: Aqui podemos usar tecnologias específicas (datetime, banco, etc.)
    """

    def __init__(self):
        # Simulando um "banco de dados" em memória
        self._tasks = {}
        self._next_id = 1

    def save(self, task):
        """Salva uma tarefa e retorna os dados persistidos"""
        try:
            # Importar datetime aqui (tecnologia específica da infraestrutura)
            from datetime import datetime

            # Simular operação de salvamento
            task.set_id(self._next_id)
            task.set_created_at(datetime.now().isoformat())

            # "Salvar" no banco simulado
            self._tasks[task.get_id()] = task
            self._next_id += 1

            # Retornar dados salvos usando método da entidade
            return task.to_dict()

        except Exception as e:
            raise RuntimeError(f"Database error while saving task: {str(e)}")

    def find_by_id(self, task_id):
        """Busca uma tarefa por ID"""
        task = self._tasks.get(task_id)
        if not task:
            return None
        return task.to_dict()

    def find_all(self):
        """Retorna todas as tarefas"""
        return [task.to_dict() for task in self._tasks.values()]
```

---

## **PASSO 4: Criando Schemas de Validação**

### **Nova Responsabilidade: Validação de Entrada HTTP**

**`presentation/schemas/task_schemas.py` (NOVA CLASSE)**

```python
from pydantic import BaseModel, Field

class CreateTaskRequest(BaseModel):
    """
    Responsabilidade: Validar dados de entrada HTTP
    SRP: Só cuida de validação de dados da requisição
    """
    title: str = Field(..., min_length=1, max_length=100, description="Task title")
    description: str = Field(..., min_length=1, max_length=500, description="Task description")

class CreateTaskResponse(BaseModel):
    """
    Responsabilidade: Padronizar resposta HTTP
    SRP: Só cuida da estrutura de resposta
    """
    message: str
    success: bool
    data: dict = None
    errors: list = []
```

**Explicação para Iniciantes:**

-   **Pydantic**: Biblioteca para validação automática de dados
-   **Field**: Define validações como tamanho mínimo/máximo
-   Separamos **entrada** e **saída** em classes diferentes (SRP!)

---

## 🔧 **PASSO 5: Melhorando o Controller**

### **Solução com SRP**

**`presentation/controllers/create_task_controller.py`**

```python
from fastapi import HTTPException
from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase
from app.modules.task.presentation.schemas.task_schemas import CreateTaskRequest, CreateTaskResponse

class CreateTaskController:
    """
    Responsabilidade: Controlar fluxo HTTP para criação de tarefas
    SRP: Só cuida de receber requisição HTTP e retornar resposta HTTP
    """

    def __init__(self, usecase: CreateTaskUseCase):
        self.usecase = usecase

    def handle(self, request: CreateTaskRequest) -> CreateTaskResponse:
        """Processa requisição de criação de tarefa"""

        # Converter request para dict (dados de entrada do use case)
        data = request.dict()

        # Executar caso de uso
        result = self.usecase.execute(data)

        # Verificar se houve erro
        if not result["success"]:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Validation failed",
                    "errors": result["errors"]
                }
            )

        # Retornar resposta de sucesso
        return CreateTaskResponse(
            message="Task created successfully",
            success=True,
            data=result["data"],
            errors=[]
        )
```

**Explicação para Iniciantes:**

-   O Controller agora só cuida de **HTTP**: recebe request, chama use case, retorna response
-   **HTTPException**: Exceção específica do FastAPI para erros HTTP
-   **Separação clara**: Controller → Use Case → Repository

---

## **PASSO 6: Atualizando as Rotas e Container**

### **`presentation/routes/task_routes.py`**

```python
from fastapi import APIRouter
from app.modules.task.task_container import TaskContainer
from app.modules.task.presentation.schemas.task_schemas import CreateTaskRequest, CreateTaskResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=CreateTaskResponse)
def create_task(request: CreateTaskRequest) -> CreateTaskResponse:
    """
    Cria uma nova tarefa
    - **title**: Título da tarefa (máx 100 caracteres)
    - **description**: Descrição da tarefa (máx 500 caracteres)
    """
    controller = TaskContainer.create_task_controller()
    return controller.handle(request)
```

### **`task_container.py`**

```python
from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase
from app.modules.task.infrastructure.repositories.task_repository import TaskRepository
from app.modules.task.presentation.controllers.create_task_controller import CreateTaskController

class TaskContainer:
    """
    Responsabilidade: Criar e injetar dependências
    SRP: Só cuida de montar as dependências (Factory Pattern)
    """

    @staticmethod
    def create_task_controller() -> CreateTaskController:
        # Criar dependências na ordem correta
        repository = TaskRepository()
        usecase = CreateTaskUseCase(repository)
        controller = CreateTaskController(usecase)
        return controller
```

---

## **ESTRUTURA FINAL DE ARQUIVOS**

```
app/modules/task/
├── domain/
│   ├── entities/
│   │   └── task.py                    # Entidade robusta
│   ├── validators/
│   │   └── task_validator.py          # Validação de domínio
│   └── repositories/
│       └── task_repository_interface.py
├── application/
│   └── usecases/
│       └── create_task_usecase.py     # Use case melhorado
├── infrastructure/
│   └── repositories/
│       └── task_repository.py         # Repositório robusto
├── presentation/
│   ├── controllers/
│   │   └── create_task_controller.py  # Controller melhorado
│   ├── schemas/
│   │   └── task_schemas.py            # Validação HTTP
│   └── routes/
│       └── task_routes.py             # Rotas atualizadas
└── task_container.py                  # Container atualizado
```

---

## **Resumo das Melhorias Aplicadas**

### **Antes (Problemas)**

-   ❌ Entidade sem validação
-   ❌ Use case sem tratamento de erro
-   ❌ Sem separação de responsabilidades
-   ❌ Sem validação de entrada HTTP
-   ❌ **Domínio acoplado a tecnologias** (@dataclass, datetime, typing)

### **Depois (Com SRP + Domínio Puro)**

-   ✅ **Task**: Só representa dados do domínio (Python puro)
-   ✅ **TaskValidator**: Só valida regras de negócio (Python puro)
-   ✅ **CreateTaskUseCase**: Só orquestra criação de tarefas (Python puro)
-   ✅ **TaskRepository**: Só persiste dados (pode usar tecnologias)
-   ✅ **CreateTaskController**: Só controla fluxo HTTP (pode usar FastAPI)
-   ✅ **Schemas**: Só validam entrada/saída HTTP (pode usar Pydantic)
-   ✅ **TaskContainer**: Só injeta dependências (pode usar DI framework)
-   ✅ **Domínio 100% desacoplado** de qualquer tecnologia específica

### **Camadas e Tecnologias Permitidas**

| Camada             | Tecnologias Permitidas  | Exemplo                              |
| ------------------ | ----------------------- | ------------------------------------ |
| **Domain**         | ✅ Python puro          | `dict`, `list`, `str`, `int`         |
| **Application**    | ✅ Python puro + Domain | Só interfaces e entidades            |
| **Infrastructure** | ✅ Qualquer tecnologia  | `datetime`, `sqlalchemy`, `requests` |
| **Presentation**   | ✅ Qualquer framework   | `FastAPI`, `pydantic`, `flask`       |

---

## **Como Testar**

### **1. Requisição de Sucesso**

```bash
curl -X POST "http://localhost:8000/tasks/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Clean Architecture",
    "description": "Implementar exemplo prático"
  }'
```

**Resposta esperada:**

```json
{
    "message": "Task created successfully",
    "success": true,
    "data": {
        "id": 1,
        "title": "Estudar Clean Architecture",
        "description": "Implementar exemplo prático",
        "created_at": "2025-07-25T10:30:00.123456"
    },
    "errors": []
}
```

### **2. Requisição com Erro**

```bash
curl -X POST "http://localhost:8000/tasks/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "description": "Descrição sem título"
  }'
```

**Resposta esperada:**

```json
{
    "detail": {
        "message": "Validation failed",
        "errors": ["Title is required"]
    }
}
```

---

## **Conceitos Importantes**

1. **Single Responsibility Principle**: Cada classe tem uma única razão para existir
2. **Separation of Concerns**: Validação, persistência e apresentação são separadas
3. **Dependency Injection**: Use case não conhece implementação concreta
4. **Error Handling**: Tratamento padronizado de erros em cada camada
5. **Clean Architecture**: Dependências apontam sempre para dentro (domínio)
6. **🆕 Domain Purity**: Domínio livre de tecnologias específicas
7. **🆕 Technology Boundaries**: Tecnologias ficam nas bordas da aplicação

### **Princípios do Domínio Puro**

1. **Sem Imports Externos**: Domain não importa bibliotecas externas
2. **Tipos Nativos**: Usa apenas `dict`, `list`, `str`, `int`, `bool`
3. **Lógica de Negócio**: Contém apenas regras fundamentais do negócio
4. **Testabilidade Total**: Pode ser testado sem nenhuma dependência
5. **Portabilidade**: Funciona em qualquer linguagem/framework

### **Exemplo de Teste de Domínio 100% Puro**

```python
# Teste sem nenhuma dependência externa - nem decorators!
def test_task_creation():
    # Arrange
    title = "Test Task"
    description = "Test Description"

    # Act
    task = Task(title, description)

    # Assert
    assert task.get_title() == title
    assert task.get_description() == description
    assert task.get_id() is None  # Ainda não foi persistida

def test_task_validation_error():
    # Act & Assert
    try:
        Task("", "Valid description")
        assert False, "Should have raised ValueError"
    except ValueError as e:
        assert "Title cannot be empty" in str(e)

def test_task_equality():
    # Arrange
    task1 = Task("Title", "Desc")
    task2 = Task("Title", "Desc")
    task1.set_id(1)
    task2.set_id(1)

    # Act & Assert
    assert task1.equals(task2) == True

def test_validator_pure():
    # Arrange
    validator = TaskValidator()
    data = {"title": "Valid", "description": "Valid desc"}

    # Act
    errors = validator.validate_creation_data(data)

    # Assert
    assert errors == []
```

### **Comparação: Antes vs Depois**

| Aspecto            | ❌ Antes                     | ✅ Depois (100% Puro)     |
| ------------------ | ---------------------------- | ------------------------- |
| **Decorators**     | `@property`, `@staticmethod` | Métodos simples           |
| **Type Hints**     | `: str`, `-> dict`           | Sem type hints            |
| **Magic Methods**  | `__eq__`, `__repr__`         | `equals()`, `to_string()` |
| **Acesso a Dados** | `task.title`                 | `task.get_title()`        |
| **Validação**      | `@staticmethod`              | Métodos de instância      |
| **Dependências**   | Python features              | Apenas Python básico      |

---

## **Próximos Passos**

1. **Implementar outros Use Cases**: `UpdateTask`, `DeleteTask`, `ListTasks`
2. **Adicionar testes unitários** para cada camada
3. **Implementar banco de dados real** (PostgreSQL, MongoDB)
4. **Adicionar logging** estruturado
5. **Implementar autenticação** e autorização

**Parabéns! 🎉** Você implementou uma arquitetura limpa e robusta seguindo o SRP!

# Extra para leitura

# Com acoplemento de tecnlogia

---

## 🔧 **PASSO 1: Melhorando a Entidade Task**

### **Problema Atual**

```python
class Task:
    def __init__(self, title: str, description: str):
        self.title = title
        self.description = description
```

**Problemas identificados:**

-   ❌ Não valida os dados de entrada
-   ❌ Não tem identificador único
-   ❌ Não controla quando foi criada

### **Solução com SRP**

**📄 `domain/entities/task.py`**

```python
from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Task:
    """
    Entidade Task - Responsabilidade: Representar uma tarefa do domínio
    SRP: Esta classe só cuida de manter os dados de uma tarefa
    """
    title: str
    description: str
    id: Optional[int] = None
    created_at: Optional[datetime] = None

    def __post_init__(self):
        # Validações básicas de domínio
        if not self.title or not self.title.strip():
            raise ValueError("Title cannot be empty")
        if len(self.title) > 100:
            raise ValueError("Title too long (max 100 characters)")
        if self.created_at is None:
            self.created_at = datetime.now()
```

**📄 `domain/validators/task_validator.py` (NOVA CLASSE)**

```python
from typing import Dict, List

class TaskValidator:
    """
    Responsabilidade: Validar dados de entrada para criação de tarefas
    SRP: Só cuida de validação, não sabe nada sobre persistência ou apresentação
    """

    @staticmethod
    def validate_creation_data(data: Dict) -> List[str]:
        """Valida dados para criação de tarefa e retorna lista de erros"""
        errors = []

        # Validar título
        if not data.get("title"):
            errors.append("Title is required")
        elif len(data["title"].strip()) == 0:
            errors.append("Title cannot be empty")
        elif len(data["title"]) > 100:
            errors.append("Title too long (max 100 characters)")

        # Validar descrição
        if not data.get("description"):
            errors.append("Description is required")
        elif len(data["description"]) > 500:
            errors.append("Description too long (max 500 characters)")

        return errors
```

**🧠 Explicação para Iniciantes:**

-   **@dataclass**: Gera automaticamente métodos como `__init__`, `__repr__`
-   \***\*post_init\*\***: Executado após a criação do objeto para validações
-   **TaskValidator**: Classe separada só para validar - segue o SRP!

---

## 🔧 **PASSO 2: Melhorando o Use Case**

### **Problema Atual**

```python
def execute(self, data: dict) -> dict:
    print("[CreateTaskUseCase] Executando lógica...")
    task = Task(title=data["title"], description=data["description"])
    return self.repository.save(task)
```

**Problemas:**

-   ❌ Não valida dados de entrada
-   ❌ Não trata erros
-   ❌ Mistura lógica de negócio com print

### **Solução com SRP**

**📄 `application/usecases/create_task_usecase.py`**

```python
from typing import Dict, Any
from app.modules.task.domain.entities.task import Task
from app.modules.task.domain.validators.task_validator import TaskValidator
from app.modules.task.domain.repositories.task_repository_interface import TaskRepositoryInterface

class CreateTaskUseCase:
    """
    Responsabilidade: Orquestrar a criação de uma tarefa
    SRP: Só cuida da lógica de negócio para criar tarefas
    """

    def __init__(self, repository: TaskRepositoryInterface):
        self.repository = repository
        self.validator = TaskValidator()

    def execute(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Executa o caso de uso de criação de tarefa"""

        # 1. Validar dados de entrada
        validation_errors = self.validator.validate_creation_data(data)
        if validation_errors:
            return {
                "success": False,
                "errors": validation_errors,
                "data": None
            }

        try:
            # 2. Criar entidade do domínio
            task = Task(
                title=data["title"].strip(),
                description=data["description"].strip()
            )

            # 3. Persistir através do repositório
            saved_task = self.repository.save(task)

            # 4. Retornar resultado de sucesso
            return {
                "success": True,
                "errors": [],
                "data": saved_task
            }

        except Exception as e:
            # 5. Tratar erros inesperados
            return {
                "success": False,
                "errors": [f"Unexpected error: {str(e)}"],
                "data": None
            }
```

**🧠 Explicação para Iniciantes:**

-   O Use Case agora tem **uma única responsabilidade**: orquestrar a criação de tarefas
-   Ele **delega** a validação para o `TaskValidator`
-   Ele **delega** a persistência para o `Repository`
-   Retorna um formato padronizado com sucesso/erro

---

## 🔧 **PASSO 3: Melhorando o Repositório**

### **Solução com SRP**

**📄 `infrastructure/repositories/task_repository.py`**

```python
from datetime import datetime
from app.modules.task.domain.entities.task import Task
from app.modules.task.domain.repositories.task_repository_interface import TaskRepositoryInterface

class TaskRepository(TaskRepositoryInterface):
    """
    Responsabilidade: Persistir tarefas no banco de dados
    SRP: Só cuida de operações de persistência
    """

    def __init__(self):
        # Simulando um "banco de dados" em memória
        self._tasks = {}
        self._next_id = 1

    def save(self, task: Task) -> dict:
        """Salva uma tarefa e retorna os dados persistidos"""
        try:
            # Simular operação de salvamento
            task.id = self._next_id
            task.created_at = datetime.now()

            # "Salvar" no banco simulado
            self._tasks[task.id] = task
            self._next_id += 1

            # Retornar dados salvos
            return {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "created_at": task.created_at.isoformat()
            }

        except Exception as e:
            raise RuntimeError(f"Database error while saving task: {str(e)}")
```

---

## 🔧 **PASSO 4: Criando Schemas de Validação**

### **Nova Responsabilidade: Validação de Entrada HTTP**

**📄 `presentation/schemas/task_schemas.py` (NOVA CLASSE)**

```python
from pydantic import BaseModel, Field

class CreateTaskRequest(BaseModel):
    """
    Responsabilidade: Validar dados de entrada HTTP
    SRP: Só cuida de validação de dados da requisição
    """
    title: str = Field(..., min_length=1, max_length=100, description="Task title")
    description: str = Field(..., min_length=1, max_length=500, description="Task description")

class CreateTaskResponse(BaseModel):
    """
    Responsabilidade: Padronizar resposta HTTP
    SRP: Só cuida da estrutura de resposta
    """
    message: str
    success: bool
    data: dict = None
    errors: list = []
```

**🧠 Explicação para Iniciantes:**

-   **Pydantic**: Biblioteca para validação automática de dados
-   **Field**: Define validações como tamanho mínimo/máximo
-   Separamos **entrada** e **saída** em classes diferentes (SRP!)

---

## 🔧 **PASSO 5: Melhorando o Controller**

### **Solução com SRP**

**📄 `presentation/controllers/create_task_controller.py`**

```python
from fastapi import HTTPException
from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase
from app.modules.task.presentation.schemas.task_schemas import CreateTaskRequest, CreateTaskResponse

class CreateTaskController:
    """
    Responsabilidade: Controlar fluxo HTTP para criação de tarefas
    SRP: Só cuida de receber requisição HTTP e retornar resposta HTTP
    """

    def __init__(self, usecase: CreateTaskUseCase):
        self.usecase = usecase

    def handle(self, request: CreateTaskRequest) -> CreateTaskResponse:
        """Processa requisição de criação de tarefa"""

        # Converter request para dict (dados de entrada do use case)
        data = request.dict()

        # Executar caso de uso
        result = self.usecase.execute(data)

        # Verificar se houve erro
        if not result["success"]:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Validation failed",
                    "errors": result["errors"]
                }
            )

        # Retornar resposta de sucesso
        return CreateTaskResponse(
            message="Task created successfully",
            success=True,
            data=result["data"],
            errors=[]
        )
```

**🧠 Explicação para Iniciantes:**

-   O Controller agora só cuida de **HTTP**: recebe request, chama use case, retorna response
-   **HTTPException**: Exceção específica do FastAPI para erros HTTP
-   **Separação clara**: Controller → Use Case → Repository

---

## 🔧 **PASSO 6: Atualizando as Rotas e Container**

### **📄 `presentation/routes/task_routes.py`**

```python
from fastapi import APIRouter
from app.modules.task.task_container import TaskContainer
from app.modules.task.presentation.schemas.task_schemas import CreateTaskRequest, CreateTaskResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=CreateTaskResponse)
def create_task(request: CreateTaskRequest) -> CreateTaskResponse:
    """
    Cria uma nova tarefa
    - **title**: Título da tarefa (máx 100 caracteres)
    - **description**: Descrição da tarefa (máx 500 caracteres)
    """
    controller = TaskContainer.create_task_controller()
    return controller.handle(request)
```

### **📄 `task_container.py`**

```python
from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase
from app.modules.task.infrastructure.repositories.task_repository import TaskRepository
from app.modules.task.presentation.controllers.create_task_controller import CreateTaskController

class TaskContainer:
    """
    Responsabilidade: Criar e injetar dependências
    SRP: Só cuida de montar as dependências (Factory Pattern)
    """

    @staticmethod
    def create_task_controller() -> CreateTaskController:
        # Criar dependências na ordem correta
        repository = TaskRepository()
        usecase = CreateTaskUseCase(repository)
        controller = CreateTaskController(usecase)
        return controller
```

---

## 📁 **ESTRUTURA FINAL DE ARQUIVOS**

```
app/modules/task/
├── domain/
│   ├── entities/
│   │   └── task.py                    # ✅ Entidade robusta
│   ├── validators/
│   │   └── task_validator.py          # 🆕 Validação de domínio
│   └── repositories/
│       └── task_repository_interface.py
├── application/
│   └── usecases/
│       └── create_task_usecase.py     # ✅ Use case melhorado
├── infrastructure/
│   └── repositories/
│       └── task_repository.py         # ✅ Repositório robusto
├── presentation/
│   ├── controllers/
│   │   └── create_task_controller.py  # ✅ Controller melhorado
│   ├── schemas/
│   │   └── task_schemas.py            # 🆕 Validação HTTP
│   └── routes/
│       └── task_routes.py             # ✅ Rotas atualizadas
└── task_container.py                  # ✅ Container atualizado
```

---

## 🎯 **Resumo das Melhorias Aplicadas**

### **Antes (Problemas)**

-   ❌ Entidade sem validação
-   ❌ Use case sem tratamento de erro
-   ❌ Sem separação de responsabilidades
-   ❌ Sem validação de entrada HTTP

### **Depois (Com SRP)**

-   ✅ **Task**: Só representa dados do domínio
-   ✅ **TaskValidator**: Só valida regras de negócio
-   ✅ **CreateTaskUseCase**: Só orquestra criação de tarefas
-   ✅ **TaskRepository**: Só persiste dados
-   ✅ **CreateTaskController**: Só controla fluxo HTTP
-   ✅ **Schemas**: Só validam entrada/saída HTTP
-   ✅ **TaskContainer**: Só injeta dependências

---

## 🚀 **Como Testar**

### **1. Requisição de Sucesso**

```bash
curl -X POST "http://localhost:8000/tasks/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Clean Architecture",
    "description": "Implementar exemplo prático"
  }'
```

**Resposta esperada:**

```json
{
    "message": "Task created successfully",
    "success": true,
    "data": {
        "id": 1,
        "title": "Estudar Clean Architecture",
        "description": "Implementar exemplo prático",
        "created_at": "2025-07-25T10:30:00.123456"
    },
    "errors": []
}
```

### **2. Requisição com Erro**

```bash
curl -X POST "http://localhost:8000/tasks/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "description": "Descrição sem título"
  }'
```

**Resposta esperada:**

```json
{
    "detail": {
        "message": "Validation failed",
        "errors": ["Title is required"]
    }
}
```

---

## 🎓 **Conceitos Aprendidos**

1. **Single Responsibility Principle**: Cada classe tem uma única razão para existir
2. **Separation of Concerns**: Validação, persistência e apresentação são separadas
3. **Dependency Injection**: Use case não conhece implementação concreta
4. **Error Handling**: Tratamento padronizado de erros em cada camada
5. **Clean Architecture**: Dependências apontam sempre para dentro (domínio)

---

## 💡 **Próximos Passos**

1. **Implementar outros Use Cases**: `UpdateTask`, `DeleteTask`, `ListTasks`
2. **Adicionar testes unitários** para cada camada
3. **Implementar banco de dados real** (PostgreSQL, MongoDB)
4. **Adicionar logging** estruturado
5. **Implementar autenticação** e autorização

**Parabéns! 🎉** Você implementou uma arquitetura limpa e robusta seguindo o SRP!

## 🎯 **O que é o Single Responsibility Principle (SRP)?**

O SRP diz que **cada classe deve ter apenas uma razão para mudar**. Em outras palavras:

-   Uma classe deve fazer apenas **uma coisa**
-   Se você precisa mudar uma funcionalidade, apenas **uma classe** deve ser alterada

**Exemplo prático**: Se você tem uma classe que valida dados E salva no banco, ela está violando o SRP. Deveria ter uma classe para validar e outra para salvar.

---
