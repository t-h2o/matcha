from flask import Blueprint

import matcha.routes.users
import matcha.routes.auth
import matcha.routes.images
import matcha.routes.interests
import matcha.routes.pictures


def init_routes(app):
    app.register_blueprint(users.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(images.bp)
    app.register_blueprint(interests.bp)
    app.register_blueprint(pictures.bp)
