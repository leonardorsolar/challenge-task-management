Claro! Aqui vai um tutorial rápido e objetivo para clonar, instalar e rodar seu projeto FastAPI com SQLite:

---

## Passos rápidos

### 1. Clonar o repositório

```bash
git clone https://github.com/seuusuario/seurepositorio.git
cd seurepositorio
```

---

### 2. Criar e ativar o ambiente virtual (Python)

```bash
sudo python3 -m venv venv          # cria o virtualenv
source venv/bin/activate     # ativa no Linux/macOS
# .\venv\Scripts\activate    # ativa no Windows PowerShell
```

---

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

---

### 4. Rodar o servidor FastAPI

```bash
uvicorn app.main:app --reload
```

Por padrão, o servidor vai rodar em:
**[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 5. Acessar no navegador

-   Abra: [http://127.0.0.1:8000](http://127.0.0.1:8000)

```text
{"message":"API está rodando"}
```

-   Para ver a documentação interativa (Swagger UI):
    [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
-   Para a docs alternativa (ReDoc):
    [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

Se precisar, me fala que posso ajudar com algum passo específico!
