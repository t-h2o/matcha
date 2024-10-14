URL="localhost:5001"

compare() {
		CMD="curl --silent http://${URL}${1}"
		ANSWER="$(${CMD})"
        if [ "${ANSWER}" != "${2}" ] ; then
                echo "error with \"$1\""
				echo "executed: ${CMD}"
				echo "received: ${ANSWER}"
                exit 1
        fi
        echo "success: \"${1}\""
}

compare "" "<h1>Hello, World!</h1>"

compare "/create" "created"

curl localhost:5001/register \
  --data "username=user?firtname=firtname?lastname=lastname?email=email@email.com?password=1234"

exit 0

curl localhost:5001/register \
  --data "username=user" \
  --data "firtname=firtname" \
  --data "lastname=lastname" \
  --data "email=email@email.com" \
  --data "password=1234"

#compare \
#	"/register --data \"username=user\" --data \"password=1234\"" \
#   	"User user was succefull added"

exit 0
compare \
	"/register --data \"username=user\" --data \"password=1234\"" \
    "error: User user is already registered."

exit 0
#created
#error: Username is required.
#error: Password is required.<!doctype html>


curl localhost:5001/register \
  --data "username=user" \
  --data "password=1234"

curl localhost:5001/register \
  --data "username=user2" \
  --data "password=1234"

curl localhost:5001/register \
  --data "username=user" \
  --data "password=1234"

curl localhost:5001/register \
  --data "username=" \
  --data "password=1234"

curl localhost:5001/register \
  --data "username=user" \
  --data "password="

curl localhost:5001/register \
  --data "username=user" \
  --data "other=1234"
