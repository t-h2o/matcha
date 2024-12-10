from flask import Blueprint, request

from matcha.services.register import services_register

bp = Blueprint("register", __name__)


@bp.route("/api/register", methods=["POST"])
def register_user():
    return services_register(request)
