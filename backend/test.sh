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

basic() {
	compare "" \
		"<h1>Hello, World!</h1>"

	compare \
		"/drop --data table=users" \
		"Table \"users\" was succefull dropped"

	compare \
		"/create" \
		"created"

	compare \
		"/register" \
		"register with POST method"

	compare \
		"/drop" \
		"drop with POST method"
}

register() {
	compare \
		"/register --data username=user --data firstname=firstname --data lastname=lastname --data email=email@email.com --data password=1234" \
		"User user was succefull added"

	compare \
		"/register --data username=user --data firstname=firstname --data lastname=lastname --data email=email@email.com --data password=1234" \
		"error: User user is already registered."

	compare \
		"/register --data username= --data firstname=firstname --data lastname=lastname --data email=email@email.com --data password=1234" \
		"error: Username is required."

	compare \
		"/register --data username=user --data firstname= --data lastname=lastname --data email=email@email.com --data password=1234" \
		"error: Firstname is required."

	compare \
		"/register --data username=user --data firstname=firstname --data lastname= --data email=email@email.com --data password=1234" \
		"error: Lastname is required."

	compare \
		"/register --data username=user --data firstname=firstname --data lastname=lastname --data email= --data password=1234" \
		"error: Email is required."

	compare \
		"/register --data username=user --data firstname=firstname --data lastname=lastname --data email=email@email.com --data password=" \
		"error: Password is required."

#	curl localhost:5001/register \
#		--data "username=user" \
#		--data "firstname=firstname" \
#		--data "lastname=lastname" \
#		--data "email=email@email.com" \
#		--data "password=1234"
}

main() {
	basic
	register
}

main

exit 0
