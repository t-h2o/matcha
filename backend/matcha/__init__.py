from flask import Flask

from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager,
)

from matcha import app as approute
#from matcha.app import app as approute

def create_app():
    app = Flask(__name__)

#   app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
#   app.config["UPLOAD_FOLDER"] = environ["FLASK_UPLOAD_FOLDER"]
#   app.config["URL"] = environ["FLASK_URL"]

    app.config["JWT_SECRET_KEY"] = "1234"
    app.config["UPLOAD_FOLDER"] = "uploads"
    app.config["URL"] = "http://localhost:5001"

    CORS(app, origins="http://localhost:4200")

    jwt = JWTManager(app)

    app.register_blueprint(approute.bp)

    return app
