#!/bin/python


from requests import post
from requests import get

from json import loads

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

    print(
        bcolors.OKGREEN
        + "success: got access token: "
        + bcolors.ENDC
        + json["access_token"]
    )


def check_415(path):
    headers = {"content-type": "application/not_json"}

    json = {}

    response = post(URL + path, json=json, headers=headers)

    if response.status_code != 415:
        print(f"error: status code {response.status_code}")

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + " 415 error")


def check_api_get(path, status, content):
    response = get(URL + path)
    if response.status_code != status:
        print(f"error: status code {response.status_code}")
    if response.content != content:
        print(f"error: content {response.content}")
    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + str(content))


def check_api_post(path, status, json, content):
    headers = {"content-type": "application/json"}

    response = post(URL + path, json=json, headers=headers)

    if response.content != content:
        print(f"error: content {response.content}")
    if response.status_code != status:
        print(f"error: status code {response.status_code}")

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + " " + str(content))


def drop_table():
    check_415("/api/drop")
    check_api_post(
        "/api/drop",
        200,
        {"table": "users"},
        b'{"success":"Table users was successfully dropped"}\n',
    )
    check_api_post("/api/drop", 200, {"table": ""}, b'{"error":"table is required."}\n')
    check_api_get("/api/drop", 405, HTTP_405)


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
        b'{"succefull":"User user was succefull added"}\n',
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


def create_table():
    check_api_get("/api/create", 201, b'{"success":"Table \'users\' created"}\n')


def main():
    drop_table()
    create_table()
    register()
    login()


if __name__ == "__main__":
    main()
