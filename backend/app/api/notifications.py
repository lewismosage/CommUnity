from flask import jsonify
from . import api

@api.route('/notifications', methods=['GET'])
def get_notifications():
    return jsonify([]) 