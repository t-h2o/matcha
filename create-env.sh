#!/bin/sh

ENVIRONMENT_FILE=".env"

alias pwgen="docker run \
	--rm \
	--interactive \
	backplane/pwgen \
	--ambiguous \
	--capitalize \
	--secure 20 1"

is_environement_file_already_exist () {
	if [ -e "${ENVIRONMENT_FILE}" ]
	then
		echo the "${ENVIRONMENT_FILE}" file already exist
		echo you need to delete it to recreate a new one
		exit 0
	fi
}

generate_all_variables () {
	POSTGRES_USER=$(whoami)
	POSTGRES_PASSWORD=$(pwgen)
	POSTGRES_NAME="matcha-db"
}


create_the_environment_file () {
	cat > ${ENVIRONMENT_FILE} <<- environment_file
	# Matcha environment file

	# File created the $(date +"%Y.%m.%d") by $(whoami)

	# PostgreSQLexit
	POSTGRES_USER=${POSTGRES_USER}
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
	POSTGRES_NAME=${POSTGRES_NAME}

	DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_NAME}
	FLASK_JWT_SECRET_KEY=$(pwgen)

	environment_file
}

main () {
	is_environement_file_already_exist
	generate_all_variables
	create_the_environment_file
}

main