from os import environ
from contextlib import contextmanager
from flask import Flask, request, jsonify
from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.errors import UndefinedTable
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:4200")


@contextmanager
def get_db_connection():
    """Generator of database connection"""
    conn = connect(environ["DATABASE_URL"])
    try:
        yield conn
    finally:
        conn.close()


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

    return jsonify({"success": "Table 'users' created"}), 201


@app.route("/login", methods=["POST"])
def login_user():
    """Check the login"""
    if request.headers.get("Content-Type") != "application/json":
        return jsonify({"error": "Content-Type not supported!"}), 415

    user_data = request.json
    if user_data is None:
        return (
            jsonify({"error": "Invalid JSON data or empty request body"}),
            400,
        )

    required_fields = ["username", "password"]
    missing_fields = [
        field
        for field in required_fields
        if field not in user_data or user_data[field] is None
    ]

    if missing_fields:
        return (
            jsonify(
                {
                    "error": f"The following fields are required and cannot be empty: {', '.join(missing_fields)}"
                }
            ),
            400,
        )

    username = user_data["username"]
    password = user_data["password"]

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE username = %s", (username,))
            user_db = cur.fetchone()

    if user_db is None:
        return jsonify({"error": "Incorrect credentials"}), 401
    if check_password_hash(user_db[6], password):
        return jsonify({"success": "Logged in"}), 200
    return jsonify({"error": "Incorrect credentials"}), 401


@app.route("/register", methods=["POST"])
def register_user():
    """Register a new user.

    Validates that the username is not already taken.
    Hashes the password for security.
    """
    if request.headers.get("Content-Type") != "application/json":
        return jsonify({"error": "Content-Type not supported!"}), 415

    user_data = request.json
    if user_data is None:
        return (
            jsonify({"error": "Invalid JSON data or empty request body"}),
            400,
        )

    required_fields = ["username", "password", "firstname", "lastname", "email"]
    missing_fields = [
        field
        for field in required_fields
        if field not in user_data or user_data[field] is None
    ]

    if missing_fields:
        return (
            jsonify(
                {
                    "error": f"The following fields are required and cannot be empty: {', '.join(missing_fields)}"
                }
            ),
            400,
        )

    with get_db_connection() as conn:
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO users (username, password, firstname, lastname, email) VALUES (%s, %s, %s, %s, %s);",
                    (
                        user_data["username"],
                        generate_password_hash(user_data["password"]),
                        user_data["firstname"],
                        user_data["lastname"],
                        user_data["email"],
                    ),
                )
            conn.commit()
        except conn.IntegrityError:
            return (
                jsonify(
                    {
                        "error": f"User {user_data['username']} is already registered."
                    }
                ),
                409,
            )
        except Exception as e:
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    return (
        jsonify(
            {"success": f"User {user_data['username']} was successfully added"}
        ),
        201,
    )


@app.route("/drop", methods=["POST"])
def drop_table():
    """Drop table name in JSON"""

    if request.headers.get("Content-Type") != "application/json":
        return jsonify({"error": "Content-Type not supported!"}), 415

    json_data = request.json
    table = json_data.get("table")
    if not table:
        return jsonify({"error": "Table is required"}), 400

    with get_db_connection() as conn:
        try:
            with conn.cursor() as cur:
                cur.execute(f"DROP table IF EXISTS {table}")
                conn.commit()
                return (
                    jsonify(
                        {"success": f"Table {table} was successfully dropped"}
                    ),
                    200,
                )
        except UndefinedTable:
            return jsonify({"error": "Undefined table"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
