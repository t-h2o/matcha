all: black pylint

pylint:
	docker exec flask pylint .

black:
	docker exec flask black .

test:
	python test.py
