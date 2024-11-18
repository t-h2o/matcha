from fastapi import APIRouter
from datetime import datetime, timedelta, timezone
import jwt

router = APIRouter()


# def create_access_token(data: dict, expires_delta: timedelta | None = None):
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


@router.get("/users/me", tags=["users"])
async def read_user_me():
    return {"username": "fakecurrentuser"}


@router.get("/users/{username}", tags=["users"])
async def read_user(username: str):
    return {"username": username}


@router.get("/token", tags=["users"])
async def get_token():
    token = create_access_token({"username": "user", "age": 18}, timedelta(minutes=15))
    return {"username": "user", "token": token}
