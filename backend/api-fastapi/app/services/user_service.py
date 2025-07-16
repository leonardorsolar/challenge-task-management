from sqlalchemy.orm import Session
from ..models import user as user_model
from ..models import schemas as user_schemas

def get_users(db: Session):
    return db.query(user_model.User).all()

def create_user(db: Session, user: user_schemas.UserCreate):
    db_user = user_model.User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
