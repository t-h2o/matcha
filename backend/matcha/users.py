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

from matcha.db import (
    db_register,
    db_set_user_email,
    db_get_user_email,
    db_delete_user,
    db_get_user_images,
    db_set_user_profile_data,
    db_get_user_per_id,
)

from matcha.app_utils import check_request_json


bp = Blueprint("users", __name__)


def users_put(id_user, request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["firstname", "lastname", "selectedGender", "sexualPreference", "bio"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    return db_set_user_profile_data(
        json["firstname"],
        json["lastname"],
        json["selectedGender"],
        json["sexualPreference"],
        json["bio"],
        id_user,
    )


@bp.route("/api/users", methods=("PUT", "GET"))
@jwt_required()
def users():
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = users_put(id_user, request)
        if error_msg:
            return error_msg

    user_db = db_get_user_per_id(id_user)

    return (
        jsonify(
            firstname=user_db[0],
            lastname=user_db[1],
            selectedGender=user_db[2],
            sexualPreference=user_db[3],
            bio=user_db[4],
        ),
        200,
    )


def email_put(user_id, request):
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


@bp.route("/api/email", methods=("PUT", "GET"))
@jwt_required()
def modify_email():
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = email_put(id_user, request)
        if error_msg:
            return error_msg

    return {"email": db_get_user_email(id_user)}, 201


@bp.route("/api/register", methods=["POST"])
def register_user():

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


def wipe_user_image(id_user):
    image_filenames = db_get_user_images(id_user)

    for image_to_delete in image_filenames:
        filename = image_to_delete.removeprefix(
            current_app.config["URL"] + "/api/images/"
        )
        if filename == "avatar.png":

            continue
        remove("uploads/" + filename)


@bp.route("/api/deleteme")
@jwt_required()
def delete_me():
    id_user = get_jwt_identity()

    wipe_user_image(id_user)

    db = db_delete_user(id_user)

    return jsonify(db[0]), db[1]
