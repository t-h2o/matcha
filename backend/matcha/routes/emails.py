from flask import Blueprint, current_app


from time import time

from matcha.utils import send_mail


bp = Blueprint("emails", __name__)


@bp.route("/mail")
def mail():
    send_mail(current_app.config["MAIL_TEST"], "function body", "function")
    return "mail sent"
