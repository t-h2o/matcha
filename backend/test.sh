curl localhost:5001

curl localhost:5001/create

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
