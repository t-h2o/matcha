from matcha.db.utils import (
    db_fetchone,
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
