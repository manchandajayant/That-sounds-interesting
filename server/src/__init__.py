import os
import json
from flask import Flask
from flask_jwt_extended import JWTManager

from src.controllers.auth.route import auth
from src.controllers.spaces.route import spaces

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("SECRET_KEY"),
            JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY')
        )
    else:
        app.config.from_mapping(test_config)

    JWTManager(app)

    app.register_blueprint(auth)
    app.register_blueprint(spaces)
	

    return app
