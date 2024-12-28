from flask import Blueprint, current_app

from smtplib import SMTP, SMTP_SSL

from time import time


bp = Blueprint("emails", __name__)


@bp.route("/mail")
def mail():
    start = time()

    if current_app.config["MAIL_SMTP_METHOD"] == "ssl":
        smtp_connection = SMTP_SSL(host=current_app.config["MAIL_SMTP_HOST"], port=current_app.config["MAIL_SMTP_PORT"])
    else:
        smtp_connection = SMTP(host=current_app.config["MAIL_SMTP_HOST"], port=current_app.config["MAIL_SMTP_PORT"])

    print("Connection Object : {}".format(smtp_connection))
    print("Total Time Taken  : {:,.2f} Seconds".format(time() - start))

    print("\nLogging In.....")
    resp_code, response = smtp_connection.login(
        user=current_app.config["MAIL_USER"], password=current_app.config["MAIL_PASSWORD"]
    )

    print("Response Code : {}".format(resp_code))
    print("Response      : {}".format(response.decode()))

    to_list = [current_app.config["MAIL_TEST"]]
    message = "Subject: {}\n\n{}".format("Test Email", "body,\n\nbest,\n\nmatcha")

    response = smtp_connection.sendmail(
        from_addr=current_app.config["MAIL_USER"], to_addrs=to_list, msg=message
    )

    print("List of Failed Recipients : {}".format(response))

    print("\nLogging Out....")
    resp_code, response = smtp_connection.quit()

    print("Response Code : {}".format(resp_code))
    print("Response      : {}".format(response.decode()))
    return "mail sent"
