from datetime import datetime
from .extensions import db
import json
from werkzeug.security import generate_password_hash, check_password_hash

# Association tables
user_groups = db.Table('user_groups',
    db.Column('user_id', db.String(36), db.ForeignKey('user.id'), primary_key=True),
    db.Column('group_id', db.String(36), db.ForeignKey('group.id'), primary_key=True)
)

connections = db.Table('connections',
    db.Column('user_id', db.String(36), db.ForeignKey('user.id'), primary_key=True),
    db.Column('connected_user_id', db.String(36), db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.String(36), primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Relationships
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    organized_events = db.relationship('Event', backref='organizer', lazy=True, foreign_keys='Event.organizer_id')
    attending_events = db.relationship('Event', secondary='event_attendees', backref=db.backref('attendees', lazy=True))

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': str(self.id),
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Post(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'content': self.content,
            'createdAt': self.created_at.isoformat(),
            'author': self.author.to_dict()
        }

class Event(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    time = db.Column(db.String(10), nullable=False)
    end_time = db.Column(db.String(10))
    location = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    organizer_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    _agenda = db.Column('agenda', db.Text, nullable=False)
    _requirements = db.Column('requirements', db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def agenda(self):
        return json.loads(self._agenda)

    @agenda.setter
    def agenda(self, value):
        self._agenda = json.dumps(value)

    @property
    def requirements(self):
        return json.loads(self._requirements)

    @requirements.setter
    def requirements(self, value):
        self._requirements = json.dumps(value)

    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            'startDate': self.date.isoformat(),
            'organizer': self.organizer.to_dict()
        }

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    members = db.relationship('User', secondary=user_groups, lazy='dynamic')

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'createdAt': self.created_at.isoformat(),
            'memberCount': self.members.count()
        } 

# Association table for event attendees
event_attendees = db.Table('event_attendees',
    db.Column('user_id', db.String(36), db.ForeignKey('user.id'), primary_key=True),
    db.Column('event_id', db.String(36), db.ForeignKey('event.id'), primary_key=True)
) 