from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Event, User
from datetime import datetime
import uuid

events_bp = Blueprint('events', __name__)

@events_bp.route('/events', methods=['GET'])
def get_events():
    try:
        events = Event.query.all()
        return jsonify([{
            'id': event.id,
            'title': event.title,
            'description': event.description,
            'date': event.date.isoformat(),
            'time': event.time,
            'endTime': event.end_time,
            'location': event.location,
            'category': event.category,
            'capacity': event.capacity,
            'organizer': {
                'id': event.organizer.id,
                'name': event.organizer.name
            },
            'attendees': [{
                'id': attendee.id,
                'name': attendee.name
            } for attendee in event.attendees],
            'agenda': event.agenda,
            'requirements': event.requirements
        } for event in events]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@events_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    try:
        data = request.json
        user_id = get_jwt_identity()
        
        event = Event(
            id=str(uuid.uuid4()),
            title=data['title'],
            description=data['description'],
            date=datetime.fromisoformat(data['date'].replace('Z', '+00:00')),
            time=data['time'],
            end_time=data.get('endTime'),
            location=data['location'],
            category=data['category'],
            capacity=data['capacity'],
            organizer_id=user_id,
            agenda=data['agenda'],
            requirements=data['requirements']
        )
        
        db.session.add(event)
        db.session.commit()
        
        return jsonify({
            'id': event.id,
            'title': event.title,
            # ... other fields ...
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@events_bp.route('/events/<event_id>/join', methods=['POST'])
@jwt_required()
def join_event(event_id):
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        event = Event.query.get(event_id)
        
        if not event:
            return jsonify({'error': 'Event not found'}), 404
            
        is_already_joined = user in event.attendees
        
        if is_already_joined:
            event.attendees.remove(user)
        else:
            event.attendees.append(user)
            
        db.session.commit()
        
        return jsonify({
            'isJoined': not is_already_joined,
            'attendeeCount': len(event.attendees)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500 