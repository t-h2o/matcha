#!/bin/python

from test_utils import (
    check_login_token,
    check_415,
    check_get,
    check_post,
    check_put,
    check_put_token,
    check_post_token,
    check_get_token,
    check_get_token_pictures,
    check_post_token_pictures,
    check_put_token_pictures,
)

HTTP_405 = b"<!doctype html>\n<html lang=en>\n<title>405 Method Not Allowed</title>\n<h1>Method Not Allowed</h1>\n<p>The method is not allowed for the requested URL.</p>\n"


def test_create_another_user():
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
            "email": "another@flask.py",
            "email_verified": False,
            "fameRating": 0,
            "firstname": "Another",
            "lastname": "User",
            "profile_complete": True,
            "selectedGender": "m",
            "sexualPreference": "e",
            "urlProfile": "http://localhost:5001/api/images/avatar.png",
            "username": "another",
        },
    )


def test_register():
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


def test_login():
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


def test_update():
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
            "urlProfile": "http://localhost:5001/api/images/avatar.png",
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
            "profile_complete": True,
            "selectedGender": "m",
            "sexualPreference": "e",
            "urlProfile": "http://localhost:5001/api/images/avatar.png",
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
            "profile_complete": True,
            "selectedGender": "m",
            "sexualPreference": "e",
            "urlProfile": "http://localhost:5001/api/images/avatar.png",
            "username": "user",
        },
    )
    check_get_token(
        "/api/users?username=another",
        200,
        {
            "age": 18,
            "bio": "My bio is short.",
            "fameRating": 0,
            "firstname": "Another",
            "gender": "m",
            "interests": [],
            "isLiked": False,
            "lastname": "User",
            "pictures": ["http://localhost:5001/api/images/avatar.png"],
            "sexualPreference": "e",
            "urlProfile": "http://localhost:5001/api/images/avatar.png",
            "username": "another",
        },
    )


