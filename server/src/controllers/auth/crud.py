import json,os
from src.services.query import query
from src.services.helpers import check_email,set_default
from src.constants.status_codes import HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST,HTTP_200_OK
from werkzeug.security import check_password_hash, generate_password_hash

class CRUD:
    def __init__(self) -> None:
        self.db_query = query()
        self.users_table = os.environ.get('users_table')

    def create(self,email,username,password):
        # Validate Email
        if check_email(email) is not True:
            return json.dumps({'error': 'Invalid Email Format'}, default=set_default), HTTP_400_BAD_REQUEST

        # Validate password
        if len(password) < 6:
            return json.dumps({'error': "password is too short,it must have atleast 8 characters"}, default=set_default), HTTP_400_BAD_REQUEST

        # Check if email exists
        CHECK_USER_SQL = f"SELECT id,email FROM {self.users_table} WHERE email='{email}'"
        email_exists = self.db_query.get_data_query(CHECK_USER_SQL)
        
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

        create_user = self.db_query.execute_query(CREATE_USER_SQL)
        
        if create_user is None:
            return json.dumps({"user created succesfully"},default=set_default),HTTP_200_OK