from sqlalchemy.orm import Session
from . import models, schemas
from .utils import generate_short_code
from datetime import datetime, timedelta

def create_url(db: Session, url: schemas.URLCreate):
    short_code = generate_short_code(db)
    expires_at = datetime.utcnow() + timedelta(seconds=url.expires_in) if url.expires_in else None
    original_url_str = str(url.original_url) 

    db_url = models.URL(original_url=original_url_str, short_code=short_code, expires_at=expires_at, named_url=url.named_url, max_visits=url.max_visits)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

def get_url_by_short_code(db: Session, short_code: str):
    return db.query(models.URL).filter(models.URL.short_code == short_code).first()

def get_all_urls(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.URL).offset(skip).limit(limit).all()

def update_url(db: Session, short_code: str, url_update: schemas.URLUpdate):
    db_url = get_url_by_short_code(db, short_code)
    if db_url:
        update_data = url_update.dict(exclude_unset=True)
        if 'expires_in' in update_data and update_data['expires_in'] is not None:
            update_data['expires_at'] = datetime.utcnow() + timedelta(seconds=update_data['expires_in'])
            del update_data['expires_in']
        for key, value in update_data.items():
            setattr(db_url, key, value)
        db.commit()
        db.refresh(db_url)
    return db_url

def increment_url_visits(db: Session, url: models.URL):
    url.visits += 1
    db.commit()

def delete_url(db: Session, short_code: str):
    db_url = get_url_by_short_code(db, short_code)
    if db_url:
        db.delete(db_url)
        db.commit()
    return db_url