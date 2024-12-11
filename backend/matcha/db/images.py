from matcha.db.utils import (
    db_query,
    db_query_for,
    db_fetchone,
    db_fetchall,
    fetchall_to_array,
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


def db_upload_pictures(id_user, filenames):
    db_query_for(
        "INSERT INTO user_images (user_id, image_url) VALUES (%s,%s);",
        id_user,
        filenames,
    )


def db_count_number_image(id_user):
    return db_fetchone(
        "SELECT COUNT(*) FROM user_images WHERE   user_id = %s;",
        (id_user,),
    )


def db_get_url_profile(id_user):
    url = db_fetchone(
        "SELECT image_url FROM user_images WHERE id = (SELECT profile_picture_id FROM users WHERE id = %s) ",
        (id_user,),
    )

    if url is None:
        return {"error": "no url"}

    return {"url": url[0]}
