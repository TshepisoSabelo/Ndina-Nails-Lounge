# Use official Python image as the base image
FROM python:3.11

# Set the working directory inside the container
# All following commands run inside the folder /app
WORKDIR /app

# Copy requirements file into the container
# This is done separately to optimize Docker caching
COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir prevents pip from storing cache files
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY ./app .

# Command that runs when the container starts
# 0.0.0.0 allows external access from your host machine
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]