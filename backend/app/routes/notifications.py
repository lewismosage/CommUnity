from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Notification
from app import db
from datetime import datetime

notifications_bp = Blueprint('notifications', __name__)

@notifications_bp.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(
        user_id=user_id
    ).order_by(
        Notification.created_at.desc()
    ).limit(50).all()
    
    return jsonify([notif.to_dict() for notif in notifications])

@notifications_bp.route('/notifications/unread/count', methods=['GET'])
@jwt_required()
def get_unread_count():
    user_id = get_jwt_identity()
    count = Notification.query.filter_by(
        user_id=user_id,
        read_at=None
    ).count()
    
    return jsonify({'count': count})

@notifications_bp.route('/notifications/mark-read', methods=['POST'])
@jwt_required()
def mark_all_read():
    user_id = get_jwt_identity()
    Notification.query.filter_by(
        user_id=user_id,
        read_at=None
    ).update({
        'read_at': datetime.utcnow()
    })
    
    db.session.commit()
    return jsonify({'status': 'success'}) 