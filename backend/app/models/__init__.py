from app import db
from .user import User
from .event import Event, EventAgendaItem, EventRequirement
from .community import Community
from .group import Group
from .post import Post, Comment
from .message import Message, Conversation
from .notification import Notification

def init_db():
    """Initialize the database."""
    db.create_all()

def reset_db():
    """Reset the database."""
    db.drop_all()
    db.create_all()
