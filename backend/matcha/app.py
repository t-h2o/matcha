from os import path, remove

from flask import request, jsonify
from flask import current_app

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from werkzeug.utils import secure_filename

from matcha.app_utils import (
    check_request_json,
    check_request_json_values,
    make_unique,
    get_profile_picture_name,
    flaskprint,
)

from matcha.db import (
    db_get_interests,
    db_set_interests,
    db_register,
    db_set_user_email,
    db_get_user_email,
    db_get_url_profile,
    db_delete_user,
    db_upload_pictures,
    db_get_user_images,
    db_set_profile_picture,
    db_count_number_image,
)

from flask import Blueprint

bp = Blueprint("appbp", __name__)


def interests_put(id_user, request):
    json = request.json

    check_request = check_request_json_values(
        request.headers.get("Content-Type"),
        json,
        ["interests"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    db_set_interests(id_user, json["interests"])


@bp.route("/api/interests", methods=("PUT", "GET"))
@jwt_required()
def interests():
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = interests_put(id_user, request)
        if error_msg:
            return error_msg

    interests = db_get_interests(id_user)

    return jsonify({"interests": interests}), 201


def modify_profile_picture_put(id_user, request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["selectedPictures"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    image_filenames = db_get_user_images(id_user)

    profile_picture_name = get_profile_picture_name(
        id_user, json["selectedPictures"], image_filenames
    )

    db_set_profile_picture(id_user, profile_picture_name)

    if profile_picture_name is None:
        return jsonify({"error": "cannot find the profile picture"}), 401


@bp.route("/api/modify-profile-picture", methods=("PUT", "GET"))
@jwt_required()
def modify_profile_picture():
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = modify_profile_picture_put(id_user, request)
        if error_msg:
            return error_msg

    profile_picture_name = db_get_url_profile(id_user)

    return jsonify({"selectedPicture": profile_picture_name}), 201


def picture_post(user_id, request):
    number_of_picture = db_count_number_image(user_id)

    available_picture = 5 - number_of_picture[0]

    list_pictures = request.files.getlist("pictures")

    if len(list_pictures) > available_picture:
        return jsonify({"error": "too many pictures"}), 401

    filenames = []
    for item in list_pictures:
        filename = str(user_id) + "_" + make_unique(secure_filename(item.filename))
        item.save(path.join(current_app.config["UPLOAD_FOLDER"], filename))
        filenames.append(current_app.config["URL"] + "/api/images/" + filename)

    db_upload_pictures(user_id, filenames)


@bp.route("/api/pictures", methods=("POST", "GET"))
@jwt_required()
def modify_pictures():
    id_user = get_jwt_identity()

    if request.method == "POST":
        error_msg = picture_post(id_user, request)
        if error_msg:
            return error_msg

    return {"pictures": db_get_user_images(id_user)}, 201


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
