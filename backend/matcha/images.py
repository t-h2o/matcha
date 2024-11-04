from flask import Blueprint, send_from_directory

bp = Blueprint("images", __name__)


@bp.route("/api/images/<filename>")
def serve_image(filename):
    if filename == "avatar.png":
        return send_from_directory("../default", filename)
    return send_from_directory("../uploads", filename)
