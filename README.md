# ITMANO Project

ITMANO is a full-stack web application project consisting of a Django backend and a Next.js frontend. The project is containerized using Docker and orchestrated with Docker Compose for easy setup and deployment.

## Prerequisites

- Git
- Docker
- Docker Compose

## Cloning the Repository

To clone the repository, run the following command:

```bash
git clone https://github.com/ConveningMoon/FullStackWeb.git
cd ITMANO
```

## Environment Variables Setup

This project uses environment variables for configuration. Template files are provided for both backend and frontend:

- Backend: `backend/portfolio_project/.env.template`

Copy these templates to create your own `.env` files:

```bash
cd FullStackWeb
cp backend/portfolio_project/.env.template backend/portfolio_project/.env
```

Then, fill in the required values in these `.env` files. For example, in the backend `.env` file, you should set:

- `DEBUG`: Set to `1` for development or `0` for production.
- `SECRET_KEY`: Your Django secret key.
- Database connection details: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
- Django superuser credentials: `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_EMAIL`, `DJANGO_SUPERUSER_PASSWORD`.

## Auto-created Superuser Credentials

On startup, the backend automatically creates a Django superuser with the following default credentials (configurable via `.env`):

- Username: `admin`
- Email: `admin@example.com`
- Password: `password123`

You can use these credentials to log in to the Django admin interface at `http://localhost:8000/admin`.

## Starting the Project

The project uses Docker Compose to run both the backend and frontend services. To start the project, run:

```bash
docker-compose up --build
```

This command will build the Docker images (if not already built) and start the containers.

## Accessing the Application

- Frontend: Typically available at `http://localhost:3000`
- Backend API: Typically available at `http://localhost:8000`

Please refer to the project-specific documentation or configuration files if these ports are different.

## Project Structure

- `backend/` - Django backend application
- `frontend/` - Next.js frontend application
- `docker-compose.yml` - Docker Compose configuration to run backend and frontend
