from app import create_app, db
from app.models import init_db

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        init_db()
        print("Database initialized successfully!") 