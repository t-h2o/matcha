#!/bin/python

from test_utils import (
    check_login_token,
    check_415,
    check_get,
    check_post,
    check_put,
    check_put_token,
    check_get_token,
    check_get_token_pictures,
    check_post_token_pictures,
    check_put_token_pictures,
)

HTTP_405 = b"<!doctype html>\n<html lang=en>\n<title>405 Method Not Allowed</title>\n<h1>Method Not Allowed</h1>\n<p>The method is not allowed for the requested URL.</p>\n"


def create_another_user():
    check_post(
        "/api/register",
        200,
        {
            "username": "another",
            "firstname": "Another",
            "lastname": "User",
            "email": "another@flask.py",
            "password": "5678",
        },
        {"success": "User another was successfully added"},
    )
    check_login_token(
        "/api/login",
        {"username": "another", "password": "5678"},
    )
    check_put_token(
        "/api/users",
        200,
        {
            "age": "18",
            "firstname": "Another",
            "lastname": "User",
            "selectedGender": "m",
            "sexualPreference": "e",
            "bio": "My bio is short.",
        },
        {
            "age": 18,
            "bio": "My bio is short.",
            "email_verified": False,
            "firstname": "Another",
            "lastname": "User",
            "selectedGender": "m",
            "sexualPreference": "e",
        },
    )


