"""Flask, os.environ"""

from os import environ
from sys import stderr
from flask import Flask
from flask import request
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt_identity

from werkzeug.security import check_password_hash
from flask_cors import CORS

from db import db_create_table_users
from db import db_register
from db import db_drop
from db import db_get_id_password_where_username
from db import db_set_email
from db import db_get_user_per_id


def flaskprint(message):
    print(message, file=stderr)


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
CORS(app, origins="http://localhost:4200")

jwt = JWTManager(app)


def update_email(id_user, email):
    db_set_email(id_user, email)


@app.route("/api/modify-general", methods=["PUT"])
@jwt_required()
def update():
    id_user = get_jwt_identity()
    flaskprint(id_user)
    json = request.json
    flaskprint(json)
    for item in json:
        if item == "email":
            update_email(id_user, json[item])
        flaskprint(item)
        flaskprint(json[item])

    return "ok"


@app.route("/api/create")
def create_table_users():
    """Create the Users's table."""

    db_create_table_users()

    return jsonify({"success": "Table 'users' created"}), 201


@app.route("/api/login", methods=["POST"])
def login_user():
    """Check the login"""
    json = request.json

    required_fields = ["username", "password"]
    missing_fields = [
        field for field in required_fields if field not in json or not json[field]
    ]

    if missing_fields:
        return (
            jsonify(
                {
                    "error": f"The following fields are required and cannot be empty: {', '.join(missing_fields)}"
                }
            ),
            400,
        )

    username = json["username"]
    password = json["password"]

    user_db = db_get_id_password_where_username(username)

    if user_db is None:
        return jsonify({"error": "Incorrect username"}), 401
    if check_password_hash(user_db[1], password):
        access_token = create_access_token(identity=user_db[0])
        return jsonify(access_token=access_token)
    return jsonify({"error": "Incorrect password"}), 401


@app.route("/who_am_i", methods=["GET"])
@jwt_required()
def protected():
    # We can now access our sqlalchemy User object via `current_user`.
    user_id = get_jwt_identity()
    user_db = db_get_user_per_id(user_id)
    return jsonify(
        id=user_db[0],
        firstname=user_db[1],
        lastname=user_db[2],
    )


@app.route("/api/register", methods=["POST"])
def register_user():
    """Register a new user.

    Validates that the username is not already taken.
    Hashes the password for security.
    """
    if request.headers.get("Content-Type") != "application/json":
        return jsonify({"error": "Content-Type not supported!"}), 415

    json = request.json

    required_fields = ["username", "password", "firstname", "lastname", "email"]
    missing_fields = [
        field for field in required_fields if field not in json or not json[field]
    ]

    if missing_fields:
        return (
            jsonify(
                {
                    "error": f"The following fields are required and cannot be empty: {', '.join(missing_fields)}"
                }
            ),
            400,
        )

    username = json["username"]
    password = json["password"]
    firstname = json["firstname"]
    lastname = json["lastname"]
    email = json["email"]

    response = db_register(username, password, firstname, lastname, email)

    return jsonify(response)


@app.route("/api/drop", methods=["POST"])
def drop_table():
    """Drop table name in JSON"""

    if request.headers.get("Content-Type") != "application/json":
        return jsonify({"error": "Content-Type not supported!"}), 415
    json = request.json
    table = json["table"]

    error = None

    if not table:
        error = "table is required."

    if error is not None:
        return jsonify({"error": error})

    response = db_drop(table)

    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
