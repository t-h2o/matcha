
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

.PHONY: env

# Colors
RED     = \033[1;31m
GREEN   = \033[1;32m
YELLOW  = \033[1;33m
CYAN    = \033[1;36m
DEFAULT = \033[0m
