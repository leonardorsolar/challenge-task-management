#app/shared/infrastructure/http/api/v1.py
from fastapi import APIRouter
from app.modules.task.presentation.routes.task_routes import router as task_router

api_v1_router = APIRouter()

# Rota da raiz da versão
@api_v1_router.get("/")
def root():
    return {"message": "API v1"}

# Registro das rotas do módulo task com o prefixo /task
api_v1_router.include_router(task_router, prefix="/task", tags=["Task"])
