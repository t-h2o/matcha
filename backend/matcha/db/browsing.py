from string import Template

from matcha.db.utils import (
    db_fetchall,
)


def _get_query(search) -> str:
    query = """
        SELECT u.id, u.username, u.firstname, u.lastname, u.gender, u.sexual_orientation, u.age, u.fame_rating
        FROM users u
        """

    if search["interests"] is not None:
        query += """
            JOIN user_interests ui ON u.id = ui.user_id
            JOIN interests i ON ui.interest_id = i.id
            """

    query += """
        WHERE
    """

    if search["bisexual_gender"] is None:
        query += """
              sexual_orientation = %s
              AND u.gender = %s
              AND
        """
    else:
        bisexual_query = Template(
            """
              ((sexual_orientation = 'o'
              AND u.gender = '${user_gender}')
              OR
              (sexual_orientation = 'e'
              AND u.gender = '${opposite_user_gender}'))
              AND
                 """
        )
        if search["bisexual_gender"] == "m":
            query += bisexual_query.safe_substitute(
                user_gender="m", opposite_user_gender="f"
            )
        if search["bisexual_gender"] == "f":
            query += bisexual_query.safe_substitute(
                user_gender="f", opposite_user_gender="m"
            )

    query += """
          u.id != %s
          AND NOT EXISTS
            (
              SELECT * FROM user_blocked
                WHERE user_id = %s
                AND blocked_id = u.id
            )
    """

    if search["max_fame"] is not None:
        query += " AND u.fame_rating BETWEEN %s AND %s"

    if search["max_age"] is not None:
        query += " AND u.age BETWEEN %s AND %s"

    if search["interests"] is not None:
        query += " AND i.name = ANY(%s)"

    if search["distance"] is not None:
        query += " AND u.latitude BETWEEN %s AND %s"
        query += " AND u.longitude BETWEEN %s AND %s"

    query += """
        GROUP BY u.id, u.username, u.firstname, u.lastname, u.gender, u.sexual_orientation, u.age, u.fame_rating
    """

    if search["interests"] is not None:
        query += f" HAVING COUNT(DISTINCT i.id) = {len(search['interests'])}"

    query += " ORDER BY u.id;"

    return query


def _get_parameters(id_user: int, search: dict) -> list:
    parameters = []

    if search["gender"] is not None:
        parameters.append(search["sexual_orientation"])
        parameters.append(search["gender"])

    parameters.append(id_user)
    parameters.append(id_user)

    if search["max_fame"] is not None:
        parameters.append(search["min_fame"])
        parameters.append(search["max_fame"])

    if search["max_age"] is not None:
        parameters.append(search["min_age"])
        parameters.append(search["max_age"])

    if search["interests"] is not None:
        parameters.append(search["interests"])

    if search["distance"] is not None:
        parameters.append(search["latitude"] - search["distance"])
        parameters.append(search["latitude"] + search["distance"])
        parameters.append(search["longitude"] - search["distance"])
        parameters.append(search["longitude"] + search["distance"])

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
