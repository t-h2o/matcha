from flask import jsonify

from flask_socketio import send  # TODO remove me

from matcha.db.db import db_get_interests
from matcha.db.db import db_set_interests

from matcha.app_utils import check_request_json_values

from matcha.websocket.socket_manager import SocketManager  # TODO remove me


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
        sid = SocketManager().get_sid(id_user)  # TODO remove me
        if sid is not None:  # TODO remove me
            send("interest PUT", to=sid, namespace="/")  # TODO remove me

        error_msg = _services_put_interests(id_user, request)
        if error_msg:
            return error_msg

    interests = db_get_interests(id_user)

    return jsonify({"interests": interests}), 201
