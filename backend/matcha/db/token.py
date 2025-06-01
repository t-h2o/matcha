from matcha.db.utils import (
    db_query,
    db_fetchone,
)


def db_check_token_used(token) -> bool:
    id = db_fetchone("SELECT id FROM token_used WHERE token = %s", (token,))
    if id is None:
        return False
    return True


def db_add_token_used(token):
    return db_query("INSERT INTO token_used (token) VALUES (%s)", (token,))
