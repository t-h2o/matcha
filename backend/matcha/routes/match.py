from flask import Blueprint

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.match import services_match

bp = Blueprint("match", __name__)


@bp.route("/api/match")
@jwt_required()
def post_match():
    id_user = get_jwt_identity()
    return services_match(id_user)
