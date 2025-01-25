from database import Base
from sqlalchemy import Column, String, Integer, TIMESTAMP, Boolean
from sqlalchemy.sql import func

class URL(Base):
    __tablename__ = "urls"

    # Primary key
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Required fields
    original_url = Column(String(255), nullable=False)
    short_code = Column(String(50), nullable=False, unique=True)

    # Optional fields
    named_url = Column(String(255), nullable=True)
    max_visits = Column(Integer, nullable=True)
    expires_at = Column(TIMESTAMP(timezone=True), nullable=True)

    # Tracking fields
    visits = Column(Integer, nullable=False, default=0)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=func.now()
    )
    updated_at = Column(
        TIMESTAMP(timezone=True), default=None, onupdate=func.now()
    )