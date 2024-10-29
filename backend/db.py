"""Flask, psycopg2, os.environ, contextmanager"""

from os import environ
from contextlib import contextmanager

from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.errors import UndefinedTable
from werkzeug.security import generate_password_hash


@contextmanager
def get_db_connection():
    """Generator of database connection"""

    conn = connect(environ["DATABASE_URL"])
    try:
        yield conn
    finally:
        conn.close()


def db_get_id_password_where_username(username):
    user_db = None
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id,password FROM users WHERE username = %s", (username,)
            )
            user_db = cur.fetchone()
    return user_db


def db_set_user_profile_data(
    firstname, lastname, selectedGender, sexualPreference, bio, id_user
):
    query = "UPDATE users SET (firstname, lastname, gender, sexual_orientation, bio) = (%s, %s, %s, %s, %s) where id = %s"

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    query,
                    (
                        firstname,
                        lastname,
                        selectedGender,
                        sexualPreference,
                        bio,
                        id_user,
                    ),
                )
                conn.commit()
            except Exception as e:
                return {"error": str(e)}

    return {"success": "profile updated"}


def db_get_user_per_id(id_user):
    user_db = None

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE id = %s", (id_user,))
            user_db = cur.fetchone()

    return user_db


def db_register(username, password, firstname, lastname, email):
    with get_db_connection() as conn:
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO users (username, password, firstname, lastname, email) VALUES (%s,%s,%s,%s,%s);",
                    (
                        username,
                        generate_password_hash(password),
                        firstname,
                        lastname,
                        email,
                    ),
                )
                conn.commit()
        except conn.IntegrityError:
            return {"error": f"User {username} is already registered."}

    return {"success": f"User {username} was successfully added"}


def db_drop(table):

    with get_db_connection() as conn:
        try:
            cur = conn.cursor()
            cur.execute(f"DROP table IF EXISTS {table}")
            conn.commit()
        except UndefinedTable:
            {"error": "Undefined table"}
        except Exception as e:
            {"error": str(e)}

    return {"success": f"Table {table} was successfully dropped"}
