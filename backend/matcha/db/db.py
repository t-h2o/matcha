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


def db_get_position(id_user):
    return db_fetchone("SELECT latitude,longitude FROM users WHERE id = %s", (id_user,))


def db_update_position(id_user: int, latitude: float, longitude: float):
    error_msg = db_query(
        "UPDATE users SET (latitude, longitude) = (%s, %s) WHERE id = %s",
        (latitude, longitude, id_user),
    )

    if error_msg:
        return error_msg


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


def db_get_url_profile(id_user):
    url = db_fetchone(
        "SELECT image_url FROM user_images WHERE id = (SELECT profile_picture_id FROM users WHERE id = %s) ",
        (id_user,),
    )

    if url is None:
        return {"error": "no url"}

    return {"url": url[0]}


def db_get_user_email(id_user):
    return db_fetchone(
        "SELECT email FROM users where id = %s",
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


def db_count_number_image(id_user):
    return db_fetchone(
        "SELECT COUNT(*) FROM user_images WHERE   user_id = %s;",
        (id_user,),
    )


def db_get_interests(id_user):
    query = """
    SELECT name FROM interests
    WHERE id IN (SELECT interest_id FROM user_interests where user_id = %s);
    """

    interests = db_fetchall(query, (id_user,))

    return fetchall_to_array(interests)


def db_set_interests(id_user, interests):
    # delete all entry for the user
    # that will avoid to check where is there duplicate / old entry

    db_query("DELETE from user_interests where user_id = (%s);", (id_user,))

    query = """
    INSERT INTO user_interests
    (
      user_id,
      interest_id
    )
    VALUES (
    (SELECT users.id FROM users WHERE id = %s),
    (SELECT interests.id FROM interests WHERE name = %s));
    """

    db_query_for(query, id_user, interests)


def db_upload_pictures(id_user, filenames):
    db_query_for(
        "INSERT INTO user_images (user_id, image_url) VALUES (%s,%s);",
        id_user,
        filenames,
    )


def db_set_profile_picture(id_user, image_url):
    query = """
    UPDATE users
    SET profile_picture_id = subquery.id
    FROM (SELECT user_images.id FROM user_images WHERE image_url = %s) AS subquery
    WHERE users.id = %s
    """

    error_msg = db_query(
        query,
        (
            image_url,
            id_user,
        ),
    )

    if error_msg:
        return error_msg


def db_get_user_images(id_user):
    filenames = db_fetchall(
        "SELECT image_url FROM user_images WHERE user_id = %s", (id_user,)
    )

    return fetchall_to_array(filenames)


def db_browsing_gender_sexualorientation(id_user, search):
    return db_fetchall(
        "SELECT id, username, firstname, lastname, gender, sexual_orientation, age, fame_rating FROM users WHERE sexual_orientation = %s AND gender = %s AND id != %s",
        (search["sexual_orientation"], search["gender"], id_user),
    )


def db_get_iduser_per_username(username):
    return db_fetchone(
        "SELECT id FROM users WHERE username = %s",
        (username,),
    )


def db_get_user_per_id(id_user):
    return db_fetchone(
        "SELECT username, email, firstname, lastname, gender, sexual_orientation, bio, age, email_verified, profile_complete, fame_rating FROM users WHERE id = %s",
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