def register():
    check_415("/api/register")
    check_get("/api/register", 405, HTTP_405)
    check_post(
        "/api/register",
        200,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        {"success": "User user was successfully added"},
    )

    check_post(
        "/api/register",
        400,
        {
            "username": "user",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        {"error": "The following fields are required and cannot be empty: firstname"},
    )

    check_post(
        "/api/register",
        400,
        {
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        {"error": "The following fields are required and cannot be empty: username"},
    )

    check_post(
        "/api/register",
        200,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        {"error": "User user is already registered."},
    )

    check_post(
        "/api/register",
        400,
        {
            "username": "",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        {"error": "The following fields are required and cannot be empty: username"},
    )

    check_post(
        "/api/register",
        400,
        {
            "username": "user",
            "firstname": "",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        {"error": "The following fields are required and cannot be empty: firstname"},
    )

    check_post(
        "/api/register",
        400,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "",
            "email": "email@email.com",
            "password": "1234",
        },
        {"error": "The following fields are required and cannot be empty: lastname"},
    )

    check_post(
        "/api/register",
        400,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "",
        },
        {"error": "The following fields are required and cannot be empty: password"},
    )

    check_post(
        "/api/register",
        400,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "",
            "password": "1234",
        },
        {"error": "The following fields are required and cannot be empty: email"},
    )


def login():
    check_login_token(
        "/api/login",
        {"username": "user", "password": "1234"},
    )

    check_post(
        "/api/login",
        401,
        {"username": "user", "password": "bad"},
        {"error": "Incorrect password"},
    )

    check_post(
        "/api/login",
        400,
        {"username": "", "password": "1234"},
        {"error": "The following fields are required and cannot be empty: username"},
    )

    check_post(
        "/api/login",
        400,
        {"username": None, "password": "1234"},
        {"error": "The following fields are required and cannot be empty: username"},
    )

    check_post(
        "/api/login",
        400,
        {"username": "", "password": ""},
        {
            "error": "The following fields are required and cannot be empty: username, password"
        },
    )

    check_post(
        "/api/login",
        401,
        {"username": "no_user", "password": "1234"},
        {"error": "Incorrect username"},
    )

    check_post(
        "/api/login",
        400,
        {"password": "1234"},
        {"error": "The following fields are required and cannot be empty: username"},
    )


def update():
    check_get_token(
        "/api/users",
        200,
        {
            "age": None,
            "bio": None,
            "email": "email@email.com",
            "email_verified": False,
            "fameRating": 0,
            "firstname": "firstname",
            "lastname": "lastname",
            "profile_complete": False,
            "selectedGender": None,
            "sexualPreference": None,
            "username": "user",
        },
    )
    check_put_token(
        "/api/users",
        400,
        {"email": "b@b.com"},
        {
            "error": "The following fields are required and cannot be empty: firstname, lastname, selectedGender, sexualPreference, bio, age"
        },
    )
    check_put_token(
        "/api/users",
        200,
        {
            "age": "22",
            "firstname": "Johnny",
            "lastname": "Appleseed",
            "selectedGender": "m",
            "sexualPreference": "e",
            "bio": "I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.",
        },
        {
            "age": 22,
            "bio": "I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.",
            "email": "email@email.com",
            "email_verified": False,
            "fameRating": 0,
            "firstname": "Johnny",
            "lastname": "Appleseed",
            "profile_complete": False,
            "selectedGender": "m",
            "sexualPreference": "e",
            "username": "user",
        },
    )
    check_put_token(
        "/api/users",
        200,
        {
            "age": 22,
            "firstname": "Johnny",
            "lastname": "Appleseed",
            "selectedGender": "ma",
            "sexualPreference": "e",
            "bio": "I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.",
        },
        {"error": "value too long for type character(1)\n"},
    )
    check_put(
        "/api/users",
        401,
        {"firstname": "Johnny"},
        {"msg": "Missing Authorization Header"},
    )
    check_get_token(
        "/api/users",
        200,
        {
            "age": 22,
            "bio": "I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.",
            "email": "email@email.com",
            "email_verified": False,
            "fameRating": 0,
            "firstname": "Johnny",
            "lastname": "Appleseed",
            "profile_complete": False,
            "selectedGender": "m",
            "sexualPreference": "e",
            "username": "user",
        },
    )
    check_get_token(
        "/api/users?username=another",
        200,
        {
            "age": 18,
            "fameRating": 0,
            "firstname": "Another",
            "gender": "m",
            "lastname": "User",
            "sexualPreference": "e",
            "username": "another",
        },
    )


def interests():
    check_get_token("/api/interests", 201, {"interests": []})
    check_put_token(
        "/api/interests",
        201,
        {
            "interests": [
                "movies",
                "cooking",
                "hiking",
                "technology",
                "fashion",
                "nature",
                "meditation",
            ]
        },
        {
            "interests": [
                "technology",
                "movies",
                "nature",
                "hiking",
                "cooking",
                "meditation",
                "fashion",
            ]
        },
    )
    check_get_token(
        "/api/interests",
        201,
        {
            "interests": [
                "technology",
                "movies",
                "nature",
                "hiking",
                "cooking",
                "meditation",
                "fashion",
            ]
        },
    )
    check_put_token(
        "/api/interests",
        201,
        {
            "interests": [
                "hiking",
                "technology",
                "fashion",
                "nature",
                "meditation",
            ]
        },
        {"interests": ["technology", "nature", "hiking", "meditation", "fashion"]},
    )
    check_get_token(
        "/api/interests",
        201,
        {"interests": ["technology", "nature", "hiking", "meditation", "fashion"]},
    )
    check_put_token(
        "/api/interests",
        201,
        {"interests": []},
        {"interests": []},
    )
    check_get_token(
        "/api/interests",
        201,
        {"interests": []},
    )


def pictures():
    check_get_token_pictures("/api/pictures", 201, {"pictures": 1})
    check_post_token_pictures(
        "/api/pictures",
        200,
        "../frontend/AngularApp/public/dummy-pics/placeholderPic.jpg",
        {"pictures": 2},
    )
    check_post_token_pictures(
        "/api/pictures",
        201,
        [
            "../frontend/AngularApp/public/dummy-pics/placeholderPic.jpg",
            "../frontend/AngularApp/public/dummy-pics/placeholderPic.jpg",
        ],
        {"pictures": 4},
    )
    check_post_token_pictures(
        "/api/pictures",
        401,
        [
            "../frontend/AngularApp/public/dummy-pics/placeholderPic.jpg",
            "../frontend/AngularApp/public/dummy-pics/placeholderPic.jpg",
        ],
        {"error": "too many pictures"},
    )
    check_post_token_pictures(
        "/api/pictures",
        201,
        [
            "../frontend/AngularApp/public/dummy-pics/placeholderPic.jpg",
        ],
        {"pictures": 5},
    )
    pictures = check_get_token_pictures("/api/pictures", 201, {"pictures": 5})
    check_put_token_pictures(
        "/api/modify-profile-picture",
        201,
        {
            "selectedPictures": pictures[1],
        },
        {"selectedPicture": 1},
    )
    check_get_token_pictures("/api/modify-profile-picture", 201, {"selectedPicture": 1})


def email():
    check_put_token(
        "/api/email",
        201,
        {
            "email": "test@python.py",
        },
        {"email": "test@python.py"},
    )
    check_get_token("/api/email", 201, {"email": "test@python.py"})


def deleteme():
    check_get_token("/api/deleteme", 200, {"success": "user delete"})
    check_login_token(
        "/api/login",
        {"username": "another", "password": "5678"},
    )
    check_get_token("/api/deleteme", 200, {"success": "user delete"})


def main():
    register()
    create_another_user()
    login()
    update()
    interests()
    pictures()
    email()
    deleteme()


if __name__ == "__main__":
    main()
