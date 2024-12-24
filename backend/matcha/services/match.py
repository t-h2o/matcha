from flask import jsonify

from matcha.db.match import db_get_match


def services_match(id_user):
    return jsonify(db_get_match(id_user)), 201
