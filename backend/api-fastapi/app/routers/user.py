from fastapi import APIRouter, Depends, HTTPException  # Adicionado HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models import schemas as user_schemas
from app.models import user as user_model  # Adicionado user_model
from app.models.schemas import UserRead  
from app.services import user_service
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

# ✅ Rota de verificação da API
@router.get("/health")
def health_check():
    return {"message": "✅ API de usuários está no ar!"}

@router.get("/", response_model=List[user_schemas.UserRead])
def list_users(db: Session = Depends(get_db)):
    return user_service.get_users(db)

@router.post("/", response_model=user_schemas.UserRead)
def create_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    return user_service.create_user(db, user)

@router.get("/{user_id}", response_model=UserRead)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user
