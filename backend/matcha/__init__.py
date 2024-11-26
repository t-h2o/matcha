from flask import Flask, request
from flask_socketio import SocketIO
from flask_cors import CORS
from os import environ
from flask_jwt_extended import JWTManager, decode_token

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

    sid_userid = {}

    @socketio.on("connect")
    def handle_connect(auth):
        try:
            if not auth or "token" not in auth:
                print("No auth token provided")
                return False

            token = auth["token"]
            if token.startswith("Bearer "):
                token = token[7:]

            try:
                decoded_token = decode_token(token)
                user_id = decoded_token.get("sub")
                print(f"Client connected - User ID: {user_id}")
                sid_userid.update({request.sid: user_id})
                return True
            except Exception as e:
                print(f"Token verification failed: {str(e)}")
                return False

        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False

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
