from flask import jsonify, current_app

from jwt import encode, decode, InvalidSignatureError

from matcha.utils import flaskprint, send_mail
from matcha.db.user import db_get_email_where_id, db_confirm_email


def _generate_confim_token(id_user: int, email: str):
    data = {"id_user": id_user, "email": email}
    token = encode(data, "secret", algorithm="HS512")
    return token


def _verify_token(jwt: str):
    try:
        # data = decode(jwt, "secret", algorithm="HS512")
        data = decode(jwt, "secret", algorithms=["HS512"])
    except InvalidSignatureError as e:
        flaskprint(f"--error {e}")
        return {"error": "bad token"}, 401

    except Exception as e:
        flaskprint(f"error ---{e}")
        return {"error": "bad token"}, 401

    flaskprint(data)
    db_confirm_email(data["id_user"], data["email"])
    return {"success": "ok"}, 201


def services_confirm(id_user: int):
    email = db_get_email_where_id(id_user)
    token = _generate_confim_token(id_user, email)

    mail_title = "Confirm email"

    if current_app.config["MODE"] == "development":
        url_backend = current_app.config["URL"] + f"/api/confirm/{token}"
        url_frontend = "http://localhost:4200" + f"/confirm/{token}"
        mail_body = (
            f"here the code\n\nbackend: {url_backend}\n\nfrontend: {url_frontend}"
        )
    else:
        url = current_app.config["URL"] + f"/confirm/{token}"
        mail_body = f"here the code\n\nfrontend: {url}"

    send_mail(
        email,
        mail_title,
        mail_body,
    )

    return jsonify({"success": "mail sent"}), 201


def services_confirm_jwt(jwt: str):
    result = _verify_token(jwt)
    return jsonify(result[0]), result[1]
