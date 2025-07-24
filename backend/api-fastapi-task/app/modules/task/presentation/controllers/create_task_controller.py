# app/modules/task/presentation/controllers/create_task_controller.py
from app.modules.task.application.usecases import create_task_usecase
from app.modules.task.infrastructure.repositories import task_repository

def handle():
    print("[CreateTaskController] Chamando o usecase...")
    
    data = {
        "title": "Nova tarefa",  # futuramente virá do request body
        "description": "Descrição da tarefa"
    }
    
    result = create_task_usecase.execute(data, task_repository)
    return {"message": "Tarefa criada com sucesso", "data": result}
