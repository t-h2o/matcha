from flask import Blueprint, request, jsonify

from matcha.app_utils import check_request_json

from matcha.services.auth import service_login_user, services_reset_password

bp = Blueprint("auth", __name__)


@bp.route("/api/login", methods=["POST"])
def login_user():
    return service_login_user(request)


@bp.route("/api/reset-password", methods=["POST"])
def reset_password():
    return services_reset_password(request)
