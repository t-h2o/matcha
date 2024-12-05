from flask import jsonify

from matcha.app_utils import check_request_json_values

from matcha.db.like import (
    db_put_dislike_user,
    db_put_like_user,
    db_get_liker_username,
    db_get_is_liked,
)


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
    elif "dislike" in json:
        username = json["dislike"]
        error = db_put_dislike_user(id_user, json["dislike"])
    else:
        return jsonify({"error": "bad payload"}), 400

    if error is not None:
        return error

    is_liked = db_get_is_liked(id_user, username)
    return jsonify({"isLiked": is_liked}), 201
