from flask import Blueprint, request

from matcha.services.auth import (
    service_login_user,
    services_reset_password,
    services_reset_password_jwt,
)

bp = Blueprint("auth", __name__)


@bp.route("/api/login", methods=["POST"])
def login_user():
    return service_login_user(request)


@bp.route("/api/reset-password", methods=["POST"])
def reset_password():
    return services_reset_password(request)


@bp.route("/api/reset-password/<string:jwt>", methods=["POST"])
def reset_password_jwt(jwt):
    return services_reset_password_jwt(request, jwt)
