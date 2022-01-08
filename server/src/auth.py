import os
from flask import Blueprint,request
from flask import json
from flask.json import jsonify
from werkzeug.security import check_password_hash, generate_password_hash

from src.constants.status_codes import HTTP_409_CONFLICT,HTTP_400_BAD_REQUEST
from src.services.helpers import check_email
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
    if check_email(email) is False:
        return jsonify({'error': 'Invalid Email Format'}), HTTP_400_BAD_REQUEST

    # Validate password
    if len(password) < 6:
        return jsonify({'error': "password is too short, it must have atleast 8 characters"}), HTTP_400_BAD_REQUEST

    # Check if email exists
    CHECK_USER_SQL = f"SELECT id,email FROM {users_table} WHERE email='{email}'"
    email_exists = db_query.get_data_query(users_table, CHECK_USER_SQL)
    if email_exists is not None:
        return jsonify({'error',"Email already exists"}), HTTP_409_CONFLICT
    
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

    create_user = db_query.execute_query(users_table,CREATE_USER_SQL)
    print(create_user)
    return {"Something":"aasda"}

@auth.get("/me")
def me():
    # sql_query = f"SELECT * FROM {users_table} WHERE id={}"
    # print(db_query.execute_query("users"))
    return {"user": "me"}
