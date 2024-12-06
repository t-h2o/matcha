from flask import Blueprint

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.notification import services_notification

bp = Blueprint("notification", __name__)


@bp.route("/api/notification")
@jwt_required()
def interests():
    id_user = get_jwt_identity()
    return services_notification(id_user)
