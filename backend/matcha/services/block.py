from flask import jsonify

from matcha.utils import check_request_json_values, get_id_where_username_else_error

from matcha.db.user import db_get_id_where_username
from matcha.db.user import db_get_username_where_id

from matcha.db.notification import db_put_notification

from matcha.db.block import (
    db_put_unblock_user,
    db_put_block_user,
    db_get_is_blocked,
)


def services_block_post(id_user, request):
    json = request.json

    username = None

    if "block" in json:
        username = json["block"]
        error = db_put_block_user(id_user, json["block"])
        if error is not None:
            return error

        id_to_notify = get_id_where_username_else_error(json["block"])
        if not isinstance(id_to_notify, int):
            return id_to_notify

        blocker_username = db_get_username_where_id(id_user)

        title = "block"
        content = f"{blocker_username} block you"

        db_put_notification(id_user, id_to_notify, title, content)

    elif "unblock" in json:
        username = json["unblock"]
        error = db_put_unblock_user(id_user, json["unblock"])

        id_to_notify = get_id_where_username_else_error(json["unblock"])
        if not isinstance(id_to_notify, int):
            return id_to_notify

        blocker_username = db_get_username_where_id(id_user)

        title = "unblock"
        content = f"{blocker_username} unblock you"
        db_put_notification(id_user, id_to_notify, title, content)
    else:
        return jsonify({"error": "bad payload"}), 400

    if error is not None:
        return error

    is_blocked = db_get_is_blocked(id_user, id_to_notify)
    return jsonify({"isBlocked": is_blocked}), 201
