from flask import jsonify

from matcha.app_utils import check_request_json_values

from matcha.db.like import db_put_like_user


def services_like_user(id_user, request):
    json = request.json

    check_request = check_request_json_values(
        request.headers.get("Content-Type"),
        json,
        ["username"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    db_put_like_user(id_user, json["username"])

    return jsonify({"username": json["username"]}), 201
