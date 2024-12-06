from flask import Flask, jsonify
from datetime import timedelta
import os
from dotenv import load_dotenv
import uuid

from .extensions import db, jwt, cors
from .models import User

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure SQLAlchemy and JWT
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    
    # Configure CORS
    cors.init_app(app, 
        resources={
            r"/*": {
                "origins": ["http://localhost:3000"],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
                "expose_headers": ["Access-Control-Allow-Origin"],
                "supports_credentials": True
            }
        }
    )

    # Add root route for API welcome message
    @app.route('/')
    def welcome():
        return jsonify({
            "message": "Welcome to CommUnity API",
            "status": "Online",
            "version": "1.0.0",
            "endpoints": {
                "auth": {
                    "login": "/api/auth/login",
                    "register": "/api/auth/register",
                    "me": "/api/auth/me"
                },
                "events": {
                    "list": "/api/events",
                    "create": "/api/events",
                    "join": "/api/events/<id>/join"
                },
                "messages": "/api/messages"
            }
        })

    # Register blueprints
    from .routes import auth_bp, events_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(events_bp, url_prefix='/api')

    # Create database tables and test user
    with app.app_context():
        db.create_all()
        
        # Create test user if it doesn't exist
        test_email = "test@example.com"
        if not User.query.filter_by(email=test_email).first():
            test_user = User(
                id=str(uuid.uuid4()),
                username="testuser",
                email=test_email,
                first_name="Test",
                last_name="User"
            )
            test_user.set_password("password123")
            db.session.add(test_user)
            db.session.commit()
            print(f"Test user created with email: {test_email}")

    return app