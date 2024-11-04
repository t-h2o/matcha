from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    create_access_token,
)

from werkzeug.security import check_password_hash

from matcha.app_utils import check_request_json

from matcha.db import (
    db_get_id_password_where_username,
)

bp = Blueprint("auth", __name__)


@bp.route("/api/login", methods=["POST"])
def login_user():
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username", "password"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    user_db = db_get_id_password_where_username(json["username"])

    if user_db is None:
        return jsonify({"error": "Incorrect username"}), 401
    if check_password_hash(user_db[1], json["password"]):
        access_token = create_access_token(identity=user_db[0])
        return jsonify(access_token=access_token)
    return jsonify({"error": "Incorrect password"}), 401


@bp.route("/api/reset-password", methods=["POST"])
def reset_password():
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    # TODO sent email recovery password

    return jsonify({"success": "email with password reset link sent"}), 201
