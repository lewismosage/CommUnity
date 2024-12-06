from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.post import Post
from app import db

profiles_bp = Blueprint('profiles', __name__)

@profiles_bp.route('/api/profiles/<username>', methods=['GET'])
@jwt_required()
def get_profile(username):
    try:
        print(f"Fetching profile for username: {username}")
        user = User.query.filter_by(username=username).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        profile_data = {
            'id': str(user.id),
            'firstName': user.first_name,
            'lastName': user.last_name,
            'username': user.username,
            'bio': user.bio or '',
            'location': user.location or '',
            'interests': user.interests or [],
            'joinedDate': user.created_at.isoformat() if user.created_at else '',
            'profileStats': {
                'posts': user.posts.count(),
                'events': user.events.count(),
                'groups': user.groups.count(),
                'connections': 0  # Implement connections count if needed
            }
        }
        
        return jsonify(profile_data)
        
    except Exception as e:
        print(f"Error fetching profile: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500

@profiles_bp.route('/api/profiles/<username>/posts', methods=['GET'])
@jwt_required()
def get_user_posts(username):
    user = User.query.filter_by(username=username).first_or_404()
    posts = user.posts.order_by(Post.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@profiles_bp.route('/api/profiles/<user_id>', methods=['PUT'])
@jwt_required()
def update_profile(user_id):
    try:
        # Get current user from token
        current_user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        
        # Check if user is updating their own profile
        if str(current_user_id) != str(user_id):
            return jsonify({'error': 'Unauthorized'}), 403
            
        data = request.get_json()
        
        # Update user fields
        if 'firstName' in data:
            user.first_name = data['firstName']
        if 'lastName' in data:
            user.last_name = data['lastName']
        if 'bio' in data:
            user.bio = data['bio']
        if 'location' in data:
            user.location = data['location']
        if 'interests' in data:
            user.interests = data['interests']
            
        db.session.commit()
        
        return jsonify({
            'id': str(user.id),
            'firstName': user.first_name,
            'lastName': user.last_name,
            'username': user.username,
            'bio': user.bio or '',
            'location': user.location or '',
            'interests': user.interests or [],
            'joinedDate': user.created_at.isoformat() if user.created_at else '',
            'profileStats': {
                'posts': user.posts.count(),
                'events': user.events.count(),
                'groups': user.groups.count(),
                'connections': 0
            }
        })
        
    except Exception as e:
        print(f"Error updating profile: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to update profile'}), 500 