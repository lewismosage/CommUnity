from flask import jsonify, request
from . import api

@api.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    return jsonify([]) 