# URL Shortener

This is a simple URL shortener service built with a Python/FastAPI backend and a React/MUI frontend and unit tests built with pytest.

## DemoVideoLink

- link:`https://github.com/user-attachments/assets/5b73b34a-2189-441e-8c8f-923b787b0384`

## Features

- Shorten long URLs
- List all existing short URLs
- Redirect to original URLs via short codes (when double clicking on the itemLink)
- Error handling and notifications (Snackbars)
- Edit existing links (set expiration in seconds, named URLs, max usage)
- Delete links
- Collect and display usage statistics (number of Visits)
- Make copy of the short link to clipboard
- Responsiveness

## Setup and Running

### Docker

#### Prerequisites

- Docker (for containerized deployment)

1.  **Run Project**

    - Navigate to the root project directory
    - From the project root directory, run: `docker-compose up`
    - This will start both the backend and frontend services `Container url-shortener-backend-1` and `Container url-shortener-frontend-1`.

2.  **Run Tests**
    - Navigate to the root project directory
    - Run the command : `docker-compose exec backend pytest` (ensure that the docker is running first (docker compose up))

### Local Development

#### Prerequisites

- Python 3.12
- Node.js (with npm) v20.11.0

1. **Backend:**

   - Navigate to the `backend` directory.
   - Create a virtual environment (recommended): `python3 -m venv venv`
   - Activate the virtual environment:
     - macOS/Linux: `source venv/bin/activate`
     - Windows: `venv\Scripts\activate`
   - Install dependencies: `pip install -r requirements.txt`
   - Run the FastAPI development server: `uvicorn app.main:app --reload`
   - The backend will be accessible at `http://localhost:8000`.

2. **Frontend:**
   - Navigate to the `frontend` directory.
   - Install dependencies: `npm install`.
   - Start the Vite development server: `npm run dev`
   - The frontend will be accessible at `http://localhost:8080`.

### Running Tests (Backend)

1. Navigate to the `backend` directory.
2. Make sure you are in the virtual environment.
3. Run tests using Pytest: `pytest`

## Technologies Used

- **Backend:**
  - Python
  - FastAPI
  - SQLite
  - SQLModel (ORM)
  - Pytest
- **Frontend:**
  - React
  - TSX
  - Vite
  - MUI (Material UI)
  - Axios
- **Docker:**
  - Dockerfile
  - docker-compose

## Project Structure

- `backend/`: Contains the FastAPI backend code.
  - `app/`: Main application logic, API routes in routers directory, models in models directory, schemas in schemas directory,crud operation with db in services directory.
  - `tests/`: Pytest unit and integration tests.
  - `Dockerfile`: Dockerfile for building the application image for backend api's and unit tests
- `frontend/`: Contains the React frontend code.
  - `public/`: Static assets (empty).
  - `src/`: React components, API interaction logic.
  - `Dockerfile`: Dockerfile for building the application image for running the frontend.
- `docker-compose.yml`: Docker Compose configuration links the Dockerfile of the frontend and the backend one to run them as one container.

## API Documentation

The backend API provides the following endpoints:

- `POST /api/urls/`: Create a new short URL.
- `GET /api/urls/`: Get a list of all short URLs.
- `GET /go/{short_code}`: Redirect to the original URL.
- `PATCH /api/urls/{id}`: Update an existing short URL.
- `DELETE /api/urls/{id}`: Delete a short URL.

You can access the interactive API documentation (provided by FastAPI) at `http://localhost:8000/docs`.

## Notes

- The frontend uses Axios to make API calls to the backend.
- Error handling is implemented on both the frontend and backend.
- The frontend uses MUI components for a consistent look and feel.
- The database is a simple SQLite file (`url_shortener.db`) for this project.
