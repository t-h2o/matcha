from os import path
from flask import jsonify

from flask import current_app

from werkzeug.utils import secure_filename

from matcha.utils import check_request_json, make_unique

from matcha.db.pictures import (
    db_get_user_images,
    db_upload_pictures,
    db_set_profile_picture,
    db_get_url_profile,
    db_count_number_image,
    db_delete_pictures,
)


def _modify_profile_picture_put(id_user, request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["selectedPictures"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    return db_set_profile_picture(id_user, json["selectedPictures"])


def services_profile_picture(id_user, request):
    if request.method == "PUT":
        error_msg = _modify_profile_picture_put(id_user, request)
        if error_msg:
            return error_msg

    profile_picture_name = db_get_url_profile(id_user)

    if "url" in profile_picture_name:
        return jsonify({"selectedPicture": profile_picture_name["url"]}), 201
    elif "error" in profile_picture_name:
        return jsonify(profile_picture_name), 401
    else:
        return jsonify({"error": "error"}), 401


def picture_post(user_id, request):
    number_of_picture = db_count_number_image(user_id)

    if number_of_picture[0] == 0:
        set_first_picture_profile: bool = True
    else:
        set_first_picture_profile: bool = False

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

    if set_first_picture_profile:
        db_set_profile_picture(user_id, filenames[0])


def picture_delete(id_user: int, request):
    check_request = check_request_json(
        request.headers.get("Content-Type"),
        request.json,
        ["url"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    db_delete_pictures(id_user, request.json["url"])


def services_pictures(id_user, request):
    if request.method == "POST":
        error_msg = picture_post(id_user, request)
        if error_msg:
            return error_msg

    elif request.method == "DELETE":
        error_msg = picture_delete(id_user, request)
        if error_msg:
            return error_msg

    return {"pictures": db_get_user_images(id_user)}, 201