def test_interests():
    check_get_token("/api/interests", 201, {"interests": []})
    check_put_token(
        "/api/interests",
        201,
        {"interests": ["hiking", "technology", "fashion", "nature", "meditation"]},
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


def test_pictures():
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


def test_email():
    check_put_token(
        "/api/email",
        201,
        {
            "email": "test@python.py",
        },
        {"email": "test@python.py"},
    )
    check_get_token("/api/email", 201, {"email": "test@python.py"})


def test_deleteme():
    check_login_token(
        "/api/login",
        {"username": "user", "password": "1234"},
    )
    check_get_token("/api/deleteme", 200, {"success": "user delete"})
    check_login_token(
        "/api/login",
        {"username": "another", "password": "5678"},
    )
    check_get_token("/api/deleteme", 200, {"success": "user delete"})


def test_reset_password():
    check_post(
        "/api/reset-password",
        201,
        {"username": "user"},
        {"success": "email with password reset link sent"},
    )


def test_browsing():
    check_get_token(
        "/api/browsing",
        200,
        [
            {
                "age": 70,
                "fameRating": 2,
                "firstname": "Foster",
                "gender": "f",
                "lastname": "Marquardt",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "foster",
            },
            {
                "age": 110,
                "fameRating": 4,
                "firstname": "Marquise",
                "gender": "f",
                "lastname": "Kautzer",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "marquise",
            },
            {
                "age": 82,
                "fameRating": 0,
                "firstname": "Doris",
                "gender": "f",
                "lastname": "Altenwerth",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "doris",
            },
            {
                "age": 54,
                "fameRating": 2,
                "firstname": "Peyton",
                "gender": "f",
                "lastname": "King",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "peyton",
            },
            {
                "age": 54,
                "fameRating": 2,
                "firstname": "Asa",
                "gender": "f",
                "lastname": "Zboncak",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "asa",
            },
            {
                "age": 60,
                "fameRating": 0,
                "firstname": "Jazmin",
                "gender": "f",
                "lastname": "O'Conner",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "jazmin",
            },
            {
                "age": 76,
                "fameRating": 2,
                "firstname": "Sasha",
                "gender": "f",
                "lastname": "Hermiston",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "sasha",
            },
            {
                "age": 96,
                "fameRating": 4,
                "firstname": "Bernita",
                "gender": "f",
                "lastname": "Padberg",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "bernita",
            },
            {
                "age": 58,
                "fameRating": 0,
                "firstname": "Marquis",
                "gender": "f",
                "lastname": "Waelchi",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "marquis",
            },
            {
                "age": 18,
                "fameRating": 2,
                "firstname": "Mitchel",
                "gender": "f",
                "lastname": "Legros",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "mitchel",
            },
            {
                "age": 52,
                "fameRating": 4,
                "firstname": "Josh",
                "gender": "f",
                "lastname": "Dickinson",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "josh",
            },
            {
                "age": 78,
                "fameRating": 4,
                "firstname": "Timothy",
                "gender": "f",
                "lastname": "Tremblay",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "timothy",
            },
            {
                "age": 22,
                "fameRating": 4,
                "firstname": "Abel",
                "gender": "f",
                "lastname": "Will",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "abel",
            },
            {
                "age": 46,
                "fameRating": 0,
                "firstname": "Philip",
                "gender": "f",
                "lastname": "Dicki",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "philip",
            },
            {
                "age": 38,
                "fameRating": 2,
                "firstname": "Antoinette",
                "gender": "f",
                "lastname": "Krajcik",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "antoinette",
            },
            {
                "age": 62,
                "fameRating": 0,
                "firstname": "Ardella",
                "gender": "f",
                "lastname": "Swift",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "ardella",
            },
            {
                "age": 84,
                "fameRating": 2,
                "firstname": "Houston",
                "gender": "f",
                "lastname": "Feil",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "houston",
            },
            {
                "age": 46,
                "fameRating": 4,
                "firstname": "Elwyn",
                "gender": "f",
                "lastname": "Rohan",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "elwyn",
            },
            {
                "age": 112,
                "fameRating": 4,
                "firstname": "Lacy",
                "gender": "f",
                "lastname": "Gislason",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "lacy",
            },
            {
                "age": 18,
                "fameRating": 4,
                "firstname": "Bonnie",
                "gender": "f",
                "lastname": "Wuckert",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "bonnie",
            },
            {
                "age": 112,
                "fameRating": 0,
                "firstname": "Eve",
                "gender": "f",
                "lastname": "Schowalter",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "eve",
            },
            {
                "age": 68,
                "fameRating": 0,
                "firstname": "Luella",
                "gender": "f",
                "lastname": "Brown",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "luella",
            },
            {
                "age": 98,
                "fameRating": 0,
                "firstname": "Leta",
                "gender": "f",
                "lastname": "Hyatt",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "leta",
            },
            {
                "age": 30,
                "fameRating": 2,
                "firstname": "Antwon",
                "gender": "f",
                "lastname": "O'Hara",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "antwon",
            },
            {
                "age": 46,
                "fameRating": 4,
                "firstname": "Ben",
                "gender": "f",
                "lastname": "D'Amore",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "ben",
            },
            {
                "age": 18,
                "fameRating": 4,
                "firstname": "Josiane",
                "gender": "f",
                "lastname": "Fisher",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "josiane",
            },
            {
                "age": 82,
                "fameRating": 2,
                "firstname": "Aida",
                "gender": "f",
                "lastname": "Marvin",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "aida",
            },
            {
                "age": 60,
                "fameRating": 4,
                "firstname": "Benedict",
                "gender": "f",
                "lastname": "Luettgen",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "benedict",
            },
            {
                "age": 52,
                "fameRating": 0,
                "firstname": "Glenna",
                "gender": "f",
                "lastname": "Lehner",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "glenna",
            },
            {
                "age": 18,
                "fameRating": 0,
                "firstname": "Bethany",
                "gender": "f",
                "lastname": "Hintz",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "bethany",
            },
            {
                "age": 18,
                "fameRating": 2,
                "firstname": "Camren",
                "gender": "f",
                "lastname": "Bechtelar",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "camren",
            },
        ],
    )
    check_post_token(
        "/api/browsing",
        200,
        {
            "ageGap": 0,
            "fameGap": 0,
            "distance": 0,
            "interests": [],
        },
        [],
    )
    check_post_token(
        "/api/browsing",
        200,
        {
            "ageGap": 31,
            "fameGap": 5,
            "distance": 42, # update users set (latitude, longitude) = (46.532327, 6.591987) where username = 'user'
            "interests": [],
        },
        [
            {
                "age": 110,
                "fameRating": 4,
                "firstname": "Marquise",
                "gender": "f",
                "lastname": "Kautzer",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "marquise",
            },
            {
                "age": 18,
                "fameRating": 2,
                "firstname": "Camren",
                "gender": "f",
                "lastname": "Bechtelar",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "camren",
            },
        ],
    )
    check_post_token(
        "/api/browsing",
        200,
        {
            "ageGap": 20,
            "fameGap": 5,
            "distance": 101,
            "interests": [],
        },
        [
            {
                "age": 18,
                "fameRating": 2,
                "firstname": "Mitchel",
                "gender": "f",
                "lastname": "Legros",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "mitchel",
            },
            {
                "age": 22,
                "fameRating": 4,
                "firstname": "Abel",
                "gender": "f",
                "lastname": "Will",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "abel",
            },
            {
                "age": 38,
                "fameRating": 2,
                "firstname": "Antoinette",
                "gender": "f",
                "lastname": "Krajcik",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "antoinette",
            },
            {
                "age": 18,
                "fameRating": 4,
                "firstname": "Bonnie",
                "gender": "f",
                "lastname": "Wuckert",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "bonnie",
            },
            {
                "age": 30,
                "fameRating": 2,
                "firstname": "Antwon",
                "gender": "f",
                "lastname": "O'Hara",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "antwon",
            },
            {
                "age": 18,
                "fameRating": 4,
                "firstname": "Josiane",
                "gender": "f",
                "lastname": "Fisher",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "josiane",
            },
            {
                "age": 18,
                "fameRating": 0,
                "firstname": "Bethany",
                "gender": "f",
                "lastname": "Hintz",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "bethany",
            },
            {
                "age": 18,
                "fameRating": 2,
                "firstname": "Camren",
                "gender": "f",
                "lastname": "Bechtelar",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "camren",
            },
        ],
    )
    check_post_token(
        "/api/browsing",
        200,
        {
            "ageGap": 15,
            "fameGap": 3,
            "distance": 101,
            "interests": [],
        },
        [
            {
                "age": 18,
                "fameRating": 2,
                "firstname": "Mitchel",
                "gender": "f",
                "lastname": "Legros",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "mitchel",
            },
            {
                "age": 30,
                "fameRating": 2,
                "firstname": "Antwon",
                "gender": "f",
                "lastname": "O'Hara",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "antwon",
            },
            {
                "age": 18,
                "fameRating": 0,
                "firstname": "Bethany",
                "gender": "f",
                "lastname": "Hintz",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "bethany",
            },
            {
                "age": 18,
                "fameRating": 2,
                "firstname": "Camren",
                "gender": "f",
                "lastname": "Bechtelar",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "camren",
            },
        ],
    )
    check_post_token(
        "/api/browsing",
        200,
        {
            "ageGap": 31,
            "fameGap": 1,
            "distance": 101,
            "interests": [],
        },
        [
            {
                "age": 82,
                "fameRating": 0,
                "firstname": "Doris",
                "gender": "f",
                "lastname": "Altenwerth",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "doris",
            },
            {
                "age": 60,
                "fameRating": 0,
                "firstname": "Jazmin",
                "gender": "f",
                "lastname": "O'Conner",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "jazmin",
            },
            {
                "age": 58,
                "fameRating": 0,
                "firstname": "Marquis",
                "gender": "f",
                "lastname": "Waelchi",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "marquis",
            },
            {
                "age": 46,
                "fameRating": 0,
                "firstname": "Philip",
                "gender": "f",
                "lastname": "Dicki",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "philip",
            },
            {
                "age": 62,
                "fameRating": 0,
                "firstname": "Ardella",
                "gender": "f",
                "lastname": "Swift",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "ardella",
            },
            {
                "age": 112,
                "fameRating": 0,
                "firstname": "Eve",
                "gender": "f",
                "lastname": "Schowalter",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "eve",
            },
            {
                "age": 68,
                "fameRating": 0,
                "firstname": "Luella",
                "gender": "f",
                "lastname": "Brown",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "luella",
            },
            {
                "age": 98,
                "fameRating": 0,
                "firstname": "Leta",
                "gender": "f",
                "lastname": "Hyatt",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "leta",
            },
            {
                "age": 52,
                "fameRating": 0,
                "firstname": "Glenna",
                "gender": "f",
                "lastname": "Lehner",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "glenna",
            },
            {
                "age": 18,
                "fameRating": 0,
                "firstname": "Bethany",
                "gender": "f",
                "lastname": "Hintz",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "bethany",
            },
        ],
    )
    check_post_token(
        "/api/browsing",
        200,
        {
            "ageGap": 31,
            "fameGap": 1,
            "distance": 101,
            "interests": ["fitness", "music", "yoga"],
        },
        [
            {
                "age": 82,
                "fameRating": 0,
                "firstname": "Doris",
                "gender": "f",
                "lastname": "Altenwerth",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "doris",
            }
        ],
    )
    check_post_token(
        "/api/browsing",
        200,
        {
            "ageGap": 31,
            "fameGap": 5,
            "distance": 101,
            "interests": ["travel", "reading"],
        },
        [
            {
                "age": 38,
                "fameRating": 2,
                "firstname": "Antoinette",
                "gender": "f",
                "lastname": "Krajcik",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "antoinette",
            },
            {
                "age": 62,
                "fameRating": 0,
                "firstname": "Ardella",
                "gender": "f",
                "lastname": "Swift",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "ardella",
            },
            {
                "age": 98,
                "fameRating": 0,
                "firstname": "Leta",
                "gender": "f",
                "lastname": "Hyatt",
                "sexualPreference": "e",
                "urlProfile": "no url",
                "username": "leta",
            },
        ],
    )


def test_like_user():
    check_login_token(
        "/api/login",
        {"username": "user", "password": "1234"},
    )
    check_get_token(
        "/api/like-user",
        201,
        {
            "likers": [],
        },
    )
    check_post_token(
        "/api/like-user",
        201,
        {
            "like": "another",
        },
        {
            "isLiked": True,
        },
    )
    check_login_token(
        "/api/login",
        {"username": "another", "password": "5678"},
    )
    check_get_token(
        "/api/like-user",
        201,
        {
            "likers": ["user"],
        },
    )
    check_post_token(
        "/api/like-user",
        201,
        {
            "like": "user",
        },
        {
            "isLiked": True,
        },
    )

    check_login_token(
        "/api/login",
        {"username": "user", "password": "1234"},
    )
    check_post_token(
        "/api/like-user",
        201,
        {
            "dislike": "another",
        },
        {
            "isLiked": False,
        },
    )
    check_login_token(
        "/api/login",
        {"username": "another", "password": "5678"},
    )
    check_get_token(
        "/api/like-user",
        201,
        {
            "likers": [],
        },
    )
    check_post_token(
        "/api/like-user",
        201,
        {
            "dislike": "user",
        },
        {
            "isLiked": False,
        },
    )
    check_login_token(
        "/api/login",
        {"username": "user", "password": "1234"},
    )
    check_get_token(
        "/api/like-user",
        201,
        {
            "likers": [],
        },
    )


def main():
    test_register()
    test_create_another_user()
    test_login()
    test_update()
    test_interests()
    test_pictures()
    test_email()
    test_reset_password()
    test_browsing()
    test_like_user()
    test_deleteme()


if __name__ == "__main__":
    main()
