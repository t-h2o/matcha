from uuid import uuid4

from re import search


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


def get_profile_picture_name(id_user, selected_picture, image_filenames):

    profile_picture_name = None

    for image in image_filenames:
        regex_result = search(
            str(id_user) + "_.{36}-" + selected_picture,
            image[0],
        )
        if regex_result is not None:
            return regex_result.string
