import os
import json
from flask import Blueprint, request
from werkzeug.security import check_password_hash, generate_password_hash

from src.constants.status_codes import HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST,HTTP_200_OK
from src.services.helpers import check_email,set_default
from src.services.query import query


auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")

db_query = query()
users_table = os.environ.get('users_table')


@auth.post('/register')
def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    # Validate Email
    if check_email(email) is not True:
        return json.dumps({'error': 'Invalid Email Format'}, default=set_default), HTTP_400_BAD_REQUEST

    # Validate password
    if len(password) < 6:
        return json.dumps({'error': "password is too short,it must have atleast 8 characters"}, default=set_default), HTTP_400_BAD_REQUEST

    # Check if email exists
    CHECK_USER_SQL = f"SELECT id,email FROM {users_table} WHERE email='{email}'"
    email_exists = db_query.get_data_query(CHECK_USER_SQL)
    
    if email_exists:
        return json.dumps({'error', "Email already exists"}, default=set_default), HTTP_409_CONFLICT

    # Hash the password
    password_hash = generate_password_hash(password)

    # Create user
    CREATE_USER_SQL = f"INSERT INTO `users` (\
				`username`,\
				`email`,\
				`password`,\
				`created_on`)\
				VALUES ('{username}',\
				'{email}', '{password_hash}',\
				CURRENT_TIMESTAMP);"

    create_user = db_query.execute_query(CREATE_USER_SQL)

    if create_user is None:
        return json.dumps({"user created succesfully"},default=set_default),HTTP_200_OK


@auth.get("/me")
def me():
    # sql_query = f"SELECT * FROM {users_table} WHERE id={}"
    # print(db_query.execute_query("users"))
    return {"user": "me"}
