"""Flask, psycopg2, os.environ, contextmanager"""

from psycopg2.errors import UndefinedTable

from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
)


def db_get_id_where_username(username):
    return db_fetchone("SELECT id FROM users WHERE username = %s", (username,))


def db_get_username_where_id(id_user: int) -> str:
    return db_fetchone("SELECT username FROM users WHERE id = %s", (id_user,))[0]


def db_get_id_password_where_username(username):
    return db_fetchone("SELECT id,password FROM users WHERE username = %s", (username,))


def db_set_user_email(id_user, email):
    error_msg = db_query(
        "UPDATE users SET email = %s where id = %s",
        (
            email,
            id_user,
        ),
    )

    if error_msg:
        return error_msg


def db_get_user_email(id_user):
    return db_fetchone(
        "SELECT email FROM users where id = %s",
        (id_user,),
    )[0]


def db_is_profile_completed(id_user: int):
    return db_fetchone(
        "SELECT profile_complete FROM users where id = %s",
        (id_user,),
    )[0]


def db_set_user_profile_data(
    firstname, lastname, selectedGender, sexualPreference, bio, age, id_user
):
    error_msg = db_query(
        "UPDATE users SET (firstname, lastname, gender, sexual_orientation, bio, age) = (%s, %s, %s, %s, %s, %s) where id = %s",
        (
            firstname,
            lastname,
            selectedGender,
            sexualPreference,
            bio,
            age,
            id_user,
        ),
    )

    if error_msg:
        return error_msg


def db_get_iduser_per_username(username):
    return db_fetchone(
        "SELECT id FROM users WHERE username = %s",
        (username,),
    )


def db_get_user_per_id(id_user):
    return db_fetchone(
        "SELECT username, email, firstname, lastname, gender, sexual_orientation, bio, age, email_verified, profile_complete, fame_rating, latitude, longitude FROM users WHERE id = %s",
        (id_user,),
    )


def db_get_user_per_username(username):
    return db_fetchone(
        "SELECT id, username, firstname, lastname, gender, sexual_orientation, bio, age, fame_rating FROM users WHERE username = %s",
        (username,),
    )


def db_delete_user(id_user):
    response_json = {}
    response_code = 200

    error_msg = db_query("DELETE from users where id = (%s);", (id_user,))

    if error_msg:
        return error_msg, 401

    return {"success": "user delete"}, 200
