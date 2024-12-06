from app.models import Notification, User
from app import db, socketio

class NotificationService:
    @staticmethod
    def create_notification(user_id, type, content, reference_id=None, reference_type=None):
        notification = Notification(
            user_id=user_id,
            type=type,
            content=content,
            reference_id=reference_id,
            reference_type=reference_type
        )
        
        db.session.add(notification)
        db.session.commit()
        
        # Emit socket event
        socketio.emit(
            'new_notification',
            notification.to_dict(),
            room=f'user_{user_id}'
        )
        
        return notification

    @staticmethod
    def notify_new_message(conversation, message):
        for participant in conversation.participants:
            if participant.id != message.sender_id:
                sender = User.query.get(message.sender_id)
                NotificationService.create_notification(
                    user_id=participant.id,
                    type='new_message',
                    content=f'New message from {sender.name}',
                    reference_id=message.id,
                    reference_type='message'
                )

    @staticmethod
    def notify_event_invitation(event, invitee_id):
        NotificationService.create_notification(
            user_id=invitee_id,
            type='event_invitation',
            content=f'You have been invited to {event.title}',
            reference_id=event.id,
            reference_type='event'
        ) 