from sys import stderr

from uuid import uuid4

from flask import jsonify

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
