from flask import jsonify


from matcha.db.interests import db_get_interests
from matcha.db.interests import db_set_interests

from matcha.utils import check_request_json_values


def _services_put_interests(id_user, request):
    json = request.json

    check_request = check_request_json_values(
        request.headers.get("Content-Type"),
        json,
        ["interests"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    db_set_interests(id_user, json["interests"])


def services_interests(id_user, request):
    if request.method == "PUT":
        error_msg = _services_put_interests(id_user, request)
        if error_msg:
            return error_msg

    interests = db_get_interests(id_user)

    return jsonify({"interests": interests}), 201
