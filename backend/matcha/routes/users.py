from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.users import (
    services_delete_me,
    services_modify_email,
)


bp = Blueprint("users", __name__)


@bp.route("/api/email", methods=("PUT", "GET"))
@jwt_required()
def modify_email():
    id_user = get_jwt_identity()
    return services_modify_email(id_user, request)


@bp.route("/api/deleteme")
@jwt_required()
def delete_me():
    id_user = get_jwt_identity()
    return services_delete_me(id_user)
