from datetime import timedelta, datetime, timezone

from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from os import environ
from flask_jwt_extended import (
    JWTManager,
    get_jwt,
    create_access_token,
    get_jwt_identity,
    set_access_cookies,
)

from matcha.websocket.main_namespace import MainNamespace

from matcha.routes import init_routes

from matcha.environment import init_environment


def create_app():
    app = Flask(__name__)

    init_environment(app)
    init_routes(app)

    CORS(
        app,
        resources={
            r"/*": {
                "origins": ["http://localhost:4200", "http://localhost"],
                "allow_credentials": True,
                "methods": ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
            }
        },
    )

    FLASK_ENV = environ.get("FLASK_ENV", "development")

    if FLASK_ENV == "production":
        socketio = SocketIO(
            app,
            cors_allowed_origins="http://localhost",
            async_mode="eventlet",
            ping_timeout=60000,
            logger=True,
            engineio_logger=True,
            message_queue=None,
        )
    else:
        socketio = SocketIO(
            app,
            cors_allowed_origins="http://localhost:4200",
            async_mode="threading",
            ping_timeout=60000,
            logger=True,
            engineio_logger=True,
        )

    jwt = JWTManager(app)

    socketio.on_namespace(MainNamespace("/"))

    @app.before_request
    def before_request():
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
        if request.method.lower() == "options":
            return jsonify(headers), 200

    # Using an `after_request` callback, we refresh any token that is within 30
    # minutes of expiring. Change the timedeltas to match the needs of your application.
    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original response
            return response

    return app


app = create_app()
