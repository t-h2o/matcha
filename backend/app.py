from flask import Flask
from flask import request
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from werkzeug.security import generate_password_hash

app = Flask(__name__)


def get_db_connection():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    return conn


@app.route("/")
def hello_world():
    return "<h1>Hello, World!</h1>"


@app.route("/create")
def create_table_users():
    conn = get_db_connection()
    try:
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
    finally:
        conn.close()

    return "created"


@app.route("/register", methods=("GET", "POST"))
def register_user():
    """Register a new user.

    Validates that the username is not already taken.
    Hashes the password for security.
    """

    if request.method == "GET":
        return "register with POST method"
    elif request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        firstname = request.form["firstname"]
        lastname = request.form["lastname"]
        email = request.form["email"]

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

        conn = get_db_connection()

        if error is None:
            try:
                cur = conn.cursor()
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
                error = f"User {username} is already registered."
            else:
                return f"User {username} was succefull added"
            finally:
                conn.close()

    return f"error: {error}"


@app.route("/drop", methods=("GET", "POST"))
def drop_table():
    if request.method == "GET":
        return "drop with POST method"
    elif request.method == "POST":
        table = request.form["table"]

        error = None

        if not table:
            error = "table is required."

        conn = get_db_connection()

        if error is None:
            try:
                cur = conn.cursor()
                cur.execute(f"DROP table IF EXISTS {table}")
                conn.commit()
            except conn.IntegrityError:
                error = f"Table doesn't exist."
            else:
                return f'Table "{table}" was succefull dropped'
            finally:
                conn.close()

    return f"error: {error}"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
