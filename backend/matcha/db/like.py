from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


def db_put_like_user(id_user, username):
    query = """
    INSERT INTO user_likes
    (
      liker_id,
      liked_id
    )
    VALUES
    (
      id_user,
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
