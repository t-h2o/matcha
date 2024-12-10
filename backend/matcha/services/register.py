from flask import request, jsonify, current_app

from jwt import encode

from matcha.app_utils import check_request_json

from matcha.db.register import db_register


def services_register(request):
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
        current_app.config["URL"] + "/api/images/avatar.png",
    )

    return jsonify(response)
