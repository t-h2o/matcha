class SocketManager:
    _instance = None

    sid_userid = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    @classmethod
    def get_user_id(cls, sid):
        return cls.sid_userid.get(sid)

    @classmethod
    def add_session(cls, sid, user_id):
        cls.sid_userid[sid] = user_id

    @classmethod
    def remove_session(cls, sid):
        cls.sid_userid.pop(sid, None)

    @classmethod
    def __str__(cls):
        return str(cls.sid_userid)
