from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from src.controllers.auth.crud import CRUD

auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")
db = CRUD()

@auth.post('/register')
def register():
    data = request.json
    username = data.get('username') if data else None
    email = data.get('email') if data else None
    password = data.get('password') if data else None
    create = db.create(email, username, password)
    return create

@auth.get("/login")
def login():
    data = request.json
    email = data.get('email') if data else None
    password = data.get('password') if data else None
    read = db.read(email, password)
    return read

@auth.get("/me")
@jwt_required()
def get_me():
    return "ME"
