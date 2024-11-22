from os import remove

from flask import Blueprint, request, jsonify, current_app

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.app_utils import (
    check_request_json,
    flaskprint,
)

from matcha.db.register import db_register

from matcha.db.db import (
    db_set_user_email,
    db_get_user_email,
    db_get_interests,
    db_delete_user,
    db_get_user_images,
    db_set_user_profile_data,
    db_get_user_per_id,
    db_get_user_per_username,
    db_browsing_gender_sexualorientation,
    db_get_url_profile,
)

from matcha.app_utils import check_request_json


def _users_put(id_user, request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["firstname", "lastname", "selectedGender", "sexualPreference", "bio", "age"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    return db_set_user_profile_data(
        json["firstname"],
        json["lastname"],
        json["selectedGender"],
        json["sexualPreference"],
        json["bio"],
        json["age"],
        id_user,
    )


def services_users(id_user, request):
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = _users_put(id_user, request)
        if error_msg:
            return error_msg

    get_username = request.args.get("username", default="", type=str)

    if get_username == "":
        user_db = db_get_user_per_id(id_user)
        profile_picture = db_get_url_profile(id_user)

        if "url" in profile_picture:
            profile_url = url = profile_picture["url"]
        elif "error" in profile_picture:
            profile_url = url = profile_picture["error"]

        return (
            jsonify(
                username=user_db[0],
                email=user_db[1],
                firstname=user_db[2],
                lastname=user_db[3],
                selectedGender=user_db[4],
                sexualPreference=user_db[5],
                bio=user_db[6],
                age=user_db[7],
                email_verified=user_db[8],
                profile_complete=user_db[9],
                fameRating=user_db[10],
                urlProfile=profile_url,
            ),
            200,
        )
    else:
        user_db = db_get_user_per_username(get_username)
        interests = db_get_interests(user_db[0])
        pictures = db_get_user_images(user_db[0])
        profile_picture = db_get_url_profile(user_db[0])

        if "url" in profile_picture:
            profile_url = url = profile_picture["url"]
        elif "error" in profile_picture:
            profile_url = url = profile_picture["error"]

        if user_db is None:
            return (jsonify({"error": "username not found"}), 401)

        return (
            jsonify(
                username=user_db[1],
                firstname=user_db[2],
                lastname=user_db[3],
                gender=user_db[4],
                sexualPreference=user_db[5],
                bio=user_db[6],
                age=user_db[7],
                fameRating=user_db[8],
                interests=interests,
                pictures=pictures,
                urlProfile=profile_url,
            ),
            200,
        )


def services_browsing(id_user):
    user_db = db_get_user_per_id(id_user)
    gender = user_db[4]
    sexual_orientation = user_db[5]

    search = {gender: None, sexual_orientation: None}

    if gender == "m" and sexual_orientation == "e":
        search["gender"] = "f"
        search["sexual_orientation"] = "e"
    elif gender == "m" and sexual_orientation == "o":
        search["gender"] = "m"
        search["sexual_orientation"] = "o"
    elif gender == "f" and sexual_orientation == "e":
        search["gender"] = "m"
        search["sexual_orientation"] = "e"
    elif gender == "f" and sexual_orientation == "o":
        search["gender"] = "f"
        search["sexual_orientation"] = "o"

    db_browsing_users = db_browsing_gender_sexualorientation(id_user, search)

    browsing_users = []
    for user in db_browsing_users:
        profile_picture = db_get_url_profile(user[0])

        if "url" in profile_picture:
            profile_url = url = profile_picture["url"]
        elif "error" in profile_picture:
            profile_url = url = profile_picture["error"]

        browsing_users.append(
            {
                "username": user[1],
                "firstname": user[2],
                "lastname": user[3],
                "gender": user[4],
                "sexualPreference": user[5],
                "age": user[6],
                "fameRating": user[7],
                "urlProfile": profile_url,
            }
        )

    return jsonify(browsing_users), 200


def _email_put(user_id, request):
    id_user = get_jwt_identity()

    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["email"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    db_set_user_email(id_user, json["email"])


def services_modify_email(id_user, request):
    if request.method == "PUT":
        error_msg = _email_put(id_user, request)
        if error_msg:
            return error_msg

    return {"email": db_get_user_email(id_user)}, 201


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


def _wipe_user_image(id_user):
    image_filenames = db_get_user_images(id_user)

    for image_to_delete in image_filenames:
        filename = image_to_delete.removeprefix(
            current_app.config["URL"] + "/api/images/"
        )
        if filename == "avatar.png":

            continue
        remove("uploads/" + filename)


def services_delete_me(id_user):
    _wipe_user_image(id_user)

    db = db_delete_user(id_user)

    return jsonify(db[0]), db[1]
