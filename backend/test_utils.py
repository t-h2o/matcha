from requests import put
from requests import post
from requests import get
from requests import delete
from json import loads

import re


class bcolors:
    OKGREEN = "\033[92m"
    ENDC = "\033[0m"


URL = "http://localhost:5001"


def print_diff(expected: dict, received: dict) -> None:
    print("------------ diff ------------")
    if not isinstance(expected, dict):
        return
    if not isinstance(received, dict):
        return
    keys_expected = set(expected.keys())
    keys_received = set(received.keys())
    keys_diff = keys_received - keys_expected

    if len(keys_diff) != 0:
        print(keys_expected)
        print(keys_received)
        print(keys_diff)
        return

    result = {}
    for key in keys_expected:
        if expected[key] != received[key]:
            print(f'for key : "{key}"')
            print(f"- {received[key]}")
            print(f"+ {expected[key]}")
    print("------------ diff ------------")


def print_error(
    url,
    path,
    code_expected,
    code_received,
    content_expected,
    content_received,
    json=None,
):
    print("----")
    print(f"url: {url}")
    print(f"path: {path}")
    if json:
        print(f"json: {json}")
    print(f"expected: {content_expected}")
    print(f"received: {content_received}")
    print(f"code expected: {code_expected}")
    print(f"code received: {code_received}")
    print_diff(content_expected, content_received)
    print("----")


def check_content_code(
    url,
    path,
    code_expected,
    code_received,
    content_expected,
    content_received,
    json=None,
):
    try:
        received_loaded = loads(content_received)
    except Exception as e:
        print(str(e))
        print_error(
            url,
            path,
            code_expected,
            code_received,
            content_expected,
            content_received,
            json,
        )
        return

    if "lastConnection" in content_expected and "lastConnection" in received_loaded:
        if not isinstance(received_loaded["lastConnection"], float):
            print("--- bad content [e] ---")
            print("lastConnection is not a float")
            return
        content_expected.pop("lastConnection")
        received_loaded.pop("lastConnection")

    if "timestamp" in content_expected and "timestamp" in received_loaded:
        if not isinstance(received_loaded["timestamp"], float):
            print("--- bad content [e] ---")
            print("timestamp is not a float")
            return
        content_expected.pop("timestamp")
        received_loaded.pop("timestamp")

    if isinstance(received_loaded, list):
        if (
            len(received_loaded) > 0
            and isinstance(received_loaded[0], dict)
            and "timestamp" in received_loaded[0]
        ):
            if len(received_loaded) != len(content_expected):
                print("--- bad content [a] ---")
                print_error(
                    url,
                    path,
                    code_expected,
                    code_received,
                    content_expected,
                    received_loaded,
                    json,
                )
                return
            for index, notification in enumerate(received_loaded):
                for key in notification:
                    if key == "timestamp" or key == "id":
                        continue
                    try:
                        if notification[key] != content_expected[index][key]:
                            print("--- bad content [b] ---")
                            print_error(
                                url,
                                path,
                                code_expected,
                                code_received,
                                content_expected,
                                received_loaded,
                                json,
                            )
                            return
                    except:
                        print("--- bad content [c] ---")
                        print_error(
                            url,
                            path,
                            code_expected,
                            code_received,
                            content_expected,
                            received_loaded,
                            json,
                        )
                        return
            print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path)
            return

    if received_loaded != content_expected:
        print("--- bad content [d] ---")
        print_error(
            url,
            path,
            code_expected,
            code_received,
            content_expected,
            received_loaded,
            json,
        )
        return

    if code_received != code_expected:
        print("--- bad http code ---")
        print_error(
            url,
            path,
            code_expected,
            code_received,
            content_expected,
            received_loaded,
            json,
        )
        return

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path)


def check_login_token(path, json):
    headers = {"content-type": "application/json"}

    response = post(URL + path, json=json, headers=headers)

    if response.status_code != 200:
        print(f"error: status code {response.status_code}")

    json = loads(response.content)

    if "access_token" not in json:
        print("error: access token not in response")
        return

    print(bcolors.OKGREEN + "success: got access token" + bcolors.ENDC)

    global access_token

    access_token = json["access_token"]

    return access_token


def check_415(path):
    headers = {"content-type": "application/not_json"}

    json = {}

    response = post(URL + path, json=json, headers=headers)

    if response.status_code != 415:
        print(f"error: status code {response.status_code}")

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + " 415 error")


