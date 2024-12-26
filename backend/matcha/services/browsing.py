from flask import Blueprint, request, jsonify

from matcha.db.user import (
    db_get_user_per_id,
    db_is_profile_completed,
)

from matcha.db.interests import db_get_interests
from matcha.db.pictures import (
    db_get_url_profile,
)

from matcha.db.browsing import db_browsing_gender_sexualorientation

from matcha.utils import check_request_json
from matcha.utils import flaskprint

MAX_AGE_GAP = 31
MAX_FAME_GAP = 5
MAX_DISTANCE = 101

# Converter: 180[°] = 20'015.09 [km]
# example: 10 km = (10 * 180 / 20015.09)[°]

# To avoid complex geometric calculation,
# we search distance in a square box instead of a circle.

# In the worst case, the max error length is ~41% greater than the distance asked.
# ~41% is found with the Pythagorean theorem
# 100 * (math.sqrt(pow(distance,2) + pow(distance,2)) / distance - 1)


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
    if age_gap == MAX_AGE_GAP:
        return

    search["max_age"] = age + age_gap
    search["min_age"] = age - age_gap


def _search_fame(search, fame, fame_gap):
    if fame_gap == MAX_FAME_GAP:
        return

    search["max_fame"] = fame + fame_gap
    search["min_fame"] = fame - fame_gap


def _search_interests(search, interests):
    if interests == []:
        return

    search["interests"] = interests


def _search_distance(search, distance):
    if distance == MAX_DISTANCE:
        return

    search["distance"] = distance * 180.0 / 20015.09


def services_browsing(id_user, request):
    if db_is_profile_completed(id_user) == False:
        return jsonify({"error": "profile not completed"}), 400

    search = {
        "gender": None,
        "sexual_orientation": None,
        "interests": None,
        "min_age": None,
        "max_age": None,
        "min_fame": None,
        "max_fame": None,
        "latitude": None,
        "longitude": None,
        "distance": None,
    }

    user_db = db_get_user_per_id(id_user)
    gender = user_db[4]
    age = user_db[7]
    fame = user_db[10]
    search["latitude"] = user_db[11]
    search["longitude"] = user_db[12]
    sexual_orientation = user_db[5]

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        request.json,
        ["ageGap", "fameGap", "distance"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    if "interests" not in request.json:
        return jsonify({"error": "no intererests in payload"}), 400

    _search_gender_sexual_orientation(search, gender, sexual_orientation)
    _search_age(search, age, request.json["ageGap"])
    _search_fame(search, fame, request.json["fameGap"])
    _search_interests(search, request.json["interests"])
    if search["latitude"] is not None and search["longitude"] is not None:
        _search_distance(search, request.json["distance"])

    db_browsing_users = db_browsing_gender_sexualorientation(id_user, search)

    browsing_users = []
    for user in db_browsing_users:
        profile_picture = db_get_url_profile(user[0])
        interests = db_get_interests(user[0])

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
                "interests": interests,
            }
        )

    return jsonify(browsing_users), 200
