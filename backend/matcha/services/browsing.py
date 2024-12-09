from flask import Blueprint, request, jsonify

from matcha.db.db import (
    db_get_user_per_id,
    db_get_url_profile,
)

from matcha.db.browsing import db_browsing_gender_sexualorientation

from matcha.app_utils import check_request_json

MAX_AGE_GAP = 31


def _search_gender_sexual_orientation(search, gender, sexual_orientation):
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


def _search_age(search, age, age_gap):
    if age == MAX_AGE_GAP:
        return

    search["max_age"] = age + age_gap
    search["min_age"] = age - age_gap


def _search_fame(search, fame, fame_gap):
    if fame == -1:
        return

    search["max_fame"] = fame + fame_gap
    search["min_fame"] = fame - fame_gap


def services_browsing(id_user, request):
    search = {
        "gender": None,
        "sexual_orientation": None,
        "min_age": None,
        "max_age": None,
        "min_fame": None,
        "max_fame": None,
    }

    user_db = db_get_user_per_id(id_user)
    gender = user_db[4]
    age = user_db[7]
    fame = user_db[10]
    sexual_orientation = user_db[5]

    _search_gender_sexual_orientation(search, gender, sexual_orientation)

    if request.method == "POST":
        check_request = check_request_json(
            request.headers.get("Content-Type"),
            request.json,
            ["ageGap", "fameGap", "distance"],
        )

        if check_request is not None:
            return jsonify(check_request[0]), check_request[1]

        _search_age(search, age, request.json["ageGap"])
        _search_fame(search, fame, request.json["fameGap"])

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
