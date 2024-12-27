from flask import Blueprint

import matcha.routes.block
import matcha.routes.users
import matcha.routes.browsing
import matcha.routes.chat
import matcha.routes.fake
import matcha.routes.auth
import matcha.routes.match
import matcha.routes.position
import matcha.routes.images
import matcha.routes.interests
import matcha.routes.notification
import matcha.routes.pictures
import matcha.routes.profile
import matcha.routes.like
import matcha.routes.register


def init_routes(app):
    app.register_blueprint(block.bp)
    app.register_blueprint(users.bp)
    app.register_blueprint(browsing.bp)
    app.register_blueprint(chat.bp)
    app.register_blueprint(fake.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(match.bp)
    app.register_blueprint(position.bp)
    app.register_blueprint(images.bp)
    app.register_blueprint(interests.bp)
    app.register_blueprint(notification.bp)
    app.register_blueprint(pictures.bp)
    app.register_blueprint(profile.bp)
    app.register_blueprint(like.bp)
    app.register_blueprint(register.bp)
