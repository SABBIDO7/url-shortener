from sqlmodel import Field, Session, SQLModel, create_engine, select # type: ignore
from datetime import datetime, timedelta
from typing import Optional

class URL(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    original_url: str
    short_code: str = Field(unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None
    named_url: Optional[str] = None
    visits: int = Field(default=0)
    max_visits: Optional[int] = None