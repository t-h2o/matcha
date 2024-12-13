from matcha.db.utils import (
    db_query,
    db_fetchone,
    db_fetchall,
)


def db_get_chat(id_user, id_other, username_getter, username_other):
    query = """
    SELECT id_sender, message, created_at FROM chat
    WHERE id_sender = %s
    AND id_receiver = %s
    UNION
    SELECT id_sender, message, created_at FROM chat
    WHERE id_sender = %s
    AND id_receiver = %s
    ORDER BY created_at;
    """

    chats = db_fetchall(query, (id_user, id_other, id_other, id_user))

    array = []
    for id_sender, message, timestamp in chats:
        if id_sender == id_user:
            sender = username_getter
        else:
            sender = username_other

        array.append(
            {
                "sender": sender,
                "timestamp": timestamp.timestamp(),
                "message": message,
            }
        )

    return array


def db_post_chat(id_user: int, username, message: str):
    query = """
    INSERT
    INTO chat
    (
        id_sender,
        id_receiver,
        message
    )
    VALUES
    (
        %s,
        (SELECT users.id FROM users WHERE username = %s),
        %s
    );
    """

    error_msg = db_query(
        query,
        (
            id_user,
            username,
            message,
        ),
    )

    if error_msg is not None:
        return error_msg

    query = """
    SELECT users.username, message, chat.created_at
    FROM chat
    INNER JOIN users
    ON chat.id_sender = users.id
    WHERE id_sender = %s
    ORDER BY created_at DESC
    LIMIT 1;
    """

    last_message = db_fetchone(
        query,
        (id_user,),
    )

    return {
        "sender": last_message[0],
        "timestamp": last_message[2].timestamp(),
        "message": last_message[1],
    }
