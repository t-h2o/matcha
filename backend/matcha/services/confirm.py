from flask import jsonify

from jwt import encode, decode, InvalidSignatureError

from matcha.app_utils import flaskprint


def _generate_confim_token(id_user: int, email: str):
    data = {"id_user": id_user, "email": email}
    token = encode(data, "secret", algorithm="HS512")
    return token


def _verify_token(id_user: int, jwt: str):
    try:
        # data = decode(jwt, "secret", algorithm="HS512")
        data = decode(jwt, "secret", algorithms=["HS512"])
    except InvalidSignatureError as e:
        flaskprint(f"--error {e}")
        return "bad token"

    except Exception as e:
        flaskprint(f"error ---{e}")
        return "bad token"

    flaskprint(data)
    return "ok"


def services_confirm(id_user: int):
    token = _generate_confim_token(id_user, "email")
    gt
    return jsonify({"token": token}), 201


def services_confirm_jwt(id_user: int, jwt: str):
    result = _verify_token(id_user, jwt)
    return jsonify({"ok": result}), 201
