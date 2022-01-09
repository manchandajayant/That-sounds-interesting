import json
import os
import decimal
import datetime
import cloudinary.uploader
from src.services.query import query
from src.services.helpers import set_default
from src.constants.status_codes import HTTP_201_CREATED,\
    HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND,\
    HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_200_OK


class CRUD():
    def __init__(self) -> None:
        self.db_query = query()
        self.spaces_table = os.environ.get('space_table')

    def create_space(self, name, latitude, longitude, user_id, image):
        if name is None or latitude is None or longitude is None or user_id is None:
            return json.dumps({'error': 'Invalid Request, missing parameters'}, default=set_default, sort_keys=True, indent=4), HTTP_400_BAD_REQUEST
        if image is None:
            image = ''

        # TODO - Check if a place with the same name and co-ordinates exist

        CREATE_A_SPACE_SQL = f"INSERT INTO `spaces` (`name`, `latitude`, `longitude`, `user_id`, `image`, `created_on`) VALUES ('{name}','{latitude}','{longitude}','{user_id}', '{image}', CURRENT_TIMESTAMP);"
        CREATE_A_SPACE = self.db_query.get_data_query(CREATE_A_SPACE_SQL)

        if CREATE_A_SPACE is None:
            return json.dumps({"space created succesfully"}, default=set_default, sort_keys=True, indent=4), HTTP_201_CREATED

    def read_all_spaces(self):
        GET_ALL_SPACES_SQL = f'SELECT * FROM `{self.spaces_table}`'
        GET_ALL_SPACES = self.db_query.get_data_query(
            GET_ALL_SPACES_SQL, column_names=True)

        if GET_ALL_SPACES:
            data = []
            for k, v in GET_ALL_SPACES[0].items():
                if isinstance(v, decimal.Decimal):
                    v = float(v)
                    data.append({k: v})
                elif isinstance(v, datetime.datetime):
                    v = str(v)
                    data.append({k: v})
                else:
                    v = str(v)
                    data.append({k: v})

            return json.dumps(data, sort_keys=True, indent=4), HTTP_200_OK
        else:
            return json.dumps({"No data found"}, default=set_default, sort_keys=True, indent=4,), HTTP_204_NO_CONTENT

    def upload_audio(self, audio, space_id):

        upload_result = cloudinary.uploader.upload(audio, resource_type="raw")

        if 'url' in upload_result:
            file_url = upload_result['url']
            UPDATE_FILE_URL_SQL = f"UPDATE `{self.spaces_table}` set file_url='{file_url}' WHERE id='{space_id}'"
            UPDATE_FILE_URL = self.db_query.get_data_query(UPDATE_FILE_URL_SQL)
            return upload_result
