from flask import Blueprint
import json
spaces = Blueprint("spaces", __name__, url_prefix="/api/v1/spaces")


@spaces.get('/')
def get_all_spaces():
    return json.dumps([])


@spaces.get("/<int:id>")
def get_space(id):
    return {"space": id}


@spaces.post("/create")
def create_space():
    return {"message": "space created"}
