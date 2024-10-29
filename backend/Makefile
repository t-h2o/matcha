all: black pylint

pylint:
	docker exec flask-dev pylint .

black:
	docker exec flask-dev black .

test:
	python test.py
