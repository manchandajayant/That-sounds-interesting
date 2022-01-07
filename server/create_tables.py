import pymysql.cursors


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

connection = pymysql.connect(host='localhost',
                             user='root',
                             password='passwd',
                             database='Verber',
                             cursorclass=pymysql.cursors.DictCursor, autocommit=True)

with connection:
    with connection.cursor() as cursor:
        # CREATE SPACES TABLE
        cursor.execute(CREATE_SPACES_TABLE)
        result = cursor.fetchone()
        print(result)
        # cursor.execute(CREATE_USER_TABLE)
        # result2 = cursor.fetchone()
        # print(result2)
