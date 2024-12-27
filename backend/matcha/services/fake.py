from flask import jsonify

from matcha.utils import check_request_json_values, get_id_where_username_else_error

from matcha.db.user import db_get_id_where_username
from matcha.db.user import db_get_username_where_id

from matcha.db.notification import db_put_notification

from matcha.db.fake import (
    db_put_unfake_user,
    db_put_fake_user,
    db_get_is_faked,
)


def services_fake_post(id_user, request):
    json = request.json

    username = None

    if "fake" in json:
        username = json["fake"]
        error = db_put_fake_user(id_user, json["fake"])
        if error is not None:
            return error

        id_to_notify = get_id_where_username_else_error(json["fake"])
        if not isinstance(id_to_notify, int):
            return id_to_notify

        faker_username = db_get_username_where_id(id_user)

        title = "fake"
        content = f"{faker_username} fake you"

        db_put_notification(id_user, id_to_notify, title, content)

    elif "unfake" in json:
        username = json["unfake"]
        error = db_put_unfake_user(id_user, json["unfake"])

        id_to_notify = get_id_where_username_else_error(json["unfake"])
        if not isinstance(id_to_notify, int):
            return id_to_notify

        faker_username = db_get_username_where_id(id_user)

        title = "unfake"
        content = f"{faker_username} unfake you"
        db_put_notification(id_user, id_to_notify, title, content)
    else:
        return jsonify({"error": "bad payload"}), 400

    if error is not None:
        return error

    is_faked = db_get_is_faked(id_user, id_to_notify)
    return jsonify({"isFaked": is_faked}), 201
