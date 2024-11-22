from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


def db_get_liker_username(id_user):
    query = """
    SELECT username FROM users
    WHERE users.id
    IN
    (
      SELECT liker_id FROM user_likes where liked_id = %s
    );
    """

    liker_username = db_fetchall(query, (id_user,))

    return fetchall_to_array(liker_username)


def db_put_like_user(id_user, username):
    query = """
    INSERT INTO user_likes
    (
      liker_id,
      liked_id
    )
    VALUES
    (
      %s,
      (SELECT users.id FROM users WHERE username = %s)
    );
    """

    error_msg = db_query(
        query,
        (
            id_user,
            username,
        ),
    )

    if error_msg:
        return error_msg
