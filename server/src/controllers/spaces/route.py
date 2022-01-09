import re
import json

from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from src.constants.status_codes import HTTP_200_OK, HTTP_400_BAD_REQUEST
from src.controllers.spaces.crud import CRUD
from src.services.helpers import set_default

db = CRUD()
spaces = Blueprint("spaces", __name__, url_prefix="/api/v1/spaces")


@spaces.get('/')
@jwt_required()
def get_all_spaces():
    spaces = db.read_all_spaces()
    # print(spaces)
    return spaces


@spaces.get("/<int:id>")
@jwt_required()
def get_space(id):
    return {"space": id}


@spaces.post("/create")
@jwt_required()
def create_space():

    if request.json is not None:
        name = request.json.get('name') if 'name' in request.json else None

        latitude = request.json.get(
            'latitude') if 'latitude' in request.json else None

        longitude = request.json.get(
            'longitude') if 'longitude' in request.json else None

        user_id = request.json.get(
            'user_id') if 'user_id' in request.json else None

        image = request.json.get('image') if 'image' in request.json else None

        create_space = db.create_space(
            name, latitude, longitude, user_id, image)

        return create_space
    else:
        return json.dumps({"Error","Bad request"},default=set_default),HTTP_400_BAD_REQUEST


@spaces.post("/upload")
# @jwt_required
def upload_audio():
    if request.files is not None:
        space_id = request.form.get('space_id')
        file = request.files['audio']
        upload = db.upload_audio(file,space_id)
        return json.dumps(upload,default=set_default),HTTP_200_OK
    else:
        return json.dumps({"Error","Bad request"},default=set_default),HTTP_400_BAD_REQUEST
