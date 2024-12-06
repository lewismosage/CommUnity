from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()
cors = CORS(allow_origins=["http://localhost:3000"], supports_credentials=True, resources={r"/*": {"origins": "*"}})