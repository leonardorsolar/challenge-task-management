Para testar sua API RESTful de tarefas na rota `api/v1/task` usando `curl`, aqui estão os exemplos de comandos para cada operação que você implementou:

---

## ✅ 1. Criar uma nova tarefa (POST)

```bash
curl -X POST http://localhost:3000/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Node.js",
    "description": "Aprender sobre Express e arquitetura em camadas",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-07-20",
    "userId": "ext-123456"
  }'
```

---

## ✅ 2. Listar todas as tarefas (GET)

```bash
curl http://localhost:3000/api/v1/task
```

---

## ✅ 3. Filtrar tarefas por status (GET com query)

```bash
curl "http://localhost:3000/api/v1/task?status=completed"
```

---

## ✅ 4. Atualizar o status de uma tarefa (PUT)

```bash
curl -X PUT http://localhost:3000/api/v1/task/{id_da_tarefa} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

> Substitua `{id_da_tarefa}` pelo ID real da tarefa (por exemplo, `"e2c9d330-4c99-4b75-a5c6-92f1d4d28d01"`).

---

## ✅ 5. Deletar uma tarefa (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/v1/task/{id_da_tarefa}
```

---
