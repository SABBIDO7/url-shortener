from sqlmodel import create_engine, SQLModel, Session # type: ignore
from .models import URL

DATABASE_URL = "sqlite:///./url_shortener.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()