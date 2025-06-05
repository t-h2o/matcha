from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.auth import (
    service_login_user,
    services_reset_password,
    services_reset_password_jwt,
    services_modify_password,
)

bp = Blueprint("auth", __name__)


@bp.route("/api/login", methods=["POST"])
def login_user():
    return service_login_user(request)


@bp.route("/api/reset-password", methods=["POST"])
def reset_password():
    return services_reset_password(request)


@bp.route("/api/modify-password", methods=["PUT"])
@jwt_required()
def modify_password():
    id_user = get_jwt_identity()
    return services_modify_password(id_user, request)


@bp.route("/api/reset-password/<string:jwt>", methods=["POST"])
def reset_password_jwt(jwt):
    return services_reset_password_jwt(request, jwt)
