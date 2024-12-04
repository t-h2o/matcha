from flask import Blueprint, request, jsonify

from matcha.db import (
    db_get_user_per_id,
    db_browsing_gender_sexualorientation,
    db_get_url_profile,
)

from matcha.app_utils import check_request_json, flaskprint


def _browsing_put(id_user, request, search):
    json = request.json

    # * Max age gap 0 - 30 years
    # * Max distance 0 - 100 km
    # * Max fame gap 0 - 10 points
    # * Interests: array of strings

    if "age_gap" in json:
        search["min_age"] = -json["age_gap"]
        search["max_age"] = json["age_gap"]

    if "fame_gap" in json:
        search["min_fame"] = -json["fame_gap"]
        search["max_fame"] = json["fame_gap"]


def services_browsing(id_user, request):
    search = {
        "gender": None,
        "sexual_orientation": None,
        "min_age": None,
        "max_age": None,
        "min_fame": None,
        "max_fame": None,
    }

    if request.method == "PUT":
        error_msg = _browsing_put(id_user, request, search)
        if error_msg:
            return error_msg

    user_db = db_get_user_per_id(id_user)
    gender = user_db[4]
    age = user_db[7]
    fame_rating = user_db[10]
    sexual_orientation = user_db[5]

    if search["min_age"] is not None:
        search["min_age"] = search["min_age"] + age
        search["max_age"] = search["max_age"] + age
    else:
        search["min_age"] = age - 30
        search["max_age"] = age + 30

    if search["min_fame"] is not None:
        search["min_fame"] = search["min_fame"] + fame_rating
        search["max_fame"] = search["max_fame"] + fame_rating
    else:
        search["min_fame"] = fame_rating - 10
        search["max_fame"] = fame_rating + 10

    if gender == "m" and sexual_orientation == "e":
        search["gender"] = "f"
        search["sexual_orientation"] = "e"
    elif gender == "m" and sexual_orientation == "o":
        search["gender"] = "m"
        search["sexual_orientation"] = "o"
    elif gender == "f" and sexual_orientation == "e":
        search["gender"] = "m"
        search["sexual_orientation"] = "e"
    elif gender == "f" and sexual_orientation == "o":
        search["gender"] = "f"
        search["sexual_orientation"] = "o"

    flaskprint(search)

    db_browsing_users = db_browsing_gender_sexualorientation(id_user, search)

    browsing_users = []
    for user in db_browsing_users:
        profile_picture = db_get_url_profile(user[0])

        if "url" in profile_picture:
            profile_url = url = profile_picture["url"]
        elif "error" in profile_picture:
            profile_url = url = profile_picture["error"]

        browsing_users.append(
            {
                "username": user[1],
                "firstname": user[2],
                "lastname": user[3],
                "gender": user[4],
                "sexualPreference": user[5],
                "age": user[6],
                "fameRating": user[7],
                "urlProfile": profile_url,
            }
        )

    return jsonify(browsing_users), 200
