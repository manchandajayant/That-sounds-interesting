import json
import os
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from src.services.query import query
from src.services.helpers import helpers
from src.constants.status_codes import HTTP_201_CREATED, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST, HTTP_200_OK


class CRUD:
    def __init__(self) -> None:
        self.db_query = query()
        self.users_table = os.environ.get('users_table')
        self.helpers = helpers()

    def validate_request_data(self, email, password, username):
        if email is None or password is None or username is None or len(email) == 0 or len(password) == 0 or len(username) == 0:
            return json.dumps({'error': 'Invalid Request, information is missing'}, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_400_BAD_REQUEST
        return None

    def create(self, email, username, password):
        validation_error = self.validate_request_data(email, password, username)
        if validation_error:
            return validation_error

        if not self.helpers.check_email(email):
            return json.dumps({'error': 'Invalid Email Format'}, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_400_BAD_REQUEST

        if len(password) < 6:
            return json.dumps({'error': "password is too short, it must have at least 6 characters"}, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_400_BAD_REQUEST

        email_exists = self.db_query.get_data_query(
            f"SELECT id,email FROM {self.users_table} WHERE email='{email}'")

        if email_exists:
            return json.dumps({'error': "Email already exists"}, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_409_CONFLICT

        password_hash = generate_password_hash(password)
        create_user_sql = f"INSERT INTO `users` (`username`, `email`, `password`, `created_on`) VALUES ('{username}', '{email}', '{password_hash}', CURRENT_TIMESTAMP);"
        create_user = self.db_query.execute_query(create_user_sql)

        if create_user is None:
            return json.dumps({"user created successfully"}, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_201_CREATED

    def read(self, email, password):
        validation_error = self.validate_request_data(email, password, None)
        if validation_error:
            return validation_error

        get_user_sql = f"SELECT id,email,password,username FROM `{self.users_table}` WHERE email='{email}';"
        get_user_details = self.db_query.get_data_query(get_user_sql)

        if get_user_details and get_user_details[0]:
            if check_password_hash(get_user_details[0][2], password):
                access_token = create_access_token(identity=get_user_details[0][0])
                return json.dumps({
                    "user": {
                        "access_token": access_token,
                        "name": get_user_details[0][3],
                        "email": get_user_details[0][1]
                    }
                }, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_200_OK
            else:
                return json.dumps({"Incorrect password"}, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_401_UNAUTHORIZED
        else:
            return json.dumps({"Email not found"}, default=self.helpers.set_default, sort_keys=True, indent=4), HTTP_404_NOT_FOUND
