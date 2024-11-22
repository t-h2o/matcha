from os import environ

from psycopg2 import connect

from contextlib import contextmanager


@contextmanager
def _get_db_connection():
    """Generator of database connection"""

    conn = connect(environ["DATABASE_URL"])
    try:
        yield conn
    finally:
        conn.close()


def db_fetchall(query, arguments):
    with _get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query, arguments)
            conn.commit()
            return cur.fetchall()


def db_fetchone(query, arguments):
    with _get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query, arguments)
            conn.commit()
            return cur.fetchone()


def db_query(query, arguments):
    with _get_db_connection() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(query, arguments)
                conn.commit()
            except conn.IntegrityError as e:
                return str(e)
            except Exception as e:
                return {"error": str(e)}

    return


def db_query_for(query, argument, loopme):
    with _get_db_connection() as conn:
        with conn.cursor() as cur:
            for item in loopme:
                cur.execute(
                    query,
                    (
                        argument,
                        item,
                    ),
                )
            conn.commit()


def fetchall_to_array(fetchall):
    array = []
    for item in fetchall:
        array.append(item[0])
    return array
