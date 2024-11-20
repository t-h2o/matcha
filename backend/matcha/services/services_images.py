from flask import send_from_directory


def service_serve_image(filename):
    if filename == "avatar.png":
        return send_from_directory("../default", filename)
    return send_from_directory("../uploads", filename)
