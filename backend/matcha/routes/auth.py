from flask import Blueprint, request, jsonify

from matcha.app_utils import check_request_json

from matcha.services.auth import service_login_user, Login

bp = Blueprint("auth", __name__)


@bp.route("/api/login", methods=["POST"])
def login_user():
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username", "password"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    return service_login_user(Login(json["username"], json["password"]))


@bp.route("/api/reset-password", methods=["POST"])
def reset_password():
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    # TODO sent email recovery password

    return jsonify({"success": "email with password reset link sent"}), 201
