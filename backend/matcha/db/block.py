from matcha.db.utils import (
    db_query,
    db_fetchone,
    db_fetchall,
)


def db_put_block_user(id_user, username):
    query = """
    INSERT INTO user_blocked
    (
      user_id,
      blocked_id
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


def db_put_unblock_user(id_user, username):
    query = """
    DELETE FROM user_blocked
    WHERE user_id = %s
    AND blocked_id = (SELECT users.id FROM users WHERE username = %s);
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


def db_get_is_blocked(id_user: int, id_block: int) -> bool:
    bool_answer = db_fetchone(
        """
        SELECT
        CASE WHEN EXISTS
        (
          SELECT * FROM user_blocked
            WHERE user_id = %s
            AND blocked_id = %s
        )
        THEN 'TRUE'
        ELSE 'FALSE'
        END;
    """,
        (
            id_user,
            id_block,
        ),
    )

    if bool_answer[0] == "TRUE":
        return True
    else:
        return False
