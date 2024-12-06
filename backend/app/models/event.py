from datetime import datetime
from .. import db

# Association table for event attendees
event_attendees = db.Table('event_attendees',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True),
    db.Column('joined_at', db.DateTime, default=datetime.utcnow)
)

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(500))
    
    # Foreign Keys
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=True)

    # Additional fields
    status = db.Column(db.String(20), default='upcoming')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    organizer = db.relationship('User', backref=db.backref('organized_events', lazy='dynamic'), foreign_keys=[organizer_id])
    attendees = db.relationship('User', secondary=event_attendees, backref='attended_events')
    agenda = db.relationship('EventAgendaItem', backref='event', cascade='all, delete-orphan')
    requirements = db.relationship('EventRequirement', backref='event', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat(),
            'time': self.time.isoformat(),
            'location': self.location,
            'category': self.category,
            'capacity': self.capacity,
            'image_url': self.image_url,
            'status': self.status,
            'attendees': len(self.attendees),
            'organizer': {
                'id': self.organizer.id,
                'name': f"{self.organizer.first_name} {self.organizer.last_name}",
                'role': getattr(self.organizer, 'role', 'Member'),
                'avatar': getattr(self.organizer, 'avatar', None)
            },
            'agenda': [item.to_dict() for item in self.agenda],
            'requirements': [req.to_dict() for req in self.requirements],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class EventAgendaItem(db.Model):
    __tablename__ = 'event_agenda_items'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    time = db.Column(db.String(50))
    description = db.Column(db.String(200), nullable=False)
    order = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'time': self.time,
            'description': self.description,
            'order': self.order
        }

class EventRequirement(db.Model):
    __tablename__ = 'event_requirements'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    order = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'order': self.order
        } 