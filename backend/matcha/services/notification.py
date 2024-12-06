from flask import jsonify

from matcha.db.notification import (
    db_get_notification,
)

from matcha.app_utils import flaskprint


def services_notification(id_user: int):
    notifications = db_get_notification(id_user)
    flaskprint(notifications)
    return jsonify({"notifications": notifications}), 201
