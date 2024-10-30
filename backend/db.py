"""Flask, psycopg2, os.environ, contextmanager"""

from os import environ
from contextlib import contextmanager

from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.errors import UndefinedTable
from werkzeug.security import generate_password_hash


def db_fetchone(query, arguments):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query, arguments)
            conn.commit()
            return cur.fetchone()


def db_query(query, arguments):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(query, arguments)
                conn.commit()
            except conn.IntegrityError as e:
                return str(e)
            except Exception as e:
                return {"error": str(e)}

    return


@contextmanager
def get_db_connection():
    """Generator of database connection"""

    conn = connect(environ["DATABASE_URL"])
    try:
        yield conn
    finally:
        conn.close()


def db_get_id_password_where_username(username):
    return db_fetchone("SELECT id,password FROM users WHERE username = %s", (username,))


def db_set_user_profile_data(
    firstname, lastname, selectedGender, sexualPreference, bio, id_user
):
    query = "UPDATE users SET (firstname, lastname, gender, sexual_orientation, bio) = (%s, %s, %s, %s, %s) where id = %s"

    response = db_query(
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

    if response:
        return response

    return {"success": "profile updated"}


def db_count_number_image(id_user):
    return db_fetchone(
        "SELECT COUNT(*) FROM user_images WHERE   user_id = %s;",
        (id_user,),
    )


def db_upload_pictures(id_user, filenames):
    query = "INSERT INTO user_images (user_id, image_url) VALUES (%s,%s);"

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            for filename in filenames:
                cur.execute(
                    query,
                    (
                        id_user,
                        filename,
                    ),
                )
            conn.commit()


def db_set_profile_picture(id_user, image_url):
    query = """
    UPDATE users
    SET profile_picture_id = subquery.id
    FROM (SELECT user_images.id FROM user_images WHERE image_url = %s) AS subquery
    WHERE users.id = %s
    """

    response = db_query(
        query,
        (
            image_url,
            id_user,
        ),
    )

    if response:
        return response


def db_get_user_images(id_user):
    filenames = None

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT image_url FROM user_images WHERE user_id = %s", (id_user,)
            )
            filenames = cur.fetchall()
            return filenames

    return filenames


def db_get_user_per_id(id_user):
    return db_fetchone("SELECT * FROM users WHERE id = %s", (id_user,))


def db_register(username, password, firstname, lastname, email):
    query = "INSERT INTO users (username, password, firstname, lastname, email) VALUES (%s,%s,%s,%s,%s);"

    response = db_query(
        query,
        (
            username,
            generate_password_hash(password),
            firstname,
            lastname,
            email,
        ),
    )

    if response:
        return {"error": f"User {username} is already registered."}

    return {"success": f"User {username} was successfully added"}


def db_delete_user(id_user):
    response_json = {}
    response_code = 200

    with get_db_connection() as conn:
        try:
            cur = conn.cursor()
            cur.execute("DELETE from users where id = (%s);", (id_user,))
            conn.commit()
            response_json = {"success": "user delete"}
            response_code = 200
        except Exception as e:
            response_json = {"error": str(e)}
            response_code = 401

    return response_json, response_code
