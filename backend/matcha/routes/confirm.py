from flask import Blueprint

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.confirm import services_confirm, services_confirm_jwt

bp = Blueprint("confirm", __name__)


@bp.route("/api/confirm")
@jwt_required()
def get_confirm():
    id_user = get_jwt_identity()
    return services_confirm(id_user)


@bp.route("/api/confirm/<string:jwt>")
def get_confirm_jwt(jwt):
    return services_confirm_jwt(jwt)
