# app/modules/task/presentation/routes/task_routes.py
from fastapi import APIRouter
from app.modules.task.task_container import TaskContainer


router = APIRouter()

@router.get("/")
def list_tasks():
    return [{"id": 1, "title": "Tarefa 1"}]

# @router.post("/")
# def create_task():
#     return {"message": "Tarefa criada com sucesso"}

@router.post("/")
def create_task():
    controller = TaskContainer.create_task_controller()
    return controller.handle()