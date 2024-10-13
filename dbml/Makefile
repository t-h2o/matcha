matcha.svg: matcha.dbml
	docker run \
	--rm \
	--volume $(shell pwd):/app \
	tgrivel/dbml-renderer \
	dbml-renderer -i matcha.dbml -o matcha.svg

matcha.sql: matcha.dbml
	bash dbml2sql.bash matcha.dbml matcha.sql
