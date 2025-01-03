from matcha.db.utils import (
    db_query,
    db_fetchone,
)


def db_put_fake_user(id_user, username):
    query = """
    INSERT INTO user_fake
    (
      user_id,
      fake_id
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


def db_put_unfake_user(id_user, username):
    query = """
    DELETE FROM user_fake
    WHERE user_id = %s
    AND fake_id = (SELECT users.id FROM users WHERE username = %s);
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


def db_get_is_faked(id_user: int, id_fake: int) -> bool:
    bool_answer = db_fetchone(
        """
        SELECT
        CASE WHEN EXISTS
        (
          SELECT * FROM user_fake
            WHERE user_id = %s
            AND fake_id = %s
        )
        THEN 'TRUE'
        ELSE 'FALSE'
        END;
    """,
        (
            id_user,
            id_fake,
        ),
    )

    if bool_answer[0] == "TRUE":
        return True
    else:
        return False
