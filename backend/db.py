"""Flask, psycopg2, os.environ, contextmanager"""

from os import environ
from sys import stderr
from contextlib import contextmanager
from flask import Flask
from flask import request
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt_identity

from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.errors import UndefinedTable
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_cors import CORS


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


def db_get_username_password_where_username(username):
    user_db = None
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT username,password FROM users WHERE username = %s", (username,)
            )
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

    return {"succefull": f"User {username} was succefull added"}


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
