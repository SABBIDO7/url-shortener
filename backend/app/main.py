from app.models import url_model
from fastapi import FastAPI 
from app.routers.url import router
from database import engine

url_model.Base.metadata.create_all(bind=engine)

app = FastAPI()



app.include_router(router)