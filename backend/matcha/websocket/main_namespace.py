from flask import request
from flask_jwt_extended import decode_token
from flask_socketio import Namespace, emit

from matcha.utils import flaskprint

from matcha.websocket.socket_manager import SocketManager


class ConnectedUser:
    def __init__(self):
        self.sid_userid = {}

    def insert(self, sid: str, user_id: int):
        self.sid_userid.update({sid: user_id})


class MainNamespace(Namespace):
    def on_connect(self, auth):
        flaskprint(SocketManager())
        try:
            if not auth or "token" not in auth:
                return False

            token = auth["token"]
            if token.startswith("Bearer "):
                token = token[7:]

            try:
                decoded_token = decode_token(token)
                user_id = decoded_token.get("sub")
                SocketManager().add_session(request.sid, user_id)
                return True
            except Exception as e:
                flaskprint(f"--- Connection error: {str(e)}")
                return False

        except Exception as e:
            flaskprint(f"--- Connection error: {str(e)}")
            return False

    def on_disconnect(self):
        try:
            SocketManager.remove_session(request.sid)
        except Exception as e:
            flaskprint("Error handling message:" + str(e))

    def on_error(self, e):
        flaskprint("--- SocketIO error:", str(e))
