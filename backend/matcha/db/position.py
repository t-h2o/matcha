from matcha.db.utils import (
    db_query,
    db_fetchone,
)


def db_update_address(id_user: int, address: dict):
    error_msg = db_query(
        "UPDATE users SET (street_name, street_number, city, country) = (%s, %s, %s, %s) WHERE id = %s",
        (
            address["road"],
            address["house_number"],
            address["town"],
            address["country"],
            id_user,
        ),
    )

    if error_msg:
        return error_msg


def db_get_position(id_user):
    return db_fetchone(
        "SELECT frontend_latitude,frontend_longitude FROM users WHERE id = %s",
        (id_user,),
    )


def db_update_position(id_user: int, latitude: float, longitude: float):
    error_msg = db_query(
        "UPDATE users SET (latitude, longitude, frontend_latitude, frontend_longitude) = (%s, %s, %s, %s) WHERE id = %s",
        (latitude, longitude, latitude, longitude, id_user),
    )

    if error_msg:
        return error_msg
