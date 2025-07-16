from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.session import SessionLocal, engine, Base
from ..models import schemas as user_schemas
from ..services import user_service
from typing import List

router = APIRouter(prefix="/users", tags=["users"])

# Cria as tabelas no banco (pode ser movido para main.py)
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[user_schemas.UserRead])
def list_users(db: Session = Depends(get_db)):
    return user_service.get_users(db)

@router.post("/", response_model=user_schemas.UserRead, status_code=201)
def create_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(user_service.user_model.User).filter_by(name=user.name).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    return user_service.create_user(db, user)
