from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_jwt_extended import decode_token
from app.models import User, Conversation

socketio = SocketIO()

@socketio.on('connect')
def handle_connect():
    token = request.args.get('token')
    try:
        decoded = decode_token(token)
        user_id = decoded['sub']
        join_room(f'user_{user_id}')
    except:
        return False

@socketio.on('join_conversation')
def handle_join_conversation(data):
    conversation_id = data['conversation_id']
    join_room(f'conversation_{conversation_id}')

@socketio.on('leave_conversation')
def handle_leave_conversation(data):
    conversation_id = data['conversation_id']
    leave_room(f'conversation_{conversation_id}')

@socketio.on('typing')
def handle_typing(data):
    conversation_id = data['conversation_id']
    user_id = data['user_id']
    emit('user_typing', {
        'user_id': user_id,
        'conversation_id': conversation_id
    }, room=f'conversation_{conversation_id}') 