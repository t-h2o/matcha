from flask import jsonify

from matcha.db.notification import (
    db_get_notification,
    db_destroy_notification,
)


def services_delete_notification(id_user: int, id_notification: int):
    notifications = db_destroy_notification(id_user, id_notification)
    return jsonify({"delete": id_notification}), 201


def services_notification(id_user: int):
    notifications = db_get_notification(id_user)
    return jsonify(notifications), 201
