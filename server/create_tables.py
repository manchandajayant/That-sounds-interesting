from mysql import connector
from mysql.connector import connect
import logging,os,sys
from dotenv import load_dotenv

logging.basicConfig(filename="create-tables.log",
                    format='%(asctime)s %(message)s',
                    filemode='w')


logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

load_dotenv()

db_name = os.getenv('DB_NAME')
db_username = os.getenv('USERNAME')
db_password = os.getenv('PASSWORD')
db_server = os.getenv('SERVER')


def create_connection():
    db_config = {
            'host' : db_server,
            'user' : db_username,
            'password' : db_password,
            'database' : db_name,
            'port' : 3306,
    }
    cnx = connect(autocommit=True, **db_config)
    return cnx

def check_if_tables_exist_or_create(connection):
    SQL_CHECK_TABLES_EXIST = f"SELECT COUNT(*) AS tables_found_count\
                               FROM `information_schema`.`tables`\
                               WHERE `TABLE_SCHEMA` = '{db_name}' AND\
                               `TABLE_NAME` IN ('spaces', 'users')"

    cursor = connection.cursor()
    cursor.execute(SQL_CHECK_TABLES_EXIST)
    result = cursor.fetchone()
    cursor.close()
    connection.close()

    if result[0] == 2:
        logger.info("Tables exist")
    else:
        logger.info("Creating Tables")
        create_tables(create_connection())


def create_tables(connection):
    CREATE_SPACES_TABLE = "CREATE TABLE spaces(\
    `id` int(11) primary key NOT NULL AUTO_INCREMENT,\
    `name` varchar(50) NOT NULL DEFAULT 'Name',\
    `latitude` DECIMAL(12,9) NOT NULL,\
    `longitude`  DECIMAL(12,9) NOT NULL,\
    `file_url` varchar(200) NOT NULL,\
    `user_id` int(11) NOT NULL,\
    `image` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,\
    `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)"

    CREATE_USER_TABLE = "CREATE TABLE users(\
    `id` int(11) primary key NOT NULL AUTO_INCREMENT,\
    `username` varchar(100) NOT NULL,`email` varchar(255) NOT NULL,\
    `password` varchar(255) DEFAULT NULL,`google_id` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,\
    `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)"

    # CREATE SPACES AND USERS TABLE
    try:
        cursor = connection.cursor()
        result_spaces_table = cursor.execute(CREATE_SPACES_TABLE)
        result_users_table = cursor.execute(CREATE_USER_TABLE)
        if result_spaces_table == 1 and result_users_table == 1:
            logger.info('tables created')
            cursor.close()
            connection.close()
            return True
        else:
            logger.error('Error creating tables')
            cursor.close()
            connection.close()
            return False

    except connect.Error as err:
        logger.error(f'could not connect to mysql {str(err)}')
        cursor.close()
        connection.close()


if __name__ == "__main__":
    check_if_tables_exist_or_create(create_connection())