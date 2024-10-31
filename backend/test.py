#!/bin/python

from test_utils import check_login_token
from test_utils import check_415
from test_utils import check_get
from test_utils import check_post
from test_utils import check_put
from test_utils import check_put_token
from test_utils import check_get_token
from test_utils import check_post_token_file

HTTP_405 = b"<!doctype html>\n<html lang=en>\n<title>405 Method Not Allowed</title>\n<h1>Method Not Allowed</h1>\n<p>The method is not allowed for the requested URL.</p>\n"


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
        b'{"success":"User user was successfully added"}\n',
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
        b'{"error":"The following fields are required and cannot be empty: firstname"}\n',
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
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
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
        b'{"error":"User user is already registered."}\n',
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
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
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
        b'{"error":"The following fields are required and cannot be empty: firstname"}\n',
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
        b'{"error":"The following fields are required and cannot be empty: lastname"}\n',
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
        b'{"error":"The following fields are required and cannot be empty: password"}\n',
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
        b'{"error":"The following fields are required and cannot be empty: email"}\n',
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
        b'{"error":"Incorrect password"}\n',
    )

    check_post(
        "/api/login",
        400,
        {"username": "", "password": "1234"},
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
    )

    check_post(
        "/api/login",
        400,
        {"username": None, "password": "1234"},
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
    )

    check_post(
        "/api/login",
        400,
        {"username": "", "password": ""},
        b'{"error":"The following fields are required and cannot be empty: username, password"}\n',
    )

    check_post(
        "/api/login",
        401,
        {"username": "no_user", "password": "1234"},
        b'{"error":"Incorrect username"}\n',
    )

    check_post(
        "/api/login",
        400,
        {"password": "1234"},
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
    )


def update():
    check_put_token(
        "/api/modify-general",
        400,
        {"email": "b@b.com"},
        b'{"error":"The following fields are required and cannot be empty: firstname, lastname, selectedGender, sexualPreference, bio"}\n',
    )
    check_put_token(
        "/api/modify-general",
        200,
        {
            "firstname": "Johnny",
            "lastname": "Appleseed",
            "selectedGender": "m",
            "sexualPreference": "e",
            "bio": "I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.",
        },
        b'{"success":"profile updated"}\n',
    )
    check_put_token(
        "/api/modify-general",
        200,
        {
            "firstname": "Johnny",
            "lastname": "Appleseed",
            "selectedGender": "ma",
            "sexualPreference": "e",
            "bio": "I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.",
        },
        b'{"error":"value too long for type character(1)\\n"}\n',
    )
    check_put(
        "/api/modify-general",
        401,
        {"firstname": "Johnny"},
        b'{"msg":"Missing Authorization Header"}\n',
    )


def interests():
    check_get_token("/api/get-interests", 201, b'{"interests":[]}\n')
    check_put_token(
        "/api/modify-interests",
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
        b'{"success":"change interests"}\n',
    )
    check_get_token(
        "/api/get-interests",
        201,
        b'{"interests":["technology","movies","nature","hiking","cooking","meditation","fashion"]}\n',
    )
    check_put_token(
        "/api/modify-interests",
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
        b'{"success":"change interests"}\n',
    )
    check_get_token(
        "/api/get-interests",
        201,
        b'{"interests":["technology","nature","hiking","meditation","fashion"]}\n',
    )


def main():
    register()
    login()
    update()
    interests()
    check_post_token_file(
        "/api/modify-pictures",
        201,
        "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed1.jpg",
        b'{"success":"file uploaded"}\n',
    )
    check_post_token_file(
        "/api/modify-pictures",
        201,
        [
            "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed2.jpg",
            "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed3.jpg",
        ],
        b'{"success":"file uploaded"}\n',
    )
    check_post_token_file(
        "/api/modify-pictures",
        401,
        [
            "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed1.jpg",
            "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed3.jpg",
            "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed4.jpg",
        ],
        b'{"error":"too many pictures"}\n',
    )
    check_post_token_file(
        "/api/modify-pictures",
        201,
        [
            "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed3.jpg",
            "../frontend/AngularApp/public/dummy-pics/johnnyAppleseed4.jpg",
        ],
        b'{"success":"file uploaded"}\n',
    )
    check_put_token(
        "/api/modify-profile-picture",
        201,
        {
            "selectedPictures": "johnnyAppleseed1.jpg",
        },
        b'{"success":"change profile picture"}\n',
    )
    check_get_token("/api/deleteme", 200, b'{"success":"user delete"}\n')


if __name__ == "__main__":
    main()
