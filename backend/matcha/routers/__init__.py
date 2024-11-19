from flask import Blueprint

import matcha.routers.users
import matcha.routers.auth
import matcha.routers.images
import matcha.routers.interests
import matcha.routers.pictures


def init_routes(app):
    app.register_blueprint(users.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(images.bp)
    app.register_blueprint(interests.bp)
    app.register_blueprint(pictures.bp)
