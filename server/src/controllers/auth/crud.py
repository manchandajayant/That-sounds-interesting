import json
import os
from src.services.query import query
from src.services.helpers import check_email, set_default
from src.constants.status_codes import HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST, HTTP_200_OK
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token


class CRUD:
    def __init__(self) -> None:
        self.db_query = query()
        self.users_table = os.environ.get('users_table')

    def create(self, email, username, password):
        # Validate data
        if email is None or password is None or username is None:
            return json.dumps({'error': 'Invalid Request, information is missing'}, default=set_default,sort_keys=True, indent=4), HTTP_400_BAD_REQUEST

        # Validate Email
        if check_email(email) is not True:
            return json.dumps({'error': 'Invalid Email Format'}, default=set_default,sort_keys=True, indent=4), HTTP_400_BAD_REQUEST

        # Validate password
        if len(password) < 6:
            return json.dumps({'error': "password is too short,it must have atleast 8 characters"}, default=set_default,sort_keys=True, indent=4), HTTP_400_BAD_REQUEST

        # Check if email exists
        CHECK_USER_SQL = f"SELECT id,email FROM {self.users_table} WHERE email='{email}'"
        email_exists = self.db_query.get_data_query(CHECK_USER_SQL)

        if email_exists:
            return json.dumps({'error', "Email already exists"}, default=set_default,sort_keys=True, indent=4), HTTP_409_CONFLICT

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

        create_user = self.db_query.execute_query(CREATE_USER_SQL)

        if create_user is None:
            return json.dumps({"user created succesfully"}, default=set_default,sort_keys=True, indent=4), HTTP_200_OK

    def read(self, email, password):
        # Validate data
        if email is None or password is None:
            return json.dumps({'error': 'Invalid Request, information is missing'}, default=set_default,sort_keys=True, indent=4), HTTP_400_BAD_REQUEST

        GET_USER_SQL = f"SELECT id,email,password,username FROM `{self.users_table}` WHERE email='{email}';"
        get_user_details = self.db_query.get_data_query(GET_USER_SQL)

        if get_user_details and get_user_details[0]:
            match_password = check_password_hash(
                get_user_details[0][2], password)

            if match_password:
                refresh_token = create_refresh_token(
                    identity=get_user_details[0][0])

                access_token = create_access_token(
                    identity=get_user_details[0][0])

                return json.dumps({
                    "user": {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "name": get_user_details[0][3],
                        "email": get_user_details[0][1]
                    }
                }, default=set_default,sort_keys=True, indent=4), HTTP_200_OK
                
            else:
                return json.dumps({"Incorrect password"},default=set_default,sort_keys=True, indent=4),HTTP_401_UNAUTHORIZED

        else:
            return json.dumps({"Email not found"}, default=set_default,sort_keys=True, indent=4), HTTP_404_NOT_FOUND
