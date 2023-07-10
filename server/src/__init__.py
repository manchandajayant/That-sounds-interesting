import os
from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import cloudinary

from src.controllers.auth.route import auth
from src.controllers.spaces.route import spaces

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    
    if test_config is None:
        app.config.update(
            SECRET_KEY=os.environ.get("SECRET_KEY"),
            JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY'),
            JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=1)
        )
    else:
        app.config.update(test_config)

    cloudinary.config(
        cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
        api_key=os.getenv('CLOUDINARY_API_KEY'),
        api_secret=os.getenv('CLOUDINARY_API_SECRET')
    )

    CORS(app)
    JWTManager(app)

    app.register_blueprint(auth)
    app.register_blueprint(spaces)

    return app
