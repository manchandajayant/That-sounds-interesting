import logging
import os
from mysql.connector import pooling


class Query:
    def __init__(self):
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
        return pooling.MySQLConnectionPool(
            pool_name="cnx_pool", pool_size=20, autocommit=True, **db_config
        )

    def get_data_query(self, query, column_names=False):
        cnxpool = self.create_connection_pool()
        result = None
        try:
            with cnxpool.get_connection() as connection:
                with connection.cursor() as cursor:
                    cursor.execute(query)
                    result = cursor.fetchall()
                    if column_names:
                        result = [dict(zip([column[0] for column in cursor.description], row)) for row in result]
        except Exception as e:
            logging.error(f"Error executing query: {query}, Exception: {str(e)}")
        return result
