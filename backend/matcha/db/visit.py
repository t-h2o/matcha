from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
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
