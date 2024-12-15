from flask import jsonify

from matcha.db.db import db_get_id_where_username, db_get_username_where_id

from matcha.db.chat import (
    db_get_chat,
    db_post_chat,
)

from matcha.utils import check_request_json


def services_chat_get(id_user, username):
    db_response = db_get_id_where_username(username)

    if db_response is None:
        return (jsonify({"error": "username not found"}), 401)

    id_other = db_response[0]
    username_getter = db_get_username_where_id(id_user)
    return db_get_chat(id_user, id_other, username_getter, username), 200


def services_chat_post(id_user, request):
    check_request = check_request_json(
        request.headers.get("Content-Type"),
        request.json,
        ["to", "message"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    response = db_post_chat(id_user, request.json["to"], request.json["message"])
    return jsonify(response), 201
