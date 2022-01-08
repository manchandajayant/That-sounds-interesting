from flask import Blueprint, request
from flask_jwt_extended.utils import get_jwt_identity
from src.controllers.auth.crud import CRUD
from flask_jwt_extended import jwt_required

auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")
db = CRUD()


@auth.post('/register')
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    create = db.create(email, username, password)
    return create


@auth.get("/login")
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    read = db.read(email, password)
    return read


@auth.get("/me")
@jwt_required()
def get_me():
	return "ME"


