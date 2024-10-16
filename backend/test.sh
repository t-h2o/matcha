#!/bin/bash

URL="localhost:5001"

RED="\e[31m"
GREEN="\e[32m"
DEFAULT="\e[0m"

success() {
	echo -en "${GREEN}"
	echo -n "Success: "
	echo -en "${DEFAULT}"
	echo "\"${1}\""
}

error() {
	echo
	echo -en "${RED}"
	echo -n "Error: "
	echo -en "${DEFAULT}"
	echo "\"${1}\""
}

compare() {
		CMD="curl --silent http://${URL}${1}"
		ANSWER="$(${CMD})"
		if [ "${ANSWER}" != "${2}" ] ; then
			error "${1}"
			echo "executed: ${CMD}"
			echo "received: ${ANSWER}"
			exit 1
		fi
		success "${1}"
}

compare_json() {
	CMD="curl --silent --header 'Content-type: application/json' --data "${2}" http://${URL}${1}"
	ANSWER=$(curl --silent --header 'Content-type: application/json' --data "${2}" http://${URL}${1})
	if [ "${ANSWER}" != "${3}" ] ; then
		error "${1}"
		echo "executed: ${CMD}"
		echo "received: ${ANSWER}"
		exit 1
	fi
	success "${1} - ${3}"
}

basic() {
	compare "" \
		"<h1>Hello, World!</h1>"

	compare \
		"/create" \
		'[{"succefull": "table users created"}]'
}

post_json() {
	compare_json \
		"/drop" \
		'{"table" : "users"}' \
		'[{"success": "Table \"users\" was succefull dropped"}]'

	compare_json \
		"/drop" \
		'{"table" : ""}' \
		'[{"error": "table is required."}]'
}

register() {
	compare_json \
		"/register" \
		'{"username" : "user", "firstname" : "firstname", "lastname" : "lastname", "email" : "email@email.com", "password" : "1234"}' \
		"User user was succefull added"

	compare_json \
		"/register" \
		'{"username" : "user", "lastname" : "lastname", "email" : "email@email.com", "password" : "1234"}' \
		"'firstname' is required."

	compare_json \
		"/register" \
		'{"firstname" : "firstname", "lastname" : "lastname", "email" : "email@email.com", "password" : "1234"}' \
		"'username' is required."

	compare_json \
		"/register" \
		'{"username" : "user", "firstname" : "firstname", "lastname" : "lastname", "email" : "email@email.com", "password" : "1234"}' \
		"error: User user is already registered."

	compare_json \
		"/register" \
		'{"username" : "", "firstname" : "firstname", "lastname" : "lastname", "email" : "email@email.com", "password" : "1234"}' \
		"error: Username is required."

	compare_json \
		"/register" \
		'{"username" : "user", "firstname" : "", "lastname" : "lastname", "email" : "email@email.com", "password" : "1234"}' \
		"error: Firstname is required."

	compare_json \
		"/register" \
		'{"username" : "user", "firstname" : "firstname", "lastname" : "", "email" : "email@email.com", "password" : "1234"}' \
		"error: Lastname is required."

	compare_json \
		"/register" \
		'{"username" : "user", "firstname" : "firstname", "lastname" : "lastname", "email" : "email@email.com", "password" : ""}' \
		"error: Password is required."

	compare_json \
		"/register" \
		'{"username" : "user", "firstname" : "firstname", "lastname" : "lastname", "email" : "", "password" : "1234"}' \
		"error: Email is required."
}

http_error() {
	HTTP_ERROR="$(curl -o /dev/null -s -w "%{http_code}\n" "${URL}${1}")"
	if [ "${HTTP_ERROR}" -eq "${2}" ] ; then
		success "${1} return error ${2}"
	else
		error "${1}"
	fi
}

check_http_error() {
	http_error "/drop" "405"
	http_error "/register" "405"
}

main() {
	post_json
	basic
	check_http_error
	register
}

main

exit 0
