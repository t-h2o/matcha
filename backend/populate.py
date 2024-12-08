#!/bin/python

json_file = "fakedata/faker.json"

from werkzeug.security import generate_password_hash
from string import Template
from json import load


def number_to_interests(seed: int) -> list:
    """
    seed will create an random array of interests.

    for that the function trunc the seed between 0 and (2 ^ number of interest)

    convert the seed to binary, and each bit is a bool on the array of interest
    """

    all_interests = [
        "travel",
        "fitness",
        "music",
        "photography",
        "gaming",
        "yoga",
        "reading",
        "movies",
        "cooking",
        "hiking",
        "technology",
        "fashion",
        "nature",
        "meditation",
        "tattoos",
        "cats",
        "dogs",
        "dance",
    ]

    seed = seed % (pow(2, len(all_interests)) - 1)
    interests = []
    for index in range(0, len(all_interests)):
        if seed % 2:
            interests.append(all_interests[index])
        seed //= 2

    return interests


def short_sex(sexe):
    if sexe == "female":
        return "f"
    if sexe == "male":
        return "m"


def fame(random):
    return random % 6


def age(random):
    return (random % (120 - 18)) + 18


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


def _generate_sql_interest(all_users):
    fake_data = open(json_file)
    fake = load(fake_data)
    fake_data.close()
    query = "INSERT INTO user_interests (user_id, interest_id) VALUES\n"
    for index, user in enumerate(all_users):

        username = user["username"]
        interests = number_to_interests(
            (fake[index]["int.2"] % 999) * (fake[index]["int"] % 998)
        )
        for index_i, interest in enumerate(interests):
            if index != 0 or index_i != 0:
                query += ",\n"
            query += f" ((SELECT id from users WHERE username = '{user['username']}'), (SELECT id FROM interests WHERE name = '{interest}'))"
    query += ";"
    print(query)


def _generate_sql(all_users):
    print(
        "INSERT INTO users (username, firstname, lastname, email, password, bio, gender, sexual_orientation, age, fame_rating) VALUES"
    )

    t_line_user = Template(
        "('$username', '$firstName', '$lastName', '$email', '$password', '$bio', '$gender', '$sexualPreference', $age, $fame)"
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
                }
            )

    return all_users


def main():
    all_users = generate_all_users()
    _generate_sql(all_users)
    _generate_sql_interest(all_users)


if __name__ == "__main__":
    main()
