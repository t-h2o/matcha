from flask import Flask
from flask_socketio import SocketIO, disconnect
from flask_cors import CORS
from os import environ
from flask_jwt_extended import JWTManager, decode_token
from matcha.routes import init_routes


def create_app():
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET_KEY"]
    app.config["UPLOAD_FOLDER"] = environ["FLASK_UPLOAD_FOLDER"]
    app.config["URL"] = environ["FLASK_URL"]
    app.config["SECRET_KEY"] = "your_secret_key"

    init_routes(app)

    CORS(
        app,
        resources={
            r"/*": {
                "origins": ["http://localhost:4200"],
                "allow_credentials": True,
                "methods": ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
            }
        },
    )

    socketio = SocketIO(
        app,
        cors_allowed_origins="http://localhost:4200",
        async_mode="threading",
        ping_timeout=60000,
        logger=True,
        engineio_logger=True,
    )

    jwt = JWTManager(app)

    # Store connected users
    connected_users = {}

    def verify_token(sid):
        """Verify the JWT token from the socket connection"""
        try:
            # Get environment for this connection
            environ = socketio.server.environ.get(sid, {})

            # Try to get token from different possible locations
            token = None

            # Check auth data
            auth = environ.get("socketio", {}).get("auth", {})
            if auth and isinstance(auth.get("token"), str):
                token = auth.get("token").replace("Bearer ", "")

            # Check query parameters
            if not token:
                query = environ.get("QUERY_STRING", "")
                if "token=" in query:
                    token = query.split("token=")[1].split("&")[0]
                    token = token.replace("Bearer%20", "").replace(
                        "Bearer ", ""
                    )

            if not token:
                print(f"No token found for connection {sid}")
                return None

            # Decode and verify the JWT token
            decoded_token = decode_token(token)
            return decoded_token[
                "sub"
            ]  # or however you store user ID in your JWT

        except Exception as e:
            print(f"Token verification error for {sid}: {str(e)}")
            return None

    @socketio.on("connect")
    def handle_connect():
        sid = socketio.server.eio.sid
        user_id = verify_token(sid)
        
        if not user_id:
            print(f"Authentication failed for connection {sid}")
            return False
        
        connected_users[sid] = user_id
        print(f"Client connected with ID: {sid}, User ID: {user_id}")
        socketio.emit('users_updated', list(connected_users.values()))
        return True

    @socketio.on("disconnect")
    def handle_disconnect():
        sid = socketio.server.eio.sid
        if sid in connected_users:
            user_id = connected_users.pop(sid)
            print(f"Client disconnected with ID: {sid}, User ID: {user_id}")
            socketio.emit('users_updated', list(connected_users.values()))

    @socketio.on_error()
    def error_handler(e):
        print("SocketIO error:", str(e))

    @socketio.on("message")
    def handle_message(data):
        try:
            sid = socketio.server.eio.sid
            user_id = connected_users.get(sid)
            if not user_id:
                print(f"No authenticated user found for message from {sid}")
                return
            
            print(f"Received message from {user_id}:", data)
            socketio.emit("response", {
                "message": f"Server received your message: {str(data)}",
                "user_id": user_id
            })
        except Exception as e:
            print("Error handling message:", str(e))

    return app