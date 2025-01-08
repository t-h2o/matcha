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
	DEVE_POSTGRES_USER=$(whoami)
	DEVE_POSTGRES_PASSWORD=$(pwgen)
	DEVE_POSTGRES_NAME="matcha-db-dev"

	PROD_POSTGRES_USER=$(whoami)
	PROD_POSTGRES_PASSWORD=$(pwgen)
	PROD_POSTGRES_NAME="matcha-db-prod"
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

	# url
	DEVE_URL_FRONTEND=http://localhost:4200
	DEVE_URL_BACKEND=http://localhost:5001

	# PostgreSQLexit
	DEVE_POSTGRES_USER=${DEVE_POSTGRES_USER}
	DEVE_POSTGRES_PASSWORD=${DEVE_POSTGRES_PASSWORD}
	DEVE_POSTGRES_NAME=${DEVE_POSTGRES_NAME}

	DEVE_DATABASE_URL=postgres://${DEVE_POSTGRES_USER}:${DEVE_POSTGRES_PASSWORD}@postgres:5432/${DEVE_POSTGRES_NAME}
	DEVE_FLASK_JWT_SECRET_KEY=$(pwgen)
	DEVE_FLASK_UPLOAD_FOLDER="uploads"
	DEVE_FLASK_URL="http://localhost:5001"

	# url
	PROD_URL=http://localhost

	PROD_POSTGRES_USER=${PROD_POSTGRES_USER}
	PROD_POSTGRES_PASSWORD=${PROD_POSTGRES_PASSWORD}
	PROD_POSTGRES_NAME=${PROD_POSTGRES_NAME}

	PROD_DATABASE_URL=postgres://${PROD_POSTGRES_USER}:${PROD_POSTGRES_PASSWORD}@postgres:5432/${PROD_POSTGRES_NAME}
	PROD_FLASK_JWT_SECRET_KEY=$(pwgen)
	PROD_FLASK_UPLOAD_FOLDER="uploads"
	PROD_FLASK_URL="http://localhost:5001"

	# Mail
	DEVE_MAIL_USER=test # default username of MailHog
	DEVE_MAIL_SMTP_HOST=mail-dev # container name of MailHog
	DEVE_MAIL_SMTP_PORT=1025 # default port of MailHog
	DEVE_MAIL_SMTP_METHOD=plain
	DEVE_MAIL_TEST=whatever@random.com
	DEVE_MAIL_PASSWORD=test # default password of MailHog

	PROD_MAIL_USER=test # default username of MailHog
	PROD_MAIL_SMTP_HOST=mail-dev # container name of MailHog
	PROD_MAIL_SMTP_PORT=1025 # default port of MailHog
	PROD_MAIL_SMTP_METHOD=plain
	PROD_MAIL_TEST=whatever@random.com
	PROD_MAIL_PASSWORD=test # default password of MailHog
	environment_file
}

main () {
	is_environement_file_already_exist
	generate_all_variables
	create_the_environment_file
}

main
