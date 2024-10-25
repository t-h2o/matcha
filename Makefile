CONTAINER_FRONT = angular

start-dev: env
	docker compose -f docker-compose.dev.yml up

stop-dev:
	docker compose -f docker-compose.dev.yml down

start-prod: build-prod
	docker compose -f docker-compose.prod.yml up

stop-prod:
	docker compose -f docker-compose.prod.yml down

build-prod: env
	docker compose -f docker-compose.prod.yml build

env:
	@if [ ! -e .env ]; then \
		printf "$(GREEN)Generate environment variables\n$(DEFAULT)"; \
		sh create-env.sh; \
	fi

cmd-dev:
	docker exec -it $(CONTAINER_FRONT) sh

cmd-prod:
	docker exec -it $(CONTAINER_FRONT)-prod sh

.PHONY: env start-dev stop-dev start-prod stop-prod build-prod cmd-dev cmd-prod