def check_get(path, status, content):
    response = get(URL + path)

    if response.content != content:
        print("--- bad content [get] ---")
        print_error(URL, path, status, response.status_code, content, response.content)
        return
    if response.status_code != status:
        print("--- bad http code ---")
        print_error(URL, path, status, response.status_code, content, response.content)

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + str(content))


def check_put(path, status, json, content):
    headers = {"content-type": "application/json"}

    response = put(URL + path, json=json, headers=headers)

    check_content_code(
        URL, path, status, response.status_code, content, response.content, json
    )


def check_post(path, status, json, content):
    headers = {"content-type": "application/json"}

    response = post(URL + path, json=json, headers=headers)

    check_content_code(
        URL, path, status, response.status_code, content, response.content, json
    )


def check_delete_token(path, status, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = delete(URL + path, headers=headers)

    check_content_code(
        URL, path, status, response.status_code, content, response.content
    )

    try:
        content = loads(response.content)
        return content
    except:
        pass


def check_delete_token_body(path, status, json, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = delete(URL + path, json=json, headers=headers)

    check_content_code(
        URL, path, status, response.status_code, content, response.content, json
    )

    try:
        content = loads(response.content)
        return content
    except:
        pass


def check_get_token(path, status, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = get(URL + path, headers=headers)

    check_content_code(
        URL, path, status, response.status_code, content, response.content
    )

    try:
        content = loads(response.content)
        return content
    except:
        pass


def check_post_token(path, status, json, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = post(URL + path, headers=headers, json=json)

    check_content_code(
        URL, path, status, response.status_code, content, response.content, json
    )


def check_put_token(path, status, json, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = put(URL + path, headers=headers, json=json)

    check_content_code(
        URL, path, status, response.status_code, content, response.content, json
    )


def check_pictures(
    content_expected, content_received, path, code_expected, code_received
):
    if "pictures" in content_received and "pictures" in content_expected:
        if content_expected["pictures"] != len(content_received["pictures"]):
            print("---- bad pictures number ----")
            print_error(
                URL,
                path,
                code_expected,
                code_received,
                content_expected,
                content_received,
            )
            return True
        for item in content_received["pictures"]:
            pattern = re.compile("^" + URL + "/api/images")
            if pattern.match(item) is None:
                print("---- bad error message ----")
                print_error(
                    URL,
                    path,
                    code_expected,
                    code_received,
                    content_expected,
                    content_received,
                )
                return True
    elif (
        "selectedPicture" in content_received and "selectedPicture" in content_expected
    ):
        pattern = re.compile("^" + URL + "/api/images")
        if pattern.match(content_received["selectedPicture"]) is None:
            print("---- bad error message ----")
            print_error(
                URL,
                path,
                code_expected,
                code_received,
                content_expected,
                content_received,
            )
            return True
    elif "error" in content_received and "error" in content_expected:
        if content_received["error"] != content_expected["error"]:
            print("---- bad error message ----")
            print_error(
                URL,
                path,
                code_expected,
                code_received,
                content_expected,
                content_received,
            )
            return True
    else:
        print("---- bad key ----")
        print_error(
            URL,
            path,
            code_expected,
            code_received,
            content_expected,
            content_received,
        )
        return True
    return False


def check_response_pictures(response, path, status, content):
    try:
        content_received = loads(response.content)
    except:
        print("---- cannot loads response.content ----")
        print_error(
            URL,
            path,
            status,
            response.status_code,
            content,
            response.content,
        )
        return
    if check_pictures(content, content_received, path, status, response.status_code):
        return

    print(bcolors.OKGREEN + "success: " + bcolors.ENDC + path + " " + str(content))


def check_get_token_pictures(path, status, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = get(URL + path, headers=headers)

    check_response_pictures(response, path, status, content)

    try:
        response_json = loads(response.content)
        if "pictures" in response_json:
            return response_json["pictures"]
    except:
        pass


def check_put_token_pictures(path, status, json, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = put(URL + path, json=json, headers=headers)

    check_response_pictures(response, path, status, content)


def check_post_token_pictures(path, status, filenames, content):
    headers = {"Authorization": f"Bearer {access_token}"}

    files = None

    if type(filenames) == str:
        files = {"pictures": open(filenames, "rb")}
    else:
        files = []
        for filename in filenames:
            files.append(("pictures", open(filename, "rb")))

    response = post(URL + path, files=files, headers=headers)

    check_response_pictures(response, path, status, content)
