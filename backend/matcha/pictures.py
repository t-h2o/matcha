from os import path, remove
from flask import Blueprint, request, jsonify

from flask import current_app

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from werkzeug.utils import secure_filename

from matcha.app_utils import check_request_json, make_unique

from matcha.db import (
    db_upload_pictures,
    db_get_user_images,
    db_set_profile_picture,
    db_get_url_profile,
    db_get_user_images,
    db_count_number_image,
)

bp = Blueprint("pictures", __name__)


def modify_profile_picture_put(id_user, request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["selectedPictures"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    return db_set_profile_picture(id_user, json["selectedPictures"])


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
