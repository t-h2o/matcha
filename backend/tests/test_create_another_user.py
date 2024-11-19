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
