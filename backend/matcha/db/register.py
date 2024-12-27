from werkzeug.security import generate_password_hash

from matcha.db.user import db_query, db_get_iduser_per_username


def db_register(username, password, firstname, lastname, email, default_avatar):
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

    if error_msg:
        return {"error": f"User {username} is already registered."}

    id_user = db_get_iduser_per_username(username)

    db_query(
        "INSERT INTO user_images (user_id, image_url) VALUES (%s,%s);",
        (
            id_user,
            default_avatar,
        ),
    )

    error_msg = db_query(
        "UPDATE users SET profile_picture_id = subquery.id FROM (SELECT user_images.id FROM user_images WHERE user_id = %s) AS subquery WHERE users.id = %s",
        (
            id_user,
            id_user,
        ),
    )

    return {"success": f"User {username} was successfully added"}
