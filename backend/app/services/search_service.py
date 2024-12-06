from app.models import Event, Group, User
from sqlalchemy import or_

class SearchService:
    @staticmethod
    def search_all(query, limit=10):
        events = Event.query.filter(
            or_(
                Event.title.ilike(f'%{query}%'),
                Event.description.ilike(f'%{query}%')
            )
        ).limit(limit).all()

        groups = Group.query.filter(
            or_(
                Group.name.ilike(f'%{query}%'),
                Group.description.ilike(f'%{query}%')
            )
        ).limit(limit).all()

        users = User.query.filter(
            or_(
                User.name.ilike(f'%{query}%'),
                User.email.ilike(f'%{query}%')
            )
        ).limit(limit).all()

        return {
            'events': [event.to_dict() for event in events],
            'groups': [group.to_dict() for group in groups],
            'users': [user.to_dict() for user in users]
        }

    @staticmethod
    def search_events(query, limit=20):
        events = Event.query.filter(
            or_(
                Event.title.ilike(f'%{query}%'),
                Event.description.ilike(f'%{query}%'),
                Event.location.ilike(f'%{query}%')
            )
        ).order_by(Event.start_date.asc()).limit(limit).all()
        
        return [event.to_dict() for event in events]

    @staticmethod
    def search_groups(query, limit=20):
        groups = Group.query.filter(
            or_(
                Group.name.ilike(f'%{query}%'),
                Group.description.ilike(f'%{query}%')
            )
        ).limit(limit).all()
        
        return [group.to_dict() for group in groups]

    @staticmethod
    def search_users(query, limit=20):
        users = User.query.filter(
            or_(
                User.name.ilike(f'%{query}%'),
                User.email.ilike(f'%{query}%')
            )
        ).limit(limit).all()
        
        return [user.to_dict() for user in users]