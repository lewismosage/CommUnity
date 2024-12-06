from flask import jsonify
from . import api

@api.route('/messages', methods=['GET'])
def get_messages():
    return jsonify([]) 