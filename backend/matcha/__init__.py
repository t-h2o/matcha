from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from os import environ
from flask_jwt_extended import JWTManager

from matcha.routers import init_routes


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

    @socketio.on("connect")
    def handle_connect():
        print("Client connected")

    @socketio.on("disconnect")
    def handle_disconnect():
        print("Client disconnected")

    @socketio.on_error()
    def error_handler(e):
        print("SocketIO error:", str(e))

    @socketio.on("message")
    def handle_message(data):
        try:
            print("Received message:", data)
            socketio.emit("response", "Server received your message: " + str(data))
        except Exception as e:
            print("Error handling message:", str(e))
            print("Error handling message:", str(e))

    return app


# Create a separate run file, say run.py in the backend directory
