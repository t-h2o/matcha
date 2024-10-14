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
from matcha import emails


def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
    app.config["UPLOAD_FOLDER"] = environ["FLASK_UPLOAD_FOLDER"]
    app.config["URL"] = environ["FLASK_URL"]

    app.config["MAIL_USER"] = environ["MAIL_USER"]
    app.config["MAIL_SMTP"] = environ["MAIL_SMTP"]
    app.config["MAIL_PASSWORD"] = environ["MAIL_PASSWORD"]
    app.config["MAIL_TEST"] = environ["MAIL_TEST"]

    CORS(app, origins="http://localhost:4200")

    jwt = JWTManager(app)

    app.register_blueprint(users.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(images.bp)
    app.register_blueprint(interests.bp)
    app.register_blueprint(pictures.bp)
    app.register_blueprint(emails.bp)

    return app
