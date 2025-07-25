Claro! Aqui está o **tutorial ajustado e completo** com **todas as informações necessárias** para rodar **testes unitários** em Python usando `pytest`, incluindo como configurar corretamente o ambiente, resolver alertas do VSCode/Pylance e executar com sucesso o teste da classe `Task`.

---

# ✅ Tutorial Completo de Testes Unitários com Pytest – Classe `Task`

## 📌 Objetivo

Vamos aprender a:

-   Instalar a biblioteca `pytest`
-   Criar uma estrutura de testes
-   Implementar um teste unitário para a entidade `Task`
-   Executar corretamente os testes
-   Solucionar erros comuns de importação (VSCode, Pylance)

---

## ✅ 1. Criar ambiente virtual (recomendado)

```bash
sudo python3 -m venv venv          # cria o virtualenv
source venv/bin/activate     # ativa no Linux/macOS
# .\venv\Scripts\activate    # ativa no Windows PowerShell
```

---

## ✅ 2. Instalar a biblioteca de testes

```bash
pip install pytest
```

Você pode verificar se ele foi instalado:

```bash
pip show pytest
```

### Alternativa: Se quiser salvar como dependência de desenvolvimento (em projetos com `requirements-dev.txt` ou `pyproject.toml`):

```bash
pip install --upgrade pytest
```

---

## ✅ 3. Estrutura mínima do projeto

```
.
├── app/
│   └── modules/
│       └── task/
│           └── domain/
│               └── entities/
│                   └── task.py
├── tests/
│   └── unit/
│       └── test_task.py
├── venv/
└── pytest.ini  <-- (opcional, mas recomendado)
```

---

## ✅ 4. Criar a entidade `Task`

📄 `app/modules/task/domain/entities/task.py`

```python
class Task:
    def __init__(self, title: str, description: str):
        self.title = title
        self.description = description
```

---

## ✅ 5. Criar o teste unitário

📄 `tests/unit/test_task.py`

```python
from app.modules.task.domain.entities.task import Task

def test_task_creation():
    task = Task(title="Estudar FastAPI", description="Aprender sobre injeção de dependência")

    assert task.title == "Estudar FastAPI"
    assert task.description == "Aprender sobre injeção de dependência"
```

---

## ✅ 6. Resolver erro `Import "pytest" could not be resolved` (VSCode/Pylance)

### 🛠️ Solução:

1. **Certifique-se que o `pytest` está instalado no seu ambiente virtual.**

2. **Configure o VSCode para usar o ambiente virtual:**

    - Pressione `Ctrl+Shift+P` → `Python: Select Interpreter` → selecione o caminho do seu `venv`.

3. **Adicione um arquivo `pytest.ini` para configurar o caminho base:**

📄 `pytest.ini`

```ini
[pytest]
pythonpath = .
```

> Isso resolve problemas de importação com módulos da pasta `app`.

---

## ✅ 7. Rodar os testes

### Rodar todos os testes:

```bash
pytest
```

### Ou especificar o diretório:

```bash
pytest tests/
```

### Se quiser rodar com caminho correto mesmo fora da raiz do projeto:

```bash
PYTHONPATH=. pytest
```

---

## ✅ 8. Resultado esperado

```bash
============================= test session starts =============================
collected 1 item

tests/unit/test_task.py .                                              [100%]

============================== 1 passed in 0.01s =============================
```

---

## ✅ 9. Dicas úteis de execução

### Verbose (detalhado):

```bash
pytest -v
```

### Mostrar prints/debugs:

```bash
pytest -s
```

---

## ✅ 10. Testando exceções (extra)

Você pode validar o tratamento de erros:

```python
import pytest

def test_task_with_empty_title():
    with pytest.raises(TypeError):
        Task(title=None, description="desc")
```

---

## 🧪 Conclusão

Com este tutorial você aprendeu:

-   Como estruturar seus testes
-   Como evitar erros de importação
-   Como rodar testes unitários com `pytest`

---

## 🚀 Quer ir além?

Testar:

-   Use Cases (Casos de Uso)
-   Controllers
-   Repositórios com mock/fake
-   Testes de integração com FastAPI
