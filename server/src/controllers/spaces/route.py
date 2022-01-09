from flask import Blueprint
import json
from flask_jwt_extended import jwt_required
spaces = Blueprint("spaces", __name__, url_prefix="/api/v1/spaces")


@spaces.get('/')
@jwt_required()
def get_all_spaces():
    return json.dumps([])


@spaces.get("/<int:id>")
@jwt_required()
def get_space(id):
    return {"space": id}


@spaces.post("/create")
@jwt_required()
def create_space():
    return {"message": "space created"}
