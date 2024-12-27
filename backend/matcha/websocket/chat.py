from flask_socketio import emit

from matcha.websocket.socket_manager import SocketManager


def ws_send_chat(id_user: int, chat: dict):
    sid = SocketManager().get_sid(id_user)

    if sid is not None:
        emit("chat-object", chat, to=sid, namespace="/")
