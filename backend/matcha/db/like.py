from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


def db_get_list_liked_by(id_user: int):
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


def db_get_is_liked(id_user: int, username: str) -> bool:
    bool_answer = db_fetchone(
        """
        SELECT
        CASE WHEN EXISTS
        (
          SELECT * FROM user_likes
            WHERE liker_id = %s
            AND liked_id = (SELECT users.id FROM users WHERE username = %s)
        )
        THEN 'TRUE'
        ELSE 'FALSE'
        END;
    """,
        (
            id_user,
            username,
        ),
    )

    if bool_answer[0] == "TRUE":
        return True
    else:
        return False


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

    if (
        error_msg
        and "error" in error_msg
        and error_msg["error"].startswith("UniqueViolation")
    ):
        return
    return error_msg


def db_put_dislike_user(id_user, username):
    query = """
    DELETE FROM user_likes
    WHERE liker_id = %s
    AND liked_id = (SELECT users.id FROM users WHERE username = %s);
    """

    error_msg = db_query(
        query,
        (
            id_user,
            username,
        ),
    )

    if (
        error_msg
        and "error" in error_msg
        and error_msg["error"].startswith("UniqueViolation")
    ):
        return
    return error_msg
