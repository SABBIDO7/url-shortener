from app import models
from fastapi import FastAPI 
from app.api import router
from app.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()



app.include_router(router)