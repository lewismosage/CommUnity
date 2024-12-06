from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import api
from ..models import User, Post, Event, Group
from .. import db

@api.route('/profiles/<username>', methods=['GET'])
@jwt_required()
def get_profile(username):
    try:
        print(f"Fetching profile for username: {username}")  # Debug log
        user = User.query.filter_by(username=username).first()
        
        if not user:
            print(f"User not found: {username}")  # Debug log
            return jsonify({'error': 'User not found'}), 404
            
        # Debug log
        print(f"User found: {user.username}, ID: {user.id}")
        
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
                'posts': 0,
                'events': 0,
                'groups': 0,
                'connections': 0
            }
        }

        # Safely try to get counts
        try:
            profile_data['profileStats']['posts'] = user.posts.count()
        except Exception as e:
            print(f"Error counting posts: {str(e)}")

        try:
            profile_data['profileStats']['events'] = user.events.count()
        except Exception as e:
            print(f"Error counting events: {str(e)}")

        try:
            profile_data['profileStats']['groups'] = user.groups.count()
        except Exception as e:
            print(f"Error counting groups: {str(e)}")

        try:
            profile_data['profileStats']['connections'] = user.connections.count()
        except Exception as e:
            print(f"Error counting connections: {str(e)}")

        return jsonify(profile_data)

    except Exception as e:
        print(f"Error fetching profile: {str(e)}")
        import traceback
        traceback.print_exc()  # Print full stack trace
        return jsonify({'error': 'Internal server error'}), 500

@api.route('/profiles/<username>/posts', methods=['GET'])
@jwt_required()
def get_user_posts(username):
    user = User.query.filter_by(username=username).first_or_404()
    posts = Post.query.filter_by(user_id=user.id).order_by(Post.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@api.route('/profiles/<username>/events', methods=['GET'])
@jwt_required()
def get_user_events(username):
    user = User.query.filter_by(username=username).first_or_404()
    events = Event.query.filter_by(organizer_id=user.id).order_by(Event.start_date.desc()).all()
    return jsonify([event.to_dict() for event in events])

@api.route('/profiles/<username>/groups', methods=['GET'])
@jwt_required()
def get_user_groups(username):
    user = User.query.filter_by(username=username).first_or_404()
    groups = Group.query.join(Group.members).filter(User.id == user.id).all()
    return jsonify([group.to_dict() for group in groups])

@api.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    users = User.query.all()
    return jsonify([{
        'id': str(user.id),
        'username': user.username,
        'email': user.email,
        'firstName': user.first_name,
        'lastName': user.last_name
    } for user in users]) 