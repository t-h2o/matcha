#!/bin/python


from requests import post
from requests import get


URL = "http://localhost:5001"


HTTP_405 = b"<!doctype html>\n<html lang=en>\n<title>405 Method Not Allowed</title>\n<h1>Method Not Allowed</h1>\n<p>The method is not allowed for the requested URL.</p>\n"


class bcolors:
    OKGREEN = "\033[92m"
    ENDC = "\033[0m"


def root():
    response = get(URL)
    print(response)
    print(response.status_code)
    print(response.text)
    print(response.content)


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
    check_api_post(
        "/drop",
        200,
        {"table": "users"},
        b'{"success":"Table users was successfully dropped"}\n',
    )
    check_api_post("/drop", 200, {"table": ""}, b'{"error":"table is required."}\n')
    check_api_get("/drop", 405, HTTP_405)


def register():
    check_api_get("/register", 405, HTTP_405)
    check_api_post(
        "/register",
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
        "/register",
        200,
        {
            "username": "user",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        b'{"error":"\'firstname\' is required."}\n',
    )

    check_api_post(
        "/register",
        200,
        {
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        b'{"error":"\'username\' is required."}\n',
    )

    check_api_post(
        "/register",
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
        "/register",
        200,
        {
            "username": "",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        b'{"error":"Username is required."}\n',
    )

    check_api_post(
        "/register",
        200,
        {
            "username": "user",
            "firstname": "",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "1234",
        },
        b'{"error":"Firstname is required."}\n',
    )

    check_api_post(
        "/register",
        200,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "",
            "email": "email@email.com",
            "password": "1234",
        },
        b'{"error":"Lastname is required."}\n',
    )

    check_api_post(
        "/register",
        200,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "email@email.com",
            "password": "",
        },
        b'{"error":"Password is required."}\n',
    )

    check_api_post(
        "/register",
        200,
        {
            "username": "user",
            "firstname": "firstname",
            "lastname": "lastname",
            "email": "",
            "password": "1234",
        },
        b'{"error":"Email is required."}\n',
    )


def login():
    check_api_post(
        "/login",
        200,
        {"username": "user", "password": "1234"},
        b'{"success":"loged"}\n',
    )

    check_api_post(
        "/login",
        200,
        {"username": "user", "password": "bad"},
        b'{"error":"Incorrect password"}\n',
    )

    check_api_post(
        "/login",
        200,
        {"username": "", "password": "1234"},
        b'{"error":"Username is required."}\n',
    )

    check_api_post(
        "/login",
        200,
        {"username": "no_user", "password": "1234"},
        b'{"error":"Incorrect username"}\n',
    )


def create_table():
    check_api_get("/create", 201, b'{"success":"Table \'users\' created"}\n')


def main():
    drop_table()
    create_table()
    register()
    login()


if __name__ == "__main__":
    main()
