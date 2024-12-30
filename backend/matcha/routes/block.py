from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.block import services_block_post

bp = Blueprint("block", __name__)


@bp.route("/api/block", methods=["POST"])
@jwt_required()
def interests():
    id_user = get_jwt_identity()
    return services_block_post(id_user, request)
