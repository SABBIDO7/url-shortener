from sqlalchemy.orm import Session
from . import models, schemas
from .utils import generate_short_code
from datetime import datetime, timedelta, timezone

def create_url(db: Session, url: schemas.URLCreate):
    short_code = generate_short_code(db)
    expires_at = datetime.now(timezone.utc) + timedelta(seconds=url.expires_in) if url.expires_in else None
    original_url_str = str(url.original_url) 

    db_url = models.URL(original_url=original_url_str, short_code=short_code, expires_at=expires_at, named_url=url.named_url, max_visits=url.max_visits)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

def get_url_by_id(db: Session, id: int):
    return db.query(models.URL).filter(models.URL.id == id).first()

def get_url_by_short_code(db: Session, short_code: str):
    return db.query(models.URL).filter(models.URL.short_code == short_code).first()

def get_all_urls(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.URL).offset(skip).limit(limit).all()

def update_url(db: Session, id: int, url_update: schemas.URLUpdate):
    db_url = get_url_by_id(db, id)
    if db_url:
        update_data = url_update.dict(exclude_unset=True)

        # handle expires_in
        if 'expires_in' in update_data:
            if update_data['expires_in'] is not None:
                expires_at = datetime.utcnow() + timedelta(seconds=update_data['expires_in'])
            else:
                expires_at = None  # Handle case where expires_in is set to null
            del update_data['expires_in']
            update_data['expires_at'] = expires_at

        for key, value in update_data.items():
            setattr(db_url, key, value)

        db.commit()
        db.refresh(db_url)
    return db_url

def increment_url_visits(db: Session, url: models.URL):
    url.visits += 1
    db.commit()

def delete_url(db: Session, id: int):
    db_url = get_url_by_id(db, id)
    if db_url:
        db.delete(db_url)
        db.commit()
    return db_url