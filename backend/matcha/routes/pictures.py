from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.pictures import (
    services_pictures,
    services_profile_picture,
)

bp = Blueprint("pictures", __name__)


@bp.route("/api/profile-picture", methods=("PUT", "GET"))
@jwt_required()
def profile_picture():
    id_user = get_jwt_identity()
    return services_profile_picture(id_user, request)


@bp.route("/api/pictures", methods=("POST", "GET", "DELETE"))
@jwt_required()
def pictures():
    id_user = get_jwt_identity()
    return services_pictures(id_user, request)
