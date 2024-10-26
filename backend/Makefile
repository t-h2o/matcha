all: black pylint

pylint:
	docker exec flask pylint .

black:
	docker exec flask-dev black .

test:
	python test.py
