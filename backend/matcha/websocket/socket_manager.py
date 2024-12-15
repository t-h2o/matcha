class SocketManager:
    _instance = None

    sid_userid = {}
    userid_sid = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    @classmethod
    def get_user_id(cls, sid):
        return cls.sid_userid.get(sid)

    @classmethod
    def get_sid(cls, userid):
        return cls.userid_sid.get(userid)

    @classmethod
    def add_session(cls, sid, user_id):
        cls.sid_userid[sid] = user_id
        cls.userid_sid[user_id] = sid

    @classmethod
    def remove_session(cls, sid):
        user_id = cls.sid_userid.pop(sid, None)
        cls.userid_sid.pop(userid, None)

    @classmethod
    def __str__(cls):
        return str(cls.sid_userid)
