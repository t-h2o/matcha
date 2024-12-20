from flask_socketio import emit

from matcha.websocket.socket_manager import SocketManager

from matcha.db.utils import (
    db_query,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


# def db_get_notification(id_user) -> list:
def db_get_notification(id_user):
    query = """
    SELECT id,title,content,created_at
    FROM notification
    WHERE user_id = %s ;
    """

    notifications = db_fetchall(query, (id_user,))

    array = []
    for id_notification, title, content, timestamp in notifications:
        array.append(
            {
                "id": id_notification,
                "title": title,
                "content": content,
                "timestamp": timestamp.timestamp(),
            }
        )

    return array


def ws_send_notification(id_user: int, title: str, content: str):
    notification_message = {
        "content": content,
        "title": title,
    }

    sid = SocketManager().get_sid(id_user)

    if sid is not None:
        emit(title, notification_message, to=sid, namespace="/")


def db_put_notification(id_user, title: str, content: str):
    query = """
    INSERT
    INTO notification
    (user_id, title, content)
    VALUES
    (%s, %s, %s);
    """

    ws_send_notification(id_user, title, content)

    error_msg = db_query(
        query,
        (
            id_user,
            title,
            content,
        ),
    )

    if error_msg:
        return error_msg


def db_destroy_notification(id_user: int, id_notification: int):
    query = """
    DELETE
    FROM notification
    WHERE user_id = %s
    AND id = %s;
    """

    error_msg = db_query(
        query,
        (
            id_user,
            id_notification,
        ),
    )

    if error_msg:
        return error_msg
