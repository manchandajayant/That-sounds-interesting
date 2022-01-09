import logging
import os
from mysql.connector import pooling
from mysql.connector import connect


class query:
    def __init__(self) -> None:
        logging.basicConfig(filename="logs/sql_query.log",
                            format='%(asctime)s %(message)s',
                            filemode='w')

    def create_connection_pool(self):
        db_name = os.environ.get('DB_NAME')
        db_username = os.environ.get('USERNAME')
        db_password = os.environ.get('PASSWORD')
        db_server = os.environ.get('SERVER')
        db_config = {
            'host': db_server,
            'user': db_username,
            'password': db_password,
            'database': db_name,
            'port': 3306,
        }
        self.cnxpool = pooling.MySQLConnectionPool(
            pool_name="cnx_pool", pool_size=20, autocommit=True,  **db_config)
        return self.cnxpool

    def get_data_query(self, query, column_names=False):
        cnx = self.create_connection_pool()
        connection = cnx.get_connection()
        cursor = connection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        if column_names is True:
            result = [dict((cursor.description[i][0], value)
                           for i, value in enumerate(row)) for row in result]
            cursor.close()
            connection.close()
            return result
        else:
            cursor.close()
            connection.close()
            return result
