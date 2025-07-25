# 🚀 Arquitetura Python Escalável - Melhorias para Projetos Futuros

## 📁 Estrutura Aprimorada para Escalabilidade

```
project_root/
├── .env                          # Variáveis de ambiente
├── .env.example                  # Template das variáveis
├── .gitignore                    # Arquivos ignorados pelo Git
├── docker-compose.yml            # Container orchestration
├── Dockerfile                    # Imagem Docker
├── requirements.txt              # Dependências de produção
├── requirements-dev.txt          # Dependências de desenvolvimento
├── pyproject.toml               # Configuração do projeto
├── README.md                    # Documentação
├── Makefile                     # Comandos automatizados
├── alembic.ini                  # Configuração de migrations
├── pytest.ini                  # Configuração de testes
│
├── app/
│   ├── __init__.py
│   ├── main.py                  # Entrada da aplicação
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py          # Configurações centralizadas
│   │   └── database.py          # Configuração do banco
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── exceptions.py        # Exceções customizadas
│   │   ├── middleware.py        # Middlewares customizados
│   │   ├── security.py          # Autenticação e autorização
│   │   ├── logging.py           # Configuração de logs
│   │   └── events.py            # Sistema de eventos
│   │
│   ├── shared/
│   │   ├── __init__.py
│   │   ├── domain/
│   │   │   ├── __init__.py
│   │   │   ├── base_entity.py   # Entidade base
│   │   │   ├── value_objects.py # Value Objects compartilhados
│   │   │   └── events.py        # Domain Events
│   │   ├── infrastructure/
│   │   │   ├── __init__.py
│   │   │   ├── base_repository.py
│   │   │   ├── database/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── models.py    # Models SQLAlchemy
│   │   │   │   └── migrations/  # Alembic migrations
│   │   │   └── external/
│   │   │       ├── __init__.py
│   │   │       └── http_client.py
│   │   └── application/
│   │       ├── __init__.py
│   │       ├── base_usecase.py
│   │       └── dto/             # Data Transfer Objects
│   │           └── __init__.py
│   │
│   ├── modules/
│   │   ├── __init__.py
│   │   ├── user/                # Módulo de usuários
│   │   │   ├── __init__.py
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   ├── infrastructure/
│   │   │   ├── presentation/
│   │   │   └── container.py
│   │   │
│   │   └── task/                # Módulo de tarefas (exemplo existente)
│   │       ├── __init__.py
│   │       ├── domain/
│   │       │   ├── __init__.py
│   │       │   ├── entities/
│   │       │   │   └── task.py
│   │       │   ├── repositories/
│   │       │   │   └── task_repository.py
│   │       │   ├── services/    # Domain Services
│   │       │   │   └── __init__.py
│   │       │   └── events/      # Domain Events específicos
│   │       │       └── __init__.py
│   │       ├── application/
│   │       │   ├── __init__.py
│   │       │   ├── usecases/
│   │       │   │   ├── __init__.py
│   │       │   │   ├── create_task.py
│   │       │   │   ├── update_task.py
│   │       │   │   ├── delete_task.py
│   │       │   │   └── list_tasks.py
│   │       │   ├── dto/
│   │       │   │   ├── __init__.py
│   │       │   │   ├── request.py
│   │       │   │   └── response.py
│   │       │   └── handlers/    # Event Handlers
│   │       │       └── __init__.py
│   │       ├── infrastructure/
│   │       │   ├── __init__.py
│   │       │   ├── repositories/
│   │       │   │   ├── __init__.py
│   │       │   │   └── task_repository.py
│   │       │   └── external/    # Integrações externas
│   │       │       └── __init__.py
│   │       ├── presentation/
│   │       │   ├── __init__.py
│   │       │   ├── controllers/
│   │       │   │   ├── __init__.py
│   │       │   │   └── task_controller.py
│   │       │   ├── schemas/     # Pydantic schemas
│   │       │   │   ├── __init__.py
│   │       │   │   ├── request.py
│   │       │   │   └── response.py
│   │       │   └── routes/
│   │       │       ├── __init__.py
│   │       │       └── task_routes.py
│   │       └── container.py
│   │
│   └── container.py             # Container principal
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py              # Fixtures do pytest
│   ├── unit/                    # Testes unitários
│   ├── integration/             # Testes de integração
│   └── e2e/                     # Testes end-to-end
│
├── scripts/
│   ├── start.sh                 # Script de inicialização
│   ├── migrate.sh              # Script de migrations
│   └── seed.py                 # Dados iniciais
│
└── docs/
    ├── api/                     # Documentação da API
    ├── architecture/            # Documentação da arquitetura
    └── deployment/              # Guias de deploy
```

