from flask import jsonify

from flask_socketio import emit

from matcha.app_utils import check_request_json_values

from matcha.db.db import db_get_id_where_username
from matcha.db.db import db_get_username_where_id

from matcha.db.like import (
    db_put_dislike_user,
    db_put_like_user,
    db_get_liker_username,
    db_get_is_liked,
)

from matcha.websocket.socket_manager import SocketManager


def services_like_user_get(id_user):
    return db_get_liker_username(id_user)


def services_like_user(id_user, request):
    if request.method == "GET":
        likers = services_like_user_get(id_user)
        return jsonify({"likers": likers}), 201

    json = request.json

    username = None

    if "like" in json:
        username = json["like"]
        error = db_put_like_user(id_user, json["like"])
        if error is not None:
            return error

        id_to_notify = db_get_id_where_username(json["like"])

        liker_username = db_get_username_where_id(id_user)

        notification_message = {
            "content": f"{liker_username} like you",
            "date": "hier",
            "title": "Awesome title",
        }

        sid = SocketManager().get_sid(id_to_notify[0])
        if sid is not None:
            emit("like", notification_message, to=sid, namespace="/")

    elif "dislike" in json:
        username = json["dislike"]
        error = db_put_dislike_user(id_user, json["dislike"])
    else:
        return jsonify({"error": "bad payload"}), 400

    if error is not None:
        return error

    is_liked = db_get_is_liked(id_user, username)
    return jsonify({"isLiked": is_liked}), 201
