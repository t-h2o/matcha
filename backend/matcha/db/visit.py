from matcha.db.utils import (
    db_query,
    db_fetchall,
    fetchall_to_array,
)


def db_put_visit(id_visitor: int, id_visited: int):
    query = """
    INSERT INTO user_visits
    (
      visitor_id,
      visited_id
    )
    VALUES
    (
      %s,
      %s
    );
    """

    return db_query(
        query,
        (
            id_visitor,
            id_visited,
        ),
    )


def db_get_visit(id_visited: int):
    query = """
    SELECT username
    FROM users
    WHERE
    id IN
    (
      SELECT visitor_id
      FROM user_visits
      WHERE
      visited_id = %s
    )
    ;
    """

    return fetchall_to_array(
        db_fetchall(
            query,
            (id_visited,),
        )
    )
