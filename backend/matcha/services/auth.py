from flask import jsonify

from flask_jwt_extended import (
    create_access_token,
)

from werkzeug.security import check_password_hash

from matcha.db import db_get_id_password_where_username


class Login:
    username: str
    password: str

    def __init__(self, username, password):
        self.username = username
        self.password = password


def service_login_user(login: Login):
    user_db = db_get_id_password_where_username(login.username)

    if user_db is None:
        return jsonify({"error": "Incorrect username"}), 401
    if check_password_hash(user_db[1], login.password):
        access_token = create_access_token(identity=user_db[0])
        return jsonify(access_token=access_token)
    return jsonify({"error": "Incorrect password"}), 401
