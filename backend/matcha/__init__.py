from os import environ

from flask import Flask

from flask_socketio import SocketIO

from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager,
)

if __name__ == "__main__":
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
    app.config["UPLOAD_FOLDER"] = environ["FLASK_UPLOAD_FOLDER"]
    app.config["URL"] = environ["FLASK_URL"]
    app.config["SECRET_KEY"] = "your_secret_key"  # Replace with your own secret key

    socketio = SocketIO(app)

    CORS(app, origins="http://localhost:4200")

    jwt = JWTManager(app)

    @socketio.on("connect")
    def handle_connect():
        print("Client connected")

    @socketio.on("message")
    def handle_message(data):
        print("Received message:", data)
        socketio.emit("response", "Server received your message: " + data)

    SocketIO.run(app)
