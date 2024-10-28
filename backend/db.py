"""Flask, psycopg2, os.environ, contextmanager"""

from os import environ
from sys import stderr
from contextlib import contextmanager

from psycopg2 import sql
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


def db_create_table_users():
    """Create the Users's table."""

    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(12) UNIQUE NOT NULL,
                firstname VARCHAR NOT NULL,
                lastname VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                password VARCHAR NOT NULL
                );
                """
            )
            conn.commit()


def db_get_id_password_where_username(username):
    user_db = None
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id,password FROM users WHERE username = %s", (username,)
            )
            user_db = cur.fetchone()
    return user_db


def db_set_user_profile_data(id_user, field, data):
    row_exist = True

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT user_id FROM user_profiles WHERE user_id = %s", (id_user,)
            )
            row_exist = cur.fetchone() is not None

    if row_exist:
        query = sql.SQL("UPDATE user_profiles SET {} = %s where user_id = %s").format(
            sql.Identifier(field)
        )
    else:
        query = sql.SQL(
            "INSERT INTO user_profiles ({}, user_id) VALUES (%s, %s);"
        ).format(sql.Identifier(field))

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                query,
                (data, id_user),
            )
            conn.commit()


def db_set_user_data(id_user, field, data):
    query = sql.SQL("UPDATE users SET {} = %s where id = %s").format(
        sql.Identifier(field)
    )

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                query,
                (data, id_user),
            )
            conn.commit()


def db_set_email(id_user, email):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE users SET email = %s where id = %s",
                (email, id_user),
            )
            conn.commit()


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


def db_delete_user(id_user):
    response_json = {}
    response_code = 200

    with get_db_connection() as conn:
        try:
            cur = conn.cursor()
            cur.execute("DELETE from user_profiles where user_id = (%s);", (id_user,))
            cur.execute("DELETE from users where id = (%s);", (id_user,))
            conn.commit()
            response_json = {"success": "user delete"}
            response_code = 200
        except Exception as e:
            response_json = {"error": str(e)}
            response_code = 401

    return response_json, response_code
