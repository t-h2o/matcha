from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


def db_browsing_gender_sexualorientation(id_user, search):
    return db_fetchall(
        """
        SELECT id, username, firstname, lastname, gender, sexual_orientation, age, fame_rating
        FROM users
        WHERE sexual_orientation = %s
          AND gender = %s
          AND age BETWEEN %s AND %s
          AND fame_rating BETWEEN %s AND %s
          AND id != %s
            """,
        (
            search["sexual_orientation"],
            search["gender"],
            search["min_age"],
            search["max_age"],
            search["min_fame"],
            search["max_fame"],
            id_user,
        ),
    )
