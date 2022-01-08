from flask import Blueprint, request
from src.controllers.auth.crud import CRUD

auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")

@auth.post('/register')
def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    crud = CRUD()
    create = crud.create(email,username,password)
    return create





@auth.get("/login")
def me():
    # sql_query = f"SELECT * FROM {users_table} WHERE id={}"
    # print(db_query.execute_query("users"))
    return {"user": "me"}
