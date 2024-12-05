from flask import jsonify

from matcha.app_utils import check_request_json_values

from matcha.db.like import db_put_dislike_user, db_put_like_user, db_get_liker_username


def services_like_user_get(id_user):
    return db_get_liker_username(id_user)


def services_like_user(id_user, request):
    if request.method == "GET":
        likers = services_like_user_get(id_user)
        return jsonify({"likers": likers}), 201

    json = request.json

    if "like" in json:
        error = db_put_like_user(id_user, json["like"])
    elif "dislike" in json:
        error = db_put_dislike_user(id_user, json["dislike"])
    else:
        return jsonify({"error": "bad payload"}), 400

    if error is not None:
        return error

    likers = services_like_user_get(id_user)

    return jsonify({"likers": likers}), 201
