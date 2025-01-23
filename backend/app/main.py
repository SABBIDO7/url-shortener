from fastapi import FastAPI # type: ignore
from .database import create_db_and_tables
from .api import router

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(router)