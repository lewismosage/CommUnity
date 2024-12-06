from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Group
from app import db

groups_bp = Blueprint('groups', __name__)

@groups_bp.route('/groups', methods=['GET'])
@jwt_required()
def get_groups():
    groups = Group.query.order_by(Group.created_at.desc()).all()
    return jsonify([group.to_dict() for group in groups])

@groups_bp.route('/groups/<int:group_id>', methods=['GET'])
@jwt_required()
def get_group(group_id):
    group = Group.query.get_or_404(group_id)
    return jsonify(group.to_dict())

@groups_bp.route('/groups', methods=['POST'])
@jwt_required()
def create_group():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    group = Group(
        name=data['name'],
        description=data.get('description', ''),
        image=data.get('image'),
        is_private=data.get('isPrivate', False),
        creator_id=user_id
    )
    
    group.members.append(User.query.get(user_id))  # Add creator as member
    
    db.session.add(group)
    db.session.commit()
    
    return jsonify(group.to_dict()), 201

@groups_bp.route('/groups/<int:group_id>/join', methods=['POST'])
@jwt_required()
def join_group(group_id):
    user_id = get_jwt_identity()
    group = Group.query.get_or_404(group_id)
    user = User.query.get(user_id)
    
    if user not in group.members:
        group.members.append(user)
        db.session.commit()
    
    return jsonify(group.to_dict())

@groups_bp.route('/groups/<int:group_id>/leave', methods=['POST'])
@jwt_required()
def leave_group(group_id):
    user_id = get_jwt_identity()
    group = Group.query.get_or_404(group_id)
    user = User.query.get(user_id)
    
    if user in group.members:
        group.members.remove(user)
        db.session.commit()
    
    return jsonify(group.to_dict()) 