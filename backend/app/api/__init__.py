from flask import Blueprint

api = Blueprint('api', __name__)

# Import routes after creating blueprint to avoid circular imports
from . import auth, events, groups, posts, messages, notifications, profiles, search 