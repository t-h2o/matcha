from fastapi import APIRouter

from pydantic import BaseModel


from matcha.db import db_register


class Register(BaseModel):
    username: str
    password: str
    firstname: str
    lastname: str
    email: str


router = APIRouter()


@router.post("/api/register")
async def register_user(newUser: Register):

    #     json = request.json
    #
    #     check_request = check_request_json(
    #         request.headers.get("Content-Type"),
    #         json,
    #         ["username", "password", "firstname", "lastname", "email"],
    #     )
    #
    #     if check_request is not None:
    #         return jsonify(check_request[0]), check_request[1]
    #
    response = db_register(
        newUser.username,
        newUser.password,
        newUser.firstname,
        newUser.lastname,
        newUser.email,
        "http://a" + "/api/images/avatar.png",
        # current_app.config["URL"] + "/api/images/avatar.png",
    )

    print(newUser.email)

    return newUser


# @router.post("/users/me/")
# async def read_users_me(authorization: str = Header(None)):
#     print(authorization)
#     return {"authorization": authorization}
