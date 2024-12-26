from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchall,
    fetchall_to_array,
)


def db_get_interests(id_user):
    query = """
    SELECT name FROM interests
    WHERE id IN (SELECT interest_id FROM user_interests where user_id = %s)
    ORDER BY name;
    """

    interests = db_fetchall(query, (id_user,))

    return fetchall_to_array(interests)


def db_set_interests(id_user, interests):
    # delete all entry for the user
    # that will avoid to check where is there duplicate / old entry

    db_query("DELETE from user_interests where user_id = (%s);", (id_user,))

    query = """
    INSERT INTO user_interests
    (
      user_id,
      interest_id
    )
    VALUES (
    (SELECT users.id FROM users WHERE id = %s),
    (SELECT interests.id FROM interests WHERE name = %s));
    """

    db_query_for(query, id_user, interests)
