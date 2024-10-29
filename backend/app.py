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

from app_utils import check_request_json

from db import db_register
from db import db_get_id_password_where_username
from db import db_get_user_per_id
from db import db_set_user_profile_data


def flaskprint(message):
    print(message, file=stderr)


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
CORS(app, origins="http://localhost:4200")

jwt = JWTManager(app)


@app.route("/api/modify-general", methods=["PUT"])
@jwt_required()
def modify_general():
    id_user = get_jwt_identity()

    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["firstname", "lastname", "selectedGender", "sexualPreference", "bio"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    response = db_set_user_profile_data(
        json["firstname"],
        json["lastname"],
        json["selectedGender"],
        json["sexualPreference"],
        json["bio"],
        id_user,
    )

    return jsonify(response), 200


@app.route("/api/login", methods=["POST"])
def login_user():
    """Check the login"""
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username", "password"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

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

    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username", "password", "firstname", "lastname", "email"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    response = db_register(
        json["username"],
        json["password"],
        json["firstname"],
        json["lastname"],
        json["email"],
    )

    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
