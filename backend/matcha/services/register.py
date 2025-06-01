from flask import jsonify, current_app

from matcha.utils import check_request_json

from matcha.db.register import db_register
from matcha.db.user import db_get_id_where_username

from matcha.services.confirm import services_confirm, services_confirm_jwt


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
    )

    user_id = db_get_id_where_username(json["username"])

    services_confirm(user_id[0])

    return jsonify(response[0]), response[1]
