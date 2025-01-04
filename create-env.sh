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

mail_credentials() {
	echo -n "mail user: " ; read MAIL_USER
	echo -n "mail smtp: " ; read MAIL_SMTP
	echo -n "mail test (to test the send mail feature): " ; read MAIL_TEST
	echo -n "mail password: " ; read -s MAIL_PASSWORD
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
	FLASK_UPLOAD_FOLDER="uploads"
	FLASK_URL="http://localhost:5001"

	# Mail
	MAIL_USER=test # default username of MailHog
	MAIL_SMTP_HOST=mail-dev # container name of MailHog
	MAIL_SMTP_PORT=1025 # default port of MailHog
	MAIL_SMTP_METHOD=plain
	MAIL_TEST=whatever@random.com
	MAIL_PASSWORD=test # default password of MailHog
	environment_file
}

main () {
	is_environement_file_already_exist
	generate_all_variables
	create_the_environment_file
}

main
