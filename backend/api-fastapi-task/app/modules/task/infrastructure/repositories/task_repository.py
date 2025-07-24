def save(data: dict):
    print("[TaskRepository] Salvando tarefa no banco de dados simulado...")
    
    task = {
        "id": 1,
        "title": data["title"],
        "description": data["description"]
    }
    
    return task
