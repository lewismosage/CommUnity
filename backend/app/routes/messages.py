from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Message, User

messages_bp = Blueprint('messages', __name__)

@messages_bp.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    data = request.json
    sender_id = get_jwt_identity()
    
    message = Message(
        content=data['content'],
        sender_id=sender_id,
        receiver_id=data['receiver_id']
    )
    
    db.session.add(message)
    db.session.commit()
    
    return jsonify(message.to_dict()), 201

@messages_bp.route('/messages/<receiver_id>', methods=['GET'])
@jwt_required()
def get_messages(receiver_id):
    user_id = get_jwt_identity()
    messages = Message.query.filter(
        ((Message.sender_id == user_id) & (Message.receiver_id == receiver_id)) |
        ((Message.sender_id == receiver_id) & (Message.receiver_id == user_id))
    ).order_by(Message.created_at.asc()).all()
    
    return jsonify([message.to_dict() for message in messages]) 