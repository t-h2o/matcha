from flask import request
from flask_jwt_extended import decode_token
from flask_socketio import Namespace

from matcha.utils import flaskprint

from matcha.db.last_connection import db_update_last_connection

from matcha.websocket.socket_manager import SocketManager


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
            db_update_last_connection(SocketManager.get_user_id(request.sid))
            SocketManager.remove_session(request.sid)
        except Exception as e:
            flaskprint("Error handling message:" + str(e))

    def on_error(self, e):
        flaskprint("--- SocketIO error:", str(e))
