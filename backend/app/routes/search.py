from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.search_service import SearchService

search_bp = Blueprint('search', __name__)

@search_bp.route('/search', methods=['GET'])
@jwt_required()
def search():
    query = request.args.get('q', '')
    search_type = request.args.get('type', 'all')
    
    if not query:
        return jsonify({
            'events': [],
            'groups': [],
            'users': []
        })
    
    if search_type == 'all':
        results = SearchService.search_all(query)
    elif search_type == 'events':
        results = {'events': SearchService.search_events(query)}
    elif search_type == 'groups':
        results = {'groups': SearchService.search_groups(query)}
    elif search_type == 'users':
        results = {'users': SearchService.search_users(query)}
    else:
        return jsonify({'error': 'Invalid search type'}), 400
    
    return jsonify(results)