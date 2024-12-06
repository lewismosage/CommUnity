from flask import Flask, jsonify
from app.extensions import db, cors
from app.routes import auth, events, groups, index  # Import your routes

app = Flask(__name__)

# Initialize CORS
cors.init_app(app)

# Add a route for the root URL
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the API!"})

# Register blueprints
app.register_blueprint(auth.auth_bp)
app.register_blueprint(events.events_bp)
app.register_blueprint(groups.groups_bp)
app.register_blueprint(index.index_bp)

if __name__ == '__main__':
    print("Starting the Flask application...")
    app.run(debug=True)