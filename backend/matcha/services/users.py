from os import remove

from flask import jsonify, current_app

from flask_jwt_extended import (
    get_jwt_identity,
)

from matcha.utils import check_request_json

from matcha.db.pictures import (
    db_get_user_images,
)

from matcha.db.user import (
    db_delete_user,
    db_get_user_email,
    db_set_user_email,
)

from matcha.utils import check_request_json


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


def _wipe_user_image(id_user):
    image_filenames = db_get_user_images(id_user)

    for image_to_delete in image_filenames:
        filename = image_to_delete.removeprefix(
            current_app.config["URL"] + "/api/images/"
        )
        if filename == "avatar.png":

            continue
        try:
            remove("uploads/" + filename)
        except:
            pass


def services_delete_me(id_user):
    _wipe_user_image(id_user)

    db = db_delete_user(id_user)

    return jsonify(db[0]), db[1]
