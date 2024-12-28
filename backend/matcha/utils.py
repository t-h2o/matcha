from sys import stderr

from uuid import uuid4

from re import search

from flask import jsonify, current_app

from smtplib import SMTP, SMTP_SSL

from matcha.db.user import db_get_id_where_username


def flaskprint(message):
    print(message, file=stderr)


def get_id_where_username_else_error(username: str):
    id_to_notify = db_get_id_where_username(username)
    if id_to_notify is None:
        return jsonify({"error": "bad username"}), 400
    return id_to_notify[0]


def check_request_json_values(content_type, json, required_fields):
    if content_type != "application/json":
        return {"error": "Content-Type not supported!"}, 415

    missing_fields = [field for field in required_fields if field not in json]

    if missing_fields:
        return {
            "error": f"The following fields are required: {', '.join(missing_fields)}"
        }, 400

    return None


def check_request_json(content_type, json, required_fields):
    if content_type != "application/json":
        return {"error": "Content-Type not supported!"}, 415

    missing_fields = [
        field
        for field in required_fields
        if field not in json or (not isinstance(json[field], int) and not json[field])
    ]

    if missing_fields:
        return {
            "error": f"The following fields are required and cannot be empty: {', '.join(missing_fields)}"
        }, 400

    return None


def make_unique(string):
    ident = uuid4().__str__()
    return f"{ident}-{string}"


def send_mail(to: str, body: str, message: str):
    if current_app.config["MAIL_SMTP_METHOD"] == "ssl":
        smtp_connection = SMTP_SSL(
            host=current_app.config["MAIL_SMTP_HOST"],
            port=current_app.config["MAIL_SMTP_PORT"],
        )
    else:
        smtp_connection = SMTP(
            host=current_app.config["MAIL_SMTP_HOST"],
            port=current_app.config["MAIL_SMTP_PORT"],
        )

    resp_code, response = smtp_connection.login(
        user=current_app.config["MAIL_USER"],
        password=current_app.config["MAIL_PASSWORD"],
    )

    to_list = [current_app.config["MAIL_TEST"]]
    message = "Subject: {}\n\n{}".format(body, message)

    response = smtp_connection.sendmail(
        from_addr=current_app.config["MAIL_USER"], to_addrs=to_list, msg=message
    )

    resp_code, response = smtp_connection.quit()
