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
