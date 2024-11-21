from flask import jsonify

from matcha.app_utils import check_request_json_values


def services_like_user(id_user, request):
    json = request.json

    check_request = check_request_json_values(
        request.headers.get("Content-Type"),
        json,
        ["username"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    return jsonify({"username": json["username"]}), 201
