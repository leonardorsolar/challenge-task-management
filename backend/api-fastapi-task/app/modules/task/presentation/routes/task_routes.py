from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_tasks():
    return [{"id": 1, "title": "Tarefa 1"}]

@router.post("/")
def create_task():
    return {"message": "Tarefa criada com sucesso"}
