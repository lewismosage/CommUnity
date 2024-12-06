from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import api
from ..models.event import Event, EventAgendaItem, EventRequirement
from ..models.user import User
from .. import db
from datetime import datetime

@api.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

@api.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())

@api.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    try:
        event = Event(
            title=data['title'],
            description=data['description'],
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            time=datetime.strptime(data['time'], '%H:%M').time(),
            location=data['location'],
            category=data['category'],
            capacity=data['capacity'],
            organizer_id=current_user_id,
            community_id=data.get('community_id')
        )

        # Add agenda items
        for i, item in enumerate(data.get('agenda', [])):
            agenda_item = EventAgendaItem(
                description=item,
                order=i
            )
            event.agenda.append(agenda_item)

        # Add requirements
        for i, req in enumerate(data.get('requirements', [])):
            requirement = EventRequirement(
                description=req,
                order=i
            )
            event.requirements.append(requirement)

        db.session.add(event)
        db.session.commit()

        return jsonify(event.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@api.route('/events/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    if event.organizer_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()

    try:
        event.title = data.get('title', event.title)
        event.description = data.get('description', event.description)
        if 'date' in data:
            event.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        if 'time' in data:
            event.time = datetime.strptime(data['time'], '%H:%M').time()
        event.location = data.get('location', event.location)
        event.category = data.get('category', event.category)
        event.capacity = data.get('capacity', event.capacity)

        # Update agenda items
        if 'agenda' in data:
            event.agenda = []
            for i, item in enumerate(data['agenda']):
                agenda_item = EventAgendaItem(
                    description=item,
                    order=i
                )
                event.agenda.append(agenda_item)

        # Update requirements
        if 'requirements' in data:
            event.requirements = []
            for i, req in enumerate(data['requirements']):
                requirement = EventRequirement(
                    description=req,
                    order=i
                )
                event.requirements.append(requirement)

        db.session.commit()
        return jsonify(event.to_dict())

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@api.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    if event.organizer_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        db.session.delete(event)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@api.route('/events/<int:event_id>/join', methods=['POST'])
@jwt_required()
def join_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)
    user = User.query.get_or_404(current_user_id)

    if user in event.attendees:
        return jsonify({'error': 'Already joined'}), 400

    try:
        event.attendees.append(user)
        db.session.commit()
        return jsonify(event.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@api.route('/events/<int:event_id>/leave', methods=['POST'])
@jwt_required()
def leave_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)
    user = User.query.get_or_404(current_user_id)

    if user not in event.attendees:
        return jsonify({'error': 'Not joined'}), 400

    try:
        event.attendees.remove(user)
        db.session.commit()
        return jsonify(event.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400 