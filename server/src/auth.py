from flask import Blueprint
from src.services.query import query
auth = Blueprint("auth",__name__,url_prefix="/api/v1/auth")

@auth.post('/register')
def register():
    return "User_created"

@auth.get("/me")
def me():
    x = query()
    print(x.execute_query("users"))
    return {"user":"me"}