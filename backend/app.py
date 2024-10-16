"""Flask, psycopg2, os.environ, contextmanager"""

from os import environ
from contextlib import contextmanager
from flask import Flask
from flask import request
from flask import Response
from json import dumps
from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.errors import UndefinedTable
from werkzeug.security import generate_password_hash

app = Flask(__name__)


@contextmanager
def get_db_connection():
    """Generator of database connection"""

    conn = connect(environ["DATABASE_URL"])
    try:
        yield conn
    finally:
        conn.close()


@app.route("/")
def hello_world():
    """Simple title"""
    return "<h1>Hello, World!</h1>"


@app.route("/create")
def create_table_users():
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

    return "created"


@app.route("/register", methods=["POST"])
def register_user():
    """Register a new user.

    Validates that the username is not already taken.
    Hashes the password for security.
    """
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return "Content-Type not supported!"

    json = request.json

    try:
        username = json["username"]
        password = json["password"]
        firstname = json["firstname"]
        lastname = json["lastname"]
        email = json["email"]
    except KeyError as e:
        return f"{e} is required."

    error = None

    if not username:
        error = "Username is required."
    elif not password:
        error = "Password is required."
    elif not firstname:
        error = "Firstname is required."
    elif not lastname:
        error = "Lastname is required."
    elif not email:
        error = "Email is required."

    if error is not None:
        return f"error: {error}"

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
            return f"error: User {username} is already registered."

    return f"User {username} was succefull added"


@app.route("/drop", methods=["POST"])
def drop_table():
    """Drop table name in JSON"""

    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return "Content-Type not supported!"
    json = request.json
    print(json["table"])
    table = json["table"]

    error = None

    if not table:
        error = "table is required."

    if error is not None:
        js = [{"error": error}]
        return Response(dumps(js), mimetype="application/json")

    with get_db_connection() as conn:
        try:
            cur = conn.cursor()
            cur.execute(f"DROP table IF EXISTS {table}")
            conn.commit()
            js = [{"success": f'Table "{table}" was succefull dropped'}]
            return Response(dumps(js), mimetype="application/json")
        except UndefinedTable:
            print("undefined table")
            error = "undefined table"

        except Exception as e:
            error = e.__class__

    return f"error: {error}"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
