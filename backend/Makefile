all: black pylint

pylint:
	docker exec flask-dev pylint .

black:
	docker exec flask-dev black .

test:
	python test.py

doc:
	@echo "from app import *" > doc.py
	@grep def app.py | sed 's/def //' | sed 's/(.*):/.__doc__/' | sed 's/^\(.*\)$$/print(\1)/' >> doc.py
	@docker exec flask-dev python doc.py
	@rm doc.py