## 🔧 Melhorias Essenciais

### 1. **Sistema de Configuração Robusto**

```python
# app/config/settings.py
from pydantic import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # App
    app_name: str = "My Scalable App"
    version: str = "1.0.0"
    debug: bool = False

    # Database
    database_url: str
    database_echo: bool = False

    # Security
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 30

    # External APIs
    external_api_url: Optional[str] = None
    external_api_key: Optional[str] = None

    # Monitoring
    log_level: str = "INFO"
    sentry_dsn: Optional[str] = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
```

### 2. **Entidade Base com Funcionalidades Comuns**

```python
# app/shared/domain/base_entity.py
from datetime import datetime
from typing import Any, Dict
import uuid

class BaseEntity:
    def __init__(self, id: str = None):
        self.id = id or str(uuid.uuid4())
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def update_timestamp(self):
        self.updated_at = datetime.utcnow()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
```

### 3. **Sistema de Exceções Customizadas**

```python
# app/core/exceptions.py
class DomainException(Exception):
    """Exceção base do domínio"""
    def __init__(self, message: str, code: str = None):
        self.message = message
        self.code = code
        super().__init__(message)

class ValidationException(DomainException):
    """Exceção de validação"""
    pass

class NotFoundException(DomainException):
    """Recurso não encontrado"""
    pass

class UnauthorizedException(DomainException):
    """Não autorizado"""
    pass

class BusinessRuleException(DomainException):
    """Violação de regra de negócio"""
    pass
```

### 4. **Repository Base Genérico**

```python
# app/shared/infrastructure/base_repository.py
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, List, Optional
from sqlalchemy.orm import Session

T = TypeVar('T')

class BaseRepository(ABC, Generic[T]):
    def __init__(self, session: Session, model_class):
        self.session = session
        self.model_class = model_class

    def save(self, entity: T) -> T:
        db_obj = self.model_class(**entity.to_dict())
        self.session.add(db_obj)
        self.session.commit()
        self.session.refresh(db_obj)
        return self._to_entity(db_obj)

    def find_by_id(self, id: str) -> Optional[T]:
        db_obj = self.session.query(self.model_class).filter(
            self.model_class.id == id
        ).first()
        return self._to_entity(db_obj) if db_obj else None

    def find_all(self, limit: int = 100, offset: int = 0) -> List[T]:
        db_objs = self.session.query(self.model_class).offset(offset).limit(limit).all()
        return [self._to_entity(obj) for obj in db_objs]

    def delete(self, id: str) -> bool:
        deleted = self.session.query(self.model_class).filter(
            self.model_class.id == id
        ).delete()
        self.session.commit()
        return deleted > 0

    @abstractmethod
    def _to_entity(self, db_obj) -> T:
        """Converte objeto do banco para entidade do domínio"""
        pass
```

### 5. **Use Case Base com Validação**

```python
# app/shared/application/base_usecase.py
from abc import ABC, abstractmethod
from typing import Any, Dict
from pydantic import BaseModel

class BaseUseCase(ABC):
    @abstractmethod
    def execute(self, request: BaseModel) -> Any:
        pass

    def validate_request(self, request: BaseModel) -> None:
        """Validação adicional se necessário"""
        pass

    def handle_business_rules(self, data: Dict[str, Any]) -> None:
        """Validações de regras de negócio"""
        pass
```

### 6. **Sistema de Logging Estruturado**

