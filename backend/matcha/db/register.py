from werkzeug.security import generate_password_hash

from matcha.db.user import db_query, db_get_iduser_per_username


def db_register(username, password, firstname, lastname, email):
    error_msg = db_query(
        "INSERT INTO users (username, password, firstname, lastname, email) VALUES (%s,%s,%s,%s,%s);",
        (
            username,
            generate_password_hash(password),
            firstname,
            lastname,
            email,
        ),
    )

    if error_msg is not None:
        if "users_email_key" in error_msg["error"]:
            return {"error": f"User {email} is already registered."}, 401

        if "users_username_key" in error_msg["error"]:
            return {"error": f"User {username} is already registered."}, 401

    return {"success": f"User {username} was successfully added"}, 200
