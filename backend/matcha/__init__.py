from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from os import environ
from flask_jwt_extended import JWTManager, decode_token

from matcha.websocket.main_namespace import MainNamespace

from matcha.routes import init_routes


def create_app():
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
    app.config["UPLOAD_FOLDER"] = environ["FLASK_UPLOAD_FOLDER"]
    app.config["URL"] = environ["FLASK_URL"]
    app.config["SECRET_KEY"] = "your_secret_key"

    init_routes(app)

    CORS(
        app,
        resources={
            r"/*": {
                "origins": ["http://localhost:4200"],
                "allow_credentials": True,
                "methods": ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
            }
        },
    )

    socketio = SocketIO(
        app,
        cors_allowed_origins="http://localhost:4200",
        async_mode="threading",
        ping_timeout=60000,
        logger=True,
        engineio_logger=True,
    )

    jwt = JWTManager(app)

    socketio.on_namespace(MainNamespace("/"))

    @app.before_request
    def before_request():
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
        if request.method.lower() == "options":
            return jsonify(headers), 200

    return app
