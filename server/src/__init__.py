from flask import Flask
import os,sys

# import pymysql.cursors

from src.auth import auth
from src.spaces import spaces


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("SECRET_KEY")
        )
    else:
        app.config.from_mapping(test_config)

    app.register_blueprint(auth)
    app.register_blueprint(spaces)

    return app
