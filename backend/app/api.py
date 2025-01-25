from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, schemas
from .database import get_db
from typing import List
from fastapi.responses import RedirectResponse

router = APIRouter()

@router.post("/api/urls/", response_model=schemas.URL, status_code=status.HTTP_201_CREATED)
def create_url(url: schemas.URLCreate, db: Session = Depends(get_db)):
    return crud.create_url(db=db, url=url)

@router.get("/api/urls/", response_model=List[schemas.URL])
def read_urls(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    urls = crud.get_all_urls(db, skip=skip, limit=limit)
    return urls

@router.get("/api/go/{short_code}")
async def redirect_to_original_url(short_code: str, db: Session = Depends(get_db)):
    db_url = crud.get_url_by_short_code(db, short_code)
    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")

    if db_url.expires_at and datetime.utcnow() > db_url.expires_at:
        raise HTTPException(status_code=403, detail="Short URL has expired")

    if db_url.max_visits is not None and db_url.visits >= db_url.max_visits:
        raise HTTPException(status_code=403, detail="Usage limit exceeded for this short URL")

    crud.increment_url_visits(db, db_url)
    return RedirectResponse(url=db_url.original_url, status_code=307)

@router.patch("/api/urls/{id}", response_model=schemas.URL)
def update_url(id: int, url_update: schemas.URLUpdate, db: Session = Depends(get_db)):
    updated_url = crud.update_url(db, id, url_update)
    if updated_url is None:
        raise HTTPException(status_code=404, detail="URL not found")
    return updated_url

@router.delete("/api/urls/{id}", response_model=schemas.URL)
def delete_url(id: int, db: Session = Depends(get_db)):
    deleted_url = crud.delete_url(db, id)
    if deleted_url is None:
        raise HTTPException(status_code=404, detail="URL not found")
    return deleted_url