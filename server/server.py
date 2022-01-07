import sys,logging
from flask import Flask, render_template, request, jsonify
import pymysql
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)

USERS_TABLE_NAME = 'users'
logging.basicConfig(filename="newfile.log",
                    format='%(asctime)s %(message)s',
                    filemode='w')

try:
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='passwd',
                                 database='Verber',
                                 cursorclass=pymysql.cursors.DictCursor,
                                 autocommit=True)

except pymysql.Error as e:
    print('could not connect to mysql')
    sys.exit()


data = {
    "Page Header": "Jayant Manchanda"
}


@app.route("/spaces", methods=["GET"])
def landingPage():
    SQL = f'SELECT * FROM `spaces`'
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(SQL)
            result = cursor.fetchone()
            print(result)
    return data


@app.route("/spaces/<int:id>", methods=["GET"])
def get_space_by_id(id):
    SQL = f'SELECT * FROM `spaces` WHERE id={id}'
    print(id)
    return data


@app.route("/register", methods=["POST"])
def register_user():
    data = request.json
    # GET ALL THE DATA
    user_name = data['username']
    email = data['email']
    password = data['password']

    # CHECK IF USER EXISTS
    CHECK_USER_SQL = f"SELECT id,email FROM {USERS_TABLE_NAME} WHERE email='{email}'"

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CHECK_USER_SQL)
            res = cursor.fetchone()

            if res == None:
                return {"code": 409, "message": "User already exists"}
            else:
                # HASH THE PASSWORD
                hash = str(pbkdf2_sha256.hash(password))
                # SQL
                CREATE_USER_SQL = f"INSERT INTO `users` (\
				`username`,\
				`email`,\
				`password`,\
				`google_id`,\
				`created_on`)\
				VALUES ('{user_name}',\
				'{email}', '{hash}',\
				NULL, CURRENT_TIMESTAMP);"

                with connection:
                    with connection.cursor() as cursor:
                        res = cursor.execute(CREATE_USER_SQL)
                        if res == 1:
                            return {"code": 200, "message": "User was created"}
                        else:
                            return{"code": 500, "message": "There was an error creating the user"}


if __name__ == "__main__":
    app.run(debug=True)
