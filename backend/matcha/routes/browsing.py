from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.browsing import (
    services_browsing,
)


bp = Blueprint("browsing", __name__)


@bp.route("/api/browsing", methods=["POST"])
@jwt_required()
def browsing_browsing():
    id_user = get_jwt_identity()
    return services_browsing(id_user, request)
