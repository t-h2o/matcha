#!/bin/python

json_file = "fakedata/faker.json"

from werkzeug.security import generate_password_hash
from string import Template
from json import load


RANGE_LATITUDE = [45.907168, 47.68394]
RANGE_LONGITUDE = [5.963634, 10.35195]


def short_sex(sexe):
    if sexe == "female":
        return "f"
    if sexe == "male":
        return "m"


def fame(random):
    return random % 6


def age(random):
    return (random % (120 - 18)) + 18


def latitude(random):
    while random >= 1.0:
        random /= 10

    return RANGE_LATITUDE[0] + random * (RANGE_LATITUDE[1] - RANGE_LATITUDE[0])


def longitude(random):
    while random >= 1.0:
        random /= 10

    return RANGE_LONGITUDE[0] + random * (RANGE_LONGITUDE[1] - RANGE_LONGITUDE[0])


def sexualpreference(sexe):
    if sexe == True:
        return "o"
    if sexe == False:
        return "e"


def _check_double_value(array_object, key_to_check, value):
    return [x for x in array_object if x[key_to_check] == value]


def sanitize(value):
    if type(value) == str:
        return value.replace("'", "''")
    return value



def _generate_sql(all_users):
    print(
        "INSERT INTO users (username, firstname, lastname, email, password, bio, gender, sexual_orientation, age, fame_rating, latitude, longitude) VALUES"
    )

    t_line_user = Template(
        "('$username', '$firstName', '$lastName', '$email', '$password', '$bio', '$gender', '$sexualPreference', $age, $fame, $latitude, $longitude)"
    )

    length = len(all_users) - 1
    for index, user in enumerate(all_users):
        for value in user:
            user[value] = sanitize(user[value])
        if index < length:
            print(t_line_user.substitute(user) + ",")
        else:
            print(t_line_user.substitute(user) + ";")


def generate_all_users():
    all_users = []
    with open(json_file) as f:
        d = load(f)
        for item in d:
            if all_users != []:
                if _check_double_value(
                    all_users, "username", item["firstName"].lower()
                ):
                    continue
                if _check_double_value(all_users, "email", item["email"]):
                    continue

            all_users.append(
                {
                    "username": item["firstName"].lower(),
                    "firstName": item["firstName"],
                    "lastName": item["lastName"],
                    "email": item["email"],
                    "password": generate_password_hash(item["password"]),
                    "password": "1234",
                    "age": age(item["int"]),
                    "bio": item["bio"],
                    "gender": short_sex(item["sex"]),
                    "sexualPreference": sexualpreference(item["boolean"]),
                    "fame": fame(item["int.2"]),
                    "latitude": latitude(item["int.2"]),
                    "longitude": longitude(item["int.2"]),
                }
            )

    return all_users


def main():
    all_users = generate_all_users()
    _generate_sql(all_users)


if __name__ == "__main__":
    main()
