import pymysql
import logging
import sys
import os

class query:
    def __init__(self) -> None:
        db_name = os.environ.get('DB_NAME')
        db_username = os.environ.get('USERNAME')
        db_password = os.environ.get('PASSWORD')
        db_server = os.environ.get('SERVER')
        try:
            self.connection = pymysql.connect(host=db_server,
                             user=db_username,
                             password=db_password,
                             database=db_name,
                             cursorclass=pymysql.cursors.DictCursor,
                             autocommit=True)

        except pymysql.Error as e:
            print('could not connect to mysql')
            sys.exit()

    def execute_query(self,table_name):
        logging.basicConfig(filename="sql_query.log",
                        format='%(asctime)s %(message)s',
                        filemode='w')
        return self.connection


