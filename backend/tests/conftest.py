from datetime import datetime, timedelta
import pytest
import uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, get_db
from app import models

# SQLite database URL for testing
SQLITE_DATABASE_URL = "sqlite:///./test_db.db"

# Create a SQLAlchemy engine
engine = create_engine(
    SQLITE_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# Create a sessionmaker to manage sessions
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables in the database
Base.metadata.create_all(bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Create a new database session with a rollback at the end of the test."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(scope="function")
def test_client(db_session):
    """Create a test client that uses the override_get_db fixture to return a session."""

    def override_get_db():
        try:
            yield db_session
        finally:
            db_session.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture()
def url_payload(short_code='eqt23j'):
    """Generate an updated user payload."""
    expires_at = datetime.utcnow() + timedelta(seconds=2)
    url = models.URL(id=1,original_url="https://facebook.com/", short_code=short_code, expires_at=expires_at, named_url='facebook', max_visits=5,created_at='2025-01-24T22:28:55.616Z',visits=0)

    return url
@pytest.fixture
def url_entry(request):
    short_code = request.param["short_code"]
    original_url = request.param["original_url"]

    url = models.URL(short_code=short_code, original_url=original_url)
    return url