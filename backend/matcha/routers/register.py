from fastapi import APIRouter

from pydantic import BaseModel


from matcha.db import db_register


class Register(BaseModel):
    username: str
    password: str
    firstname: str
    lastname: str
    email: str

    def check(self):
        if len(self.username) <= 4:
            return {"error": "length"}
        if len(self.password) <= 4:
            return {"error": "length"}
        if len(self.firstname) <= 4:
            return {"error": "length"}
        if len(self.lastname) <= 4:
            return {"error": "length"}
        if len(self.email) <= 4:  # TODO regex email
            return {"error": "length"}


router = APIRouter()


def service_register_user(newUser: Register):
    check = newUser.check()
    if check is not None:
        return check

    return db_register(
        newUser.username,
        newUser.password,
        newUser.firstname,
        newUser.lastname,
        newUser.email,
        "http://a" + "/api/images/avatar.png",
        # current_app.config["URL"] + "/api/images/avatar.png",
    )


@router.post("/api/register")
async def register_user(newUser: Register):

    return service_register_user(newUser)
