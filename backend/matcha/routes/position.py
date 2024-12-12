from flask import Blueprint, request, jsonify

from matcha.app_utils import check_request_json

from matcha.services.position import service_position

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

bp = Blueprint("position", __name__)


@bp.route("/api/position", methods=("GET", "POST"))
@jwt_required()
def login_user():
    id_user = get_jwt_identity()
    return service_position(id_user, request)
