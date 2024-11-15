from flask import Flask
from flask_socketio import SocketIO, emit

from flask_cors import CORS


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
CORS(app, origins="http://localhost:4200")
socketio = SocketIO(app, cors_allowed_origins="*")


from sys import stderr


def flaskprint(message):
    print(message, file=stderr)


@app.route("/asdf")
def index():
    return "index.html"


@socketio.on("my event")
def test_message(message):
    emit("my response", {"data": message["data"]})


@socketio.on("my broadcast event")
def test_message(message):
    emit("my response", {"data": message["data"]}, broadcast=True)


@socketio.on("connect")
def test_connect():
    flaskprint("connnect")
    emit("my response", {"data": "Connected"})


@socketio.on("disconnect")
def test_disconnect():
    print("Client disconnected")


if __name__ == "__main__":
    socketio.run(app, allow_unsafe_werkzeug=True)
