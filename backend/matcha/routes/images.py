from flask import Blueprint

from matcha.services.services_images import service_serve_image

bp = Blueprint("images", __name__)


@bp.route("/api/images/<filename>")
def serve_image(filename):
    return service_serve_image(filename)
