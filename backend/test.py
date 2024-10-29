#!/bin/python


from requests import put
from requests import post
from requests import get

from json import loads

from test_utils import print_error_post
from test_utils import print_error_get

URL = "http://localhost:5001"


HTTP_405 = b"<!doctype html>\n<html lang=en>\n<title>405 Method Not Allowed</title>\n<h1>Method Not Allowed</h1>\n<p>The method is not allowed for the requested URL.</p>\n"


class bcolors:
    OKGREEN = "\033[92m"
    ENDC = "\033[0m"


def check_login_token(path, json):
    headers = {"content-type": "application/json"}

    response = post(URL + path, json=json, headers=headers)

    if response.status_code != 200:
        print(f"error: status code {response.status_code}")

    json = loads(response.content)

    if "access_token" not in json:
        print("error: access token not in response")

    print(bcolors.OKGREEN + "success: got access token" + bcolors.ENDC)

    global access_token

    access_token = json["access_token"]


def check_415(path):
    headers = {"content-type": "application/not_json"}

    json = {}

    response = post(URL + path, json=json, headers=headers)

    if response.status_code != 415:
        print(f"error: status code {response.status_code}")

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + " 415 error")


def check_api_get(path, status, content):
    response = get(URL + path)

    if response.content != content:
        print("--- bad content ---")
        print_error_get(
            URL, path, status, response.status_code, content, response.content
        )
        return
    if response.status_code != status:
        print("--- bad http code ---")
        print_error_get(
            URL, path, status, response.status_code, content, response.content
        )

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + str(content))


def check_api_put(path, status, json, content):
    headers = {"content-type": "application/json"}

    response = put(URL + path, json=json, headers=headers)

    if response.content != content:
        print("--- bad content ---")
        print_error_post(
            URL, path, json, status, response.status_code, content, response.content
        )
        return
    if response.status_code != status:
        print("--- bad http code ---")
        print_error_post(
            URL, path, json, status, response.status_code, content, response.content
        )
        return

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + " " + str(content))


def check_api_post(path, status, json, content):
    headers = {"content-type": "application/json"}

    response = post(URL + path, json=json, headers=headers)

    if response.content != content:
        print("--- bad content ---")
        print_error_post(
            URL, path, json, status, response.status_code, content, response.content
        )
        return
    if response.status_code != status:
        print("--- bad http code ---")
        print_error_post(
            URL, path, json, status, response.status_code, content, response.content
        )
        return

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + " " + str(content))


def check_put_token(path, json, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = put(URL + path, headers=headers, json=json)

    if response.content != content:
        print(f"error: content {response.content}")
        return

    print(
        bcolors.OKGREEN
        + "success: "
        + bcolors.ENDC
        + path
        + " "
        + str(response.content)
    )


def register():
    check_415("/api/register")
    check_api_get("/api/register", 405, HTTP_405)
    check_api_post(
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

    check_api_post(
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

    check_api_post(
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

    check_api_post(
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

    check_api_post(
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

    check_api_post(
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

    check_api_post(
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

    check_api_post(
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

    check_api_post(
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

    check_api_post(
        "/api/login",
        401,
        {"username": "user", "password": "bad"},
        b'{"error":"Incorrect password"}\n',
    )

    check_api_post(
        "/api/login",
        400,
        {"username": "", "password": "1234"},
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
    )

    check_api_post(
        "/api/login",
        400,
        {"username": None, "password": "1234"},
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
    )

    check_api_post(
        "/api/login",
        400,
        {"username": "", "password": ""},
        b'{"error":"The following fields are required and cannot be empty: username, password"}\n',
    )

    check_api_post(
        "/api/login",
        401,
        {"username": "no_user", "password": "1234"},
        b'{"error":"Incorrect username"}\n',
    )

    check_api_post(
        "/api/login",
        400,
        {"password": "1234"},
        b'{"error":"The following fields are required and cannot be empty: username"}\n',
    )


def update():
    check_put_token(
        "/api/modify-general",
        {"email": "b@b.com"},
        b'{"error":"The following fields are required and cannot be empty: firstname, lastname, selectedGender, sexualPreference, bio"}\n',
    )
    check_put_token(
        "/api/modify-general",
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
        {
            "firstname": "Johnny",
            "lastname": "Appleseed",
            "selectedGender": "ma",
            "sexualPreference": "e",
            "bio": "I am a very interesting person. I like to do interesting things and go to interesting places. I am looking for someone who is also interesting.",
        },
        b'{"error":"value too long for type character(1)\\n"}\n',
    )
    check_api_put(
        "/api/modify-general",
        401,
        {"firstname": "Johnny"},
        b'{"msg":"Missing Authorization Header"}\n',
    )


def main():
    register()
    login()
    update()


if __name__ == "__main__":
    main()
