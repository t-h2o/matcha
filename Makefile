
CONTAINER_FRONT = angular

start: env
	docker compose up

stop:
	docker compose down

env:
	@if [ ! -e .env ]; then \
		printf "$(GREEN)Generate environment variables\n$(DEFAULT)"; \
		sh create-env.sh; \
	fi

cmd:
	docker exec -it $(CONTAINER_FRONT) sh