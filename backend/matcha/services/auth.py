from flask import jsonify

from flask_jwt_extended import (
    create_access_token,
)

from werkzeug.security import check_password_hash

from matcha.db import db_get_id_password_where_username

from matcha.app_utils import check_request_json


def service_login_user(request):
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


def services_reset_password(request):
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
