# ITMANO Project

ITMANO is a full-stack web application project consisting of a Django backend and a Next.js frontend. The project is containerized using Docker and orchestrated with Docker Compose for easy setup and deployment.

## Prerequisites

- Git
- Docker
- Docker Compose

## Cloning the Repository

To clone the repository, run the following command:

```bash
git clone <repository-url>
cd ITMANO
```

Replace `<repository-url>` with the actual URL of the repository.

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

## Additional Information

For any questions or issues, please refer to the project documentation or contact the project maintainers.