```python
# app/core/logging.py
import logging
import sys
from pythonjsonlogger import jsonlogger
from app.config.settings import settings

def setup_logging():
    logger = logging.getLogger()
    logger.setLevel(getattr(logging, settings.log_level))

    # Remove handlers existentes
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)

    # Handler para stdout
    handler = logging.StreamHandler(sys.stdout)

    # Formato JSON para produção
    if not settings.debug:
        formatter = jsonlogger.JsonFormatter(
            '%(asctime)s %(name)s %(levelname)s %(message)s'
        )
    else:
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )

    handler.setFormatter(formatter)
    logger.addHandler(handler)

    return logger
```

### 7. **Container de Dependências Avançado**

```python
# app/container.py
from dependency_injector import containers, providers
from dependency_injector.ext import aiohttp
from sqlalchemy.orm import sessionmaker

from app.config.settings import settings
from app.shared.infrastructure.database import Database

class Container(containers.DeclarativeContainer):
    # Configuration
    config = providers.Configuration()

    # Database
    database = providers.Singleton(Database, db_url=settings.database_url)
    session_factory = providers.Factory(
        sessionmaker,
        bind=database.provided.engine
    )

    # Modules containers
    task_container = providers.DependenciesContainer()
    user_container = providers.DependenciesContainer()
```

### 8. **Middleware de Tratamento de Erros**

```python
# app/core/middleware.py
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from app.core.exceptions import DomainException
import logging

logger = logging.getLogger(__name__)

async def exception_handler_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except DomainException as e:
        logger.warning(f"Domain exception: {e.message}", extra={"code": e.code})
        return JSONResponse(
            status_code=400,
            content={"error": e.message, "code": e.code}
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"error": "Internal server error"}
        )
```

### 9. **Schemas Pydantic Padronizados**

```python
# app/shared/application/dto/base.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class BaseResponse(BaseModel):
    id: str
    created_at: datetime
    updated_at: datetime

class PaginatedResponse(BaseModel):
    items: list
    total: int
    page: int = Field(ge=1)
    size: int = Field(ge=1, le=100)
    pages: int

class ErrorResponse(BaseModel):
    error: str
    code: Optional[str] = None
    details: Optional[dict] = None
```

### 10. **Configuração de Testes**

```python
# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.shared.infrastructure.database import get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def db_session():
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
```

## 📋 Dependências Recomendadas

### requirements.txt

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic[email]==2.4.2
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.7
dependency-injector==4.41.0
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-json-logger==2.0.7
sentry-sdk[fastapi]==1.38.0
redis==5.0.1
celery==5.3.4
```

### requirements-dev.txt

```
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
pytest-cov==4.1.0
black==23.11.0
isort==5.12.0
flake8==6.1.0
mypy==1.7.1
pre-commit==3.5.0
```

## 🚀 Scripts de Automação

### Makefile

```makefile
.PHONY: install test lint format run docker-build docker-run

install:
	pip install -r requirements.txt -r requirements-dev.txt

test:
	pytest tests/ -v --cov=app --cov-report=html

lint:
	flake8 app tests
	mypy app

format:
	black app tests
	isort app tests

run:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

docker-build:
	docker-compose build

docker-run:
	docker-compose up -d

migrate:
	alembic upgrade head

seed:
	python scripts/seed.py
```

## 🔄 Principais Melhorias Implementadas

1. **Configuração Centralizada**: Sistema robusto com Pydantic Settings
2. **Logging Estruturado**: Logs em JSON para produção
3. **Tratamento de Erros**: Middleware global para exceções
4. **Injeção de Dependências**: Container avançado com dependency-injector
5. **Testes Automatizados**: Setup completo com pytest
6. **Migrations**: Alembic para evolução do banco
7. **Documentação**: Estrutura para docs técnicas
8. **Docker**: Containerização para deploy
9. **Monitoramento**: Integração com Sentry
10. **CI/CD Ready**: Scripts e estrutura para automação

Esta arquitetura oferece uma base sólida para projetos que precisam escalar, mantendo a qualidade do código e facilitating a manutenção a longo prazo.
