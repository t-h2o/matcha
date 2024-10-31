from os import path
from os import environ
from os import remove
from flask import Flask
from flask import request
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt_identity

from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash

from flask_cors import CORS

from app_utils import check_request_json
from app_utils import check_request_json_values
from app_utils import make_unique
from app_utils import get_profile_picture_name
from app_utils import flaskprint

from db import db_get_interests
from db import db_set_interests
from db import db_register
from db import db_get_id_password_where_username
from db import db_get_user_per_id
from db import db_set_user_profile_data
from db import db_delete_user
from db import db_upload_pictures
from db import db_get_user_images
from db import db_set_profile_picture
from db import db_count_number_image


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
app.config["UPLOAD_FOLDER"] = environ["FLASK_UPLOAD_FOLDER"]

CORS(app, origins="http://localhost:4200")

jwt = JWTManager(app)


def interests_put(id_user, request):
    json = request.json

    check_request = check_request_json_values(
        request.headers.get("Content-Type"),
        json,
        ["interests"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    db_set_interests(id_user, json["interests"])


@app.route("/api/interests", methods=("PUT", "GET"))
@jwt_required()
def interests():
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = interests_put(id_user, request)
        if error_msg:
            return error_msg

    interests = db_get_interests(id_user)

    return jsonify({"interests": interests}), 201


@app.route("/api/users", methods=["PUT"])
@jwt_required()
def modify_general():
    id_user = get_jwt_identity()

    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["firstname", "lastname", "selectedGender", "sexualPreference", "bio"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    response = db_set_user_profile_data(
        json["firstname"],
        json["lastname"],
        json["selectedGender"],
        json["sexualPreference"],
        json["bio"],
        id_user,
    )

    return jsonify(response), 200


@app.route("/api/users", methods=["PUT"])
@jwt_required()
def users():
    id_user = get_jwt_identity()

    if request.method == "PUT":
        error_msg = users_put(id_user, request)
        if error_msg:
            return error_msg


@app.route("/api/modify-profile-picture", methods=["PUT"])
@jwt_required()
def modify_profile_picture():
    id_user = get_jwt_identity()

    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["selectedPictures"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    image_filenames = db_get_user_images(id_user)

    profile_picture_name = get_profile_picture_name(
        id_user, json["selectedPictures"], image_filenames
    )

    if profile_picture_name is None:
        return jsonify({"error": "cannot find the profile picture"}), 401

    db_set_profile_picture(id_user, profile_picture_name)

    return jsonify({"success": "change profile picture"}), 201


@app.route("/api/modify-pictures", methods=["POST"])
@jwt_required()
def modify_pictures():
    user_id = get_jwt_identity()

    number_of_picture = db_count_number_image(user_id)

    available_picture = 5 - number_of_picture[0]

    list_pictures = request.files.getlist("pictures")

    if len(list_pictures) > available_picture:
        return jsonify({"error": "too many pictures"}), 401

    filenames = []
    for item in list_pictures:
        filename = str(user_id) + "_" + make_unique(secure_filename(item.filename))
        item.save(path.join(app.config["UPLOAD_FOLDER"], filename))
        filenames.append(filename)

    db_upload_pictures(user_id, filenames)

    return jsonify({"success": "file uploaded"}), 201


@app.route("/api/login", methods=["POST"])
def login_user():
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


@app.route("/who_am_i", methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    user_db = db_get_user_per_id(user_id)
    return jsonify(
        id=user_db[0],
        firstname=user_db[1],
        lastname=user_db[2],
    )


@app.route("/api/register", methods=["POST"])
def register_user():

    json = request.json

    check_request = check_request_json(
        request.headers.get("Content-Type"),
        json,
        ["username", "password", "firstname", "lastname", "email"],
    )

    if check_request is not None:
        return jsonify(check_request[0]), check_request[1]

    response = db_register(
        json["username"],
        json["password"],
        json["firstname"],
        json["lastname"],
        json["email"],
    )

    return jsonify(response)


@app.route("/api/deleteme")
@jwt_required()
def delete_me():
    id_user = get_jwt_identity()

    image_filenames = db_get_user_images(id_user)

    for image_to_delete in image_filenames:
        remove("uploads/" + image_to_delete[0])

    db = db_delete_user(id_user)

    return jsonify(db[0]), db[1]


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
