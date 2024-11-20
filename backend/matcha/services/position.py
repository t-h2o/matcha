from flask import jsonify

from flask_jwt_extended import (
    create_access_token,
)

from werkzeug.security import check_password_hash

from matcha.db.db import db_get_id_password_where_username

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

    return jsonify(json), 201
