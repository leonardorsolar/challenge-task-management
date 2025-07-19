from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user
from app.database.session import engine, Base, get_db
from app.services.user_service import create_user
from app.models.schemas import UserCreate
from app.models import user as user_model  # ✅ Correção
from datetime import datetime
import time

app = FastAPI()
app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "API está no ar! Acesse /users para endpoints de usuários."}

start_time = time.time()

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "python-server",
        "timestamp": datetime.now().isoformat(),
        "uptime": time.time() - start_time
    }

origins = [
    "http://localhost:5173",  # endereço do seu frontend
    "http://localhost:3000",  # opcional, outros endereços permitidos
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # permite frontend específico
    allow_credentials=True,
    allow_methods=["*"],  # permite todos métodos (GET, POST, etc)
    allow_headers=["*"],  # permite todos cabeçalhos
)

Base.metadata.create_all(bind=engine)

@app.on_event("startup")
def startup_event():
    from sqlalchemy.orm import Session

    db: Session = next(get_db())

    existing_users = db.query(user_model.User).all()
    if not existing_users:
        user_data = UserCreate(name="admin")
        create_user(db, user_data)
        print("✅ Usuário padrão criado: admin")
    else:
        print("ℹ️ Usuários já existem, nenhum novo criado.")
