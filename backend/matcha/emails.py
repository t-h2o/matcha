from flask import Blueprint, current_app

from smtplib import SMTP_SSL

from time import time


bp = Blueprint("emails", __name__)


@bp.route("/mail")
def mail():
    start = time()
    smtp_ssl = SMTP_SSL(host=current_app.config["MAIL_SMTP"], port=1025)

    print("Connection Object : {}".format(smtp_ssl))
    print("Total Time Taken  : {:,.2f} Seconds".format(time() - start))

    print("\nLogging In.....")
    resp_code, response = smtp_ssl.login(
        user=current_app.config["MAIL_USER"], password=current_app.config["MAIL_PASS"]
    )

    print("Response Code : {}".format(resp_code))
    print("Response      : {}".format(response.decode()))

    to_list = [current_app.config["MAIL_TEST"]]
    message = "Subject: {}\n\n{}".format("Test Email", "body,\n\nbest,\n\nmatcha")

    response = smtp_ssl.sendmail(
        from_addr=current_app.config["MAIL_USER"], to_addrs=to_list, msg=message
    )

    print("List of Failed Recipients : {}".format(response))

    print("\nLogging Out....")
    resp_code, response = smtp_ssl.quit()

    print("Response Code : {}".format(resp_code))
    print("Response      : {}".format(response.decode()))
    return "mail sent"
