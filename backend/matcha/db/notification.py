from matcha.db.utils import (
    db_query,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


# def db_get_notification(id_user) -> list:
def db_get_notification(id_user):
    query = """
    SELECT title,content,created_at
    FROM notification
    WHERE user_id = %s ;
    """

    notifications = db_fetchall(query, (id_user,))

    array = []
    for title, content, timestamp in notifications:
        array.append({"title": title, "content": content, "timestamp": timestamp})

    return array


def db_put_notification(id_user, title: str, content: str):
    query = """
    INSERT
    INTO notification
    (user_id, title, content)
    VALUES
    (%s, %s, %s);
    """

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
