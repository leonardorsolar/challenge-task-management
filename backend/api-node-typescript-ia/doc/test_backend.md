Para testar sua API RESTful de tarefas na rota `api/v1/ai-message` usando `curl`, aqui estão os exemplos de comandos para cada operação que você implementou:

---

## ✅ 1. visualizar o servidor

```bash
curl -X POST http://localhost:4000/

```

http://localhost:4000/api/v1/message

## ✅ 2. Criar a resposta da ia (POST)

```bash
curl -X POST http://localhost:4000/api/v1/message/create \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1",
    "content": "Crie uma tarefa sobre integração",
    "llm_model": "gpt-3.5-turbo"
  }'
```

---
