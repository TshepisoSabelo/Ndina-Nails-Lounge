# Use official Python image as the base image
FROM python:3.11

# Set the working directory inside the container
# All following commands run inside the folder /app
WORKDIR /app

# Copy requirements file into the container
# This is done separately to optimize Docker caching
# Upgrade pip and install virtualenv
RUN pip install --upgrade pip \
    && pip install --upgrade virtualenv


COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir prevents pip from storing cache files
RUN python -m pip install --no-cache-dir -r requirements.txt

# Verify uvicorn is installed
RUN python -c "import uvicorn; print('uvicorn version:', uvicorn.__version__)"

# Copy the rest of the application code into the container
COPY ./app .

# Command that runs when the container starts
# 0.0.0.0 allows external access from your host machine
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
