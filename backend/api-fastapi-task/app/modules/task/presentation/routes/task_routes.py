# app/modules/task/presentation/routes/task_routes.py
from fastapi import APIRouter
from app.modules.task.presentation.controllers import create_task_controller  # ✅ importação correta

router = APIRouter()

@router.get("/")
def list_tasks():
    return [{"id": 1, "title": "Tarefa 1"}]

# @router.post("/")
# def create_task():
#     return {"message": "Tarefa criada com sucesso"}

@router.post("/")
def create_task():
    return create_task_controller.handle()