FROM python:3.12

# Set the working directory in the container
WORKDIR /backend

# Copy the backend folder into the container
COPY . /backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the backend port
EXPOSE 8000

# Default command for running the backend
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
