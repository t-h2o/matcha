from sys import stderr

from uuid import uuid4

from re import search


def fetchall_to_array(fetchall):
    array = []
    for item in fetchall:
        array.append(item[0])
    return array


def flaskprint(message):
    print(message, file=stderr)


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
        field for field in required_fields if field not in json or not json[field]
    ]

    if missing_fields:
        return {
            "error": f"The following fields are required and cannot be empty: {', '.join(missing_fields)}"
        }, 400

    return None


def make_unique(string):
    ident = uuid4().__str__()
    return f"{ident}-{string}"
