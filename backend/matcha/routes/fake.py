from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.fake import services_fake_post

bp = Blueprint("fake", __name__)


@bp.route("/api/fake", methods=["POST"])
@jwt_required()
def interests():
    id_user = get_jwt_identity()
    return services_fake_post(id_user, request)
