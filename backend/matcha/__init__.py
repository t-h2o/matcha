from os import environ

from flask import Flask

from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager,
)

from matcha import users
from matcha import auth
from matcha import images
from matcha import interests
from matcha import pictures


def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
    app.config["UPLOAD_FOLDER"] = environ["FLASK_UPLOAD_FOLDER"]
    app.config["URL"] = environ["FLASK_URL"]

    CORS(app, origins="http://localhost:4200")

    jwt = JWTManager(app)

    app.register_blueprint(users.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(images.bp)
    app.register_blueprint(interests.bp)
    app.register_blueprint(pictures.bp)

    return app
