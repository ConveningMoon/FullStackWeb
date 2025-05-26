FROM python:3.9-slim

WORKDIR /app

# Install Poetry
RUN pip install poetry==1.4.2

# Copy poetry configuration files
COPY pyproject.toml poetry.lock* ./

# Configure poetry to not use a virtual environment
RUN poetry config virtualenvs.create false

# Install dependencies
RUN poetry install --no-dev

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Start gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "portfolio_project.wsgi:application"]
