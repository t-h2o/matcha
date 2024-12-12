from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.pictures import (
    services_modify_pictures,
    services_modify_profile_picture,
)

bp = Blueprint("pictures", __name__)


@bp.route("/api/modify-profile-picture", methods=("PUT", "GET"))
@jwt_required()
def modify_profile_picture():
    id_user = get_jwt_identity()
    return services_modify_profile_picture(id_user, request)


@bp.route("/api/pictures", methods=("POST", "GET", "DELETE"))
@jwt_required()
def modify_pictures():
    id_user = get_jwt_identity()
    return services_modify_pictures(id_user, request)
