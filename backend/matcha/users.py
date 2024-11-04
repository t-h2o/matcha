from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

from matcha.app_utils import check_request_json

from matcha.db import db_set_user_profile_data, db_get_user_per_id

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
