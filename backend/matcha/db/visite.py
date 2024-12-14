def db_put_visite(id_visitor: int, id_visited: int):
    query = """
    INSERT INTO user_visits
    (
      user_id,
      interest_id
    )
    VALUES (
    (SELECT users.id FROM users WHERE id = %s),
    (SELECT interests.id FROM interests WHERE name = %s));
    """
    error_msg = db_query("DELETE from users where id = (%s);", (id_user,))
