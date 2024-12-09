from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


def _get_query(search) -> str:
    query = """
        SELECT id, username, firstname, lastname, gender, sexual_orientation, age, fame_rating
        FROM users
        WHERE sexual_orientation = %s
          AND gender = %s
          AND id != %s
    """

    if search["max_fame"] is not None:
        query += " AND fame_rating BETWEEN %s AND %s"

    if search["max_age"] is not None:
        query += " AND age BETWEEN %s AND %s"

    return query


def _get_parameters(id_user: int, search: dict) -> list:
    parameters = []

    parameters.append(search["sexual_orientation"])
    parameters.append(search["gender"])
    parameters.append(id_user)

    if search["max_fame"] is not None:
        parameters.append(search["min_fame"])
        parameters.append(search["max_fame"])

    if search["max_age"] is not None:
        parameters.append(search["min_age"])
        parameters.append(search["max_age"])

    return list(parameters)


def db_browsing_gender_sexualorientation(id_user, search):
    query = _get_query(search)
    parameters = _get_parameters(id_user, search)

    return db_fetchall(query, parameters)
