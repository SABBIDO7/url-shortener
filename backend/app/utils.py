import secrets
import string
from sqlalchemy.orm import Session
from . import crud

def generate_short_code(db: Session, length: int = 6) -> str:
    """Generates a unique short code."""
    while True:
        chars = string.ascii_letters + string.digits
        short_code = ''.join(secrets.choice(chars) for _ in range(length))
        if not crud.get_url_by_short_code(db, short_code):
            return short_code