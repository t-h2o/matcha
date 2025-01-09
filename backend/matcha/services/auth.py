from flask import jsonify, current_app

from jwt import encode, decode, InvalidSignatureError

from flask_jwt_extended import (
    create_access_token,
)

from werkzeug.security import check_password_hash

from matcha.db.user import (
    db_get_id_password_where_username,
    db_get_email_data_where_username,
    db_update_password,
)

from matcha.utils import check_request_json, send_mail
from matcha.utils import flaskprint


def service_login_user(request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username", "password"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    user_db = db_get_id_password_where_username(json["username"])

    if user_db is None:
        return jsonify({"error": "Incorrect username"}), 401
    if check_password_hash(user_db[1], json["password"]):
        access_token = create_access_token(identity=user_db[0])
        return jsonify(access_token=access_token)
    return jsonify({"error": "Incorrect password"}), 401


def _generate_confim_token(username: str):
    data = {"username": username}
    token = encode(data, "secret", algorithm="HS512")
    return token


def services_reset_password(request):
    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    email_data = db_get_email_data_where_username(json["username"])

    if email_data is not None and email_data[1] == True:
        token = _generate_confim_token(json["username"])

        if current_app.config["MODE"] == "development":
            url_backend = current_app.config["URL"] + f"/api/reset-password/{token}"
            url_frontend = "http://localhost:4200" + f"/reset-password/{token}"
            mail_body = (
                f"here the link\n\nbackend: {url_backend}\n\nfrontend: {url_frontend}"
            )
        else:
            url = current_app.config["URL"] + f"/api/reset-password/{token}"
            mail_body = f"here the link\n\n{url}"

        mail_title = "matcha : reset password"
        send_mail(
            email_data[0],
            mail_title,
            mail_body,
        )

    return jsonify({"success": "ok"}), 201


def services_reset_password_jwt(request, jwt: str):
    check_request = check_request_json(
        request.headers.get("Content-Type"),
        request.json,
        ["password"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    try:
        data = decode(jwt, "secret", algorithms=["HS512"])
    except Exception as e:
        return jsonify({"error": "bad token"}), 401

    flaskprint(data)
    db_update_password(data["username"], request.json["password"])

    return jsonify({"success": "password reset"}), 201
