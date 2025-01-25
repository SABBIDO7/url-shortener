from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional

class URLBase(BaseModel):
    original_url: HttpUrl
    expires_in: Optional[int] = None  # Time in seconds until expiration
    named_url: Optional[str] = None
    max_visits: Optional[int] = None

class URLCreate(URLBase):
    pass

class URL(URLBase):
    id: int
    short_code: str
    created_at: datetime
    visits: int

    class Config:
        orm_mode = True

class URLUpdate(BaseModel):
    original_url: Optional[HttpUrl] = None
    expires_in: Optional[int] = None
    named_url: Optional[str] = None
    max_visits: Optional[int] = None