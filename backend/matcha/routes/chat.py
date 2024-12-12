from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from matcha.services.chat import services_chat_post, services_chat_get

bp = Blueprint("chat", __name__)


@bp.route("/api/chat", methods=["POST"])
@jwt_required()
def post_chat():
    id_user = get_jwt_identity()
    return services_chat_post(id_user, request)


@bp.route("/api/chat/<string:username>")
@jwt_required()
def get_chat(username):
    id_user = get_jwt_identity()
    return services_chat_get(id_user, username)
