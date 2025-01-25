from datetime import datetime, timedelta
from app.models import URL


def test_get_all_urls(db_session, test_client):
    # Add a test URL to the database
    url = URL(original_url="https://facebook.com/", short_code="sh90oi")
    db_session.add(url)
    db_session.commit()

    # Send a GET request to fetch all URLs
    response = test_client.get("/api/urls/")
    assert response.status_code == 200
    # Parse the JSON response
    data = response.json()

    assert isinstance(data, list)  # Response is a list
    assert len(data) > 0  # The list is not empty

    # Find the URL entry in the response
    matching_entry = next(
        (item for item in data if item["original_url"] == "https://facebook.com/" and item["short_code"] == "sh90oi"),
        None
    )
    assert matching_entry is not None, "Expected URL entry not found in response"



def test_create_url(test_client):  # Type hints added
    response = test_client.post("/api/urls/", json={"original_url": "https://www.example.com"})
    assert response.status_code == 201
    data = response.json()
    assert "short_code" in data
    assert data["original_url"] == "https://www.example.com/"


def test_create_url_invalid_url(test_client):
    response = test_client.post("/api/urls/", json={"original_url": "invalid-url"})
    assert response.status_code == 422  # Expect validation error


def test_redirect_to_original_url(db_session,test_client):
    url = URL(original_url="https://facebook.com/", short_code="sh98ot")
    db_session.add(url)
    db_session.commit()

    response = test_client.get(f"/api/go/{url.short_code}", follow_redirects=False)

    assert response.status_code == 307
    assert response.headers["location"] == url.original_url


def test_redirect_url_not_found(test_client):

    response = test_client.get("/api/go/notfound")
        
    assert response.status_code == 404
    assert response.json() == {"detail": "Short URL not found"}


def test_redirect_expired_url(test_client,db_session):
    short_code="expired"
    expires = datetime.utcnow() - timedelta(days=1)
    url = URL(original_url="https://expired.com", short_code=short_code, expires_at=expires)
    db_session.add(url)
    db_session.commit()

    response = test_client.get(f"/api/go/{short_code}")

    assert response.status_code == 403
    assert response.json() == {"detail": "Short URL has expired"}


def test_update_url(test_client, db_session ):
    url = URL(original_url="https://facebook.com/", short_code="sh98ip")
    db_session.add(url)
    db_session.commit()
    update_data = {
        "original_url": "https://facebook.com/",
        "expires_in": 3600,
        "named_url": "facebook"
    }

    response = test_client.patch(f"/api/urls/{url.id}", json=update_data)
    data=response.json()

    assert response.status_code == 200
    assert data['original_url'] == "https://facebook.com/"
    assert data['named_url'] == "facebook"
    assert data['expires_in'] is None


def test_delete_url(test_client,db_session):
    # Create a test URL in the database
    url = URL(original_url="https://facebook.com/", short_code="sh98ic")
    db_session.add(url)
    db_session.commit()
    response = test_client.delete(f"/api/urls/{url.id}")
    assert response.status_code == 200



def test_increment_url_visits(test_client, db_session):
    url = URL(original_url="https://facebook.com/", short_code="sh98if")
    db_session.add(url)
    db_session.commit()
    test_client.get(f"/api/go/{url.short_code}")  # Simulate visit using short code
    
    updated_url = db_session.get(URL, url.id)
    db_session.refresh(updated_url)  # Refresh the URL object to get the updated value

    assert updated_url.visits == 1