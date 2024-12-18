from matcha.db.utils import (
    db_fetchone,
    db_query,
)


def db_get_last_connection(id_user: int) -> str:
    query = """
    SELECT last_connection_at
    FROM users
    WHERE
    id = %s
    ;
    """

    return db_fetchone(query, (id_user,))[0].timestamp()


def db_update_last_connection(id_user: int) -> str:
    query = """
    UPDATE
    users
    SET
    last_connection_at
    =
    now()
    WHERE
    id = %s
    ;
    """

    return db_query(query, (id_user,))
