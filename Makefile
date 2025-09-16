# MarketCart Platform Docker Commands
# Makefile for easy Docker management

.PHONY: help build up down restart logs clean dev prod

# Default target
help: ## Show this help message
	@echo "MarketCart Platform Docker Commands"
	@echo "=================================="
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development commands
dev: ## Start development environment
	@echo "🚀 Starting MarketCart development environment..."
	docker-compose -f docker-compose.dev.yml up --build

dev-detached: ## Start development environment in background
	@echo "🚀 Starting MarketCart development environment in background..."
	docker-compose -f docker-compose.dev.yml up --build -d

# Production commands
prod: ## Start production environment
	@echo "🚀 Starting MarketCart production environment..."
	docker-compose up --build

prod-detached: ## Start production environment in background
	@echo "🚀 Starting MarketCart production environment in background..."
	docker-compose up --build -d

# Build commands
build: ## Build all Docker images
	@echo "🔨 Building all Docker images..."
	docker-compose build

build-dev: ## Build development Docker images
	@echo "🔨 Building development Docker images..."
	docker-compose -f docker-compose.dev.yml build

# Stop commands
down: ## Stop all services
	@echo "🛑 Stopping all services..."
	docker-compose down

down-dev: ## Stop development services
	@echo "🛑 Stopping development services..."
	docker-compose -f docker-compose.dev.yml down

# Restart commands
restart: ## Restart all services
	@echo "🔄 Restarting all services..."
	docker-compose restart

restart-dev: ## Restart development services
	@echo "🔄 Restarting development services..."
	docker-compose -f docker-compose.dev.yml restart

# Logs commands
logs: ## Show logs for all services
	docker-compose logs -f

logs-dev: ## Show logs for development services
	docker-compose -f docker-compose.dev.yml logs -f

logs-backend: ## Show backend logs
	docker-compose logs -f backend

logs-frontend: ## Show frontend logs
	docker-compose logs -f frontend

logs-db: ## Show database logs
	docker-compose logs -f postgres

# Database commands
db-migrate: ## Run database migrations
	@echo "🗄️ Running database migrations..."
	docker-compose exec backend npx prisma migrate deploy

db-seed: ## Seed database with sample data
	@echo "🌱 Seeding database..."
	docker-compose exec backend npm run prisma:seed

db-reset: ## Reset database (WARNING: This will delete all data)
	@echo "⚠️ Resetting database..."
	docker-compose exec backend npx prisma migrate reset --force

db-studio: ## Open Prisma Studio
	@echo "🎨 Opening Prisma Studio..."
	docker-compose exec backend npx prisma studio

# Cleanup commands
clean: ## Remove all containers, networks, and volumes
	@echo "🧹 Cleaning up Docker resources..."
	docker-compose down -v --remove-orphans
	docker system prune -f

clean-dev: ## Remove development containers, networks, and volumes
	@echo "🧹 Cleaning up development Docker resources..."
	docker-compose -f docker-compose.dev.yml down -v --remove-orphans

clean-images: ## Remove all Docker images
	@echo "🧹 Removing all Docker images..."
	docker-compose down --rmi all

# Status commands
status: ## Show status of all services
	@echo "📊 Service Status:"
	docker-compose ps

status-dev: ## Show status of development services
	@echo "📊 Development Service Status:"
	docker-compose -f docker-compose.dev.yml ps

# Shell access commands
shell-backend: ## Access backend container shell
	docker-compose exec backend sh

shell-frontend: ## Access frontend container shell
	docker-compose exec frontend sh

shell-db: ## Access database shell
	docker-compose exec postgres psql -U marketcart_user -d marketcart

# Health check commands
health: ## Check health of all services
	@echo "🏥 Health Check:"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:4000/api/health"
	@echo "Database: localhost:5432"

# Quick setup for new developers
setup: ## Complete setup for new developers
	@echo "🛠️ Setting up MarketCart for development..."
	@echo "1. Starting development environment..."
	docker-compose -f docker-compose.dev.yml up --build -d
	@echo "2. Waiting for services to be ready..."
	sleep 30
	@echo "3. Running database migrations..."
	docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate deploy
	@echo "4. Seeding database..."
	docker-compose -f docker-compose.dev.yml exec backend npm run prisma:seed
	@echo "✅ Setup complete! Visit http://localhost:3000"

# Production deployment
deploy: ## Deploy to production
	@echo "🚀 Deploying to production..."
	docker-compose up --build -d
	@echo "✅ Production deployment complete!"
