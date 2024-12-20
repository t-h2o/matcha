from flask_socketio import emit

from matcha.websocket.socket_manager import SocketManager


def ws_send_notification(id_user: int, title: str, content: str):
    notification_message = {
        "content": content,
        "title": title,
    }

    sid = SocketManager().get_sid(id_user)

    if sid is not None:
        emit(title, notification_message, to=sid, namespace="/")
