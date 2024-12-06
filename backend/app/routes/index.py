from flask import Blueprint, jsonify

index_bp = Blueprint('index', __name__)

@index_bp.route('/')
def index():
    return jsonify({
        'message': 'Welcome to CommUnity API',
        'status': 'online'
    }) 