from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.profile import (
    services_profile,
)


bp = Blueprint("profile", __name__)


@bp.route("/api/profile", methods=("PUT", "GET"))
@jwt_required()
def profile():
    id_user = get_jwt_identity()
    return services_profile(id_user, request)
