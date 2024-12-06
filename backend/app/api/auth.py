from flask import jsonify, request
from werkzeug.exceptions import BadRequest
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from . import api
from ..models import User
from .. import db

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.check_password(data.get('password')):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'token': access_token,
            'user': user.to_dict()
        }), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        required_fields = ['email', 'username', 'password', 'firstName', 'lastName']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        if User.query.filter_by(email=data.get('email')).first():
            return jsonify({'error': 'Email already registered'}), 400
            
        if User.query.filter_by(username=data.get('username')).first():
            return jsonify({'error': 'Username already taken'}), 400
            
        user = User(
            email=data.get('email'),
            username=data.get('username'),
            first_name=data.get('firstName'),
            last_name=data.get('lastName')
        )
        user.set_password(data.get('password'))
        
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Registration error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@api.route('/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.to_dict()) 