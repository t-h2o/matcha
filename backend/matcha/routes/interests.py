from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.db import db_set_interests

from matcha.services.interests import services_interests
from matcha.services.interests import services_put_interests

bp = Blueprint("interests", __name__)


@bp.route("/api/interests", methods=("PUT", "GET"))
@jwt_required()
def interests():
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = services_put_interests(id_user, request)
        if error_msg:
            return error_msg

    return services_interests(id_user)
