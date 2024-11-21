from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.like import services_like_user

bp = Blueprint("like", __name__)


@bp.route("/api/like-user", methods=["POST"])
@jwt_required()
def interests():
    id_user = get_jwt_identity()
    return services_like_user(id_user, request)
