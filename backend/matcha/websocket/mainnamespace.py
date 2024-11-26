from flask import request
from flask_jwt_extended import decode_token
from flask_socketio import Namespace



class ConnectedUser:
    def __init__(self):
        self.sid_userid = {}

    def insert(self, sid: str, user_id: int):
        self.sid_userid.update({sid: user_id})


class MainNamespace(Namespace):
    def on_connect(self, auth):
        try:
            if not auth or "token" not in auth:
                return False

            token = auth["token"]
            if token.startswith("Bearer "):
                token = token[7:]

            try:
                decoded_token = decode_token(token)
                user_id = decoded_token.get("sub")
                self.sid_userid.update({request.sid: user_id})
                return True
            except Exception as e:
                return False

        except Exception as e:
            return False

    def on_disconnect(self):
        pass

    def on_error(self, e):
        pass

    def on_message(self, data):
        try:
            print("Received message:", data)
            socketio.emit("response", "Server received your message: " + str(data))
        except Exception as e:
            print("Error handling message:", str(e))
