from requests import put
from requests import post
from requests import get
from json import loads


class bcolors:
    OKGREEN = "\033[92m"
    ENDC = "\033[0m"


URL = "http://localhost:5001"


def print_error_post(
    url, path, json, code_expected, code_received, content_expected, content_received
):
    print("----")
    print(f"url: {url}")
    print(f"path: {path}")
    print(f"json: {json}")
    print(f"expected: {content_expected}")
    print(f"received: {content_received}")
    print(f"code expected: {code_expected}")
    print(f"code received: {code_received}")
    print("----")


def print_error_get(
    url, path, code_expected, code_received, content_expected, content_received
):
    print("----")
    print(f"url: {url}")
    print(f"path: {path}")
    print(f"expected: {content_expected}")
    print(f"received: {content_received}")
    print(f"code expected: {code_expected}")
    print(f"code received: {code_received}")
    print("----")


def check_content_code(
    url, path, json, code_expected, code_received, content_expected, content_received
):
    if content_received != content_expected:
        print("--- bad content ---")
        print_error_post(
            url,
            path,
            json,
            code_expected,
            code_received,
            content_expected,
            content_received,
        )
        return

    if code_received != code_expected:
        print("--- bad http code ---")
        print_error_post(
            url,
            path,
            json,
            code_expected,
            code_received,
            content_expected,
            content_received,
        )
        return

    print(
        bcolors.OKGREEN
        + "success: "
        + bcolors.ENDC
        + path
        + " "
        + str(content_expected)
    )


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


def check_get(path, status, content):
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


def check_put(path, status, json, content):
    headers = {"content-type": "application/json"}

    response = put(URL + path, json=json, headers=headers)

    check_content_code(
        URL, path, json, status, response.status_code, content, response.content
    )


def check_post(path, status, json, content):
    headers = {"content-type": "application/json"}

    response = post(URL + path, json=json, headers=headers)

    check_content_code(
        URL, path, json, status, response.status_code, content, response.content
    )


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
