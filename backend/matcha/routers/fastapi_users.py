from fastapi import APIRouter, Header
from fastapi import Depends
from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt

router = APIRouter()

# openssl rand -hex 32
SECRET_KEY = "5c49f5d9c7206c0204487fefb88fa32b0aa46006ec93a29e962a3ca38ff94a95"
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.get("/users/", tags=["users"])
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]


@router.get("/token", tags=["users"])
async def get_token():
    token = create_access_token({"username": "user", "age": 18}, timedelta(minutes=15))
    return {"username": "user", "token": token}


@router.post("/users/me/")
async def read_users_me(authorization: str = Header(None)):
    print(authorization)
    return {"authorization": authorization}
