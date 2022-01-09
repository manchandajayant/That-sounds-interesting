from flask import Blueprint, request
from flask_jwt_extended.utils import get_jwt_identity
from src.controllers.auth.crud import CRUD
from flask_jwt_extended import jwt_required

auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")
db = CRUD()


@auth.post('/register')
def register():
    if request.json is not None:
        username = request.json.get(
            'username') if 'username' in request.json else None
        email = request.json.get(
            'email') if 'username' in request.json else None
        password = request.json.get(
            'password') if 'username' in request.json else None
        create = db.create(email, username, password)
        return create


@auth.get("/login")
def login():
    if request.json is not None:
        email = request.json.get('email') if 'email' in request.json else None
        password = request.json.get(
            'password') if 'password' in request.json else None
        read = db.read(email, password)
        return read


@auth.get("/me")
@jwt_required()
def get_me():
	return "ME"
