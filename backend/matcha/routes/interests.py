from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.interests import services_interests

bp = Blueprint("interests", __name__)


@bp.route("/api/interests", methods=("PUT", "GET"))
@jwt_required()
def interests():
    id_user = get_jwt_identity()
    return services_interests(id_user, request)
