from flask_socketio import SocketIO, disconnect


def socketio_init(app):
    return SocketIO(
        app,
        cors_allowed_origins="http://localhost:4200",
        async_mode="threading",
        ping_timeout=60000,
        logger=True,
        engineio_logger=True,
    )
