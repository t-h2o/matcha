from matcha.db.utils import (
    db_fetchall,
    fetchall_to_array,
)


def db_get_match(id_user: int):
    query = """
    SELECT users.username
    FROM user_likes a
    INNER JOIN user_likes b
    ON a.liked_id = b.liker_id
    INNER JOIN users
    ON b.liker_id = users.id
    WHERE a.liker_id = b.liked_id
    AND b.liked_id = %s
    ;
    """

    liker_username = db_fetchall(
        query,
        (id_user,),
    )

    return fetchall_to_array(liker_username)
