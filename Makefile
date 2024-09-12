DOCKER_COMPOSE = docker-compose

.PHONY: build frontend api up down restart logs

# Build frontend and API Docker images
build:
	@echo "Building Docker images..."
	docker-compose build

# Build frontend Docker image
frontend:
	@echo "Building frontend Docker image..."
	docker build -f Dockerfile -t frontend-image .

# Build API Docker image
api:
	@echo "Building API Docker image..."
	docker build -f Dockerfile.api -t api-image .

# Start Docker containers
up:
	@echo "Starting Docker containers..."
	$(DOCKER_COMPOSE) up -d

# Stop Docker containers
down:
	@echo "Stopping Docker containers..."
	$(DOCKER_COMPOSE) down

# Restart Docker containers
restart:
	@echo "Restarting Docker containers..."
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up -d

# Show logs for all containers
logs:
	@echo "Displaying logs..."
	$(DOCKER_COMPOSE) logs -f

# Show logs for a specific service
logs-frontend:
	@echo "Displaying logs for frontend..."
	$(DOCKER_COMPOSE) logs -f frontend

logs-api:
	@echo "Displaying logs for API..."
	$(DOCKER_COMPOSE) logs -f api
