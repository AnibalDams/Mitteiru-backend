from classes import Lists
from flask import make_response, jsonify

def get(profileId):
    try:
        list = Lists.List(profileId=profileId)
        getAllLists = list.getAll() 
        match getAllLists["message"]:
            case "The given profile does not exist":
                resp = make_response(jsonify(getAllLists))
                resp.status_code = 404
                return resp
            case "Lists found":
                resp = make_response(jsonify(getAllLists))
                resp.status_code = 200
                return resp
            case "An error has occurred while getting the list":
                resp = make_response(jsonify(getAllLists))
                resp.status_code = 500
                return resp
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error"}))
        resp.status_code = 500
        return resp