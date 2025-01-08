from os import environ
from datetime import timedelta, datetime, timezone


def init_environment(app) -> None:
    app.config["MODE"] = environ["FLASK_ENV"]

    if app.config["MODE"] == "development":
        app.config["JWT_SECRET_KEY"] = environ["DEVE_FLASK_JWT_SECRET_KEY"]
        app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
        app.config["UPLOAD_FOLDER"] = environ["DEVE_FLASK_UPLOAD_FOLDER"]
        app.config["URL"] = environ["DEVE_FLASK_URL"]
        app.config["SECRET_KEY"] = "your_secret_key"

        app.config["MAIL_USER"] = environ["DEVE_MAIL_USER"]
        app.config["MAIL_USER"] = environ["DEVE_MAIL_USER"]
        app.config["MAIL_SMTP_HOST"] = environ["DEVE_MAIL_SMTP_HOST"]
        app.config["MAIL_SMTP_PORT"] = environ["DEVE_MAIL_SMTP_PORT"]
        app.config["MAIL_SMTP_METHOD"] = environ["DEVE_MAIL_SMTP_METHOD"]
        app.config["MAIL_PASSWORD"] = environ["DEVE_MAIL_PASSWORD"]
        app.config["MAIL_TEST"] = environ["DEVE_MAIL_TEST"]

        app.config["DATABASE_URL"] = environ["DEVE_DATABASE_URL"]

        app.config["ORIGINS"] = [
            environ["DEVE_URL_FRONTEND"],
            environ["DEVE_URL_BACKEND"],
        ]
        app.config["WS_ORIGINS"] = [environ["DEVE_URL_FRONTEND"]]

    elif app.config["MODE"] == "production":

        app.config["JWT_SECRET_KEY"] = environ["PROD_FLASK_JWT_SECRET_KEY"]
        app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
        app.config["UPLOAD_FOLDER"] = environ["PROD_FLASK_UPLOAD_FOLDER"]
        app.config["URL"] = environ["PROD_FLASK_URL"]
        app.config["SECRET_KEY"] = "your_secret_key"

        app.config["MAIL_USER"] = environ["PROD_MAIL_USER"]
        app.config["MAIL_USER"] = environ["PROD_MAIL_USER"]
        app.config["MAIL_SMTP_HOST"] = environ["PROD_MAIL_SMTP_HOST"]
        app.config["MAIL_SMTP_PORT"] = environ["PROD_MAIL_SMTP_PORT"]
        app.config["MAIL_SMTP_METHOD"] = environ["PROD_MAIL_SMTP_METHOD"]
        app.config["MAIL_PASSWORD"] = environ["PROD_MAIL_PASSWORD"]
        app.config["MAIL_TEST"] = environ["PROD_MAIL_TEST"]

        app.config["DATABASE_URL"] = environ["PROD_DATABASE_URL"]

        app.config["ORIGINS"] = [environ["PROD_URL"]]
        app.config["WS_ORIGINS"] = [environ["PROD_URL"]]
