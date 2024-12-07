from flask import Blueprint

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.notification import (
    services_notification,
    services_delete_notification,
)

bp = Blueprint("notification", __name__)


@bp.route("/api/notification")
@jwt_required()
def get_notification():
    id_user = get_jwt_identity()
    return services_notification(id_user)


@bp.route("/api/notification/<int:id_notification>/")
@jwt_required()
def delete_notification(id_notification):
    id_user = get_jwt_identity()
    return services_delete_notification(id_user, id_notification)
