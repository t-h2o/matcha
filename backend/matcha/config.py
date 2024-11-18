# https://fastapi.tiangolo.com/advanced/settings/#the-config-file

from os import environ

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    url: str = environ["FLASK_URL"]


settings = Settings()
