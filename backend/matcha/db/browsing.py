from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)

from matcha.app_utils import flaskprint

# fitness ,music ,photography ,yoga ,reading ,cooking ,fashion ,meditation ,dance ,


def _get_query(search) -> str:
    query = """
        SELECT u.id, u.username, u.firstname, u.lastname, u.gender, u.sexual_orientation, u.age, u.fame_rating
        FROM users u
        JOIN user_interests ui ON u.id = ui.user_id
        JOIN interests i ON ui.interest_id = i.id
        WHERE sexual_orientation = %s
          AND u.gender = %s
          AND u.id != %s
    """

    if search["max_fame"] is not None:
        query += " AND u.fame_rating BETWEEN %s AND %s"

    if search["max_age"] is not None:
        query += " AND u.age BETWEEN %s AND %s"

    if search["interests"] is not None:
        query += " AND i.name = ANY(%s)"

    query += """
        GROUP BY u.id, u.username, u.firstname, u.lastname, u.gender, u.sexual_orientation, u.age, u.fame_rating
    """

    if search["interests"] is not None:
        query += " HAVING COUNT(DISTINCT i.id) = 3"

    query += " ORDER BY u.id;"

    flaskprint(query)
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

    if search["interests"] is not None:
        parameters.append(search["interests"])

    return list(parameters)


def db_browsing_gender_sexualorientation(id_user, search):
    query = _get_query(search)
    parameters = _get_parameters(id_user, search)

    return db_fetchall(query, parameters)


# SELECT u.id, u.name
# FROM users u
# JOIN user_interests ui ON u.id = ui.user_id
# JOIN interests i ON ui.interest_id = i.id
# WHERE i.interest_name IN ('interest1', 'interest2', 'interest3')
# GROUP BY u.id, u.name
# HAVING COUNT(DISTINCT i.id) = 3;
