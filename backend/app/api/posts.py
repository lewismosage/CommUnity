from flask import jsonify
from . import api

@api.route('/posts', methods=['GET'])
def get_posts():
    return jsonify([]) 