from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt  # Absolute import
from app.api import auth  # Absolute import

def create_app():
    app = Flask(__name__)

    # Load configuration from environment variables or a config file
    app.config.from_object('config.Config')  # Adjust based on your config setup

    # Initialize CORS
    CORS(app, resources={r"/auth/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(auth.api)  # Register your auth blueprint

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)  # Ensure the port matches your frontend 