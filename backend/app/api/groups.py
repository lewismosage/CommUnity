from flask import jsonify
from . import api

@api.route('/groups', methods=['GET'])
def get_groups():
    return jsonify([]) 