#!/bin/python

json_file = "fakedata/faker.json"

from test_utils import (
    check_login_token,
    check_post,
    check_put_token,
)

from json import load


def short_sex(sexe):
    if sexe == "female":
        return "f"
    if sexe == "male":
        return "m"


def sexualpreference(sexe):
    if sexe == True:
        return "h"
    if sexe == False:
        return "e"


def create_another_user(
    username, firstname, lastname, email, password, age, bio, sexe, sexual_preference
):

    check_post(
        "/api/register",
        200,
        {
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
        },
        {"success": f"User {username} was successfully added"},
    )
    access_token = check_login_token(
        "/api/login",
        {"username": username, "password": password},
    )
    print(access_token)
    if access_token is None:
        return
    check_put_token(
        "/api/users",
        200,
        {
            "age": age,
            "firstname": firstname,
            "lastname": lastname,
            "selectedGender": sexe,
            "sexualPreference": sexual_preference,
            "bio": bio,
        },
        {
            "age": 18,
            "bio": bio,
            "email_verified": False,
            "firstname": firstname,
            "lastname": lastname,
            "selectedGender": sexe,
            "sexualPreference": sexual_preference,
        },
    )


def main():
    with open(json_file) as f:
        d = load(f)
        for item in d:
            print(item)
            create_another_user(
                item["firstName"].lower(),
                item["firstName"],
                item["lastName"],
                item["email"],
                item["password"],
                18,
                item["bio"],
                short_sex(item["sex"]),
                sexualpreference(item["boolean"]),
            )


if __name__ == "__main__":
    main()
