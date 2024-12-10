from flask import jsonify

from flask_jwt_extended import (
    create_access_token,
)

from werkzeug.security import check_password_hash

from matcha.db.db import db_update_position, db_get_position

from matcha.app_utils import check_request_json


def service_position(id_user, request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["latitude", "longitude"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    error_msg = db_update_position(id_user, json["latitude"], json["longitude"])
    if error_msg is not None:

        if error_msg["error"] == "InvalidTextRepresentation":
            return jsonify({"error": "bad input"}), 422
        return jsonify(error_msg), 400

    position = db_get_position(id_user)

    return jsonify({"latitude": position[0], "longitude": position[1]}), 201
